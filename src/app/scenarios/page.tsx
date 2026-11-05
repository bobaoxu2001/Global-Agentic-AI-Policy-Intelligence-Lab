import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { getPageDataset } from '@/lib/validation/pageData';

export default function ScenariosPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1><LocalizedText id="research.scenarios.title" fallback="Agent Scenarios" /></h1>
      <p className="status-note"><LocalizedText id="research.scenarios.note" fallback="All scenarios are hypothetical fictional composites. They render in fixture mode until research-backed, human-reviewed assessments are available." /></p>
      {ds.scenarios.length === 0 ? <p><LocalizedText id="research.scenarios.empty" fallback="No published scenarios in this profile." /></p> : <ul>
        {ds.scenarios.map((s) => (
          <li key={s.id}><Link href={`/scenarios/${s.id}`}>{s.name}</Link></li>
        ))}
      </ul>}
    </>
  );
}
