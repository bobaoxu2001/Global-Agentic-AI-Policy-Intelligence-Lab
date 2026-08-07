import type { Metadata } from 'next';
import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { PORTFOLIO_MONITORING_LOG } from '@/lib/portfolio/policySignals';
import { getPageDataset } from '@/lib/validation/pageData';

export const metadata: Metadata = {
  title: 'Research Methodology',
  description: 'Source selection, evidence typing, monitoring, publication review, and ADRS limits for AI Policy Atlas.',
};

export default function MethodologyPage() {
  const ds = getPageDataset();
  return (
    <>
      <h1><LocalizedText id="method.title" fallback="Methodology" /></h1>
      <p className="status-note"><LocalizedText id="method.statusNote" fallback="Production records are published only after documented human review. The research preview is a separately labeled, AI-assisted research surface; its inclusion does not change a record's production review status." /></p>

      <section className="method-trust-model">
        <div className="section-heading compact">
          <div><p className="eyebrow"><LocalizedText id="method.trust.eyebrow" fallback="Trust model" /></p><h2><LocalizedText id="method.trust.title" fallback="Four handoffs keep the conclusion honest" /></h2></div>
          <p><LocalizedText id="method.trust.intro" fallback="The software can preserve traceability and fail closed. It cannot replace product facts, legal judgment, control testing, or accountable human authorization." /></p>
        </div>
        <ol className="trust-model-grid">
          <li><b>01</b><span><LocalizedText id="method.trust.fact.title" fallback="Primary-source fact" /></span><p><LocalizedText id="method.trust.fact.text" fallback="Official text, status, legal form, date, scope, citation, and re-check trigger." /></p></li>
          <li><b>02</b><span><LocalizedText id="method.trust.judgment.title" fallback="Analytical judgment" /></span><p><LocalizedText id="method.trust.judgment.text" fallback="Business implication and uncertainty remain visibly separate from the source fact." /></p></li>
          <li><b>03</b><span><LocalizedText id="method.trust.owner.title" fallback="Accountable owner" /></span><p><LocalizedText id="method.trust.owner.text" fallback="Policy, product, legal, engineering, security, or leadership owns the next evidence or decision." /></p></li>
          <li><b>04</b><span><LocalizedText id="method.trust.gate.title" fallback="Human publication gate" /></span><p><LocalizedText id="method.trust.gate.text" fallback="No unpublished record or consequential conclusion becomes approved because a model or test suite produced it." /></p></li>
        </ol>
        {ds.profile === 'preview' ? <div className="monitoring-snapshots" aria-labelledby="method-monitoring-snapshots-label">
          <span id="method-monitoring-snapshots-label"><LocalizedText id="method.monitoring.snapshots" fallback="Recorded monitoring snapshots" /></span>
          {PORTFOLIO_MONITORING_LOG.map((entry) => <p key={entry.date}><b>{entry.date}</b> · <LocalizedText id={`method.monitoring.${entry.date}.action`} fallback={entry.action} /> · <LocalizedText id={`method.monitoring.${entry.date}.note`} fallback={entry.note} /></p>)}
        </div> : null}
      </section>

      <section className="section-block rmf-method-entry" id="nist-ai-rmf">
        <div>
          <p className="eyebrow"><LocalizedText id="method.rmf.eyebrow" fallback="Applied risk management" /></p>
          <h2><LocalizedText id="method.rmf.title" fallback="GOVERN → MAP → MEASURE → MANAGE" /></h2>
          <p><LocalizedText id="method.rmf.text" fallback="See how NIST AI RMF 1.0 can connect policy expectations, product context, technical evidence, and accountable decisions across enterprise agents, cloud and model APIs, games and content, communication, and FinTech." /></p>
          <p className="rmf-method-boundary"><LocalizedText id="method.rmf.boundary" fallback="Independent application to public information; not a claim of Tencent adoption, certification, compliance, or control effectiveness." /></p>
        </div>
        <Link className="button button-primary" href="/risk-management"><LocalizedText id="method.rmf.open" fallback="Open the applied AI RMF" /> →</Link>
      </section>

      <h2><LocalizedText id="method.workflow.title" fallback="Research workflow" /></h2>
      <ol>
        <li><b><LocalizedText id="method.workflow.define.label" fallback="Define the decision." /></b> <LocalizedText id="method.workflow.define.text" fallback="Record the product, market, capability, date, and decision the research is meant to inform." /></li>
        <li><b><LocalizedText id="method.workflow.sources.label" fallback="Use primary sources first." /></b> <LocalizedText id="method.workflow.sources.text" fallback="Prefer official legislation, regulator or ministry publications, standards-body material, and official company disclosures. Secondary sources can help locate or interpret a primary source but do not silently replace it." /></li>
        <li><b><LocalizedText id="method.workflow.provenance.label" fallback="Capture provenance." /></b> <LocalizedText id="method.workflow.provenance.text" fallback="Store source ID, publisher, title, URL, tier, publication/access date, stable reference or archive evidence, and the next re-check date." /></li>
        <li><b><LocalizedText id="method.workflow.epistemic.label" fallback="Separate epistemic types." /></b> <LocalizedText id="method.workflow.epistemic.text" fallback="A fact states what the source supports; an inference explains likely business meaning; a recommendation proposes an accountable action." /></li>
        <li><b><LocalizedText id="method.workflow.scope.label" fallback="Challenge scope." /></b> <LocalizedText id="method.workflow.scope.text" fallback="Check bindingness, lifecycle, applicability, product facts, exceptions, unresolved translations, and contrary evidence." /></li>
        <li><b><LocalizedText id="method.workflow.review.label" fallback="Review before publication." /></b> <LocalizedText id="method.workflow.review.text" fallback="Production requires published status plus a logged owner approval. Preview inclusion is not publication approval." /></li>
      </ol>

      <h2><LocalizedText id="method.sources.title" fallback="Source tiers and confidence" /></h2>
      <p><b><LocalizedText id="method.sources.tier1.label" fallback="Tier 1" /></b> <LocalizedText id="method.sources.tier1.text" fallback="is authoritative primary material." /> <b><LocalizedText id="method.sources.tier2.label" fallback="Tier 2" /></b> <LocalizedText id="method.sources.tier2.text" fallback="is an authoritative explanatory or implementation source." /> <b><LocalizedText id="method.sources.tier3.label" fallback="Tier 3" /></b> <LocalizedText id="method.sources.tier3.text" fallback="may support discovery or context but does not establish a factual claim on its own." /> <LocalizedText id="method.sources.confidence" fallback="Confidence is capped by source quality, lifecycle uncertainty, translation quality, and the weakest fact supporting an inference." /></p>

      <h2><LocalizedText id="method.changeControl.title" fallback="Monitoring and change control" /></h2>
      <p><LocalizedText id="method.changeControl.text" fallback="Every dated portfolio signal has source IDs, a last-verified date, and a next-review date. Monitoring escalates only when a verified change affects product scope, launch timing, compute availability, customer eligibility, external positioning, or required evidence. Corrections preserve the prior record and explain what changed; a one-day snapshot is never described as a historical weekly track record." /></p>

      <h2><LocalizedText id="method.boundary.title" fallback="Profile and publication boundary" /></h2>
      <ul>
        <li><b><LocalizedText id="method.boundary.fixtures.label" fallback="Fixtures:" /></b> <LocalizedText id="method.boundary.fixtures.text" fallback="fictional records for product and formula testing." /></li>
        <li><b><LocalizedText id="method.boundary.preview.label" fallback="Research preview:" /></b> <LocalizedText id="method.boundary.preview.text" fallback="a deterministic, manifest-scoped subset plus clearly labeled portfolio work samples; AI-assisted and not independently approved for production publication." /></li>
        <li><b><LocalizedText id="method.boundary.production.label" fallback="Production:" /></b> <LocalizedText id="method.boundary.production.text" fallback="fail-closed structured routes that render only published, approved records. Unpublished rows may remain in the research files without appearing in the application." /></li>
      </ul>

      <h2><LocalizedText id="method.limits.title" fallback="Known limits" /></h2>
      <p><LocalizedText id="method.limits.text" fallback="The current structured corpus is a curated research foundation, not the larger corpus originally described in the product specification. It cannot establish universal legal coverage, current applicability for an unspecified product, or the effectiveness of controls that have not been tested in a real workflow. Qualified local review remains necessary for consequential decisions." /></p>

      <section className="section-block method-appendix" aria-labelledby="method-adrs-appendix-title">
        <p className="eyebrow"><LocalizedText id="method.appendix.eyebrow" fallback="Advanced method / appendix" /></p>
        <h2 id="method-adrs-appendix-title"><LocalizedText id="method.appendix.title" fallback="ADRS prioritization model" /></h2>
        <p><LocalizedText id="method.appendix.intro" fallback="The six-step research workflow above is the primary method. The ADRS material below is an optional prioritization aid for readers who want the technical detail." /></p>
        <h3><LocalizedText id="method.adrs.constants.title" fallback="ADRS constants (SPEC §13 — locked)" /></h3>
        <p className="status-note"><LocalizedText id="method.adrs.constants.canonicalNote" fallback="Canonical methodology evidence: the tested formula below remains verbatim in English in every interface language so that translation cannot alter its meaning." /></p>
        <details className="method-details">
          <summary><LocalizedText id="method.adrs.constants.summary" fallback="Open the formula constants" /></summary>
          <pre>{`Weights: A 0.25 · T 0.20 · D 0.20 · E 0.15 · R 0.20
Credits: M1 .10 M2 .08 M3 .07 M4 .06 M5 .05 M6 .04 M7 .04 M8 .03 M9 .03 (cap 0.40)
J: 1 + .10·binding + .05·near_term + .05·enforcement + .10·prohibition (cap 1.30)
Tiers (half-open, from RAW score): Low [0,25) · Moderate [25,50) · High [50,75) · Critical [75,100]
Precision: full-precision chain; display rounds to 1 dp; tests assert ±0.001 (SPEC §13.7)`}</pre>
        </details>
        <h3><LocalizedText id="method.adrs.limit.title" fallback="ADRS decision limit" /></h3>
        <p><LocalizedText id="method.adrs.limit.text" fallback="ADRS is an author-designed prioritization heuristic, not a calibrated probability, compliance score, or automated launch gate. Decisions must show the tier, driver breakdown, evidence quality, and plausible sensitivity range. Missing coverage can bias a score downward." /></p>
      </section>
    </>
  );
}
