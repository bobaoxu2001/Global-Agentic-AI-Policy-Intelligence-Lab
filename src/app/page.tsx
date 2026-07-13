import Link from 'next/link';
import { TierBadge } from '@/components/semantic';
import { getPageDataset, scoreAssessment } from '@/lib/validation/pageData';

/** Executive overview. Worst-of-four rollup is used only for hypothetical scenarios. */
export default function DashboardPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1>AI Policy Atlas</h1>
      <p><b>Agentic AI Governance Intelligence.</b> A structured, source-traceable research workbench translating policy provisions into agent capabilities, controls, and a transparent risk score.</p>
      <p className="status-note">Research corpus status: in progress. Only records that complete the documented human publication review render in production. Fixture mode is illustrative only.</p>
      <p className="status-note">Rolled-up scenario badge = <b>worst of four</b> jurisdictions (risk-conservative, MD-5) — ▲ inference. Per-jurisdiction scores are the authoritative detail.</p>
      {ds.scenarios.length === 0 ? (
        <p>No published content in this profile.</p>
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
