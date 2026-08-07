import type { Metadata } from 'next';
import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { getPageDataset } from '@/lib/validation/pageData';
import {
  POLICY_REFRESH_CHANGES,
  PORTFOLIO_SIGNAL_AS_OF,
  portfolioSourceMap,
} from '@/lib/portfolio/policySignals';

export const metadata: Metadata = {
  title: 'Policy Refresh — 7 August 2026',
  description: 'A source-traceable change brief covering the EU AI Act lifecycle, EU and California transparency duties, and China agent-policy signals.',
};

export default function PolicyRefreshPage() {
  const ds = getPageDataset();
  if (ds.profile !== 'preview') {
    return (
      <section className="page-intro">
        <p className="eyebrow"><LocalizedText id="boundary.eyebrow" fallback="Profile boundary" /></p>
        <h1><LocalizedText id="refresh.boundary.title" fallback="The current policy refresh is available only in the research preview." /></h1>
        <p><LocalizedText id="refresh.boundary.text" fallback="This {profile} profile does not render preview-only monitoring conclusions. Production publication remains gated by documented human review." values={{ profile: ds.profile }} /></p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/instruments"><LocalizedText id="common.viewRecords" fallback="View profile records" /></Link>
          <Link className="button button-secondary" href="/methodology"><LocalizedText id="common.readMethodology" fallback="Read the methodology" /></Link>
        </div>
      </section>
    );
  }

  const sources = portfolioSourceMap();

  return (
    <article className="refresh-page">
      <header className="refresh-header">
        <p className="eyebrow"><LocalizedText id="refresh.hero.eyebrow" fallback="Policy change brief" /> · {PORTFOLIO_SIGNAL_AS_OF}</p>
        <h1><LocalizedText id="refresh.hero.title" fallback="Four changes. One operating question." /></h1>
        <p className="refresh-dek"><LocalizedText id="refresh.hero.dek" fallback="What changed in the law or policy signal, what changed in the decision, and what evidence should a global AI team be able to produce now?" /></p>
        <p className="visually-hidden" id="refresh-posture-label"><LocalizedText id="refresh.posture.label" fallback="Change in operating posture" /></p>
        <div className="refresh-posture" aria-labelledby="refresh-posture-label">
          <div>
            <span><LocalizedText id="refresh.posture.before.label" fallback="14 July posture" /></span>
            <strong><LocalizedText id="refresh.posture.before.title" fallback="Track the EU amendment and prepare for 2 August." /></strong>
            <p><LocalizedText id="refresh.posture.before.text" fallback="Deadline readiness and an open Official Journal trigger." /></p>
          </div>
          <div>
            <span><LocalizedText id="refresh.posture.now.label" fallback="7 August posture" /></span>
            <strong><LocalizedText id="refresh.posture.now.title" fallback="Correct the lifecycle and test operating evidence now." /></strong>
            <p><LocalizedText id="refresh.posture.now.text" fallback="Product scope, applicable rule, working control, owner, proof, and decision expiry." /></p>
          </div>
        </div>
      </header>

      <section className="brief-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><LocalizedText id="refresh.log.eyebrow" fallback="Verified change log" /></p>
            <h2><LocalizedText id="refresh.log.title" fallback="Before, now, and the decision consequence" /></h2>
          </div>
          <p><LocalizedText id="refresh.log.note" fallback="Facts were checked against the linked official sources on 7 August 2026. Questions, implications, and actions are analysis." /></p>
        </div>
        <div className="refresh-change-grid">
          {POLICY_REFRESH_CHANGES.map((change, index) => (
            <article className="refresh-card" id={change.id} key={change.id}>
              <div className="refresh-card-meta">
                <span>{String(index + 1).padStart(2, '0')}</span>
                <p><LocalizedText id={`refresh.change.${change.id}.market`} fallback={change.market} /></p>
                <time><LocalizedText id={`refresh.change.${change.id}.effectiveDate`} fallback={change.effectiveDate} /></time>
              </div>
              <h3><LocalizedText id={`refresh.change.${change.id}.title`} fallback={change.title} /></h3>
              <div className="refresh-transition" aria-labelledby={`refresh-transition-${change.id}`}>
                <span className="visually-hidden" id={`refresh-transition-${change.id}`}><LocalizedText id="refresh.transition.label" fallback="Status change" /></span>
                <div><span><LocalizedText id="refresh.label.before" fallback="Before" /></span><b><LocalizedText id={`refresh.change.${change.id}.before`} fallback={change.before} /></b></div>
                <span aria-hidden="true">→</span>
                <div><span><LocalizedText id="refresh.label.now" fallback="Now" /></span><b><LocalizedText id={`refresh.change.${change.id}.now`} fallback={change.now} /></b></div>
              </div>
              <p><span className="inline-label fact-label"><LocalizedText id="common.fact" fallback="Fact" /></span><LocalizedText id={`refresh.change.${change.id}.fact`} fallback={change.fact} /></p>
              <div className="refresh-question">
                <span><LocalizedText id="refresh.label.decisionQuestion" fallback="Decision question" /></span>
                <strong><LocalizedText id={`refresh.change.${change.id}.decisionQuestion`} fallback={change.decisionQuestion} /></strong>
              </div>
              <dl className="refresh-accountability">
                <div><dt><LocalizedText id="refresh.label.owner" fallback="Accountable owner" /></dt><dd><LocalizedText id={`refresh.change.${change.id}.owner`} fallback={change.owner} /></dd></div>
                <div><dt><LocalizedText id="refresh.label.evidenceGate" fallback="Evidence / escalation gate" /></dt><dd><LocalizedText id={`refresh.change.${change.id}.evidenceGate`} fallback={change.evidenceGate} /></dd></div>
              </dl>
              <p className="refresh-action"><span><LocalizedText id="refresh.label.actionNow" fallback="Action now" /></span><LocalizedText id={`refresh.change.${change.id}.action`} fallback={change.action} /></p>
              <p className="signal-source"><LocalizedText id="common.sources" fallback="Sources" />: {change.sourceIds.map((sourceId, sourceIndex) => {
                const source = sources.get(sourceId);
                return <span key={sourceId}>{sourceIndex ? ' · ' : ''}<Link href={`/bibliography#${sourceId}`} title={source?.title}>{sourceId}</Link></span>;
              })}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="brief-section">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow"><LocalizedText id="refresh.model.eyebrow" fallback="Cross-functional operating model" /></p>
            <h2><LocalizedText id="refresh.model.title" fallback="Turn monitoring into an accountable decision" /></h2>
          </div>
        </div>
        <ol className="refresh-operating-grid">
          {([
            ['classify', '01', 'Classify', 'Product surface, market, entity role, user, modality, capability, and effective date.'],
            ['trace', '02', 'Trace', 'Primary source, legal form, status, exact scope, exception, and analytical confidence.'],
            ['evidence', '03', 'Evidence', 'Operating disclosure, provenance, detection, logging, approval, incident, and redress proof.'],
            ['decide', '04', 'Decide', 'Named owner, unresolved question, qualified review, residual uncertainty, and expiry trigger.'],
          ] as const).map(([id, number, title, text]) => <li key={id}><b>{number}</b><span><LocalizedText id={`refresh.model.${id}.title`} fallback={title} /></span><p><LocalizedText id={`refresh.model.${id}.text`} fallback={text} /></p></li>)}
        </ol>
        <aside className="refresh-convergence">
          <p className="eyebrow"><LocalizedText id="refresh.insight.eyebrow" fallback="Cross-market insight" /></p>
          <h2><LocalizedText id="refresh.insight.title" fallback="Reusable controls create options—not one global legal conclusion." /></h2>
          <p><LocalizedText id="refresh.insight.text" fallback="The EU, California, China, and Singapore converge around observable and attributable AI behavior, but differ in legal form, role, scope, modality, dates, and evidence. A shared control layer is strategically useful only when product-market conclusions remain separate." /></p>
        </aside>
      </section>

      <section className="brief-sources">
        <p><b><LocalizedText id="refresh.boundary.label" fallback="Evidence boundary." /></b> <LocalizedText id="refresh.boundary.note" fallback="This is a selective dated snapshot, not a comprehensive survey, continuous monitoring service, legal opinion, company-compliance finding, or launch authorization. New and structured records remain subject to the Atlas review and publication gates." /></p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/executive-brief"><LocalizedText id="refresh.cta.executive" fallback="See the executive decision" /></Link>
          <a className="button button-secondary" href="/downloads/policy-refresh-2026-08-06.md"><LocalizedText id="refresh.cta.download" fallback="Download the source memo (English)" /></a>
          <Link className="button button-secondary" href="/methodology"><LocalizedText id="refresh.cta.method" fallback="Audit the method" /></Link>
        </div>
      </section>
    </article>
  );
}
