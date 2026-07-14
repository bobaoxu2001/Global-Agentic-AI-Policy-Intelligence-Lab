/**
 * Publish-pipeline integrity validators (SPEC §17 integrity rules, PRD §24,
 * ENG §10 step 4). Zod handles per-record shape; these validators handle
 * CROSS-RECORD and PROFILE rules. Errors are collected, never fail-fast,
 * so an author can fix a batch in one pass (ENG §16).
 */
import { z } from 'zod';
import ownerSignoffLogJson from '../../../docs/research/OWNER_SIGNOFF_LOG.json';
import { computeAdrs, type Dims, type JComponents, type MitigationClass } from '../adrs';
import type {
  Assessment,
  ChangelogEntry,
  Control,
  ControlProvisionMap,
  Instrument,
  Provision,
  Scenario,
  SourceRecord,
} from '../schemas';
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
  changelog: ChangelogEntry[];
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
  const instrumentIds = new Set(ds.instruments.map((i) => i.id));
  for (const c of ds.changelog) {
    if (!sourceIds.has(c.source_id)) errors.push(err('R1-source-metadata', c.id, `source_id "${c.source_id}" does not resolve`));
    if (!instrumentIds.has(c.instrument_id)) errors.push(err('R1-source-metadata', c.id, `instrument_id "${c.instrument_id}" does not resolve`));
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
    ...ds.instruments, ...ds.provisions, ...ds.sources, ...ds.scenarios, ...ds.assessments, ...ds.changelog,
  ];
  for (const r of all)
    if (r.fixture) errors.push(err('R7-no-fixtures-in-prod', r.id, 'fixture:true record present in a production build (CB-4)'));
  return errors;
}

const OwnerSignoffDecisionSchema = z
  .object({
    record_id: z.string().trim().min(1),
    record_type: z.enum(['instrument', 'provision', 'assessment', 'changelog', 'control', 'control_provision_map']),
    owner_reviewer: z.string().trim().min(1),
    owner_decision: z.enum(['approved', 'returned_for_revision', 'blocked']),
    owner_reviewed_at: z.string().datetime({ offset: true }),
    official_source: z.string().url(),
    source_reference: z.string().trim().min(1),
    provision_inheritance: z.boolean(),
    prepared_by: z.string().trim().min(1),
    scope_note: z.string().trim().min(1),
  })
  .strict();

export const OwnerSignoffLogSchema = z
  .object({ decisions: z.array(OwnerSignoffDecisionSchema) })
  .strict();

type OwnerSignoffDecision = z.infer<typeof OwnerSignoffDecisionSchema>;
type PublishedRecordType = OwnerSignoffDecision['record_type'];

interface PublishedRecord {
  id: string;
  recordType: PublishedRecordType;
}

const decisionKey = (recordType: PublishedRecordType, recordId: string): string => `${recordType}:${recordId}`;
const normalizedPerson = (name: string): string => name.trim().toLocaleLowerCase('en-US');

/**
 * Rule 8: production renders a partial published subset. Draft and in-review
 * rows may remain in the authoring corpus, but every row selected for public
 * rendering needs a current, independent owner approval in the tracked log.
 */
export function checkProductionPublicationGate(
  ds: Dataset,
  controls: Control[],
  controlMaps: ControlProvisionMap[],
  profile: BuildProfile,
  rawOwnerSignoffLog: unknown = ownerSignoffLogJson,
): IntegrityError[] {
  if (profile !== 'production') return [];

  const errors: IntegrityError[] = [];
  const publishedInstruments = ds.instruments.filter((record) => record.review_status === 'published');
  const publishedProvisions = ds.provisions.filter((record) => record.review_status === 'published');
  const publishedChangelog = ds.changelog.filter((record) => record.review_status === 'published');

  // A production policy atlas needs at least one publishable policy anchor.
  // Working rows may coexist, but they do not make an empty public build valid.
  if (publishedInstruments.length === 0) {
    errors.push(
      err(
        'R8-publication-empty',
        'production',
        'no instrument has review_status "published"; at least one independently approved instrument is required',
      ),
    );
  }

  const publishedInstrumentIds = new Set(publishedInstruments.map((record) => record.id));
  for (const provision of publishedProvisions) {
    if (!publishedInstrumentIds.has(provision.instrument_id)) {
      errors.push(
        err(
          'R8-published-parent',
          provision.id,
          `published provision requires parent instrument "${provision.instrument_id}" to be published`,
        ),
      );
    }
  }
  for (const entry of publishedChangelog) {
    if (!publishedInstrumentIds.has(entry.instrument_id)) {
      errors.push(
        err(
          'R8-published-parent',
          entry.id,
          `published changelog entry requires parent instrument "${entry.instrument_id}" to be published`,
        ),
      );
    }
  }

  const parsedLog = OwnerSignoffLogSchema.safeParse(rawOwnerSignoffLog);
  if (!parsedLog.success) {
    for (const issue of parsedLog.error.issues) {
      const path = issue.path.length > 0 ? issue.path.join('.') : 'root';
      errors.push(err('R8-owner-log', path, issue.message));
    }
    return errors;
  }

  // The tracked file is append-only evidence. If a record has multiple owner
  // decisions, the latest dated decision governs so a later block cannot be
  // bypassed by an older approval.
  const latestDecisions = new Map<string, OwnerSignoffDecision>();
  for (const decision of parsedLog.data.decisions) {
    const key = decisionKey(decision.record_type, decision.record_id);
    const current = latestDecisions.get(key);
    if (!current || Date.parse(decision.owner_reviewed_at) >= Date.parse(current.owner_reviewed_at)) {
      latestDecisions.set(key, decision);
    }
  }

  const publishedRecords: PublishedRecord[] = [
    ...publishedInstruments.map((record) => ({ id: record.id, recordType: 'instrument' as const })),
    ...publishedProvisions.map((record) => ({ id: record.id, recordType: 'provision' as const })),
    ...ds.assessments
      .filter((record) => record.review_status === 'published')
      .map((record) => ({ id: record.id, recordType: 'assessment' as const })),
    ...publishedChangelog.map((record) => ({ id: record.id, recordType: 'changelog' as const })),
    ...controls
      .filter((record) => record.review_status === 'published')
      .map((record) => ({ id: record.id, recordType: 'control' as const })),
    ...controlMaps
      .filter((record) => record.review_status === 'published')
      .map((record) => ({ id: record.id, recordType: 'control_provision_map' as const })),
  ];

  for (const record of publishedRecords) {
    const decision = latestDecisions.get(decisionKey(record.recordType, record.id));
    if (!decision || decision.owner_decision !== 'approved') {
      const detail = decision ? `latest owner decision is "${decision.owner_decision}"` : 'no matching owner decision is recorded';
      errors.push(
        err(
          'R8-owner-approval',
          record.id,
          `published ${record.recordType} requires an approved decision in docs/research/OWNER_SIGNOFF_LOG.json; ${detail}`,
        ),
      );
      continue;
    }
    if (normalizedPerson(decision.owner_reviewer) === normalizedPerson(decision.prepared_by)) {
      errors.push(
        err(
          'R8-reviewer-independence',
          record.id,
          `owner_reviewer "${decision.owner_reviewer}" must differ from prepared_by "${decision.prepared_by}"`,
        ),
      );
    }
  }

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
export function runIntegrity(
  ds: Dataset,
  profile: BuildProfile,
  controls: Control[] = [],
  controlMaps: ControlProvisionMap[] = [],
): IntegrityError[] {
  return [
    ...checkSourceMetadata(ds),
    ...checkEpistemicSeparation(ds),
    ...checkDateFields(ds),
    ...checkBindingnessResolution(ds),
    ...checkDimensionInvariance(ds),
    ...checkVersionUniqueness(ds),
    ...checkNoFixturesInProduction(ds, profile),
    ...checkProductionPublicationGate(ds, controls, controlMaps, profile),
    ...checkAdrsRecompute(ds),
  ];
}
