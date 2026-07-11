import { BindingnessChip, ConfidenceChip, EpistemicBlockView } from '@/components/semantic';
import { getPageDataset } from '@/lib/validation/pageData';

export const dynamicParams = false;
export function generateStaticParams() {
  return getPageDataset().provisions.map((p) => ({ id: p.id }));
}

/** Provision / Evidence — typed ■▲● chain with semantic components (3-pane reader arrives P1-8 full). */
export default async function ProvisionPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const decoded = decodeURIComponent(id);
  const ds = getPageDataset();
  const p = ds.provisions.find((x) => x.id === decoded);
  if (!p) return <p>Not found.</p>;
  return (
    <>
      <div className="eyebrow">{p.instrument_id}</div>
      <h1>{p.pin_cite}</h1>
      <p style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="chip chip-type">{p.obligation_type}</span>
        {p.bindingness ? <BindingnessChip level={p.bindingness} /> : null}
        <ConfidenceChip level={p.confidence} />
        {p.applies_from ? <span className="mono" style={{ fontSize: 12 }}>applies from {p.applies_from}</span> : null}
      </p>
      {p.quote_verbatim ? <blockquote lang="en">{p.quote_verbatim}</blockquote> : null}
      <p>{p.paraphrase_en}</p>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{p.confidence_rationale}</p>
      <h2>Epistemic chain <span className="eyebrow">■ fact → ▲ inference → ● recommendation</span></h2>
      {p.epistemic_blocks.map((b) => <EpistemicBlockView key={b.id} block={b} />)}
      <h2>Mappings</h2>
      <ul>
        {p.capability_map.map((m) => (
          <li key={m.capability_id}><b className="mono">{m.capability_id}</b> — {m.rationale} <ConfidenceChip level={m.confidence} /></li>
        ))}
        {p.risk_map.map((m) => <li key={m.risk_id}><b className="mono">{m.risk_id}</b> — {m.rationale}</li>)}
      </ul>
      <p className="mono" style={{ fontSize: 12, color: 'var(--ink-muted)' }}>as_of {p.as_of_date} · last_verified {p.last_verified}</p>
    </>
  );
}
