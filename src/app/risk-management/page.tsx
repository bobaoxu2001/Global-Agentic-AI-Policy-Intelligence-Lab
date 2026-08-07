import type { Metadata } from 'next';
import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';

export const metadata: Metadata = {
  title: 'Applied AI Risk Management',
  description: 'An evidence-bounded application of NIST AI RMF Govern, Map, Measure, and Manage to a multi-product AI ecosystem.',
};

const externalLinkProps = {
  target: '_blank',
  rel: 'noreferrer noopener',
} as const;

export default function RiskManagementPage() {
  return (
    <div className="rmf-page">
      <header className="rmf-header">
        <p className="eyebrow"><LocalizedText id="rmf.hero.eyebrow" fallback="NIST AI RMF 1.0 · applied operating method" /></p>
        <h1><LocalizedText id="rmf.hero.title" fallback="From policy signal to AI risk decision" /></h1>
        <p className="rmf-dek"><LocalizedText id="rmf.hero.dek" fallback="A practical way to connect external policy expectations, product context, technical evidence, and accountable launch decisions across a multi-product AI ecosystem." /></p>
        <div className="hero-actions">
          <a className="button button-primary" href="#four-functions"><LocalizedText id="rmf.hero.primary" fallback="Explore the four functions" /></a>
          <a className="button button-secondary" href="https://airc.nist.gov/airmf-resources/airmf/5-sec-core/" {...externalLinkProps}><LocalizedText id="rmf.hero.secondary" fallback="Open the NIST Core" /> ↗</a>
        </div>
        <aside className="rmf-boundary" data-evidence-boundary="public-information-only">
          <strong><LocalizedText id="rmf.boundary.label" fallback="Evidence boundary" /></strong>
          <p><LocalizedText id="rmf.boundary.text" fallback="NIST AI RMF 1.0 is voluntary, non-sector-specific, and currently being revised. This is an independent analytical application to public information—not a claim that Tencent has adopted the framework, not a certification or compliance finding, not evidence that disclosed controls are effective, and not legal advice. It is a context-level method artifact, not a provision-level legal mapping or launch authorization." /></p>
        </aside>
      </header>

      <section className="section-block" id="four-functions">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><LocalizedText id="rmf.core.eyebrow" fallback="Four core functions" /></p>
            <h2><LocalizedText id="rmf.core.title" fallback="One iterative risk-management system" /></h2>
          </div>
          <p><LocalizedText id="rmf.core.intro" fallback="The functions are not a one-time checklist. GOVERN is cross-cutting; changed context or new evidence sends the work back through MAP and MEASURE before the next management decision." /></p>
        </div>

        <div className="rmf-govern-band">
          <span>GOVERN</span>
          <strong><LocalizedText id="rmf.core.governBand" fallback="Cross-cutting accountability, policy, culture, and process across the lifecycle" /></strong>
        </div>
        <ol className="rmf-function-grid" aria-label="NIST AI RMF core functions">
          <li className="rmf-function-card" data-rmf-function="govern">
            <div className="rmf-function-heading"><b>01</b><h3>GOVERN</h3></div>
            <div className="rmf-layer fact" data-epistemic-kind="fact">
              <span><LocalizedText id="rmf.layer.fact" fallback="NIST foundation" /></span>
              <p><LocalizedText id="rmf.govern.fact" fallback="Cultivate a risk-management culture and establish policies, roles, documentation, accountability, and organizational alignment. GOVERN informs and enables MAP, MEASURE, and MANAGE." /></p>
            </div>
            <div className="rmf-layer proposal" data-epistemic-kind="proposal">
              <span><LocalizedText id="rmf.layer.proposal" fallback="Atlas application" /></span>
              <p><LocalizedText id="rmf.govern.proposal" fallback="Maintain an AI inventory, risk tolerances, third-party supply-chain rules, training, monitoring, audit, incident response, and retirement paths. Make RACI, approval, pause, and escalation authority explicit." /></p>
            </div>
            <div className="rmf-layer question" data-epistemic-kind="question">
              <span><LocalizedText id="rmf.layer.question" fallback="Decision question" /></span>
              <p><LocalizedText id="rmf.govern.question" fallback="Who is accountable, against which standard, and who can approve, pause, or escalate?" /></p>
            </div>
          </li>

          <li className="rmf-function-card" data-rmf-function="map">
            <div className="rmf-function-heading"><b>02</b><h3>MAP</h3></div>
            <div className="rmf-layer fact" data-epistemic-kind="fact">
              <span><LocalizedText id="rmf.layer.fact" fallback="NIST foundation" /></span>
              <p><LocalizedText id="rmf.map.fact" fallback="Establish the system and use context: intended purposes, actors, affected people, impacts, contributing factors, and risks. This context can support an initial go/no-go judgment." /></p>
            </div>
            <div className="rmf-layer proposal" data-epistemic-kind="proposal">
              <span><LocalizedText id="rmf.layer.proposal" fallback="Atlas application" /></span>
              <p><LocalizedText id="rmf.map.proposal" fallback="Record the problem, users, affected groups, markets, sector, human-versus-AI decision role, data, tools, intended use, foreseeable misuse, and whether a non-AI option would work better." /></p>
            </div>
            <div className="rmf-layer question" data-epistemic-kind="question">
              <span><LocalizedText id="rmf.layer.question" fallback="Decision question" /></span>
              <p><LocalizedText id="rmf.map.question" fallback="Where is the system used, for whom, to do what, and who may be affected?" /></p>
            </div>
          </li>

          <li className="rmf-function-card" data-rmf-function="measure">
            <div className="rmf-function-heading"><b>03</b><h3>MEASURE</h3></div>
            <div className="rmf-layer fact" data-epistemic-kind="fact">
              <span><LocalizedText id="rmf.layer.fact" fallback="NIST foundation" /></span>
              <p><LocalizedText id="rmf.measure.fact" fallback="Use quantitative, qualitative, or mixed methods to test, evaluate, verify, and monitor risk before deployment and in operation. Document risks that cannot yet be measured and reassess whether metrics remain fit for purpose." /></p>
            </div>
            <div className="rmf-layer proposal" data-epistemic-kind="proposal">
              <span><LocalizedText id="rmf.layer.proposal" fallback="Atlas application" /></span>
              <p><LocalizedText id="rmf.measure.proposal" fallback="Test intended-use performance, error severity, attacks and prompt injection, privacy leakage, differential impact, human understanding, control bypass, drift, and third-party model or tool risk—not accuracy alone." /></p>
            </div>
            <div className="rmf-layer question" data-epistemic-kind="question">
              <span><LocalizedText id="rmf.layer.question" fallback="Decision question" /></span>
              <p><LocalizedText id="rmf.measure.question" fallback="What evidence shows the system is reliable, and do the controls work in the real context?" /></p>
            </div>
          </li>

          <li className="rmf-function-card" data-rmf-function="manage">
            <div className="rmf-function-heading"><b>04</b><h3>MANAGE</h3></div>
            <div className="rmf-layer fact" data-epistemic-kind="fact">
              <span><LocalizedText id="rmf.layer.fact" fallback="NIST foundation" /></span>
              <p><LocalizedText id="rmf.manage.fact" fallback="Prioritize mapped and measured risks, allocate resources, choose responses, monitor outcomes, communicate, recover, and improve. The decision can include whether development or deployment should proceed." /></p>
            </div>
            <div className="rmf-layer proposal" data-epistemic-kind="proposal">
              <span><LocalizedText id="rmf.layer.proposal" fallback="Atlas application" /></span>
              <p><LocalizedText id="rmf.manage.proposal" fallback="Choose full launch, limited pilot, market hold, permission reduction, human approval, supplier change, private deployment, pause, rollback, notification, or redress. Risks may be mitigated, accepted, transferred, or avoided." /></p>
            </div>
            <div className="rmf-layer question" data-epistemic-kind="question">
              <span><LocalizedText id="rmf.layer.question" fallback="Decision question" /></span>
              <p><LocalizedText id="rmf.manage.question" fallback="Based on the evidence, what action should be taken now—and what would trigger a different decision?" /></p>
            </div>
          </li>
        </ol>
        <div className="rmf-cycle" aria-label="Iterative risk management cycle">
          <span>GOVERN</span><b aria-hidden="true">↕</b><span>MAP</span><b aria-hidden="true">→</b><span>MEASURE</span><b aria-hidden="true">→</b><span>MANAGE</span><b aria-hidden="true">↺</b>
          <p><LocalizedText id="rmf.core.cycle" fallback="New context, incidents, model changes, suppliers, markets, or evidence reopen the cycle." /></p>
        </div>
      </section>

      <section className="section-block" id="evidence-boundary">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><LocalizedText id="rmf.evidence.eyebrow" fallback="Evidence before inference" /></p>
            <h2><LocalizedText id="rmf.evidence.title" fallback="What is disclosed—and what is proposed" /></h2>
          </div>
          <p><LocalizedText id="rmf.evidence.intro" fallback="Public disclosures can establish product features and stated governance practices. They do not, by themselves, prove implementation quality, control effectiveness, or comprehensive compliance." /></p>
        </div>
        <div className="rmf-evidence-grid">
          <article className="rmf-evidence-card fact" data-epistemic-kind="fact">
            <span><LocalizedText id="rmf.evidence.public.label" fallback="Publicly reported evidence" /></span>
            <h3><LocalizedText id="rmf.evidence.public.title" fallback="A governance and product-control baseline" /></h3>
            <p><LocalizedText id="rmf.evidence.public.text" fallback="Tencent publicly describes responsible-AI governance covering privacy, data security, algorithmic fairness, misuse prevention, lifecycle risk response, and communication of capability limits. WorkBuddy documentation for specific product modes describes workspaces, confirmation modes, isolation, access control, encryption, and administrative logs. CodeBuddy CLI documentation describes fine-grained permissions and optional sandboxing. Tencent's July 2026 Hy3 release describes deployment across multiple products and API access through TokenHub." /></p>
          </article>
          <article className="rmf-evidence-card proposal" data-epistemic-kind="proposal">
            <span><LocalizedText id="rmf.evidence.proposed.label" fallback="Atlas operating proposal" /></span>
            <h3><LocalizedText id="rmf.evidence.proposed.title" fallback="A common decision layer across products" /></h3>
            <p><LocalizedText id="rmf.evidence.proposed.text" fallback="The group inventory, risk tiers, RACI, provider–deployer responsibility model, example metrics, and launch gates below are analytical recommendations. They are not claims about Tencent's undisclosed internal design and do not identify a control gap." /></p>
          </article>
        </div>
        <div className="rmf-source-strip">
          <span><LocalizedText id="common.sources" fallback="Sources" /></span>
          <a href="https://www.tencent.com/our-actions/social/tencent-responsible-ai-principles/" {...externalLinkProps}>Tencent Responsible AI Principles ↗</a>
          <a href="https://cloud.tencent.com/document/product/1831/134401" {...externalLinkProps}>WorkBuddy permissions ↗</a>
          <a href="https://www.codebuddy.ai/docs/cli/security" {...externalLinkProps}>CodeBuddy CLI security ↗</a>
          <a href="https://www.tencent.com/tencent-hunyuan-officially-releases-hy3-advancing-agent-capabilities-and-deeper-product-integration/" {...externalLinkProps}>Tencent Hy3 release · 2026-07-06 ↗</a>
        </div>
      </section>

      <section className="section-block" id="group-governance">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><LocalizedText id="rmf.group.eyebrow" fallback="Proposed group-level GOVERN" /></p>
            <h2><LocalizedText id="rmf.group.title" fallback="One operating baseline, scaled by risk" /></h2>
          </div>
          <p><LocalizedText id="rmf.group.intro" fallback="A diverse product portfolio needs a shared minimum standard while preserving use-case-specific testing and market decisions." /></p>
        </div>
        <div className="rmf-operating-grid">
          <article>
            <span>01</span><h3><LocalizedText id="rmf.group.inventory.title" fallback="AI inventory" /></h3>
            <p><LocalizedText id="rmf.group.inventory.text" fallback="Record product, model and provider, data, tools, users and markets, product and technical owners, risk owner, current stage, latest assessment, and next review." /></p>
          </article>
          <article>
            <span>02</span><h3><LocalizedText id="rmf.group.tiers.title" fallback="Risk tiers" /></h3>
            <p><LocalizedText id="rmf.group.tiers.text" fallback="Example: Level 1 internal assistance; Level 2 consumer generation; Level 3 enterprise data or tool access; Level 4 finance, minors, significant rights, or irreversible action. Higher risk receives stronger evidence and approval gates." /></p>
          </article>
          <article>
            <span>03</span><h3>RACI</h3>
            <p><LocalizedText id="rmf.group.raci.text" fallback="Assign who is Responsible, Accountable, Consulted, and Informed for intended use, technical controls, legal applicability, security testing, policy interpretation, and risk acceptance." /></p>
          </article>
        </div>

        <div className="rmf-role-grid" aria-label="Proposed role map">
          <article><h3>Product</h3><p><LocalizedText id="rmf.role.product" fallback="Define intended use, affected users, business value, misuse, and product owner." /></p></article>
          <article><h3>Engineering</h3><p><LocalizedText id="rmf.role.engineering" fallback="Implement permissions, isolation, logs, evaluation hooks, rollback, and operational controls." /></p></article>
          <article><h3>Legal / Compliance</h3><p><LocalizedText id="rmf.role.legal" fallback="Determine legal applicability, required review, documentation, and market-specific constraints." /></p></article>
          <article><h3>Security</h3><p><LocalizedText id="rmf.role.security" fallback="Test adversarial paths, validate incident handling, and own security escalation." /></p></article>
          <article><h3>Global AI Policy</h3><p><LocalizedText id="rmf.role.policy" fallback="Monitor policy, translate external expectations into evidence questions, and distinguish fact, inference, and advocacy position." /></p></article>
          <article><h3>Management</h3><p><LocalizedText id="rmf.role.management" fallback="Authorize high-risk launch conditions and make explicit, dated risk-acceptance decisions." /></p></article>
        </div>
      </section>

      <section className="section-block" id="product-mapping">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><LocalizedText id="rmf.surfaces.eyebrow" fallback="MAP by product surface" /></p>
            <h2><LocalizedText id="rmf.surfaces.title" fallback="The same model can create different risks" /></h2>
          </div>
          <p><LocalizedText id="rmf.surfaces.intro" fallback="A foundation-model evaluation cannot stand in for the context of every downstream product. Each surface needs its own actors, permissions, harms, measures, and decision options." /></p>
        </div>
        <div className="rmf-surface-grid">
          <article className="rmf-surface-card">
            <span className="rmf-surface-index">01</span><p className="eyebrow"><LocalizedText id="rmf.surface.agent.type" fallback="Enterprise agents" /></p>
            <h3>WorkBuddy / CodeBuddy</h3>
            <dl>
              <div><dt>MAP</dt><dd><LocalizedText id="rmf.surface.agent.map" fallback="Which files, tools, systems, models, and other agents can be reached? Are permissions temporary or persistent? Which actions require human confirmation? How does data move across providers and workspaces?" /></dd></div>
              <div><dt>MEASURE</dt><dd><LocalizedText id="rmf.surface.agent.measure" fallback="Task success, unauthorized-action rate, approval-bypass rate, tool-trace completeness, human-correction rate, rollback success, sensitive-data exposure, and cost per successful outcome." /></dd></div>
              <div><dt>MANAGE</dt><dd><LocalizedText id="rmf.surface.agent.manage" fallback="Reduce tool scope, require confirmation for irreversible steps, isolate high-risk workspaces, limit provider access, pilot with selected users, or pause and roll back." /></dd></div>
            </dl>
          </article>

          <article className="rmf-surface-card">
            <span className="rmf-surface-index">02</span><p className="eyebrow"><LocalizedText id="rmf.surface.cloud.type" fallback="Cloud and model APIs" /></p>
            <h3>Tencent Cloud / Hy3 / TokenHub</h3>
            <dl>
              <div><dt>MAP</dt><dd><LocalizedText id="rmf.surface.cloud.map" fallback="Is Tencent acting as model provider, platform provider, application designer, or deployment support? Where is data processed? Who selects the use case, region, tools, and downstream controls?" /></dd></div>
              <div><dt>MEASURE</dt><dd><LocalizedText id="rmf.surface.cloud.measure" fallback="Evaluate model and platform evidence separately from customer-application evidence; test routing, provider fallback, data handling, tool supply chains, and use-case-specific performance." /></dd></div>
              <div><dt>MANAGE</dt><dd><LocalizedText id="rmf.surface.cloud.manage" fallback="Use a provider–deployer responsibility model, market and sector conditions, restricted tool access, customer evidence requirements, or private deployment for sensitive contexts." /></dd></div>
            </dl>
          </article>

          <article className="rmf-surface-card">
            <span className="rmf-surface-index">03</span><p className="eyebrow"><LocalizedText id="rmf.surface.content.type" fallback="Games and content" /></p>
            <h3><LocalizedText id="rmf.surface.content.title" fallback="NPCs, generated media, UGC, and enforcement" /></h3>
            <dl>
              <div><dt>MAP</dt><dd><LocalizedText id="rmf.surface.content.map" fallback="Distinguish entertainment NPCs from systems that recommend, match, moderate, detect cheating, or penalize accounts. Map minors, AI disclosure, impersonation, intellectual property, and generated-versus-user content." /></dd></div>
              <div><dt>MEASURE</dt><dd><LocalizedText id="rmf.surface.content.measure" fallback="Measure harmful-content rate, label coverage, factual error, identity confusion, complaints, correction success, and differential impact from recommendation or enforcement." /></dd></div>
              <div><dt>MANAGE</dt><dd><LocalizedText id="rmf.surface.content.manage" fallback="Separate creative and consequential controls, strengthen review for minors or account actions, change labeling, limit generation, or add appeal and restoration paths." /></dd></div>
            </dl>
          </article>

          <article className="rmf-surface-card">
            <span className="rmf-surface-index">04</span><p className="eyebrow"><LocalizedText id="rmf.surface.social.type" fallback="Communication and social" /></p>
            <h3><LocalizedText id="rmf.surface.social.title" fallback="Messaging, identity, recommendation, and user control" /></h3>
            <dl>
              <div><dt>MAP</dt><dd><LocalizedText id="rmf.surface.social.map" fallback="If AI expands into communication or social functions, map private-data use, human-versus-AI identity, impersonation, fraud and deepfakes, harmful-content amplification, user opt-out and correction, and country differences." /></dd></div>
              <div><dt>MEASURE</dt><dd><LocalizedText id="rmf.surface.social.measure" fallback="Test privacy leakage, identity confusion, scam and impersonation paths, reporting and correction success, recommendation effects, and performance at very large scale." /></dd></div>
              <div><dt>MANAGE</dt><dd><LocalizedText id="rmf.surface.social.manage" fallback="Limit features by market or audience, add provenance and user controls, constrain sensitive-data access, strengthen abuse response, or defer capabilities until evidence is sufficient." /></dd></div>
            </dl>
          </article>

          <article className="rmf-surface-card wide">
            <span className="rmf-surface-index">05</span><p className="eyebrow">FinTech</p>
            <h3><LocalizedText id="rmf.surface.fintech.title" fallback="Fraud, profiles, advice, restrictions, and transactions" /></h3>
            <dl>
              <div><dt>MAP</dt><dd><LocalizedText id="rmf.surface.fintech.map" fallback="Is AI assisting an employee or directly affecting funds, access, eligibility, or rights? What is the harm from a false result, who is differently affected, and who has final human accountability?" /></dd></div>
              <div><dt>MEASURE</dt><dd><LocalizedText id="rmf.surface.fintech.measure" fallback="False positives and negatives, differential impact, human-review override rate, appeal time, severe-error count, and whether explanations actually support review." /></dd></div>
              <div><dt>MANAGE</dt><dd><LocalizedText id="rmf.surface.fintech.manage" fallback="Keep human approval for consequential action, narrow automated authority, add notice and appeal, raise evidence thresholds, run a controlled pilot, or avoid the use case." /></dd></div>
            </dl>
          </article>
        </div>
      </section>

      <section className="section-block" id="management-options">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><LocalizedText id="rmf.options.eyebrow" fallback="MANAGE is a decision portfolio" /></p>
            <h2><LocalizedText id="rmf.options.title" fallback="More choices than launch or stop" /></h2>
          </div>
          <p><LocalizedText id="rmf.options.intro" fallback="A global decision should match the product, function, user, and market—not assume one approval covers every deployment." /></p>
        </div>
        <ol className="rmf-decision-grid">
          <li><b>01</b><span><LocalizedText id="rmf.option.scale" fallback="Scale low-risk uses; pilot high-risk uses with selected users." /></span></li>
          <li><b>02</b><span><LocalizedText id="rmf.option.market" fallback="Hold or modify the feature in specific markets or sectors." /></span></li>
          <li><b>03</b><span><LocalizedText id="rmf.option.permission" fallback="Reduce agent tools, data scope, duration, or irreversible authority." /></span></li>
          <li><b>04</b><span><LocalizedText id="rmf.option.human" fallback="Add human approval, review, notice, appeal, or redress." /></span></li>
          <li><b>05</b><span><LocalizedText id="rmf.option.supplier" fallback="Change models, data sources, tools, routing, or suppliers." /></span></li>
          <li><b>06</b><span><LocalizedText id="rmf.option.deployment" fallback="Use dedicated or private deployment for sensitive contexts." /></span></li>
          <li><b>07</b><span><LocalizedText id="rmf.option.incident" fallback="Pause the feature, contain the incident, roll back, recover, and notify." /></span></li>
          <li><b>08</b><span><LocalizedText id="rmf.option.review" fallback="Set an owner, evidence gate, review date, and trigger for reopening the decision." /></span></li>
        </ol>
      </section>

      <section className="section-block rmf-policy-interface" id="policy-interface">
        <div className="section-heading">
          <div>
            <p className="eyebrow"><LocalizedText id="rmf.policy.eyebrow" fallback="Global AI Policy interface" /></p>
            <h2><LocalizedText id="rmf.policy.title" fallback="Connect external signals to internal evidence" /></h2>
          </div>
          <p><LocalizedText id="rmf.policy.intro" fallback="The policy function does not need to run every technical test. It needs to frame the right questions, assess whether the evidence supports external claims and launch advice, and keep decision ownership explicit." /></p>
        </div>
        <div className="rmf-policy-grid">
          <article><span>GOVERN</span><p><LocalizedText id="rmf.policy.govern" fallback="Translate global expectations into common principles, risk tiers, role definitions, internal policy, and bounded external commitments." /></p></article>
          <article><span>MAP</span><p><LocalizedText id="rmf.policy.map" fallback="For an international product, research capabilities, target markets, affected people, applicable rules, and likely government or public concerns." /></p></article>
          <article><span>MEASURE</span><p><LocalizedText id="rmf.policy.measure" fallback="Ask what has been tested, whether controls were challenged, whether metrics reflect the real context, and which risks remain unmeasurable." /></p></article>
          <article><span>MANAGE</span><p><LocalizedText id="rmf.policy.manage" fallback="Produce a source-bounded executive brief, launch recommendation, stakeholder messages, policy position, owner map, and dated follow-up actions." /></p></article>
        </div>
        <blockquote><LocalizedText id="rmf.policy.conclusion" fallback="Global AI Policy turns external policy signals into inputs for the AI risk-management cycle—and translates internal governance evidence into claims that external stakeholders can understand and trust." /></blockquote>
      </section>

      <section className="rmf-sources" aria-labelledby="rmf-sources-title">
        <p className="eyebrow"><LocalizedText id="rmf.sources.eyebrow" fallback="Official evidence register" /></p>
        <h2 id="rmf-sources-title"><LocalizedText id="rmf.sources.title" fallback="Primary sources used on this page" /></h2>
        <p><LocalizedText id="rmf.sources.note" fallback="Status and product references checked 2026-08-07. Tencent statements are treated as company-reported evidence; NIST framework language is treated as voluntary guidance. Links and official titles remain canonical across interface languages." /></p>
        <ul>
          <li><a href="https://www.nist.gov/publications/artificial-intelligence-risk-management-framework-ai-rmf-10" {...externalLinkProps}>NIST · Artificial Intelligence Risk Management Framework (AI RMF 1.0) ↗</a></li>
          <li><a href="https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf" {...externalLinkProps}>NIST.AI.100-1 · AI RMF 1.0 PDF ↗</a></li>
          <li><a href="https://www.nist.gov/itl/ai-risk-management-framework" {...externalLinkProps}>NIST · AI Risk Management Framework program and revision status ↗</a></li>
          <li><a href="https://www.tencent.com/our-actions/social/tencent-responsible-ai-principles/" {...externalLinkProps}>Tencent Responsible AI Principles ↗</a></li>
          <li><a href="https://static.www.tencent.com/uploads/2026/04/09/34cdfa7393ee49cd5677b28f38c68d74.pdf" {...externalLinkProps}>Tencent · 2025 ESG Report ↗</a></li>
          <li><a href="https://cloud.tencent.com/document/product/1831/134401" {...externalLinkProps}>Tencent Cloud · WorkBuddy permissions ↗</a></li>
          <li><a href="https://cloud.tencent.com/document/product/1831/134425" {...externalLinkProps}>Tencent Cloud · WorkBuddy operation logs ↗</a></li>
          <li><a href="https://www.codebuddy.ai/docs/cli/permissions" {...externalLinkProps}>CodeBuddy CLI · permissions ↗</a></li>
          <li><a href="https://www.tencent.com/tencent-hunyuan-officially-releases-hy3-advancing-agent-capabilities-and-deeper-product-integration/" {...externalLinkProps}>Tencent · Hy3 launch and product integration · 2026-07-06 ↗</a></li>
          <li><a href="https://cloud.tencent.com/document/product/1729/104753" {...externalLinkProps}>Tencent Cloud · Hunyuan platform migration to TokenHub ↗</a></li>
        </ul>
        <p className="rmf-sources-more"><Link href="/methodology"><LocalizedText id="rmf.sources.methodology" fallback="Return to the full research methodology" /> →</Link> · <Link href="/downloads/tencent-public-information-implications-brief.md"><LocalizedText id="rmf.sources.brief" fallback="Open the public-information implications brief" /> →</Link></p>
      </section>
    </div>
  );
}
