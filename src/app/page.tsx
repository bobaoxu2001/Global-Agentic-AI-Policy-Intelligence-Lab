import Link from 'next/link';
import { getPageDataset, scoreAssessment } from '@/lib/validation/pageData';

/** Executive Dashboard shell — Phase 0 low-fi (design ref: data-screen="dash"). */
export default function DashboardPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1>Executive Dashboard</h1>
      <p className="phase0">Phase 0 shell — low-fidelity; polished styling is Phase 1. Rolled-up badge = worst of four jurisdictions (MD-5).</p>
      {ds.scenarios.length === 0 ? (
        <p>No published content in this profile. (Production corpus arrives in Phase 1.)</p>
      ) : (
        <table>
          <thead><tr><th>Hypothetical deployment</th><th>Worst-of-four tier</th><th>Detail</th></tr></thead>
          <tbody>
            {ds.scenarios.map((s) => {
              const scores = ds.assessments.filter((a) => a.scenario_id === s.id).map(scoreAssessment);
              const worst = scores.reduce((w, r) => (r.final > w.final ? r : w), scores[0]!);
              return (
                <tr key={s.id}>
                  <td>{s.name}</td>
                  <td>{worst.tier} ({worst.display}) — varies by jurisdiction</td>
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
