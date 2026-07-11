/**
 * ADRS — Agent Deployment Risk Score. Canonical formula module.
 *
 * [LOCKED] per SPEC.md §12–§13 and ENGINEERING_HANDOFF §9/§20: every constant,
 * cap, and boundary here is normative. Do not change without editing SPEC.md first.
 *
 * Numeric convention (SPEC §13.7): all computation at full floating-point
 * precision with NO intermediate rounding; tier derived from the RAW score;
 * `displayScore` rounds for presentation only and its output must never be
 * fed back into the formula.
 *
 * Floating-point note (PHASE_0_CODE_REVIEW F-1): in IEEE-754,
 * 1.00 + 0.10 + 0.05 + 0.05 + 0.10 === 1.3000000000000003 > 1.30.
 * The J clamp below is therefore LOAD-BEARING, not defensive decoration.
 */

export const WEIGHTS = { A: 0.25, T: 0.2, D: 0.2, E: 0.15, R: 0.2 } as const; // §13.2

export const MITIGATION_CREDITS = {
  M1: 0.1,
  M2: 0.08,
  M3: 0.07,
  M4: 0.06,
  M5: 0.05,
  M6: 0.04,
  M7: 0.04,
  M8: 0.03,
  M9: 0.03,
} as const; // §13.4

export const MITIGATION_CAP = 0.4; // §13.4
export const J_CAP = 1.3; // §13.5
export const ADRS_CAP = 100; // §13.1

export const J_COMPONENT_WEIGHTS = {
  binding_hit: 0.1,
  near_term_hit: 0.05,
  enforcement_posture: 0.05,
  prohibition_adjacent: 0.1,
} as const; // §13.5

export type Dimension = 'A' | 'T' | 'D' | 'E' | 'R';
export type DimScore = 0 | 1 | 2 | 3 | 4;
export type Dims = Record<Dimension, DimScore>;
export type MitigationClass = keyof typeof MITIGATION_CREDITS;
export type JComponentName = keyof typeof J_COMPONENT_WEIGHTS;
export type JComponents = Record<JComponentName, 0 | 1>;
export type Tier = 'low' | 'moderate' | 'high' | 'critical';

const DIMENSIONS: readonly Dimension[] = ['A', 'T', 'D', 'E', 'R'];
const J_COMPONENTS: readonly JComponentName[] = [
  'binding_hit',
  'near_term_hit',
  'enforcement_posture',
  'prohibition_adjacent',
];

/** InherentRisk = Σ (w_i × d_i × 25) ∈ [0, 100]. §13.1 */
export function inherentRisk(d: Dims): number {
  let sum = 0;
  for (const k of DIMENSIONS) {
    const score = d[k];
    if (!Number.isInteger(score) || score < 0 || score > 4) {
      throw new RangeError(`dimension ${k} must be an integer 0–4, got ${String(score)}`);
    }
    sum += WEIGHTS[k] * score * 25;
  }
  return sum;
}

/** MitigationCredit = min(0.40, Σ m_j). §13.4 — cap is normative. */
export function mitigationCredit(mitigations: readonly MitigationClass[]): number {
  const seen = new Set<MitigationClass>();
  let sum = 0;
  for (const m of mitigations) {
    if (seen.has(m)) throw new RangeError(`duplicate mitigation class ${m}`);
    seen.add(m);
    sum += MITIGATION_CREDITS[m];
  }
  return Math.min(MITIGATION_CAP, sum);
}

/** ResidualRisk = InherentRisk × (1 − credit). §13.1 */
export function residualRisk(inherent: number, credit: number): number {
  return inherent * (1 - credit);
}

/** J = 1 + Σ w·c, clamped to 1.30. Clamp is load-bearing in IEEE-754 (F-1). §13.5 */
export function jMultiplier(j: JComponents): number {
  let raw = 1;
  for (const k of J_COMPONENTS) {
    const v = j[k];
    if (v !== 0 && v !== 1) throw new RangeError(`J component ${k} must be 0 or 1`);
    raw += J_COMPONENT_WEIGHTS[k] * v;
  }
  return Math.min(J_CAP, raw);
}

/** ADRS = min(100, residual × J). §13.1 */
export function adrs(residual: number, j: number): number {
  return Math.min(ADRS_CAP, residual * j);
}

/**
 * Half-open tier intervals (SPEC §12, CB-2):
 * Low [0,25) · Moderate [25,50) · High [50,75) · Critical [75,100].
 * Applied to the RAW (unrounded) score.
 */
export function tierOf(score: number): Tier {
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    throw new RangeError(`score must be within [0, 100], got ${String(score)}`);
  }
  if (score < 25) return 'low';
  if (score < 50) return 'moderate';
  if (score < 75) return 'high';
  return 'critical';
}

/** DISPLAY ONLY: round to one decimal place. Never re-enter into the formula. §13.7 */
export function displayScore(raw: number): number {
  return Math.round(raw * 10) / 10;
}

export interface AdrsInput {
  dims: Dims;
  mitigations: readonly MitigationClass[];
  j: JComponents;
}

export interface AdrsResult {
  /** all raw full-precision values; tier derived from raw `final` */
  inherent: number;
  credit: number;
  creditCapped: boolean;
  residual: number;
  j: number;
  final: number;
  tier: Tier;
  contributions: Record<Dimension, number>; // w_i·d_i·25 per dimension
}

export function computeAdrs(input: AdrsInput): AdrsResult {
  const contributions = Object.fromEntries(
    DIMENSIONS.map((k) => [k, WEIGHTS[k] * input.dims[k] * 25]),
  ) as Record<Dimension, number>;
  const inherent = inherentRisk(input.dims);
  const uncapped = input.mitigations.reduce((s, m) => s + MITIGATION_CREDITS[m], 0);
  const credit = mitigationCredit(input.mitigations);
  const residual = residualRisk(inherent, credit);
  const j = jMultiplier(input.j);
  const final = adrs(residual, j);
  return {
    inherent,
    credit,
    creditCapped: uncapped > MITIGATION_CAP,
    residual,
    j,
    final,
    tier: tierOf(final),
    contributions,
  };
}
