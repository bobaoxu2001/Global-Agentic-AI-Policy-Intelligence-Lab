import Link from 'next/link';
import { BindingnessChip, InstrumentTypeChip, LifecycleChip, StaleFlag } from '@/components/semantic';
import { getPageDataset } from '@/lib/validation/pageData';

/** Policy Tracker — canonical route /instruments (SPEC §16; Q1 resolved in P1). */
export default function InstrumentsPage() {
  const ds = getPageDataset();
  const now = new Date();
  return (
    <>
      <h1>Policy Tracker</h1>
      <p className="phase0">P1 shell — full Axis A–D FilterBar with URL state lands with P1-10; sorting via table headers follows.</p>
      {ds.instruments.length === 0 ? <p>No published instruments in this profile.</p> : (
        <table>
          <thead><tr><th>Instrument</th><th>Type</th><th>Bindingness</th><th>Lifecycle</th><th>Last verified</th></tr></thead>
          <tbody>
            {ds.instruments.map((i) => (
              <tr key={i.id}>
                <td><Link href={`/instruments/${i.id}`}>{i.title_en}</Link></td>
                <td><InstrumentTypeChip type={i.instrument_type} /></td>
                <td><BindingnessChip level={i.bindingness} /></td>
                <td><LifecycleChip status={i.lifecycle_status} date={i.status_date} /></td>
                <td className="mono" style={{ fontSize: 12 }}>{i.last_verified} <StaleFlag lastVerified={i.last_verified} asOf={now} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
