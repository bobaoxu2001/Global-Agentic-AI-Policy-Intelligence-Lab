/**
 * Integration tests — validation + integrity pipeline (ENG §12.2).
 * Good fixtures pass under the fixtures profile; crafted-bad records fail
 * with the right rule; production profile rejects fixtures and non-published.
 * Scenario expectations are READ FROM FIXTURE FILES, never hardcoded (MJ-10).
 */
import { describe, expect, it } from 'vitest';
import assessmentsJson from '../../data/fixtures/assessments.json';
import { computeAdrs, displayScore, type Dims, type JComponents, type MitigationClass } from '../../lib/adrs';
import { AssessmentSchema, InstrumentSchema, ProvisionSchema, SourceSchema } from '../../lib/schemas';
import { assertNotFixtureDeploy, FIXTURE_BANNER_TEXT, getBuildProfile } from '../../lib/validation/buildProfile';
import {
  checkDimensionInvariance,
  checkNoFixturesInProduction,
  checkPublishedOnlyInProduction,
  checkVersionUniqueness,
  currentVersions,
  runIntegrity,
  type Dataset,
} from '../../lib/validation/integrity';
import { loadAndValidate } from '../../lib/validation/loadDataset';
import { getPageDataset } from '../../lib/validation/pageData';
import previewManifest from '../../../docs/research/GOLDEN_8_REVIEW_MANIFEST.json';

const good = () => loadAndValidate('fixtures');

describe('pipeline over shipped fixtures (BUILD_PROFILE=fixtures)', () => {
  it('validates clean: zero schema errors, zero integrity errors', () => {
    const r = good();
    expect(r.schemaErrors).toEqual([]);
    expect(r.integrityErrors).toEqual([]);
    expect(r.ok).toBe(true);
  });
  it('has the expected corpus counts (12 seeds ×2, 3 scenarios, 12 assessments)', () => {
    const r = good();
    expect(r.counts.capabilities).toBe(12);
    expect(r.counts.risks).toBe(12);
    expect(r.counts.scenarios).toBe(3);
    expect(r.counts.assessments).toBe(12);
  });
  it('every scenario has all four jurisdictions assessed', () => {
    const r = good();
    for (const s of r.dataset.scenarios) {
      const jur = r.dataset.assessments.filter((a) => a.scenario_id === s.id).map((a) => a.jurisdiction_id);
      expect(new Set(jur)).toEqual(new Set(['us', 'eu', 'sg', 'cn']));
    }
  });
});

describe('ADRS recompute over fixtures — expectations derived from fixture data (MJ-10)', () => {
  it('recomputes every fixture assessment without error; caps hold; tiers valid', () => {
    for (const a of assessmentsJson) {
      const result = computeAdrs({
        dims: Object.fromEntries(
          (['A', 'T', 'D', 'E', 'R'] as const).map((d) => [d, a.dims[d].score]),
        ) as Dims,
        mitigations: a.mitigations.map((m) => m.class) as MitigationClass[],
        j: Object.fromEntries(Object.entries(a.j_components).map(([k, v]) => [k, v.value])) as unknown as JComponents,
      });
      expect(result.credit).toBeLessThanOrEqual(0.4 + 1e-12);
      expect(result.j).toBeLessThanOrEqual(1.3 + 1e-12);
      expect(result.final).toBeLessThanOrEqual(100);
      expect(['low', 'moderate', 'high', 'critical']).toContain(result.tier);
      expect(Number.isFinite(displayScore(result.final))).toBe(true);
    }
  });
});

describe('production profile rejections (CB-4, rules 7–8)', () => {
  it('rejects every fixture:true record in production', () => {
    const r = good();
    const errors = checkNoFixturesInProduction(r.dataset, 'production');
    const fixtureCount = [
      ...r.dataset.instruments, ...r.dataset.provisions, ...r.dataset.sources,
      ...r.dataset.scenarios, ...r.dataset.assessments,
    ].filter((x) => (x as { fixture?: boolean }).fixture === true).length;
    expect(fixtureCount).toBe(20); // the Phase 0 fictional corpus
    expect(errors.length).toBe(fixtureCount); // real (non-fixture) research content is NOT R7-rejected
    expect(errors.every((e) => e.rule === 'R7-no-fixtures-in-prod')).toBe(true);
  });
  it('production loads real research only and rejects its non-published review state', () => {
    const r = loadAndValidate('production');
    expect(r.ok).toBe(false);
    expect(r.dataset.instruments.length).toBeGreaterThan(0);
    expect(r.dataset.instruments.every((row) => row.fixture !== true)).toBe(true);
    expect(r.dataset.instruments.every((row) => row.review_status === 'in_review')).toBe(true);
    expect(r.integrityErrors.some((e) => e.rule === 'R7-no-fixtures-in-prod')).toBe(false);
    expect(r.integrityErrors.some((e) => e.rule === 'R8-published-only')).toBe(true);
  });
  it('rejects non-published records in production', () => {
    const r = good();
    const ds: Dataset = {
      ...r.dataset,
      assessments: r.dataset.assessments.map((a, i) =>
        i === 0 ? { ...a, review_status: 'draft' as const } : a,
      ),
    };
    const errors = checkPublishedOnlyInProduction(ds, 'production');
    expect(errors.some((e) => e.rule === 'R8-published-only')).toBe(true);
    expect(checkPublishedOnlyInProduction(ds, 'fixtures')).toEqual([]);
  });
});

describe('profile-specific page data', () => {
  const prior = process.env.BUILD_PROFILE;

  it('fixture pages expose only illustrative fixture content', () => {
    process.env.BUILD_PROFILE = 'fixtures';
    const ds = getPageDataset();
    expect(ds.instruments.length).toBeGreaterThan(0);
    expect(ds.instruments.every((row) => row.fixture === true)).toBe(true);
    expect(ds.scenarios.every((row) => row.fixture === true)).toBe(true);
  });

  it('production pages never discard valid records by accident and render zero until publication', () => {
    process.env.BUILD_PROFILE = 'production';
    const raw = loadAndValidate('production');
    const ds = getPageDataset();
    expect(raw.dataset.instruments.some((row) => row.fixture !== true)).toBe(true);
    expect(ds.instruments).toEqual([]);
    expect(ds.provisions).toEqual([]);
    expect(ds.scenarios).toEqual([]);
  });

  it('preview exposes only manifest-approved Golden 8 records and their dependencies', () => {
    process.env.BUILD_PROFILE = 'preview';
    const raw = loadAndValidate('preview');
    const ds = getPageDataset();
    const approved = new Set(previewManifest.records.filter((r) => r.decision === 'APPROVED FOR AI-ASSISTED PREVIEW').map((r) => r.record_id));
    expect(raw.ok).toBe(true);
    expect([...ds.instruments, ...ds.provisions].every((r) => approved.has(r.id))).toBe(true);
    expect(ds.instruments.map((r) => r.id).sort()).toEqual(['cn-ai-labeling-measures', 'cn-genai-interim-measures', 'eu-gdpr', 'sg-mgf-genai', 'us-co-sb26-189', 'us-eo-14179'].sort());
    expect(ds.provisions.map((r) => r.id).sort()).toEqual(['cn-genai-interim-measures:art9', 'eu-gdpr:art22'].sort());
    expect(ds.instruments.every((r) => r.fixture !== true)).toBe(true);
    expect(ds.instruments).not.toContainEqual(expect.objectContaining({ id: 'eu-ai-act' }));
    expect(ds.provisions).not.toContainEqual(expect.objectContaining({ id: 'us-co-sb26-189:developer-disclosure' }));
    expect(ds.controlMaps.every((m) => ds.provisions.some((p) => p.id === m.provision_id))).toBe(true);
    expect(ds.sources.length).toBe(6);
  });

  it('restores the inherited profile for subsequent test files', () => {
    if (prior === undefined) delete process.env.BUILD_PROFILE;
    else process.env.BUILD_PROFILE = prior;
  });
});

describe('integrity rule 13 — A/T/R invariance, D/E divergence (ENG §12.2.13)', () => {
  it('rejects a scenario whose A differs across jurisdictions', () => {
    const r = good();
    const ds: Dataset = {
      ...r.dataset,
      assessments: r.dataset.assessments.map((a) =>
        a.id === 'aria-eu-v1' ? { ...a, dims: { ...a.dims, A: { ...a.dims.A, score: 4 as const } } } : a,
      ),
    };
    const errors = checkDimensionInvariance(ds);
    expect(errors.some((e) => e.rule === 'R5-ATR-invariance' && e.entity === 'aria')).toBe(true);
  });
  it('accepts D divergence WITH justification; rejects it WITHOUT', () => {
    const r = good();
    const diverge = (justified: boolean): Dataset => ({
      ...r.dataset,
      assessments: r.dataset.assessments.map((a) =>
        a.id === 'aria-eu-v1'
          ? {
              ...a,
              dims: {
                ...a.dims,
                D: {
                  score: 2 as const,
                  justification: a.dims.D.justification,
                  ...(justified
                    ? { divergence_justification: 'EU deployment localizes data and strips minors profiles, lowering D.' }
                    : {}),
                },
              },
            }
          : justified
            ? { ...a, dims: { ...a.dims, D: { ...a.dims.D, divergence_justification: 'Non-EU deployments retain the full data scope described in the scenario narrative.' } } }
            : a,
      ),
    });
    expect(checkDimensionInvariance(diverge(true)).filter((e) => e.rule === 'R6-DE-divergence')).toEqual([]);
    expect(checkDimensionInvariance(diverge(false)).some((e) => e.rule === 'R6-DE-divergence')).toBe(true);
  });
});

describe('crafted-bad records fail schema validation (ENG §12.2)', () => {
  const baseAssessment = assessmentsJson[0]!;
  it('rejects author-supplied computed fields (final/tier) — §18.3', () => {
    expect(AssessmentSchema.safeParse({ ...baseAssessment, final: 56.4 }).success).toBe(false);
    expect(AssessmentSchema.safeParse({ ...baseAssessment, tier: 'high' }).success).toBe(false);
  });
  it('rejects a blank dimension justification (<40 chars)', () => {
    const bad = structuredClone(baseAssessment) as Record<string, unknown>;
    (bad.dims as Record<string, { justification: string }>).A!.justification = 'too short';
    expect(AssessmentSchema.safeParse(bad).success).toBe(false);
  });
  it('rejects a provision quote over 50 words even under 350 chars (OD-3)', () => {
    const words = Array.from({ length: 60 }, (_, i) => `w${i}`).join(' '); // 60 words, <350 chars
    const p = {
      id: 'fx:bad', instrument_id: 'fx-fictional-agentic-act', pin_cite: 'Art 1',
      quote_verbatim: words, paraphrase_en: 'x'.repeat(50), obligation_type: 'obligation',
      source_id: 'fx-src-001', confidence: 'low', confidence_rationale: 'fixture',
      epistemic_blocks: [{ id: 'b1', kind: 'fact', text_md: 'f', confidence: 'low',
        citations: [{ tier: 1, publisher: 'p', title: 't', url: 'https://example.invalid/x', pin_cite: 'Art 1', accessed_date: '2026-07-11' }] }],
      capability_map: [{ capability_id: 'C1', rationale: 'r', confidence: 'low' }],
      risk_map: [], review_status: 'draft', as_of_date: '2026-07-11', last_verified: '2026-07-11',
    };
    expect(ProvisionSchema.safeParse(p).success).toBe(false);
  });
  it('rejects quote_translated without translation_source_id (OD-4)', () => {
    const p = {
      id: 'fx:bad2', instrument_id: 'fx-fictional-agentic-act', pin_cite: 'Art 2',
      quote_translated: 'translated text', paraphrase_en: 'x'.repeat(50), obligation_type: 'obligation',
      source_id: 'fx-src-001', confidence: 'low', confidence_rationale: 'fixture',
      epistemic_blocks: [{ id: 'b1', kind: 'fact', text_md: 'f', confidence: 'low',
        citations: [{ tier: 1, publisher: 'p', title: 't', url: 'https://example.invalid/x', pin_cite: 'Art 2', accessed_date: '2026-07-11' }] }],
      capability_map: [{ capability_id: 'C1', rationale: 'r', confidence: 'low' }],
      risk_map: [], review_status: 'draft', as_of_date: '2026-07-11', last_verified: '2026-07-11',
    };
    expect(ProvisionSchema.safeParse(p).success).toBe(false);
  });
  it('rejects a fact block cited only by Tier 3 (§21.5) and a confident recommendation (§20.1)', () => {
    const mk = (blocks: unknown[]) => ({
      id: 'fx:bad3', instrument_id: 'fx-fictional-agentic-act', pin_cite: 'Art 3',
      paraphrase_en: 'x'.repeat(50), obligation_type: 'obligation',
      source_id: 'fx-src-001', confidence: 'low', confidence_rationale: 'fixture',
      epistemic_blocks: blocks,
      capability_map: [{ capability_id: 'C1', rationale: 'r', confidence: 'low' }],
      risk_map: [], review_status: 'draft', as_of_date: '2026-07-11', last_verified: '2026-07-11',
    });
    const tier3Fact = mk([{ id: 'b1', kind: 'fact', text_md: 'f', confidence: 'low',
      citations: [{ tier: 3, publisher: 'blog', title: 't', url: 'https://example.invalid/x', pin_cite: 'n/a', accessed_date: '2026-07-11' }] }]);
    expect(ProvisionSchema.safeParse(tier3Fact).success).toBe(false);
    const confidentRec = mk([
      { id: 'b1', kind: 'fact', text_md: 'f', confidence: 'low',
        citations: [{ tier: 1, publisher: 'p', title: 't', url: 'https://example.invalid/x', pin_cite: 'Art 3', accessed_date: '2026-07-11' }] },
      { id: 'b2', kind: 'recommendation', text_md: 'r', confidence: 'high', based_on: ['b1'] },
    ]);
    expect(ProvisionSchema.safeParse(confidentRec).success).toBe(false);
  });
  it('rejects unknown enum values (instrument_type "law")', () => {
    const r = good();
    expect(runIntegrity(r.dataset, 'fixtures')).toEqual([]); // sanity: base is clean
    const inst = { ...r.dataset.instruments[0]!, instrument_type: 'law' };
    expect(InstrumentSchema.safeParse(inst).success).toBe(false);
  });
});

describe('build profile guards (CB-4, rule 10)', () => {
  it('banner constant is exactly the approved text', () => {
    expect(FIXTURE_BANNER_TEXT).toBe('FIXTURE DATA — ILLUSTRATIVE ONLY');
  });
  it('defaults to production (fail-closed) and rejects unknown profiles', () => {
    expect(getBuildProfile({} as unknown as NodeJS.ProcessEnv)).toBe('production');
    expect(() => getBuildProfile({ BUILD_PROFILE: 'staging' } as unknown as NodeJS.ProcessEnv)).toThrow();
  });
  it('fixture profile cannot be deployed to production (DEPLOY_ENV guard)', () => {
    expect(() =>
      assertNotFixtureDeploy({ BUILD_PROFILE: 'fixtures', DEPLOY_ENV: 'production' } as unknown as NodeJS.ProcessEnv),
    ).toThrow(/cannot be deployed/);
    expect(() =>
      assertNotFixtureDeploy({ BUILD_PROFILE: 'production', DEPLOY_ENV: 'production' } as unknown as NodeJS.ProcessEnv),
    ).not.toThrow();
  });
});

describe('code-review fixes — version selection & uniqueness (MD-4, SPEC §17 UNIQUE)', () => {
  const mk = (id: string, version: number, review_status: 'draft' | 'in_review' | 'published') => {
    const base = structuredClone(assessmentsJson[0]!) as (typeof assessmentsJson)[0];
    return { ...base, id, version, review_status } as unknown as Dataset['assessments'][0];
  };

  it('F1: a draft re-score never shadows a published version (MD-4)', () => {
    const picked = currentVersions([mk('pub-v1', 1, 'published'), mk('draft-v2', 2, 'draft')]);
    expect(picked.map((a) => a.id)).toEqual(['pub-v1']);
  });
  it('F1: among published versions the highest wins; fallback used only when no published exists', () => {
    expect(currentVersions([mk('pub-v1', 1, 'published'), mk('pub-v2', 2, 'published')]).map((a) => a.id)).toEqual(['pub-v2']);
    expect(currentVersions([mk('draft-v1', 1, 'draft'), mk('draft-v3', 3, 'draft')]).map((a) => a.id)).toEqual(['draft-v3']);
  });
  it('F3: duplicate (scenario, jurisdiction, version) fails integrity instead of silently dropping', () => {
    const r = good();
    const ds: Dataset = { ...r.dataset, assessments: [...r.dataset.assessments, mk('aria-eu-v1-dup', 1, 'published')] };
    const errors = checkVersionUniqueness(ds);
    expect(errors.some((e) => e.rule === 'R-version-unique' && e.message.includes('aria:eu:v1'))).toBe(true);
    expect(runIntegrity(ds, 'fixtures').some((e) => e.rule === 'R-version-unique')).toBe(true);
  });
});

describe('code-review fixes — Tier 1 archive rule (§21.6/MJ-7)', () => {
  it('F2: Tier 1 source without archived_url and without manual_verification_date is rejected', () => {
    const base = {
      id: 's1', tier: 1, publisher: 'p', title: 't', url: 'https://example.invalid/x',
      language: 'en', accessed_date: '2026-07-11',
    };
    expect(SourceSchema.safeParse(base).success).toBe(false);
    expect(SourceSchema.safeParse({ ...base, archived_url: 'https://archive.example.invalid/x' }).success).toBe(true);
    expect(SourceSchema.safeParse({ ...base, manual_verification_date: '2026-07-11' }).success).toBe(true);
    expect(SourceSchema.safeParse({ ...base, tier: 2 }).success).toBe(true); // rule is Tier 1 only
    // a stable_ref alone does NOT substitute (MJ-7)
    expect(SourceSchema.safeParse({ ...base, stable_ref: 'FX-1' }).success).toBe(false);
  });
});
