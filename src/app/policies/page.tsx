import Link from 'next/link';
import { getPageDataset } from '@/lib/validation/pageData';

/** Policy Tracker shell — Phase 0. Full filtering/sorting per INTERACTION_SPEC §1 is Phase 1 (P1-10). */
export default function PoliciesPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1>Policy Tracker</h1>
      <p className="phase0">Phase 0 shell. SPEC §16 canonical route is /instruments — rename tracked in IMPLEMENTATION_DECISIONS (Q1).</p>
      {ds.instruments.length === 0 ? <p>No published instruments in this profile.</p> : (
        <table>
          <thead><tr><th>Instrument</th><th>Type</th><th>Bindingness</th><th>Lifecycle</th><th>Last verified</th></tr></thead>
          <tbody>
            {ds.instruments.map((i) => (
              <tr key={i.id}>
                <td><Link href={`/policies/${i.id}`}>{i.title_en}</Link></td>
                <td>{i.instrument_type}</td><td>{i.bindingness}</td>
                <td>{i.lifecycle_status} ({i.status_date})</td><td>{i.last_verified}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
