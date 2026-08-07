import type { Metadata } from 'next';
import Link from 'next/link';
import { getPageDataset } from '@/lib/validation/pageData';
import { derivePreviewSummary } from '@/lib/validation/previewSummary';
import { PORTFOLIO_SIGNAL_AS_OF, PORTFOLIO_SIGNALS, PORTFOLIO_SOURCES } from '@/lib/portfolio/policySignals';
import { LocalizedText } from '@/components/LocalizedText';

export const metadata: Metadata = {
  title: 'Global AI Policy Intelligence',
  description: 'A source-traceable research portfolio connecting AI, compute, cloud, and agentic-policy change to accountable decisions.',
};

export default function DashboardPage() {
  const ds = getPageDataset();
  const preview = derivePreviewSummary(ds.instruments, ds.provisions);
  const isPreview = ds.profile === 'preview';
  const isFixture = ds.profile === 'fixtures';
  const profileLabel = ds.profile === 'preview' ? 'Curated research snapshot' : ds.profile === 'fixtures' ? 'Illustrative fixture demo' : 'Publication-gated corpus';
  const hero = isPreview
    ? {
        translationPrefix: 'home.preview',
        eyebrow: 'Global AI policy intelligence · 7 August 2026',
        title: 'From policy change to product decision.',
        lede: 'A source-traceable policy lab for agentic AI, cloud, and emerging technology—built to show what changed, why it matters, who owns the response, and what evidence is still missing.',
        primaryHref: '/executive-brief',
        primaryLabel: 'Read the executive decision',
        secondaryHref: '/policy-refresh',
        secondaryLabel: 'See the current policy update',
        footnote: 'Independent work sample · Facts, inferences, and recommendations are visibly separated · No launch or legal conclusion is automated.',
        postureLabel: 'Current executive posture',
        postureTitle: 'Build the control layer. Hold the universal launch decision.',
        postureText: 'The present evidence supports reusable identity, authorization, disclosure, logging, approval, testing, and redress controls. It does not support one global legal conclusion.',
        gate: 'Product facts + current primary law + operating control evidence + qualified human review',
      }
    : isFixture
      ? {
          translationPrefix: 'home.fixtures',
          eyebrow: 'Illustrative governance product',
          title: 'Explore a fictional agent-governance dataset.',
          lede: 'This profile exists to test the Atlas method, interactions, and score mechanics with explicitly fictional records.',
          primaryHref: '/scenarios',
          primaryLabel: 'Open fictional scenarios',
          secondaryHref: '/compare',
          secondaryLabel: 'Compare fixture records',
          footnote: 'Fixture content is illustrative only and must never be treated as policy research or deployed as production evidence.',
          postureLabel: 'Fixture boundary',
          postureTitle: 'Test the method. Treat every record as fictional.',
          postureText: 'Use this profile for interaction and calculation review. It makes no claim about current policy, legal obligations, or launch readiness.',
          gate: 'Fictional data + deterministic checks + no production deployment',
        }
      : {
          translationPrefix: 'home.production',
          eyebrow: 'Publication-gated policy intelligence',
          title: 'Published research appears only after review.',
          lede: 'The production application fails closed: no structured policy record is presented as published until its evidence review and owner decision are recorded.',
          primaryHref: '/instruments',
          primaryLabel: 'View publication state',
          secondaryHref: '/methodology',
          secondaryLabel: 'Read the methodology',
          footnote: 'Working materials remain clearly labeled in the repository; production data routes exclude unpublished structured records.',
          postureLabel: 'Publication posture',
          postureTitle: 'Hold publication until the evidence gate is complete.',
          postureText: 'No policy conclusion is inferred from an empty corpus. Human review and owner sign-off remain required.',
          gate: 'Source check + analytical review + owner decision + published status',
        };

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><LocalizedText id={`${hero.translationPrefix}.eyebrow`} fallback={hero.eyebrow} /></p>
          <h1><LocalizedText id={`${hero.translationPrefix}.title`} fallback={hero.title} /></h1>
          <p className="hero-lede"><LocalizedText id={`${hero.translationPrefix}.lede`} fallback={hero.lede} /></p>
          <div className="hero-actions">
            <Link className="button button-primary" href={hero.primaryHref}><LocalizedText id={`${hero.translationPrefix}.primaryLabel`} fallback={hero.primaryLabel} /></Link>
            <Link className="button button-secondary" href={hero.secondaryHref}><LocalizedText id={`${hero.translationPrefix}.secondaryLabel`} fallback={hero.secondaryLabel} /></Link>
          </div>
          <p className="hero-footnote"><LocalizedText id={`${hero.translationPrefix}.footnote`} fallback={hero.footnote} /></p>
        </div>
        <aside className="decision-card" aria-labelledby="decision-title">
          <p className="eyebrow"><LocalizedText id={`${hero.translationPrefix}.postureLabel`} fallback={hero.postureLabel} /></p>
          <h2 id="decision-title"><LocalizedText id={`${hero.translationPrefix}.postureTitle`} fallback={hero.postureTitle} /></h2>
          <p><LocalizedText id={`${hero.translationPrefix}.postureText`} fallback={hero.postureText} /></p>
          <div className="decision-rule">
            <span><LocalizedText id="home.decisionGate" fallback="Decision gate" /></span>
            <b><LocalizedText id={`${hero.translationPrefix}.gate`} fallback={hero.gate} /></b>
          </div>
        </aside>
      </section>

      <p className="visually-hidden" id="home-metrics-label"><LocalizedText id="home.metrics.label" fallback="Research profile metrics" /></p>
      <dl className="metric-grid" aria-labelledby="home-metrics-label">
        <div><dd>{preview.jurisdictionCount}</dd><dt><LocalizedText id="home.metric.jurisdictions" fallback="jurisdictions in curated snapshot" /></dt></div>
        <div><dd>{preview.instrumentCount}</dd><dt><LocalizedText id="home.metric.instruments" fallback="scoped instruments in curated snapshot" /></dt></div>
        <div><dd>{ds.sources.length}</dd><dt><LocalizedText id="home.metric.structuredSources" fallback="structured-corpus sources" /></dt></div>
        <div><dd>{PORTFOLIO_SOURCES.length}</dd><dt><LocalizedText id="home.metric.monitoringSources" fallback="monitoring source records" /></dt></div>
        <div><dd>{PORTFOLIO_SIGNAL_AS_OF}</dd><dt><LocalizedText id="home.metric.checked" fallback="portfolio monitoring checked" /></dt></div>
      </dl>

      {isPreview ? <section className="section-block" id="policy-refresh">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><LocalizedText id="home.refresh.eyebrow" fallback="Policy refresh · 7 August 2026" /></p>
            <h2><LocalizedText id="home.refresh.title" fallback="What changed across the July-August policy transition" /></h2>
          </div>
          <p><LocalizedText id="home.refresh.intro" fallback="The refresh corrects the EU legislative lifecycle, records operative EU/California duties, and separates China's scoped binding rule from broader policy direction. Other signals retain their own verification dates." /></p>
        </div>
        <div className="signal-grid">
          {PORTFOLIO_SIGNALS.slice(0, 4).map((signal) => (
            <article className="signal-card" key={signal.title}>
              <p className="signal-market"><LocalizedText id={`signal.${signal.id}.market`} fallback={signal.market} /></p>
              <h3><LocalizedText id={`signal.${signal.id}.title`} fallback={signal.title} /></h3>
              <p><span className="inline-label fact-label"><LocalizedText id="common.fact" fallback="Fact" /></span><LocalizedText id={`signal.${signal.id}.fact`} fallback={signal.fact} /></p>
              <p><span className="inline-label inference-label"><LocalizedText id="common.implication" fallback="Implication" /></span><LocalizedText id={`signal.${signal.id}.implication`} fallback={signal.implication} /></p>
              <dl className="signal-ops">
                <div><dt><LocalizedText id="common.owner" fallback="Owner" /></dt><dd><LocalizedText id={`signal.${signal.id}.owner`} fallback={signal.owner} /></dd></div>
                <div><dt><LocalizedText id="common.action" fallback="Action" /></dt><dd><LocalizedText id={`signal.${signal.id}.action`} fallback={signal.action} /></dd></div>
                <div><dt><LocalizedText id="common.evidenceGate" fallback="Evidence gate" /></dt><dd><LocalizedText id={`signal.${signal.id}.evidenceGate`} fallback={signal.evidenceGate} /></dd></div>
              </dl>
              <p className="signal-source"><LocalizedText id="common.sources" fallback="Sources" />: {signal.sourceIds.map((sourceId, index) => <span key={sourceId}>{index ? ' · ' : ''}<Link href={`/bibliography#${sourceId}`}>{sourceId}</Link></span>)} · <LocalizedText id="home.signal.recheck" fallback="re-check by" /> {signal.nextReview}</p>
              <Link href={signal.href}><LocalizedText id="home.signal.open" fallback="Open the cited work sample" /> <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section> : null}

      {isPreview ? <section className="section-block proof-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><LocalizedText id="home.proof.eyebrow" fallback="90-second evidence path" /></p>
            <h2><LocalizedText id="home.proof.title" fallback="See the research judgment, not just the interface" /></h2>
          </div>
        </div>
        <div className="proof-grid">
          <article>
            <span className="step-number">01</span>
            <h3><LocalizedText id="home.proof.trace.title" fallback="Trace one claim" /></h3>
            <p><LocalizedText id="home.proof.trace.text" fallback="Read GDPR Article 22 as primary text, scoped inference, recommended controls, confidence, and review date." /></p>
            <Link href="/provisions/eu-gdpr%3Aart22"><LocalizedText id="home.proof.trace.link" fallback="Open the evidence chain" /></Link>
          </article>
          <article>
            <span className="step-number">02</span>
            <h3><LocalizedText id="home.proof.compare.title" fallback="Compare policy environments" /></h3>
            <p><LocalizedText id="home.proof.compare.text" fallback="Separate instrument type, bindingness, lifecycle, and applicable provision counts instead of flattening countries into “strict” or “light-touch.”" /></p>
            <Link href="/compare"><LocalizedText id="home.proof.compare.link" fallback="Open the comparison" /></Link>
          </article>
          <article>
            <span className="step-number">03</span>
            <h3><LocalizedText id="home.proof.decision.title" fallback="Make the executive call" /></h3>
            <p><LocalizedText id="home.proof.decision.text" fallback="Review risks, opportunities, cross-functional owners, decision gates, and the reasons a universal launch decision remains premature." /></p>
            <Link href="/executive-brief"><LocalizedText id="home.proof.decision.link" fallback="Open the brief" /></Link>
          </article>
        </div>
      </section> : null}

      {isPreview ? <section className="section-block capability-section">
        <div>
          <p className="eyebrow"><LocalizedText id="home.practice.eyebrow" fallback="Policy practice" /></p>
          <h2><LocalizedText id="home.practice.title" fallback="A cross-functional AI policy research practice" /></h2>
          <p><LocalizedText id="home.practice.text" fallback="The portfolio now includes a current intelligence brief, semiconductor/compute/cloud radar, business implications matrix, policy-position sample, stakeholder landscape, meeting brief, and an ADRS sensitivity note." /></p>
          <Link className="text-link" href="/work-samples"><LocalizedText id="home.practice.link" fallback="Review every work sample" /> <span aria-hidden="true">→</span></Link>
        </div>
        <ul className="capability-list">
          {(['monitor', 'synthesize', 'translate', 'engage', 'calibrate'] as const).map((capability) => {
            const copy = ({
              monitor: ['Monitor', 'Dated primary-source signals and change triggers'],
              synthesize: ['Synthesize', 'Executive implications, risks, opportunities, and actions'],
              translate: ['Translate', 'Policy → product → engineering control → evidence'],
              engage: ['Engage', 'Position note, stakeholder questions, and meeting preparation'],
              calibrate: ['Calibrate', 'Confidence, sensitivity, review status, and visible limits'],
            } as const)[capability];
            return <li key={capability}><b><LocalizedText id={`home.capability.${capability}.title`} fallback={copy[0]} /></b><span><LocalizedText id={`home.capability.${capability}.text`} fallback={copy[1]} /></span></li>;
          })}
        </ul>
      </section> : null}

      <section className="status-panel" data-testid="preview-summary">
        <div>
          <p className="eyebrow"><LocalizedText id="home.status.eyebrow" fallback="Research posture" /></p>
          <h2><LocalizedText id={`home.status.${ds.profile}`} fallback={profileLabel} /></h2>
        </div>
        <div className="status-copy">
          {ds.profile === 'production' && preview.instrumentCount === 0 ? <p><LocalizedText id="home.status.empty" fallback="No published content in this profile." /></p> : null}
          <p><LocalizedText
            id="home.status.summary"
            fallback="{instruments} instruments · {provisions} provisions · {jurisdictions} jurisdictions · {binding} binding · {conditional} conditionally binding · {nonBinding} non-binding · curated structured subset last verified {verified}. Production publication remains fail-closed until documented human review is complete."
            values={{ instruments: preview.instrumentCount, provisions: preview.provisionCount, jurisdictions: preview.jurisdictionCount, binding: preview.bindingCount, conditional: preview.conditionallyBindingCount, nonBinding: preview.nonBindingCount, verified: preview.lastVerified ?? '—' }}
          /></p>
        </div>
      </section>
    </>
  );
}
