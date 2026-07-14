# Policy Position Note — Secure and Interoperable AI Agents

**Issue:** identity, authorization, auditability, and interoperability for action-taking AI agents
**Audience:** hypothetical internal public-policy, security, product, and standards teams
**Status:** portfolio sample only; not submitted to any government or standards body; no company affiliation

## Recommended position

Support **outcome-based, risk-proportionate, and interoperable standards** that make an agent’s identity, delegated authority, actions, and responsible human or organization verifiable without prescribing a single technical architecture.

## Why this position is supportable

1. Agents create value by acting across systems; fragmented identity and authorization schemes can block that value or create unsafe workarounds.
2. The most important policy outcomes are observable: bounded authority, authenticated actors, least privilege, traceable actions, meaningful approval for high-impact steps, incident response, and user redress.
3. Open standards can improve portability and security, but premature mandates can freeze weak protocols or burden low-risk agents as if they were high-impact systems.
4. Security and accountability need both technical and organizational controls; an audit log alone does not identify who set the policy, approved the task, or responds when something fails.

## Policy asks

- Define a common vocabulary for **agent identity, principal, delegated authority, tool scope, session, action, approval, and revocation**.
- Encourage interoperable, machine-readable authorization and audit records while allowing multiple implementation paths.
- Scale expectations by authority and impact: an information-retrieval agent should not carry the same control burden as an agent that transfers funds or changes production systems.
- Require clear revocation, expiry, and re-authorization for delegated powers; avoid permanent standing authority by default.
- Treat prompt injection, confused-deputy behavior, credential misuse, and multi-agent delegation as core threat-model cases.
- Pair technical evidence with accountable ownership, incident handling, user notice, and redress.
- Use pilots, testbeds, and public evaluation before converting voluntary guidance into prescriptive requirements.

## Trade-offs and red lines

| Question | Preferred approach | Avoid |
|---|---|---|
| Interoperability | Open, testable protocols with versioning and conformance evidence | A single mandated vendor or protocol before security properties are demonstrated |
| Assurance | Evidence proportional to authority and impact | Checklist compliance that ignores whether controls work in practice |
| Privacy | Minimal, purpose-limited identity attributes and protected audit access | Public logs or identity schemes that expose sensitive user or enterprise data |
| Human control | Meaningful checkpoints at high-impact or irreversible actions | Nominal approval that occurs too late to prevent harm |
| Innovation | Sandboxes and reversible pilots | Blanket restrictions on low-risk experimentation |

## Stakeholder perspectives to test

- **Security and standards bodies:** what minimum identity and authorization properties are technically mature?
- **Civil society and consumer groups:** what transparency, contestability, and redress are needed when agents act for or influence people?
- **Developers and cloud providers:** where would cross-platform interoperability reduce risk or deployment friction?
- **Regulators:** which evidence would make accountability claims credible and auditable?
- **Researchers:** which evaluation methods distinguish nominal controls from effective controls?

## Evidence base

- NIST, [AI Agent Standards Initiative](https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative), updated 2026-04-20.
- NIST NCCoE, [Identity and Authority of Software Agents concept paper announcement](https://www.nist.gov/news-events/news/2026/02/new-concept-paper-identity-and-authority-software-agents), 2026-02-05.
- Singapore IMDA, [Model AI Governance Framework for Agentic AI](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai), 2026-01-22.
