/**
 * ADRS formula unit tests — ENGINEERING_HANDOFF §12.1 items 1–12.
 * All numeric assertions compare RAW full-precision values with tolerance ±0.001
 * (SPEC §13.7). Only these pure formula tests may hardcode expected values (MJ-10).
 */
import { describe, expect, it } from 'vitest';
import {
  adrs,
  computeAdrs,
  displayScore,
  inherentRisk,
  jMultiplier,
  J_CAP,
  MITIGATION_CREDITS,
  mitigationCredit,
  residualRisk,
  tierOf,
  type Dims,
  type JComponents,
  type MitigationClass,
} from './index';

const TOL = 0.001;
const ARIA: Dims = { A: 3, T: 3, D: 3, E: 2, R: 2 };
const SENTINEL: Dims = { A: 3, T: 4, D: 1, E: 1, R: 3 };
const MIRA: Dims = { A: 2, T: 1, D: 3, E: 3, R: 3 };

describe('§12.1.1–3 Aria worked example (full-precision chain)', () => {
  it('1. inherentRisk(Aria) = 66.25', () => {
    expect(inherentRisk(ARIA)).toBeCloseTo(66.25, 3);
  });
  it('2. credit [M2,M3,M4,M5,M8] = 0.29; residualRisk(66.25, 0.29) = 47.0375', () => {
    const credit = mitigationCredit(['M2', 'M3', 'M4', 'M5', 'M8']);
    expect(credit).toBeCloseTo(0.29, 3);
    expect(residualRisk(66.25, 0.29)).toBeCloseTo(47.0375, 3);
  });
  it('3. unrounded chain: EU 56.445 → high; SG/US 51.74125 → high; displays 47.0/56.4/51.7', () => {
    const residual = residualRisk(66.25, mitigationCredit(['M2', 'M3', 'M4', 'M5', 'M8']));
    const eu = adrs(residual, 1.2);
    const sg = adrs(residual, 1.1);
    expect(eu).toBeCloseTo(56.445, 3);
    expect(sg).toBeCloseTo(51.74125, 3);
    expect(tierOf(eu)).toBe('high');
    expect(tierOf(sg)).toBe('high');
    expect(displayScore(residual)).toBe(47.0);
    expect(displayScore(eu)).toBe(56.4);
    expect(displayScore(sg)).toBe(51.7);
  });
});

describe('§12.1.4 Sentinel worked example', () => {
  it('inherent 62.5; credit 0.32; residual 42.5 → moderate', () => {
    expect(inherentRisk(SENTINEL)).toBeCloseTo(62.5, 3);
    const credit = mitigationCredit(['M2', 'M3', 'M4', 'M6', 'M7', 'M9']);
    expect(credit).toBeCloseTo(0.32, 3);
    const residual = residualRisk(62.5, credit);
    expect(residual).toBeCloseTo(42.5, 3);
    expect(tierOf(adrs(residual, 1.05))).toBe('moderate');
    expect(tierOf(adrs(residual, 1.1))).toBe('moderate');
  });
});

describe('§12.1.5 Mira worked example', () => {
  it('inherent 58.75; credit 0.15; residual 49.9375; CN 64.91875 high; EU 62.421875 high', () => {
    expect(inherentRisk(MIRA)).toBeCloseTo(58.75, 3);
    const credit = mitigationCredit(['M3', 'M5', 'M8']);
    expect(credit).toBeCloseTo(0.15, 3);
    const residual = residualRisk(58.75, credit);
    expect(residual).toBeCloseTo(49.9375, 3);
    expect(tierOf(residual)).toBe('moderate'); // 49.9375 < 50 — half-open boundary matters
    const cn = adrs(residual, 1.3);
    const eu = adrs(residual, 1.25);
    expect(cn).toBeCloseTo(64.91875, 3);
    expect(eu).toBeCloseTo(62.421875, 3);
    expect(tierOf(cn)).toBe('high');
    expect(tierOf(eu)).toBe('high');
  });
});

describe('§12.1.6 mitigation cap', () => {
  it('sum of all M1..M9 = 0.50 clamps to 0.40; creditCapped=true', () => {
    const all = Object.keys(MITIGATION_CREDITS) as MitigationClass[];
    const rawSum = all.reduce((s, m) => s + MITIGATION_CREDITS[m], 0);
    expect(rawSum).toBeCloseTo(0.5, 3);
    expect(mitigationCredit(all)).toBeCloseTo(0.4, 10);
    const r = computeAdrs({
      dims: ARIA,
      mitigations: all,
      j: { binding_hit: 0, near_term_hit: 0, enforcement_posture: 0, prohibition_adjacent: 0 },
    });
    expect(r.creditCapped).toBe(true);
    expect(r.credit).toBeCloseTo(0.4, 10);
  });
  it('credit never exceeds 0.40 and residual is never below 60% of inherent (all 512 subsets)', () => {
    const all = Object.keys(MITIGATION_CREDITS) as MitigationClass[];
    for (let mask = 0; mask < 1 << all.length; mask++) {
      const subset = all.filter((_, i) => mask & (1 << i));
      const credit = mitigationCredit(subset);
      expect(credit).toBeLessThanOrEqual(0.4 + 1e-12);
      const residual = residualRisk(66.25, credit);
      expect(residual).toBeGreaterThanOrEqual(0.6 * 66.25 - 1e-9);
    }
  });
});

describe('§12.1.7 J multiplier — invariant + F-1 floating-point clamp', () => {
  it('all four components = 1 → exactly 1.30 after clamping', () => {
    const j = jMultiplier({
      binding_hit: 1,
      near_term_hit: 1,
      enforcement_posture: 1,
      prohibition_adjacent: 1,
    });
    expect(j).toBe(1.3); // exact — only true BECAUSE of the clamp (raw float sum is 1.3000000000000003)
  });
  it('F-1: the unclamped IEEE-754 sum exceeds 1.30, proving the clamp is load-bearing', () => {
    const rawFloatSum = 1.0 + 0.1 + 0.05 + 0.05 + 0.1;
    expect(rawFloatSum).toBeGreaterThan(1.3);
    expect(jMultiplier({ binding_hit: 1, near_term_hit: 1, enforcement_posture: 1, prohibition_adjacent: 1 })).toBeLessThanOrEqual(J_CAP);
  });
  it('property: every 0/1 combination yields J ∈ [1.00, 1.30]', () => {
    for (let mask = 0; mask < 16; mask++) {
      const j: JComponents = {
        binding_hit: (mask & 1 ? 1 : 0) as 0 | 1,
        near_term_hit: (mask & 2 ? 1 : 0) as 0 | 1,
        enforcement_posture: (mask & 4 ? 1 : 0) as 0 | 1,
        prohibition_adjacent: (mask & 8 ? 1 : 0) as 0 | 1,
      };
      const v = jMultiplier(j);
      expect(v).toBeGreaterThanOrEqual(1.0);
      expect(v).toBeLessThanOrEqual(1.3);
    }
  });
  it('binding+near = 1.15 (AC-JUR-1)', () => {
    expect(
      jMultiplier({ binding_hit: 1, near_term_hit: 1, enforcement_posture: 0, prohibition_adjacent: 0 }),
    ).toBeCloseTo(1.15, 3);
  });
});

describe('§12.1.8 ADRS cap', () => {
  it('adrs(90, 1.30) = 117 → clamps to 100 → critical', () => {
    const v = adrs(90, 1.3);
    expect(v).toBe(100);
    expect(tierOf(v)).toBe('critical');
  });
});

describe('§12.1.9 tierOf — half-open boundaries (CB-2 / AC-ADRS-7)', () => {
  const cases: Array<[number, string]> = [
    [24.999, 'low'],
    [25.0, 'moderate'],
    [49.999, 'moderate'],
    [50.0, 'high'],
    [74.999, 'high'],
    [75.0, 'critical'],
    [0, 'low'],
    [100, 'critical'],
  ];
  for (const [score, tier] of cases) {
    it(`tierOf(${score}) = ${tier}`, () => expect(tierOf(score)).toBe(tier));
  }
  it('rejects out-of-range scores', () => {
    expect(() => tierOf(-0.001)).toThrow(RangeError);
    expect(() => tierOf(100.001)).toThrow(RangeError);
    expect(() => tierOf(Number.NaN)).toThrow(RangeError);
  });
});

describe('§12.1.12 display rounding is separate and never re-entered (AC-ADRS-12)', () => {
  it('raw path ≠ wrongly-rounded path: 56.445 vs 56.4', () => {
    const rawChain = adrs(residualRisk(66.25, 0.29), 1.2);
    const roundedChain = adrs(displayScore(residualRisk(66.25, 0.29)), 1.2);
    expect(rawChain).toBeCloseTo(56.445, TOL);
    expect(roundedChain).toBeCloseTo(56.4, TOL);
    expect(rawChain).not.toBe(roundedChain);
  });
  it('displayScore rounds to exactly one decimal place', () => {
    expect(displayScore(47.0375)).toBe(47.0);
    expect(displayScore(49.9375)).toBe(49.9);
    expect(displayScore(64.91875)).toBe(64.9);
    expect(displayScore(62.421875)).toBe(62.4);
  });
  it('tier is derived from raw, not display: 49.96 → moderate although it displays 50.0', () => {
    expect(displayScore(49.96)).toBe(50.0);
    expect(tierOf(49.96)).toBe('moderate');
  });
});

describe('computeAdrs end-to-end + determinism', () => {
  it('reproduces Aria EU exactly and is deterministic', () => {
    const input = {
      dims: ARIA,
      mitigations: ['M2', 'M3', 'M4', 'M5', 'M8'] as MitigationClass[],
      j: { binding_hit: 1, near_term_hit: 1, enforcement_posture: 1, prohibition_adjacent: 0 } as JComponents, // 1.20
    };
    const a = computeAdrs(input);
    const b = computeAdrs(input);
    expect(a).toEqual(b);
    expect(a.j).toBeCloseTo(1.2, 10);
    expect(a.final).toBeCloseTo(56.445, TOL);
    expect(a.tier).toBe('high');
    expect(a.contributions.A).toBeCloseTo(18.75, TOL);
  });
  it('jurisdiction labels are not an input: J is a pure function of the four components only', () => {
    // There is no jurisdiction parameter anywhere in this module's API —
    // changing a jurisdiction label cannot modify J inputs (AC-ADRS-10).
    const j1 = jMultiplier({ binding_hit: 1, near_term_hit: 0, enforcement_posture: 0, prohibition_adjacent: 0 });
    const j2 = jMultiplier({ binding_hit: 1, near_term_hit: 0, enforcement_posture: 0, prohibition_adjacent: 0 });
    expect(j1).toBe(j2);
  });
  it('rejects non-integer and out-of-range dimension scores', () => {
    expect(() => inherentRisk({ ...ARIA, A: 2.5 as never })).toThrow(RangeError);
    expect(() => inherentRisk({ ...ARIA, T: 5 as never })).toThrow(RangeError);
    expect(() => mitigationCredit(['M2', 'M2'] as MitigationClass[])).toThrow(RangeError);
    expect(() =>
      jMultiplier({ binding_hit: 2 as never, near_term_hit: 0, enforcement_posture: 0, prohibition_adjacent: 0 }),
    ).toThrow(RangeError);
  });
});
