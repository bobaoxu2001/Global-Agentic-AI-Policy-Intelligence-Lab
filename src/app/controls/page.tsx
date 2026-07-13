import Link from 'next/link';
import { getPageDataset } from '@/lib/validation/pageData';

const CAT_ORDER = ['technical', 'process', 'organizational', 'documentation'] as const;

/** Policy-to-Control Mapper — catalog first pass (P2-5). Chains to provisions arrive with control_provision_map (P2-7). */
export default function ControlsPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1>Policy-to-Control Mapper</h1>
      <p className="status-note">Control catalog (K-series, SPEC §15.3). Every entry is a ● recommendation-class artifact: implementation notes for engineers, verification method for auditors, and ADRS mitigation class where applicable.</p>
      {ds.controls.length === 0 ? <p>No controls in this profile.</p> : CAT_ORDER.map((cat) => {
        const rows = ds.controls.filter((c) => c.category === cat);
        if (rows.length === 0) return null;
        return (
          <section key={cat}>
            <h2 style={{ textTransform: 'capitalize' }}>{cat}</h2>
            {rows.map((c) => (
              <div key={c.id} className="ep-block recommendation">
                <b className="mono">{c.id}</b> · <b>{c.name}</b>
                {c.mitigation_class ? <span className="chip chip-type" style={{ marginLeft: 8 }}>{c.mitigation_class}</span> : null}
                <div style={{ marginTop: 4 }}>{c.description}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-muted)', marginTop: 4 }}><b>Implement:</b> {c.implementation_notes}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}><b>Verify:</b> {c.verification_method}</div>
                {ds.controlMaps.filter((m) => m.control_id === c.id).length > 0 ? (
                  <div style={{ fontSize: 12.5, marginTop: 4 }}>
                    <b>Driving provisions:</b>{' '}
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
