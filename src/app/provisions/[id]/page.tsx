import { BindingnessChip, ConfidenceChip, EpistemicBlockView } from '@/components/semantic';
import { LocalizedText } from '@/components/LocalizedText';
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
  if (!p) return <p><LocalizedText id="provision.notFound" fallback="Not found." /></p>;
  return (
    <>
      <div className="eyebrow">{p.instrument_id}</div>
      <h1>{p.pin_cite}</h1>
      <p style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="chip chip-type"><LocalizedText id={`value.obligation.${p.obligation_type}`} fallback={p.obligation_type} /></span>
        {p.bindingness ? <BindingnessChip level={p.bindingness} /> : null}
        <ConfidenceChip level={p.confidence} />
        {p.applies_from ? <span className="mono" style={{ fontSize: 12 }}>{p.applies_from_note ?? <LocalizedText id="provision.appliesFrom" fallback="applies from {date}" values={{ date: p.applies_from }} />}</span> : null}
      </p>
      {p.quote_verbatim ? <blockquote lang={p.instrument_id.startsWith('cn-') ? 'zh' : 'en'}>{p.quote_verbatim}</blockquote> : null}
      <p>{p.paraphrase_en}</p>
      <p style={{ fontSize: 12, color: 'var(--ink-muted)' }}>{p.confidence_rationale}</p>
      <h2><LocalizedText id="provision.chain.title" fallback="Epistemic chain" /> <span className="eyebrow"><LocalizedText id="provision.chain.legend" fallback="■ fact → ▲ inference → ● recommendation" /></span></h2>
      {p.epistemic_blocks.map((b) => <EpistemicBlockView key={b.id} block={b} />)}
      <h2><LocalizedText id="provision.controls.title" fallback="Mapped controls" /> <span className="eyebrow"><LocalizedText id="provision.controls.legend" fallback="● the §15.1 chain's action end" /></span></h2>
      {ds.controlMaps.filter((m) => m.provision_id === p.id).length === 0 ? (
        <p style={{ fontSize: 12.5, color: 'var(--ink-muted)' }}><LocalizedText id="provision.controls.empty" fallback="No control mappings yet for this provision (P2-7 in progress)." /></p>
      ) : (
        ds.controlMaps.filter((m) => m.provision_id === p.id).map((m) => {
          const control = ds.controls.find((c) => c.id === m.control_id);
          return (
            <div key={m.id} className="ep-block recommendation">
              <span className="ep-tag recommendation">● <LocalizedText id="evidence.recommendation" fallback="Recommendation" /></span>
              <b className="mono">{m.control_id}</b> {control ? <LocalizedText id={`control.${control.id}.name`} fallback={control.name} /> : null}
              <span className="chip chip-type" style={{ marginLeft: 6 }}><LocalizedText id={`value.mapping.${m.strength}`} fallback={m.strength} /></span>
              <span className="chip chip-type"><LocalizedText id={`value.relation.${m.relation}`} fallback={m.relation.replaceAll('_', ' ')} /></span>
              <div style={{ marginTop: 4 }}>{m.rationale}</div>
            </div>
          );
        })
      )}
      <h2><LocalizedText id="provision.mappings.title" fallback="Capability & risk mappings" /></h2>
      <ul>
        {p.capability_map.map((m) => (
          <li key={m.capability_id}><b className="mono">{m.capability_id}</b> — {m.rationale} <ConfidenceChip level={m.confidence} /></li>
        ))}
        {p.risk_map.map((m) => <li key={m.risk_id}><b className="mono">{m.risk_id}</b> — {m.rationale}</li>)}
      </ul>
      <p className="mono" style={{ fontSize: 12, color: 'var(--ink-muted)' }}><LocalizedText id="provision.asOf" fallback="as_of" /> {p.as_of_date} · <LocalizedText id="provision.lastVerified" fallback="last_verified" /> {p.last_verified}</p>
    </>
  );
}
