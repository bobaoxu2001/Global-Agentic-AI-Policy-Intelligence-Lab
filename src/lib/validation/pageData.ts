/** Page-level access to the validated, profile-specific corpus. */
import { computeAdrs, displayScore, type Dims, type JComponents, type MitigationClass } from '../adrs';
import type { Assessment } from '../schemas';
import { getBuildProfile } from './buildProfile';
import { currentVersions } from './integrity';
import { loadAndValidate } from './loadDataset';

export function getPageDataset() {
  const profile = getBuildProfile();
  const { dataset, controls, controlMaps } = loadAndValidate(profile);
  // The renderer is fail-closed even in local production-mode diagnostics,
  // where validation may report unpublished working rows instead of exiting.
  const approved = <T extends { fixture?: boolean; review_status?: string }>(rows: T[]) =>
    profile === 'fixtures' ? rows.filter((row) => row.fixture === true) : profile === 'preview' ? rows.filter((row) => !row.fixture) : rows.filter((row) => !row.fixture && row.review_status === 'published');
  const instruments = approved(dataset.instruments);
  const provisions = approved(dataset.provisions);
  const selectedControls = approved(controls);
  const selectedProvisionIds = new Set(provisions.map((row) => row.id));
  const selectedControlIds = new Set(selectedControls.map((row) => row.id));
  const selectedControlMaps = approved(controlMaps).filter(
    (row) => selectedProvisionIds.has(row.provision_id) && selectedControlIds.has(row.control_id),
  );
  const selectedSourceIds = new Set([
    ...instruments.flatMap((row) => row.source_ids),
    ...provisions.flatMap((row) => [row.source_id, ...(row.translation_source_id ? [row.translation_source_id] : [])]),
  ]);
  return {
    profile,
    ...dataset,
    sources: profile === 'fixtures'
      ? dataset.sources.filter((row) => row.fixture === true)
      : dataset.sources.filter((row) => !row.fixture && (profile === 'preview' || selectedSourceIds.has(row.id))),
    instruments,
    provisions,
    scenarios: approved(dataset.scenarios),
    changelog: approved(dataset.changelog),
    controls: selectedControls,
    controlMaps: selectedControlMaps,
    assessments: currentVersions(approved(dataset.assessments) as Assessment[]),
  };
}

export function scoreAssessment(a: Assessment) {
  const result = computeAdrs({
    dims: Object.fromEntries((['A', 'T', 'D', 'E', 'R'] as const).map((d) => [d, a.dims[d].score])) as Dims,
    mitigations: a.mitigations.map((m) => m.class as MitigationClass),
    j: Object.fromEntries(Object.entries(a.j_components).map(([k, v]) => [k, v.value])) as unknown as JComponents,
  });
  return { ...result, display: displayScore(result.final) };
}
