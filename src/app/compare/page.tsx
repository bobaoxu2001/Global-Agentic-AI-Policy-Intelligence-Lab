import Link from 'next/link';
import { getPageDataset } from '@/lib/validation/pageData';
import { BUILD_DATE, isCurrentlyApplicableBinding } from '@/lib/validation/applicability';
import capabilities from '@/data/seeds/capabilities.json';

const JURS = ['us', 'eu', 'sg', 'cn'] as const;

/** Jurisdiction Comparison shell — counts currently-applicable binding provisions per capability.
 * NO capability-intensity threshold (MJ-3/MD-11); reference date = build date. Labeled ▲ inference. */
export default function ComparePage() {
  const ds = getPageDataset();
  const instrumentsById = new Map(ds.instruments.map((i) => [i.id, i]));
  return (
    <>
      <h1>Jurisdiction Comparison</h1>
      <p className="phase0">▲ Analytical inference. Phase 0 shell — cells count currently-applicable binding provisions (SPEC §13.5 definition, build-date reference; no agent, no intensity threshold).</p>
      <table>
        <thead><tr><th>Capability</th>{JURS.map((j) => <th key={j}>{j.toUpperCase()}</th>)}</tr></thead>
        <tbody>
          {capabilities.map((c) => (
            <tr key={c.id}>
              <td>{c.id} {c.name}</td>
              {JURS.map((j) => {
                const hits = ds.provisions.filter((p) =>
                  instrumentsById.get(p.instrument_id)?.jurisdiction_id === j &&
                  isCurrentlyApplicableBinding(p, instrumentsById, BUILD_DATE) &&
                  p.capability_map.some((m) => m.capability_id === c.id),
                );
                return (
                  <td key={j}>
                    {hits.length === 0 ? (
                      <span title="no currently-applicable binding provisions mapped to this row for this jurisdiction">0</span>
                    ) : (
                      <details>
                        <summary style={{ cursor: 'pointer' }}>{hits.length}</summary>
                        <ul style={{ margin: '4px 0', paddingLeft: 16, fontSize: 12 }}>
                          {hits.map((p) => (
                            <li key={p.id}>
                              <Link href={`/provisions/${encodeURIComponent(p.id)}`}>{p.pin_cite}</Link>{' '}
                              <span className="mono" style={{ fontSize: 10.5 }}>{p.instrument_id}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
