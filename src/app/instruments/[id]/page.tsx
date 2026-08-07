import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
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
  if (!inst) return <p><LocalizedText id="instrument.detail.notFound" fallback="Not found." /></p>;
  const provisions = ds.provisions.filter((p) => p.instrument_id === inst.id);
  const officialSources = ds.sources.filter((source) => inst.source_ids.includes(source.id));
  return (
    <>
      <div className="eyebrow">{inst.jurisdiction_id.toUpperCase()} · {inst.issuing_body}</div>
      <h1 lang="en">{inst.title_en}</h1>
      <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InstrumentTypeChip type={inst.instrument_type} />
        <BindingnessChip level={inst.bindingness} />
        <LifecycleChip status={inst.lifecycle_status} date={inst.status_date} />
      </p>
      <p className="mono" style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
        <LocalizedText id="instrument.detail.asOf" fallback="as_of" /> {inst.as_of_date} · <LocalizedText id="instrument.detail.lastVerified" fallback="last_verified" /> {inst.last_verified}
      </p>
      <p lang="en">{inst.summary_md}</p>
      <h2><LocalizedText id="instrument.detail.officialSources" fallback="Official sources" /></h2>
      <ul>{officialSources.map((source) => <li key={source.id}><a href={source.url} target="_blank" rel="noreferrer" lang={source.language}>{source.title}</a> <span className="mono">(<LocalizedText id="instrument.detail.tier" fallback="Tier" /> {source.tier})</span></li>)}</ul>
      {inst.key_dates?.length ? (
        <>
          <h2><LocalizedText id="instrument.detail.keyDates" fallback="Key dates" /></h2>
          <ul>{inst.key_dates.map((k, idx) => <li key={idx} className="mono" style={{ fontSize: 12.5 }}>{k.date} — <span lang="en">{k.event}</span></li>)}</ul>
        </>
      ) : null}
      <h2><LocalizedText id="instrument.detail.provisions" fallback="Agentic-relevant provisions" /></h2>
      {ds.profile === 'preview' && provisions.length === 0 ? <p className="status-note"><LocalizedText id="instrument.detail.contextOnly" fallback="Context instrument — no provision-level mapping in the current preview." /></p> : null}
      {ds.profile === 'preview' && inst.id === 'us-co-sb26-189' ? <p className="status-note"><LocalizedText id="instrument.detail.previewPartial" fallback="This instrument is included in the preview. Some associated provisions remain outside the approved preview set." /></p> : null}
      <ul>
        {provisions.map((p) => (
          <li key={p.id}>
            <Link href={`/provisions/${encodeURIComponent(p.id)}`}>{p.pin_cite}</Link> — <LocalizedText id={`value.obligation.${p.obligation_type}`} fallback={p.obligation_type} />
            {p.bindingness ? <> — <LocalizedText id="instrument.detail.provisionOverride" fallback="provision-level override:" /> <BindingnessChip level={p.bindingness} /></> : null}
          </li>
        ))}
      </ul>
    </>
  );
}
