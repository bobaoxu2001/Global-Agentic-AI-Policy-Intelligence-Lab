import Link from 'next/link';
import { getPageDataset } from '@/lib/validation/pageData';

export default function ScenariosPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1>Agent Scenarios</h1>
      <p className="status-note">All scenarios are hypothetical fictional composites. They render in fixture mode until research-backed, human-reviewed assessments are available.</p>
      {ds.scenarios.length === 0 ? <p>No published scenarios in this profile.</p> : <ul>
        {ds.scenarios.map((s) => (
          <li key={s.id}><Link href={`/scenarios/${s.id}`}>{s.name}</Link></li>
        ))}
      </ul>}
    </>
  );
}
