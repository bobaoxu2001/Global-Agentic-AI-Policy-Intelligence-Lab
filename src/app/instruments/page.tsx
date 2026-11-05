import type { Metadata } from 'next';
import { InstrumentTracker } from '@/components/InstrumentTracker';
import { LocalizedText } from '@/components/LocalizedText';
import { decodeTrackerState } from '@/lib/portfolio/trackerState';
import { getPageDataset } from '@/lib/validation/pageData';

/** Policy Tracker — canonical route /instruments (SPEC §16). P1-10: faceted FilterBar + sorting. */
export const metadata: Metadata = {
  title: 'Policy Tracker',
  description: 'Filter and inspect source-traceable AI policy instruments in the active research profile.',
};

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

export default async function InstrumentsPage({ searchParams }: { searchParams: SearchParams }) {
  const ds = getPageDataset();
  const params = await searchParams;
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (typeof value === 'string') query.set(key, value);
  }
  const profileEmpty = ds.profile === 'preview'
    ? { id: 'instrument.list.empty.preview', text: 'No manifest-scoped instruments in this profile.' }
    : ds.profile === 'fixtures'
      ? { id: 'instrument.list.empty.fixtures', text: 'No fictional instruments in this profile.' }
      : { id: 'instrument.list.empty.production', text: 'No published instruments in this profile.' };
  return (
    <>
      <h1><LocalizedText id="instrument.list.title" fallback="Policy Tracker" /></h1>
      {ds.instruments.length === 0 ? (
        <p><LocalizedText id={profileEmpty.id} fallback={profileEmpty.text} /></p>
      ) : (
        <InstrumentTracker instruments={ds.instruments} initialState={decodeTrackerState(query.toString())} />
      )}
    </>
  );
}
