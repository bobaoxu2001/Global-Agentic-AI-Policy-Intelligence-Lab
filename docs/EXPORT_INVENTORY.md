# Design Export Inventory

**Date:** 2026-07-11 · **Action:** inspection + normalization of the Claude Design export. `export/` is preserved untouched as the raw backup; every normalization was a **copy** (verified by SHA-1 where noted). Nothing was deleted or discarded.

## Inventory

| Original path | Type | Inferred purpose | Canonical destination | Action |
|---|---|---|---|---|
| `export/design/AI-Policy-Atlas.dc.html` (105,226 B) | **`.dc.html` Claude Design artifact** (HTML + inline app logic; client-side tab router over 12 `data-screen` sections) | **The approved unified design prototype** — all 11 screens + design-system tab, live ADRS calculator, evidence panel, fixture banner | `design/AI-Policy-Atlas.dc.html` | **Copied** (already canonical name; SHA-1 verified identical: `8b47ccc3…`) |
| `export/design/support.js` (62,106 B) | Generated JS runtime (`dc-runtime`, "GENERATED … do not edit") | Runtime the prototype loads via relative `./support.js`; prototype is non-functional without it | `design/support.js` | **Copied** (must sit beside the .dc.html for the relative path to resolve) |
| `export/design/README.md` (5,729 B) | Markdown | Design-export README: file map, viewing instructions, 11 approved screens, must-preserve behaviors, guardrails | `design/README.md` | **Copied** (used verbatim as the canonical design README — it already documents exactly what the canonical README must) |
| `export/docs/FINAL_DESIGN_HANDOFF.md` (9,866 B) | Markdown | Final design direction: principles, global chrome, methodology anchor (§13 constants verbatim), guardrails | `docs/FINAL_DESIGN_HANDOFF.md` | **Copied** |
| `export/docs/SCREEN_INVENTORY.md` (21,065 B) | Markdown | 11 screens + design-system tab: route, purpose, task, data, states, a11y, AC refs | `docs/SCREEN_INVENTORY.md` | **Copied** |
| `export/docs/COMPONENT_INVENTORY.md` (16,340 B) | Markdown | ~40 components: props/variants/state/semantic system/reuse | `docs/COMPONENT_INVENTORY.md` | **Copied** |
| `export/docs/DESIGN_TOKENS.md` (7,132 B) | Markdown | Tokens: colors, type, the 5 disjoint semantic palettes, ADRS constants (§11), contrast table | `docs/DESIGN_TOKENS.md` | **Copied** |
| `export/docs/RESPONSIVE_BEHAVIOR.md` (5,841 B) | Markdown | Breakpoints + per-screen reflow + mobile adaptation | `docs/RESPONSIVE_BEHAVIOR.md` | **Copied** |
| `export/docs/INTERACTION_SPEC.md` (12,939 B) | Markdown | Exact logic for the 9 required interaction flows (tracker filters, evidence panel, ADRS calc, J separation, brief export, fixture banner…) | `docs/INTERACTION_SPEC.md` | **Copied** |

## Findings

1. **Prototype format:** the main artifact is a **`.dc.html`** Claude Design export (not plain static HTML): inline application logic + a separate generated `support.js` runtime loaded by relative path. Determined by inspection, not filename: it contains a `data-screen` tab router, an inline ADRS engine (lines ~997–1029), and the dc-runtime banner in `support.js`.
2. **Screens:** all 12 `data-screen` sections present — `dash, tracker, instrument, provision, compare, scenario, calc, mapper, brief, method, changelog, system` — matching the 12 approved surfaces (11 screens + design-system reference).
3. **Screenshots:** **none exist in the export.** `design/screenshots/` was created (with `.gitkeep`) as the canonical destination; nothing to copy. Non-blocking: the living prototype supersedes static captures.
4. **Handoff documentation:** all six expected docs exist in the export — none had to be derived during normalization. (Had any been missing, it would have been generated and flagged; not needed.)
5. **Duplicates/temporary files:** none found (no `.tmp`, `~`, `.bak`, OS cruft inside `export/`). The root-level macOS `.DS_Store` is ignored via `.gitignore`, not copied.
6. **Naming collision note:** the export's `docs/` copies do **not** overwrite any source-of-truth document — `FINAL_DESIGN_HANDOFF.md` (design-final) is distinct from the pre-existing `DESIGN_HANDOFF.md` (product source of truth), exactly as the export README prescribes.
7. **Secrets scan:** no API keys, tokens, credentials, or external endpoints in either the HTML or `support.js` (grep for key/secret/token/password patterns; only false-positive on the phrase "Design tokens"). Fonts via public Google Fonts `<link>`, degrades offline. Relative asset paths confirmed (`./support.js`).
