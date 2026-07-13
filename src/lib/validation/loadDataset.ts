/**
 * Profile-aware dataset loader + full validation pipeline entry
 * (ENG §10 steps 1–4). Zod shape validation → cross-record integrity.
 * Fails with a collected, readable error report — never fail-fast (ENG §16).
 */
import assessmentsJson from '../../data/fixtures/assessments.json';
import contentChangelogJson from '../../data/content/changelog.json';
import contentControlsJson from '../../data/content/controls.json';
import contentControlMapsJson from '../../data/content/control-provision-map.json';
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
  ControlProvisionMapSchema,
  CapabilitySeedSchema,
  InstrumentSchema,
  ProvisionSchema,
  RiskSeedSchema,
  ScenarioSchema,
  SourceSchema,
} from '../schemas';
import type { Control, ControlProvisionMap } from '../schemas';
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

/**
 * Validate the profile-specific corpus. Seeds and the control catalog are shared
 * reference material. Every policy record, scenario, and assessment belongs to
 * exactly one profile: illustrative fixtures or reviewed production content.
 */
export function loadAndValidate(profile: BuildProfile): ValidationReport & { dataset: Dataset; controls: Control[]; controlMaps: ControlProvisionMap[] } {
  const schemaErrors: ValidationReport['schemaErrors'] = [];

  validateArray('seeds/capabilities.json', CapabilitySeedSchema, capabilitiesJson, schemaErrors);
  validateArray('seeds/risks.json', RiskSeedSchema, risksJson, schemaErrors);

  const fixtureProfile = profile === 'fixtures';
  const sourceRows = fixtureProfile ? sourcesJson : contentSourcesJson;
  const instrumentRows = fixtureProfile ? instrumentsJson : contentInstrumentsJson;
  const provisionRows = fixtureProfile ? provisionsJson : contentProvisionsJson;

  // Fixture mode is an isolated illustrative demo. Production is an equally
  // isolated research corpus and is still checked by R7/R8 below. Keeping the
  // selection here—not as a later UI filter—prevents fixture leakage into a
  // deployable build.
  const dataset: Dataset = {
    sources: validateArray(fixtureProfile ? 'fixtures/sources.json' : 'content/sources.json', SourceSchema, sourceRows, schemaErrors),
    instruments: validateArray(fixtureProfile ? 'fixtures/instruments.json' : 'content/instruments.json', InstrumentSchema, instrumentRows, schemaErrors),
    provisions: validateArray(fixtureProfile ? 'fixtures/provisions.json' : 'content/provisions.json', ProvisionSchema, provisionRows, schemaErrors),
    scenarios: fixtureProfile ? validateArray('fixtures/scenarios.json', ScenarioSchema, scenariosJson, schemaErrors) : [],
    assessments: fixtureProfile ? validateArray('fixtures/assessments.json', AssessmentSchema, assessmentsJson, schemaErrors) : [],
    changelog: fixtureProfile ? [] : validateArray('content/changelog.json', ChangelogSchema, contentChangelogJson, schemaErrors),
  };

  // The K-series catalog and its mappings are research content too. They are
  // intentionally withheld from the fixture demo unless a dedicated fixture
  // catalog is authored.
  const controls = fixtureProfile ? [] : validateArray('content/controls.json', ControlSchema, contentControlsJson, schemaErrors);
  const controlMaps = fixtureProfile ? [] : validateArray('content/control-provision-map.json', ControlProvisionMapSchema, contentControlMapsJson, schemaErrors);
  const integrityErrors = runIntegrity(dataset, profile);
  // P2-7 FK gate: every mapping must resolve to a real control AND provision.
  const controlIds = new Set(controls.map((c) => c.id));
  const provisionIds = new Set(dataset.provisions.map((p) => p.id));
  for (const m of controlMaps) {
    if (!controlIds.has(m.control_id))
      integrityErrors.push({ rule: 'R-control-map', entity: m.id, message: `control_id "${m.control_id}" does not resolve` });
    if (!provisionIds.has(m.provision_id))
      integrityErrors.push({ rule: 'R-control-map', entity: m.id, message: `provision_id "${m.provision_id}" does not resolve` });
  }

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
      controlMaps: controlMaps.length,
    },
    ok: schemaErrors.length === 0 && integrityErrors.length === 0,
    dataset,
    controls,
    controlMaps,
  };
}
