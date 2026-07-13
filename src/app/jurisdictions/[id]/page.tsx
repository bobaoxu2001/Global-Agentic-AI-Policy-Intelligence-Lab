import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getPageDataset } from '@/lib/validation/pageData';

const NAMES: Record<string, string> = { us: 'United States', eu: 'European Union', sg: 'Singapore', cn: 'China' };

export function generateStaticParams() { return Object.keys(NAMES).map((id) => ({ id })); }

export default async function JurisdictionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!NAMES[id]) notFound();
  const ds = getPageDataset();
  const rows = ds.instruments.filter((i) => i.jurisdiction_id === id);
  return <><h1>{NAMES[id]}</h1><p className="status-note">▲ Analytical summaries are intentionally withheld until underlying records are published. The tracker provides the canonical research view.</p>{rows.length === 0 ? <p>No published instruments for this jurisdiction.</p> : <ul>{rows.map((i) => <li key={i.id}><Link href={`/instruments/${i.id}`}>{i.title_en}</Link> — {i.lifecycle_status.replaceAll('_', ' ')}</li>)}</ul>}</>;
}
