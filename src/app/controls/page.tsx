import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { getPageDataset } from '@/lib/validation/pageData';

const CAT_ORDER = ['technical', 'process', 'organizational', 'documentation'] as const;

/** Policy-to-Control Mapper — catalog first pass (P2-5). Chains to provisions arrive with control_provision_map (P2-7). */
export default function ControlsPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1><LocalizedText id="controls.title" fallback="Policy-to-Control Mapper" /></h1>
      <p className="status-note"><LocalizedText id="controls.note" fallback="Control catalog (K-series, SPEC §15.3). Every entry is a ● recommendation-class artifact: implementation notes for engineers, verification method for auditors, and ADRS mitigation class where applicable." />{' '}<strong><LocalizedText id="controls.boundary" fallback="Derived controls are implementation recommendations, not direct statutory requirements." /></strong></p>
      {ds.controls.length === 0 ? <p><LocalizedText id="controls.empty" fallback="No controls in this profile." /></p> : CAT_ORDER.map((cat) => {
        const rows = ds.controls.filter((c) => c.category === cat);
        if (rows.length === 0) return null;
        return (
          <section key={cat}>
            <h2><LocalizedText id={`controls.category.${cat}`} fallback={cat.charAt(0).toUpperCase() + cat.slice(1)} /></h2>
            {rows.map((c) => (
              <div key={c.id} className="ep-block recommendation">
                <b className="mono">{c.id}</b> · <b><LocalizedText id={`control.${c.id}.name`} fallback={c.name} /></b>
                {c.mitigation_class ? <span className="chip chip-type" style={{ marginLeft: 8 }}>{c.mitigation_class}</span> : null}
                <div style={{ marginTop: 4 }}><LocalizedText id={`control.${c.id}.description`} fallback={c.description} /></div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-muted)', marginTop: 4 }}><b><LocalizedText id="controls.implement" fallback="Implement:" /></b> <LocalizedText id={`control.${c.id}.implementation`} fallback={c.implementation_notes} /></div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}><b><LocalizedText id="controls.verify" fallback="Verify:" /></b> <LocalizedText id={`control.${c.id}.verification`} fallback={c.verification_method} /></div>
                {ds.controlMaps.filter((m) => m.control_id === c.id).length > 0 ? (
                  <div style={{ fontSize: 12.5, marginTop: 4 }}>
                    <b><LocalizedText id="controls.driving" fallback="Policy rationale / derived governance mapping:" /></b>{' '}
                    {ds.controlMaps.filter((m) => m.control_id === c.id).map((m, i, arr) => (
                      <span key={m.id}>
                        <Link href={`/provisions/${encodeURIComponent(m.provision_id)}`}>{m.provision_id}</Link>
                        <span className="mono" style={{ fontSize: 11 }}> ({m.strength})</span>{i < arr.length - 1 ? ' · ' : ''}
                      </span>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </section>
        );
      })}
    </>
  );
}
