import { getPageDataset } from '@/lib/validation/pageData';
import { effectiveBindingness } from '@/lib/validation/integrity';
import capabilities from '@/data/seeds/capabilities.json';

const JURS = ['us', 'eu', 'sg', 'cn'] as const;
const BUILD_DATE = new Date().toISOString().slice(0, 10);

/** Jurisdiction Comparison shell — counts currently-applicable binding provisions per capability.
 * NO capability-intensity threshold (MJ-3/MD-11); reference date = build date. Labeled ▲ inference. */
export default function ComparePage() {
  const ds = getPageDataset();
  const instrumentsById = new Map(ds.instruments.map((i) => [i.id, i]));
  const count = (capId: string, jur: string) =>
    ds.provisions.filter((p) => {
      const inst = instrumentsById.get(p.instrument_id);
      if (!inst || inst.jurisdiction_id !== jur) return false;
      const binding = effectiveBindingness(p, instrumentsById) === 'binding';
      const inForce = ['fully_applicable', 'in_force_partially_applicable'].includes(inst.lifecycle_status);
      const applies = !p.applies_from || p.applies_from <= BUILD_DATE;
      const mapped = p.capability_map.some((m) => m.capability_id === capId);
      return binding && inForce && applies && mapped;
    }).length;
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
