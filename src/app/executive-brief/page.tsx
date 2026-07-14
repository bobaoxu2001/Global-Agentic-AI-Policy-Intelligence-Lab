import type { Metadata } from 'next';
import Link from 'next/link';
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
        <p className="eyebrow">Profile boundary</p>
        <h1>Executive policy analysis is available only in the interview preview.</h1>
        <p>This {ds.profile} application page does not render the preview&apos;s current-policy conclusions. Separately downloadable work samples remain public, status-labeled portfolio artifacts; they are not records in the production policy corpus.</p>
        <div className="hero-actions">
          <Link className="button button-primary" href="/instruments">View profile records</Link>
          <Link className="button button-secondary" href="/methodology">Read the methodology</Link>
        </div>
      </section>
    );
  }
  return (
    <article className="brief-page">
      <header className="brief-header">
        <p className="eyebrow">Executive brief · 14 July 2026</p>
        <h1>Global agentic AI launch readiness</h1>
        <p className="brief-dek">A decision memo for a hypothetical customer-facing agent operating across four policy environments.</p>
        <div className="decision-banner">
          <span>Decision</span>
          <strong>Do not approve a universal launch from the current preview.</strong>
          <p>Approve reusable control development and require a product-specific, market-specific review before any launch conclusion.</p>
        </div>
      </header>

      <section className="brief-section">
        <div className="section-heading compact">
          <div><p className="eyebrow">Market readout</p><h2>One system, four different policy questions</h2></div>
        </div>
        <div className="market-table-wrap">
          <table className="market-table">
            <caption className="visually-hidden">Market-specific signals, implications, and actions in the scoped interview preview</caption>
            <thead><tr><th scope="col">Market</th><th scope="col">Verified signal in scope</th><th scope="col">Business implication</th><th scope="col">Action now</th></tr></thead>
            <tbody>{EXECUTIVE_MARKETS.map((row) => (
              <tr key={row.market}><th scope="row">{row.market}</th><td>{row.signal}{row.sourceIds.length ? <small className="source-ids">Sources: {row.sourceIds.join(' · ')}</small> : <small className="source-ids">Sources: scoped Atlas instrument records</small>}</td><td>{row.implication}</td><td>{row.action}</td></tr>
            ))}</tbody>
          </table>
        </div>
      </section>

      <section className="brief-section two-column-section">
        <div className="brief-callout risk-callout">
          <p className="eyebrow">Material risks</p>
          <h2>What can close the option set</h2>
          <ul>
            <li>Misreading a high-risk delay as a general transparency delay.</li>
            <li>Treating sparse coverage or a low heuristic score as evidence of no duty.</li>
            <li>Committing to permanent authority, regions, or suppliers before policy screening.</li>
            <li>Claiming a control without evidence that it works in the real workflow.</li>
          </ul>
        </div>
        <div className="brief-callout opportunity-callout">
          <p className="eyebrow">Strategic opportunities</p>
          <h2>What preserves and expands options</h2>
          <ul>
            <li>Identity, authorization, logs, disclosure, approval, and redress as shared platform capabilities.</li>
            <li>Assurance evidence that reduces enterprise adoption friction.</li>
            <li>Standards and sandbox participation grounded in implementation experience.</li>
            <li>Modular region and supplier architecture that can respond to compute and sovereignty policy.</li>
          </ul>
        </div>
      </section>

      <section className="brief-section">
        <div className="section-heading compact">
          <div><p className="eyebrow">Cross-functional plan</p><h2>30-day decision work</h2></div>
        </div>
        <ol className="action-plan">
          <li><span>Policy</span><div><b>Refresh the source-backed applicability screen.</b><p>Record instrument status, bindingness, dates, confidence, and the exact product fact that creates the question.</p></div><time>Day 5</time></li>
          <li><span>Product + Legal</span><div><b>Classify each market configuration.</b><p>Separate direct interaction, generated content, consequential decisions, profiling, minors, sectors, and distribution channels.</p></div><time>Day 10</time></li>
          <li><span>Engineering + Security</span><div><b>Implement and test shared controls.</b><p>Use expiring authority, allowlisted tools, logs, disclosure, approval thresholds, kill switch, and redress.</p></div><time>Day 21</time></li>
          <li><span>Leadership</span><div><b>Review evidence and residual uncertainty.</b><p>Make a market decision only after challenged assumptions, sensitivity, owners, and re-verification triggers are visible.</p></div><time>Day 30</time></li>
        </ol>
      </section>

      <section className="brief-section decision-gates">
        <p className="eyebrow">Launch decision gates</p>
        <h2>All five must be true</h2>
        <ol className="gate-grid">
          <li><b>01</b><span>System and capability profile confirmed</span></li>
          <li><b>02</b><span>Current primary sources checked</span></li>
          <li><b>03</b><span>Controls tested, not merely planned</span></li>
          <li><b>04</b><span>Sensitivity and unresolved questions shown</span></li>
          <li><b>05</b><span>Qualified human review recorded</span></li>
        </ol>
      </section>

      <section className="brief-sources">
        <p><b>Evidence boundary.</b> Facts in this brief are limited to the Atlas preview and the official sources listed in the <a href="/downloads/global-ai-policy-portfolio-pack.md">downloadable portfolio pack</a>. Implications and actions are analysis. This is not legal advice or a company recommendation.</p>
        <div className="hero-actions">
          <a className="button button-primary" href="/downloads/executive-brief.md">Open the brief</a>
          <Link className="button button-secondary" href="/provisions/eu-gdpr%3Aart22">Trace a claim</Link>
        </div>
      </section>
    </article>
  );
}
