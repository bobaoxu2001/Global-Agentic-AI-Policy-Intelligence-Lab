import { InstrumentTracker } from '@/components/InstrumentTracker';
import { getPageDataset } from '@/lib/validation/pageData';

/** Policy Tracker — canonical route /instruments (SPEC §16). P1-10: faceted FilterBar + sorting. */
export default function InstrumentsPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1>Policy Tracker</h1>
      {ds.instruments.length === 0 ? (
        <p>No published instruments in this profile.</p>
      ) : (
        <InstrumentTracker instruments={ds.instruments} />
      )}
    </>
  );
}
