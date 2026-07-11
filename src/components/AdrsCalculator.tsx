'use client';

/**
 * Phase 0 minimal ADRS calculator — logic-complete, deliberately unstyled.
 * Imports the ONE canonical formula module (no duplicated math). Behavior per
 * FR-5 / INTERACTION_SPEC §4–§6: integer anchors, evidence-labeled mitigation
 * toggles, manual J components; jurisdiction select shows reference text only
 * and NEVER changes J inputs (CB-3 / AC-ADRS-10). Live full-precision
 * arithmetic; display rounded to 1 dp; tier from the raw score.
 */
import { useState } from 'react';
import {
  computeAdrs,
  displayScore,
  J_COMPONENT_WEIGHTS,
  MITIGATION_CREDITS,
  WEIGHTS,
  type Dimension,
  type Dims,
  type DimScore,
  type JComponentName,
  type JComponents,
  type MitigationClass,
} from '@/lib/adrs';

const DIMS: Dimension[] = ['A', 'T', 'D', 'E', 'R'];
const JURS = ['none', 'us', 'eu', 'sg', 'cn'] as const;
const JUR_REF: Record<string, string> = {
  none: 'No jurisdiction selected. The four J components below are always set manually by the analyst.',
  us: 'Reference material (Phase 0 placeholder): US component definitions render here in Phase 1. Selecting this changed nothing on the right — set the J toggles yourself.',
  eu: 'Reference material (Phase 0 placeholder): EU component definitions render here in Phase 1. Selecting this changed nothing on the right — set the J toggles yourself.',
  sg: 'Reference material (Phase 0 placeholder): SG component definitions render here in Phase 1. Selecting this changed nothing on the right — set the J toggles yourself.',
  cn: 'Reference material (Phase 0 placeholder): CN component definitions render here in Phase 1. Selecting this changed nothing on the right — set the J toggles yourself.',
};

export function AdrsCalculator() {
  const [dims, setDims] = useState<Dims>({ A: 0, T: 0, D: 0, E: 0, R: 0 });
  const [mits, setMits] = useState<MitigationClass[]>([]);
  const [j, setJ] = useState<JComponents>({
    binding_hit: 0, near_term_hit: 0, enforcement_posture: 0, prohibition_adjacent: 0,
  });
  const [jurisdiction, setJurisdiction] = useState<string>('none');

  const r = computeAdrs({ dims, mitigations: mits, j });

  return (
    <div data-testid="adrs-calculator">
      {DIMS.map((d) => (
        <fieldset key={d}>
          <legend>
            {d} (weight {WEIGHTS[d]}) — integer anchors only
          </legend>
          {([0, 1, 2, 3, 4] as DimScore[]).map((v) => (
            <label key={v} style={{ marginRight: 8 }}>
              <input
                type="radio"
                name={`dim-${d}`}
                checked={dims[d] === v}
                onChange={() => setDims({ ...dims, [d]: v })}
              />
              {v}
            </label>
          ))}
        </fieldset>
      ))}

      <fieldset>
        <legend>Mitigations (evidence required to claim; credit capped at 0.40)</legend>
        {(Object.keys(MITIGATION_CREDITS) as MitigationClass[]).map((m) => (
          <label key={m} style={{ marginRight: 8 }}>
            <input
              type="checkbox"
              checked={mits.includes(m)}
              onChange={() =>
                setMits((prev) => (prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]))
              }
            />
            {m} (+{MITIGATION_CREDITS[m]})
          </label>
        ))}
        {r.creditCapped ? <p data-testid="cap-notice"><b>Mitigation credit capped at 40%.</b></p> : null}
      </fieldset>

      <fieldset>
        <legend>Jurisdiction — reference material only; never auto-sets J (CB-3)</legend>
        <select
          aria-label="Jurisdiction reference"
          value={jurisdiction}
          onChange={(e) => setJurisdiction(e.target.value)}
          data-testid="jurisdiction-select"
        >
          {JURS.map((x) => (
            <option key={x} value={x}>{x}</option>
          ))}
        </select>
        <p style={{ fontSize: 12 }} data-testid="jurisdiction-ref">{JUR_REF[jurisdiction]}</p>
      </fieldset>

      <fieldset>
        <legend>J components — set manually (0/1)</legend>
        {(Object.keys(J_COMPONENT_WEIGHTS) as JComponentName[]).map((k) => (
          <label key={k} style={{ marginRight: 10 }}>
            <input
              type="checkbox"
              checked={j[k] === 1}
              onChange={() => setJ({ ...j, [k]: j[k] === 1 ? 0 : 1 })}
              data-testid={`j-${k}`}
            />
            {k} (+{J_COMPONENT_WEIGHTS[k]})
          </label>
        ))}
      </fieldset>

      <h2>Live arithmetic (full precision; display 1 dp; tier from raw)</h2>
      <table data-testid="arithmetic">
        <tbody>
          {DIMS.map((d) => (
            <tr key={d}><td>contribution {d}</td><td>{r.contributions[d].toFixed(2)}</td></tr>
          ))}
          <tr><td>InherentRisk</td><td data-testid="out-inherent">{r.inherent.toFixed(2)}</td></tr>
          <tr><td>MitigationCredit</td><td data-testid="out-credit">{r.credit.toFixed(2)}</td></tr>
          <tr><td>ResidualRisk (raw)</td><td data-testid="out-residual">{r.residual.toFixed(4)}</td></tr>
          <tr><td>J</td><td data-testid="out-j">{r.j.toFixed(2)}</td></tr>
          <tr><td>ADRS (display)</td><td data-testid="out-final">{displayScore(r.final).toFixed(1)}</td></tr>
          <tr><td>Tier</td><td data-testid="out-tier">{r.tier}</td></tr>
        </tbody>
      </table>
      <p style={{ fontSize: 12 }}>This is not a compliance determination.</p>
    </div>
  );
}
