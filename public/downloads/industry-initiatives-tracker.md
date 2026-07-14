# AI Agent Standards & Industry Initiatives Tracker

**As of:** 2026-07-14
**Scope:** government initiatives, applied standards projects, international standards, trade associations, industry consortia/foundations, and civil society relevant to secure and accountable AI agents
**Status:** independent public-source portfolio work sample; no membership, participation, contact, relationship, endorsement, or company position is claimed
**Use boundary:** monitoring and engagement planning only; not legal advice and not a substitute for technical, procurement, or standards-conformance review

## Interpretation rules

- **Verified status** is a fact paraphrased from the linked organization’s own page, checked on 2026-07-14.
- **Implication** is analysis about why the channel may matter; it is not the organization’s stated position unless expressly attributed.
- **Owner, action, priority, and next review** are hypothetical internal recommendations. They do not imply an external commitment.
- A public comment period shown as closed must not be treated as an invitation to submit late material.

## Operating tracker

| ID | Channel | Initiative | Verified status | Policy / product implication (analysis) | Hypothetical owner | Priority | Recommended next review |
|---|---|---|---|---|---|---|---|
| **GOV-01** | U.S. government standards and research | **NIST AI Agent Standards Initiative** | Launched 2026-02-17. NIST describes three pillars: industry-led standards, community-led protocols, and research into agent security and identity. The initial RFI, concept-paper comment, and listening-session registration windows shown on the initiative page have passed; the initiative remains an active NIST workstream. [Official source](https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative) | Likely reference channel for identity, authorization, interoperability, evaluation, and voluntary technical guidance. Current opportunity is to prepare implementable evidence, not represent that participation occurred. | U.S. AI policy + security standards | **P1** | 2026-07-31 |
| **GOV-02** | Singapore government governance and assurance | **IMDA Model AI Governance Framework for Agentic AI and AI Agents Sandbox insights** | IMDA launched the agentic-AI framework on 2026-01-22 around bounding powers, meaningful human accountability, lifecycle controls, and end-user responsibility. IMDA published government/Google sandbox insights on 2026-05-20. [Framework](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai) · [Sandbox insights](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2026/ai-agents-insights-from-the-singapore-government-and-google-sandbox) | Practical APAC channel for testing whether governance controls work in deployment. Voluntary guidance can inform assurance evidence but should not be described as legal authorization. | APAC policy + product assurance | **P1** | 2026-08-14 |
| **GOV-03** | Applied government cybersecurity project | **NCCoE Software and AI Agent Identity and Authorization** | The concept-paper comment period is closed; the project page reports **Reviewing Comments**. The proposed work applies identity standards and best practices to enterprise software and AI-agent use cases. [Official source](https://www.nccoe.nist.gov/projects/software-and-ai-agent-identity-and-authorization) | A useful channel for reference architectures and practical implementation evidence. Monitor whether the next output is a project description, demonstration, or other NCCoE guidance. | Identity architecture + standards policy | **P1** | 2026-08-14 |
| **STD-01** | International standards body | **ISO/IEC JTC 1/SC 42 AI governance and impact standards** | ISO/IEC 42001:2023 and ISO/IEC 42005:2025 are published international standards for AI management systems and AI system impact assessment. ISO lists ISO/IEC AWI 42003, implementation guidance for ISO/IEC 42001, as under development at stage 20.00. [ISO/IEC 42001](https://www.iso.org/standard/42001) · [ISO/IEC 42005](https://www.iso.org/standard/42005) · [ISO/IEC AWI 42003](https://www.iso.org/standard/91021.html) | These standards can structure organization-level governance and system-level impact work, but they are not by themselves an agent identity, tool-security, or legal-compliance profile. Map rather than claim equivalence. | International standards + enterprise assurance | **P2** | 2026-08-14 |
| **CON-01** | Industry-led open-source security consortium | **Coalition for Secure AI (CoSAI), an OASIS Open Project** | CoSAI reports active workstreams including secure design patterns for agentic systems. Its public 2026 materials include papers on Model Context Protocol security and agentic identity and access control. [CoSAI](https://www.coalitionforsecureai.org/) · [MCP security paper](https://www.coalitionforsecureai.org/wp-content/uploads/2026/03/model-context-protocol-security-1.pdf) · [Agentic identity paper](https://www.coalitionforsecureai.org/wp-content/uploads/2026/04/agentic-identity-and-access-control.pdf) | Fast-moving practitioner evidence can reveal implementable controls and protocol risks before formal standards stabilize. Treat consortium outputs as technical input, not regulator endorsement. | Security research + agent platform | **P1** | 2026-07-31 |
| **TRADE-01** | Global technology trade association | **Information Technology Industry Council AI policy program** | ITI maintains an AI policy program with public materials on accountability, transparency, foundation models, procurement, and global recommendations; its official page also lists current 2026 policy activity. [Official source](https://www.itic.org/policy/artificial-intelligence) | Signals where technology companies may seek alignment or identify implementation burdens. Compare trade-association positions with regulator, standards, and civil-society views rather than treating them as consensus. | Global public affairs + business policy | **P2** | 2026-07-31 |
| **FOUND-01** | Industry foundation and assurance ecosystem | **AI Verify Foundation Testing Framework** | The Foundation says the framework assesses responsible AI implementation against 11 governance principles. It was updated on 2025-05-29 for traditional and generative-AI use cases and offers process checks, reports, and crosswalks to NIST, G7, OECD, and ISO materials. [Official source](https://aiverifyfoundation.sg/what-is-ai-verify/) | Provides a practical evidence and crosswalk layer. Agent-specific powers, tools, trajectories, and delegation may need extensions beyond a general GenAI process-check framework. | AI assurance + compliance engineering | **P2** | 2026-08-14 |
| **CIV-01** | Civil-society governance and rights channel | **Center for Democracy & Technology AI Governance Lab** | CDT describes an active lab that develops technically informed AI-governance solutions, engages companies and multistakeholder initiatives, supports public-interest advocates, and advises policymakers. Its page maintains a searchable policy tracker and current 2026 publications. [Official source](https://cdt.org/cdt-ai-governance-lab/) | Essential counterweight on rights, affected communities, auditing, accountability, and meaningful redress. Use public materials to test whether a proposed standard protects people as well as systems. | Civil-society engagement + trust policy | **P1** | 2026-08-14 |

## Channel-by-channel action notes

### GOV-01 — NIST AI Agent Standards Initiative

- **■ Fact:** NIST identifies agent standards, open protocols, security, identity, authorization, and evaluations as initiative areas.
- **▲ Implication:** A future guideline or convening could influence procurement expectations and the vocabulary used by other standards bodies.
- **● Recommended action:** maintain a non-confidential evidence pack covering scoped authority, prompt-injection controls, approval boundaries, event semantics, revocation, and rollback tests. Do not submit or contact without explicit authorization and an open channel.
- **Escalate when:** NIST publishes a new RFI, draft guideline, gap analysis, test method, or formal convening relevant to agent security or interoperability.

### GOV-02 — IMDA agentic-AI framework and sandbox

- **■ Fact:** the framework and sandbox materials are public governance and implementation outputs, not entries in the Atlas’s binding-law corpus.
- **▲ Implication:** Singapore offers a useful environment for comparing governance intent with practical control evidence.
- **● Recommended action:** crosswalk the four framework dimensions to identity, authorization, logging, human approval, evaluation, incident response, user disclosure, and redress; identify one low-risk hypothetical test case.
- **Escalate when:** IMDA changes the framework, opens an official participation route, publishes new sandbox evidence, or links the framework to procurement or assurance requirements.

### GOV-03 — NCCoE identity and authorization project

- **■ Fact:** comments are closed and the project is reviewing them.
- **▲ Implication:** the next artifact may define concrete enterprise use cases and implementation boundaries.
- **● Recommended action:** prepare a standards-neutral requirements matrix for principal identity, agent identity, delegated authority, workload identity, credential lifetime, policy decision points, and multi-agent delegation.
- **Escalate when:** a draft project description, reference implementation, participant call, or practice guide appears.

### STD-01 — ISO/IEC governance and impact standards

- **■ Fact:** 42001 and 42005 are published; 42003 is under development.
- **▲ Implication:** enterprise customers may use these standards to organize governance or assurance requests even where no agent-specific profile exists.
- **● Recommended action:** map existing Atlas evidence fields to management-system and impact-assessment needs, recording gaps rather than claiming certification or compliance.
- **Escalate when:** ISO changes a project stage, publishes implementation guidance, or begins agent-specific work that affects identity, autonomy, evaluation, or lifecycle evidence.

### CON-01 — CoSAI

- **■ Fact:** CoSAI publishes open technical work on AI security, including agentic identity and protocol security.
- **▲ Implication:** its implementation language may move faster than formal regulation and expose practical interoperability risks.
- **● Recommended action:** compare CoSAI threat scenarios and design patterns with internal test coverage; document disagreements and evidence gaps before considering any contribution.
- **Escalate when:** a new version changes recommended identity, protocol, supply-chain, or agent-security controls.

### TRADE-01 — ITI

- **■ Fact:** ITI publishes member-informed policy positions and public comments across major AI-policy topics and regions.
- **▲ Implication:** its materials can indicate possible industry coalition positions, but membership agreement and public-policy consensus should not be assumed.
- **● Recommended action:** track where ITI positions align or conflict with the project’s evidence-based position on interoperability, transparency, accountability, export controls, cloud, and risk proportionality.
- **Escalate when:** ITI files a material AI/agent consultation, changes a global principle, or takes a position affecting cloud, compute, standards, or international market access.

### FOUND-01 — AI Verify Foundation

- **■ Fact:** AI Verify uses process and technical evidence across 11 governance principles and publishes framework crosswalks.
- **▲ Implication:** its reporting format may help make control claims portable, while agent-specific trajectory and delegation evidence may remain a gap.
- **● Recommended action:** run a paper crosswalk only; do not claim an AI Verify assessment was performed. Identify which agent controls lack an equivalent evidence field.
- **Escalate when:** the Foundation publishes an agent-specific testing module, accreditation change, assurance-sandbox result, or updated crosswalk.

### CIV-01 — CDT AI Governance Lab

- **■ Fact:** CDT’s stated work includes best practices, standards and norms, auditing, safety, accountability, and public-interest participation.
- **▲ Implication:** public-interest review can surface harms or accountability gaps that a security- or interoperability-only process misses.
- **● Recommended action:** add contestability, accessibility, marginalized-group impact, privacy, and redress questions to every agent standards or assurance review.
- **Escalate when:** CDT publishes an agent-specific position, comments on a tracked consultation, or identifies a rights risk relevant to a product surface.

## Cross-channel issues to reconcile

| Tension | Question for the policy team | Evidence needed |
|---|---|---|
| Interoperability vs. attack surface | Does a protocol expand connectivity faster than it proves authentication, authorization, isolation, and revocation? | Threat model, conformance tests, versioning and revocation evidence |
| Voluntary guidance vs. legal duty | Is a framework being used as a deployment playbook, evidence source, procurement condition, or incorrectly as legal authorization? | Instrument status, contract terms, applicable law, decision owner |
| Assurance portability vs. false equivalence | Does a crosswalk show comparable outcomes or merely similar labels? | Requirement-level mapping, exclusions, test results, reviewer |
| Innovation vs. affected-person protection | Are faster deployment paths tied to bounded authority and meaningful remedy? | Use-case classification, user testing, appeal/redress evidence |
| Industry alignment vs. public interest | Which positions are shared, contested, or silent across trade, standards, regulator, and civil-society channels? | Position matrix with dated primary sources and unresolved questions |

## Review protocol

At each recommended review date:

1. open the official source and record the access date;
2. capture what changed, its status, and whether it is a draft, consultation, published standard, guidance, or advocacy position;
3. separate the organization’s stated position from internal analysis;
4. identify the affected product, market, control, or public-policy position;
5. assign an owner and an evidence-based escalation condition;
6. preserve the prior tracker entry and explain any correction;
7. record `no change` when appropriate—silence is not evidence of closure.

## Evidence limits

- This tracker covers selected high-relevance channels, not the full AI standards or stakeholder ecosystem.
- Priority is an internal analytical recommendation, not a measure of influence or endorsement.
- No organization listed here has been contacted through this project.
- Dates in the final column are internal review targets, not external deadlines.
- Participation, membership, consultation filing, or standards contribution should be recorded only after it actually occurs and can be evidenced.
