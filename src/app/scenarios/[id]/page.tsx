import Link from 'next/link';
import { TierBadge } from '@/components/semantic';
import { encodeCalcState } from '@/lib/adrs/urlState';
import type { MitigationClass, Dims, JComponents } from '@/lib/adrs';
import { getPageDataset, scoreAssessment } from '@/lib/validation/pageData';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPageDataset().scenarios.map((s) => ({ id: s.id }));
}

/** Scenario Detail — stored assessments recomputed via the canonical module; deep links to calculator (AC-ADRS-11). */
export default async function ScenarioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ds = getPageDataset();
  const s = ds.scenarios.find((x) => x.id === id);
  if (!s) return <p>Not found.</p>;
  const rows = ds.assessments.filter((a) => a.scenario_id === s.id);
  return (
    <>
      <p><span className="hypo-tag">HYPOTHETICAL SCENARIO</span> <span style={{ fontSize: 12 }}>fictional composite (SPEC §14)</span></p>
      <h1>{s.name}</h1>
      <p>{s.narrative_md}</p>
      <h2>Capability profile <span className="eyebrow">§10 intensities</span></h2>
      <ul>{s.capability_profile.map((c) => <li key={c.capability_id}><b className="mono">{c.capability_id} = {c.intensity}</b> — {c.note}</li>)}</ul>
      <h2>ADRS per jurisdiction <span className="eyebrow">not a compliance determination</span></h2>
      <table>
        <thead><tr><th>Jurisdiction</th><th>Inherent</th><th>Credit</th><th>Residual (raw)</th><th>J</th><th>Tier</th><th></th></tr></thead>
        <tbody>
          {rows.map((a) => {
            const r = scoreAssessment(a);
            const deep = encodeCalcState({
              dims: Object.fromEntries((['A','T','D','E','R'] as const).map((d) => [d, a.dims[d].score])) as Dims,
              mits: a.mitigations.map((m) => m.class as MitigationClass),
              j: Object.fromEntries(Object.entries(a.j_components).map(([k, v]) => [k, v.value])) as unknown as JComponents,
            });
            return (
              <tr key={a.id}>
                <td className="mono">{a.jurisdiction_id.toUpperCase()}</td>
                <td className="mono">{r.inherent.toFixed(2)}</td>
                <td className="mono">{r.credit.toFixed(2)}</td>
                <td className="mono">{r.residual.toFixed(4)}</td>
                <td className="mono">{r.j.toFixed(2)}</td>
                <td><TierBadge tier={r.tier} raw={r.final} /></td>
                <td><Link href={`/calculator?${deep}`}>open in calculator</Link></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>J components in fixtures are FICTIONAL, illustrative pending Phase 1 research (OD-11/MD-3). Deep links pre-populate the calculator from this assessment (AC-ADRS-11); every toggle stays editable.</p>
    </>
  );
}
