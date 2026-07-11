# AI Policy Atlas — Design Tokens

**Derived from** the approved `AI Policy Atlas.dc.html` (values are lifted verbatim from its stylesheet). Names are proposed token names for engineering; hex values are authoritative. The prototype uses inline literals; production should promote these to tokens.

**Hard rule:** the **five semantic color systems never share a hue** — epistemic, lifecycle, bindingness, source-tier, ADRS-tier. **Confidence** uses neutral fill-density only. No token below may be repurposed across systems.

---

## 1. Surfaces & structure

| Token | Value | Use |
|---|---|---|
| `--bg-desk` | `#d9d5cc` | Canvas behind the app frame |
| `--surface-paper` | `#f7f5ef` | App base / stage background |
| `--surface-page` | `#fdfcf9` | Reading columns, cards |
| `--surface-panel` | `#f4f1e8` | Evidence pane, arithmetic panel, sidebars |
| `--surface-rail` | `#efece3` | Nav, footer |
| `--surface-ink` | `#20242b` | Status strip, dark disclaimer, `bind-b` |
| `--border-frame` | `#cdc7b8` | App outer border |
| `--border-rule` | `#e3ddd0` | Hairline rules, card borders |
| `--border-rule-soft` | `#ededed` | Table row separators |
| `--shadow-app` | `0 10px 40px -12px rgba(60,50,30,.3)` | Single app-level shadow (used sparingly; prefer hairlines) |
| Grid | 8px base | Spacing rhythm |
| Radius | card 10–12px · chip/badge 4–7px · pill 20px | |

## 2. Text

| Token | Value | Use |
|---|---|---|
| `--ink` | `#23211c` | Primary text |
| `--ink-muted` | `#6b6350` | Secondary text |
| `--ink-eyebrow` | `#a08b63` | Eyebrows, meta labels |
| `--ink-on-dark` | `#c3cbd6` / `#dbe2ea` | Text on ink surfaces |

## 3. Typography

| Family | Token | Use |
|---|---|---|
| **Source Serif 4** | `--font-serif` | Provision prose, screen headings (`.h-screen`), verbatim quotes, brief findings |
| **Public Sans** | `--font-ui` | UI chrome, labels, body, tables |
| **IBM Plex Mono** | `--font-mono` | Citations, all dates, numerics, ADRS math, code |

**Scale (px):** screen H1 24 (serif 600) · section 18 · card title 15 · body 13–14 · UI label 12 · eyebrow 10 (mono, uppercase, `.08em`) · numeric large (calculator final) 46. Reading measure ~60–70ch. Body line-height 1.55–1.62.

---

## 4. Semantic system 1 — EPISTEMIC (Fact / Inference / Recommendation)

Glyph **always** paired with text. Blue / violet / teal.

| Kind | Glyph | Text | Border/BG (badge) | Block left-border |
|---|---|---|---|---|
| Fact | ■ | `#1e3a8a` | border `rgba(30,58,138,.28)` / bg `rgba(30,58,138,.07)` | `#1e3a8a` |
| Inference | ▲ | `#6d28d9` | border `rgba(109,40,217,.28)` / bg `rgba(109,40,217,.07)` | `#6d28d9` |
| Recommendation | ● | `#0f766e` | border `rgba(15,118,110,.28)` / bg `rgba(15,118,110,.07)` | `#0f766e` |

Tokens: `--ep-fact`, `--ep-inf`, `--ep-rec` (+ `-bg`, `-border`).

## 5. Semantic system 2 — LIFECYCLE (neutral → amber → green ramp)

Dot + text (+ attained date). Distinct from bindingness and from ADRS tier.

| Status | Text | BG | Dot |
|---|---|---|---|
| proposed | `#475569` | `#eef1f4` | `#64748b` |
| adopted (not yet applicable) | `#92600b` | `#fdf1dd` | `#c17d0a` |
| in force — partial | `#4d6b1e` | `#eef6e6` | `#6f9c2e` |
| fully applicable | `#1f6b34` | `#e3f2e4` | `#1f8a43` |
| historical / rescinded | `#71717a` | `#f1f1f2` | `#a1a1aa` (label struck-through) |

Tokens: `--lc-{prop,adopt,partial,full,hist}` (+ `-bg`, `-dot`).

## 6. Semantic system 3 — BINDINGNESS (shape/weight, NOT hue)

Deliberately non-chromatic so it can never be confused with lifecycle or risk.

| Level | Treatment |
|---|---|
| Binding | solid dark fill `#20242b`, white text |
| Conditional / mixed | white bg, **dashed** border `#6b7280`, `#374151` text |
| Non-binding | light bg `#f4f4f5`, solid border `#d4d4d8`, `#6b7280` text |

Tokens: `--bind-b`, `--bind-c` (dashed), `--bind-n`.

## 7. Semantic system 4 — SOURCE TIER

| Tier | Treatment |
|---|---|
| Tier 1 (primary/official) | fill `#0f172a`, white text |
| Tier 2 (authoritative secondary) | fill `#e2e8f0`, `#334155` text |
| Tier 3 (orientation only) | white bg, border `#cbd5e1`, `#64748b` text |

Tokens: `--tier1`, `--tier2`, `--tier3`. Tier 3 may never be a fact's sole citation (**AC-CIT-2**).

## 8. Semantic system 5 — ADRS TIER (green → yellow → orange → red)

Half-open bands (see §11). Distinct ramp from lifecycle.

| Tier | Text | BG |
|---|---|---|
| Low `[0,25)` | `#1f6b34` | `#e3f2e4` |
| Moderate `[25,50)` | `#8a6d0a` | `#fbf0cf` |
| High `[50,75)` | `#b4530f` | `#fbe4d2` |
| Critical `[75,100]` | `#a52a1f` | `#f8d7d2` |

Tokens: `--adrs-{low,mod,high,crit}` (+ `-bg`).

## 9. Confidence (neutral density — NOT a color system)

| Level | Fill fraction |
|---|---|
| High | 100% |
| Medium | ~55% |
| Low | ~25% |

Meter fill `#3f3f46` over track `#e4e4e7`, border `#cbd0d6`. **No hue** — prevents confusion with epistemic/risk. Token: `--conf-fill`, `--conf-track`.

## 10. Framing accents (reserved — never data meaning)

| Token | Value | Use |
|---|---|---|
| `--fixture-stripe-a` / `-b` | `#fef3c7` / `#fde9a8` | Fixture banner hazard stripes |
| `--fixture-border` | `#d9b64a` | Fixture banner border |
| `--fixture-ink` | `#78500a` | Fixture banner text |
| `--hypo-bg` / `--hypo-ink` | `#fef3c7` / `#78500a` | Hypothetical-scenario tag |
| `--callout-open-bg` / `-border` / `-ink` | `#fbf3dd` / `#e9d9a8` / `#6b5518` | Unresolved-question callout |
| `--callout-inf-bg` / `-border` | `#f8fafc` / `#e2e8f0` | Inference/context callout |
| `--review-ok` | `#1f6b34` | Review ✓ stamp |
| `--stale` | `#92600b` | Staleness ⚠ flag |
| `--conflict-bg` / `-border` | `#fdf6f2` / `#f0d3c9` | Mapping-conflict card |

These amber/warm accents are reserved for framing (fixtures, hypotheticals, open questions, freshness) and must **not** be reused to encode lifecycle, risk, or epistemic meaning.

## 11. Numeric & tier constants (do NOT modify — SPEC §13)

```
Dimension weights   A .25 · T .20 · D .20 · E .15 · R .20
Dimension scale     integer anchors 0–4 only
Mitigation credits  M1 .10 · M2 .08 · M3 .07 · M4 .06 · M5 .05 · M6 .04 · M7 .04 · M8 .03 · M9 .03
Credit cap          0.40
J components         binding_hit .10 · near_term_hit .05 · enforcement_posture .05 · prohibition_adjacent .10
J cap               1.30
Tier bands          Low [0,25) · Moderate [25,50) · High [50,75) · Critical [75,100]   (from RAW score)
Display precision    1 dp for display; full precision in computation; display never re-entered
```

## 12. Contrast & accessibility (token-level)

- Body text on `--surface-page`/`--surface-paper` meets **≥ 4.5:1**; large text / UI badges meet **≥ 3:1** (**AC-A11Y-1, NFR-3**).
- Every semantic token pairs with a **non-color** signal (glyph, shape, dot, or text label) — no meaning by color alone (**AC-A11Y-3, AC-EPI-5**).
- Focus ring: `2px solid #1e3a8a`, offset per control; visible on all interactive elements (**AC-A11Y-2**).
- `prefers-reduced-motion`: disables skeleton shimmer.
- Link default/hover colors are defined (`#1e3a8a`, underline on hover) so user-added links never fall back to browser blue.
