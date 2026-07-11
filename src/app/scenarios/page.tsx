import Link from 'next/link';
import { getPageDataset } from '@/lib/validation/pageData';

export default function ScenariosPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1>Agent Scenarios</h1>
      <p className="phase0">Phase 0 shell. All scenarios are hypothetical fictional composites (SPEC §14).</p>
      <ul>
        {ds.scenarios.map((s) => (
          <li key={s.id}><Link href={`/scenarios/${s.id}`}>{s.name}</Link></li>
        ))}
      </ul>
    </>
  );
}
