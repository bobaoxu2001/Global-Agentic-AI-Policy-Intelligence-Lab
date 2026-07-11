# AI Policy Atlas — Design Handoff

**Derived from:** `SPEC.md` v1.0 + `docs/PRD.md`. **Audience:** product/visual designer. **Principle:** this is a *rigor* product, not a marketing site. Design serves legibility of evidence, not delight.

> All content, IDs, taxonomies, and epistemic rules come from `SPEC.md`. Do not invent policy content or restyle the epistemic/confidence system away.

---

## 1. Product Visual Principles

1. **Evidence first, chrome last.** The page's job is to make a policy claim, its type (fact/inference/recommendation), its confidence, and its source unmistakable. Visual weight follows evidential weight.
2. **Editorial, document-like.** Reads like a rigorous research report / regulatory brief, not a SaaS dashboard. Generous reading measure, strong typographic hierarchy, restrained color.
3. **Honest, not slick.** No hero animations, no "AI magic," no persuasive gradients. The credibility signal is precision (dates, pin cites, tiers), not polish theatrics.
4. **Distinguishable without color.** Every semantic distinction (epistemic kind, status, confidence, tier) is carried by **icon + text label**, with color as reinforcement only (NFR-3).
5. **Calm density.** Tables and taxonomies are dense but scannable; whitespace and clear headers prevent overwhelm.
6. **Consistent legend.** The Fact/Inference/Recommendation legend is a persistent, learnable system used identically everywhere.

---

## 2. Required Screens & Priorities

Priority tiers drive design order (align with SPEC §26 + demo §30).

**P0 — Demo-critical (design first):**
- Home (`/`)
- Instrument detail (`/instruments/[slug]`)
- Provision detail with typed mapping chain (`/provisions/[id]`)
- Scenario detail (`/scenarios/[id]`)
- ADRS calculator (`/risk-score`)
- Methodology (`/methodology`)
- Changelog (`/changelog`) — **promoted to P0 (MN-9): it is on-screen in demo beat 2:20–2:50 (SPEC §30)**

**P1 — Core:**
- Jurisdiction detail (`/jurisdictions/[id]`) + index
- Controls catalog (`/controls`)
- Compare matrix (`/compare`)
- Taxonomy pages (policy / capabilities / risks)

**P2 — Support:**
- Glossary, Bibliography, About, Scenario index, Jurisdiction index, 404.

Global frame (all screens): header + top nav (Jurisdictions · Scenarios · Risk Score · Taxonomies · Controls · Methodology); **persistent disclaimer bar**; **epistemic legend** (■ Fact / ▲ Inference / ● Recommendation); footer with methodology link, changelog, contact, page `as_of` date, build date + content version.

---

## 3. Information Hierarchy

Per screen, top-to-bottom emphasis:
- **Instrument:** title (original + EN) → classification chips (type / bindingness / lifecycle+date) → source citation block → provision table → supersession + analyst notes → change history.
- **Provision:** pin cite + obligation-type badge → verbatim quote (visually distinct block) → paraphrase → confidence + citation → **typed mapping chain** (the star element).
- **Scenario:** hypothetical banner → narrative → capability-profile chips → **per-jurisdiction ADRS scorecards** → top-5 provisions → control mappings → cross-jurisdiction comparison strip → executive-brief section.
- **Risk Score:** not-a-compliance banner → dimension inputs (with anchor text) → mitigation toggles → jurisdiction/J → **live arithmetic + tier badge** (dominant), permalink.
- **Home:** thesis (3 sentences) → jurisdiction cards → scenario cards (tier badges) → "how to read this site" → downloads.

---

## 4. Required Tables

| Table | Columns | Behavior |
|-------|---------|----------|
| Provision table (instrument, scenario top-5) | pin cite, obligation type, quote/paraphrase snippet, capability tags, risk tags, confidence | sortable (pin cite, obligation type, confidence); row → provision; horizontal scroll in container on mobile |
| Instrument list (jurisdiction) | title, type, bindingness, lifecycle+date, `last_verified` | filterable (Axis A–D); sortable (status_date, title, lifecycle) |
| Control catalog | id, name, category, mitigation class, driving-provision count | filterable (category, mitigation class, jurisdiction); expandable to chain |
| Compare matrix | rows = capabilities/risks, cols = 4 jurisdictions, cells = **count of currently-applicable binding provisions** (no intensity — MJ-3) | cell drill-down; whole matrix labeled ▲ inference; sticky headers |
| Changelog | date, instrument, old→new status, source, **analyst** (MN-2) | reverse-chronological |
| Bibliography | publisher — title, stable ref, tier, accessed date, links | grouped by jurisdiction or tier |
| ADRS worksheet (scenario) | dimension, score (0–4), anchor text, justification | expandable rows; mitigation + J sub-tables |

All tables: real `<th>` with scope, visible sort state, zebra or rule separation for scan, numeric alignment for scores.

---

## 5. Required Badges

- **Instrument type** (7): enacted_law, proposed_legislation, regulation, executive_action, regulator_guidance, voluntary_framework, technical_standard — neutral chip + label; icon optional.
- **Bindingness** (3): binding / conditionally_binding / non_binding — must NOT be confused with lifecycle. Suggest: binding = solid, conditionally = half/outline, non_binding = light/outline.
- **Lifecycle status** (9): proposed, adopted_not_yet_applicable, in_force_partially_applicable, fully_applicable, amended, superseded, rescinded, expired, withdrawn — see §7 color guidance.
- **Approach tags** (8, multi): small pill tags.
- **Obligation type** (6): obligation/prohibition/right/definition/enforcement/scope.
- **Confidence** (3): high/medium/low — icon + label + color.
- **ADRS tier** (4): Low/Moderate/High/Critical — see §8.
- **Mapping strength** (3): direct/derived/prudential. **Mapping relation** (3): satisfies_in_part/supports_evidence/implements_general_duty.
- **Epistemic kind** (3): ■ Fact / ▲ Inference / ● Recommendation.
- **Source tier** (3): Tier 1 / Tier 2 / Tier 3.
- **"Hypothetical"** tag (scenarios). **"Human-reviewed"** indicator with approval date.

Every badge = shape/icon + text; color reinforces, never sole carrier.

---

## 6. Fact / Inference / Recommendation Visual Treatment (§20)

The core system — must be instantly learnable and identical everywhere.

**Three disjoint color systems (MN-10).** Epistemic kind, lifecycle status, and ADRS tier are three orthogonal semantic systems and MUST use **non-overlapping hue families** so a color is never ambiguous. Reserve: **epistemic** = ink/blue (fact), **violet** (inference), **teal** (recommendation); **lifecycle** = a separate neutral→amber→green ramp (see §7); **tier** = the green→yellow→orange→red risk ramp (see §8). Do not reuse amber for both inference and `adopted_not_yet_applicable`. Confidence uses fill-density (not hue) within the epistemic block.
- **■ Fact** — square icon; most neutral/authoritative treatment (left accent in the fact hue, ink/blue); always shows a **citation marker** and **confidence chip**.
- **▲ Inference** — triangle icon; **violet** accent (not amber — reserved for lifecycle); shows **confidence chip** and a "based on" affordance linking to its supporting blocks.
- **● Recommendation** — circle icon; **teal** accent; **no confidence chip**; shows the chain it rests on.
- Each block: left accent bar or tag chip + inline icon + label word. **Mixed-kind paragraphs are forbidden** — design assumes each block is a single kind.
- **Page-level epistemic summary** ("12 facts · 5 inferences · 3 recommendations") near the top of content pages.
- Legend appears in header and expands on hover/focus with the §20 one-line definitions.
- Print keeps ■▲● glyphs (memo/brief), not just color (§28 SPEC).

---

## 7. Policy Status & Confidence Visual Treatment

**Lifecycle status color semantics** (a dedicated neutral→amber→green ramp, disjoint from the epistemic and tier palettes per §6/MN-10):
- `proposed` — muted/neutral (draft feel).
- `adopted_not_yet_applicable` — amber (adopted but pending).
- `in_force_partially_applicable` — light green/partial.
- `fully_applicable` — strong green (fully live).
- `superseded` / `rescinded` / `expired` / `withdrawn` — gray/strikethrough-adjacent (historical), clearly de-emphasized but still legible; show supersession link.
- **Amendment is not a status (SPEC §8/MJ-4)** — it is an *event* shown as a small "amended {date}" marker on an otherwise live (`fully_applicable`/`in_force_partially_applicable`) instrument, surfaced in the change-history timeline; do not give it its own status color. (The `amended` enum value, reserved for wholesale replacement, renders in the historical/gray family.)
Each status chip pairs with its **attained date** and a source link. Never imply "binding" (Axis B) from "fully_applicable" (Axis C). Note the lifecycle ramp deliberately avoids the tier ramp's yellow/orange/red and the epistemic violet/teal.

**Confidence** — high (filled/strong), medium (half), low (outline/light) + label; tooltip carries the confidence rationale. Confidence sits next to the claim, not hidden.

**Last-verified / staleness** — show `last_verified` near status; if >180 days, a subtle "verification stale" marker (§16.5 PRD).

---

## 8. ADRS Tier Visual Treatment

Four tiers with a clear escalation ramp (§12, **half-open intervals**):
- Low **[0, 25)** — calm/green.
- Moderate **[25, 50)** — yellow.
- High **[50, 75)** — orange.
- Critical **[75, 100]** — red.
Tier badge shows label + range on hover. The displayed score is rounded to **one decimal place**, but the tier is derived from the full-precision score (SPEC §13.7) — so a badge may read "50.0 · High" legitimately; do not design the badge to infer tier from the rounded number. In the calculator, the tier badge is the visual climax of the arithmetic panel. Always accompanied by the "not a compliance determination" caveat.

---

## 9. Source Citation Interactions (§21)

- Citation marker (e.g., superscript number or "cite" chip) on every fact block and status/date claim.
- **CitationPopover** on hover/focus/click: `Publisher — *Title*, pin cite (date). [link] [archive] · accessed {date} · Tier badge`. Keyboard-focusable, Esc-dismiss; content also available inline for AT.
- Translated sources show a "translated" flag + translation-source name + a note that confidence is capped (§7.5/§22).
- Tier 3 never appears as a fact's citation (only in analyst notes / further reading) — style analyst notes distinctly as secondary/orientation.
- External links: new tab, `rel=noopener`, external-link icon.

---

## 10. ADRS Explanation Interactions (§13, FR-5)

- **Dimension inputs:** segmented control / radio 0–4 per A/T/D/E/R; selecting a level reveals that level's **anchor text** (§13.3) inline. No sliders (integers only, §13.6.3).
- **Mitigation toggles:** M1–M9 as toggles; each shows its **evidence requirement** (§13.4). When summed credit hits the cap, show a persistent "Mitigation credit capped at 40%" note and visually indicate the cap is binding.
- **Jurisdiction & J (CB-3):** the jurisdiction selector does **not** auto-set J. Selecting a jurisdiction reveals **reference material** — that jurisdiction's four component definitions and example justifications. The **user then sets the four J-component toggles manually** (`binding_hit`, `near_term_hit`, `enforcement_posture`, `prohibition_adjacent`). Design must make clear these are user judgments, not an automatic per-jurisdiction constant. **No capability-profile questionnaire.** When arriving via a scenario deep link, the four toggles are pre-filled from the approved assessment and each shows its stored evidence/rationale (a small "from {scenario} assessment" provenance chip); the user can override any toggle. Display computed J (≤1.30).
- **Live arithmetic panel:** show every term — per-dimension contribution (w·d·25), InherentRisk, MitigationCredit (+ cap state), ResidualRisk, J, final ADRS, TierBadge (tier from full-precision score). Values update instantly, deterministically.
- **Permalink:** "Copy link" reflecting full state (URL params). "Open in calculator" from scenario worksheets deep-links prefilled.
- **Projected score is out of MVP (MN-11):** do **not** design a projected/planned-mitigation view for the MVP calculator (§13.6.4 marks it optional/deferred, MD-6). There is no acceptance criterion for it.
- On scenario pages, worksheets are **read-only** renderings of stored assessments (expandable justifications), visually distinct from the interactive calculator.

---

## 11. Table Sorting & Filtering Behavior (FR-2, PRD §9)

- **FilterBar:** Axis A–D + jurisdiction multi-selects; AND across axes, OR within an axis; result count; "Clear all"; URL-addressable; empty state when no matches.
- **Sort:** click header toggles asc/desc with visible arrow + ARIA `aria-sort`. Default sorts: instruments by status_date desc; provisions by pin cite (article order).
- **No full-text legal search** — do not design a global search box implying it. A lightweight in-list keyword filter (over titles/paraphrases already loaded) is acceptable and must be clearly scoped.
- Controls filter by category / mitigation class / jurisdiction; Compare toggles rows = capabilities|risks.

---

## 12. Responsive Expectations (NFR-4)

- Baseline usable at **375px**; no horizontal page scroll.
- Wide tables (provision, compare) scroll **inside their container**, page never sideways-scrolls.
- Top nav collapses to a menu; disclaimer bar + legend remain reachable.
- Calculator: single column on mobile; arithmetic panel sticky or directly below inputs so the tier is always visible while adjusting.
- Compare matrix mobile: sticky row headers + horizontal scroll, or stacked per-jurisdiction lists.
- Cards (home) reflow 4→2→1 columns.

---

## 13. Accessibility Requirements (NFR-3)

- WCAG 2.1 AA; text contrast ≥4.5:1; large text ≥3:1.
- **Never rely on color alone** for epistemic kind, status, confidence, tier — always icon + label.
- Keyboard operability for all filters, toggles, sortable headers, popovers, accordions; visible focus rings.
- ARIA: tabs, accordions, tooltips/popovers, `aria-sort` on sortable headers, live region for calculator result updates.
- `lang` attributes on original-language quotes (NFR-8).
- Tooltip content duplicated inline / accessible so it isn't hover-only.
- Motion minimal; respect `prefers-reduced-motion`.

---

## 14. Loading, Empty, Error States

- **Loading:** static site → essentially none. Calculator/filter islands compute from URL state before paint; show a one-frame deterministic skeleton at most; **never a "0" flash** for the score. No network spinners (there is no runtime API).
- **Empty:** filtered lists → "No records match these filters" + filter summary + "Clear filters." Compare zero-cell → show "0" + tooltip, drill-down shows empty-list message. Changelog empty period → explicit message.
- **Error:** unknown route → static 404 with nav home. Calculator bad URL params → clamp/reset with non-blocking inline notice, never crash, never out-of-range score. Missing download asset → disabled link with "coming soon" (shouldn't occur if CI passes).

---

## 15. Design Anti-Patterns to Avoid

- ❌ Chatbot / "ask the Atlas" affordance, chat bubble, or any conversational input (§5.3).
- ❌ Global search box implying full-text primary-source search (out of scope §4).
- ❌ Color-only status/confidence/tier encoding.
- ❌ Marketing hero, animated gradients, "AI sparkle" motifs, dark-pattern engagement nudges.
- ❌ Presenting inferences or recommendations as if they were facts (or vice versa); blending kinds in one block.
- ❌ Showing an ADRS number without its tier, its arithmetic, and the "not a compliance determination" caveat.
- ❌ Implying affiliation with Tencent or any company; using real company logos.
- ❌ Sliders / free-text for ADRS dimensions (must be integer anchors 0–4).
- ❌ Hiding citations behind hover-only with no accessible fallback.
- ❌ Fake precision (e.g., percentages) on confidence — it's high/medium/low only.

---

## 16. Fictional Placeholder Data Rules

- All **business scenarios are hypothetical composites** — Aria, Sentinel, Mira are fictional; label every scenario surface "Hypothetical scenario." No real company names, products, logos, or customers (§5.2, §14).
- **"FIXTURE DATA — ILLUSTRATIVE ONLY" banner (CB-4).** Any build rendering fixture content (`BUILD_PROFILE=fixtures` — used for design review, screenshots, local dev, e2e) shows a persistent, unmissable page-level banner reading **"FIXTURE DATA — ILLUSTRATIVE ONLY."** Design this banner as a first-class state (distinct from, and in addition to, the "Hypothetical scenario" tag and the global disclaimer). The production build never shows it.
- **Placeholder ≠ real policy claims.** Any placeholder used before Phase 1 research must be visibly marked as draft/example and must never be styled to look like a verified, cited fact. Do not fabricate pin cites, dates, or source URLs in mockups; use obvious dummies (e.g., "Publisher — Example Title, Art. X (YYYY-MM-DD)") clearly flagged as placeholder.
- ADRS example numbers in mockups should use the **real §14 worked values** (inherent 66.25 → residual 47.0375 [displays 47.0] → EU final 56.445 [displays 56.4], etc.) so design matches the shipping fixtures and the §13.7 rounding convention.
- People/persona imagery, if any, must be generic and non-identifying; prefer no photos.
- Disclaimer and "Hypothetical" treatments are part of the design system, not afterthoughts.

---

## 17. Component Inventory (for the design system)

Header/Nav, DisclaimerBar, EpistemicLegend, Footer(as_of/build), JurisdictionCard, ScenarioCard(TierBadge), EpistemicBlock (3 variants), CitationPopover, ClassificationChips, ConfidenceChip, TierBadge, ObligationTypeBadge, ApproachTag, SourceTierBadge, ProvisionTable, InstrumentList, FilterBar, ControlCard, MappingChain, CompareMatrix, ADRSCalculator (DimensionInput, MitigationToggle, JurisdictionSelector, ArithmeticPanel, Permalink), ScenarioScorecard, ChangelogItem, GlossaryTerm(auto-link), BibliographyEntry, HypotheticalBanner, HumanReviewedIndicator, StalenessMarker, EmptyState, ErrorState, Skeleton.

Design P0 components first (EpistemicBlock, CitationPopover, ClassificationChips, ConfidenceChip, TierBadge, MappingChain, ADRSCalculator) — they carry the product's whole thesis and appear in the demo (§30).
