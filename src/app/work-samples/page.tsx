import type { Metadata } from 'next';
import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { getPageDataset } from '@/lib/validation/pageData';

export const metadata: Metadata = {
  title: 'Global AI Policy Work Samples',
  description: 'Monitoring, executive synthesis, policy positions, engagement preparation, and quantitative policy work samples.',
};

type Sample = { id: string; type: string; title: string; proof: string; limit: string; href: string; secondaryHref?: string; secondaryLabel?: string };

const SAMPLES: readonly Sample[] = [
  { id: 'policy-refresh', type: 'Latest change', title: 'July-August Policy Refresh', proof: 'A before/after decision brief on the EU lifecycle correction, live EU/California transparency duties, and China\'s binding anthropomorphic-interaction rule versus non-binding agent-policy direction.', limit: 'Selective change note; product scope and legal conclusions remain owner- and counsel-dependent.', href: '/policy-refresh', secondaryHref: '/downloads/policy-refresh-2026-08-06.md', secondaryLabel: 'Download source memo (English)' },
  { id: 'global-intelligence', type: 'Monitoring', title: 'Global AI Policy Intelligence Brief', proof: 'Updated dated signals across the EU, US, China, Singapore, Korea, and UK with implications, owners, risks, opportunities, and triggers.', limit: 'Selective executive scan; not comprehensive or real time.', href: '/downloads/global-ai-policy-intelligence-brief.md' },
  { id: 'oversight-memo', type: 'Memo', title: 'Human Oversight & Disclosure Policy Memo', proof: 'A concise four-market position connecting source-backed signals to architecture choices, trade-offs, and a decision request.', limit: 'Final as a portfolio writing sample; underlying structured records remain in review.', href: '/downloads/policy-memo-human-oversight-and-disclosure.md' },
  { id: 'compute-radar', type: 'Emerging tech', title: 'Semiconductor, Compute & Cloud Radar', proof: 'Advanced-compute export controls, data-center policy, EU cloud sovereignty, agent standards, and APAC implementation in one operating view.', limit: 'Directional business analysis; licensing and legal decisions remain counsel-owned.', href: '/downloads/emerging-tech-policy-radar.md' },
  { id: 'business-matrix', type: 'Strategy', title: 'Business Implications Matrix', proof: 'Six product surfaces translated into reversible actions, escalation owners, and evidence needed before launch.', limit: 'No proprietary company or market data is used.', href: '/downloads/business-implications-matrix.md' },
  { id: 'agent-position', type: 'Policy position', title: 'Secure & Interoperable Agents', proof: 'Outcome-based position, policy asks, trade-offs, red lines, and stakeholder questions for identity and authorization standards.', limit: 'Portfolio sample only; not submitted or endorsed.', href: '/downloads/policy-position-note-sample.md' },
  { id: 'stakeholder-brief', type: 'Engagement', title: 'Stakeholder Landscape & Meeting Brief', proof: 'Structured public-source tracker plus messages, questions, red lines, leave-behind, and follow-up ownership.', limit: 'Every relationship remains explicitly “not contacted.”', href: '/downloads/meeting-brief-sample.md', secondaryHref: '/downloads/stakeholder-landscape.json', secondaryLabel: 'Open stakeholder tracker (English)' },
  { id: 'consultation-response', type: 'Consultation', title: 'Consultation Response Sample', proof: 'A regulator-facing response structure with a clear position, evidence, implementation detail, safeguards, and bounded policy requests.', limit: 'Independent portfolio sample; not filed, commissioned, or endorsed.', href: '/downloads/consultation-response-sample.md' },
  { id: 'speaking-brief', type: 'Speaking', title: 'Speaking Brief Sample', proof: 'An event-ready opening, message house, proof points, anticipated questions, bridges, and red lines for responsible agent deployment.', limit: 'No invitation, speaking engagement, or company representation is claimed.', href: '/downloads/speaking-brief-sample.md' },
  { id: 'industry-tracker', type: 'Industry tracking', title: 'Industry Initiatives Tracker', proof: 'A source-dated view of standards, coalitions, assurance programs, and participation options with owners and next-review triggers.', limit: 'Public-source research only; no membership or participation is claimed.', href: '/downloads/industry-initiatives-tracker.md' },
  { id: 'adrs-note', type: 'Quant + qual', title: 'ADRS Sensitivity Note', proof: 'Defines decision use, one-anchor and one-component sensitivity, evidence requirements, and calibration limits.', limit: 'Author-designed heuristic; not externally calibrated or a compliance score.', href: '/downloads/adrs-sensitivity-note.md' },
  { id: 'corpus-analysis', type: 'Quantitative', title: 'Structured Corpus Analysis', proof: 'Reproducible counts, coverage ratios, denominators, publication state, and explicit limits generated directly from the tracked corpus.', limit: 'Descriptive sample analysis; not a jurisdiction ranking or legal-coverage study.', href: '/downloads/policy-corpus-descriptive-analysis.md' },
  { id: 'tencent-brief', type: 'Public-company case study', title: 'Tencent Public-Information Implications Brief', proof: 'Maps policy signals to business surfaces Tencent describes publicly, with questions, owners, and evidence gates.', limit: 'Public information only; no Tencent affiliation, internal knowledge, or company recommendation.', href: '/downloads/tencent-public-information-implications-brief.md' },
  { id: 'executive-deck', type: 'Presentation', title: 'Executive Briefing Deck', proof: 'Six-slide, editable briefing that frames the decision, market signals, business implications, operating plan, and evidence boundary.', limit: 'Independent portfolio presentation; not delivered inside a company or to an external stakeholder.', href: '/downloads/Global_AI_Policy_Executive_Briefing.pptx' },
];

export default function WorkSamplesPage() {
  const ds = getPageDataset();
  if (ds.profile !== 'preview') {
    return (
      <section className="page-intro">
        <p className="eyebrow"><LocalizedText id="workSamples.boundary.eyebrow" fallback="Profile boundary" /></p>
        <h1><LocalizedText id="workSamples.boundary.title" fallback="Policy work samples are available only in the research preview." /></h1>
        <p><LocalizedText id="workSamples.boundary.text" fallback="This {profile} application route keeps preview analysis outside its structured evidence surface. Separately downloadable work samples remain public, status-labeled portfolio artifacts; they are not production policy records." values={{ profile: ds.profile }} /></p>
        <Link className="button button-secondary" href="/methodology"><LocalizedText id="workSamples.boundary.methodology" fallback="Read the methodology" /></Link>
      </section>
    );
  }
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow"><LocalizedText id="workSamples.hero.eyebrow" fallback="Policy work samples" /></p>
        <h1><LocalizedText id="workSamples.hero.title" fallback="Applied global AI policy research, translated into decisions" /></h1>
        <p><LocalizedText id="workSamples.hero.text" fallback="Research is only useful when it changes a decision. This portfolio connects monitoring, executive synthesis, business implications, policy positions, stakeholder preparation, and technical governance—while keeping simulated work and evidence limits explicit." /></p>
        <div className="hero-actions">
          <a className="button button-primary" href="/downloads/global-ai-policy-portfolio-pack.md"><LocalizedText id="workSamples.hero.portfolioPack" fallback="Open the portfolio pack (English)" /></a>
          <Link className="button button-secondary" href="/executive-brief"><LocalizedText id="workSamples.hero.executiveBrief" fallback="Read the executive brief" /></Link>
        </div>
      </section>

      <div className="section-heading compact">
        <div><p className="eyebrow"><LocalizedText id="workSamples.library.eyebrow" fallback="Full evidence library" /></p><h2><LocalizedText id="workSamples.library.title" fallback="Explore the collection by decision need" /></h2></div>
      </div>
      <section className="sample-grid">
        {SAMPLES.map((sample, index) => (
          <article className="sample-card" key={sample.id}>
            <div className="sample-index" aria-hidden="true">{String(index + 1).padStart(2, '0')}</div>
            <p className="eyebrow"><LocalizedText id={`workSamples.sample.${sample.id}.type`} fallback={sample.type} /></p>
            <h2><LocalizedText id={`workSamples.sample.${sample.id}.title`} fallback={sample.title} /></h2>
            <p><LocalizedText id={`workSamples.sample.${sample.id}.proof`} fallback={sample.proof} /></p>
            <p className="sample-limit"><b><LocalizedText id="workSamples.evidenceLimit" fallback="Evidence limit:" /></b>{' '}<LocalizedText id={`workSamples.sample.${sample.id}.limit`} fallback={sample.limit} /></p>
            <a className="text-link sample-primary-link" href={sample.href}><LocalizedText id={sample.href.startsWith('/downloads/') ? 'workSamples.openSampleEnglish' : 'workSamples.openSample'} fallback={sample.href.startsWith('/downloads/') ? 'Open this sample (English)' : 'Open this sample'} /> <span aria-hidden="true">→</span></a>
            {sample.secondaryHref ? <a className="text-link sample-secondary-link" href={sample.secondaryHref}><LocalizedText id={`workSamples.sample.${sample.id}.secondary`} fallback={sample.secondaryLabel ?? 'Open related evidence (English)'} /> <span aria-hidden="true">→</span></a> : null}
          </article>
        ))}
      </section>

      <section className="section-block role-map">
        <div className="section-heading">
          <div><p className="eyebrow"><LocalizedText id="workSamples.role.eyebrow" fallback="Evidence boundaries" /></p><h2><LocalizedText id="workSamples.role.title" fallback="What the collection demonstrates—and does not claim" /></h2></div>
        </div>
        <div className="role-map-grid">
          <div><h3><LocalizedText id="workSamples.role.demonstrated.title" fallback="Demonstrated methods" /></h3><p><LocalizedText id="workSamples.role.demonstrated.text" fallback="Primary-source monitoring, international comparison, agentic-AI fluency, concise writing, risk/opportunity synthesis, product and engineering translation, structured quantitative reasoning, and stakeholder-preparation craft." /></p></div>
          <div><h3><LocalizedText id="workSamples.role.notFabricated.title" fallback="Claims intentionally excluded" /></h3><p><LocalizedText id="workSamples.role.notFabricated.text" fallback="No claim of company affiliation, submitted consultation, scheduled meeting, stakeholder relationship, production legal review, internally delivered recommendation, or empirically calibrated risk score." /></p></div>
        </div>
      </section>

      <section className="status-panel">
        <div><p className="eyebrow"><LocalizedText id="workSamples.standard.eyebrow" fallback="Research standard" /></p><h2><LocalizedText id="workSamples.standard.title" fallback="Challenge the chain" /></h2></div>
        <p><LocalizedText id="workSamples.standard.open" fallback="Open the" /> <Link href="/methodology"><LocalizedText id="workSamples.standard.methodology" fallback="methodology" /></Link><LocalizedText id="workSamples.standard.afterMethodology" fallback=", " /><Link href="/bibliography"><LocalizedText id="workSamples.standard.bibliography" fallback="bibliography" /></Link><LocalizedText id="workSamples.standard.afterBibliography" fallback=", and " /><Link href="/instruments"><LocalizedText id="workSamples.standard.tracker" fallback="instrument tracker" /></Link><LocalizedText id="workSamples.standard.suffix" fallback=" to inspect source tier, lifecycle, confidence, last verification, and the fact → inference → recommendation boundary." /></p>
      </section>
    </>
  );
}
