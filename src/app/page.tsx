import Link from 'next/link';
import { TierBadge } from '@/components/semantic';
import { getPageDataset, scoreAssessment } from '@/lib/validation/pageData';

/** Executive Dashboard (design ref: data-screen="dash"). Worst-of-four rollup (MD-5). */
export default function DashboardPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1>Executive Dashboard</h1>
      <p className="phase0">Rolled-up badge = <b>worst of four</b> jurisdictions (risk-conservative, MD-5) — ▲ inference. Per-jurisdiction scores are the authoritative detail.</p>
      {ds.scenarios.length === 0 ? (
        <p>No published content in this profile. (Production corpus arrives in Phase 1.)</p>
      ) : (
        <table>
          <thead><tr><th>Hypothetical deployment</th><th>Worst-of-four tier</th><th></th></tr></thead>
          <tbody>
            {ds.scenarios.map((s) => {
              const scores = ds.assessments.filter((a) => a.scenario_id === s.id).map(scoreAssessment);
              const worst = scores.reduce((w, r) => (r.final > w.final ? r : w), scores[0]!);
              return (
                <tr key={s.id}>
                  <td><span className="hypo-tag">HYPOTHETICAL</span> {s.name}</td>
                  <td><TierBadge tier={worst.tier} raw={worst.final} /> <span style={{ fontSize: 11, color: 'var(--ink-muted)' }}>varies by jurisdiction</span></td>
                  <td><Link href={`/scenarios/${s.id}`}>open</Link></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}
