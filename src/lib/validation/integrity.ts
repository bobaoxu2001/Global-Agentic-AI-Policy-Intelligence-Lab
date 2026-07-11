/**
 * Publish-pipeline integrity validators (SPEC §17 integrity rules, PRD §24,
 * ENG §10 step 4). Zod handles per-record shape; these validators handle
 * CROSS-RECORD and PROFILE rules. Errors are collected, never fail-fast,
 * so an author can fix a batch in one pass (ENG §16).
 */
import { computeAdrs, type Dims, type JComponents, type MitigationClass } from '../adrs';
import type { Assessment, Instrument, Provision, Scenario, SourceRecord } from '../schemas';
import type { BuildProfile } from './buildProfile';

export interface IntegrityError {
  rule: string;
  entity: string;
  message: string;
}

export interface Dataset {
  instruments: Instrument[];
  provisions: Provision[];
  sources: SourceRecord[];
  scenarios: Scenario[];
  assessments: Assessment[];
}

const err = (rule: string, entity: string, message: string): IntegrityError => ({ rule, entity, message });

/** Rule 1 (PRD §24.1): published policy content must have resolvable source metadata. */
export function checkSourceMetadata(ds: Dataset): IntegrityError[] {
  const errors: IntegrityError[] = [];
  const sourceIds = new Set(ds.sources.map((s) => s.id));
  for (const p of ds.provisions) {
    if (!p.source_id || !sourceIds.has(p.source_id))
      errors.push(err('R1-source-metadata', p.id, `source_id "${p.source_id}" does not resolve`));
    if (p.translation_source_id && !sourceIds.has(p.translation_source_id))
      errors.push(err('R1-source-metadata', p.id, `translation_source_id "${p.translation_source_id}" does not resolve`));
    if (!p.confidence_rationale.trim())
      errors.push(err('R1-source-metadata', p.id, 'confidence_rationale is empty'));
  }
  for (const i of ds.instruments) {
    for (const sid of i.source_ids)
      if (!sourceIds.has(sid)) errors.push(err('R1-source-metadata', i.id, `source_id "${sid}" does not resolve`));
  }
  return errors;
}

/** Rule 2 (§20): fact/inference/recommendation stored as separate typed blocks (no mixed kinds). */
export function checkEpistemicSeparation(ds: Dataset): IntegrityError[] {
  const errors: IntegrityError[] = [];
  for (const p of ds.provisions) {
    const ids = new Set<string>();
    for (const b of p.epistemic_blocks) {
      if (ids.has(b.id)) errors.push(err('R2-epistemic', p.id, `duplicate epistemic block id "${b.id}"`));
      ids.add(b.id);
    }
    for (const b of p.epistemic_blocks) {
      if (b.kind === 'inference' || b.kind === 'recommendation') {
        for (const ref of b.based_on ?? [])
          if (!ids.has(ref) && !ref.includes(':'))
            errors.push(err('R2-epistemic', p.id, `block "${b.id}" based_on "${ref}" not found in provision`));
      }
    }
  }
  return errors;
}

/** Rule 3 (MJ-1): last_verified must exist and be a distinct field from as_of_date (never aliased). */
export function checkDateFields(ds: Dataset): IntegrityError[] {
  const errors: IntegrityError[] = [];
  const dated = [...ds.instruments, ...ds.provisions];
  for (const r of dated) {
    if (!r.last_verified) errors.push(err('R3-dates', r.id, 'last_verified missing'));
    if (!r.as_of_date) errors.push(err('R3-dates', r.id, 'as_of_date missing'));
    if (r.last_verified && r.as_of_date && r.last_verified < r.as_of_date)
      errors.push(err('R3-dates', r.id, `last_verified (${r.last_verified}) precedes as_of_date (${r.as_of_date})`));
  }
  return errors;
}

/** Rule 4 (MJ-2): effective bindingness = provision.bindingness ?? instrument.bindingness. */
export function effectiveBindingness(p: Provision, instrumentsById: Map<string, Instrument>): string | null {
  if (p.bindingness) return p.bindingness;
  return instrumentsById.get(p.instrument_id)?.bindingness ?? null;
}

export function checkBindingnessResolution(ds: Dataset): IntegrityError[] {
  const errors: IntegrityError[] = [];
  const byId = new Map(ds.instruments.map((i) => [i.id, i]));
  for (const p of ds.provisions) {
    if (!byId.has(p.instrument_id))
      errors.push(err('R4-bindingness', p.id, `instrument_id "${p.instrument_id}" does not resolve`));
    else if (effectiveBindingness(p, byId) === null)
      errors.push(err('R4-bindingness', p.id, 'effective bindingness could not be resolved'));
  }
  return errors;
}

/** Rules 5+6 (integrity rule 13 / MJ-11): A/T/R invariant per scenario; D/E divergence justified. */
export function checkDimensionInvariance(ds: Dataset): IntegrityError[] {
  const errors: IntegrityError[] = [];
  const byScenario = new Map<string, Assessment[]>();
  for (const a of currentVersions(ds.assessments)) {
    const list = byScenario.get(a.scenario_id) ?? [];
    list.push(a);
    byScenario.set(a.scenario_id, list);
  }
  for (const [sid, list] of byScenario) {
    if (list.length < 2) continue;
    for (const dim of ['A', 'T', 'R'] as const) {
      const scores = new Set(list.map((a) => a.dims[dim].score));
      if (scores.size > 1)
        errors.push(
          err('R5-ATR-invariance', sid, `dimension ${dim} differs across jurisdictions (${[...scores].join(',')}) — A/T/R must be identical (§13.6.1)`),
        );
    }
    for (const dim of ['D', 'E'] as const) {
      const scores = new Set(list.map((a) => a.dims[dim].score));
      if (scores.size > 1) {
        for (const a of list) {
          if (!a.dims[dim].divergence_justification?.trim())
            errors.push(
              err('R6-DE-divergence', a.id, `dimension ${dim} diverges across jurisdictions but has no jurisdiction-specific divergence_justification (§13.6.1)`),
            );
        }
      }
    }
  }
  return errors;
}

/** Rule 7 (CB-4): production builds reject fictional fixture records. */
export function checkNoFixturesInProduction(ds: Dataset, profile: BuildProfile): IntegrityError[] {
  if (profile !== 'production') return [];
  const errors: IntegrityError[] = [];
  const all: Array<{ id: string; fixture?: boolean }> = [
    ...ds.instruments, ...ds.provisions, ...ds.sources, ...ds.scenarios, ...ds.assessments,
  ];
  for (const r of all)
    if (r.fixture) errors.push(err('R7-no-fixtures-in-prod', r.id, 'fixture:true record present in a production build (CB-4)'));
  return errors;
}

/** Rule 8: production builds reject review_status other than published. */
export function checkPublishedOnlyInProduction(ds: Dataset, profile: BuildProfile): IntegrityError[] {
  if (profile !== 'production') return [];
  const errors: IntegrityError[] = [];
  const rows: Array<{ id: string; review_status: string }> = [...ds.instruments, ...ds.provisions, ...ds.assessments];
  for (const r of rows)
    if (r.review_status !== 'published')
      errors.push(err('R8-published-only', r.id, `review_status "${r.review_status}" not renderable in production (§19/PRD §15)`));
  return errors;
}

/** ADRS recompute gate (PRD §24.4/§24.5): runs in BOTH profiles — math is never relaxed. */
export function checkAdrsRecompute(ds: Dataset): IntegrityError[] {
  const errors: IntegrityError[] = [];
  for (const a of ds.assessments) {
    try {
      const result = computeAdrs({
        dims: Object.fromEntries(
          (['A', 'T', 'D', 'E', 'R'] as const).map((d) => [d, a.dims[d].score]),
        ) as Dims,
        mitigations: a.mitigations.map((m) => m.class as MitigationClass),
        j: Object.fromEntries(
          Object.entries(a.j_components).map(([k, v]) => [k, v.value]),
        ) as unknown as JComponents,
      });
      if (result.credit > 0.4 + 1e-12) errors.push(err('R-adrs', a.id, 'mitigation credit exceeds 0.40 cap'));
      if (result.j > 1.3 + 1e-12) errors.push(err('R-adrs', a.id, 'J exceeds 1.30 cap'));
      if (result.final > 100 + 1e-12) errors.push(err('R-adrs', a.id, 'final exceeds 100 cap'));
    } catch (e) {
      errors.push(err('R-adrs', a.id, `recompute failed: ${e instanceof Error ? e.message : String(e)}`));
    }
  }
  return errors;
}

/**
 * Current version per scenario×jurisdiction (MD-4): the highest version whose
 * review_status='published'. A draft/in_review re-score NEVER shadows a
 * published one. Only when a key has no published version at all (possible in
 * the fixtures profile, whose publication gate is relaxed — CB-4) does the
 * highest non-published version stand in.
 */
export function currentVersions(assessments: Assessment[]): Assessment[] {
  const published = new Map<string, Assessment>();
  const fallback = new Map<string, Assessment>();
  for (const a of assessments) {
    const key = `${a.scenario_id}:${a.jurisdiction_id}`;
    const pool = a.review_status === 'published' ? published : fallback;
    const prev = pool.get(key);
    if (!prev || a.version > prev.version) pool.set(key, a);
  }
  const out = new Map(fallback);
  for (const [key, a] of published) out.set(key, a); // published always wins
  return [...out.values()];
}

/**
 * SPEC §17: UNIQUE (scenario_id, jurisdiction_id, version). No database
 * enforces this in the content-as-files pipeline, so the integrity gate must —
 * otherwise a duplicate key is silently dropped by version selection.
 */
export function checkVersionUniqueness(ds: Dataset): IntegrityError[] {
  const errors: IntegrityError[] = [];
  const seen = new Map<string, string>();
  for (const a of ds.assessments) {
    const key = `${a.scenario_id}:${a.jurisdiction_id}:v${a.version}`;
    const prior = seen.get(key);
    if (prior)
      errors.push(err('R-version-unique', a.id, `duplicate (scenario, jurisdiction, version) key "${key}" also used by "${prior}" (SPEC §17 UNIQUE)`));
    else seen.set(key, a.id);
  }
  return errors;
}

/** Run every integrity rule; returns collected errors (empty = pass). */
export function runIntegrity(ds: Dataset, profile: BuildProfile): IntegrityError[] {
  return [
    ...checkSourceMetadata(ds),
    ...checkEpistemicSeparation(ds),
    ...checkDateFields(ds),
    ...checkBindingnessResolution(ds),
    ...checkDimensionInvariance(ds),
    ...checkVersionUniqueness(ds),
    ...checkNoFixturesInProduction(ds, profile),
    ...checkPublishedOnlyInProduction(ds, profile),
    ...checkAdrsRecompute(ds),
  ];
}
