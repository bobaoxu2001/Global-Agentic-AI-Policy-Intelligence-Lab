# Speaking Brief Sample — Secure and Interoperable AI Agents

**Event:** hypothetical panel, *From Principles to Proof: Governing Action-Taking AI*
**Forum:** fictional Global AI Governance Forum
**Date / location:** not scheduled
**Speaker:** hypothetical independent policy lead
**Audience:** policymakers, standards bodies, civil society, security researchers, product teams, and cloud providers
**Status:** portfolio preparation exercise only. No invitation, event, speaking role, company position, relationship, or endorsement is claimed. Not legal advice.

## Evidence convention

- **■ Fact** — paraphrased from the linked official source.
- **▲ Analysis** — proposed interpretation for discussion.
- **● Message / recommendation** — the position the hypothetical speaker should advance.

## Objective

Establish a practical position: secure agent adoption needs interoperable identity and authorization, evidence at the action boundary, and accountability that remains meaningful across models, tools, organizations, and jurisdictions.

## Desired outcome

Secure agreement from the panel that the next useful deliverable is not a universal agent rule. It is a shared minimum evidence model covering identity, delegated authority, action, approval, outcome, revocation, and redress—tested through open, adversarial use cases.

## 90-second opening

AI policy often starts with the model. For agents, the harder question starts one step later: what happens when a model is given credentials, tools, memory, and permission to act?

The opportunity is real. Agents can reduce operational friction, improve access to services, and help people manage complex work. But trust will not come from calling an agent responsible. It will come from evidence that its authority is bounded, its actions are attributable, and someone can intervene before an irreversible mistake.

Three principles should guide the next phase. First, every agent needs a verifiable principal and an expiring scope. Second, controls belong at the action boundary—outside the model—where systems can deny, limit, approve, log, or reverse an action. Third, interoperability should standardize evidence before it standardizes one architecture. We need common semantics for identity, delegation, tools, approvals, outcomes, and revocation, while preserving room for competing protocols.

This is not an argument to wait for perfect standards. It is an argument to build reversible systems now, test them in public and sector-specific environments, and turn implementation evidence into better standards, policy, and products.

## Three messages to land

### 1. Identity without delegated authority is incomplete

**■ Fact.** NIST’s AI Agent Standards Initiative includes agent authentication, identity infrastructure, security evaluation, industry-led standards, and interoperable protocols. Its NCCoE project is considering standards-based approaches to identify agents and authorize their actions. [NIST initiative](https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative) · [NCCoE project](https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization)

**▲ Analysis.** Knowing which agent acted is insufficient if the record cannot show who delegated authority, for what purpose, over which resource, for how long, and with what revocation path.

**● Message.** Treat `principal + agent + purpose + scope + expiry + action + outcome` as one accountability chain.

### 2. Human oversight must be placed where it can change the outcome

**■ Fact.** Singapore’s Model AI Governance Framework for Agentic AI is organized around bounding agent powers, meaningful human accountability, lifecycle controls, and end-user responsibility. [IMDA framework announcement](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai)

**▲ Analysis.** A review button after an irreversible action is not meaningful oversight. Oversight depends on timing, authority, information, competence, and a feasible intervention.

**● Message.** Put approval before high-impact or irreversible actions; test whether the reviewer can understand, stop, reverse, and learn from the action.

### 3. Standards should make evidence portable

**■ Fact.** CoSAI, an OASIS Open Project, maintains workstreams on secure design patterns for agentic systems and published 2026 materials on Model Context Protocol security and agentic identity and access control. [CoSAI](https://www.coalitionforsecureai.org/) · [MCP security paper](https://www.coalitionforsecureai.org/wp-content/uploads/2026/03/model-context-protocol-security-1.pdf) · [Agentic identity paper](https://www.coalitionforsecureai.org/wp-content/uploads/2026/04/agentic-identity-and-access-control.pdf)

**▲ Analysis.** Protocol convergence can improve interoperability, but it can also spread a weak security assumption quickly. Portability should be judged by tested security properties and evidence, not adoption alone.

**● Message.** Standardize event semantics, conformance tests, threat scenarios, and evidence fields while allowing multiple architectures to compete.

## Expected Q&A

### Should agentic AI have a separate regulatory regime?

**Answer:** Not by default. The policy trigger should be what the system can do, who is affected, and whether the action is consequential or difficult to reverse. Agent-specific guidance is useful for identity, delegation, tools, multi-agent handoffs, monitoring, and recovery. Existing consumer, privacy, security, sectoral, and safety rules may still apply. A separate label should not erase those duties or impose the same burden on retrieval and payment execution.

### What is the single most urgent technical standard?

**Answer:** A shared evidence model for delegated authority. It should connect the principal, agent identity, purpose, scope, expiry, tool, action, approval, result, and revocation. That does not require one identity provider or one protocol; it requires testable semantics.

### Are voluntary standards enough?

**Answer:** They are necessary for technical coordination and can move faster than legislation, but they are not legal authorization and do not replace enforcement or redress. The right mix depends on the use case: voluntary conformance can improve interoperability, while binding rules may remain necessary for rights, safety, market conduct, and accountability.

### How do you avoid slowing low-risk innovation?

**Answer:** Scale evidence and controls to authority and impact. A read-only research agent and an agent that transfers funds should not face identical gates. Use low action budgets, sandboxing, reversible pilots, published test cases, and faster paths for systems that cannot change consequential state.

### What does meaningful human oversight require?

**Answer:** Five things: the review happens before the outcome becomes irreversible; the reviewer has authority to intervene; the reviewer receives intelligible evidence; the reviewer is competent and has enough time; and the organization measures whether intervention actually works.

### Who should own an agent incident?

**Answer:** Ownership should be assigned before deployment and should not disappear inside the model supply chain. Product owns the use case, security owns incident coordination, engineering owns containment and recovery, legal and policy assess obligations and external posture, and leadership owns residual-risk acceptance. Contracts can allocate tasks, but affected users still need a clear route to redress.

## Hostile or skeptical Q&A

### Isn’t “risk-proportionate” just industry language for weaker rules?

**Answer:** It can be misused, so proportionality must be tied to falsifiable system facts: authority, affected people, reversibility, scale, data, and demonstrated control effectiveness. A system should not receive lighter treatment because its developer calls it low risk. The evidence should be reviewable and the classification challengeable.

### Why should the public trust company self-assessments?

**Answer:** It should not be required to trust an unsupported assertion. Self-assessment is one input. High-impact claims need independent testing, regulator access, incident disclosure where appropriate, affected-community input, and consequences for materially false claims. Common evidence fields make those challenges easier.

### Don’t open agent protocols create a larger attack surface?

**Answer:** They can. Openness is not a substitute for secure design. Protocols should use least privilege, strong authentication, scoped authorization, versioning, revocation, secure defaults, and adversarial conformance tests. A protocol that improves connectivity without proving those properties can amplify risk.

### Are you asking regulators to wait while companies deploy?

**Answer:** No. Existing law and enforcement continue to apply. Regulators can require inventories, incident readiness, clear responsibility, and evidence for consequential uses now. The caution is against freezing one immature technical implementation when outcomes and testable evidence can be specified sooner.

### If a chain of agents causes harm, who is liable?

**Answer:** The panel should not invent a universal legal answer. Operationally, the evidence chain must preserve which organization selected the system, who delegated authority, which agent and tool acted, which controls failed, and who could prevent or remedy the outcome. Policy should avoid accountability gaps created by opaque delegation or contract layering.

### Isn’t human approval just theater at machine speed?

**Answer:** It is theater when approval is constant, uninformed, or too late. That is why approval should be reserved for defined boundaries, supported by concise evidence, and measured through intervention tests. Other controls—hard limits, isolation, monitoring, and rollback—must carry the load where humans cannot respond in time.

## Red lines

- Do not claim that the speaker, project, or any company participated in NIST, NCCoE, IMDA, CoSAI, ISO, or another standards process.
- Do not imply that a voluntary framework creates legal permission or that conformance guarantees safety.
- Do not claim one protocol, identity architecture, control set, or score is sufficient across sectors and jurisdictions.
- Do not disclose customer data, credentials, security architecture, incidents, unreleased product information, or non-public policy positions.
- Do not describe a human-in-the-loop control as meaningful without evidence of timing, authority, information, and effectiveness.
- Do not promise full rollback for public disclosure, exfiltration, physical action, or other inherently irreversible effects.
- Do not use the Atlas ADRS heuristic as a compliance, certification, or industry-standard claim.

## Bridge lines

- **From innovation to safeguards:** “The question is not whether agents create value; it is which evidence lets that value scale without invisible authority.”
- **From legal debate to implementation:** “Whatever the final legal classification, identity, least privilege, logs, revocation, and redress preserve options now.”
- **From disagreement to test:** “We may disagree on the architecture, so let us agree on the security property and the evidence that would prove it.”
- **From standards to public interest:** “Interoperability is useful only if people can still understand who acted, challenge the outcome, and reach an accountable organization.”

## Follow-up ownership

| Timing | Action | Owner | External commitment? |
|---|---|---|---|
| Same day | Record questions, commitments, corrections, and source links | Public affairs operations | No, unless explicitly made on stage |
| +1 business day | Validate any technical or legal statement that requires correction | Security architecture + legal/policy | No |
| +2 business days | Send approved public materials or decline requests that cross a red line | Communications + legal | Only after approval |
| +5 business days | Convert recurring questions into the agent-policy radar and evaluation backlog | Policy research + engineering assurance | No |
| +10 business days | Decide whether a standards contribution, consultation response, or test case is supportable | Standards policy + product + security + legal | No commitment until approved |

## Official source register

1. NIST, [AI Agent Standards Initiative](https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative), updated 2026-04-20.
2. NCCoE, [Software and AI Agent Identity and Authorization](https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization), comment period closed; reviewing comments.
3. Singapore IMDA, [Model AI Governance Framework for Agentic AI](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai), 2026-01-22.
4. OASIS Open / CoSAI, [Coalition for Secure AI](https://www.coalitionforsecureai.org/), including its 2026 agentic identity and protocol-security materials.
