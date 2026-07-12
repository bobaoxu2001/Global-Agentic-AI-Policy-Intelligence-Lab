import { getPageDataset } from '@/lib/validation/pageData';
import { BUILD_DATE, isCurrentlyApplicableBinding } from '@/lib/validation/applicability';
import capabilities from '@/data/seeds/capabilities.json';

const JURS = ['us', 'eu', 'sg', 'cn'] as const;

/** Jurisdiction Comparison shell — counts currently-applicable binding provisions per capability.
 * NO capability-intensity threshold (MJ-3/MD-11); reference date = build date. Labeled ▲ inference. */
export default function ComparePage() {
  const ds = getPageDataset();
  const instrumentsById = new Map(ds.instruments.map((i) => [i.id, i]));
  const count = (capId: string, jur: string) =>
    ds.provisions.filter((p) =>
      instrumentsById.get(p.instrument_id)?.jurisdiction_id === jur &&
      isCurrentlyApplicableBinding(p, instrumentsById, BUILD_DATE) &&
      p.capability_map.some((m) => m.capability_id === capId),
    ).length;
  return (
    <>
      <h1>Jurisdiction Comparison</h1>
      <p className="phase0">▲ Analytical inference. Phase 0 shell — cells count currently-applicable binding provisions (SPEC §13.5 definition, build-date reference; no agent, no intensity threshold).</p>
      <table>
        <thead><tr><th>Capability</th>{JURS.map((j) => <th key={j}>{j.toUpperCase()}</th>)}</tr></thead>
        <tbody>
          {capabilities.map((c) => (
            <tr key={c.id}><td>{c.id} {c.name}</td>{JURS.map((j) => <td key={j}>{count(c.id, j)}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
