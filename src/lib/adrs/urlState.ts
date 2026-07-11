/**
 * ADRS calculator permalink codec (AC-ADRS-8) — shared by the client island
 * and server components (scenario deep links, AC-ADRS-11). Clamps invalid
 * params instead of crashing (AC-ERR-2).
 */
import { MITIGATION_CREDITS, type DimScore, type Dims, type JComponents, type MitigationClass } from './index';

export interface CalcState { dims: Dims; mits: MitigationClass[]; j: JComponents }

export const CALC_DEFAULT: CalcState = {
  dims: { A: 0, T: 0, D: 0, E: 0, R: 0 },
  mits: [],
  j: { binding_hit: 0, near_term_hit: 0, enforcement_posture: 0, prohibition_adjacent: 0 },
};

const DIMS = ['A', 'T', 'D', 'E', 'R'] as const;

export function decodeCalcState(search: string): CalcState {
  const q = new URLSearchParams(search);
  const clampDim = (v: string | null): DimScore => {
    const n = Number(v);
    return (Number.isInteger(n) && n >= 0 && n <= 4 ? n : 0) as DimScore;
  };
  const bit = (v: string | null): 0 | 1 => (v === '1' ? 1 : 0);
  const validM = new Set(Object.keys(MITIGATION_CREDITS));
  return {
    dims: { A: clampDim(q.get('A')), T: clampDim(q.get('T')), D: clampDim(q.get('D')), E: clampDim(q.get('E')), R: clampDim(q.get('R')) },
    mits: (q.get('m')?.split(',') ?? []).filter((m): m is MitigationClass => validM.has(m)),
    j: { binding_hit: bit(q.get('binding')), near_term_hit: bit(q.get('near')), enforcement_posture: bit(q.get('enf')), prohibition_adjacent: bit(q.get('proh')) },
  };
}

export function encodeCalcState(s: CalcState): string {
  const q = new URLSearchParams();
  for (const d of DIMS) q.set(d, String(s.dims[d]));
  if (s.mits.length) q.set('m', [...s.mits].sort().join(','));
  q.set('binding', String(s.j.binding_hit));
  q.set('near', String(s.j.near_term_hit));
  q.set('enf', String(s.j.enforcement_posture));
  q.set('proh', String(s.j.prohibition_adjacent));
  return q.toString();
}
