import type { Metadata } from 'next';
import Link from 'next/link';
import { getPageDataset } from '@/lib/validation/pageData';
import { derivePreviewSummary } from '@/lib/validation/previewSummary';
import { PORTFOLIO_SIGNALS } from '@/lib/portfolio/policySignals';

export const metadata: Metadata = {
  title: 'Global AI Policy Intelligence',
  description: 'A source-traceable interview portfolio connecting AI, compute, cloud, and agentic-policy change to accountable decisions.',
};

export default function DashboardPage() {
  const ds = getPageDataset();
  const preview = derivePreviewSummary(ds.instruments, ds.provisions);
  const isPreview = ds.profile === 'preview';
  const isFixture = ds.profile === 'fixtures';
  const profileLabel = ds.profile === 'preview' ? 'Golden 8 interview preview' : ds.profile === 'fixtures' ? 'Illustrative fixture demo' : 'Publication-gated corpus';
  const hero = isPreview
    ? {
        eyebrow: 'Global AI policy intelligence · 14 July 2026',
        title: 'From policy change to product decision.',
        lede: 'A source-traceable policy lab for agentic AI, cloud, and emerging technology—built to show what changed, why it matters, who owns the response, and what evidence is still missing.',
        primaryHref: '/executive-brief',
        primaryLabel: 'Read the executive decision',
        secondaryHref: '/work-samples',
        secondaryLabel: 'Open the policy portfolio',
        footnote: 'Independent work sample · Facts, inferences, and recommendations are visibly separated · No launch or legal conclusion is automated.',
        postureLabel: 'Current executive posture',
        postureTitle: 'Build the control layer. Hold the universal launch decision.',
        postureText: 'The present evidence supports reusable identity, authorization, disclosure, logging, approval, testing, and redress controls. It does not support one global legal conclusion.',
        gate: 'Product facts + current primary law + operating control evidence + qualified human review',
      }
    : isFixture
      ? {
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
          <p className="eyebrow">{hero.eyebrow}</p>
          <h1>{hero.title}</h1>
          <p className="hero-lede">{hero.lede}</p>
          <div className="hero-actions">
            <Link className="button button-primary" href={hero.primaryHref}>{hero.primaryLabel}</Link>
            <Link className="button button-secondary" href={hero.secondaryHref}>{hero.secondaryLabel}</Link>
          </div>
          <p className="hero-footnote">{hero.footnote}</p>
        </div>
        <aside className="decision-card" aria-labelledby="decision-title">
          <p className="eyebrow">{hero.postureLabel}</p>
          <h2 id="decision-title">{hero.postureTitle}</h2>
          <p>{hero.postureText}</p>
          <div className="decision-rule">
            <span>Decision gate</span>
            <b>{hero.gate}</b>
          </div>
        </aside>
      </section>

      <dl className="metric-grid" aria-label={`${profileLabel} metrics`}>
        <div><dd>{preview.jurisdictionCount}</dd><dt>jurisdictions in profile</dt></div>
        <div><dd>{preview.instrumentCount}</dd><dt>scoped instruments</dt></div>
        <div><dd>{ds.sources.length}</dd><dt>source records</dt></div>
        <div><dd>{ds.controls.length}</dd><dt>mapped controls</dt></div>
        <div><dd>{preview.lastVerified ?? '—'}</dd><dt>structured-corpus verification</dt></div>
      </dl>

      {isPreview ? <section className="section-block">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Priority signals</p>
            <h2>What a global AI team should be discussing now</h2>
          </div>
          <p>Facts are scoped to the cited research; implications are analytical and must be challenged by the accountable teams.</p>
        </div>
        <div className="signal-grid">
          {PORTFOLIO_SIGNALS.slice(0, 4).map((signal) => (
            <article className="signal-card" key={signal.title}>
              <p className="signal-market">{signal.market}</p>
              <h3>{signal.title}</h3>
              <p><span className="inline-label fact-label">Fact</span>{signal.fact}</p>
              <p><span className="inline-label inference-label">Implication</span>{signal.implication}</p>
              <p className="signal-source">Sources: {signal.sourceIds.map((sourceId, index) => <span key={sourceId}>{index ? ' · ' : ''}<Link href={`/bibliography#${sourceId}`}>{sourceId}</Link></span>)} · re-check by {signal.nextReview}</p>
              <Link href={signal.href}>Open the cited work sample <span aria-hidden="true">→</span></Link>
            </article>
          ))}
        </div>
      </section> : null}

      {isPreview ? <section className="section-block proof-section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">90-second evidence path</p>
            <h2>See the research judgment, not just the interface</h2>
          </div>
        </div>
        <div className="proof-grid">
          <article>
            <span className="step-number">01</span>
            <h3>Trace one claim</h3>
            <p>Read GDPR Article 22 as primary text, scoped inference, recommended controls, confidence, and review date.</p>
            <Link href="/provisions/eu-gdpr%3Aart22">Open the evidence chain</Link>
          </article>
          <article>
            <span className="step-number">02</span>
            <h3>Compare policy environments</h3>
            <p>Separate instrument type, bindingness, lifecycle, and applicable provision counts instead of flattening countries into “strict” or “light-touch.”</p>
            <Link href="/compare">Open the comparison</Link>
          </article>
          <article>
            <span className="step-number">03</span>
            <h3>Make the executive call</h3>
            <p>Review risks, opportunities, cross-functional owners, decision gates, and the reasons a universal launch decision remains premature.</p>
            <Link href="/executive-brief">Open the brief</Link>
          </article>
        </div>
      </section> : null}

      {isPreview ? <section className="section-block capability-section">
        <div>
          <p className="eyebrow">Policy practice</p>
          <h2>Built for a cross-functional AI policy role</h2>
          <p>The portfolio now includes a current intelligence brief, semiconductor/compute/cloud radar, business implications matrix, policy-position sample, stakeholder landscape, meeting brief, and an ADRS sensitivity note.</p>
          <Link className="text-link" href="/work-samples">Review every work sample <span aria-hidden="true">→</span></Link>
        </div>
        <ul className="capability-list">
          <li><b>Monitor</b><span>Dated primary-source signals and change triggers</span></li>
          <li><b>Synthesize</b><span>Executive implications, risks, opportunities, and actions</span></li>
          <li><b>Translate</b><span>Policy → product → engineering control → evidence</span></li>
          <li><b>Engage</b><span>Position note, stakeholder questions, and meeting preparation</span></li>
          <li><b>Calibrate</b><span>Confidence, sensitivity, review status, and visible limits</span></li>
        </ul>
      </section> : null}

      <section className="status-panel" data-testid="preview-summary">
        <div>
          <p className="eyebrow">Research posture</p>
          <h2>{profileLabel}</h2>
        </div>
        <div className="status-copy">
          {ds.profile === 'production' && preview.instrumentCount === 0 ? <p>No published content in this profile.</p> : null}
          <p>{preview.instrumentCount} instruments · {preview.provisionCount} provisions · {preview.jurisdictionCount} jurisdictions · {preview.bindingCount} binding · {preview.conditionallyBindingCount} conditionally binding · {preview.nonBindingCount} non-binding · last verified {preview.lastVerified ?? '—'}. Production publication remains fail-closed until documented human review is complete.</p>
        </div>
      </section>
    </>
  );
}
