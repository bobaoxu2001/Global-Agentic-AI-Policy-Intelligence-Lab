# AI Policy Atlas — Final Design Handoff

**Derived from:** the approved prototype `AI Policy Atlas.dc.html` + `SPEC.md` v1.0, `docs/PRD.md`, `docs/DESIGN_HANDOFF.md`, `docs/METHODOLOGY_DECISIONS.md`, `docs/ACCEPTANCE_CRITERIA.md`.
**Status:** Approved design, ready for engineering. **Audience:** engineering + product.
**Scope of this document:** it describes *what to build* to match the approved design. It does **not** redesign the product, add screens, invent policy data, alter ADRS logic, or supply production code.

> ⚠ **All content in the prototype is fictional fixture data**, rendered behind a persistent "FIXTURE DATA — ILLUSTRATIVE ONLY" banner (build profile `fixtures`, per **AC-INV-8 / CB-4**). Nothing here is a verified policy fact or a compliance determination.

---

## 1. Document set

| File | Purpose |
|---|---|
| `FINAL_DESIGN_HANDOFF.md` (this) | Overview, direction, principles, global chrome, methodology anchor, doc map |
| `SCREEN_INVENTORY.md` | Per-screen spec: route, purpose, task, components, data, states, behavior, a11y, interactions, AC refs |
| `COMPONENT_INVENTORY.md` | Per-component spec: props, variants, state, semantic system, data needs, reuse |
| `DESIGN_TOKENS.md` | Colors, type, spacing, radii, the five disjoint semantic palettes, contrast |
| `RESPONSIVE_BEHAVIOR.md` | Breakpoints, layout reflow, mobile adaptation per screen |
| `INTERACTION_SPEC.md` | Exact interaction logic for the nine required flows |

---

## 2. Approved direction (the hybrid)

The approved product is a **hybrid of the three explored directions**:

- **1b Research Intelligence Workspace — the primary visual shell.** Editorial reading surface: warm paper tones, Source Serif 4 for provision prose and quotes, a persistent three-pane reader (outline · reading column · evidence pane). This carries source traceability and fact/inference/recommendation discipline.
- **1c Policy-to-Product Decision Studio — the workbench.** The live ADRS calculator, agent-scenario workflow, control cards, and provision→capability→control mapping.
- **1a Policy Command Center — status strips only.** The compact monospace status strip is used **only** on the Executive Dashboard for corpus monitoring. It never becomes the app's primary layout.

**Character:** calm, rigorous, editorial, information-dense but quiet. Explicitly **not**: neon "AI" aesthetics, decorative world maps, chatbot UI, or generic KPI cards. Every figure earns its place and traces to a source.

---

## 3. Design principles (binding)

1. **Evidence is never more than a glance away.** Every fact shows its source tier, and its verbatim excerpt + official/archived links + accessed/verified dates are reachable in the persistent evidence pane — not hidden behind a modal.
2. **One epistemic kind per block.** Every content block is exactly one of ■ Fact / ▲ Inference / ● Recommendation, with icon **and** text label. Mixed-kind blocks are forbidden (**AC-EPI-1**).
3. **Five semantic color systems, never overlapping.** Epistemic, lifecycle, bindingness, source-tier, and ADRS-tier each own a disjoint visual language (see §5 and `DESIGN_TOKENS.md`). Confidence uses neutral fill-density, never hue, so it can never be read as risk.
4. **Color is never the sole carrier.** Glyphs (■▲●), shape (bindingness), and text back every palette (**AC-A11Y-3, AC-EPI-5**).
5. **Bindingness ≠ lifecycle.** Axis B (binding/conditional/non-binding) and Axis C (lifecycle status) are independent and independently encoded; neither is inferred from the other (**AC-STA-2**).
6. **The number always shows its work.** Any ADRS score is accompanied by its arithmetic (inherent → credit → residual → J → final) and the "not a compliance determination" caveat (**AC-ADRS-9**).
7. **Fixtures are visibly fixtures.** The banner is persistent and non-dismissible in the fixtures profile.

---

## 4. Global chrome (present on every screen)

Rendered by the app shell, outside the routed screen area:

1. **Fixture banner** (`FixtureBanner`) — hazard-striped amber bar, top of frame, non-dismissible. Text: "FIXTURE DATA — ILLUSTRATIVE ONLY · all instruments, cites, dates & scores are fictional placeholders for design review — not verified policy facts". `role="status"`. (**AC-INV-8, CB-4**)
2. **Disclaimer bar** — dark strip: "Not legal advice… A governance-intelligence aid; nothing here is a compliance determination. No affiliation with any company. Content version v0.fixtures." (**AC-ADRS-9**)
3. **Header** — brand mark "AI Policy Atlas · Agentic AI Governance Intelligence" + the **epistemic legend** (■ Fact / ▲ Inference / ● Recommendation), `role="note"`.
4. **Primary nav** — `role="tablist"`, one tab per screen, grouped: Dashboard · Tracker · Instrument · Provision · Compare ‖ Scenario · Calculator · Mapper ‖ Brief · Methodology · Changelog ‖ Design System. Active tab: `aria-selected`, underline indicator.
5. **Footer** — as_of date, build date, content version, links to Methodology & Changelog. `as_of_date` and record `last_verified` are always distinct (**AC-LV-1**).

**Production routing note:** the prototype uses a client-side tab router (`data-go` → show/hide `data-screen` sections). In production these become real routes (see per-screen routes in `SCREEN_INVENTORY.md`) with the calculator state encoded in URL params (**AC-ADRS-8**).

---

## 5. The five semantic color systems (summary — full values in `DESIGN_TOKENS.md`)

| System | Encodes | Distinguishing signal (beyond hue) |
|---|---|---|
| **Epistemic** | Fact / Inference / Recommendation | Glyph ■ / ▲ / ● + text; blue / violet / teal |
| **Lifecycle** | proposed → adopted → partial → full → historical | Dot + text + attained date; neutral→amber→green ramp |
| **Bindingness** | binding / conditional / non-binding | **Shape & weight** (solid dark / dashed outline / light) — deliberately *not* hue |
| **Source tier** | Tier 1 / 2 / 3 | Filled-dark / grey / outline chip with "TIER n" text |
| **ADRS tier** | Low / Moderate / High / Critical | Label text + green→yellow→orange→red ramp |
| *(Confidence)* | High / Medium / Low | **Neutral fill-density meter** — never colored, so never confused with risk |

These palettes share no hue. This separation is a hard requirement, not a preference.

---

## 6. Methodology anchor (preserved exactly — do not modify)

The ADRS logic is reproduced verbatim from `METHODOLOGY_DECISIONS.md` / SPEC §13 and matches the prototype's calculator. **Engineering must reproduce these exact numbers (±0.001 at full precision).**

**Dimensions & weights:** A Autonomy 0.25 · T Action-surface 0.20 · D Data-sensitivity 0.20 · E External-reach 0.15 · R Irreversibility 0.20. Each scored on **integer anchors 0–4 only** (no between-anchor values).

**Formula:**
```
Inherent  = Σ (weightᵢ · scoreᵢ · 25)
Credit    = min(0.40, Σ mitigation_creditⱼ)          # cap, MD-9 / AC-CAP
Residual  = Inherent · (1 − Credit)                   # ≥ 60% of Inherent always
J         = min(1.30, 1 + Σ J_componentₖ)             # AC-JUR-2
Final     = min(100, Residual · J)                    # AC-JUR-4
```

**Mitigation credits:** M1 .10 · M2 .08 · M3 .07 · M4 .06 · M5 .05 · M6 .04 · M7 .04 · M8 .03 · M9 .03. Only **implemented + evidenced** mitigations earn credit (**MD-6, AC-REV-3**).

**J components (four, each 0/1):** binding_hit +.10 · near_term_hit +.05 · enforcement_posture +.05 · prohibition_adjacent +.10. `enforcement_posture` and `prohibition_adjacent` readings are always **▲ inference** (**AC-JUR-3, MD-3**).

**Tiers — half-open intervals, derived from the RAW score:** Low `[0,25)` · Moderate `[25,50)` · High `[50,75)` · Critical `[75,100]`. Upper bound belongs to the next tier (**AC-ADRS-7**). Display 1 dp; **tier from unrounded value** (a badge may read "50.0 · High").

**No intermediate rounding** anywhere; display values never re-enter the formula (**AC-ADRS-12, CB-5**).

**Jurisdiction selection is separate from J** (**CB-3, AC-ADRS-10**): choosing a jurisdiction reveals reference definitions only and never auto-sets J. The four J toggles remain user-controlled.

**Worked reference (Aria · EU, from AC-ADRS-1/2):** A3 T3 D3 E2 R2 → Inherent **66.25**; mitigations M2,M3,M4,M5,M8 → Credit **0.29**; Residual **47.0375** (shows 47.0); J **1.20**; Final **56.445** (shows 56.4) → **High**.

---

## 7. What engineering must NOT do (guardrails)

- Do **not** add, remove, or merge screens (the 11 + Design System reference are fixed).
- Do **not** invent policy instruments, provisions, quotes, citations, dates, or scores. All such content is authored fixture data validated by the content pipeline.
- Do **not** alter ADRS weights, credits, cap, J components, tier boundaries, or rounding rules.
- Do **not** auto-derive J from jurisdiction selection.
- Do **not** let controls reduce residual below 60% of inherent.
- Do **not** allow color to be the only signal for any semantic system.
- Do **not** render non-`published` content in a production build (**AC-REV-1**); do **not** deploy a `fixtures`-profile artifact (**AC-INV-8**).

---

## 8. Acceptance-criteria index (by area)

Full text in `docs/ACCEPTANCE_CRITERIA.md`. Per-screen and per-interaction references appear throughout `SCREEN_INVENTORY.md` and `INTERACTION_SPEC.md`.

`AC-TRK` tracker · `AC-DET` detail · `AC-CMP` compare · `AC-SCN` scenario · `AC-ADRS` scoring · `AC-CAP` credit cap · `AC-JUR` multiplier · `AC-MAP` mapping · `AC-CIT` citation · `AC-STA` status · `AC-EPI` epistemic · `AC-LV` last-verified · `AC-CONF` confidence caps · `AC-REV` review state · `AC-BRF` brief · `AC-DESK`/`AC-MOB` responsive · `AC-A11Y` accessibility · `AC-INV`/`AC-MSRC` validation · `AC-ERR` runtime errors.
