# AI Policy Atlas — Responsive Behavior

**Derived from** the approved `AI Policy Atlas.dc.html`. The product is **desktop-first**; the prototype frame is ~1440px. This defines how each screen adapts down. No screens are added or removed.

---

## 1. Breakpoints

| Name | Range | Intent |
|---|---|---|
| **Desktop (primary)** | ≥ 1280px | Full multi-pane / multi-column layouts. The design target. |
| **Tablet** | 768–1279px | Collapse the third pane / second column; keep tables usable. |
| **Mobile** | < 768px (test at 375px) | Single-column stacks; sticky helpers; in-container table scroll. |

**Global invariants at every breakpoint:**
- The **fixture banner**, **disclaimer bar**, and **epistemic legend** remain present and reachable (**AC-MOB-1**).
- **No horizontal *page* scroll** at any width; wide tables scroll **inside their own container** only (**AC-MOB-1**).
- Primary nav is fully expanded on desktop; scrolls horizontally on tablet; collapses to a menu on mobile.
- Touch targets ≥ 44px on mobile; segmented controls grow to full width.

---

## 2. Layout primitives and how they reflow

| Primitive | Desktop | Tablet | Mobile |
|---|---|---|---|
| **3-pane Reader** (provision) | outline 196 · reading (flex) · evidence 296, side-by-side | outline collapses to a sticky `select`; evidence becomes a toggle **drawer** | panes **stack**: document → provision → **evidence accordion**; footnote markers become tap-to-expand |
| **Calculator** (inputs + arithmetic) | inputs column beside sticky arithmetic panel | arithmetic panel docks **below** inputs | single column; **sticky bottom bar** pins live Final score + tier |
| **2-column content** (dashboard, scenario, methodology, brief) | side-by-side (ratios per screen) | ratios compress; may wrap to 1 col if cramped | **stack** in source order |
| **Card grids** (jurisdictions 2×2, controls 2-up, walkthrough 4-up) | full grid | 2-up | 1-up (walkthrough 2-up then 1-up) |
| **Tables** (`SortableTable`, `CompareMatrix`) | full width, sticky header + sticky first column, no page scroll | same; horizontal scroll inside `.tblwrap` if needed | scroll inside container; **frozen first column**; sticky header |
| **StatusStrip** (dashboard) | single row | wraps | wraps to 2 rows |

---

## 3. Per-screen adaptation

### 1 · Executive Dashboard
- **Desktop:** two columns (scenarios ~1.15fr / jurisdictions+changes ~0.85fr); status strip one row; jurisdiction cards 2×2.
- **Tablet:** columns compress; jurisdiction cards stay 2×2; strip wraps.
- **Mobile:** stack scenarios → jurisdictions → recent changes; strip 2 rows; cards 1-up; "Open brief" full-width. (**AC-MOB-1**)

### 2 · Policy Tracker
- Filter chips wrap across rows; result count stays visible.
- Table: sticky header + sticky first column at all widths; horizontal scroll in-container on tablet/mobile. Sort affordance unchanged. (**AC-TRK-5, AC-MOB-1**)

### 3 · Instrument Detail
- **Desktop:** header/chips full width; provision table full width; supersession + change-history two-up.
- **Mobile:** chips wrap; citation block full width; table scrolls in-container; supersession/history stack.

### 4 · Provision / Evidence
- **Desktop:** full 3-pane reader.
- **Tablet:** outline → sticky select; evidence → drawer toggled from a footnote or an "Evidence" button; reading column takes freed width.
- **Mobile:** stack document → provision → **evidence accordion**; footnote markers are tap-to-expand footnotes; drawer/accordion dismissible via Esc/close; evidence content identical to desktop pane. (**AC-A11Y-2**)

### 5 · Jurisdiction Comparison
- Matrix keeps 4 jurisdiction columns; **first (capability) column frozen**; horizontal scroll inside the container on tablet/mobile. Rows toggle + inference label stay above the matrix. 0-cells still render "0" with tooltip (tap on mobile). (**AC-CMP-1/3, AC-MOB-1**)

### 6 · Agent Scenario Detail
- **Desktop:** capability chips row; 4 scorecards in a row; worksheet (~1.4fr) beside side column (~1fr).
- **Tablet:** scorecards 2×2; worksheet full width; side column below.
- **Mobile:** scorecards 2×2 → 1-up; worksheet scrolls in-container; provisions/controls/unresolved stack.

### 7 · ADRS Calculator
- **Desktop:** inputs beside sticky arithmetic panel (**AC-DESK-1**).
- **Tablet:** arithmetic panel docks below inputs but stays reachable.
- **Mobile:** single column; segmented scorers full-width; **arithmetic panel + tier badge pinned (sticky bottom)** so the score stays visible while editing (**AC-MOB-2**). No layout change alters computation.

### 8 · Policy-to-Control Mapper
- **Desktop:** two-column card grid; options-analysis block full width.
- **Mobile:** single-column cards; strength/relation tags wrap; conflict card retains its flag.

### 9 · Executive Brief
- **Desktop:** main column beside scorecard sidebar.
- **Mobile:** single column (bottom line → findings → scorecard → required controls → open questions); scorecard table scrolls in-container.
- **Print:** fixed one-page layout with print styles; retains ■▲● glyphs, tiers, dates, caveat (**AC-BRF-3, NFR-9**).

### 10 · Methodology
- **Desktop:** two-column (prose / reference sidebar). **Mobile:** single column, sidebar after prose.

### 11 · Changelog
- Full table desktop; scrolls in-container on mobile; empty-period message unaffected by width.

---

## 4. Acceptance references
- **AC-DESK-1** multi-column ≥1280px, tables without page scroll, nav expanded.
- **AC-DESK-2** Lighthouse ≥90 (perf/a11y/best-practices/SEO) on desktop for home, an instrument, a scenario.
- **AC-MOB-1** 375px: no horizontal page scroll, wide tables scroll in-container, nav collapses, disclaimer + legend accessible.
- **AC-MOB-2** calculator reflows to one column with arithmetic panel + tier badge visible.
