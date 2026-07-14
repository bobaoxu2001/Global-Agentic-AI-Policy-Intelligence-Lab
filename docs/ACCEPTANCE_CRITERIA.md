# AI Policy Atlas — Acceptance Criteria (Given / When / Then)

**Derived from:** `SPEC.md` v1.0 (§13, §17–25), `docs/PRD.md`, `docs/ENGINEERING_HANDOFF.md`. Updated by the 2026-07-10 revision (`docs/REVISION_LOG.md`).
IDs (AC-…) are referenced by `IMPLEMENTATION_BACKLOG.md`. All numeric values trace to SPEC §13–14 and must reproduce exactly.

**Numeric convention (SPEC §13.7 — applies to every AC below).** Calculations use **full floating-point precision with no intermediate rounding**. The numbers shown in these acceptance criteria are **display values** (rounded to one decimal place); **automated tests assert the full-precision values within ±0.001**. Tiers use **half-open intervals** — Low [0,25), Moderate [25,50), High [50,75), Critical [75,100] — and are derived from the raw (unrounded) score.

**Provisional-default tags (MN-12).** ACs marked *[provisional: OD-n]* assert an Open-Implementation-Decision default (see backlog); if that OD resolves differently, the AC changes with it.

---

## 1. Policy Tracker (instrument list & filtering) — `AC-TRK`

**AC-TRK-1**
- **Given** a jurisdiction page with ≥6 published instruments
- **When** the page loads
- **Then** each instrument shows title (original + EN), instrument type, bindingness, lifecycle status with its attained date, and `last_verified`; only `published` instruments appear.

**AC-TRK-2**
- **Given** the instrument list filter bar
- **When** I select `type=enacted_law` AND `approach=content_governance`
- **Then** only instruments matching both facets show, the URL encodes the state (`?type=enacted_law&approach=content_governance`), and a result count is displayed.

**AC-TRK-3**
- **Given** two values selected within one axis (e.g., `approach=content_governance` and `approach=technology_specific`)
- **When** filters apply
- **Then** instruments matching **either** value within that axis show (OR within axis), combined with AND across axes (per PRD §9 / OD-2).

**AC-TRK-4**
- **Given** a filter combination with no matches
- **When** applied
- **Then** an empty state "No records match these filters" with a "Clear filters" action and the active-filter summary is shown (no error, no blank page).

**AC-TRK-5**
- **Given** the instrument list
- **When** I click the "status date" column header
- **Then** rows sort by `status_date` with visible sort direction and `aria-sort` set.

---

## 2. Policy Detail — instrument & provision — `AC-DET`

**AC-DET-1 (instrument)**
- **Given** a published instrument with `superseded_by_id` set
- **When** I open its page
- **Then** classification chips (type/bindingness/lifecycle+date), the authoritative-source citation block, the provision table, a "Superseded by →" link, analyst notes, and change history render.

**AC-DET-2 (rescinded still visible)**
- **Given** an instrument with lifecycle `rescinded`
- **When** I open it
- **Then** it renders, clearly styled as historical, retains its supersession link, and is not hidden (SPEC §9 edge case).

**AC-DET-3 (provision typed chain)**
- **Given** a published provision mapped to ≥1 capability and ≥1 control
- **When** I open `/provisions/{id}`
- **Then** it shows the verbatim quote (correct `lang`), paraphrase, full citation, and the typed chain rendered with **all three** labels: ■ Fact (cited) → ▲ Inference (capability scope, with confidence + rationale) → ● Recommendation (control, with strength + relation + rationale).

**AC-DET-4 (translated quote)**
- **Given** a provision with `quote_translated`
- **When** rendered
- **Then** the original quote and translation both show, the translation is flagged, the translation source is named, and confidence is ≤ medium (SPEC §7.5/§22).

---

## 3. Jurisdiction Comparison — `AC-CMP`

**AC-CMP-1** (MJ-3)
- **Given** the `/compare` matrix with rows=capabilities
- **When** the page loads
- **Then** columns are the four jurisdictions, each cell shows the **count of currently-applicable binding provisions** (per the SPEC §13.5 definition, reference date = build date) mapped to that capability for that jurisdiction — **no capability-intensity threshold is applied** (the matrix has no agent) — and the whole view is labeled **▲ analytical inference**.

**AC-CMP-2**
- **Given** a non-zero matrix cell
- **When** I drill into it
- **Then** a filtered provision list for that capability×jurisdiction appears.

**AC-CMP-3**
- **Given** a capability with zero applicable binding provisions in a jurisdiction
- **When** rendered
- **Then** the cell shows "0" (not blank) with an explanatory tooltip; drill-down shows an empty-list state.

**AC-CMP-4**
- **Given** the rows toggle
- **When** I switch rows to risks
- **Then** rows become R1–R12 and cells recompute accordingly.

---

## 4. Agent Scenario Detail — `AC-SCN`

**AC-SCN-1**
- **Given** a scenario (Aria/Sentinel/Mira)
- **When** I open its page
- **Then** a "Hypothetical scenario" banner (in addition to the global disclaimer), the narrative, capability-profile chips (C-id + intensity), four per-jurisdiction ADRS scorecards, top-5 provisions, control mappings, and a cross-jurisdiction comparison strip render.

**AC-SCN-2 (expandable justifications)**
- **Given** a per-jurisdiction worksheet
- **When** I expand it
- **Then** all five dimension justifications, mitigation evidence, and J-component justifications are shown.

**AC-SCN-3 (Mira flagship comparison)**
- **Given** the Mira scenario
- **When** rendered
- **Then** China tier = **High** and EU tier = **High**, and the comparison strip states they arise for different reasons (content-governance vs transparency/minors) (SPEC §14.3).

**AC-SCN-4 (deep link to calculator)**
- **Given** a worksheet
- **When** I click "Open in calculator"
- **Then** `/risk-score` opens prefilled with that worksheet's dims/mitigations/J via URL params.

---

## 5. ADRS Scoring (calculator + formula) — `AC-ADRS`

**AC-ADRS-1 (inherent risk)**
- **Given** dimensions A=3,T=3,D=3,E=2,R=2 (Aria)
- **When** computed
- **Then** InherentRisk = **66.25** using weights A.25/T.20/D.20/E.15/R.20 (SPEC §13.1–13.2).

**AC-ADRS-2 (residual + final Aria)**
- **Given** mitigations M2,M3,M4,M5,M8 and jurisdiction EU with J=1.20
- **When** computed at full precision
- **Then** MitigationCredit = **0.29**, ResidualRisk = **47.0375** (displays 47.0), ADRS = **56.445** (displays 56.4), tier = **High**. (Tests assert raw values ±0.001.)

**AC-ADRS-3 (Sentinel)**
- **Given** A=3,T=4,D=1,E=1,R=3 and M2,M3,M4,M6,M7,M9
- **When** computed
- **Then** Inherent = **62.5**, credit = **0.32**, Residual = **42.5**, tier = **Moderate**.

**AC-ADRS-4 (Mira)**
- **Given** A=2,T=1,D=3,E=3,R=3 and M3,M5,M8
- **When** computed with CN J=1.30 and EU J=1.25 at full precision
- **Then** Inherent = **58.75**, Residual = **49.9375** (displays 49.9), CN ADRS = **64.91875** (displays 64.9, High), EU ADRS = **62.421875** (displays 62.4, High).

**AC-ADRS-5 (anchor text + integer only)**
- **Given** the calculator
- **When** I set a dimension
- **Then** only integer levels 0–4 are selectable (no between-anchor values), and the selected level's anchor text (§13.3) is displayed.

**AC-ADRS-6 (live arithmetic + determinism)**
- **Given** any input change
- **When** it occurs
- **Then** per-dimension contributions, InherentRisk, MitigationCredit, ResidualRisk, J, final ADRS, and TierBadge update instantly, client-side, with no network call; identical inputs always yield identical output.

**AC-ADRS-7 (tier boundaries — half-open, CB-2)**
- **Given** final scores 24.999, 25.000, 49.999, 50.000, 74.999, 75.000
- **When** mapped to tiers via the half-open intervals (SPEC §12)
- **Then** 24.999→Low, 25.000→Moderate, 49.999→Moderate, 50.000→High, 74.999→High, 75.000→Critical (and 0→Low, 100→Critical). The upper bound of each tier belongs to the next tier.

**AC-ADRS-8 (permalink)**
- **Given** a configured calculator state
- **When** I copy the link and reopen it
- **Then** the exact dims/mitigations/J state and score are reproduced from URL params.

**AC-ADRS-9 (compliance caveat)**
- **Given** any screen showing an ADRS score
- **When** rendered
- **Then** a "this is not a compliance determination" caveat is visible (SPEC §12).

**AC-ADRS-10 (calculator jurisdiction → no auto-J; manual toggles — CB-3)**
- **Given** the standalone calculator
- **When** I select a jurisdiction
- **Then** the calculator displays that jurisdiction's four J-component **reference definitions/examples** but does **not** auto-set J; the four J-component toggles remain user-controlled; there is **no capability-profile questionnaire**; J is computed only from the toggles I set.

**AC-ADRS-11 (scenario deep link pre-populates with provenance — CB-3)**
- **Given** a scenario worksheet's "Open in calculator" link
- **When** the calculator opens
- **Then** dims, mitigations, and the four J components are pre-filled from the referenced approved assessment, each J component shows its stored evidence/rationale, and I can override any toggle. *[provisional: OD-7 — the assessment is the current published version]*

**AC-ADRS-12 (no intermediate rounding — CB-5)**
- **Given** the formula module
- **When** it computes any chained result
- **Then** it uses full precision throughout; the raw path `adrs(residualRisk(66.25,0.29),1.20)` = 56.445 (not the wrongly-rounded 56.4-in → 56.4-out path); `displayScore` output is never re-entered into the formula.

---

## 6. Mitigation Discount Cap — `AC-CAP`

**AC-CAP-1**
- **Given** selected mitigations whose credits sum to > 0.40 (e.g., all of M1–M9 = 0.50)
- **When** computed
- **Then** MitigationCredit is clamped to **0.40** and the UI indicates the cap is binding ("Mitigation credit capped at 40%").

**AC-CAP-2**
- **Given** a critical-inherent-risk agent
- **When** maximum mitigations are applied
- **Then** the residual cannot fall below 60% of inherent (i.e., the 40% cap holds), preventing controls from laundering inherent risk (SPEC §13.4 rationale).

---

## 7. Jurisdiction Multiplier (J) — `AC-JUR`

**AC-JUR-1**
- **Given** J components binding_hit=1, near_term_hit=1, enforcement_posture=0, prohibition_adjacent=0
- **When** computed
- **Then** J = 1.00 + 0.10 + 0.05 = **1.15** (SPEC §13.5).

**AC-JUR-2 (max J and clamp invariant — MN-1/CB-5)**
- **Given** all four J components = 1
- **When** computed
- **Then** J = 1.00 + 0.10 + 0.05 + 0.05 + 0.10 = **1.30** exactly (the maximum reachable value; the `J_CAP=1.30` clamp is a defensive no-op at these weights).
- **And** (property/invariant test) for **every** combination of the four 0/1 components, J ∈ [1.00, 1.30] and never exceeds 1.30.

**AC-JUR-3 (component justification)**
- **Given** a jurisdiction selection in the calculator or a scenario worksheet
- **When** viewed
- **Then** each of the four J components shows its 0/1 value and a justification; enforcement_posture and prohibition-adjacency readings are typed as ▲ inference (SPEC §13.5).

**AC-JUR-4 (final cap)**
- **Given** ResidualRisk × J exceeding 100
- **When** computed
- **Then** ADRS is clamped to **100** and tier = Critical.

---

## 8. Policy-to-Control Mapping — `AC-MAP`

**AC-MAP-1**
- **Given** a control mapping
- **When** rendered
- **Then** the full chain shows: Provision (■ Fact, cited) → Capability (▲ Inference, confidence, rationale) → Control (● Recommendation, strength ∈ {direct,derived,prudential}, relation ∈ {satisfies_in_part,supports_evidence,implements_general_duty}, rationale); no link is skipped.

**AC-MAP-2 (no compliance claim)**
- **Given** any mapping's recommendation text
- **When** rendered
- **Then** it never asserts "makes you compliant"; it uses satisfies_in_part / supports_evidence / implements_general_duty framing (SPEC §15.4.2).

**AC-MAP-3 (conflicts)**
- **Given** a `mapping_conflicts` record (e.g., data-localization vs centralized logging)
- **When** rendered
- **Then** both provisions are cited and an options analysis is shown typed as ● recommendation (SPEC §15.4.4).

**AC-MAP-4 (controls filter)**
- **Given** the control catalog
- **When** I filter by category, mitigation class, or jurisdiction
- **Then** the list narrows accordingly and each control expands to its driving provisions.

---

## 9. Source Citation — `AC-CIT`

**AC-CIT-1**
- **Given** any ■ fact block
- **When** rendered
- **Then** it shows ≥1 Tier 1/2 citation via a popover in the format `Publisher — *Title*, pin cite (date). [link] [archive] · accessed {date} · Tier {n}`.

**AC-CIT-2 (Tier 3 restriction)**
- **Given** a fact block
- **When** its only citation is Tier 3
- **Then** the build **rejects** it (Tier 3 may appear only in analyst notes / further reading) (SPEC §21.5).

**AC-CIT-3 (status/date claims)**
- **Given** a lifecycle status or applicability-date claim
- **When** published
- **Then** it cites a Tier 1 source to the provision/notice establishing it (SPEC §21.2).

**AC-CIT-4 (link check is warning-tier; archived_url required for Tier 1 — MJ-7)**
- **Given** a citation URL on an allowlisted host that returns a transient 403/429/timeout in CI
- **When** the link checker runs (with retry + backoff)
- **Then** the build does **not** hard-fail on that transient error (it warns); **but** every Tier 1 source must carry an `archived_url` (a stable ref does not substitute), and a Tier 1 source with no resolving URL, no `archived_url`, and no logged manual verification **does** fail the build (SPEC §21.6).

**AC-CIT-5 (bibliography + orphans)**
- **Given** the sources set
- **When** the site builds
- **Then** `/bibliography` lists every referenced source with tier + accessed date, and any orphan (unreferenced) source fails CI (SPEC §21.8).

---

## 10. Source / Instrument Status — `AC-STA`

**AC-STA-1 (independence of type and status)**
- **Given** an enacted law with lifecycle `adopted_not_yet_applicable`
- **When** rendered
- **Then** instrument_type stays `enacted_law` and status is shown separately as `adopted_not_yet_applicable` (SPEC §9 edge case a).

**AC-STA-2 (status ordering + dates)**
- **Given** any instrument
- **When** rendered
- **Then** the lifecycle status uses one of the enum values, shows its attained date and establishing source, and the visual encoding does not conflate bindingness with lifecycle.

**AC-STA-3 (changelog on status change)**
- **Given** a status change observed during the build period
- **When** recorded
- **Then** a `changelog` entry (date, instrument, old→new, source, analyst) exists and appears on `/changelog` (SPEC §19.5, AC-6).

**AC-STA-4 (amendment is an event, not a status — MJ-4)**
- **Given** an instrument that has been amended but remains in force (e.g., a data-protection law)
- **When** rendered
- **Then** its lifecycle status stays `fully_applicable`/`in_force_partially_applicable`, and the amendment appears as a dated "amended" **event** in the change-history timeline (from `key_dates`), not as a lifecycle status change.

---

## 11. Fact / Inference / Recommendation Labels — `AC-EPI`

**AC-EPI-1**
- **Given** any content block
- **When** rendered
- **Then** it displays exactly one epistemic kind with icon (■/▲/●) + text label; blocks are never mixed-kind (SPEC §20.2).

**AC-EPI-2 (fact requirements)**
- **Given** a ■ fact block
- **When** validated
- **Then** it has ≥1 citation and a confidence value, and its text contains none of "likely/should/effectively/in practice" (SPEC §20.1).

**AC-EPI-3 (recommendation has no confidence)**
- **Given** a ● recommendation block
- **When** rendered
- **Then** it shows no confidence chip and links to the inference(s)/fact(s) it rests on (SPEC §20.1).

**AC-EPI-4 (page counts)**
- **Given** a content page
- **When** rendered
- **Then** a page-level epistemic summary shows counts of facts/inferences/recommendations (SPEC §20.2).

**AC-EPI-5 (non-color distinction)**
- **Given** a user who cannot perceive color
- **When** viewing any epistemic block
- **Then** the kind is distinguishable by icon + text alone (NFR-3).

---

## 12. Last Verified — `AC-LV`

**AC-LV-1 (distinct date fields — MJ-1)**
- **Given** any published record
- **When** rendered
- **Then** `as_of_date` (page footer) and `last_verified` (near status) are shown as **distinct** values (never aliased); assessments additionally show `assessed_date`; instruments show `publication_date`/`adopted_date` and `applies_from`/`effective_date` where applicable (SPEC §17 date dictionary).

**AC-LV-2 (staleness)**
- **Given** a record with `last_verified` > 180 days ago
- **When** rendered
- **Then** a "verification stale" marker appears (aligns with §22 Low-confidence trigger).

**AC-LV-3 (re-verification cadence)**
- **Given** an instrument not `fully_applicable`/`rescinded`
- **When** the 30-day cadence runs
- **Then** a `re_verified` review-log entry is created; any status change creates a changelog entry (SPEC §19.5).

---

## 13. Confidence Caps — `AC-CONF`

**AC-CONF-1 (translation cap)**
- **Given** a claim resting solely on an unofficial translation
- **When** validated
- **Then** its confidence is at most **medium**; a `high` value fails the build (SPEC §22).

**AC-CONF-2 (proposed-status cap)**
- **Given** a claim about an instrument in `proposed` status
- **When** validated
- **Then** confidence ≤ **medium** (draft existence/content may be high; enactment predictions are inferences capped at **low**) (SPEC §22).

**AC-CONF-3 (enforcement-posture cap)**
- **Given** an enforcement-posture inference
- **When** validated
- **Then** confidence ≤ **medium** (SPEC §22).

**AC-CONF-4 (propagation)**
- **Given** an inference with `based_on` facts of confidence {high, medium}
- **When** validated
- **Then** the inference confidence ≤ **medium**; a higher value fails the build (SPEC §22).

---

## 14. Human-Reviewed State — `AC-REV`

**AC-REV-1 (published-only rendering — MN-6)**
- **Given** content whose `review_status` column ≠ `published` (i.e. `draft` or `in_review`, including rows that have a logged `approved`/`re_verified` action but have not yet been flipped to the `published` column)
- **When** the production site builds
- **Then** that content is excluded from the public build; only rows with `review_status='published'` render (PRD §15; the six workflow *actions* live in `review_log`, distinct from the three-value column — SPEC §17).

**AC-REV-2 (publish gate — provision)**
- **Given** a provision without a Tier 1/2 `source_id`, or without a confidence rationale, or with zero capability/risk maps
- **When** publish is attempted
- **Then** the build rejects it (SPEC §17 integrity, PRD §24.1).

**AC-REV-3 (publish gate — assessment)**
- **Given** an assessment with any empty dimension justification or any mitigation lacking evidence text
- **When** publish is attempted
- **Then** the build rejects it (SPEC §17, PRD §24.2).

**AC-REV-4 (approval log)**
- **Given** any published entity
- **When** validated
- **Then** it has an `approved` review-log entry; in single-author mode this is satisfied by two dated passes on different days, both logged (SPEC §19.4, OD-8).

**AC-REV-5 (human-reviewed indicator)**
- **Given** a published record
- **When** rendered
- **Then** a "Human-reviewed" indicator with the approval date is shown.

---

## 15. Executive Brief — `AC-BRF`

**AC-BRF-1**
- **Given** the Aria scenario
- **When** I view the executive-brief section and exported Markdown brief
- **Then** it shows a title + one-sentence answer (● recommendation), a 4-column scorecard strip (jurisdiction, ADRS tier badge, top binding obligation one-line + citation, gating control), three "what drives the score" bullets (■/▲ labeled), two "what changes the answer" bullets, an ask/next step, and a footer (disclaimer + `as_of` + link to full scenario) (SPEC §29).

**AC-BRF-2 (traceable numbers)**
- **Given** the brief's scorecard
- **When** rendered
- **Then** every ADRS figure matches the stored published assessment for that scenario×jurisdiction (no ad-hoc numbers).

**AC-BRF-3 (export)**
- **Given** the built site
- **When** I open `/downloads/executive-brief.md`
- **Then** the source-traceable executive brief is readable as a static artifact and preserves its evidence labels and decision boundary. Presentation delivery is separately covered by `/downloads/Global_AI_Policy_Executive_Briefing.pptx`.

---

## 16. Desktop Behavior — `AC-DESK`

**AC-DESK-1**
- **Given** a ≥1280px viewport
- **When** viewing any page
- **Then** the layout uses multi-column where specified (home cards 4-up, calculator inputs beside arithmetic panel), tables render without horizontal scroll, and top nav is fully expanded.

**AC-DESK-2 (Lighthouse)**
- **Given** home, one instrument page, one scenario page on desktop
- **When** Lighthouse CI runs
- **Then** performance, accessibility, best-practices, and SEO are each ≥90 (NFR-2).

---

## 17. Mobile Behavior — `AC-MOB`

**AC-MOB-1**
- **Given** a 375px viewport
- **When** viewing any page
- **Then** there is no horizontal page scroll; wide tables scroll within their own container; nav collapses to a menu; the disclaimer bar and epistemic legend remain accessible.

**AC-MOB-2 (calculator)**
- **Given** the calculator at 375px
- **When** I change inputs
- **Then** it reflows to one column and the arithmetic panel + tier badge stay visible.

---

## 18. Accessibility — `AC-A11Y`

**AC-A11Y-1**
- **Given** home, instrument, provision, risk-score, and scenario pages
- **When** an axe-core scan runs
- **Then** there are no serious or critical violations (NFR-3).

**AC-A11Y-2 (keyboard)**
- **Given** keyboard-only navigation
- **When** operating filters, calculator inputs, sortable headers, and citation popovers
- **Then** all are reachable and operable with visible focus, and popovers are dismissible with Esc.

**AC-A11Y-3 (semantic distinctions)**
- **Given** epistemic kind, status, confidence, and tier
- **When** perceived without color
- **Then** each is distinguishable by icon + text label.

**AC-A11Y-4 (lang + live region)**
- **Given** an original-language quote and the calculator result
- **When** read by assistive tech
- **Then** the quote carries the correct `lang` attribute and the result updates are announced via a live region.

---

## 19. Invalid Data Rejection — `AC-INV`

**AC-INV-1 (enum)**
- **Given** a content file with `instrument_type: "law"` (not in the enum)
- **When** validation runs
- **Then** the build fails with a readable error naming the file, path, and rule (PRD §24.12).

**AC-INV-2 (quote length)**
- **Given** a `quote_verbatim` of 60 words or 400 characters
- **When** validation runs
- **Then** the build fails (≤50 words AND ≤350 chars, OD-3).

**AC-INV-3 (author-supplied computed field)**
- **Given** an assessment file that includes `final` or `tier`
- **When** validation runs
- **Then** the build rejects it (computed fields are derived only, SPEC §18.3).

**AC-INV-4 (arithmetic mismatch)**
- **Given** a stored assessment whose `final` ≠ the formula recomputation
- **When** the build recompute check runs
- **Then** the build fails (SPEC §13.6/FR-6, PRD §24.4).

**AC-INV-5 (broken reference)**
- **Given** a mapping referencing a non-existent capability/provision/control id
- **When** validation runs
- **Then** the build fails on referential integrity (PRD §24.11).

**AC-INV-6 (translation source)**
- **Given** a provision with `quote_translated` but no `translation_source_id`
- **When** validation runs
- **Then** the build fails (OD-4).

**AC-INV-7 (A/T/R invariance — MJ-11 / integrity rule 13)**
- **Given** a scenario whose four jurisdiction assessments have differing A (or T or R) scores
- **When** validation runs
- **Then** the build fails; **and** a scenario with differing D or E scores but a non-empty `divergence_justification` is accepted, while differing D/E with an empty justification fails.

**AC-INV-8 (fixture isolation — CB-4)**
- **Given** a `fixture:true` content file
- **When** the build runs under `BUILD_PROFILE=production`
- **Then** the build fails; **and** under `BUILD_PROFILE=fixtures` the same file renders behind a persistent "FIXTURE DATA — ILLUSTRATIVE ONLY" banner, and a fixtures-profile artifact is blocked from deployment.

---

## 20. Missing Source Rejection — `AC-MSRC`

**AC-MSRC-1**
- **Given** a fact block with zero citations
- **When** validation runs
- **Then** the build fails (SPEC §21.1, PRD §24.6).

**AC-MSRC-2**
- **Given** a published provision with a null `source_id`
- **When** validation runs
- **Then** the build fails (SPEC §17 integrity).

**AC-MSRC-3** (aligned with MJ-7)
- **Given** a Tier 1 citation with no resolving URL, no `archived_url`, and no logged manual verification
- **When** the link checker runs
- **Then** the build fails. (A *transient* failure on an allowlisted host with a valid `archived_url` only warns — see AC-CIT-4.)

---

## 21. Error States (runtime) — `AC-ERR`

**AC-ERR-1 (404)**
- **Given** an unknown `/instruments/{slug}` or `/provisions/{id}`
- **When** requested
- **Then** a static 404 page renders with navigation back to Home / relevant index; no crash.

**AC-ERR-2 (calculator bad params)**
- **Given** a URL with `A=9` (out of range)
- **When** the calculator hydrates
- **Then** it clamps/resets that dimension with a non-blocking notice, never renders an out-of-range score, and never throws.

**AC-ERR-3 (no console errors)**
- **Given** any page in the Playwright suite
- **When** loaded and exercised
- **Then** there are no uncaught console errors.

**AC-ERR-4 (missing asset)**
- **Given** a download asset that failed to generate
- **When** the page renders
- **Then** the link is disabled with a "coming soon" note rather than a broken download (should not occur if CI passes).

---

## 22. Cross-cutting SPEC Acceptance (map to §25) — `AC-SPEC`

- **AC-1** ≥6 instruments/jurisdiction (≥24), each valid on all four axes with ≥1 Tier 1/2 source. → covered by AC-TRK-1, AC-REV-2, AC-CIT-1.
- **AC-2** ≥120 provisions, 100% with pin cite, paraphrase, confidence+rationale, ≥1 capability/risk map. → AC-DET-3, AC-REV-2.
- **AC-3** 12 published assessments, every dimension justified, arithmetic build-verified. → AC-SCN-2, AC-ADRS-*, AC-INV-4.
- **AC-4** ≥25 controls; every scenario's top-5 provisions map to ≥1 control with full chain. → AC-MAP-1.
- **AC-5** zero uncited fact blocks; zero mixed epistemic paragraphs (20-page sample). → AC-EPI-1, AC-MSRC-1.
- **AC-6** changelog complete for status changes; all instruments re-verified ≤30 days pre-launch. → AC-STA-3, AC-LV-3.
- **AC-7** all FR-1…FR-14 work; calculator reproduces §14 examples. → AC-ADRS-1..4.
- **AC-8** NFR-2/3/5 verified. → AC-DESK-2, AC-A11Y-1, plus clean-clone build (ENG §13).
- **AC-9** cold-reader can (a) find EU AI-instrument status, (b) explain fact vs inference, (c) produce an ADRS score. → AC-DET-1/AC-STA-2, AC-EPI-1, AC-ADRS-6.
- **AC-10** memo, brief, demo script finalized; memo + brief downloadable. → AC-BRF-3.
