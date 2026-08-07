import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { getPageDataset } from '@/lib/validation/pageData';
import { BUILD_DATE, isCurrentlyApplicableBinding } from '@/lib/validation/applicability';
import { EXECUTIVE_MARKETS } from '@/lib/portfolio/policySignals';
import capabilities from '@/data/seeds/capabilities.json';

const JURS = ['us', 'eu', 'sg', 'cn'] as const;

/** Jurisdiction Comparison shell — counts currently-applicable binding provisions per capability.
 * NO capability-intensity threshold (MJ-3/MD-11); reference date = build date. Labeled ▲ inference. */
export default function ComparePage() {
  const ds = getPageDataset();
  const instrumentsById = new Map(ds.instruments.map((i) => [i.id, i]));
  return (
    <article className="compare-page">
      <header className="page-intro">
        <p className="eyebrow"><LocalizedText id="compare.eyebrow" fallback="Cross-market decision comparison" /></p>
        <h1><LocalizedText id="compare.title" fallback="Different legal forms create different operating questions." /></h1>
        <p><LocalizedText id="compare.intro" fallback="Compare verified signals, business implications, owners, and evidence triggers before looking at the deliberately sparse structured-coverage count." /></p>
      </header>

      {ds.profile === 'preview' ? <section className="brief-section">
        <div className="section-heading compact">
          <div><p className="eyebrow"><LocalizedText id="compare.executive.eyebrow" fallback="Executive comparison" /></p><h2><LocalizedText id="compare.executive.title" fallback="Four markets, four decision patterns" /></h2></div>
        </div>
        <div className="market-table-wrap">
          <table className="market-table decision-comparison-table">
            <caption className="visually-hidden"><LocalizedText id="compare.caption" fallback="Comparison of current policy signals, legal forms, business implications, owners, actions, and evidence triggers" /></caption>
            <thead><tr><th scope="col"><LocalizedText id="compare.header.market" fallback="Market / legal form" /></th><th scope="col"><LocalizedText id="compare.header.signal" fallback="Verified signal" /></th><th scope="col"><LocalizedText id="compare.header.implication" fallback="Business implication" /></th><th scope="col"><LocalizedText id="compare.header.owner" fallback="Owner, action, and evidence trigger" /></th></tr></thead>
            <tbody>{EXECUTIVE_MARKETS.map((row) => (
              <tr key={row.market}>
                <th scope="row"><LocalizedText id={`market.${row.id}.name`} fallback={row.market} /><small className="source-ids"><LocalizedText id={`market.${row.id}.legalForm`} fallback={row.legalForm} /></small></th>
                <td><LocalizedText id={`market.${row.id}.signal`} fallback={row.signal} /><small className="source-ids"><LocalizedText id="common.sources" fallback="Sources" />: {row.sourceIds.map((sourceId, index) => <span key={sourceId}>{index ? ' · ' : ''}<Link href={`/bibliography#${sourceId}`}>{sourceId}</Link></span>)}</small></td>
                <td><LocalizedText id={`market.${row.id}.implication`} fallback={row.implication} /></td>
                <td><b><LocalizedText id={`market.${row.id}.owner`} fallback={row.owner} /></b><p className="table-action"><LocalizedText id={`market.${row.id}.action`} fallback={row.action} /></p><small className="source-ids"><b><LocalizedText id="common.escalate" fallback="Escalate" />:</b> <LocalizedText id={`market.${row.id}.evidenceTrigger`} fallback={row.evidenceTrigger} /></small></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section> : null}

      <section className="brief-section coverage-appendix">
        <div className="section-heading compact">
          <div><p className="eyebrow"><LocalizedText id="compare.appendix.eyebrow" fallback="Structured coverage appendix" /></p><h2><LocalizedText id="compare.appendix.title" fallback="Mapped applicable-provision counts" /></h2></div>
        </div>
        <p className="status-note"><LocalizedText id="compare.appendix.note" fallback="▲ Analytical inference. Cells count currently-applicable binding provisions in this deliberately small structured preview (SPEC §13.5 definition, build-date reference; no agent, no intensity threshold)." /> <b><LocalizedText id="compare.appendix.zero" fallback="— means no currently applicable binding provision identified in the scoped corpus; this does not mean no applicable legal obligation exists." /></b></p>
        <table>
        <thead><tr><th><LocalizedText id="compare.capability" fallback="Capability" /></th>{JURS.map((j) => <th key={j}>{j.toUpperCase()}</th>)}</tr></thead>
        <tbody>
          {capabilities.map((c) => (
            <tr key={c.id}>
              <td>{c.id} <LocalizedText id={`capability.${c.id}.name`} fallback={c.name} /></td>
              {JURS.map((j) => {
                const hits = ds.provisions.filter((p) =>
                  instrumentsById.get(p.instrument_id)?.jurisdiction_id === j &&
                  isCurrentlyApplicableBinding(p, instrumentsById, BUILD_DATE) &&
                  p.capability_map.some((m) => m.capability_id === c.id),
                );
                return (
                  <td key={j}>
                    {hits.length === 0 ? (
                      <span data-testid="unmapped-provision" aria-describedby={`compare-zero-${c.id}-${j}`}><span aria-hidden="true">—</span><span className="visually-hidden" id={`compare-zero-${c.id}-${j}`}><LocalizedText id="compare.zeroDetail" fallback="No currently applicable binding provision was identified in the scoped corpus; this does not mean no applicable legal obligation exists." /></span></span>
                    ) : (
                      <details>
                        <summary style={{ cursor: 'pointer' }}>{hits.length}</summary>
                        <ul style={{ margin: '4px 0', paddingLeft: 16, fontSize: 12 }}>
                          {hits.map((p) => (
                            <li key={p.id}>
                              <Link href={`/provisions/${encodeURIComponent(p.id)}`}>{p.pin_cite}</Link>{' '}
                              <span className="mono" style={{ fontSize: 10.5 }}>{p.instrument_id}</span>
                            </li>
                          ))}
                        </ul>
                      </details>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
        </table>
      </section>
    </article>
  );
}
