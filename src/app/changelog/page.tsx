import { LifecycleChip } from '@/components/semantic';
import { getPageDataset } from '@/lib/validation/pageData';

/** Changelog — dated status changes and drift events (FR-9 / P2-13). */
export default function ChangelogPage() {
  const ds = getPageDataset();
  const entries = [...ds.changelog].sort((a, b) => (a.entry_date < b.entry_date ? 1 : -1));
  const instrumentsById = new Map(ds.instruments.map((i) => [i.id, i]));
  return (
    <>
      <h1>Changelog</h1>
      <p className="phase0">Dated record of instrument-status updates and regulatory-drift events observed during the project period (§19.5). Policy moves; this product is built to be corrected in public.</p>
      {entries.length === 0 ? <p>No status changes recorded in this period.</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {entries.map((c) => (
            <li key={c.id} style={{ borderBottom: '1px solid var(--border-rule)', padding: '10px 0' }}>
              <div className="mono" style={{ fontSize: 12 }}>{c.entry_date} · analyst: {c.analyst}</div>
              <div style={{ margin: '4px 0' }}>
                <b>{instrumentsById.get(c.instrument_id)?.title_en ?? c.instrument_id}</b>
                {c.old_status && c.new_status ? (
                  <span style={{ marginLeft: 8 }}>
                    <LifecycleChip status={c.old_status} /> → <LifecycleChip status={c.new_status} />
                  </span>
                ) : null}
              </div>
              <div style={{ fontSize: 13 }}>{c.description}</div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
