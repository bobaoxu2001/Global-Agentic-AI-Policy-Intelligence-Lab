# AI Policy Atlas: Agentic AI Governance Intelligence
## Complete Product & Research Specification

**Version:** 1.0 · **Date:** 2026-07-10 · **Status:** Approved for build
**Author role:** Independent researcher (portfolio project). This project is not affiliated with, endorsed by, or representative of Tencent or any other company. It does not provide legal advice.

---

## 1. Executive Project Thesis

Generative AI governance was written for systems that *produce content*. Agentic AI systems *take actions*: they read and write data, call tools and APIs, communicate with external parties, make decisions with limited human involvement, and execute real-world tasks. No jurisdiction has a dedicated "agentic AI law" yet — but every major jurisdiction already regulates the *component behaviors* of agents (automated decision-making, data processing, external communications, algorithmic recommendation, content generation, safety-critical actions) through a patchwork of enacted laws, proposed legislation, regulations, executive actions, regulator guidance, voluntary frameworks, and technical standards.

**Thesis:** A global technology company cannot govern agentic AI by tracking "AI laws" as monolithic documents. It must (a) decompose each policy instrument into provisions, (b) decompose each agent into capabilities, (c) map provisions to capabilities to concrete engineering and organizational controls, and (d) score deployment risk transparently so that product, legal, compliance, and engineering teams share one vocabulary and one evidence base.

**AI Policy Atlas** is a structured intelligence product that does exactly this for four initial jurisdictions — the United States, the European Union, Singapore, and China — with:

- a rigorous **policy taxonomy** that never confuses a bill with a law or guidance with a mandate;
- an **agentic capability taxonomy** and a **governance-risk taxonomy** grounded in how agents actually work (tool use, permissions, memory, delegation, oversight, auditability);
- a transparent, formula-based **Agent Deployment Risk Score (ADRS)**;
- a **policy-to-control mapping** methodology that translates legal text into implementable controls;
- strict epistemic discipline: every claim is labeled **verified fact**, **analytical inference**, or **recommendation**, and every fact carries a primary-source citation and a confidence score.

The product demonstrates that policy intelligence is an engineering-grade discipline: structured data, explicit methodology, versioned sources, and human review — not a chatbot summarizing news.

---

## 2. Target Users

| # | User | Role description | What they need from the Atlas |
|---|------|------------------|-------------------------------|
| U1 | Global AI policy analyst | Tracks regulatory developments across jurisdictions; briefs leadership | Accurate, dated, cited instrument records; status changes; cross-jurisdiction comparison |
| U2 | Product manager (AI/agent products) | Ships agent features in multiple markets | Plain-language "what this means for the product," capability-level obligations, launch-gating checklists |
| U3 | Legal counsel (technology/regulatory) | Advises on obligations and exposure | Provision-level citations to primary sources, instrument status, effective dates, scope-of-application analysis clearly separated from opinion |
| U4 | Compliance / risk officer | Runs AI governance program; audit readiness | Control catalog, policy-to-control mappings, risk scores with documented rationale, review trail |
| U5 | Engineering lead (platform/infra) | Implements guardrails, logging, permissions | Concrete technical controls (least-privilege tool scopes, audit logging schemas, HITL gates) mapped to the obligations that motivate them |
| U6 | Executive / business leader | Approves market entry and product bets | One-page briefs, risk tier per scenario per jurisdiction, "what changed this quarter" |

Primary personas for MVP design decisions: **U1, U2, U4**. U3/U5/U6 are served by exports (memo, brief, control mapping tables).

---

## 3. Core User Problems

1. **Instrument-status confusion.** Teams routinely treat proposed bills, draft guidance, and voluntary frameworks as if they were binding law (and vice versa), producing both over-compliance that kills features and under-compliance that creates exposure.
2. **Generative-AI framing gap.** Existing trackers index "AI regulation" at the document level; none decompose obligations against *agentic* capabilities (tool execution, external communication, autonomous multi-step action), so agent teams can't tell which provisions actually bite.
3. **Translation failure across functions.** Legal reads statutes; engineering reads API docs. There is no shared artifact that maps "Article X requires human oversight" to "the approval gate must sit before the tool-execution boundary, and here is the log schema."
4. **Unverifiable secondary summaries.** Most policy intelligence circulates as law-firm alerts and news articles; when a claim matters, no one can trace it to the operative primary text quickly.
5. **Opaque risk judgments.** "This launch is high risk" is asserted without a reproducible method, so risk debates become political rather than analytical.
6. **Multi-jurisdiction deployment planning.** One agent, four markets: teams need a defensible way to see how the same capability profile lands differently across the US, EU, Singapore, and China.

---

## 4. MVP Scope

The MVP is a **static-content, database-backed web application** (read-only for visitors; authoring happens through a reviewed data pipeline) plus **three written deliverables**.

**In scope:**

1. **Four jurisdictions:** United States (federal + Colorado AI Act as the state exemplar), European Union, Singapore, China.
2. **Curated instrument library:** 6–10 policy instruments per jurisdiction (24–40 total), each decomposed to the provision level for provisions relevant to agentic capabilities. Target: 120–200 provision records.
3. **Taxonomies:** policy instrument taxonomy (§8–9), agentic capability taxonomy (§10), governance-risk taxonomy (§11) — all published as reference pages.
4. **Agent Deployment Risk Score (ADRS):** full methodology page + interactive (client-side, deterministic) calculator implementing §12–13.
5. **Three scored hypothetical scenarios** (§14), each assessed across all four jurisdictions.
6. **Policy-to-control mapping:** control catalog (~25–35 controls) and provision→capability→control mappings for the provisions that drive the three scenarios.
7. **Epistemic labeling:** every content block tagged Fact / Inference / Recommendation with visible styling; facts cite primary sources; confidence scores displayed.
8. **Written deliverables:** one two-page policy memo, one one-page executive brief (both following §28–29 outlines, on a topic drawn from the Atlas data), and the three-minute demo script (§30).
9. **Change log page:** dated record of instrument-status updates during the project period.

**Out of scope for MVP** (see §5 for permanent non-goals): user accounts, comments, alerts/notifications, full-text search across primary sources, automated ingestion, more jurisdictions, API access.

**MVP effort envelope:** designed to be completed by one person in 3–4 weeks part-time (research ≈ 50%, data entry ≈ 20%, build ≈ 30%).

---

## 5. Explicit Non-Goals

1. **Not legal advice.** The Atlas describes and analyzes; it never advises a specific entity on legal obligations. Every page carries a persistent disclaimer.
2. **Not affiliated analysis.** No claim to represent Tencent or any company; all business scenarios are hypothetical composites.
3. **Not a chatbot.** No conversational interface, no "ask the Atlas" LLM feature, no AI-generated answers at runtime. Any AI assistance used during research is disclosed in the methodology page and everything published passes human review (§19).
4. **Not comprehensive coverage.** No attempt to track every AI-relevant instrument; curation criteria (§6) are explicit and published.
5. **Not real-time monitoring.** Updates are batch, human-reviewed, and dated; no live feeds or scraping.
6. **Not a compliance certification tool.** ADRS is an analytical communication device, not an attestation of legal compliance.
7. **Not a horizontal AI-policy encyclopedia.** Provisions are included only if they map to at least one agentic capability or governance risk.
8. **No enforcement-action database, no litigation tracking, no lobbying content.**

---

## 6. Research Methodology

**6.1 Unit of analysis.** The primary unit is the **provision** (an article, section, or clause imposing an identifiable obligation, prohibition, right, or definition), not the instrument. Instruments are containers with lifecycle metadata; provisions are what get mapped to capabilities and controls.

**6.2 Curation criteria.** An instrument enters the Atlas if it satisfies ALL of:
- (a) issued by a governmental body, standards body, or intergovernmental organization of one of the four jurisdictions (or applying to them, e.g., ISO/IEC standards adopted in practice);
- (b) contains at least one provision plausibly applicable to a system with ≥1 capability from the capability taxonomy (§10);
- (c) its authoritative text (or an official translation/summary) is publicly accessible for citation.

A provision enters the Atlas if it maps to ≥1 capability (§10) or ≥1 governance risk (§11).

**6.3 Research workflow (per instrument).**
1. **Locate** the authoritative source (§7) and record source metadata (publisher, URL, publication date, version/consolidation date, language).
2. **Classify** the instrument against the policy taxonomy (§8–9): exactly one instrument type, one bindingness level, one lifecycle status, with effective/applicability dates.
3. **Extract** relevant provisions: pin citation (article/section number), verbatim key phrase (≤50 words, quoted), paraphrase (plain language, ≤80 words).
4. **Map** each provision to capabilities (§10), risks (§11), and candidate controls (§15).
5. **Label** every statement as fact/inference/recommendation (§20) and assign confidence (§22).
6. **Review**: second-pass human review per §19 before publication.

**6.4 Language handling.** For Chinese-language instruments, cite the official Chinese text as authoritative; where an official or reputable translation is used for the paraphrase, record the translation source separately and lower the confidence ceiling of any claim resting solely on translation (§22). The same rule applies to any EU language version discrepancy (EN version cited; note that all EU official language versions are equally authentic).

**6.5 Temporal discipline.** Every record carries `as_of_date` (date the research was verified) and `last_verified`. Claims about the future ("will apply from…") must cite the provision establishing the date, and are re-checked in the change-log pass. Instruments known to be amended/rescinded must show superseding relationships (e.g., a rescinded executive order remains in the Atlas with status `rescinded` and a pointer to its successor).

**6.6 Comparative analysis rules.** Cross-jurisdiction comparisons are made only at the capability/risk level ("all four jurisdictions impose labeling obligations on synthetic content, with differing scope: …") and are always typed as **inference**, never fact, because equivalence judgments are interpretive.

**6.7 Disclosure of AI assistance.** If LLM tools are used for drafting or translation during research, the methodology page discloses this and states that no AI-generated statement is published without human verification against the primary source.

---

## 7. Primary-Source Standards

**7.1 Source hierarchy.** Every substantive policy claim must cite a source of Tier 1 or Tier 2. Tier 3 may only *supplement*, never substitute.

| Tier | Definition | Examples |
|------|-----------|----------|
| **1 — Authoritative primary** | The operative legal/official text published by the issuing authority | EUR-Lex (Official Journal) for the EU AI Act; congress.gov for US bills; Federal Register for executive orders and agency rules; Colorado General Assembly for SB 24-205; Singapore Statutes Online / IMDA & PDPC official publications; gov.cn / cac.gov.cn for Chinese measures; NIST publications (nvlpubs.nist.gov); ISO/IEC official catalog entries |
| **2 — Official secondary** | Explanatory material from the issuing authority or an official body | European Commission AI Act Q&As and guidelines; regulator press releases; official FAQ documents; official English translations published by the issuing government |
| **3 — Reputable tertiary** | High-quality analysis used for orientation only | Law-firm client alerts, IAPP, OECD.AI policy database, academic papers, Stanford DigiChina translations (noted as unofficial translations) |

**7.2 Citation completeness.** A citation is valid only if it contains: issuing authority, instrument title (original + English), pin cite (article/section), publication or adoption date, version/consolidation date if applicable, URL, and access date. (Full schema in §18.4.)

**7.3 Quotation rule.** Any load-bearing legal phrase (e.g., "high-risk AI system," "human oversight," terms defining scope) must appear as a verbatim quote of ≤50 words with pin cite; paraphrases must be visually distinct from quotes.

**7.4 Link permanence.** Prefer stable identifiers (CELEX numbers, Public Law numbers, document numbers) alongside URLs. Where available, record an archived URL (e.g., Wayback Machine) as backup.

**7.5 Translation rule.** For non-English Tier 1 sources: cite the original; if quoting in English, mark the quote as translated, name the translation source (official > government-published English > reputable unofficial, in that order), and cap the confidence score per §22.

**7.6 Conflict rule.** If Tier 2/3 sources conflict with the Tier 1 text, the Tier 1 text governs and the conflict is noted in the record's `analyst_notes`.

---

## 8. Policy Taxonomy

Every instrument is classified along **four orthogonal axes**. This structure is the backbone of the database and the UI filters.

**Axis A — Instrument type** (exactly one; definitions in §9):
`enacted_law` · `proposed_legislation` · `regulation` · `executive_action` · `regulator_guidance` · `voluntary_framework` · `technical_standard`

**Axis B — Bindingness** (exactly one):
- `binding` — creates legally enforceable obligations for in-scope parties
- `conditionally_binding` — binding only on specific parties or upon specific triggers (e.g., binding on federal agencies but not private firms; binding once referenced in contract or procurement)
- `non_binding` — voluntary; persuasive or market-expected but not legally enforceable

**Axis C — Lifecycle status** (exactly one, dated):
`proposed` → `adopted_not_yet_applicable` → `in_force_partially_applicable` → `fully_applicable` → (`superseded` | `rescinded` | `expired`); plus `withdrawn` for failed proposals. Every status carries the date it was attained and the source establishing it.

**Amendment is an event, not a status (MJ-4).** An instrument that is amended but remains in force does **not** move to a terminal status: it keeps its live status (`fully_applicable` or `in_force_partially_applicable`) and records the amendment as an entry in `key_dates` (`event: "amended"`, with date and source). This correctly represents laws like the GDPR or Singapore's PDPA, which have been amended yet remain fully applicable. The `amended` value is retained in the enum **only** for the narrow case of an instrument wholly replaced by an amending act that is itself tracked as a separate instrument (use the supersession links); in normal cases prefer the live status + amendment event. The `/instruments` change history surfaces amendment events from `key_dates` alongside `changelog` entries.

**Axis D — Regulatory approach** (one or more tags):
`horizontal_comprehensive` (e.g., EU AI Act) · `sector_specific` · `technology_specific` (e.g., generative AI or deep synthesis measures) · `data_protection_derived` · `content_governance` · `safety_security` · `procurement_internal_government` · `standards_assurance`

**Classification rules:**
1. Type and bindingness are independent: a `regulation` is typically `binding`; a `technical_standard` is `non_binding` unless incorporated by reference (then `conditionally_binding` with the incorporating instrument noted).
2. When one document contains both binding rules and non-binding guidance, classify at the provision level and set the instrument to the highest bindingness present, with a note.
3. Chinese departmental rules (部门规章 / 规范性文件, e.g., CAC measures) are classified as `regulation` + `binding`; TC260 technical documents are `technical_standard`; national standards (GB/T recommended) are `technical_standard` + `non_binding`, (GB mandatory) `binding`.
4. US executive orders are `executive_action` + `conditionally_binding` (binding on the executive branch, not directly on private parties) unless analysis shows otherwise for a specific provision.

---

## 9. Instrument-Type Definitions

Operational definitions used for classification. Each includes a decision test and an example from the initial corpus.

1. **Enacted law** — A statute passed by a legislature and signed/promulgated, currently on the books (whether or not yet applicable). *Test:* Did a legislative body complete its full enactment process? *Examples:* Colorado SB 24-205 (Consumer Protections for Artificial Intelligence); Singapore Personal Data Protection Act 2012.
2. **Proposed legislation** — A bill or legislative proposal formally introduced but not enacted; includes drafts released for comment by bodies with legislative authority. *Test:* Introduced, but the enactment process is incomplete. *Examples:* US federal AI bills pending in Congress; China's scholarly/expert draft AI Law proposals (marked clearly as unofficial where applicable).
3. **Regulation** — Legally binding rules issued by an executive agency or regulator under delegated authority (US agency final rules; EU implementing/delegated acts; Chinese departmental measures such as the CAC's Interim Measures for the Management of Generative AI Services). *Test:* Issued by an authority other than the legislature, yet carrying force of law. *Note:* The EU AI Act is an EU "Regulation" in the EU-law sense but is classified here as **enacted law** (it is primary legislation adopted by Parliament and Council); this classification note appears in the glossary to preempt confusion.
4. **Executive action** — Directives from a head of government/state managing the executive branch (US executive orders and OMB memoranda; comparable administrative directives). *Test:* Issued by executive authority without new legislative delegation; typically binds government bodies, not private parties directly. *Example:* US Executive Order 14179 (Removing Barriers to American Leadership in AI, Jan 2025), which revoked EO 14110 — the Atlas records both, with supersession links.
5. **Regulator guidance** — Non-legislative interpretive or advisory documents from regulators explaining how they read or will enforce existing law. *Test:* Explains or signals application of existing authority; does not itself create new obligations (though ignoring it carries practical risk). *Examples:* European Commission guidelines on the AI Act's prohibited practices; FTC business guidance on AI claims; Singapore PDPC Advisory Guidelines on the use of personal data in AI systems.
6. **Voluntary framework** — Structured governance frameworks that organizations may adopt by choice; adoption may be market-expected or referenced in procurement but is not mandated. *Test:* No legal consequence for non-adoption per se. *Examples:* NIST AI Risk Management Framework 1.0 and its Generative AI Profile (NIST AI 600-1); Singapore Model AI Governance Framework for Generative AI (2024); voluntary AI safety commitments.
7. **Technical standard** — Specifications from recognized standards bodies defining testable requirements, processes, or vocabularies. *Test:* Published by a standards body with a designation (ISO/IEC, IEEE, GB/T, CEN-CENELEC); can become conditionally binding via incorporation (e.g., harmonized standards under the EU AI Act creating presumption of conformity). *Examples:* ISO/IEC 42001 (AI management systems); ISO/IEC 23894 (AI risk management); TC260 AI safety governance framework documents.

**Edge-case rules:** (a) An enacted law not yet applicable stays `enacted_law` with lifecycle `adopted_not_yet_applicable` — status lives on Axis C, not Axis A. (b) A rescinded executive order remains in the corpus for historical mapping with lifecycle `rescinded`. (c) Consultation drafts by regulators are `regulator_guidance` + lifecycle `proposed` (or `regulation` + `proposed` if the final form would be binding).

---

## 10. Agentic AI Capability Taxonomy

Capabilities are the join key between "what the agent does" and "what the law regulates." Each capability has an ID, definition, technical indicators (how an engineer verifies the agent has it), and typical regulatory hooks.

| ID | Capability | Definition | Technical indicators | Typical regulatory hooks |
|----|-----------|------------|----------------------|--------------------------|
| C1 | **Content generation** | Produces text/image/audio/video presented to humans | Generative model in the serving path; output rendered to users | Synthetic-content labeling; content governance; deep synthesis rules |
| C2 | **Data access — internal** | Reads organizational or user data (files, CRM, tickets, telemetry) | Data-store connectors, retrieval pipelines, scoped credentials | Data protection law; purpose limitation; security obligations |
| C3 | **Data access — personal/sensitive** | Processes personal data or special categories (health, minors, biometrics) | PII in prompts/retrieval; user-profile joins | GDPR/PDPA/PIPL; automated decision-making provisions; minors' protections |
| C4 | **Tool invocation — read-only** | Calls tools/APIs that observe but do not change state | Tool registry entries with read scopes | Generally low; security/logging expectations |
| C5 | **Tool invocation — state-changing** | Executes actions that modify systems (write DB, change configs, issue refunds, quarantine hosts) | Write/execute-scoped credentials; effectful API calls | Human oversight requirements; sectoral safety rules; liability exposure |
| C6 | **External communication** | Sends messages to parties outside the operator (emails, chats, posts, tickets to third parties) | Outbound channels; third-party recipients | Consumer protection; disclosure-of-AI rules; platform content rules |
| C7 | **Autonomous multi-step planning** | Decomposes goals and sequences actions without per-step human approval | Planner/orchestrator loop; step budget > 1 without HITL gate | Human-oversight provisions; risk-management obligations |
| C8 | **Consequential decision-making** | Makes or materially influences decisions with legal or similarly significant effects on persons (eligibility, pricing, discipline, access) | Decision output consumed without independent human judgment | GDPR Art. 22-type provisions; Colorado AI Act "consequential decisions"; EU AI Act high-risk categories |
| C9 | **Memory & profiling** | Persists information about users/entities across sessions to shape future behavior | Long-term memory stores keyed to identity | Profiling rules; transparency; retention limits |
| C10 | **Delegation / multi-agent orchestration** | Spawns or tasks other agents; accepts tasks from other agents | Agent-to-agent protocols; sub-agent spawning | Accountability chains; audit-trail expectations; emerging agent-specific guidance |
| C11 | **Self-modification of scope** | Acquires new tools, permissions, or data sources at runtime | Dynamic tool discovery; credential brokering | Security frameworks; change-management controls |
| C12 | **Financial/transactional execution** | Moves money or commits the operator contractually | Payment/commerce API scopes | Financial regulation; consumer protection; contract law exposure |

**Capability-intensity scale (0–4).** Each capability an agent possesses is rated for **intensity** — how much of the system's behavior actually depends on that capability. Intensity is a distinct axis from the ADRS dimension rubrics (§13.3): it describes the *capability profile* (an input to `binding_hit` and to human comprehension), not the A/T/D/E/R dimension scores. Anchors:

- **0 — absent:** the system does not have this capability, or it is hard-disabled by an enforced control (record the disabling control; do not rate a technically-possible-but-blocked capability above 0).
- **1 — constrained / exceptional:** available only under narrow constraints, manual invocation, sandboxing, or exceptional use; not part of normal operation.
- **2 — routine:** routinely used in normal operation, within defined limits.
- **3 — central:** central to the system's core function; the product would not work as designed without it.
- **4 — broad / unconstrained:** broad, unconstrained, autonomous, or operating at scale (e.g., across many users, systems, or without per-use limits).

*Edge cases:* (a) Intensity measures **degree and scope of use**, not the potency of an individual tool — tool potency lives in ADRS dimension **T**. (b) When a rating falls between two anchors, choose the **higher** level and justify in writing (risk-conservative, mirroring the integers-only discipline of §13.6.3). (c) A capability present but gated behind a human-approval step is still ≥1 (typically 2 if used routinely); the mitigation is credited separately (§13.4), not by lowering intensity.

**Usage rules:** an agent's **capability profile** is the set of capabilities it possesses (C-IDs), each rated for intensity 0–4 on the scale above. Provisions are mapped to capabilities via the mapping table (§17). A provision may map to several capabilities; a capability typically maps to many provisions. `binding_hit` (§13.5) is computed deterministically from this profile: a binding, currently-applicable provision (as defined in §13.5) that maps to a capability rated **intensity ≥ 2** triggers `binding_hit = 1`.

---

## 11. Agentic AI Governance-Risk Taxonomy

Risks are the harms/failure modes that policies aim to prevent and controls aim to mitigate. Each risk links capabilities (what makes it possible) to provisions (what regulates it) and controls (what mitigates it).

| ID | Risk | Definition | Primarily driven by | Example failure |
|----|------|-----------|---------------------|-----------------|
| R1 | **Unauthorized action** | Agent executes an action outside its intended mandate | C5, C7, C11 | Support agent issues refunds beyond policy limits |
| R2 | **Privacy violation** | Personal data processed beyond lawful basis, purpose, or retention | C2, C3, C9 | Agent retrieves and exposes another customer's records |
| R3 | **Consequential-decision harm** | Erroneous or biased automated decision significantly affecting a person | C8 | Agent denies a service upgrade based on flawed profiling |
| R4 | **Deceptive interaction** | Humans not informed they are dealing with AI, or synthetic content not labeled | C1, C6 | Outbound emails read as human-authored; unlabeled synthetic media |
| R5 | **Security compromise** | Agent becomes an attack vector (prompt injection → tool abuse; credential exfiltration) | C4, C5, C11 | Injected instructions in a webpage cause the agent to leak secrets |
| R6 | **Oversight failure** | Human control points absent, bypassed, or rubber-stamped | C5, C7, C8 | Approval fatigue leads to automatic "approve all" |
| R7 | **Accountability gap** | Actions cannot be attributed, reconstructed, or explained after the fact | C7, C10 | Multi-agent chain makes attribution of a harmful action impossible |
| R8 | **Cross-border data/regulatory breach** | Data or actions cross jurisdictional lines that trigger transfer or localization rules | C2, C3, C6 | Agent moves personal data to a non-approved jurisdiction while executing a task |
| R9 | **Content-governance breach** | Generated content violates jurisdictional content rules | C1, C6 | Agent-generated public content breaches local content requirements |
| R10 | **Runaway scope / cascade** | Errors compound across autonomous steps or delegated agents before detection | C7, C10, C11 | Remediation agent quarantines healthy production hosts fleet-wide |
| R11 | **Vulnerable-population harm** | Minors or other protected groups exposed to inappropriate agent behavior | C1, C3, C6, C9 | Social agent engages minors with age-inappropriate content or dark-pattern engagement |
| R12 | **Systemic/model-level risk** | Risks attaching to the underlying general-purpose model (capability misuse thresholds, GPAI obligations) | all | Operator inherits obligations because the deployed model is a GPAI model with systemic risk |

Each risk record stores: `risk_id`, name, definition, `capability_ids[]`, `provision_ids[]` (regulating provisions per jurisdiction), `control_ids[]` (mitigations), and 1–2 hypothetical failure narratives (clearly marked hypothetical).

---

## 12. Agent Deployment Risk Score (ADRS) — Overview

**Purpose.** A transparent, reproducible score expressing *how much governance scrutiny an agent deployment warrants in a given jurisdiction*. It is a **communication and prioritization device**, not a legal compliance determination — this caveat is displayed wherever a score appears.

**Design principles:**
1. **Deterministic and auditable.** Same inputs → same score. No ML, no hidden weights. The full formula and every rubric anchor are published.
2. **Capability-driven.** Inputs are the agent's capability profile (§10), not marketing descriptions.
3. **Mitigation-aware but mitigation-capped.** Controls reduce the score, but can never reduce it by more than 40% — inherent risk always shows through.
4. **Jurisdiction-sensitive.** A jurisdiction multiplier reflects how heavily that jurisdiction regulates the relevant capabilities — it changes priority, not the underlying risk.
5. **Honest about subjectivity.** Dimension ratings are analyst judgments against published rubrics; each assessment records the rater, date, and per-dimension justification, and passes human review (§19).

**Output.** A score from 0–100 mapped to four tiers:

Tier ranges are **half-open intervals** on the real-valued score (a score is a real number, not an integer): the upper bound of each tier belongs to the next tier. This removes any ambiguity for non-integer scores (e.g., 49.94 is Moderate; 50.00 is High).

| Tier | Range | Meaning (governance posture) |
|------|-------|------------------------------|
| **Low** | [0, 25) | Standard SDLC controls suffice; log and monitor |
| **Moderate** | [25, 50) | Named risk owner; documented controls; periodic review |
| **High** | [50, 75) | Formal pre-deployment review; HITL gates on effectful actions; legal/compliance sign-off |
| **Critical** | [75, 100] | Executive-level approval; staged rollout with kill-switch; continuous audit; consider redesign to reduce inherent risk |

---

## 13. ADRS — Formula, Dimensions, Weights, Scoring Rules

### 13.1 Formula

```
InherentRisk  = Σ (w_i × d_i × 25)          for i in {A, T, D, E, R};  d_i ∈ {0,1,2,3,4}
                → InherentRisk ∈ [0, 100]

MitigationCredit = min(0.40, Σ m_j)          m_j = credit for each implemented control class (§13.4)

ResidualRisk  = InherentRisk × (1 − MitigationCredit)

ADRS          = min(100, ResidualRisk × J)    J = jurisdiction exposure multiplier ∈ [1.00, 1.30]
```

### 13.2 The five inherent-risk dimensions and weights

| Dim | Name | Weight | What it measures |
|-----|------|--------|------------------|
| **A** | Autonomy | 0.25 | How many consequential steps the agent takes without human approval |
| **T** | Action surface | 0.20 | Breadth and potency of tools/actions the agent can execute |
| **D** | Data sensitivity | 0.20 | Sensitivity of the data the agent can access or emit |
| **E** | External reach | 0.15 | Degree to which the agent's outputs/actions leave the operator's boundary |
| **R** | Irreversibility | 0.20 | Difficulty of undoing the agent's worst plausible in-scope action |

Weights sum to 1.00. **Weight rationale (published on the methodology page):** Autonomy is weighted highest because it conditions every other risk — a fully supervised agent converts most failure modes into human-review events. Action surface, data sensitivity, and irreversibility are equal-weighted as the three principal harm channels. External reach is weighted slightly lower because it is partially captured by T and D, but retained as a separate dimension because disclosure/labeling and consumer-protection obligations attach specifically to boundary-crossing behavior.

### 13.3 Dimension rubrics (anchor at every level; raters must justify in writing)

**A — Autonomy**
- 0: Human initiates and approves every action (tool-suggestion only)
- 1: Human approves each *effectful* action; agent auto-executes read-only steps
- 2: Human approves *batches/plans*; agent executes steps within approved plan
- 3: Agent executes autonomously within hard policy limits; human reviews asynchronously
- 4: Agent executes autonomously, sets own sub-goals, or delegates to other agents (C7+C10)

**T — Action surface**
- 0: No tools (generation only)
- 1: Read-only tools (C4)
- 2: State-changing tools in a sandbox or on low-consequence systems (C5, contained)
- 3: State-changing tools on production systems or customer-facing state (refunds, config changes)
- 4: High-potency tools: financial execution (C12), security controls, fleet-wide operations, or runtime scope acquisition (C11)

**D — Data sensitivity**
- 0: Public or synthetic data only
- 1: Internal non-personal business data (C2)
- 2: Ordinary personal data (C3, identified users)
- 3: Sensitive categories (health, financial, biometric) or minors' data, or large-scale profiling (C9)
- 4: Level 3 at scale, plus cross-border transfer of that data in the operating flow (R8)

**E — External reach**
- 0: Outputs visible only to internal operators
- 1: Outputs to authenticated end users, clearly in-product
- 2: One-to-one outbound communications to external parties (C6: email, support tickets)
- 3: Public-facing content or actions on third-party platforms (C1+C6 public)
- 4: Level 3 plus contractual/financial commitments to external parties (C12)

**R — Irreversibility**
- 0: All actions trivially reversible (draft-only)
- 1: Reversible with routine effort (editable records, soft deletes)
- 2: Reversible with significant effort or cost (mass emails sent, refunds issued)
- 3: Practically irreversible economic/reputational effects (public content spread, contractual commitments)
- 4: Irreversible harm to persons, safety, or critical infrastructure in the plausible worst case

### 13.4 Mitigation credits (each requires evidence; capped at 0.40 total)

| Control class | Credit | Evidence required to claim |
|---------------|--------|---------------------------|
| M1 Human-in-the-loop gate on all effectful actions | 0.10 | Gate is architecturally enforced before the tool-execution boundary, with anti-rubber-stamping design (rate limits on approvals, sampling audits) |
| M2 Least-privilege tool scoping | 0.08 | Per-task credential scoping; deny-by-default tool registry; no standing write credentials |
| M3 Comprehensive action audit log | 0.07 | Immutable log of every tool call: actor, inputs, outputs, timestamps, trace ID (schema §18.5) |
| M4 Hard action limits & kill-switch | 0.06 | Rate/value/blast-radius limits enforced outside the model; documented tested kill-switch |
| M5 Data minimization & redaction layer | 0.05 | PII filtering before model context; retention limits on memory |
| M6 Adversarial-input defenses | 0.04 | Prompt-injection testing program; untrusted-content isolation |
| M7 Independent pre-deployment review | 0.04 | Documented review by a party outside the building team |
| M8 AI-disclosure & content labeling | 0.03 | Users informed of AI interaction; synthetic content labeled per jurisdictional rules |
| M9 Incident response runbook for agent failures | 0.03 | Tested rollback and notification procedure |

Rationale for the 0.40 cap: mitigations reduce likelihood, not the ceiling of inherent harm; a critical-inherent-risk agent should never score below the High/Moderate boundary purely through controls.

### 13.5 Jurisdiction exposure multiplier (J)

J reflects *regulatory intensity applicable to this agent's capability profile in this jurisdiction*, computed as:

```
J = 1.00 + 0.10 × binding_hit + 0.05 × near_term_hit + 0.05 × enforcement_posture + 0.10 × prohibition_adjacent
    (capped at 1.30)
```

- `binding_hit` (0/1): ≥1 **currently-applicable binding provision** (see definition below) maps to a capability the agent has at intensity ≥2
- `near_term_hit` (0/1): ≥1 adopted-but-not-yet-applicable binding provision will apply within 18 months **of the assessment's `assessed_date`** (not the build date), and maps to a capability at intensity ≥1
- `enforcement_posture` (0/1): the jurisdiction's regulator has publicly signaled enforcement priority in the relevant area (must cite the signal; typed as inference)
- `prohibition_adjacent` (0/1): the capability profile is adjacent to a prohibited or licensing-gated practice in that jurisdiction (e.g., EU AI Act Art. 5 practices; China's synthesis-content and algorithm-filing regimes)

**Definition — "currently-applicable binding provision"** (operational, no interpretation required). A provision satisfies this iff **all** hold:
1. **Binding:** the provision's effective bindingness = `binding` — i.e. `provision.bindingness = 'binding'` if set, otherwise the parent instrument's `bindingness = 'binding'` (§8 rule 2, provision-level override per §17);
2. **In force:** the parent instrument's `lifecycle_status ∈ {fully_applicable, in_force_partially_applicable}`;
3. **Reached its applicability date:** `provision.applies_from` is null **or** ≤ the **reference date** — where the reference date is the assessment's `assessed_date` for a scenario assessment, and the site **build date** for the cross-jurisdiction comparison (§16.12).

This same definition governs the `/compare` matrix (§16.12). The compare matrix counts currently-applicable binding provisions **per capability/risk**; because the matrix has no agent, it does **not** apply any capability-intensity threshold (intensity is a property of an agent's profile, not of a provision).

J is recomputed per assessment and each component's justification is recorded with citations. `near_term_hit` is anchored to `assessed_date`; when a `near_term_hit` provision later becomes applicable, or its 18-month window lapses, the assessment must be re-scored (new version, §13.6.5) — this is one of the re-scoring triggers in §19.5.

### 13.6 Scoring rules (procedural)

1. Ratings are assigned per **scenario × jurisdiction**. Dimensions **A, T, and R are strictly jurisdiction-invariant** — for a given scenario they MUST be identical across all four jurisdiction assessments (they describe the system, which does not change by market). **Only D and E may differ across jurisdictions**, and only where the deployment architecture genuinely differs by market (e.g., data localized in one region, public posting disabled in another); any such D/E divergence requires a non-empty jurisdiction-specific justification. J always differs by jurisdiction. This rule is enforced by integrity check 13 (§17).
2. Every rating has a written justification referencing the rubric anchor text.
3. Between-anchor ratings are not allowed (integers only) — forcing anchor choice keeps ratings comparable.
4. Mitigation credits require evidence; "planned" controls earn no credit. (A separate "projected score with planned controls" view is **optional and deferred beyond MVP** — see METHODOLOGY_DECISIONS MD-6; it is not an MVP requirement and has no acceptance criterion.)
5. Assessments are versioned; re-scores create new records, never overwrite (§17, `assessments`).
6. The calculator UI must show the arithmetic live: inherent → residual → final, with each term visible.

### 13.7 Numeric precision and rounding convention (global) **[normative]**

Applies to the ADRS formula module, the calculator, the build-time recompute check, and all acceptance criteria:

1. **All calculations use full floating-point precision.** There is **no intermediate rounding** — inherent, mitigation credit, residual, J, and the final score are chained at full precision.
2. **Displayed values are rounded to one decimal place** (e.g., residual `47.0375` displays as `47.0`; final `56.445` displays as `56.4`), unless a field explicitly states otherwise.
3. **Tier is derived from the full-precision final score** using the half-open intervals of §12, *then* the score is rounded for display. (A score of `49.96` is Moderate even though it displays as `50.0` — the tier badge and the displayed number are computed independently from the same raw value; authors must avoid inputs that land within 0.05 of a boundary, or accept the raw-derived tier.)
4. **Acceptance-criteria examples show display values** (one decimal place). **Automated tests assert full-precision values** with an absolute tolerance of **±0.001**.

Worked reference (Aria, EU): `inherent = 66.25`; `credit = 0.29`; `residual = 66.25 × (1 − 0.29) = 47.0375`; `final = 47.0375 × 1.20 = 56.445` → **displays 47.0 and 56.4**, tier **High**.

---

## 14. Hypothetical Business Scenarios

All three are **fictional composites** for methodology demonstration. Each scenario page shows: narrative, capability profile, ADRS worksheet per jurisdiction, top provisions triggered, and mapped controls.

### 14.1 Scenario S1 — Customer Support Agent ("Aria")

A consumer-app support agent that reads customer account data and ticket history, drafts and *sends* replies, and can execute refunds up to $100 without approval (larger refunds require human sign-off). Deployed in all four jurisdictions; interacts directly with end users, some of whom may be minors.

- **Capability profile (with intensities, §10 scale):** C1=2 (drafts replies, routine), C2=3 (reads account/ticket data, central), C3=3 (personal data incl. possible minors, central), C5=2 (refunds within hard limits, routine), C6=3 (sends replies to customers, central), C7=2 (bounded multi-step, routine), C9=2 (customer memory, routine). All seven are at intensity ≥2, so any binding, currently-applicable provision touching any of these capabilities sets `binding_hit=1` for that jurisdiction.
- **Inherent ratings:** A=3 (autonomous within hard limits), T=3 (production customer-facing state), D=3 (personal data incl. possible minors), E=2 (1:1 outbound), R=2 (refunds/mass replies costly to unwind)
  `Inherent = 25×(0.25×3 + 0.20×3 + 0.20×3 + 0.15×2 + 0.20×2) = 25×2.65 = 66.25`
- **Mitigations claimed:** M2, M3, M4, M5, M8 → credit 0.29 → `Residual = 66.25 × (1 − 0.29) = 47.0375` (displays 47.0)
- **Illustrative J:** EU 1.20 (binding data-protection + AI-disclosure hits, near-term AI Act applicability) → `47.0375 × 1.20 = 56.445` → **displays 56.4 → High**; Singapore 1.10 → `47.0375 × 1.10 = 51.741` → **51.7 → High (borderline)**; US 1.10 (state-level consequential-decision and consumer-protection hooks) → **51.7 → High**; China 1.20 (content labeling + PIPL hits) → **56.4 → High**.
- **Headline governance question:** does refund authority + minors' data demand an HITL gate (M1) to bring the tier down to Moderate?

### 14.2 Scenario S2 — Cloud Security Remediation Agent ("Sentinel")

An internal agent for a cloud provider's security operations: ingests alerts, investigates across telemetry, and autonomously executes containment (isolate VMs, revoke credentials, block IPs) on customer-impacting infrastructure, with human review within 30 minutes after action.

- **Capability profile (with intensities, §10 scale):** C2=3 (ingests telemetry, central), C4=3 (read-only investigation, central), C5=3 (high-potency containment, central), C7=3 (autonomous sequencing, central), C10=2 (delegates to sub-agents, routine), C11=1 (limited runtime scope acquisition, constrained).
- **Inherent ratings:** A=3, T=4 (security controls, fleet-scale), D=1 (telemetry, minimal personal data), E=1 (internal, though customer-visible effects), R=3 (outages from wrong quarantine are costly, mostly recoverable)
  `Inherent = 25×(0.75+0.80+0.20+0.15+0.60) = 62.5`
- **Mitigations claimed:** M2, M3, M4, M6, M7, M9 → 0.32 → `Residual = 62.5 × (1 − 0.32) = 42.5`
- **Illustrative J:** lower everywhere (few binding provisions target internal security tooling; sectoral/security frameworks are mostly voluntary): US 1.05, EU 1.10 (NIS2-adjacent + AI Act risk-management inference), SG 1.05, CN 1.10 → **ADRS ≈ 44.6–46.8 → Moderate (upper)**.
- **Headline governance question:** post-hoc review at fleet scale — is 30-minute-after review "meaningful human oversight," and what blast-radius caps (M4) make it defensible? Demonstrates that low *legal* intensity does not mean low *operational* risk.

### 14.3 Scenario S3 — Gaming/Social Content Agent ("Mira")

An in-game companion NPC/social agent for a global game: generates dialogue and images, remembers player relationships across sessions, posts highlights to the game's public community feed, and nudges re-engagement. Player base includes minors; live in all four jurisdictions.

- **Capability profile (with intensities, §10 scale):** C1=4 (heavy generation, broad/at scale), C3=3 (minors' data, central), C6=3 (public posts, central), C9=3 (deep cross-session profiling, central).
- **Inherent ratings:** A=2 (content auto-published within moderation plan), T=1 (read-only tools + posting), D=3 (minors + profiling), E=3 (public content), R=3 (public synthetic content spreads; minors' exposure not undoable)
  `Inherent = 25×(0.50+0.20+0.60+0.45+0.60) = 58.75`
- **Mitigations claimed:** M3, M5, M8 + age-gating (counted under M5 evidence) → 0.15 → `Residual = 58.75 × (1 − 0.15) = 49.9375` (displays 49.9)
- **Illustrative J:** China 1.30 (binding synthetic-content labeling, algorithm and synthesis filing regimes, minors' protections — prohibition-adjacent) → `49.9375 × 1.30 = 64.919` → **64.9 → High**; EU 1.25 (AI-disclosure, minors, DSA-adjacent) → `49.9375 × 1.25 = 62.422` → **62.4 → High**; US 1.10 → `54.931` → **54.9 → High**; SG 1.10 → **54.9 → High**.
- **Headline governance question:** the same agent lands hardest in China and the EU for *different* reasons (content-governance regime vs. transparency/minors) — the flagship cross-jurisdiction comparison of the demo.

*All J values above are illustrative pending the research pass; final published values must be justified per §13.5 with citations.*

---

## 15. Policy-to-Control Mapping Methodology

**15.1 Chain of reasoning.** Every mapping follows the typed chain:

```
Provision (FACT, cited) → applies to Capability C_x because … (INFERENCE, confidence-scored)
→ mitigated/implemented by Control K_y (RECOMMENDATION)
```

No link may skip a step. The UI renders the chain with the three epistemic labels visible.

**15.2 Control catalog structure.** Each control record: `control_id`, name, category (`technical` | `process` | `organizational` | `documentation`), description, implementation notes (engineer-readable), verification method (how an auditor checks it), mapped ADRS mitigation class (M1–M9, if any), and `provision_ids[]` it responds to.

**15.3 Catalog seed (~30 controls, examples):**
- *Technical:* per-task credential minting; tool allow-list registry with deny-by-default; approval gate at tool-execution boundary; immutable action log (schema §18.5); blast-radius limiter (max hosts/actions/value per window); PII redaction in context assembly; untrusted-content sandboxing; agent identity & session attribution; synthetic-content watermark/label injection; memory TTL and purge API.
- *Process:* pre-deployment risk assessment (this ADRS); adversarial testing program; approval-quality sampling audits; incident response runbook & drills; change management for tool grants; periodic re-scoring triggers.
- *Organizational:* named accountable owner per agent; cross-functional review board; escalation matrix; training for approvers.
- *Documentation:* capability profile doc; data-flow map incl. cross-border flows; model/provider documentation retention; user-facing AI disclosure text; DPIA-style assessment where data protection law indicates one.

**15.4 Mapping quality rules.**
1. A provision→capability mapping states *why* the provision reaches that capability (scope analysis), typed as inference with confidence.
2. A capability→control mapping states what the control accomplishes relative to the obligation ("satisfies," "partially addresses," "supports evidence of compliance") — never "makes you compliant."
3. Strength field on every mapping: `direct` (provision explicitly requires something like this control) | `derived` (control is a reasonable implementation of a general obligation) | `prudential` (no legal driver; good practice).
4. Conflicts across jurisdictions (e.g., data-localization vs. centralized logging) are first-class records: `mapping_conflicts` notes with both provisions cited and options analysis (typed recommendation).

---

## 16. Page-by-Page Information Architecture

Global elements on every page: header (product name, nav), persistent disclaimer bar ("Independent research project. Hypothetical scenarios. Not legal advice. Not affiliated with any company."), epistemic-label legend (Fact ■ / Inference ▲ / Recommendation ●), footer (methodology link, change log, contact, `as_of` date).

1. **`/` Home** — thesis in three sentences; four jurisdiction cards (instrument counts, latest status change); three scenario cards with ADRS tier badges; "How to read this site" (epistemic labels explained); links to memo/brief PDFs.
2. **`/methodology`** — full §6, §7, §13, §15, §19–22 content rendered; AI-assistance disclosure; downloadable methodology PDF.
3. **`/taxonomy/policy`** — Axis A–D reference with definitions (§8–9), decision tests, and edge cases.
4. **`/taxonomy/capabilities`** — C1–C12 table (§10) with indicator details.
5. **`/taxonomy/risks`** — R1–R12 (§11) with capability/provision/control cross-links.
6. **`/jurisdictions/{us|eu|sg|cn}`** — jurisdiction overview: regulatory-approach summary (labeled inference), instrument list filterable by Axis A–D, timeline of lifecycle events, "agentic relevance highlights."
7. **`/instruments/{slug}`** — instrument detail: classification chips (type/bindingness/status with dates), authoritative-source citation block, provision table (pin cite, quote, paraphrase, capability tags, risk tags, confidence), supersession links, analyst notes, change history.
8. **`/provisions/{id}`** — provision detail: verbatim quote, paraphrase, full citation, mappings rendered as the §15.1 chain with labels.
9. **`/risk-score`** — ADRS methodology + interactive calculator: pick anchors per dimension (anchor text shown, not just numbers), toggle mitigations (evidence descriptions shown), then set the four **J-component toggles manually** (`binding_hit`, `near_term_hit`, `enforcement_posture`, `prohibition_adjacent`), live arithmetic display, tier output, permalink-encoded state (URL query params), and "this is not a compliance determination" banner.
   **Jurisdiction-and-J interaction (normative).** The calculator does **not** auto-infer J from a jurisdiction, because J depends on the agent's capability profile (§13.5), which the standalone calculator does not collect. Instead: selecting a jurisdiction displays **reference material only** — that jurisdiction's component definitions and example justifications — to help the user decide; the user then sets the four 0/1 J-component toggles themselves. The calculator MUST NOT include a capability-profile questionnaire. When the calculator is opened via a **scenario deep link**, the four J components (and dimensions/mitigations) are **pre-populated from the referenced approved assessment**, and each pre-populated component displays its stored evidence/rationale; the user may then edit any toggle to explore alternatives.
10. **`/scenarios/{aria|sentinel|mira}`** — scenario page per §14: narrative, capability profile chips, per-jurisdiction ADRS worksheets (expandable to show every justification), top-5 provisions table, control mapping table, cross-jurisdiction comparison strip.
11. **`/controls`** — control catalog with filters (category, mitigation class, jurisdictional driver); each control expands to show driving provisions.
12. **`/compare`** — matrix view: rows = capabilities or risks, columns = jurisdictions, cells = **count of currently-applicable binding provisions** (per the §13.5 definition, reference date = build date; **no capability-intensity threshold** applies here — the matrix has no agent) mapped to that row for that jurisdiction, with drill-down; explicitly labeled as analytical inference.
13. **`/changelog`** — dated entries: instrument, old status → new status, source, analyst.
14. **`/glossary`** — key defined terms with jurisdictional variants (e.g., "high-risk," "deployer/provider," "deep synthesis"), each quoting its defining provision.
15. **`/about`** — project purpose, author, scope limits, disclaimer long-form.

**Navigation model:** top nav = Jurisdictions · Scenarios · Risk Score · Taxonomies · Controls · Methodology. Everything is reachable in ≤2 clicks from home. All detail pages are statically renderable (no auth, no server mutation).

---

## 17. Database Schema

Relational (SQLite or Postgres; SQLite acceptable for MVP since the site is read-only). All tables carry `created_at`, `updated_at`. **All content tables** (`instruments`, `provisions`, `controls`, `scenarios`, `assessments`, `mapping_conflicts`, `glossary`, `changelog`, and the three mapping tables) carry `review_status` and `as_of_date`; instruments and provisions additionally carry `last_verified` (see date-field dictionary below).

**`review_status` vs. the review workflow.** `review_status` is a stored **column** with three persisted values — `draft` | `in_review` | `published` (§18/§19.1). The six-*action* review workflow (`created`, `edited`, `submitted_for_review`, `changes_requested`, `approved`, `published`, `re_verified`) lives in the append-only `review_log`, not as column values. Mapping: `submitted_for_review` → column `in_review`; `approved` and `re_verified` are **log actions on a still-`in_review` row**; only the `published` action flips the column to `published`. The public build renders only rows with `review_status='published'` (which, per integrity rule 3, must also have a logged `approved` action).

**Date-field dictionary (do not conflate — MJ-1).**
- `publication_date` / `adopted_date` (instrument) — when the issuing authority published/adopted the instrument.
- `effective_date` / `applies_from` (provision `applies_from`) — when the provision's obligations begin to apply.
- `status_date` (instrument) — when the instrument attained its current `lifecycle_status`.
- `assessed_date` (assessment) — when an ADRS assessment was performed; anchors `near_term_hit` (§13.5).
- `as_of_date` (all content) — the date the record's content was last researched/verified as a whole; drives the page-footer "as of" stamp.
- `last_verified` (instruments, provisions) — the date the record's **status and citations were last re-checked against a primary source** (§6.5, §19.5); distinct from `as_of_date` and used for the staleness marker (>180 days). For MVP a record's `last_verified` may equal its `as_of_date` at creation but diverges after each `re_verified` pass.

```sql
CREATE TABLE jurisdictions (
  id            TEXT PRIMARY KEY,           -- 'us','eu','sg','cn'
  name          TEXT NOT NULL,
  overview_md   TEXT,                       -- labeled-inference summary
  as_of_date    DATE NOT NULL
);

CREATE TABLE instruments (
  id              TEXT PRIMARY KEY,         -- slug, e.g. 'eu-ai-act'
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  title_original  TEXT NOT NULL,
  title_en        TEXT NOT NULL,
  instrument_type TEXT NOT NULL CHECK (instrument_type IN
    ('enacted_law','proposed_legislation','regulation','executive_action',
     'regulator_guidance','voluntary_framework','technical_standard')),
  bindingness     TEXT NOT NULL CHECK (bindingness IN
    ('binding','conditionally_binding','non_binding')),
  lifecycle_status TEXT NOT NULL CHECK (lifecycle_status IN
    ('proposed','adopted_not_yet_applicable','in_force_partially_applicable',
     'fully_applicable','amended','superseded','rescinded','expired','withdrawn')),
  status_date     DATE NOT NULL,            -- date current status attained
  approach_tags   TEXT NOT NULL,            -- JSON array of Axis D tags
  issuing_body    TEXT NOT NULL,
  adopted_date    DATE,
  key_dates       TEXT,                     -- JSON: [{date, event, provision_ref, source_id}]
  supersedes_id   TEXT REFERENCES instruments(id),
  superseded_by_id TEXT REFERENCES instruments(id),
  summary_md      TEXT,                     -- epistemic-labeled markdown
  analyst_notes   TEXT,
  review_status   TEXT NOT NULL DEFAULT 'draft',
  as_of_date      DATE NOT NULL,
  last_verified   DATE NOT NULL             -- status+citations re-checked (MJ-1); staleness if >180d
);

CREATE TABLE sources (
  id              TEXT PRIMARY KEY,
  tier            INTEGER NOT NULL CHECK (tier IN (1,2,3)),
  publisher       TEXT NOT NULL,            -- issuing authority / site
  title           TEXT NOT NULL,
  url             TEXT NOT NULL,
  stable_ref      TEXT,                     -- CELEX no., Public Law no., 文号, etc.
  pub_date        DATE,
  version_date    DATE,                     -- consolidation/version if applicable
  language        TEXT NOT NULL,
  is_translation  BOOLEAN NOT NULL DEFAULT FALSE,
  translation_of  TEXT REFERENCES sources(id),
  archived_url    TEXT,
  accessed_date   DATE NOT NULL
);

CREATE TABLE provisions (
  id              TEXT PRIMARY KEY,         -- 'eu-ai-act:art14'
  instrument_id   TEXT NOT NULL REFERENCES instruments(id),
  pin_cite        TEXT NOT NULL,            -- 'Article 14(1)'
  quote_verbatim  TEXT,                     -- <=50 words AND <=350 chars, original language
  quote_translated TEXT,                    -- if applicable
  translation_source_id TEXT REFERENCES sources(id), -- required iff quote_translated set (OD-4)
  paraphrase_en   TEXT NOT NULL,            -- <=80 words (<=600 chars, §18.2)
  obligation_type TEXT NOT NULL CHECK (obligation_type IN
    ('obligation','prohibition','right','definition','enforcement','scope')),
  bindingness     TEXT CHECK (bindingness IN ('binding','conditionally_binding','non_binding')),
                                            -- NULL = inherit instrument.bindingness (MJ-2); set only to override
  applies_from    DATE,
  source_id       TEXT NOT NULL REFERENCES sources(id),
  confidence      TEXT NOT NULL CHECK (confidence IN ('high','medium','low')),
  confidence_rationale TEXT NOT NULL,
  review_status   TEXT NOT NULL DEFAULT 'draft',
  as_of_date      DATE NOT NULL,
  last_verified   DATE NOT NULL             -- MJ-1; staleness if >180d
);

CREATE TABLE capabilities (                  -- C1..C12, seeded from §10
  id TEXT PRIMARY KEY, name TEXT NOT NULL, definition TEXT NOT NULL,
  indicators TEXT NOT NULL
);

CREATE TABLE risks (                         -- R1..R12, seeded from §11
  id TEXT PRIMARY KEY, name TEXT NOT NULL, definition TEXT NOT NULL,
  failure_narrative_md TEXT
);

CREATE TABLE controls (
  id TEXT PRIMARY KEY,                       -- 'K01'
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN
    ('technical','process','organizational','documentation')),
  description TEXT NOT NULL,
  implementation_notes TEXT NOT NULL,
  verification_method TEXT NOT NULL,
  mitigation_class TEXT,                     -- 'M1'..'M9' or NULL
  review_status   TEXT NOT NULL DEFAULT 'draft',   -- MN-4
  as_of_date      DATE NOT NULL
);

CREATE TABLE provision_capability_map (
  provision_id  TEXT NOT NULL REFERENCES provisions(id),
  capability_id TEXT NOT NULL REFERENCES capabilities(id),
  rationale     TEXT NOT NULL,               -- the INFERENCE text
  confidence    TEXT NOT NULL CHECK (confidence IN ('high','medium','low')),
  PRIMARY KEY (provision_id, capability_id)
);

CREATE TABLE provision_risk_map (
  provision_id TEXT NOT NULL REFERENCES provisions(id),
  risk_id      TEXT NOT NULL REFERENCES risks(id),
  rationale    TEXT NOT NULL,
  PRIMARY KEY (provision_id, risk_id)
);

CREATE TABLE control_provision_map (
  control_id   TEXT NOT NULL REFERENCES controls(id),
  provision_id TEXT NOT NULL REFERENCES provisions(id),
  strength     TEXT NOT NULL CHECK (strength IN ('direct','derived','prudential')),
  relation     TEXT NOT NULL CHECK (relation IN
    ('satisfies_in_part','supports_evidence','implements_general_duty')),
  rationale    TEXT NOT NULL,                -- the RECOMMENDATION text
  PRIMARY KEY (control_id, provision_id)
);

CREATE TABLE scenarios (
  id TEXT PRIMARY KEY,                       -- 'aria','sentinel','mira'
  name TEXT NOT NULL,
  narrative_md TEXT NOT NULL,                -- marked hypothetical
  capability_profile TEXT NOT NULL           -- JSON: [{capability_id, intensity 0..4, note}]
);

CREATE TABLE assessments (                   -- ADRS worksheets; append-only
  id TEXT PRIMARY KEY,
  scenario_id TEXT NOT NULL REFERENCES scenarios(id),
  jurisdiction_id TEXT NOT NULL REFERENCES jurisdictions(id),
  version INTEGER NOT NULL,
  dims TEXT NOT NULL,          -- JSON: {A:{score,justification},T:{...},D:{...},E:{...},R:{...}}
  mitigations TEXT NOT NULL,   -- JSON: [{class:'M2', evidence, credit}]
  j_components TEXT NOT NULL,  -- JSON: {binding_hit:{value,provision_ids,note}, ...}
  inherent REAL NOT NULL, residual REAL NOT NULL, final REAL NOT NULL,
  tier TEXT NOT NULL CHECK (tier IN ('low','moderate','high','critical')),
  assessed_by TEXT NOT NULL, assessed_date DATE NOT NULL,
  review_status TEXT NOT NULL DEFAULT 'draft',
  UNIQUE (scenario_id, jurisdiction_id, version)
);

CREATE TABLE mapping_conflicts (
  id TEXT PRIMARY KEY,
  provision_id_a TEXT NOT NULL REFERENCES provisions(id),
  provision_id_b TEXT NOT NULL REFERENCES provisions(id),
  description TEXT NOT NULL,
  options_analysis_md TEXT NOT NULL,         -- typed recommendation
  review_status   TEXT NOT NULL DEFAULT 'draft',   -- MN-4
  as_of_date      DATE NOT NULL
);

CREATE TABLE review_log (
  id INTEGER PRIMARY KEY,
  entity_type TEXT NOT NULL,                 -- 'instrument','provision','assessment',...
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN
    ('created','edited','submitted_for_review','changes_requested','approved','published','re_verified')),
  actor TEXT NOT NULL, note TEXT, at TIMESTAMP NOT NULL
);

CREATE TABLE changelog (
  id INTEGER PRIMARY KEY,
  entry_date DATE NOT NULL,
  instrument_id TEXT REFERENCES instruments(id),
  old_status TEXT, new_status TEXT,
  description TEXT NOT NULL,
  source_id TEXT REFERENCES sources(id),
  analyst TEXT NOT NULL,                      -- MN-2: shown on /changelog
  review_status TEXT NOT NULL DEFAULT 'draft',
  as_of_date DATE NOT NULL
);

CREATE TABLE glossary (
  term TEXT NOT NULL,
  jurisdiction_id TEXT NOT NULL,             -- 'us'|'eu'|'sg'|'cn' OR the sentinel 'atlas' for house definitions (MN-3)
  scope TEXT NOT NULL DEFAULT 'jurisdiction' CHECK (scope IN ('jurisdiction','atlas')),
  definition_quote TEXT,                     -- required when scope='jurisdiction'; NULL allowed for 'atlas'
  definition_md TEXT,                        -- house definition body for scope='atlas'
  provision_id TEXT REFERENCES provisions(id),  -- required when scope='jurisdiction'; NULL for 'atlas'
  review_status TEXT NOT NULL DEFAULT 'draft',
  as_of_date DATE NOT NULL,
  PRIMARY KEY (term, jurisdiction_id)
);
-- Atlas-level ("house") terms — e.g. "agent / agentic system (working definition used by this Atlas)" —
-- use jurisdiction_id='atlas', scope='atlas', a definition_md body, and no defining provision.
-- These are the ONLY glossary rows exempt from the "definition must quote a defining provision" rule.
```

**Integrity rules enforced in the publish pipeline (not only in SQL):** a provision cannot be `published` without a Tier 1/2 `source_id`, a confidence rationale, and ≥1 capability or risk mapping; an assessment cannot be `published` unless all five dimension justifications are non-empty and each claimed mitigation has evidence text; every `published` entity must have an `approved` review_log entry by a reviewer different from the creator (single-author projects satisfy this via the two-pass self-review protocol in §19.4, explicitly logged — the two passes are the "creator" and "reviewer" roles, recorded as distinct dated log actions).

**Integrity rule 13 — cross-jurisdiction dimension invariance (MJ-11).** For any scenario, across its published assessments for the four jurisdictions: the **A, T, and R** dimension scores MUST be identical; **D and E** may differ only if the differing assessment carries a non-empty jurisdiction-specific justification explaining the deployment-architecture difference. A build that finds a scenario with divergent A/T/R, or with an unjustified D/E divergence, fails. (The complete, engineer-facing enumeration of publish-pipeline integrity checks lives in `docs/PRD.md` §24, which this rule extends.)

**Provision-level bindingness resolution.** Wherever "binding" is tested (esp. `binding_hit`, §13.5, and the `/compare` count), a provision's effective bindingness is `provisions.bindingness` if non-null, else the parent `instruments.bindingness` (MJ-2). `translation_source_id` is required whenever `quote_translated` is present (OD-4). `quote_verbatim` must satisfy **both** ≤50 words **and** ≤350 characters (§18.2).

---

## 18. Required Structured JSON Schemas

All content is authored as JSON/Markdown files validated against these schemas (JSON Schema draft 2020-12) in CI before DB load. Field names match §17.

**18.1 `instrument.schema.json` (abridged; all fields from §17 `instruments` required unless noted)**
```json
{
  "$id": "atlas/instrument",
  "type": "object",
  "required": ["id","jurisdiction_id","title_original","title_en","instrument_type",
               "bindingness","lifecycle_status","status_date","issuing_body",
               "approach_tags","summary_md","as_of_date","sources"],
  "properties": {
    "instrument_type": {"enum": ["enacted_law","proposed_legislation","regulation",
      "executive_action","regulator_guidance","voluntary_framework","technical_standard"]},
    "bindingness": {"enum": ["binding","conditionally_binding","non_binding"]},
    "lifecycle_status": {"enum": ["proposed","adopted_not_yet_applicable",
      "in_force_partially_applicable","fully_applicable","amended","superseded",
      "rescinded","expired","withdrawn"]},
    "approach_tags": {"type": "array", "minItems": 1, "items": {"enum":
      ["horizontal_comprehensive","sector_specific","technology_specific",
       "data_protection_derived","content_governance","safety_security",
       "procurement_internal_government","standards_assurance"]}},
    "key_dates": {"type": "array", "items": {"type": "object",
      "required": ["date","event","source_id"]}},
    "sources": {"type": "array", "minItems": 1, "items": {"$ref": "atlas/citation"}}
  }
}
```

**18.2 `provision.schema.json`** — requires `id`, `instrument_id`, `pin_cite`, `paraphrase_en` (maxLength 600), `obligation_type` (enum §17), `source_id`, `confidence` + `confidence_rationale`, `last_verified` (date), `epistemic_blocks` (see 18.6), and at least one of `capability_map[]` / `risk_map[]`, each item requiring `rationale` and `confidence`. Optional `bindingness` (enum §17; when omitted the provision inherits the instrument's — MJ-2). `quote_verbatim` must satisfy **both** ≤350 characters **and** ≤50 words (enforced by a custom refinement, OD-3); if `quote_translated` present, `translation_source_id` (a `sources` id) is required (OD-4). `pin_cite` accepts the sentinel `"(instrument as a whole)"` for whole-instrument citations (MN-5).

**18.3 `assessment.schema.json`** — requires `scenario_id`, `jurisdiction_id`, `version`, `dims` (object with exactly keys A,T,D,E,R; each `{score: integer 0..4, justification: string minLength 40}`; the D and E entries may additionally carry `divergence_justification` (string), required by integrity rule 13 only when that dimension differs from the scenario's other jurisdictions), `mitigations` (items `{class: enum M1..M9, evidence: string minLength 40}` — credits computed, not authored), `j_components` (four keys `binding_hit`/`near_term_hit`/`enforcement_posture`/`prohibition_adjacent`, each `{value: 0|1, note, provision_ids?}`), `assessed_by`, `assessed_date`. Computed fields (`inherent`,`residual`,`final`,`tier`) are derived at build time and rejected if present in source files (single source of truth = formula code). Cross-file, integrity rule 13 (§17) enforces A/T/R invariance across a scenario's four assessments.

**18.4 `citation.schema.json`**
```json
{
  "$id": "atlas/citation",
  "type": "object",
  "required": ["tier","publisher","title","url","pin_cite","accessed_date"],
  "properties": {
    "tier": {"enum": [1,2,3]},
    "publisher": {"type": "string"},
    "title": {"type": "string"},
    "url": {"type": "string", "format": "uri"},
    "stable_ref": {"type": "string"},
    "pin_cite": {"type": "string"},
    "pub_date": {"type": "string", "format": "date"},
    "version_date": {"type": "string", "format": "date"},
    "language": {"type": "string"},
    "is_translation": {"type": "boolean"},
    "archived_url": {"type": "string", "format": "uri"},
    "accessed_date": {"type": "string", "format": "date"}
  }
}
```

**18.5 `action_log.schema.json`** (published as a *reference artifact* — the audit-log schema the Atlas recommends for agent deployments, used in control K-audit and the demo):
```json
{
  "$id": "atlas/agent-action-log",
  "type": "object",
  "required": ["trace_id","span_id","timestamp","agent_id","agent_version",
               "principal","action_type","tool_name","input_digest","output_digest",
               "authorization","result_status"],
  "properties": {
    "trace_id": {"type": "string"}, "span_id": {"type": "string"},
    "parent_span_id": {"type": "string"},
    "timestamp": {"type": "string", "format": "date-time"},
    "agent_id": {"type": "string"}, "agent_version": {"type": "string"},
    "principal": {"type": "object", "required": ["type","id"],
      "properties": {"type": {"enum": ["user","service","agent"]}, "id": {"type":"string"}}},
    "action_type": {"enum": ["tool_call","message_out","decision","delegation","memory_write"]},
    "tool_name": {"type": "string"},
    "input_digest": {"type": "string"}, "output_digest": {"type": "string"},
    "data_categories": {"type": "array", "items": {"enum":
      ["none","internal","personal","sensitive","minors"]}},
    "authorization": {"type": "object", "required": ["mode"],
      "properties": {"mode": {"enum": ["auto_within_policy","human_approved","human_initiated"]},
                     "approver_id": {"type": "string"}, "policy_id": {"type": "string"}}},
    "reversibility": {"enum": ["reversible","effortful","irreversible"]},
    "result_status": {"enum": ["success","failure","blocked_by_policy","cancelled"]}
  }
}
```

**18.6 `epistemic_block.schema.json`** — every rendered content paragraph is one of:
```json
{
  "$id": "atlas/epistemic-block",
  "type": "object",
  "required": ["kind","text_md"],
  "properties": {
    "kind": {"enum": ["fact","inference","recommendation"]},
    "text_md": {"type": "string"},
    "citations": {"type": "array", "items": {"$ref": "atlas/citation"}},
    "confidence": {"enum": ["high","medium","low"]},
    "based_on": {"type": "array", "items": {"type": "string"},
                 "description": "ids of fact/inference blocks this builds on"}
  },
  "allOf": [
    {"if": {"properties": {"kind": {"const": "fact"}}},
     "then": {"required": ["citations","confidence"]}},
    {"if": {"properties": {"kind": {"const": "inference"}}},
     "then": {"required": ["confidence","based_on"]}},
    {"if": {"properties": {"kind": {"const": "recommendation"}}},
     "then": {"required": ["based_on"]}}
  ]
}
```

---

## 19. Human-Review Workflow

**19.1 States:** `draft → in_review → (changes_requested → in_review)* → approved → published`, plus `published → re_verified` on periodic checks. Transitions append to `review_log`.

**19.2 Roles:** *Author* (researches and drafts), *Reviewer* (verifies against primary sources), *Publisher* (runs the build; checks CI validation passed). In the single-person MVP one human fills all roles under 19.4.

**19.3 Review checklist (blocking; stored with each approval):**
1. Citation resolves; pin cite matches quoted text; access date current.
2. Instrument classification defensible against §9 decision tests.
3. Lifecycle status and dates verified against a Tier 1/2 source dated within 90 days.
4. Every fact block has a citation; every inference names its basis; every recommendation traces to inferences/facts.
5. Quotes ≤50 words and verbatim; translations flagged with source.
6. Confidence scores consistent with §22 rules (esp. translation cap).
7. No sentence advises a specific entity ("you must…" → rewrite as "operators of X-type systems face…").
8. Assessment arithmetic reproduced by the build (never hand-computed).

**19.4 Two-pass self-review protocol (single-author mode):** Pass 1 (authoring) and Pass 2 (review) must occur on different days; Pass 2 works only from the checklist against primary sources, not memory; both passes logged with distinct `review_log` actions. The methodology page discloses this protocol honestly.

**19.5 Re-verification cadence and re-scoring triggers:** any instrument with lifecycle status other than `fully_applicable`/`rescinded` is re-checked every 30 days during the project period; the check is logged (`re_verified`), updates `last_verified`, and status changes create changelog entries. **ADRS re-scoring triggers:** an assessment must be re-scored (new version, §13.6.5) when any of the following occurs relative to its `assessed_date` — (a) a provision that set its `near_term_hit=1` becomes applicable, or that provision's 18-month window lapses (§13.5); (b) an instrument feeding any J component changes lifecycle status; (c) the underlying scenario's capability profile changes.

**19.6 AI-assistance boundary:** LLMs may propose drafts, translations, or mappings, but nothing moves past `in_review` without a human confirming the source text; AI-proposed text is marked in `analyst_notes` until human-verified.

---

## 20. Epistemic Rules: Fact vs. Inference vs. Recommendation

**20.0 Scope of epistemic typing (MJ-5).** Fact/Inference/Recommendation typing applies to **policy-analytical content**: instrument and jurisdiction summaries, provision records, provision→capability→control mappings, scenario ADRS assessments and their justifications, the compare matrix, and the memo/brief deliverables. It does **not** apply to, and these must never mimic epistemic-block styling: site navigation and chrome, page titles and section headers, UI labels and control captions, methodology exposition (which *explains* the system rather than making cited claims), instructional/help copy, and the About page's project description. Page-level epistemic counts (§20.2) count only in-scope analytical blocks.

**20.1 Definitions and tests.**
- **Verified fact ■** — A statement whose truth is directly checkable against a Tier 1/2 source: what a text says, who issued it, when, its status. *Test:* Could a skeptic verify this in ≤5 minutes with the citation alone? **Analyst-authored fact text** never contains the words "likely," "should," "effectively," or "in practice" — this wording lint (§20.5) applies to the analyst's prose only.
- **Analytical inference ▲** — An interpretive judgment built from facts: scope analyses ("this provision likely reaches customer-support agents because…"), cross-jurisdiction comparisons, enforcement-posture readings, all J-multiplier components except `binding_hit` date math. *Test:* Reasonable experts could disagree. Every inference lists its supporting fact blocks (`based_on`) and a confidence score.
- **Recommendation ●** — A statement of what an operator *could/should do*: all control mappings' "relation" text, governance postures per ADRS tier, memo recommendations. *Test:* Contains a course of action. Recommendations must chain to at least one inference or fact, are always generic to a system class (never advice to a named entity), and carry no confidence score (they are choices, not probability claims).

**20.2 Rendering rules.** Each block visually tagged (color + icon + hover legend); mixed paragraphs are prohibited — split them. Page-level summaries state counts ("This page: 12 facts, 5 inferences, 3 recommendations").

**20.3 Escalation rule.** If review cannot decide fact vs. inference, it is an inference. If a "fact" depends on translation nuance, it is a fact with capped confidence (§22) or downgraded to inference.

**20.4 Corrections.** A published fact found wrong is corrected with a visible correction note and changelog entry — never silently edited.

**20.5 Wording-lint scope (MJ-6).** The banned-word check on fact blocks ("likely/should/effectively/in practice") is a validation lint that runs **only over analyst-authored fields** — `paraphrase_en`, mapping `rationale`, dimension `justification`, summary prose, and epistemic-block `text_md`. It **exempts verbatim and translated quotations** (`quote_verbatim`, `quote_translated`) entirely, because primary legal texts legitimately contain those words (statutes say "should"). The lint never inspects quote fields.

---

## 21. Source Citation Requirements

1. Every **fact** block: ≥1 Tier 1 or Tier 2 citation (schema §18.4) with pin cite. Tier 2 alone allowed only for facts *about* the Tier 2 document itself or where it is the authoritative statement (e.g., a regulator's own FAQ).
2. Every **status/date claim** (in force, applies from, rescinded): Tier 1 citation to the provision or official notice establishing it.
3. Every **quote**: verbatim, ≤50 words **and** ≤350 characters, pin cite, language noted, translation flagged (with `translation_source_id`).
4. Every **inference**: `based_on` links to cited facts (no direct citation requirement, but the chain must ground out in citations).
5. Tier 3 sources: may appear only in `analyst_notes` and "further reading"; never as the citation for a fact.
6. **Link integrity (MJ-7).** Every Tier 1 source MUST record an `archived_url` (e.g., a web-archive snapshot) wherever legally and technically possible — a stable identifier (CELEX, Public Law no., 文号) does **not** substitute, because such identifiers are not always resolvable URLs. Link checking is a **warning-tier** CI job, not a hard build-blocker: it retries with backoff, honors an allowlist of hosts known to rate-limit or bot-block CI runners (e.g., cac.gov.cn, EUR-Lex), and records a manual `last_verified` date per source. A transient 403/429/timeout on an allowlisted host produces a warning, not a failed build; a Tier 1 source with **neither** a resolving `url` **nor** an `archived_url` **nor** a logged manual verification does fail the build.
7. **Whole-instrument citations (MN-5).** When a citation refers to an instrument as a whole (the instrument-page source block) rather than a specific article, use the pin-cite convention `pin_cite: "(instrument as a whole)"`. Validators accept this sentinel in lieu of an article/section reference.
8. Citation display format (UI): Publisher — *Title*, pin cite (date). [link] [archive] · accessed date · Tier badge.
9. The bibliography page auto-generates from the `sources` table; orphaned sources (cited by nothing) fail CI.

---

## 22. Confidence-Scoring Methodology

Three ordinal levels (deliberately not fake-precise percentages), assigned by rule:

| Level | Criteria (all must hold) |
|-------|--------------------------|
| **High** | Tier 1 source in a language the reviewer reads or with an official translation; text unambiguous on the point; status verified ≤90 days ago; no pending amendment known to affect it |
| **Medium** | Tier 1/2 source but one weakness: interpretation involves scope judgment; relies on reputable-unofficial translation; status verified 90–180 days ago; known pending amendment could affect it |
| **Low** | Meaningful uncertainty: conflicting official statements; draft-stage instrument whose text may change; translation-only access with known ambiguity; verification >180 days old |

**Hard caps:** claims resting solely on unofficial translations cap at **Medium**. Claims about instruments in `proposed` status cap at **Medium** (their *existence and content as drafts* can be High; predictions about enactment are always inferences, cap **Low**). Enforcement-posture inferences cap at **Medium**.

**Propagation:** an inference's confidence ≤ the minimum confidence of the facts it is `based_on`, and may be lower. The build computes and enforces this ceiling.

**Display:** confidence chips on every fact/inference; the methodology page publishes this table verbatim.

---

## 23. Functional Requirements

| ID | Requirement |
|----|-------------|
| FR-1 | Render all 15 page types in §16 from the database/content files; no runtime authoring UI |
| FR-2 | Filter instrument lists by all four taxonomy axes plus jurisdiction; filters combine (AND) and are URL-addressable |
| FR-3 | Every fact/inference/recommendation block renders its epistemic tag, confidence chip (where applicable), and citation popover |
| FR-4 | Instrument pages show classification chips, dated lifecycle timeline, supersession links, and change history |
| FR-5 | ADRS calculator implements §13 exactly: anchor-text selection per dimension, evidence-gated mitigation toggles, per-jurisdiction J with component display, live arithmetic, tier badge, shareable URL state; pure client-side, deterministic |
| FR-6 | Scenario pages render stored assessments (from `assessments`), expandable to every justification; a "recompute" check verifies stored numbers match the formula at build time |
| FR-7 | Cross-jurisdiction compare matrix (§16.12) with drill-down to provisions |
| FR-8 | Control catalog filterable by category/mitigation class/jurisdiction; renders the full §15.1 chain on each mapping |
| FR-9 | Changelog page lists dated status changes with sources |
| FR-10 | Bibliography auto-generated; every citation links out and shows tier + accessed date |
| FR-11 | Downloadables: methodology PDF, memo PDF, executive-brief PDF, control-mapping CSV, and the full content dataset as JSON |
| FR-12 | Persistent disclaimer bar on every page; scenario pages additionally show a "hypothetical scenario" banner |
| FR-13 | Content pipeline: JSON/Markdown source files → schema validation → integrity checks (§17) → static build; CI fails on any violation |
| FR-14 | Glossary terms auto-link on first occurrence per page |

## 24. Non-Functional Requirements

| ID | Requirement |
|----|-------------|
| NFR-1 | **Static deployment:** the public site is fully static (SSG); no server-side mutation; hostable on GitHub Pages/Netlify/Vercel |
| NFR-2 | **Performance:** Lighthouse ≥90 performance/accessibility/best-practices/SEO on home, one instrument page, one scenario page |
| NFR-3 | **Accessibility:** WCAG 2.1 AA; epistemic labels distinguishable without color (icon + text) |
| NFR-4 | **Responsive:** usable at 375px; tables scroll horizontally within their container, never the page |
| NFR-5 | **Reproducibility:** `git clone && install && build` yields the site from source data; formula code has unit tests covering §14's three worked examples |
| NFR-6 | **Versioning:** all content in git; published site shows build date and content version |
| NFR-7 | **No tracking:** no third-party analytics beyond privacy-respecting page counts (optional); no cookies requiring consent banners |
| NFR-8 | **i18n readiness (not implementation):** original-language titles/quotes stored and rendered with correct `lang` attributes; UI itself is English-only in MVP |
| NFR-9 | **Print styles** for memo/brief pages |
| NFR-10 | **Suggested stack** (engineer may substitute equivalents): Astro or Next.js static export; SQLite → build-time JSON; TypeScript; Zod or AJV for schema validation; Playwright smoke tests; content in `/content` as JSON+MD |

## 25. Acceptance Criteria

The MVP is done when ALL of the following pass:

**Content**
- AC-1: ≥6 instruments per jurisdiction (≥24 total) published, each with valid classification on all four axes and ≥1 Tier 1/2 source.
- AC-2: ≥120 published provisions, 100% with pin cite, paraphrase, confidence + rationale, and ≥1 capability or risk mapping.
- AC-3: All three scenarios have published assessments for all four jurisdictions (12 worksheets), every dimension justified, arithmetic verified by the build.
- AC-4: ≥25 controls published; every scenario's top-5 provisions each map to ≥1 control with the full typed chain.
- AC-5: Zero published fact blocks without citations (CI-enforced); zero mixed epistemic paragraphs found in a manual sample of 20 pages.
- AC-6: Changelog has entries for every status change observed during the build period; every instrument re-verified within 30 days of launch.

**Product**
- AC-7: All FR-1…FR-14 demonstrably work; ADRS calculator reproduces the three §14 worked examples exactly.
- AC-8: NFR-2, NFR-3, NFR-5 verified (Lighthouse report, axe scan, clean-clone build).
- AC-9: A cold reader (someone unfamiliar with the project) can, in under 10 minutes and without help: (a) find whether the EU instrument governing AI is in force, (b) explain the difference between a fact and an inference on any page, (c) produce an ADRS score for a hypothetical agent.

**Deliverables**
- AC-10: Two-page memo, one-page brief, and demo script finalized per §28–30; memo and brief downloadable from the site.

## 26. MVP Build Sequence

Four phases; each ends with a reviewable artifact. (Est. total: 3–4 weeks part-time.)

**Phase 0 — Foundations (2–3 days).** Repo + CI skeleton; JSON schemas (§18) coded; formula module with unit tests against §14 examples; taxonomy seed files (C1–C12, R1–R12, M1–M9, instrument enums); page wireframes (low-fi) for the 5 core templates (home, jurisdiction, instrument, scenario, calculator). *Gate:* schemas validate sample records; formula tests green.

**Phase 1 — Research core (7–9 days).** Jurisdiction by jurisdiction (EU → US → China → Singapore, hardest-first): locate sources, classify instruments, extract provisions, map capabilities/risks. Two-pass review per §19.4 throughout. *Gate:* AC-1, AC-2 content thresholds hit in `approved` state.

**Phase 2 — Analysis layer (4–5 days).** Control catalog; provision→control mappings for scenario-relevant provisions; three scenario assessments × four jurisdictions with justifications; compare-matrix data; glossary. *Gate:* AC-3, AC-4.

**Phase 3 — Build & polish (5–6 days).** Implement pages/templates; ADRS calculator UI; filters; bibliography/changelog generation; PDFs (memo, brief, methodology); accessibility and performance passes; cold-reader test (AC-9); final re-verification sweep and launch. *Gate:* AC-5…AC-10.

**Ordering rationale:** formula and schemas first so research is entered into validated structures once (no re-keying); EU first because the AI Act stresses the taxonomy hardest (lifecycle statuses, conditionally-binding standards) and forces early design corrections while they are cheap.

## 27. Key Project Risks

| # | Risk | Likelihood | Impact | Mitigation |
|---|------|-----------|--------|------------|
| P1 | **Regulatory drift during build** — statuses change mid-project (e.g., guidance finalized, dates postponed) | High | Medium | `as_of` dating everywhere; 30-day re-verification; changelog turns drift into demonstrated capability rather than error |
| P2 | **Scope creep in research** — provision extraction is unbounded | High | High | Hard caps (6–10 instruments/jurisdiction; provisions must map to a capability/risk); timebox per instrument (½ day) |
| P3 | **Misclassification embarrassment** — an interviewer/expert spots a wrong status or type | Medium | High | Decision tests in §9; two-pass review; confidence labels make residual uncertainty visible instead of hidden |
| P4 | **Chinese/EU translation errors** | Medium | Medium | Official texts cited as authoritative; translation flags; Medium confidence cap; prefer official/government English versions |
| P5 | **ADRS perceived as pseudo-quantitative** | Medium | Medium | Publish weight rationale + all rubrics; frame as prioritization device; show sensitivity (tier boundaries visible in calculator) |
| P6 | **Single-author review weakness** | High | Medium | Honest disclosure of the two-pass protocol; CI-enforced integrity rules do not depend on reviewer diligence |
| P7 | **Build eats research time** | Medium | High | Static stack, no backend, 5 templates; calculator is the only interactive component; cut FR-7 compare matrix first if needed (it degrades to a table) |
| P8 | **Perceived affiliation/legal-advice risk** | Low | High | Persistent disclaimers; hypothetical-only scenarios; §19.3 checklist item 7 rewrites advisory phrasing |
| P9 | **Dead links at demo time** | Medium | Low | Stable identifiers + archived URLs; link checker in CI |

## 28. Two-Page Policy Memo — Outline

*Topic (from Atlas data): "Human oversight requirements for action-taking AI agents: what four jurisdictions require, and what it means for deployment architecture."* Audience: VP-level policy/product leadership. Format: ≤2 pages, ~900 words.

1. **Header block** — To / From / Date / Re; one-line disclaimer (independent analysis; not legal advice).
2. **Bottom line up front (3–4 sentences)** — the one decision-relevant conclusion, e.g., that binding human-oversight obligations concentrate on consequential decisions and regulated content today, but architecture chosen now determines feasible markets later.
3. **What is actually required today (facts, cited)** — 4 short paragraphs, one per jurisdiction; each states instrument, status, and the operative oversight-relevant provisions with pin cites. Epistemic labels retained in print (■▲●).
4. **What is coming (facts + inferences, dated)** — applicability timelines and pending instruments; explicit confidence labels.
5. **Analysis (inferences)** — where the four regimes converge (oversight of consequential/effectful action; transparency to affected persons) and diverge (content-governance-first vs. risk-tier-first vs. voluntary-framework-first); implications for a single global agent architecture.
6. **Recommendations (3, typed ●)** — e.g., (i) place the approval gate at the tool-execution boundary as the global default; (ii) adopt the action-log schema as a common evidence layer; (iii) set re-assessment triggers on named upcoming applicability dates.
7. **Footer** — sources (compressed citation list), methodology pointer, `as_of` date.

## 29. One-Page Executive Brief — Outline

*Topic: "Should we ship the support agent (S1/Aria) in all four markets?" — hypothetical.* Audience: exec with 90 seconds. ≤1 page, ~350 words + one visual.

1. **Title + one-sentence answer** (recommendation, typed).
2. **The scorecard visual** — 4-column strip: jurisdiction, ADRS tier badge, top binding obligation (one line, cited), gating control required.
3. **Three bullets: what drives the score** (facts/inferences with labels, one line each).
4. **Two bullets: what changes the answer** — the mitigation (e.g., adding the HITL gate M1) that moves tiers; the upcoming date that raises J.
5. **Ask / next step** — one line (approve control investment; re-score on date X).
6. **Footer** — disclaimer + `as_of` + link to full scenario page.

## 30. Three-Minute Interview Demo — Outline

Timed script; every beat names the on-screen page.

- **0:00–0:20 — Frame (Home).** "Agents act — they don't just generate. I built a system that maps what four jurisdictions require of AI systems that access data, call tools, and take actions — with every claim typed as fact, inference, or recommendation, and every fact cited to primary sources."
- **0:20–0:50 — Rigor (Instrument page: EU AI Act).** Show classification chips: type, bindingness, lifecycle status with dates. "This is the discipline most trackers skip: a bill is not a law; guidance is not a mandate. Watch the status timeline and the pin-cited provisions."
- **0:50–1:30 — Translation (Provision → chain view).** Pick a human-oversight provision; walk the typed chain: cited fact → scope inference with confidence → mapped engineering control ("approval gate at the tool-execution boundary, verified by this audit-log schema"). "This is how a policy sentence becomes an engineering requirement."
- **1:30–2:20 — Judgment (Scenario S3 Mira + calculator).** Show the gaming/social agent scoring High in both China and the EU *for different reasons* — content-governance regime vs. transparency/minors provisions; flip one mitigation toggle live to show the deterministic score move and the 40% cap. "The score is transparent arithmetic, not vibes — and it never launders inherent risk away."
- **2:20–2:50 — Trust (Methodology + changelog).** Show epistemic legend, confidence rules, a changelog entry where a status changed mid-project. "Policy moves; the system is built to be corrected in public, not to pretend it was always right."
- **2:50–3:00 — Close.** "This is the capability the role needs: primary-source rigor, agentic-AI technical fluency, and translation into decisions teams can act on. The memo and brief on screen are the writing samples."

**Demo risk hedges:** local build offline copy in case of connectivity; the three pages used are pre-cached; a 90-second cut of the script (beats 1, 3, 4) prepared in case time is short.

---

## Appendix A — Initial Instrument Candidate List (to be verified in Phase 1; listing here is not yet a claim about status)

- **EU:** AI Act (Reg. (EU) 2024/1689); GDPR (Art. 22, profiling/ADM); Commission guidelines on prohibited AI practices; Commission GPAI code of practice; DSA (agent-relevant transparency provisions); harmonized-standards landscape (CEN-CENELEC JTC21); NIS2 (security posture, S2 relevance).
- **US:** EO 14179 and rescinded EO 14110 (supersession pair); OMB AI memoranda for federal agencies; NIST AI RMF 1.0 + Generative AI Profile (AI 600-1); Colorado SB 24-205; FTC guidance on AI representations; selected pending federal bills (typed `proposed_legislation`); state disclosure laws as glossary notes.
- **Singapore:** PDPA 2012 + PDPC Advisory Guidelines on AI; Model AI Governance Framework for Generative AI (2024); AI Verify testing framework; IMDA guidance; MAS FEAT/Veritas (sectoral, as standards-assurance exemplar).
- **China:** Interim Measures for the Management of Generative AI Services (2023); Provisions on Deep Synthesis (2022/2023); Provisions on Algorithmic Recommendation (2022); Measures for Labeling AI-Generated Synthetic Content (2025); PIPL (automated decision-making, minors, cross-border); TC260 AI Safety Governance Framework; minors' online protection regulation (agent-relevant provisions).

Every entry above must pass §6.3 verification before publication; statuses and dates are recorded only from Tier 1/2 sources at research time.

## Appendix B — Glossary Seed Terms
"AI system" (per jurisdiction), "provider / deployer / operator," "high-risk AI system," "general-purpose AI model / systemic risk," "consequential decision," "automated decision-making," "deep synthesis / generative synthetic content," "human oversight," "profiling," "personal information / personal data," "meaningful human review," "agent / agentic system (working definition used by this Atlas)."

---

*End of specification. A designer can implement §16 + NFRs directly; an engineer can implement §13, §17, §18, §23–24 directly; a researcher can execute §6–11, §15, §19–22 directly. Questions that arise during build should be resolved against the decision tests and rules in this document before adding new ones.*


