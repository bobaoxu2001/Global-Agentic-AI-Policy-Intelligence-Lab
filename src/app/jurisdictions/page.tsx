import type { Metadata } from 'next';
import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { getPageDataset } from '@/lib/validation/pageData';

const JURISDICTIONS = [
  ['us', 'United States'], ['eu', 'European Union'], ['sg', 'Singapore'], ['cn', 'China'],
] as const;

export const metadata: Metadata = {
  title: 'Jurisdictions',
  description: 'Profile-aware jurisdiction coverage for the AI Policy Atlas research corpus.',
};

export default function JurisdictionsPage() {
  const ds = getPageDataset();
  const profileCopy = ds.profile === 'preview'
    ? {
        noteId: 'research.jurisdictions.note.preview',
        note: 'Research Preview counts manifest-scoped records; their in-review publication status is unchanged.',
        countId: 'research.jurisdictions.count.preview',
        count: '{count} scoped instruments',
      }
    : ds.profile === 'fixtures'
      ? {
          noteId: 'research.jurisdictions.note.fixtures',
          note: 'Fixture counts are fictional and exist only to test the product experience.',
          countId: 'research.jurisdictions.count.fixtures',
          count: '{count} fictional instruments',
        }
      : {
          noteId: 'research.jurisdictions.note.production',
          note: 'Production jurisdiction summaries surface only published records.',
          countId: 'research.jurisdictions.count.production',
          count: '{count} published instruments',
        };
  return <><h1><LocalizedText id="research.jurisdictions.title" fallback="Jurisdictions" /></h1><p className="status-note"><LocalizedText id={profileCopy.noteId} fallback={profileCopy.note} /></p><ul>{JURISDICTIONS.map(([id, name]) => {
    const count = ds.instruments.filter((i) => i.jurisdiction_id === id).length;
    return <li key={id}><Link href={`/jurisdictions/${id}`}><LocalizedText id={`research.jurisdiction.${id}.name`} fallback={name} /></Link> — <LocalizedText id={profileCopy.countId} fallback={profileCopy.count} values={{ count }} /></li>;
  })}</ul></>;
}
