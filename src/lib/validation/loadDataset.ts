/**
 * Profile-aware dataset loader + full validation pipeline entry
 * (ENG §10 steps 1–4). Zod shape validation → cross-record integrity.
 * Fails with a collected, readable error report — never fail-fast (ENG §16).
 */
import assessmentsJson from '../../data/fixtures/assessments.json';
import contentChangelogJson from '../../data/content/changelog.json';
import contentControlsJson from '../../data/content/controls.json';
import contentInstrumentsJson from '../../data/content/instruments.json';
import contentProvisionsJson from '../../data/content/provisions.json';
import contentSourcesJson from '../../data/content/sources.json';
import instrumentsJson from '../../data/fixtures/instruments.json';
import provisionsJson from '../../data/fixtures/provisions.json';
import scenariosJson from '../../data/fixtures/scenarios.json';
import sourcesJson from '../../data/fixtures/sources.json';
import capabilitiesJson from '../../data/seeds/capabilities.json';
import risksJson from '../../data/seeds/risks.json';
import { z } from 'zod';
import {
  AssessmentSchema,
  ChangelogSchema,
  ControlSchema,
  CapabilitySeedSchema,
  InstrumentSchema,
  ProvisionSchema,
  RiskSeedSchema,
  ScenarioSchema,
  SourceSchema,
} from '../schemas';
import type { Control } from '../schemas';
import type { BuildProfile } from './buildProfile';
import { runIntegrity, type Dataset, type IntegrityError } from './integrity';

export interface ValidationReport {
  profile: BuildProfile;
  schemaErrors: Array<{ file: string; index: number; issues: string[] }>;
  integrityErrors: IntegrityError[];
  counts: Record<string, number>;
  ok: boolean;
}

function validateArray<S extends z.ZodTypeAny>(
  file: string,
  schema: S,
  rows: unknown[],
  out: ValidationReport['schemaErrors'],
): z.output<S>[] {
  const parsed: z.output<S>[] = [];
  rows.forEach((row, index) => {
    const r = schema.safeParse(row);
    if (r.success) parsed.push(r.data);
    else out.push({ file, index, issues: r.error.issues.map((i) => `${i.path.join('.')}: ${i.message}`) });
  });
  return parsed;
}

/** Validate seeds + content for the given profile. Seeds render in both profiles; fixture content only in `fixtures`. */
export function loadAndValidate(profile: BuildProfile): ValidationReport & { dataset: Dataset; controls: Control[] } {
  const schemaErrors: ValidationReport['schemaErrors'] = [];

  validateArray('seeds/capabilities.json', CapabilitySeedSchema, capabilitiesJson, schemaErrors);
  validateArray('seeds/risks.json', RiskSeedSchema, risksJson, schemaErrors);

  // Real research content (src/data/content/, non-fixture) is loaded in BOTH
  // profiles: production admits it subject to R8 (published-only); fixtures
  // profile previews in_review drafts (CB-4 relaxation).
  const dataset: Dataset = {
    sources: [
      ...validateArray('fixtures/sources.json', SourceSchema, sourcesJson, schemaErrors),
      ...validateArray('content/sources.json', SourceSchema, contentSourcesJson, schemaErrors),
    ],
    instruments: [
      ...validateArray('fixtures/instruments.json', InstrumentSchema, instrumentsJson, schemaErrors),
      ...validateArray('content/instruments.json', InstrumentSchema, contentInstrumentsJson, schemaErrors),
    ],
    provisions: [
      ...validateArray('fixtures/provisions.json', ProvisionSchema, provisionsJson, schemaErrors),
      ...validateArray('content/provisions.json', ProvisionSchema, contentProvisionsJson, schemaErrors),
    ],
    scenarios: validateArray('fixtures/scenarios.json', ScenarioSchema, scenariosJson, schemaErrors),
    assessments: validateArray('fixtures/assessments.json', AssessmentSchema, assessmentsJson, schemaErrors),
    changelog: validateArray('content/changelog.json', ChangelogSchema, contentChangelogJson, schemaErrors),
  };

  const controls = validateArray('content/controls.json', ControlSchema, contentControlsJson, schemaErrors);
  const integrityErrors = runIntegrity(dataset, profile);

  return {
    profile,
    schemaErrors,
    integrityErrors,
    counts: {
      capabilities: capabilitiesJson.length,
      risks: risksJson.length,
      sources: dataset.sources.length,
      instruments: dataset.instruments.length,
      provisions: dataset.provisions.length,
      scenarios: dataset.scenarios.length,
      assessments: dataset.assessments.length,
      changelog: dataset.changelog.length,
      controls: controls.length,
    },
    ok: schemaErrors.length === 0 && integrityErrors.length === 0,
    dataset,
    controls,
  };
}
