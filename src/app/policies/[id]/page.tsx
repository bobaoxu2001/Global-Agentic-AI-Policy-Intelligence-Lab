import Link from 'next/link';
import { getPageDataset } from '@/lib/validation/pageData';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPageDataset().instruments.map((i) => ({ id: i.id }));
}

/** Instrument Detail shell — Phase 0 (design ref: data-screen="instrument"). */
export default async function PolicyDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ds = getPageDataset();
  const inst = ds.instruments.find((i) => i.id === id);
  if (!inst) return <p>Not found.</p>;
  const provisions = ds.provisions.filter((p) => p.instrument_id === inst.id);
  return (
    <>
      <h1>{inst.title_en}</h1>
      <p className="phase0">Phase 0 shell — classification chips, evidence panel, and history timeline are Phase 1.</p>
      <p>
        type=<b>{inst.instrument_type}</b> · bindingness=<b>{inst.bindingness}</b> · lifecycle=
        <b>{inst.lifecycle_status}</b> ({inst.status_date}) · as_of={inst.as_of_date} · last_verified={inst.last_verified}
      </p>
      <p>{inst.summary_md}</p>
      <h2>Agentic-relevant provisions</h2>
      <ul>
        {provisions.map((p) => (
          <li key={p.id}>
            <Link href={`/provisions/${encodeURIComponent(p.id)}`}>{p.pin_cite}</Link> — {p.obligation_type}
            {p.bindingness ? ` — provision-level bindingness override: ${p.bindingness}` : ''}
          </li>
        ))}
      </ul>
    </>
  );
}
