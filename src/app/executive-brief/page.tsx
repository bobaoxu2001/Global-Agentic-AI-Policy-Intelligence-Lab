import type { Metadata } from 'next';
import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { getPageDataset } from '@/lib/validation/pageData';
import { EXECUTIVE_MARKETS } from '@/lib/portfolio/policySignals';

export const metadata: Metadata = {
  title: 'Executive Policy Brief',
  description: 'A bounded global AI launch-readiness brief with market signals, business implications, owners, and decision gates.',
};

export default function ExecutiveBriefPage() {
  const ds = getPageDataset();
  if (ds.profile !== 'preview') {
    return (
      <section className="page-intro">
        <p className="eyebrow"><LocalizedText id="boundary.eyebrow" fallback="Profile boundary" /></p>
        <h1><LocalizedText id="executive.boundary.title" fallback="Executive policy analysis is available only in the research preview." /></h1>
        <p><LocalizedText id="executive.boundary.text" fallback="This {profile} application page does not render the preview's dated policy conclusions. Separately downloadable work samples remain public, status-labeled portfolio artifacts; they are not records in the production policy corpus." values={{ profile: ds.profile }} /></p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/instruments"><LocalizedText id="common.viewRecords" fallback="View profile records" /></Link>
          <Link className="button button-secondary" href="/methodology"><LocalizedText id="common.readMethodology" fallback="Read the methodology" /></Link>
        </div>
      </section>
    );
  }
  return (
    <article className="brief-page">
      <header className="brief-header">
        <p className="eyebrow"><LocalizedText id="executive.hero.eyebrow" fallback="Executive brief · 13 August 2026" /></p>
        <h1><LocalizedText id="executive.hero.title" fallback="Global agentic AI launch readiness" /></h1>
        <p className="brief-dek"><LocalizedText id="executive.hero.dek" fallback="A decision memo for a hypothetical customer-facing agent operating across four policy environments." /></p>
        <div className="decision-banner">
          <span><LocalizedText id="executive.decision.label" fallback="Decision" /></span>
          <strong><LocalizedText id="executive.decision.title" fallback="Do not issue a single global launch approval based on this preview alone." /></strong>
          <p><LocalizedText id="executive.decision.text" fallback="Proceed with reusable control development and require product-specific, market-specific review before deployment." /></p>
        </div>
      </header>

      <section className="brief-section" id="market-readout">
        <div className="section-heading compact">
          <div><p className="eyebrow"><LocalizedText id="executive.market.eyebrow" fallback="Market readout" /></p><h2><LocalizedText id="executive.market.title" fallback="One system, four different policy questions" /></h2></div>
        </div>
        <div className="market-table-wrap" tabIndex={0} role="region" aria-labelledby="executive-market-caption">
          <table className="market-table">
            <caption className="visually-hidden" id="executive-market-caption"><LocalizedText id="executive.caption" fallback="Market-specific signals, implications, and actions in the scoped research preview" /></caption>
            <thead><tr><th scope="col"><LocalizedText id="executive.header.market" fallback="Market" /></th><th scope="col"><LocalizedText id="executive.header.signal" fallback="Verified signal in scope" /></th><th scope="col"><LocalizedText id="executive.header.implication" fallback="Business implication" /></th><th scope="col"><LocalizedText id="executive.header.action" fallback="Action now" /></th></tr></thead>
            <tbody>{EXECUTIVE_MARKETS.map((row) => (
              <tr key={row.market}>
                <th scope="row"><LocalizedText id={`market.${row.id}.name`} fallback={row.market} /><small className="source-ids"><LocalizedText id={`market.${row.id}.legalForm`} fallback={row.legalForm} /></small></th>
                <td><LocalizedText id={`market.${row.id}.signal`} fallback={row.signal} />{row.sourceIds.length ? <small className="source-ids"><LocalizedText id="common.sources" fallback="Sources" />: {row.sourceIds.map((sourceId, index) => <span key={sourceId}>{index ? ' · ' : ''}<Link href={`/bibliography#${sourceId}`}>{sourceId}</Link></span>)}</small> : <small className="source-ids"><LocalizedText id="executive.sources.scoped" fallback="Sources: scoped Atlas instrument records" /></small>}</td>
                <td><LocalizedText id={`market.${row.id}.implication`} fallback={row.implication} /></td>
                <td><b><LocalizedText id={`market.${row.id}.owner`} fallback={row.owner} /></b><p className="table-action"><LocalizedText id={`market.${row.id}.action`} fallback={row.action} /></p><small className="source-ids"><b><LocalizedText id="common.escalate" fallback="Escalate" />:</b> <LocalizedText id={`market.${row.id}.evidenceTrigger`} fallback={row.evidenceTrigger} /></small></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="brief-section two-column-section">
        <div className="brief-callout risk-callout">
          <p className="eyebrow"><LocalizedText id="executive.risks.eyebrow" fallback="Material risks" /></p>
          <h2><LocalizedText id="executive.risks.title" fallback="What can close the option set" /></h2>
          <ul>
            {[
              'Treating the shared 2 August date as proof that EU and California duties have the same scope.',
              'Misreading a high-risk delay as a general transparency delay.',
              "Generalizing China's continuous-emotional-interaction rule to every chatbot or agent.",
              'Treating sparse coverage or a low heuristic score as evidence of no duty.',
              'Committing to permanent authority, regions, or suppliers before policy screening.',
              'Claiming a control without evidence that it works in the real workflow.',
            ].map((text, index) => <li key={text}><LocalizedText id={`executive.risks.${index + 1}`} fallback={text} /></li>)}
          </ul>
        </div>
        <div className="brief-callout opportunity-callout">
          <p className="eyebrow"><LocalizedText id="executive.opportunities.eyebrow" fallback="Strategic opportunities" /></p>
          <h2><LocalizedText id="executive.opportunities.title" fallback="What preserves and expands options" /></h2>
          <ul>
            {[
              'Identity, authorization, logs, disclosure, approval, and redress as shared platform capabilities.',
              'Assurance evidence that reduces enterprise adoption friction.',
              'Standards and sandbox participation grounded in implementation experience.',
              'Modular region and supplier architecture that can respond to compute and sovereignty policy.',
            ].map((text, index) => <li key={text}><LocalizedText id={`executive.opportunities.${index + 1}`} fallback={text} /></li>)}
          </ul>
        </div>
      </section>

      <section className="brief-section">
        <div className="section-heading compact">
          <div><p className="eyebrow"><LocalizedText id="executive.plan.eyebrow" fallback="Cross-functional plan" /></p><h2><LocalizedText id="executive.plan.title" fallback="30-day decision work" /></h2></div>
        </div>
        <ol className="action-plan">
          {([
            ['policy', 'Policy', 'Refresh the source-backed applicability screen.', 'Record instrument status, bindingness, dates, confidence, and the exact product fact that creates the question.', 'Day 5'],
            ['product', 'Product + Legal', 'Classify each market configuration.', 'Separate direct interaction, generated content, consequential decisions, profiling, minors, sectors, and distribution channels.', 'Day 10'],
            ['engineering', 'Engineering + Security', 'Implement and test shared controls.', 'Use expiring authority, allowlisted tools, logs, disclosure, approval thresholds, kill switch, and redress.', 'Day 21'],
            ['leadership', 'Leadership', 'Review evidence and residual uncertainty.', 'Make a market decision only after challenged assumptions, sensitivity, owners, and re-verification triggers are visible.', 'Day 30'],
          ] as const).map(([id, owner, title, text, time]) => <li key={id}><span><LocalizedText id={`executive.plan.${id}.owner`} fallback={owner} /></span><div><b><LocalizedText id={`executive.plan.${id}.title`} fallback={title} /></b><p><LocalizedText id={`executive.plan.${id}.text`} fallback={text} /></p></div><time><LocalizedText id={`executive.plan.${id}.time`} fallback={time} /></time></li>)}
        </ol>
      </section>

      <section className="brief-section decision-gates" id="decision-gates">
        <p className="eyebrow"><LocalizedText id="executive.gates.eyebrow" fallback="Launch decision gates" /></p>
        <h2><LocalizedText id="executive.gates.title" fallback="All five must be true" /></h2>
        <ol className="gate-grid">
          {[
            'System and capability profile confirmed',
            'Dated primary sources checked',
            'Controls tested, not merely planned',
            'Sensitivity and unresolved questions shown',
            'Qualified human review recorded',
          ].map((text, index) => <li key={text}><b>{String(index + 1).padStart(2, '0')}</b><span><LocalizedText id={`executive.gates.${index + 1}`} fallback={text} /></span></li>)}
        </ol>
      </section>

      <section className="brief-sources">
        <p><b><LocalizedText id="executive.boundary.label" fallback="Evidence boundary." /></b> <LocalizedText id="executive.boundary.prefix" fallback="Facts in this brief are limited to the Atlas preview and the dated official sources listed in the" /> <a href="/downloads/global-ai-policy-intelligence-brief.md"><LocalizedText id="executive.boundary.link" fallback="dated intelligence brief (English)" /></a>. <LocalizedText id="executive.boundary.suffix" fallback="Implications and actions are analysis. This is not legal advice or a company recommendation." /></p>
        <div className="hero-actions">
          <a className="button button-primary" href="/downloads/executive-brief.md"><LocalizedText id="executive.cta.open" fallback="Open the brief (English)" /></a>
          <Link className="button button-secondary" href="/provisions/eu-gdpr%3Aart22"><LocalizedText id="executive.cta.trace" fallback="Trace a claim" /></Link>
        </div>
      </section>
    </article>
  );
}
