import Link from 'next/link';
import { BindingnessChip, InstrumentTypeChip, LifecycleChip } from '@/components/semantic';
import { getPageDataset } from '@/lib/validation/pageData';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPageDataset().instruments.map((i) => ({ id: i.id }));
}

/** Instrument Detail — classification chips per design (data-screen="instrument"). */
export default async function InstrumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ds = getPageDataset();
  const inst = ds.instruments.find((i) => i.id === id);
  if (!inst) return <p>Not found.</p>;
  const provisions = ds.provisions.filter((p) => p.instrument_id === inst.id);
  return (
    <>
      <div className="eyebrow">{inst.jurisdiction_id.toUpperCase()} · {inst.issuing_body}</div>
      <h1 lang={inst.jurisdiction_id === 'cn' ? 'en' : undefined}>{inst.title_en}</h1>
      <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InstrumentTypeChip type={inst.instrument_type} />
        <BindingnessChip level={inst.bindingness} />
        <LifecycleChip status={inst.lifecycle_status} date={inst.status_date} />
      </p>
      <p className="mono" style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
        as_of {inst.as_of_date} · last_verified {inst.last_verified}
      </p>
      <p>{inst.summary_md}</p>
      {inst.key_dates?.length ? (
        <>
          <h2>Key dates</h2>
          <ul>{inst.key_dates.map((k, idx) => <li key={idx} className="mono" style={{ fontSize: 12.5 }}>{k.date} — {k.event}</li>)}</ul>
        </>
      ) : null}
      <h2>Agentic-relevant provisions</h2>
      {ds.profile === 'preview' && inst.id === 'sg-mgf-genai' ? <p className="status-note">Context instrument — no provision-level mapping in the current preview.</p> : null}
      {ds.profile === 'preview' && inst.id === 'us-co-sb26-189' ? <p className="status-note">This instrument is included in the preview. Some associated provisions remain outside the approved preview set.</p> : null}
      <ul>
        {provisions.map((p) => (
          <li key={p.id}>
            <Link href={`/provisions/${encodeURIComponent(p.id)}`}>{p.pin_cite}</Link> — {p.obligation_type}
            {p.bindingness ? <> — provision-level override: <BindingnessChip level={p.bindingness} /></> : null}
          </li>
        ))}
      </ul>
    </>
  );
}
