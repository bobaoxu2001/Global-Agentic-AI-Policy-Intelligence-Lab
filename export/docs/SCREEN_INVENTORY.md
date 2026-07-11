# AI Policy Atlas — Screen Inventory

**Derived from** the approved `AI Policy Atlas.dc.html`. 11 product screens + 1 Design System reference tab.
Routes below are the **intended production routes**; the prototype emulates them with a client-side tab router (`data-screen` sections). No screens are added or removed. All data is fictional fixture content.

**Global chrome on every screen** (see `FINAL_DESIGN_HANDOFF.md` §4): fixture banner, disclaimer bar, header + epistemic legend, primary nav, footer (distinct `as_of` vs `last_verified`). Not repeated per screen below.

**Legend:** *Data fields* name the content-model fields the screen consumes (SPEC §17). *AC refs* point to `ACCEPTANCE_CRITERIA.md`.

---

## 1 · Executive Dashboard — `/`

- **Purpose:** at-a-glance agentic-AI regulatory exposure across jurisdictions and hypothetical deployments; monitoring, not a risk verdict.
- **Primary task:** orient, spot recent status changes and stale verifications, jump into a scenario / jurisdiction / brief.
- **Components:** `StatusStrip` (corpus monitoring), `ScenarioCard` (worst-of-four tier), `ADRSTierBadge`, `CapabilityTag`, `JurisdictionCard` + `BindingnessTag`, `LifecycleChip`, recent-changes list, `Callout(inf)`, nav buttons.
- **Required data fields:** corpus counts (tracked instruments, jurisdictions, status-changes-30d, stale-count, corpus `last_verified`); per scenario: `title`, `fixture:true`, narrative, capability profile (C-id + intensity), rolled-up worst-of-four tier + per-jurisdiction finals; per jurisdiction: instrument count, bindingness posture; recent `changelog` entries (date, instrument, old→new, analyst).
- **Empty state:** if no scenarios/instruments, show "No published records in this build" panel (should not occur when fixtures load).
- **Loading state:** `Skeleton` rows in scenario list, jurisdiction cards, and changelog while data resolves.
- **Error state:** if corpus metadata fails, strip shows "—" with a non-blocking "metadata unavailable" note; page still renders.
- **Desktop:** two-column (scenarios ~1.15fr / jurisdictions + changes ~0.85fr); jurisdiction cards 2×2; status strip single row (**AC-DESK-1**).
- **Mobile:** columns stack (scenarios → jurisdictions → changes); status strip wraps to 2 rows; jurisdiction cards 2-up then 1-up; nav collapses to menu (**AC-MOB-1**).
- **Accessibility:** cards are real links/buttons; worst-of-four badge distinguishable by label; strip values have text keys, not color.
- **Interactions:** scenario card → `/scenarios/{slug}`; jurisdiction card → `/compare`; "full changelog" → `/changelog`; "Open executive brief" → brief.
- **AC refs:** AC-SCN-1 (rollup context), AC-STA-3 (recent changes), AC-LV-2 (stale marker), AC-DESK-1, AC-MOB-1. **No generic KPI cards** — every figure links to analysis (design constraint).

---

## 2 · Policy Tracker — `/instruments`

- **Purpose:** filterable, sortable list of tracked instruments (the corpus).
- **Primary task:** narrow to instruments by jurisdiction and bindingness; open one.
- **Components:** `FilterChip` (jurisdiction, bindingness), result `FilterCount`, `SortableTable`, `InstrumentTypeTag`, `BindingnessTag`, `LifecycleChip` (+ attained date), `StalenessFlag`, empty state, `Callout(inf)`.
- **Required data fields (per row):** `title` (+ `native_title`), `instrument_type`, `bindingness`, `lifecycle_status` + `status_date`, `last_verified`; `review_status='published'` gate; `jurisdiction`.
- **Empty state:** "No records match these filters" + "Clear filters" action + active-filter summary (**AC-TRK-4**). Table hidden, message shown.
- **Loading state:** skeleton table rows.
- **Error state:** if corpus fails to load, show error panel with retry; never a blank page.
- **Desktop:** full table, sticky header + sticky first column; no horizontal page scroll (**AC-DESK-1**).
- **Mobile:** table scrolls inside its container with frozen first column; filter chips wrap; count stays visible (**AC-MOB-1**).
- **Accessibility:** sortable headers expose `aria-sort`; chips are toggle buttons with pressed state; keyboard operable (**AC-A11Y-2, AC-TRK-5**).
- **Interactions:** see `INTERACTION_SPEC.md` §1 (filters OR-within-axis / AND-across-axes, URL-encoded state, sort with direction). Row → `/instruments/{slug}`.
- **AC refs:** AC-TRK-1..5. **Scope note:** in-list filtering only; no full-text primary-source search.

---

## 3 · Policy Instrument Detail — `/instruments/{slug}`

- **Purpose:** authoritative view of one instrument: classification, source, agentic-relevant provisions, supersession, history.
- **Primary task:** understand an instrument's status + bindingness and drill into a provision.
- **Components:** classification chips (`InstrumentTypeTag`, `BindingnessTag`, `LifecycleChip`+date, amendment event tag), `ReviewStamp`, `CitationBlock` (Tier-1 + dates + official/archived links), `Callout(caveat)`, epistemic page summary, `SortableTable` of provisions (`ObligationTag`, `CapabilityTag`, risk tag, `ConfidenceMeter`), supersession panel, change-history list, `Callout(open)` analyst note.
- **Required data fields:** `title`, `native_title` (+ `lang`), `instrument_type`, `bindingness`, `lifecycle_status`+`status_date`, `publication_date`, `effective_date`/`applies_from` (phased allowed), `last_verified`, `accessed_date`, authoritative `source` (publisher, title, pin cite/CELEX, tier, url, `archived_url`), `superseded_by_id`/`supersedes_id`, `key_dates` (incl. amendment events), provisions (pin cite, obligation type, paraphrase, capabilities, risks, confidence), page epistemic counts, review approval date.
- **Empty state:** instrument with no agentic-relevant provisions → "No agentic-relevant provisions mapped" in the table area.
- **Loading state:** skeleton for header chips, citation block, and table.
- **Error state:** unknown slug → static 404 with nav home/index (**AC-ERR-1**). Source link unreachable → CitationBlock shows "showing last verified copy" + archived link (**AC-CIT-4**).
- **Desktop:** header + chips full width; provision table full width; supersession + history two-up below.
- **Mobile:** chips wrap; table scrolls in-container; supersession/history stack.
- **Accessibility:** `native_title` carries correct `lang`; bindingness vs lifecycle visually distinct without color; epistemic summary readable.
- **Interactions:** provision row → `/provisions/{id}`; source links open in new tab (`rel="noopener"`).
- **AC refs:** AC-DET-1, AC-DET-2 (rescinded still visible, styled historical), AC-STA-1/2/4 (type≠status, amendment = event), AC-CIT-1/3, AC-LV-1, AC-REV-5, AC-EPI-4.

---

## 4 · Provision / Source Evidence Panel — `/provisions/{id}`

- **Purpose:** the epistemic-discipline showcase — one provision, its verbatim source, and the typed Fact→Inference→Recommendation chain, with a **persistent** evidence pane.
- **Primary task:** read a provision, verify its source, follow the reasoning to a recommended control.
- **Components:** `Reader` (3-pane: `OutlineNav` · reading column · `EvidencePanel`), `OutlineLink`, verbatim quote block (+ `SourceTierTag`, footnote markers), `EpistemicBlock` ×3 (fact/inference/recommendation), `ConfidenceMeter`, `MappingStrengthTag`, `MappingRelationTag`, `CapabilityTag`, `CitationBlock` (in pane), claim worklist (`ReviewStamp`/`StalenessFlag`/`draft`), `Callout(open)` unresolved question, export button.
- **Required data fields:** provision `quote_verbatim` (≤50 words / ≤350 chars, correct `lang`), `quote_translated` + `translation_source_id` + flag if present, paraphrase, citation (publisher, pin cite, tier, url, `archived_url`, `accessed_date`, `last_verified`, review status), typed chain: fact (citation + confidence), inference (`based_on`, confidence ≤ min(based_on), rationale), recommendation (control id, strength ∈ {direct,derived,prudential}, relation ∈ {satisfies_in_part,supports_evidence,implements_general_duty}, rationale — **no confidence**), unresolved questions.
- **Empty state:** provision with no mapped control → chain stops at Inference with "no control mapped yet" note (publish gate normally prevents this — AC-REV-2).
- **Loading state:** skeleton in all three panes.
- **Error state:** unknown id → 404 (**AC-ERR-1**); source unreachable → pane shows archived copy fallback (**AC-CIT-4**).
- **Desktop:** three panes side-by-side (outline 196 / reading flex / evidence 296).
- **Mobile:** panes stack — document → provision → evidence accordion; footnote markers become tap-to-expand (see `RESPONSIVE_BEHAVIOR.md`).
- **Accessibility:** verbatim quote carries `lang` (**AC-A11Y-4**); footnote markers keyboard-focusable; evidence pane reachable and, when drawered on mobile, dismissible via Esc; epistemic kinds distinguishable by glyph+text.
- **Interactions:** footnote marker → scrolls matching source into evidence pane (`INTERACTION_SPEC.md` §2); outline link selects provision; "Open in control mapper" → mapper; "Export to brief" → brief flow.
- **AC refs:** AC-DET-3/4, AC-CIT-1/2/3, AC-EPI-1/2/3, AC-CONF-1/4, AC-MAP-1/2, AC-LV-2, AC-REV-5.

---

## 5 · Jurisdiction Comparison — `/compare`

- **Purpose:** cross-jurisdiction matrix of currently-applicable binding provisions per capability (or risk).
- **Primary task:** compare how the four jurisdictions regulate a capability; drill into a cell.
- **Components:** rows toggle (`FilterChip`: Capabilities / Risks), `CompareMatrix` (`SortableTable` variant, sticky first column), `CapabilityTag`, cell counts with density highlight, drill links, `Callout(inf)` + `Callout(caveat)`, whole-view ▲ inference label.
- **Required data fields:** per (capability|risk) × jurisdiction: count of provisions meeting **currently-applicable binding** definition (SPEC §13.5: bindingness=binding AND lifecycle ∈ {fully, partially applicable} AND `applies_from` ≤ reference date=build date); **no capability-intensity threshold** (MD-11). Drill target: filtered provision list for that cell.
- **Empty state:** a **0-cell renders "0" (never blank)** with explanatory tooltip; drill-down of a 0-cell shows an empty-list state, not an error (**AC-CMP-3**).
- **Loading state:** skeleton matrix.
- **Error state:** matrix data failure → error panel + retry.
- **Desktop:** full matrix, columns = 4 jurisdictions, sticky first column.
- **Mobile:** horizontal scroll within container, frozen capability column (**AC-MOB-1**).
- **Accessibility:** whole view labeled ▲ analytical inference; counts are text; highlighted cells not distinguished by color alone (weight + value).
- **Interactions:** rows toggle recomputes rows to R1–R12 (**AC-CMP-4**); non-zero cell → filtered provision list (**AC-CMP-2**); see `INTERACTION_SPEC.md` §3.
- **AC refs:** AC-CMP-1..4. Constraint: **no decorative map** — comparison is a readable table.

---

## 6 · Agent Scenario Detail — `/scenarios/{slug}`

- **Purpose:** evaluate one hypothetical agent deployment across all four jurisdictions.
- **Primary task:** read the scenario, see per-jurisdiction ADRS, driving provisions, recommended controls; open the calculator.
- **Components:** `HypotheticalTag` (in addition to global disclaimer), narrative, `CapabilityTag` profile (C-id + intensity), 4× per-jurisdiction ADRS scorecard (`ADRSTierBadge` + `BindingnessTag`), `Callout(inf)` (invariance note), read-only `ADRSWorksheet` (dimension, score, anchor, contribution) + `StatusStrip` (inherent/credit/residual/J/final), top-provisions list (`EpistemicBadge`+`SourceTierTag`), recommended-control tags, `Callout(open)` unresolved, deep-link button.
- **Required data fields:** scenario `title`, `fixture:true`, narrative, capability profile; per jurisdiction assessment: five dimension scores + anchor text + justification, mitigation set + evidence, four J components + justification, `assessed_date`, review status, computed inherent/credit/residual/J/final/tier (derived, never author-supplied — **AC-INV-3**); top-5 provisions; control mappings.
- **Empty state:** n/a for published scenarios (only 3 exist); if a jurisdiction assessment missing → "assessment pending" card.
- **Loading state:** skeleton scorecards + worksheet.
- **Error state:** unknown slug → 404.
- **Desktop:** capability chips row; 4 scorecards in a row; worksheet (~1.4fr) beside provisions/controls/unresolved (~1fr).
- **Mobile:** scorecards 2×2 then 1-up; worksheet full width; side column stacks below.
- **Accessibility:** hypothetical banner announced; scores have text tier labels; worksheet is a real table.
- **Interactions:** "Open in calculator (prefilled)" → `/risk-score` prefilled from this worksheet with provenance (**AC-SCN-4, AC-ADRS-11**); provision rows → provision; "See policy→control mapping" → mapper.
- **AC refs:** AC-SCN-1/2/3/4, AC-ADRS-11, AC-INV-3/7 (A/T/R invariance; D/E may diverge only with justification), AC-JUR-3.

---

## 7 · ADRS Calculator — `/risk-score`

- **Purpose:** live, deterministic Agent-Deployment Risk Score computation.
- **Primary task:** set dimensions, toggle mitigations and J components, read the score and its arithmetic update instantly.
- **Components:** `Callout(caveat)` header, `DimensionScorer` ×5 (`SegmentedControl` 0–4 + anchor text + contribution), `MitigationToggle` ×9 (credit shown), jurisdiction reference selector (`FilterChip`) + `Callout(inf)` reference note, `JComponentToggle` ×4, live arithmetic panel (`aria-live`) with big `ADRSTierBadge` + inherent/credit/residual/J/final + cap warning, tier-boundary legend, permalink + export buttons, live-text summary.
- **Required data fields:** initial state (prefill from a scenario assessment or URL params: 5 dims, mitigation set, 4 J components, jurisdiction); static: anchor text per dimension level (SPEC §13.3), credit weights, J weights, tier boundaries. **No network call** — pure client compute (**AC-ADRS-6**).
- **Empty state:** default state = all dims 0, no mitigations, J=1.00 → Final 0.0 Low (if opened cold without prefill).
- **Loading state:** none needed (client-only); if hydrating from params, render defaults then apply.
- **Error state:** out-of-range param (e.g. `A=9`) → clamp/reset that dimension with non-blocking notice; never render out-of-range score, never throw (**AC-ERR-2**).
- **Desktop:** inputs column beside the sticky arithmetic panel (**AC-DESK-1**).
- **Mobile:** single column; segmented scorers full-width; arithmetic panel + tier badge pinned visible (sticky bottom) (**AC-MOB-2**).
- **Accessibility:** segmented controls are buttons with `aria-pressed`; result panel is `aria-live="polite"` (**AC-A11Y-4**); anchor text shown for selected level (**AC-ADRS-5**); keyboard operable.
- **Interactions:** full logic in `INTERACTION_SPEC.md` §4–6 (dimensions, mitigations w/ cap, jurisdiction-ref selection separate from J, J toggles). Permalink encodes state (**AC-ADRS-8**); export → brief.
- **AC refs:** AC-ADRS-1..12, AC-CAP-1/2, AC-JUR-1/2/3/4, AC-ERR-2. **Do not modify ADRS logic** (see handoff §6).

---

## 8 · Policy-to-Control Mapper — `/controls` (mapping view)

- **Purpose:** show the full provision → capability → control chain and mapping conflicts.
- **Primary task:** see which controls address which provisions, with strength/relation and conflicts.
- **Components:** `ControlCard` (name, `MappingStrengthTag`, `MappingRelationTag`, description, driving-provision links + `SourceTierTag`), conflict `ControlCard` variant, `EpistemicBlock(rec)` for options analysis, export button.
- **Required data fields:** per control: id, name, description, mappings [{provision_id, strength ∈ {direct,derived,prudential}, relation ∈ {satisfies_in_part,supports_evidence,implements_general_duty}, rationale, source tier}]; `mapping_conflicts` records (both provision ids + options analysis, typed ● recommendation).
- **Empty state:** control with no mappings → excluded (publish gate) or "no provisions mapped" note.
- **Loading state:** skeleton cards.
- **Error state:** data failure → error panel.
- **Desktop:** two-column card grid; conflict card visually flagged; options-analysis block full width.
- **Mobile:** single-column cards; tags wrap.
- **Accessibility:** strength/relation are text tags; conflict flagged by text + shape, not color alone.
- **Interactions:** filter by category/mitigation class/jurisdiction narrows list (**AC-MAP-4**, `INTERACTION_SPEC.md` §7); provision links → provision; export → brief.
- **AC refs:** AC-MAP-1/2/3/4. Recommendations never claim "makes you compliant" (**AC-MAP-2**).

---

## 9 · Executive Brief — `/scenarios/{slug}/brief`

- **Purpose:** one-page decision brief for a scenario; print/PDF-ready.
- **Primary task:** read the bottom-line recommendation, per-market scorecard, drivers, and required pre-launch controls.
- **Components:** `EpistemicBlock(rec)` bottom line, key-findings `EpistemicBlock` ×3 (fact/inference/rec), `ADRSTierBadge` scorecard table, required-before-launch list (`CapabilityTag` control refs), `Callout(open)` open questions, `Callout(caveat)` print note, print/copy-link buttons.
- **Required data fields:** scenario title, one-sentence answer (● rec), 4-col scorecard (jurisdiction, ADRS tier badge, top binding obligation one-line + citation, gating control) — **figures must match the stored published assessment** (**AC-BRF-2**), three drivers (■/▲ labeled), two "what changes the answer" bullets, ask/next step, footer (disclaimer + `as_of` + link to full scenario).
- **Empty state:** n/a (brief exists only for published scenarios).
- **Loading state:** skeleton scorecard.
- **Error state:** missing export asset → link disabled with "coming soon" note (**AC-ERR-4**).
- **Desktop:** main column (bottom line + findings) beside scorecard sidebar.
- **Mobile:** single column; scorecard table scrolls in-container.
- **Accessibility & print:** print styles retain ■▲● glyphs, tiers, dates, and the caveat; color never the sole carrier (**AC-BRF-3, NFR-9**).
- **Interactions:** "Print / PDF" → print stylesheet; finding "source →" → provision; export from other screens lands here (`INTERACTION_SPEC.md` §8).
- **AC refs:** AC-BRF-1/2/3, AC-ADRS-9.

---

## 10 · Methodology — `/methodology`

- **Purpose:** document how the numbers mean what they mean; the epistemic and scoring rules.
- **Primary task:** understand the ADRS formula, tiers, jurisdiction-vs-J separation, epistemic discipline, invariance, source tiers.
- **Components:** prose sections, inline `code` formula blocks, settled-decisions list (MD-1…MD-12), `SourceTierTag` legend, `EpistemicBadge` inline, `Callout(open)` unresolved-questions register.
- **Required data fields:** static methodology content (mirrors `METHODOLOGY_DECISIONS.md` / SPEC §13); unresolved-questions register.
- **Empty state / loading / error:** static content; none required.
- **Desktop:** two-column (prose ~1.3fr / reference sidebar ~1fr).
- **Mobile:** single column, sidebar below prose.
- **Accessibility:** semantic headings; formulae in `code`; readable measure.
- **Interactions:** internal anchors; no data interactions.
- **AC refs:** anchors AC-ADRS-7/12, AC-CAP, AC-JUR, AC-CONF, MD decisions. **Content preserved exactly.**

---

## 11 · Changelog — `/changelog`

- **Purpose:** reverse-chronological record of policy status changes and re-verifications.
- **Primary task:** see what changed, when, sourced, and by which analyst.
- **Components:** `SortableTable`, `LifecycleChip` (old→new), `ReviewStamp`, `SourceTierTag` links, `Callout(inf)`.
- **Required data fields (per entry):** `date`, `instrument`, change (old→new status) or re-verification event, `source` (+ tier, link), `analyst`. Re-score entries show version bump + link to superseded version (**MD-4**).
- **Empty state:** an empty period shows explicit "no changes in this period" rather than a blank table.
- **Loading state:** skeleton rows.
- **Error state:** data failure → error panel.
- **Desktop:** full table.
- **Mobile:** table scrolls in-container.
- **Accessibility:** old→new uses chips with text; strikethrough for historical carries text too.
- **Interactions:** source links open in new tab; (optional) sort by date.
- **AC refs:** AC-STA-3, AC-LV-3, AC-6.

---

## 12 · Design System (reference tab) — `/design-system`

- **Purpose:** in-product reference for tokens, component inventory, behavior specs, responsive/a11y, states, and the 3-minute walkthrough. **Not a product screen** — an engineering/design reference surface.
- **Contents:** token swatches; the five disjoint semantic systems; typography; reusable component inventory; behavior specs (tables/badges/evidence panel); empty/loading/error state samples; responsive + mobile notes; accessibility notes; the timed three-minute interview walkthrough (four beats linking to provision → compare → calculator → mapper/brief).
- **States:** static.
- **AC refs:** cross-cutting (mirrors these docs).
