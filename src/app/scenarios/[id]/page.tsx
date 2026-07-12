import Link from 'next/link';
import { TierBadge } from '@/components/semantic';
import { encodeCalcState } from '@/lib/adrs/urlState';
import type { MitigationClass, Dims, JComponents } from '@/lib/adrs';
import { getPageDataset, scoreAssessment } from '@/lib/validation/pageData';
import { BUILD_DATE, isCurrentlyApplicableBinding } from '@/lib/validation/applicability';
import { BindingnessChip } from '@/components/semantic';
import { effectiveBindingness } from '@/lib/validation/integrity';

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
      <table data-testid="adrs-worksheets">
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

      <h2>Provisions touching this capability profile <span className="eyebrow">▲ inference — capability overlap, reference date {BUILD_DATE}</span></h2>
      {(() => {
        const instrumentsById = new Map(ds.instruments.map((i) => [i.id, i]));
        const profileCaps = new Set(s.capability_profile.filter((c) => c.intensity >= 1).map((c) => c.capability_id));
        const hits = ds.provisions
          .map((p) => ({ p, caps: p.capability_map.filter((m) => profileCaps.has(m.capability_id)).map((m) => m.capability_id) }))
          .filter((x) => x.caps.length > 0)
          .map((x) => ({ ...x, inst: instrumentsById.get(x.p.instrument_id), bindingNow: isCurrentlyApplicableBinding(x.p, instrumentsById, BUILD_DATE) }))
          .sort((a, b) => Number(b.bindingNow) - Number(a.bindingNow));
        if (hits.length === 0) return <p style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}>No corpus provisions map onto this profile yet.</p>;
        const JURS = ['us', 'eu', 'sg', 'cn'] as const;
        return (
          <>
            <p data-testid="cross-jur-strip" style={{ fontSize: 12.5 }}>
              Currently-applicable binding hits by jurisdiction:{' '}
              {JURS.map((j) => `${j.toUpperCase()} ${hits.filter((h) => h.inst?.jurisdiction_id === j && h.bindingNow).length}`).join(' · ')}
            </p>
            <table data-testid="scenario-provisions">
              <thead><tr><th>Provision</th><th>Jur</th><th>Overlap</th><th>Bindingness</th><th>Applies from</th><th>Binding now?</th></tr></thead>
              <tbody>
                {hits.map(({ p, caps, inst, bindingNow }) => (
                  <tr key={p.id}>
                    <td><Link href={`/provisions/${encodeURIComponent(p.id)}`}>{p.pin_cite}</Link> <span className="mono" style={{ fontSize: 11 }}>{p.instrument_id}</span></td>
                    <td className="mono">{inst?.jurisdiction_id.toUpperCase()}</td>
                    <td className="mono" style={{ fontSize: 11 }}>{caps.join(', ')}</td>
                    <td><BindingnessChip level={effectiveBindingness(p, instrumentsById) ?? 'non_binding'} /></td>
                    <td className="mono" style={{ fontSize: 12 }}>{p.applies_from ?? '—'}</td>
                    <td>{bindingNow ? '✓ yes' : '— not yet / not binding'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        );
      })()}
    </>
  );
}
