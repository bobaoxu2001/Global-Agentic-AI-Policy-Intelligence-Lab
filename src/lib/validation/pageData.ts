/**
 * Page-level data access for Phase 0 shells. Profile-gated: fixture content is
 * served ONLY under BUILD_PROFILE=fixtures; production renders empty states
 * (real corpus arrives in Phase 1/2 through the reviewed pipeline).
 */
import { computeAdrs, displayScore, type Dims, type JComponents, type MitigationClass } from '../adrs';
import type { Assessment } from '../schemas';
import { getBuildProfile } from './buildProfile';
import { currentVersions } from './integrity';
import { loadAndValidate } from './loadDataset';

export function getPageDataset() {
  const profile = getBuildProfile();
  if (profile === 'production') {
    return {
      profile,
      instruments: [], provisions: [], sources: [], scenarios: [],
      assessments: [] as Assessment[],
    };
  }
  const { dataset } = loadAndValidate(profile);
  return { profile, ...dataset, assessments: currentVersions(dataset.assessments) };
}

export function scoreAssessment(a: Assessment) {
  const result = computeAdrs({
    dims: Object.fromEntries((['A', 'T', 'D', 'E', 'R'] as const).map((d) => [d, a.dims[d].score])) as Dims,
    mitigations: a.mitigations.map((m) => m.class as MitigationClass),
    j: Object.fromEntries(Object.entries(a.j_components).map(([k, v]) => [k, v.value])) as unknown as JComponents,
  });
  return { ...result, display: displayScore(result.final) };
}
