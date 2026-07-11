# AI Policy Atlas — Component Inventory

**Derived from** the approved `AI Policy Atlas.dc.html`. This catalogs the reusable components the design implies. Props are the **design contract** (names are guidance for engineering, not a required API). Each entry lists: props · variants · state behavior · semantic color system · source-data requirements · reuse locations.

**Semantic-system key** (full values in `DESIGN_TOKENS.md`): `Epistemic` · `Lifecycle` · `Bindingness` · `SourceTier` · `ADRSTier` · `Confidence(neutral)` · `none`. **These five color systems never share a hue; confidence is neutral fill-density.**

---

## A. Epistemic & evidence

### EpistemicBadge
- **Props:** `kind` ('fact'|'inference'|'recommendation'), `label?` (default derived), `compact?`.
- **Variants:** fact ■ (blue), inference ▲ (violet), recommendation ● (teal); compact = glyph only (still has aria-label).
- **State:** static.
- **Semantic system:** **Epistemic**. Glyph + text always present.
- **Source data:** the block's epistemic `kind`.
- **Reuse:** legend (header), provision chain, dashboard scenario rows, brief findings, mapper, methodology, compare label, instrument summary.

### EpistemicBlock
- **Props:** `kind`, `children`, `confidence?` (fact/inference only), `sourceTier?`, `strength?`+`relation?` (recommendation only), `basedOn?`.
- **Variants:** `epb-fact` (left border blue), `epb-inf` (violet), `epb-rec` (teal).
- **State:** static; may host footnote markers that drive `EvidencePanel`.
- **Semantic system:** **Epistemic** (border/badge) + **Confidence(neutral)** for fact/inference. **No confidence chip on recommendation** (**AC-EPI-3**).
- **Source data:** claim text; for fact: ≥1 citation + confidence; inference: `based_on` + confidence ≤ min(based_on); recommendation: control id + strength + relation + rationale.
- **Reuse:** provision chain (screen 4), brief (screen 9), mapper options-analysis (screen 8).

### ConfidenceMeter
- **Props:** `level` ('high'|'medium'|'low') → fill fraction (100% / 55% / 25%), `label?`.
- **Variants:** three fill densities.
- **State:** static.
- **Semantic system:** **Confidence(neutral)** — greyscale density only; **never** a risk/epistemic hue.
- **Source data:** claim `confidence`.
- **Reuse:** provision table, provision chain, compare rows, brief findings.

### CitationBlock
- **Props:** `tier` (1|2|3), `publisher`, `title`, `pinCite`, `publicationDate`, `effectiveDate?`, `lastVerified`, `accessedDate`, `url`, `archivedUrl`, `reviewStatus?`.
- **Variants:** inline block (instrument detail) · pane card (evidence panel).
- **State:** link may show unreachable → "showing last verified copy" + archived fallback (**AC-CIT-4**).
- **Semantic system:** **SourceTier** (chip). Format: `Publisher — *Title*, pin cite (date). [link] [archive] · accessed {date} · Tier {n}` (**AC-CIT-1**).
- **Source data:** `source` record; Tier 1 requires `archived_url` (**AC-CIT-4, AC-MSRC-3**); Tier 3 may never be a fact's citation (**AC-CIT-2**).
- **Reuse:** instrument detail, evidence panel, brief scorecard.

### EvidencePanel
- **Props:** `activeFootnote`, `source`, `quoteVerbatim`, `lang?`, `claimWorklist[]`, `unresolved?`, `mode` ('persistent'|'drawer').
- **Variants:** persistent right pane (desktop) · dismissible drawer/accordion (mobile).
- **State:** footnote marker click scrolls matching source into view + highlights marker; drawer opens/closes; Esc-dismiss in drawer mode (**AC-A11Y-2**).
- **Semantic system:** **SourceTier** + **Epistemic** (worklist) + **Confidence(neutral)**.
- **Source data:** verbatim ≤50-word quote (correct `lang`), tier, official + archived links, accessed/verified dates, per-claim review status, unresolved questions.
- **Reuse:** provision screen (4); drawer form used wherever evidence is inspected on mobile.

---

## B. Status & classification

### LifecycleChip
- **Props:** `status` ('proposed'|'adopted'|'partial'|'full'|'historical'), `attainedDate?`, `showDate?`.
- **Variants:** five ramp steps; historical adds strikethrough on the *label text* (not the dot).
- **State:** static.
- **Semantic system:** **Lifecycle** (neutral→amber→green). Dot + text + date.
- **Source data:** `lifecycle_status` + `status_date` (**AC-STA-2**). Amendment is **not** a status — rendered as a timeline event (**AC-STA-4**).
- **Reuse:** tracker, instrument detail, dashboard changes, changelog, scenario, outline.

### BindingnessTag
- **Props:** `level` ('binding'|'conditional'|'non-binding'), `showLabel?`.
- **Variants:** `bind-b` solid dark · `bind-c` dashed outline · `bind-n` light. **Distinguished by shape/weight, never hue** (this is the whole point).
- **State:** static.
- **Semantic system:** **Bindingness** (non-color).
- **Source data:** `bindingness`. Independent of lifecycle (**AC-STA-1/2**).
- **Reuse:** tracker, instrument detail, jurisdiction cards, scenario scorecards, compare, brief.

### InstrumentTypeTag
- **Props:** `type` (enum: regulation, enacted_law, regulator guidance, proposed legislation, voluntary framework, …).
- **Variants:** single neutral chip style.
- **State:** static.
- **Semantic system:** `none` (neutral). Independent of bindingness & lifecycle.
- **Source data:** `instrument_type` (enum; invalid values fail build — **AC-INV-1**).
- **Reuse:** tracker, instrument detail.

### ObligationTag
- **Props:** `type` ('obligation'|'prohibition'|'right'|'definition'|'enforcement'|'scope').
- **Variants:** neutral/indigo default; `prohib` red-ish; `right` green-ish; `def` violet-ish; each still text-labeled.
- **State:** static.
- **Semantic system:** `none` (content taxonomy; not one of the five semantic risk systems).
- **Source data:** provision obligation type.
- **Reuse:** instrument provision table, provision detail.

### SourceTierTag
- **Props:** `tier` (1|2|3).
- **Variants:** `t1` filled dark · `t2` grey · `t3` outline. Always "TIER n" / "Tn" text.
- **State:** static.
- **Semantic system:** **SourceTier**.
- **Source data:** source `tier`.
- **Reuse:** citation blocks, evidence pane, compare drill, mapper, changelog, provision chain, brief.

### ReviewStamp
- **Props:** `date`, `analyst?`, `kind` ('reviewed'|'verified').
- **Variants:** reviewed / verified (✓ prefix).
- **State:** static.
- **Semantic system:** `none` (green ✓ semantic is review-positive, distinct from lifecycle/risk).
- **Source data:** review-log `approved`/`re_verified` entry + date (**AC-REV-4/5**).
- **Reuse:** instrument detail, provision worklist, scenario, brief, changelog.

### StalenessFlag
- **Props:** `lastVerified`, `thresholdDays` (default 180).
- **Variants:** shows only when `last_verified` > threshold.
- **State:** derived from date vs build date.
- **Semantic system:** `none` (amber ⚠ freshness signal — a data-freshness cue, explicitly not a lifecycle or risk color).
- **Source data:** `last_verified` (**AC-LV-2**).
- **Reuse:** tracker, dashboard strip, provision worklist.

### HypotheticalTag
- **Props:** `text?` (default "HYPOTHETICAL SCENARIO").
- **Variants:** full / short ("HYPOTHETICAL").
- **State:** static.
- **Semantic system:** `none` (amber caution, aligned with fixture treatment).
- **Source data:** scenario `fixture:true` / hypothetical flag.
- **Reuse:** dashboard scenario cards, scenario detail, brief.

---

## C. ADRS & scoring

### ADRSTierBadge
- **Props:** `tier` ('low'|'moderate'|'high'|'critical'), `label`, `size?`.
- **Variants:** four ramp steps green→yellow→orange→red.
- **State:** in the live calculator, updates from the recompute (tier derived from **raw** score) (**AC-ADRS-7**).
- **Semantic system:** **ADRSTier**.
- **Source data:** tier from full-precision Final score.
- **Reuse:** dashboard, scenario scorecards, calculator, brief.

### ADRSWorksheet (read-only)
- **Props:** `dimensions[]` ({key, score, anchorText, contribution}), `inherent`, `credit`, `residual`, `j`, `final`, `tier`, `assessedDate`, `reviewStatus`.
- **Variants:** read-only (scenario). Interactive form is `ADRSCalculator`.
- **State:** static snapshot of a stored published assessment.
- **Semantic system:** **ADRSTier** (final) + `none` (table).
- **Source data:** stored assessment; computed fields are derived, never author-supplied (**AC-INV-3**).
- **Reuse:** scenario detail (screen 6).

### ADRSCalculator (interactive)
- **Props:** `initial` (dims, mitigations, jComponents, jurisdiction), `prefillProvenance?`.
- **Sub-components:** `DimensionScorer` ×5, `MitigationToggle` ×9, jurisdiction reference selector, `JComponentToggle` ×4, live arithmetic panel.
- **State:** live client-side recompute on every input; deterministic; no network (**AC-ADRS-6**); out-of-range params clamp with notice (**AC-ERR-2**); permalink encodes full state (**AC-ADRS-8**).
- **Semantic system:** **ADRSTier** (result) + `none` (controls); jurisdiction chips neutral.
- **Source data:** anchor text per level (SPEC §13.3), credit weights, J weights, tier boundaries (all static constants — **do not modify**).
- **Reuse:** calculator screen (7). See `INTERACTION_SPEC.md` §4–6.

### DimensionScorer
- **Props:** `dimension` ('A'|'T'|'D'|'E'|'R'), `weight`, `value` (0–4), `anchors[5]`, `jurisdictionInvariant?` (A/T/R true).
- **Variants:** by dimension; shows weight + live contribution `w·s·25`.
- **State:** `SegmentedControl`, integer-only selection; selecting a level shows that level's anchor text (**AC-ADRS-5**); one selected at a time; `aria-pressed`.
- **Semantic system:** `none`.
- **Source data:** anchor text (SPEC §13.3). A/T/R are jurisdiction-invariant; D/E may diverge only with justification (**AC-INV-7, MD-12**).
- **Reuse:** calculator.

### MitigationToggle
- **Props:** `mitigation` (M1–M9), `credit`, `on`.
- **Variants:** on/off checkbox tile; credit label.
- **State:** toggles; contributes to `Σ credit` then `min(0.40, …)`; UI shows cap-binding warning when sum > 0.40 (**AC-CAP-1**).
- **Semantic system:** `none`.
- **Source data:** credit weights (M1 .10 … M9 .03). Only implemented+evidenced mitigations earn credit (**MD-6**).
- **Reuse:** calculator.

### JComponentToggle
- **Props:** `component` ('binding_hit'|'near_term_hit'|'enforcement_posture'|'prohibition_adjacent'), `weight`, `on`, `justification?`.
- **Variants:** on/off tile with +weight.
- **State:** toggles; contributes to `J = 1 + Σ`, clamped `min(1.30, …)` (**AC-JUR-2**). **Never auto-set by jurisdiction selection** (**AC-ADRS-10, CB-3**). `enforcement_posture`/`prohibition_adjacent` are typed ▲ inference (**AC-JUR-3**).
- **Semantic system:** `none` (but J readings carry an Epistemic ▲ label).
- **Source data:** J weights; stored component values + evidence when prefilled (**AC-ADRS-11**).
- **Reuse:** calculator.

---

## D. Mapping & controls

### ControlCard
- **Props:** `id`, `name`, `description`, `strength` ('direct'|'derived'|'prudential'), `relation` ('satisfies_in_part'|'supports_evidence'|'implements_general_duty'), `provisions[]` (id + tier), `conflict?`.
- **Variants:** standard · conflict (flagged with ⚠ + text, warm border).
- **State:** static; provision links navigate.
- **Semantic system:** **SourceTier** (provision refs) + `MappingStrength`/`MappingRelation` tags (neutral taxonomies). Recommendations never claim compliance (**AC-MAP-2**).
- **Source data:** control + mappings; `mapping_conflicts` cite both provisions (**AC-MAP-3**).
- **Reuse:** mapper (screen 8), scenario recommended-controls (as tags).

### MappingStrengthTag / MappingRelationTag
- **Props:** `value`.
- **Variants:** direct/derived/prudential · satisfies_in_part/supports_evidence/implements_general_duty.
- **State:** static.
- **Semantic system:** `none` (mono taxonomy chips).
- **Source data:** mapping fields.
- **Reuse:** provision chain, mapper.

### MappingChain
- **Props:** `fact`, `inference`, `recommendation` (each an `EpistemicBlock`), connectors.
- **Variants:** vertical chain with "based on ↓ therefore" connectors.
- **State:** static; footnotes drive evidence pane.
- **Semantic system:** **Epistemic**.
- **Source data:** the typed chain; no link skipped (**AC-MAP-1**).
- **Reuse:** provision detail (screen 4).

### CapabilityTag
- **Props:** `id` (C1–C9), `label?`, `intensity?` (0–4, scenario profiles).
- **Variants:** id-only · id+label · id+intensity.
- **State:** static.
- **Semantic system:** `none` (indigo taxonomy chip).
- **Source data:** capability id (+ intensity in scenarios).
- **Reuse:** instrument table, compare rows, scenario profile, mapper, dashboard cards.

---

## E. Data display & navigation

### SortableTable
- **Props:** `columns[]` ({key, label, sortable?, numeric?}), `rows[]`, `sort` ({key, dir}), `stickyHeader?`, `stickyFirstCol?`, `onRowClick?`.
- **Variants:** tracker list · compare matrix · changelog · brief scorecard.
- **State:** header click cycles sort direction, sets `aria-sort`; row hover; whole row is the link when `onRowClick`.
- **Semantic system:** `none` (hosts other tagged components in cells).
- **Source data:** row records. Numeric columns monospace, right-aligned.
- **Reuse:** screens 2, 5, 11, 9.

### CompareMatrix
- **Props:** `rowsMode` ('capabilities'|'risks'), `jurisdictions[4]`, `cells[][]` (counts), `onCellDrill`.
- **Variants:** capabilities rows / risks rows.
- **State:** rows toggle recomputes (**AC-CMP-4**); non-zero cell drills; 0-cell renders "0" + tooltip (**AC-CMP-3**).
- **Semantic system:** `none` (density highlight by weight, not a semantic hue) + whole-view ▲ Epistemic label.
- **Source data:** per cell = count of currently-applicable binding provisions (SPEC §13.5, no intensity threshold — **AC-CMP-1**).
- **Reuse:** compare (screen 5).

### StatusStrip
- **Props:** `cells[]` ({key, value}).
- **Variants:** dark monospace strip (1a heritage). **Dashboard only.**
- **State:** static monitoring readout.
- **Semantic system:** `none` (values may include a staleness cue).
- **Source data:** corpus metadata.
- **Reuse:** dashboard (screen 1) exclusively — never the app's primary layout.

### FilterChip
- **Props:** `label`, `on`, `axis?`, `value?`.
- **Variants:** filter (tracker) · segmented option (compare rows) · jurisdiction reference (calculator).
- **State:** toggle with pressed style; keyboard operable.
- **Semantic system:** `none`.
- **Source data:** filter facets.
- **Reuse:** tracker (screen 2), compare (5), calculator jurisdiction selector (7), mapper filters (8).

### OutlineNav / OutlineLink
- **Props:** `items[]`, `active`.
- **Variants:** provision outline.
- **State:** selecting sets active; scroll target.
- **Semantic system:** `none`.
- **Source data:** instrument's provisions + lifecycle summary.
- **Reuse:** provision reader (screen 4).

---

## F. Framing & feedback

### FixtureBanner
- **Props:** none (fixed copy).
- **Variants:** one. Non-dismissible in `fixtures` build profile.
- **State:** persistent on every screen; `role="status"`.
- **Semantic system:** `none` (hazard amber, unique to fixtures — reserved, not reused for data meaning).
- **Source data:** build profile (**AC-INV-8, CB-4**).
- **Reuse:** app shell (all screens).

### Callout
- **Props:** `variant` ('inf'|'open'|'caveat'), `children`.
- **Variants:** `inf` (neutral, ▲-led inference/context note) · `open` (amber, unresolved question) · `caveat` (dark, methodological caveat).
- **State:** static.
- **Semantic system:** `none` (framing surfaces; the ▲ inside `inf` carries Epistemic meaning).
- **Source data:** authored note / unresolved-question register.
- **Reuse:** most screens.

### Skeleton
- **Props:** `w`, `h`.
- **Variants:** line / block shimmer; respects `prefers-reduced-motion` (no animation).
- **State:** loading placeholder.
- **Semantic system:** `none`.
- **Source data:** none.
- **Reuse:** all data-loading screens.

### EmptyState / ErrorState
- **Props:** `message`, `action?`.
- **Variants:** empty (neutral, explicit sentence + action) · error (warm, fallback/retry). 404 is a static page (**AC-ERR-1**).
- **State:** conditional render.
- **Semantic system:** `none`.
- **Source data:** query result / fetch status.
- **Reuse:** tracker, compare (0-cell drill), instrument/provision (404), calculator (bad params), brief (missing asset), changelog (empty period).
