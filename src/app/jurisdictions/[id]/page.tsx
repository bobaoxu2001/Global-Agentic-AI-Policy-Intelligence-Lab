import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { getPageDataset } from '@/lib/validation/pageData';

const NAMES: Record<string, string> = { us: 'United States', eu: 'European Union', sg: 'Singapore', cn: 'China' };

export function generateStaticParams() { return Object.keys(NAMES).map((id) => ({ id })); }

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const name = NAMES[id];
  return name
    ? { title: name, description: `${name} policy instruments in the active AI Policy Atlas research profile.` }
    : { title: 'Jurisdiction not found' };
}

export default async function JurisdictionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!NAMES[id]) notFound();
  const ds = getPageDataset();
  const rows = ds.instruments.filter((i) => i.jurisdiction_id === id);
  const profileCopy = ds.profile === 'preview'
    ? {
        noteId: 'research.jurisdiction.detail.note.preview',
        note: 'This Research Preview shows manifest-scoped records, including records that remain in review. The tracker is the canonical research view.',
        emptyId: 'research.jurisdiction.detail.empty.preview',
        empty: 'No manifest-scoped instruments for this jurisdiction.',
      }
    : ds.profile === 'fixtures'
      ? {
          noteId: 'research.jurisdiction.detail.note.fixtures',
          note: 'Every record in this profile is fictional fixture data.',
          emptyId: 'research.jurisdiction.detail.empty.fixtures',
          empty: 'No fictional instruments for this jurisdiction.',
        }
      : {
          noteId: 'research.jurisdiction.detail.note.production',
          note: 'Production shows only independently approved, published records. The tracker is the canonical research view.',
          emptyId: 'research.jurisdiction.detail.empty.production',
          empty: 'No published instruments for this jurisdiction.',
        };
  return <><nav className="breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/jurisdictions"><LocalizedText id="research.jurisdictions.title" fallback="Jurisdictions" /></Link></li><li aria-current="page"><LocalizedText id={`research.jurisdiction.${id}.name`} fallback={NAMES[id]} /></li></ol></nav><h1><LocalizedText id={`research.jurisdiction.${id}.name`} fallback={NAMES[id]} /></h1><p className="status-note"><LocalizedText id={profileCopy.noteId} fallback={profileCopy.note} /></p>{rows.length === 0 ? <p><LocalizedText id={profileCopy.emptyId} fallback={profileCopy.empty} /></p> : <ul>{rows.map((i) => <li key={i.id}><Link href={`/instruments/${i.id}`} lang="en">{i.title_en}</Link> — <LocalizedText id={`research.lifecycle.${i.lifecycle_status}`} fallback={i.lifecycle_status.replaceAll('_', ' ')} /></li>)}</ul>}</>;
}
