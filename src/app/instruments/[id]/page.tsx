import type { Metadata } from 'next';
import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { BindingnessChip, ConfidenceChip, InstrumentTypeChip, LifecycleChip } from '@/components/semantic';
import { parseInstrumentSummary } from '@/lib/portfolio/instrumentSummary';
import { getPageDataset } from '@/lib/validation/pageData';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPageDataset().instruments.map((i) => ({ id: i.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const instrument = getPageDataset().instruments.find((record) => record.id === id);
  return instrument
    ? { title: instrument.title_en, description: `Source-traceable classification, dates, evidence, and provisions for ${instrument.title_en}.` }
    : { title: 'Instrument not found' };
}

/** Instrument Detail — classification chips per design (data-screen="instrument"). */
export default async function InstrumentDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const ds = getPageDataset();
  const inst = ds.instruments.find((i) => i.id === id);
  if (!inst) return <p><LocalizedText id="instrument.detail.notFound" fallback="Not found." /></p>;
  const provisions = ds.provisions.filter((p) => p.instrument_id === inst.id);
  const officialSources = ds.sources.filter((source) => inst.source_ids.includes(source.id));
  const summaryBlocks = parseInstrumentSummary(inst.summary_md);
  return (
    <>
      <nav className="breadcrumb" aria-label="Breadcrumb"><ol><li><Link href="/jurisdictions"><LocalizedText id="research.jurisdictions.title" fallback="Jurisdictions" /></Link></li><li><Link href={`/jurisdictions/${inst.jurisdiction_id}`}>{inst.jurisdiction_id.toUpperCase()}</Link></li><li aria-current="page">{inst.id}</li></ol></nav>
      <div className="eyebrow">{inst.jurisdiction_id.toUpperCase()} · {inst.issuing_body}</div>
      <h1 lang="en">{inst.title_en}</h1>
      {inst.title_original !== inst.title_en ? <p className="original-title"><b><LocalizedText id="instrument.detail.officialTitle" fallback="Official title" />:</b> <span>{inst.title_original}</span></p> : null}
      <p style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <InstrumentTypeChip type={inst.instrument_type} />
        <BindingnessChip level={inst.bindingness} />
        <LifecycleChip status={inst.lifecycle_status} date={inst.status_date} />
      </p>
      <dl className="record-dates">
        <div><dt><LocalizedText id="instrument.detail.asOf" fallback="Research as-of date" /></dt><dd>{inst.as_of_date}</dd></div>
        <div><dt><LocalizedText id="instrument.detail.lastVerified" fallback="Evidence last checked" /></dt><dd>{inst.last_verified}</dd></div>
      </dl>
      <section aria-labelledby="instrument-summary-title">
        <h2 id="instrument-summary-title"><LocalizedText id="instrument.detail.summary" fallback="Instrument summary" /></h2>
        <p className="status-note"><LocalizedText id="instrument.detail.summaryBoundary" fallback="Fact and inference are separated below. Official source links follow; provision pages contain the canonical citation-level epistemic chain." /></p>
        {summaryBlocks.map((block, index) => (
          <div className={`ep-block ${block.kind}`} data-kind={block.kind} key={`${block.kind}-${index}`}>
            <span className={`ep-tag ${block.kind}`}>
              {block.kind === 'fact' ? '■' : block.kind === 'inference' ? '▲' : ''} <LocalizedText id={block.kind === 'unclassified' ? 'instrument.detail.unclassified' : `evidence.${block.kind}`} fallback={block.kind === 'fact' ? 'Fact' : block.kind === 'inference' ? 'Inference' : 'Unclassified fixture note'} />
            </span>
            {block.confidence ? <ConfidenceChip level={block.confidence} /> : <span className="summary-scope"><LocalizedText id="instrument.detail.summaryScope" fallback="instrument-level summary" /></span>}
            <div lang="en">{block.text}</div>
          </div>
        ))}
      </section>
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
