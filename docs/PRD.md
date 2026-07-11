# AI Policy Atlas — Product Requirements Document (PRD)

**Derived from:** `SPEC.md` v1.0 (single source of truth). **Status:** Implementation-ready. **Date:** 2026-07-10.

> This PRD operationalizes `SPEC.md`. Where this document cites a section (e.g., §13), it refers to `SPEC.md`. Nothing here overrides `SPEC.md`; conflicts are logged in **§30 Ambiguities & Contradictions to Resolve** and in `IMPLEMENTATION_BACKLOG.md → Open Implementation Decisions`. All formulas, IDs, taxonomies, and terminology are preserved verbatim from `SPEC.md`.

---

## 1. Product Overview

AI Policy Atlas is a **static, database-backed, read-only web application** presenting structured intelligence on how four jurisdictions (US, EU, Singapore, China) govern **agentic AI** — AI systems that access data, call tools, communicate externally, decide, and act. It decomposes policy instruments into **provisions**, agents into **capabilities** (C1–C12), and harms into **governance risks** (R1–R12); maps provisions → capabilities → **controls** (K-series); and exposes a transparent, deterministic **Agent Deployment Risk Score (ADRS)** per §13.

Every rendered claim is typed **Fact (■) / Inference (▲) / Recommendation (●)** per §20; every fact is traceable to a **Tier 1/2 primary source** per §7/§21; every fact and inference carries a **confidence** chip per §22. The product is a portfolio artifact: it prioritizes analytical rigor and auditability over interactive AI features. **There is no chatbot, no runtime LLM, no server-side mutation.**

---

## 2. Core User Jobs (Jobs-To-Be-Done)

Derived from §2/§3. Personas prioritized for MVP: **U1 policy analyst, U2 product manager, U4 compliance/risk officer** (U3/U5/U6 served via exports).

| JTBD | As a… | I want to… | So that… | Primary pages |
|------|-------|-----------|----------|---------------|
| J1 | Policy analyst (U1) | Confirm an instrument's *type, bindingness, lifecycle status, and dates* from a cited primary source | I never brief a bill as if it were law | Instrument detail, Jurisdiction, Changelog |
| J2 | Product manager (U2) | See which *provisions bite a given agent capability* | I know what actually gates my feature per market | Provision detail, Scenario, Compare |
| J3 | Compliance officer (U4) | Read a *provision→capability→control* chain with a defensible risk score | I can stand up a governance program with evidence | Controls, Scenario, Risk Score |
| J4 | Any user | Distinguish *verified fact from analytical inference from recommendation* at a glance | I can calibrate trust and challenge the analysis | Every content page |
| J5 | Analyst/PM (U1/U2) | Reproduce an ADRS score by adjusting capability anchors, mitigations, and jurisdiction | I understand the drivers, not just the number | Risk Score calculator |
| J6 | Exec (U6) via export | Get a one-page answer on shipping a hypothetical agent across four markets | I can make a market-entry call in 90 seconds | Executive brief (export) |

---

## 3. MVP Scope

Exactly per §4. **In scope:** four jurisdictions; 24–40 curated instruments (6–10 each) decomposed to 120–200 provisions; three published taxonomies (policy §8–9, capability §10, risk §11); ADRS methodology + deterministic client-side calculator (§12–13); three hypothetical scenarios (Aria/Sentinel/Mira, §14) each assessed across all four jurisdictions (12 worksheets); control catalog (~25–35) with provision→capability→control mappings for scenario-driving provisions; epistemic labeling on every block; three written deliverables (two-page memo §28, one-page brief §29, three-minute demo script §30); changelog page.

**Out of scope for MVP (§4):** user accounts, comments, alerts/notifications, full-text search across primary sources, automated ingestion, additional jurisdictions, public API.

---

## 4. Explicit Non-Goals (§5 — do not implement)

1. Not legal advice — persistent disclaimer on every page; no sentence advises a named entity.
2. Not affiliated — no claim to represent Tencent or any company; all scenarios hypothetical composites.
3. **Not a chatbot** — no conversational UI, no "ask the Atlas," no runtime AI generation.
4. Not comprehensive — curation criteria (§6.2) published, not exhaustive coverage.
5. Not real-time — batch, human-reviewed, dated updates only; no live feeds/scraping.
6. Not a compliance certification tool — ADRS is a prioritization device, shown wherever a score appears.
7. Not a horizontal encyclopedia — a provision exists only if it maps to ≥1 capability or risk.
8. No enforcement-action DB, litigation tracking, or lobbying content.

---

## 5. Sitemap

Top nav (§16): **Jurisdictions · Scenarios · Risk Score · Taxonomies · Controls · Methodology.** Everything reachable in ≤2 clicks from Home. All pages statically pre-rendered.

```
/                              Home
/methodology                   Methodology (renders §6,7,13,15,19–22 + AI-assist disclosure)
/taxonomy/policy               Policy taxonomy (Axes A–D, §8–9)
/taxonomy/capabilities         Capability taxonomy (C1–C12, §10)
/taxonomy/risks                Risk taxonomy (R1–R12, §11)
/jurisdictions                 Jurisdiction index [NEW — see §30 A6]
/jurisdictions/{us|eu|sg|cn}   Jurisdiction detail
/instruments/{slug}            Instrument detail
/provisions/{id}               Provision detail (typed mapping chain)
/scenarios                     Scenario index [NEW — see §30 A6]
/scenarios/{aria|sentinel|mira} Scenario detail (per-jurisdiction ADRS worksheets)
/risk-score                    ADRS methodology + interactive calculator
/controls                      Control catalog
/compare                       Cross-jurisdiction matrix
/changelog                     Dated status-change log
/glossary                      Defined terms + jurisdictional variants
/bibliography                  Auto-generated source list [in FR-10; not in §16 list — see §30 A6]
/about                         Purpose, author, scope limits, long-form disclaimer
```

Static assets: `/downloads/methodology.pdf`, `/downloads/memo.pdf`, `/downloads/executive-brief.pdf`, `/downloads/control-mapping.csv`, `/downloads/atlas-dataset.json` (FR-11).

---

## 6. Detailed User Flows

**UF-1 — Verify an instrument's status (J1).** Home → Jurisdiction card (e.g., EU) → `/jurisdictions/eu` → filter list by type=`enacted_law` → open EU AI Act → read classification chips (type/bindingness/lifecycle + dates) with source citation block → optionally open the establishing source. Success = user can state the status and its dated primary source.

**UF-2 — Trace a provision to an engineering control (J2/J3).** Scenario `/scenarios/aria` → top-5 provisions table → open a human-oversight provision → `/provisions/{id}` → read typed chain: Fact (cited quote) → Inference (scope, confidence) → Recommendation (mapped control K, strength/relation) → click control → `/controls` entry with implementation + verification notes.

**UF-3 — Reproduce a risk score (J5).** Scenario page shows stored ADRS per jurisdiction → "Open in calculator" deep-links to `/risk-score?…` prefilled → user changes a dimension anchor or toggles a mitigation → live arithmetic (inherent → residual → final) updates → tier badge updates → shareable URL updates. Success = user sees which input moved the tier.

**UF-4 — Compare jurisdictions (J2).** `/compare` → choose rows = capabilities (or risks) → read cells = count of applicable binding provisions per jurisdiction (labeled ▲ inference) → drill a cell → filtered provision list.

**UF-5 — Distinguish claim types (J4).** Any content page → epistemic legend in header → each block shows icon+label+color+confidence → page-level counts ("12 facts, 5 inferences, 3 recommendations").

**UF-6 — Consume the exec brief (J6).** Home → download Executive Brief PDF, or `/scenarios/aria` → "Executive brief" section mirrors §29 with scorecard strip.

---

## 7. Page-by-Page Functional Requirements

Global (every page, §16): header with product name + top nav; persistent disclaimer bar ("Independent research project. Hypothetical scenarios. Not legal advice. Not affiliated with any company."); epistemic-label legend (■▲●); footer with methodology link, changelog link, contact, and page `as_of` date; build date + content version (NFR-6).

### 7.1 `/` Home (§16.1)
- Thesis in three sentences (static Fact/Inference-neutral framing).
- Four jurisdiction cards: name, published instrument count, latest status change (date + instrument link).
- Three scenario cards: name, one-line hypothetical descriptor, **ADRS tier badge** (worst-of or per-jurisdiction summary — see §30 A5), "Hypothetical" tag.
- "How to read this site" block explaining ■▲● and confidence.
- Download links: methodology, memo, executive brief.

### 7.2 `/methodology` (§16.2)
- Renders §6, §7, §13 (incl. formula, weights, rubrics, mitigation table, J formula), §15, §19–22 as structured content.
- AI-assistance disclosure (§6.7, §19.6) and two-pass self-review protocol (§19.4) stated honestly.
- Confidence table (§22) rendered verbatim.
- Downloadable methodology PDF (FR-11).

### 7.3 `/taxonomy/policy` (§16.3)
- Axis A (7 instrument types with §9 definitions, decision tests, examples), Axis B (3 bindingness levels), Axis C (lifecycle states + ordering), Axis D (approach tags). Edge-case rules (§9) shown. EU-AI-Act classification note (§9.3) surfaced.

### 7.4 `/taxonomy/capabilities` (§16.4)
- C1–C12 table: id, name, definition, technical indicators, typical regulatory hooks (§10 verbatim). Each capability links to provisions mapped to it and to scenarios exhibiting it.

### 7.5 `/taxonomy/risks` (§16.5)
- R1–R12 table: id, name, definition, driving capabilities, example failure (§11). Each risk cross-links to capabilities, mapped provisions, and mitigating controls. Failure narratives marked **hypothetical**.

### 7.6 `/jurisdictions` index + `/jurisdictions/{id}` (§16.6)
- Index: four cards (see §30 A6). Detail: regulatory-approach summary (labeled ▲ inference); instrument list filterable by Axis A–D (§8 filters, FR-2); lifecycle timeline of status events; "agentic relevance highlights."

### 7.7 `/instruments/{slug}` (§16.7, FR-4)
- Classification chips: instrument_type, bindingness, lifecycle_status — each with its dated basis and source.
- Authoritative-source citation block (§21.7 format).
- Provision table: pin_cite, quote (verbatim, ≤50 words), paraphrase, capability tags, risk tags, confidence chip. Row → `/provisions/{id}`.
- Supersession links (`supersedes_id`/`superseded_by_id`), analyst notes, change history (from `changelog` filtered to this instrument).

### 7.8 `/provisions/{id}` (§16.8, §15.1)
- Verbatim quote (original language, correct `lang` attr) + translated quote if present (flagged, translation source named).
- Paraphrase (≤80 words), full citation (§21.7), obligation_type, applies_from, confidence + rationale.
- **Typed mapping chain** rendered with visible ■▲● labels: provision (Fact, cited) → capability mapping (Inference + confidence + rationale) → control mapping (Recommendation + strength + relation + rationale). Multiple chains allowed.

### 7.9 `/risk-score` (§16.9, FR-5)
- ADRS methodology summary + **interactive calculator** (§8 below).
- "This is not a compliance determination" banner (§12).

### 7.10 `/scenarios` index + `/scenarios/{id}` (§16.10, FR-6)
- Detail: narrative (marked **hypothetical**, §14); capability-profile chips (C-id + intensity 0–4); per-jurisdiction ADRS worksheets, each expandable to show all five dimension justifications, mitigation evidence, and J-component justifications; top-5 provisions table; control mapping table; cross-jurisdiction comparison strip; "Open in calculator" deep links.
- Executive-brief section per §29 (also exported as PDF).

### 7.11 `/controls` (§16.11, FR-8)
- Catalog filterable by category (technical/process/organizational/documentation), mitigation_class (M1–M9/none), jurisdictional driver. Each control expands to driving provisions and renders the §15.1 chain.

### 7.12 `/compare` (§16.12, FR-7)
- Matrix: rows = capabilities or risks (toggle), columns = four jurisdictions, cells = **count of currently-applicable binding provisions** (per the SPEC §13.5 operational definition, reference date = build date) mapped to that row for that jurisdiction. **No capability-intensity threshold applies** — the matrix has no agent (MJ-3). Drill-down to the filtered provision list. Whole view labeled **▲ analytical inference**. Degradable to a static table if needed (P7).

### 7.13 `/changelog` (§16.13, FR-9)
- Dated entries: entry_date, instrument, old_status → new_status, description, source link. Reverse-chronological.

### 7.14 `/glossary` (§16.14, FR-14)
- Terms + jurisdictional variants; each definition is a quote tied to a defining provision. Terms auto-link on first occurrence per page.

### 7.15 `/bibliography` (FR-10)
- Auto-generated from `sources`; each entry: publisher — title, stable_ref, tier badge, accessed date, link + archive link. Orphan sources fail CI (not shown).

### 7.16 `/about` (§16.15)
- Purpose, author, scope limits, long-form disclaimer.

---

## 8. Component-Level Behavior

**EpistemicBlock** — props `{kind: fact|inference|recommendation, text_md, citations[], confidence?, based_on[]}`. Renders icon (■/▲/●) + text label + color; fact/inference show confidence chip; recommendation shows no confidence. Hover/focus shows legend tooltip. Never renders mixed kinds (authoring splits them, §20.2).

**CitationPopover** — trigger on a citation marker; renders §21.7 format: `Publisher — *Title*, pin cite (date). [link] [archive] · accessed date · Tier badge`. `is_translation=true` shows a "translated" flag and names translation source. External links open in new tab with `rel="noopener"`.

**ClassificationChips** — three chips (type/bindingness/lifecycle); each chip shows label and, on hover/focus, the dated basis + source. Lifecycle chip color-coded by §9.

**ConfidenceChip** — `high|medium|low`; text + color + non-color cue (shape/label). Tooltip shows the confidence rationale.

**ProvisionTable** — sortable columns (pin_cite, obligation_type, confidence), capability/risk tag chips, row link. Horizontal scroll within container on narrow viewports (NFR-4).

**ADRSCalculator** — see §11 below.

**FilterBar** — Axis A–D + jurisdiction multi-selects; AND-combined; URL-addressable (FR-2). "Clear all"; result count; empty state (§16 below).

**MappingChain** — renders provision→capability→control with the three epistemic labels, strength (`direct|derived|prudential`) and relation (`satisfies_in_part|supports_evidence|implements_general_duty`) badges.

**TierBadge** — Low/Moderate/High/Critical with §12 color + range tooltip.

---

## 9. Search and Filtering Rules

- **No full-text search over primary sources** (out of scope §4). MVP provides **faceted filtering only**.
- Instrument lists filter by Axis A (instrument_type), Axis B (bindingness), Axis C (lifecycle_status), Axis D (approach_tags, multi), and jurisdiction. Filters combine with **AND**; within a multi-select axis, values combine with **OR** (§30 A2 confirms this reading of FR-2). State encoded in URL query params (e.g., `?type=enacted_law&binding=binding&approach=content_governance`).
- Controls filter by category, mitigation_class, jurisdictional driver.
- Compare filters by row dimension (capabilities|risks).
- **No free-text keyword filter in MVP (MN-8).** The earlier "lightweight keyword filter" is out of scope — it is not in SPEC §16 and is not implemented. Faceted filtering (above) is the only filtering mechanism.
- Sorting: provision tables sortable by pin_cite (natural/article order), obligation_type, confidence. Instrument lists sortable by status_date, title, lifecycle_status.

---

## 10. Policy Record Detail Behavior

**Instrument (§7.7):** Renders all classification axes with dated bases. If `superseded_by_id` present, show a prominent "Superseded by →" banner; if `supersedes_id` present, show "Supersedes ←". `superseded`/`rescinded`/`expired` instruments remain visible (§9 edge cases) with status clearly styled as historical. **Amendment is an event, not a status (SPEC §8/MJ-4):** an amended-but-in-force instrument keeps its live status (`fully_applicable`/`in_force_partially_applicable`) and surfaces the amendment from `key_dates` in its change history. Change history pulls both `key_dates` amendment events and `changelog` rows for the instrument.

**Provision (§7.8):** Quote is verbatim, ≤50 words **and** ≤350 chars, correct `lang`. If translated, show original + translation with translation-source attribution (`translation_source_id`) and confidence cap note (§7.5/§22). A provision may carry its own `bindingness` (overriding the instrument's, MJ-2); display it only when it differs from the parent. Every mapping chain grounds out in ≥1 Tier 1/2 citation. Obligation_type badge (obligation/prohibition/right/definition/enforcement/scope).

**Confidence propagation (display):** where an inference's stored confidence is shown, it must not exceed the min confidence of its `based_on` facts (enforced at build, §22 — UI just displays).

---

## 11. ADRS Risk Assessment Behavior (§12–13 — MUST match formula exactly)

**Formula (verbatim §13.1):**
```
InherentRisk     = Σ (w_i × d_i × 25)  for i in {A,T,D,E,R}; d_i ∈ {0,1,2,3,4} → [0,100]
MitigationCredit = min(0.40, Σ m_j)
ResidualRisk     = InherentRisk × (1 − MitigationCredit)
ADRS             = min(100, ResidualRisk × J)   J ∈ [1.00, 1.30]
```
**Weights (§13.2):** A=0.25, T=0.20, D=0.20, E=0.15, R=0.20 (sum 1.00).
**Mitigation credits (§13.4):** M1=0.10, M2=0.08, M3=0.07, M4=0.06, M5=0.05, M6=0.04, M7=0.04, M8=0.03, M9=0.03; total credit capped at **0.40**.
**J (§13.5):** `J = 1.00 + 0.10·binding_hit + 0.05·near_term_hit + 0.05·enforcement_posture + 0.10·prohibition_adjacent`, capped at **1.30**; each component 0/1.
**Tiers (§12 — half-open intervals):** **Low [0, 25) · Moderate [25, 50) · High [50, 75) · Critical [75, 100]**. The upper bound of each tier belongs to the next tier; tier is derived from the full-precision score.
**Numeric convention (§13.7 — normative):** calculations use full floating-point precision with **no intermediate rounding**; displayed values are rounded to **one decimal place**; tier is computed from the unrounded score. Acceptance-criteria examples show display values; automated tests assert full-precision values within **±0.001**.

**Calculator behavior (FR-5):**
1. Per dimension A/T/D/E/R, user selects an integer anchor 0–4; the **anchor text** for the selected level (§13.3) is displayed, not just the number. Between-anchor values are impossible (radio/segmented control, §13.6 rule 3).
2. Mitigations M1–M9 are toggles; each toggle shows its **evidence requirement** (§13.4). Toggling on applies the credit; **the summed credit is clamped to 0.40** and the UI shows when the cap is binding ("mitigation credit capped at 40%").
3. **Jurisdiction & J (CB-3):** the calculator does **not** auto-infer J from a jurisdiction (J depends on the agent's capability profile, which the standalone calculator does not collect — §13.5, §16.9). Selecting a jurisdiction displays **reference material only** (that jurisdiction's component definitions + example justifications); the **user manually sets the four J-component toggles** (`binding_hit`, `near_term_hit`, `enforcement_posture`, `prohibition_adjacent`), each 0/1. **No capability-profile questionnaire is added.** J is computed from the toggles and clamped to 1.30. When opened via a scenario deep link, the four components are **pre-populated from the referenced approved assessment**, each showing its stored evidence/rationale; the user may then edit any toggle.
4. Live arithmetic panel shows each term: per-dimension contribution, InherentRisk, MitigationCredit (and cap state), ResidualRisk, J, and final ADRS, plus TierBadge (tier from the unrounded score).
5. **Deterministic & client-side only** (NFR-1); no network calls. Same inputs → same output.
6. State is fully encoded in URL query params (shareable permalink), e.g. `?A=3&T=3&D=3&E=2&R=2&m=M2,M3,M4,M5,M8&binding=1&near=1&enf=0&proh=0`.
7. Persistent "not a compliance determination" banner (§12). *(The "projected score with planned controls" view is optional and deferred beyond MVP — §13.6.4 / MD-6; it is not an MVP requirement.)*

**Scenario worksheets (FR-6):** Scenario pages render **stored** `assessments` (not live user input). At build time, a recompute check MUST verify stored `inherent/residual/final/tier` equal the formula output (full precision, ±0.001) for the stored `dims/mitigations/j_components`; mismatch fails the build. Worked examples (§14) must reproduce exactly (display values): Aria residual 47.0 (raw 47.0375), EU final 56.4 (raw 56.445, High); Sentinel inherent 62.5, residual 42.5 (Moderate upper); Mira inherent 58.75, residual 49.9 (raw 49.9375), China final 64.9 (High), EU 62.4 (High).

---

## 12. Policy-to-Control Mapper Behavior (§15)

- Every mapping renders the full typed chain (§15.1): Provision (Fact, cited) → Capability (Inference, confidence, rationale) → Control (Recommendation, strength, relation, rationale). **No link may be skipped.**
- Control→provision relations use **exactly** `satisfies_in_part | supports_evidence | implements_general_duty`; strength uses **exactly** `direct | derived | prudential` (§15.4). Language must never assert "makes you compliant."
- `mapping_conflicts` (e.g., data-localization vs. centralized logging) render as first-class notes citing both provisions with an options analysis typed **● recommendation** (§15.4.4).
- Controls carry category, implementation_notes (engineer-readable), verification_method (auditor-checkable), and mitigation_class (M1–M9 or none).

---

## 13. Business Scenario Behavior (§14 — hypothetical only)

- Three scenarios: **Aria** (S1 customer support), **Sentinel** (S2 cloud security remediation), **Mira** (S3 gaming/social content). Each page marked **Hypothetical scenario** banner (FR-12) in addition to global disclaimer.
- Each renders: narrative; capability profile (C-ids + intensity + note from `scenarios.capability_profile`); four ADRS worksheets (one per jurisdiction) with expandable justifications; top-5 triggered provisions; control mappings; cross-jurisdiction comparison strip highlighting **why the same agent lands differently** (e.g., Mira High in CN and EU for different reasons, §14.3).
- No claim of affiliation; scenarios are composites (§5).

---

## 14. Executive Brief Behavior (§29)

- One-page brief (≤~350 words + one visual) on the hypothetical "ship Aria in all four markets?" question.
- Structure: title + one-sentence answer (● recommendation); **scorecard strip** (jurisdiction, ADRS TierBadge, top binding obligation one-line + citation, gating control); three bullets "what drives the score" (■/▲ labeled); two bullets "what changes the answer" (mitigation that moves a tier; upcoming date that raises J); ask/next step; footer (disclaimer + `as_of` + link to full scenario).
- Rendered as an on-page section on the scenario page **and** exported to `/downloads/executive-brief.pdf` (FR-11) with print styles (NFR-9). All figures must trace to stored assessments (no ad-hoc numbers).

---

## 15. Human Review States (§19)

States (content entities: instrument, provision, assessment, mapping, etc.):
```
draft → in_review → (changes_requested → in_review)* → approved → published → re_verified
```
- Every transition appends a `review_log` row (`entity_type, entity_id, action, actor, note, at`). Actions enum (§17): `created, edited, submitted_for_review, changes_requested, approved, published, re_verified`.
- **Only `published` entities are rendered on the public site.** Draft/in_review/approved-but-unpublished content is excluded from the static build.
- Publish gate (§17 integrity + §19.3 checklist) is enforced in the import/validation pipeline (see ENGINEERING_HANDOFF), not merely in SQL.
- Single-author two-pass protocol (§19.4): Pass 1 (authoring) and Pass 2 (review) on different days, logged as distinct actions; publicly disclosed on `/methodology`.
- Re-verification (§19.5): instruments not `fully_applicable`/`rescinded` re-checked every 30 days; logged `re_verified`; status changes create `changelog` entries.
- **UI surfacing:** each published record displays a "Human-reviewed" indicator with the approval date and `last_verified`/`as_of_date`. No review-workflow UI ships in MVP (authoring is file-based); the states are data, not an app feature.

---

## 16. Citation, Epistemic, Lifecycle, Confidence, Last-Verified — Display Logic

### 16.1 Citation behavior (§21)
- Every **fact** block shows ≥1 Tier 1/2 citation with pin cite via CitationPopover. Tier 3 never cites a fact (may appear only in analyst_notes/further-reading).
- Status/date claims cite a Tier 1 source (§21.2). Quotes verbatim ≤50 words, language noted, translation flagged (§21.3).
- Citation format (§21.7): `Publisher — *Title*, pin cite (date). [link] [archive] · accessed {date} · Tier {n}`. Broken links fail CI (P9); Tier 1 sources without stable identifiers require `archived_url`.

### 16.2 Fact / Inference / Recommendation display logic (§20)
- ■ **Fact** — checkable against Tier 1/2; requires citation + confidence; never contains "likely/should/effectively/in practice."
- ▲ **Inference** — interpretive; requires `based_on` + confidence; reasonable experts may disagree.
- ● **Recommendation** — course of action; requires `based_on`; **no confidence chip**; always generic to a system class, never advice to a named entity.
- Mixed-kind paragraphs are prohibited. Page-level summary shows counts.
- Escalation rule (§20.3): if fact-vs-inference is unclear, render as inference. Corrections (§20.4): visible correction note + changelog entry; never silent edit.

### 16.3 Policy lifecycle & status display logic (§8 Axis C, §9)
- Lifecycle values and legal ordering: `proposed → adopted_not_yet_applicable → in_force_partially_applicable → fully_applicable → (superseded | rescinded | expired)`, plus `withdrawn`. **Amendment is an event, not a terminal status (SPEC §8/MJ-4):** amended-but-in-force instruments keep their live status and record the amendment in `key_dates`; the `amended` enum value is reserved for wholesale replacement (use supersession links).
- Each status shows its attained date and establishing source. Instrument_type is independent of status (an enacted law can be `adopted_not_yet_applicable`). Superseded/rescinded records remain visible and clearly marked historical with supersession links.
- Color/semantics mapping defined in DESIGN_HANDOFF; must not conflate `binding` (Axis B) with `fully_applicable` (Axis C).

### 16.4 Confidence display rules (§22)
- Three levels high/medium/low; chip on every fact and inference (never on recommendations). Tooltip = confidence rationale.
- Hard caps enforced upstream and reflected in display: translation-only → ≤medium; `proposed`-status content → ≤medium (existence/content as draft may be high; enactment predictions ≤low); enforcement-posture inferences → ≤medium.
- Inference confidence ≤ min(based_on facts) — enforced at build; UI displays stored value.

### 16.5 Last-verified behavior (§6.5, §19.5) — date fields are distinct (MJ-1)
- The five date concepts are **not interchangeable** (SPEC §17 date-field dictionary): `publication_date`/`adopted_date` (issued), `effective_date`/`applies_from` (obligation begins), `status_date` (current lifecycle attained), `assessed_date` (ADRS assessment performed; anchors `near_term_hit`), `as_of_date` (record content last researched), `last_verified` (status+citations last re-checked against a primary source).
- Instruments and provisions carry a distinct **`last_verified`** field (SPEC §17). Footer shows the page's `as_of_date`. Records with `last_verified` >180 days ago display a "verification stale" indicator (aligns with §22 Low-confidence trigger). Instruments show `last_verified` next to lifecycle status; assessments show `assessed_date`.

---

## 17. Responsive Behavior (NFR-4)

- Usable at **375px** width. No horizontal page scroll; wide tables (provision, compare matrix) scroll horizontally **within their own container**.
- Top nav collapses to a menu on narrow viewports; disclaimer bar and epistemic legend remain accessible.
- ADRS calculator reflows to a single column on mobile; arithmetic panel stays visible (sticky or below inputs).
- Compare matrix on mobile: horizontal scroll with sticky row headers, or degrade to stacked per-jurisdiction lists (design choice, DESIGN_HANDOFF).

---

## 18. Accessibility Requirements (NFR-3)

- **WCAG 2.1 AA.** Color contrast ≥4.5:1 for text.
- **Epistemic labels and status/confidence must be distinguishable without color** — always icon + text label, not color alone.
- All interactive controls (filters, toggles, calculator inputs, popovers) keyboard-operable with visible focus; ARIA roles on tabs/accordions/tooltips.
- Tables use proper `<th>`/scope; sortable headers announce sort state.
- Original-language quotes carry correct `lang` attributes (NFR-8) for screen readers.
- Popovers/tooltips are focusable and dismissible (Esc); content also available inline for AT.

---

## 19. Loading States

- Site is static/pre-rendered → minimal loading. Client-only components (calculator, filter bar reading URL state) render a **deterministic skeleton** for at most one frame; no spinners tied to network (there are none).
- PDFs/CSV/JSON downloads are pre-built static files (no generation delay).
- If a client component hydrates from URL params, show the computed state immediately; never a flash of "0" score — compute before paint.

---

## 20. Empty States

- Filtered instrument/control list with no matches: "No records match these filters" + "Clear filters" action + current filter summary.
- Compare cell with zero applicable binding provisions: render "0" (not blank) with a tooltip "no currently-applicable binding provisions mapped to this row for this jurisdiction"; drill-down shows empty-list state.
- Provision with no mappings: cannot exist for published content (integrity rule requires ≥1 capability or risk mapping) — build fails rather than rendering empty.
- Changelog with no entries in period: "No status changes recorded in this period."

---

## 21. Error States

- **Build-time is where errors live** (static site). Any schema/integrity/link failure **fails CI**; the site never deploys with invalid data (see data integrity rules §24).
- Runtime 404: unknown `/instruments/{slug}` or `/provisions/{id}` → static 404 page with nav back to Home/relevant index. (All valid slugs are pre-rendered; 404 only for typos/stale links.)
- Calculator invalid URL params (e.g., `A=9`): clamp to valid range or reset that dimension to 0 with a non-blocking notice; never crash; never render an out-of-range score.
- Missing PDF/CSV asset: link disabled with "coming soon" rather than a broken download (should not happen if CI passes).
- No uncaught client exceptions on any page (verified by Playwright console-error assertions).

---

## 22. Analytics (privacy-preserving page counts only; NFR-7 — MN-7)

- **Scope is limited to aggregate page counts**, per NFR-7. No third-party analytics, no cookies, no PII, no per-interaction event taxonomy. The only permitted signal is an anonymous, cookieless **`page_view {path}`** count (server logs or a single cookieless counter).
- Analytics are **optional**; absence must not affect functionality. The default build ships with **none enabled** unless a cookieless page-count provider is explicitly configured (env `ANALYTICS_BEACON_URL`, ENG §15).

---

## 23. Security & Privacy Requirements

- Static hosting; **no server-side mutation, no user accounts, no auth, no forms that submit PII** (NFR-1, §4).
- No runtime LLM/network calls from the client for content (§5.3).
- External links use `rel="noopener noreferrer"`, `target="_blank"`.
- Content Security Policy suitable for a static self-contained site; no inline third-party scripts beyond an optional cookieless analytics beacon.
- No secrets in the client bundle; environment variables (if any) used only at build time (see ENGINEERING_HANDOFF).
- Contact method in footer is a mailto or static form provider explicitly out of scope for MVP data capture.

---

## 24. Data Integrity Rules (§17 publish pipeline + §21 + §22)

Enforced in the import/validation pipeline (build fails on any violation, FR-13):
1. A provision cannot be `published` without a Tier 1/2 `source_id`, a non-empty `confidence_rationale`, and ≥1 capability **or** risk mapping.
2. An assessment cannot be `published` unless all five dimension justifications are non-empty (minLength 40) **and** each claimed mitigation has evidence text (minLength 40).
3. Every `published` entity has an `approved` `review_log` entry; single-author mode satisfies this via two logged passes on different days (§19.4).
4. Stored assessment `inherent/residual/final/tier` MUST equal formula recomputation (FR-6) — else fail.
5. Mitigation credit sum clamped to 0.40; J clamped to 1.30; ADRS clamped to 100 — recomputation uses the canonical formula module at full precision (§13.7).
6. Every fact block has ≥1 citation; Tier 3 never cites a fact (§21.5).
7. Confidence hard caps (§22) applied; inference confidence ≤ min(based_on).
8. Every quote ≤50 words **AND** ≤350 chars (OD-3); translated quotes name a translation source via `translation_source_id` (OD-4).
9. **Link integrity is warning-tier, not build-blocking, for transient failures (MJ-7, §21.6):** the link checker retries with backoff and honors a host allowlist (e.g., cac.gov.cn, EUR-Lex); a transient 403/429/timeout on an allowlisted host warns rather than fails. **Every Tier 1 source must have an `archived_url`** (a stable ref does not substitute); a Tier 1 source with no resolving URL, no `archived_url`, and no logged manual verification fails the build.
10. Orphan sources (cited by nothing) fail CI (§21.8).
11. Referential integrity: all FK-style references (instrument_id, source_id, `translation_source_id`, capability_id, risk_id, control_id, provision ids in mappings) resolve.
12. Enum conformance for all taxonomy fields (Axis A–D, obligation_type, strength, relation, mitigation_class, tier, review_status, action).
13. **Cross-jurisdiction dimension invariance (MJ-11, SPEC §17 rule 13):** for each scenario, A/T/R scores are identical across its four published assessments; any D or E divergence carries a non-empty `divergence_justification`. Violations fail the build.
14. Provision effective bindingness resolves as `provisions.bindingness` if set else the parent instrument's (MJ-2); `binding_hit` and the compare count use this resolved value.

---

## 25. Technical Assumptions

- Static site generation (Astro or Next.js static export per NFR-10); content authored as JSON+Markdown in `/content`; SQLite or build-time JSON as the data layer (site is read-only).
- TypeScript throughout; Zod (or AJV) for schema validation mirroring §18.
- ADRS formula is a **single canonical TypeScript module**, imported by both the calculator UI and the build-time recompute check (no duplicated math).
- Playwright for smoke/critical-path tests; CI runs schema validation, integrity checks, formula unit tests, link check, a11y scan, Lighthouse.
- Deployment to a static host (GitHub Pages/Netlify/Vercel). No backend runtime.

---

## 26. Dependencies & Constraints

- Depends on Phase 1 research data existing before Scenario/Compare/Bibliography pages are populated (build sequence §26 of SPEC). Templates can be built against seed/fixture data in Phase 0/3.
- Constraint: preserve all IDs/formulas/taxonomies verbatim; do not add jurisdictions or a chatbot; keep MVP within §4.

---

## 27. Success Metrics (maps to §25 acceptance)

- Content thresholds AC-1…AC-6; product AC-7…AC-9; deliverables AC-10 (see `ACCEPTANCE_CRITERIA.md`).
- Cold-reader test (AC-9): a new user can, in <10 min, (a) determine whether the EU AI instrument is in force, (b) explain fact vs inference, (c) produce an ADRS score.

---

## 28. Out-of-Scope Confirmations

No accounts, comments, notifications, primary-source full-text search, automated ingestion, extra jurisdictions, public API, runtime AI, or server mutation (§4/§5).

---

## 29. Glossary of Product Terms

Instrument, Provision, Capability (C1–C12), Risk (R1–R12), Control (K-series), Mitigation class (M1–M9), Dimension (A/T/D/E/R), ADRS, Tier, Bindingness, Lifecycle status, Approach tag, Epistemic block, Confidence, `as_of_date`, `last_verified`, Assessment worksheet, Mapping chain, Supersession. (Definitions per SPEC §8–22.)

---

## 30. Ambiguities & Contradictions — resolution status

The 2026-07-10 adversarial-review revision (see `docs/REVISION_LOG.md`) resolved all five Critical Blockers and Major Issues MJ-1…MJ-11 directly in `SPEC.md` and these docs. The items below track the earlier A1–A10 gaps; most are now **RESOLVED in SPEC**. Choices that materially affect ADRS interpretation are recorded in `docs/METHODOLOGY_DECISIONS.md`. **This list is not a claim of completeness** — genuinely open items live in `docs/IMPLEMENTATION_BACKLOG.md → Open Implementation Decisions`, which is the authoritative open-items register.

- **A1 — `epistemic_blocks` on provisions.** RESOLVED: `epistemic_blocks` authored as JSON on the provision file and stored (SPEC §18.2 lists it as required); render on the provision page.
- **A2 — Filter combination semantics.** RESOLVED (default adopted): AND across axes, OR within a multi-value axis (PRD §9).
- **A3 — Quote length unit.** RESOLVED: enforce **both** ≤50 words AND ≤350 chars (SPEC §18.2/§21.3, integrity rule 8).
- **A4 — `translation_source_id`.** RESOLVED: added as nullable FK on `provisions` → `sources`, required when `quote_translated` set (SPEC §17/§18.2).
- **A5 — Home/scenario ADRS badge granularity.** RESOLVED (default adopted): worst-of-four tier + "varies by jurisdiction" hint (PRD §7.1; MD-5).
- **A6 — Missing index/bibliography pages.** RESOLVED: `/jurisdictions`, `/scenarios`, `/bibliography` added (PRD §5).
- **A7 — Assessment "current version."** RESOLVED (default adopted): render highest `version` where `review_status='published'` (ENG §6; MD-4).
- **A8 — Reviewer ≠ creator vs single author.** RESOLVED: two dated passes satisfy integrity rule 3 (SPEC §17/§19.4).
- **A9 — Sources authoring shape.** RESOLVED: shared `/content/sources/`, referenced by id; importer normalizes inline citations (ENG §10).
- **A10 — `confidence` at two levels.** RESOLVED: provision-level = confidence in the extracted fact; mapping-level = confidence in the scope inference; both displayed, labeled (PRD §16.4; MD-7).
