# AI Policy Atlas — Interaction Spec

**Derived from** the approved `AI Policy Atlas.dc.html` — the logic below matches the prototype's behavior. This is a behavior contract, **not production code**. The methodology (ADRS formula, credits, cap, J, tiers) is preserved exactly; **do not modify it**.

**Numeric convention (SPEC §13.7):** compute at full floating-point precision, no intermediate rounding; display 1 dp; **tier from the raw score**; display values never re-enter the formula. Tests assert full-precision values ±0.001.

Contents: §1 tracker filters & sorting · §2 evidence side panel · §3 jurisdiction comparison · §4 ADRS calculator · §5 mitigation controls · §6 jurisdiction reference selection · §7 policy-to-control mapper · §8 export-to-brief · §9 fixture-data banner.

---

## 1. Policy tracker — filters & sorting

**Facets (prototype):** jurisdiction (EU/US/SG/CN) and bindingness (binding/conditional/non-binding). Production extends to type/approach facets per **AC-TRK-2/3** with identical semantics.

**Filter logic (AC-TRK-3, OD-2):**
- **OR within an axis** — selecting EU and US shows instruments in EU *or* US.
- **AND across axes** — jurisdiction selection AND bindingness selection both apply.
- No selection in an axis = that axis is unconstrained.

**Behavior:**
1. Clicking a filter chip toggles its `on` state and its membership in the axis's set, then re-renders.
2. The result **count** ("N of M") updates on every change (**AC-TRK-2**).
3. Production **encodes filter state in the URL** (`?j=EU,US&b=binding`) so it is shareable/restorable (**AC-TRK-2**).
4. **Clear all** empties every axis and clears chip states.
5. **Empty result** → hide the table, show "No records match these filters" + "Clear filters" action + active-filter summary (**AC-TRK-4**). Never a blank page or error.

**Sorting (AC-TRK-5):**
- Sortable columns: title, jurisdiction, lifecycle, last-verified (prototype); production adds status-date.
- Clicking a header: if already the sort key, **flip direction**; else set it as key with a default direction.
- The active header exposes `aria-sort="ascending|descending"`; the arrow indicator reflects direction.
- Lifecycle sorts by a defined status order (proposed → adopted → partial → full); dates sort chronologically.
- **Staleness:** rows with `last_verified` > 180 days show a staleness flag; this is a display cue, independent of sort (**AC-LV-2**).

---

## 2. Evidence side panel

**Model:** a **persistent** right pane on desktop (never a transient popover); a dismissible drawer/accordion on smaller widths (see `RESPONSIVE_BEHAVIOR.md`).

**Behavior:**
1. Provision content contains footnote markers (`[1]`, `[2]`, …) on facts, quotes, and inferences.
2. Clicking/activating a marker shows the **matching source panel** in the evidence pane and highlights the active marker; other panels hide.
3. Each source panel shows: `SourceTierTag`, publisher + title, pin cite, **verbatim ≤50-word quote** (correct `lang`), official link + **archived link**, `accessed_date` + `last_verified`, review status (**AC-CIT-1, AC-DET-3**).
4. Below sources: the **claim worklist** — each claim with its epistemic badge and review status (reviewed ✓ / recheck ⚠ / draft), and the **unresolved-question** callout.
5. **Keyboard:** markers are focusable and operable; in drawer mode the pane is focus-managed and **dismissible with Esc** (**AC-A11Y-2**).
6. **Source unreachable:** panel shows "showing last verified copy ({date})" with the archived link as fallback; never a broken state (**AC-CIT-4**).
7. **Translated quote:** when `quote_translated` exists, show original + translation, flag the translation, name its source, and cap confidence ≤ medium (**AC-DET-4, AC-CONF-1**).

---

## 3. Jurisdiction comparison

**Behavior:**
1. **Rows toggle** switches the matrix rows between **capabilities (C1–C9)** and **risks (R1–R12)**; cells recompute for the chosen row set (**AC-CMP-4**).
2. Columns are the four jurisdictions. Each **cell = count of currently-applicable binding provisions** for that (row × jurisdiction), per SPEC §13.5: `bindingness = binding` AND `lifecycle ∈ {fully, partially applicable}` AND `applies_from ≤ reference date` (reference date = **build date**). **No capability-intensity threshold** — the matrix describes jurisdictions, not an agent (**AC-CMP-1, MD-11**).
3. The **whole view is labeled ▲ analytical inference** (equivalence across legal systems is inference, never fact).
4. **Non-zero cell** → drill to a filtered provision list for that capability×jurisdiction (**AC-CMP-2**).
5. **Zero cell** renders **"0" (never blank)** with an explanatory tooltip ("no currently-applicable binding provision maps here — not 'unregulated'"); its drill-down shows an **empty-list state** (**AC-CMP-3**).
6. Density highlight on higher-count cells uses weight/shade, **not** a semantic hue.
7. Counts change only when lifecycle/applicability changes — never from analyst opinion.

---

## 4. ADRS calculator (live)

**Constants (do not modify — SPEC §13):** weights A .25 / T .20 / D .20 / E .15 / R .20; credits M1 .10, M2 .08, M3 .07, M4 .06, M5 .05, M6 .04, M7 .04, M8 .03, M9 .03; credit cap 0.40; J components binding_hit .10, near_term_hit .05, enforcement_posture .05, prohibition_adjacent .10; J cap 1.30; tiers Low [0,25) · Moderate [25,50) · High [50,75) · Critical [75,100].

**Recompute (runs on every input change, client-side, no network — AC-ADRS-6):**
```
Inherent  = Σ over {A,T,D,E,R} of weight · score · 25
Credit    = min(0.40, Σ credit of ON mitigations)
Residual  = Inherent · (1 − Credit)
J         = min(1.30, 1 + Σ weight of ON J-components)
Final     = min(100, Residual · J)
Tier      = band of Final by half-open intervals (from RAW Final)
```
**Behavior:**
1. Each dimension is an integer **segmented control 0–4** — no between-anchor values (**AC-ADRS-5**). Selecting a level marks it `on` (`aria-pressed`), displays that level's **anchor text** (SPEC §13.3), and updates the per-dimension contribution `w·s·25`.
2. The arithmetic panel updates **instantly**: per-dimension contributions, Inherent, Credit, Residual, J, Final, and the `ADRSTierBadge` (**AC-ADRS-6**). The panel is an `aria-live="polite"` region (**AC-A11Y-4**).
3. **Determinism:** identical inputs always yield identical output.
4. **Tier from raw score** — e.g. Final 50.000 → High, 49.999 → Moderate (**AC-ADRS-7**). Display shows 1 dp but tier uses the unrounded value.
5. **Final clamp:** Residual × J is clamped to 100 → Critical (**AC-JUR-4**).
6. **Permalink:** "Copy permalink" encodes full state (dims, mitigations, J components, jurisdiction) in URL params; reopening reproduces the exact state and score (**AC-ADRS-8**).
7. **Prefill / deep link:** opening from a scenario worksheet pre-fills dims, mitigations, and the four J components from the referenced published assessment, each J component showing its stored evidence/rationale; any toggle is overridable (**AC-SCN-4, AC-ADRS-11**).
8. **Bad params:** out-of-range values (e.g. `A=9`) clamp/reset that dimension with a non-blocking notice; never render an out-of-range score, never throw (**AC-ERR-2**).
9. **Caveat:** the "not a compliance determination" caveat is always visible; the whole score is labeled ▲ inference (**AC-ADRS-9**).
10. **Worked check (Aria·EU):** A3 T3 D3 E2 R2 → Inherent 66.25; M2,M3,M4,M5,M8 → Credit 0.29; Residual 47.0375 (→47.0); J 1.20; Final 56.445 (→56.4) High (**AC-ADRS-1/2, AC-ADRS-12**).

---

## 5. Mitigation controls

**Behavior:**
1. Each mitigation is an on/off toggle showing its credit weight; toggling recomputes.
2. `Credit = min(0.40, Σ credits of ON mitigations)` — the **cap is applied to the sum** (**AC-CAP-1**).
3. When the raw sum exceeds 0.40, the UI shows a **"Mitigation credit capped at 40%"** indicator; the effective credit stays 0.40 (**AC-CAP-1**).
4. Consequence: Residual can **never fall below 60% of Inherent** — controls reduce likelihood, not the ceiling of harm; they cannot launder inherent risk (**AC-CAP-2, MD-9**).
5. Only **implemented + evidenced** mitigations earn credit; an unevidenced mitigation must not be counted (design intent — enforced by content validation **AC-REV-3, MD-6**).

---

## 6. Jurisdiction reference selection (separate from J)

**This is the load-bearing methodological distinction — keep it explicit (CB-3, AC-ADRS-10).**

1. The calculator has a **jurisdiction reference selector** (EU/US/SG/CN) that is **separate** from the four J-component toggles.
2. Selecting a jurisdiction **only swaps the reference note** — it displays that jurisdiction's J-component reference definitions/examples. It **does not auto-set J** and does not change any toggle.
3. J is computed **solely from the four toggles the analyst sets**. There is **no capability-profile questionnaire** and no automatic mapping from jurisdiction to J.
4. `enforcement_posture` and `prohibition_adjacent` readings are always typed **▲ inference**, never fact (**AC-JUR-3, MD-3**).
5. J property invariant: for every 0/1 combination of the four components, J ∈ [1.00, 1.30]; all four on = exactly 1.30 (**AC-JUR-2**).
6. Prototype confirmation: switching the jurisdiction reference from EU to US leaves J unchanged; only the reference callout content changes.

---

## 7. Policy-to-control mapper

**Behavior:**
1. Each `ControlCard` shows the control, its **strength** (direct/derived/prudential), **relation** (satisfies_in_part/supports_evidence/implements_general_duty), description, and links to its **driving provisions** with source tiers (**AC-MAP-1**).
2. The full chain **Provision (■ Fact, cited) → Capability (▲ Inference, confidence, rationale) → Control (● Recommendation, strength+relation+rationale)** is rendered on the provision screen; **no link may be skipped** (**AC-MAP-1**).
3. Recommendation text **never asserts "makes you compliant"**; it uses the satisfies/supports/implements framing (**AC-MAP-2**).
4. **Conflicts:** a `mapping_conflicts` record (e.g. data-localization vs. centralized immutable log) renders a flagged conflict card + an **options analysis** typed as ● recommendation, **citing both provisions**; no option is presented as "compliant" (**AC-MAP-3**).
5. **Filtering:** the control catalog filters by category, mitigation class, or jurisdiction; each control expands to its driving provisions (**AC-MAP-4**).
6. Provision links navigate to `/provisions/{id}`.

---

## 8. Export-to-brief flow

**Behavior:**
1. An **"Export to brief"** action appears on the provision screen, ADRS calculator, and control mapper.
2. Activating it routes to the scenario's **Executive Brief** (`/scenarios/{slug}/brief`), which composes: one-sentence ● recommendation, the 4-column scorecard, three ■/▲ drivers, two "what changes the answer" bullets, ask/next-step, and footer (disclaimer + `as_of` + link to full scenario) (**AC-BRF-1**).
3. **Every ADRS figure in the brief must equal the stored published assessment** for that scenario×jurisdiction — no ad-hoc recomputation (**AC-BRF-2**).
4. **Print / PDF:** the brief's print stylesheet produces the one-page artifact and **retains ■▲● glyphs, tiers, dates, and the caveat** — color is never the sole carrier (**AC-BRF-3, NFR-9**).
5. **Missing export asset:** the download link is disabled with a "coming soon" note rather than a broken download (**AC-ERR-4**).

---

## 9. Fixture-data banner

**Behavior:**
1. The **"FIXTURE DATA — ILLUSTRATIVE ONLY"** banner is rendered by the app shell and appears on **every screen**, above all content; `role="status"` (**CB-4, AC-INV-8**).
2. In the **`fixtures` build profile** it is **persistent and non-dismissible**.
3. It is distinct from — and stacks with — the global **disclaimer bar** ("not legal advice / not a compliance determination") and, on scenarios, the per-page **Hypothetical** tag (**AC-SCN-1**).
4. Build-profile enforcement: any `fixture:true` file **fails** a `production` build; under `fixtures` it renders behind the banner, and the fixtures artifact is **blocked from deployment** (**AC-INV-8**).
5. The banner's hazard-amber palette is reserved for framing and is never reused to encode data meaning (lifecycle, risk, epistemic).

---

## 10. Cross-cutting interaction requirements
- **Keyboard:** filters, calculator inputs, sortable headers, footnote markers, and drawers are all reachable/operable with visible focus; popovers/drawers dismiss with Esc (**AC-A11Y-2**).
- **Live regions:** the calculator result and any async-updated count announce via `aria-live` (**AC-A11Y-4**).
- **No uncaught console errors** on any screen during interaction (**AC-ERR-3**).
- **Routing:** production uses real routes; the calculator and tracker encode state in URL params for shareability (**AC-ADRS-8, AC-TRK-2**).
