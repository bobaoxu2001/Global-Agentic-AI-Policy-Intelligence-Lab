import { getPageDataset, scoreAssessment } from '@/lib/validation/pageData';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPageDataset().scenarios.map((s) => ({ id: s.id }));
}

/** Scenario Detail shell — per-jurisdiction ADRS from STORED assessments recomputed via the canonical module. */
export default async function ScenarioPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ds = getPageDataset();
  const s = ds.scenarios.find((x) => x.id === id);
  if (!s) return <p>Not found.</p>;
  const rows = ds.assessments.filter((a) => a.scenario_id === s.id);
  return (
    <>
      <h1>{s.name}</h1>
      <p><b>HYPOTHETICAL SCENARIO</b> — fictional composite (SPEC §14).</p>
      <p className="phase0">Phase 0 shell — worksheets expand fully in Phase 1 (P1-9).</p>
      <p>{s.narrative_md}</p>
      <h2>Capability profile (§10 intensities)</h2>
      <ul>{s.capability_profile.map((c) => <li key={c.capability_id}>{c.capability_id} = {c.intensity} — {c.note}</li>)}</ul>
      <h2>ADRS per jurisdiction (not a compliance determination)</h2>
      <table>
        <thead><tr><th>Jurisdiction</th><th>Inherent</th><th>Credit</th><th>Residual</th><th>J</th><th>Final (display)</th><th>Tier (from raw)</th></tr></thead>
        <tbody>
          {rows.map((a) => {
            const r = scoreAssessment(a);
            return (
              <tr key={a.id}>
                <td>{a.jurisdiction_id.toUpperCase()}</td>
                <td>{r.inherent.toFixed(2)}</td><td>{r.credit.toFixed(2)}</td>
                <td>{r.residual.toFixed(4)}</td><td>{r.j.toFixed(2)}</td>
                <td>{r.display.toFixed(1)}</td><td>{r.tier}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
