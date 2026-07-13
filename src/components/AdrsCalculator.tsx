'use client';

/**
 * P1 ADRS calculator — FR-5 / INTERACTION_SPEC §4–§6 complete:
 * integer anchors WITH §13.3 anchor text; evidence-labeled mitigation toggles
 * with cap indicator; manual J components (jurisdiction select shows reference
 * material only and NEVER changes J inputs — CB-3 / AC-ADRS-10); live
 * full-precision arithmetic (tier from RAW); shareable URL permalink state
 * (AC-ADRS-8). Imports the ONE canonical formula module.
 */
import { useEffect, useMemo, useState } from 'react';
import {
  computeAdrs,
  displayScore,
  J_COMPONENT_WEIGHTS,
  MITIGATION_CREDITS,
  WEIGHTS,
  type Dimension,
  type DimScore,
  type JComponentName,
  type MitigationClass,
} from '@/lib/adrs';
import { CALC_DEFAULT, decodeCalcState, encodeCalcState, type CalcState } from '@/lib/adrs/urlState';
import { TierBadge } from './semantic';

const DIMS: Dimension[] = ['A', 'T', 'D', 'E', 'R'];
const DIM_NAME: Record<Dimension, string> = {
  A: 'Autonomy', T: 'Action surface', D: 'Data sensitivity', E: 'External reach', R: 'Irreversibility',
};

/** SPEC §13.3 anchor rubrics — methodology text, locked. */
const ANCHORS: Record<Dimension, [string, string, string, string, string]> = {
  A: [
    'Human initiates and approves every action (tool-suggestion only)',
    'Human approves each effectful action; agent auto-executes read-only steps',
    'Human approves batches/plans; agent executes steps within approved plan',
    'Agent executes autonomously within hard policy limits; human reviews asynchronously',
    'Agent executes autonomously, sets own sub-goals, or delegates to other agents (C7+C10)',
  ],
  T: [
    'No tools (generation only)',
    'Read-only tools (C4)',
    'State-changing tools in a sandbox or on low-consequence systems (C5, contained)',
    'State-changing tools on production systems or customer-facing state (refunds, config changes)',
    'High-potency tools: financial execution (C12), security controls, fleet-wide operations, or runtime scope acquisition (C11)',
  ],
  D: [
    'Public or synthetic data only',
    'Internal non-personal business data (C2)',
    'Ordinary personal data (C3, identified users)',
    "Sensitive categories (health, financial, biometric) or minors' data, or large-scale profiling (C9)",
    'Level 3 at scale, plus cross-border transfer of that data in the operating flow (R8)',
  ],
  E: [
    'Outputs visible only to internal operators',
    'Outputs to authenticated end users, clearly in-product',
    'One-to-one outbound communications to external parties (C6: email, support tickets)',
    'Public-facing content or actions on third-party platforms (C1+C6 public)',
    'Level 3 plus contractual/financial commitments to external parties (C12)',
  ],
  R: [
    'All actions trivially reversible (draft-only)',
    'Reversible with routine effort (editable records, soft deletes)',
    'Reversible with significant effort or cost (mass emails sent, refunds issued)',
    'Practically irreversible economic/reputational effects (public content spread, contractual commitments)',
    'Irreversible harm to persons, safety, or critical infrastructure in the plausible worst case',
  ],
};

/** SPEC §13.4 evidence requirements (shown on each toggle). */
const MIT_LABEL: Record<MitigationClass, string> = {
  M1: 'HITL gate on all effectful actions — architecturally enforced before the tool-execution boundary, anti-rubber-stamping',
  M2: 'Least-privilege tool scoping — per-task credentials, deny-by-default registry, no standing write credentials',
  M3: 'Comprehensive action audit log — immutable, per tool call, with trace ID (§18.5)',
  M4: 'Hard action limits & kill-switch — rate/value/blast-radius limits enforced outside the model; tested kill-switch',
  M5: 'Data minimization & redaction — PII filtering before model context; memory retention limits',
  M6: 'Adversarial-input defenses — prompt-injection testing; untrusted-content isolation',
  M7: 'Independent pre-deployment review — documented, by a party outside the building team',
  M8: 'AI-disclosure & content labeling — users informed; synthetic content labeled per jurisdiction',
  M9: 'Incident response runbook — tested rollback and notification procedure',
};

/** SPEC §13.5 J-component definitions — jurisdiction-neutral reference material until reviewed research is published. */
const J_DEF: Record<JComponentName, string> = {
  binding_hit: '≥1 currently-applicable binding provision maps to a capability the agent has at intensity ≥2',
  near_term_hit: '≥1 adopted-but-not-yet-applicable binding provision applies within 18 months of assessed_date (intensity ≥1)',
  enforcement_posture: 'Regulator has publicly signaled enforcement priority in the relevant area — always ▲ inference, cite the signal',
  prohibition_adjacent: 'Capability profile is adjacent to a prohibited or licensing-gated practice — always ▲ inference',
};

const JURS = ['none', 'us', 'eu', 'sg', 'cn'] as const;

export function AdrsCalculator() {
  const [state, setState] = useState<CalcState>(CALC_DEFAULT);
  const [jurisdiction, setJurisdiction] = useState<string>('none');
  const [copied, setCopied] = useState(false);

  // hydrate from URL once; write back on every change (shareable permalink)
  useEffect(() => {
    if (window.location.search.length > 1) setState(decodeCalcState(window.location.search));
  }, []);
  useEffect(() => {
    const qs = encodeCalcState(state);
    window.history.replaceState(null, '', `${window.location.pathname}?${qs}`);
  }, [state]);

  const r = useMemo(() => computeAdrs({ dims: state.dims, mitigations: state.mits, j: state.j }), [state]);

  return (
    <div data-testid="adrs-calculator" style={{ display: 'grid', gap: 8 }}>
      {DIMS.map((d) => (
        <fieldset key={d}>
          <legend>
            <b>{d} · {DIM_NAME[d]}</b> <span className="mono" style={{ fontSize: 11 }}>weight {WEIGHTS[d]}</span> — integer anchors only
          </legend>
          {([0, 1, 2, 3, 4] as DimScore[]).map((v) => (
            <label key={v} style={{ marginRight: 8 }}>
              <input type="radio" name={`dim-${d}`} checked={state.dims[d] === v}
                onChange={() => setState((s) => ({ ...s, dims: { ...s.dims, [d]: v } }))} />
              {v}
            </label>
          ))}
          <div className="eyebrow" style={{ marginTop: 6 }}>anchor {state.dims[d]}</div>
          <div data-testid={`anchor-${d}`} style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>
            {ANCHORS[d][state.dims[d]]}
          </div>
        </fieldset>
      ))}

      <fieldset>
        <legend><b>Mitigations</b> — evidence required to claim; credit capped at 0.40 (§13.4)</legend>
        {(Object.keys(MITIGATION_CREDITS) as MitigationClass[]).map((m) => (
          <label key={m} style={{ display: 'block', fontSize: 12.5, margin: '3px 0' }}>
            <input type="checkbox" data-testid={`mit-${m}`} checked={state.mits.includes(m)}
              onChange={() => setState((s) => ({ ...s, mits: s.mits.includes(m) ? s.mits.filter((x) => x !== m) : [...s.mits, m] }))} />
            {' '}<b className="mono">{m}</b> (+{MITIGATION_CREDITS[m]}) — {MIT_LABEL[m]}
          </label>
        ))}
        {r.creditCapped ? <p data-testid="cap-notice" style={{ color: 'var(--stale)' }}><b>Mitigation credit capped at 40%</b> — residual cannot fall below 60% of inherent (MD-9).</p> : null}
      </fieldset>

      <fieldset>
        <legend><b>Jurisdiction</b> — reference material only; never auto-sets J (CB-3)</legend>
        <select aria-label="Jurisdiction reference" value={jurisdiction}
          onChange={(e) => setJurisdiction(e.target.value)} data-testid="jurisdiction-select">
          {JURS.map((x) => <option key={x} value={x}>{x}</option>)}
        </select>
        <div data-testid="jurisdiction-ref" style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 6 }}>
          {jurisdiction === 'none'
            ? 'No jurisdiction selected. The four J components below are always set manually by the analyst.'
            : `Reference for ${jurisdiction.toUpperCase()}: jurisdiction-specific component examples appear only after reviewed research is published (OD-11). Selecting a jurisdiction changed nothing on the toggles below — set them yourself against the definitions shown.`}
        </div>
      </fieldset>

      <fieldset>
        <legend><b>J components</b> — set manually (0/1), each with its §13.5 definition</legend>
        {(Object.keys(J_COMPONENT_WEIGHTS) as JComponentName[]).map((k) => (
          <label key={k} style={{ display: 'block', fontSize: 12.5, margin: '3px 0' }}>
            <input type="checkbox" checked={state.j[k] === 1} data-testid={`j-${k}`}
              onChange={() => setState((s) => ({ ...s, j: { ...s.j, [k]: s.j[k] === 1 ? 0 : 1 } }))} />
            {' '}<b className="mono">{k}</b> (+{J_COMPONENT_WEIGHTS[k]}) — {J_DEF[k]}
          </label>
        ))}
      </fieldset>

      <h2>Live arithmetic <span className="eyebrow">full precision · display 1 dp · tier from raw (§13.7)</span></h2>
      <table data-testid="arithmetic">
        <tbody>
          {DIMS.map((d) => (
            <tr key={d}><td>contribution {d} <span className="mono" style={{ fontSize: 11 }}>(w·s·25)</span></td><td className="mono">{r.contributions[d].toFixed(2)}</td></tr>
          ))}
          <tr><td>InherentRisk</td><td className="mono" data-testid="out-inherent">{r.inherent.toFixed(2)}</td></tr>
          <tr><td>MitigationCredit</td><td className="mono" data-testid="out-credit">{r.credit.toFixed(2)}</td></tr>
          <tr><td>ResidualRisk (raw)</td><td className="mono" data-testid="out-residual">{r.residual.toFixed(4)}</td></tr>
          <tr><td>J</td><td className="mono" data-testid="out-j">{r.j.toFixed(2)}</td></tr>
          <tr><td>ADRS (display)</td><td className="mono" data-testid="out-final">{displayScore(r.final).toFixed(1)}</td></tr>
          <tr><td>Tier</td><td data-testid="out-tier"><TierBadge tier={r.tier} raw={r.final} /></td></tr>
        </tbody>
      </table>
      <p>
        <button type="button" data-testid="copy-link"
          onClick={() => { navigator.clipboard?.writeText(window.location.href).then(() => setCopied(true)); }}>
          Copy permalink
        </button>
        {copied ? <span style={{ fontSize: 12, marginLeft: 8 }}>copied ✓</span> : null}
      </p>
      <p style={{ fontSize: 12 }}>This is not a compliance determination.</p>
    </div>
  );
}
