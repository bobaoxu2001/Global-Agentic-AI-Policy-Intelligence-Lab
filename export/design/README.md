# AI Policy Atlas — Design Export

This folder contains the **approved unified design** for AI Policy Atlas and its implementation-ready documentation. It is a **design and interaction reference**, not production architecture. An implementer (e.g. Codex) should reproduce the *behavior, layout, tokens, and copy* — not necessarily the file's runtime mechanics.

> ⚠ **All content is fictional fixture data**, shown behind a persistent "FIXTURE DATA — ILLUSTRATIVE ONLY" banner. Nothing here is a verified policy fact or a compliance determination. Do not invent or substitute real policy data.

---

## Files in this export

```
design/
  AI-Policy-Atlas.dc.html   # the approved design (reference prototype)
  support.js                # runtime the prototype loads (relative ./support.js)
  README.md                 # this file
docs/
  FINAL_DESIGN_HANDOFF.md   # direction, principles, global chrome, methodology anchor, guardrails
  SCREEN_INVENTORY.md       # 11 screens + design-system tab: route/purpose/task/data/states/a11y/AC refs
  COMPONENT_INVENTORY.md    # ~40 components: props/variants/state/semantic system/data/reuse
  DESIGN_TOKENS.md          # colors, type, the 5 disjoint semantic palettes, constants, contrast
  RESPONSIVE_BEHAVIOR.md    # breakpoints + per-screen reflow + mobile adaptation
  INTERACTION_SPEC.md       # exact logic for the 9 required interaction flows
```

The `docs/` files here are **copies** intended to travel with the design. The repository's source-of-truth product documents (`SPEC.md`, `docs/PRD.md`, `docs/DESIGN_HANDOFF.md`, `docs/METHODOLOGY_DECISIONS.md`, `docs/ACCEPTANCE_CRITERIA.md`) are **authoritative** and must not be overwritten by this export.

---

## Viewing the reference prototype

Open `design/AI-Policy-Atlas.dc.html` in a browser. It loads `./support.js` via a **relative path** (both files are in `design/`, so it resolves offline). No external credentials, secrets, or network calls are required. Fonts load from Google Fonts via `<link>`; if offline, the design degrades to system fonts without breaking layout.

The prototype uses a client-side tab router to switch screens (`data-screen` sections toggled by the nav). In production these become real routes — see `docs/SCREEN_INVENTORY.md` for the intended route per screen.

---

## The 11 approved screens + reference

1. **Executive Dashboard** — `/` — corpus monitoring status strip + hypothetical-deployment tiers (worst-of-four) + recent status changes.
2. **Policy Tracker** — `/instruments` — filterable/sortable instrument corpus.
3. **Policy Instrument Detail** — `/instruments/{slug}` — classification, source citation, agentic-relevant provisions, supersession, history.
4. **Provision / Source Evidence Panel** — `/provisions/{id}` — 3-pane reader with persistent evidence pane + typed Fact→Inference→Recommendation chain.
5. **Jurisdiction Comparison** — `/compare` — currently-applicable binding-provision matrix (no intensity threshold).
6. **Agent Scenario Detail** — `/scenarios/{slug}` — per-jurisdiction ADRS scorecards + read-only worksheet.
7. **ADRS Calculator** — `/risk-score` — **live, deterministic, client-side** score.
8. **Policy-to-Control Mapper** — `/controls` — provision→capability→control cards + conflicts.
9. **Executive Brief** — `/scenarios/{slug}/brief` — one-page, print-ready.
10. **Methodology** — `/methodology`.
11. **Changelog** — `/changelog`.
- **Design System reference tab** — `/design-system` — tokens, component inventory, behavior specs, responsive/a11y, empty/loading/error states, 3-minute walkthrough.

---

## Behavior that MUST be preserved exactly

- **Live ADRS calculator** — `Inherent = Σ(wᵢ·sᵢ·25)`; `Credit = min(0.40, Σ)`; `Residual = Inherent·(1−Credit)`; `J = min(1.30, 1+Σ)`; `Final = min(100, Residual·J)`. Integer anchors 0–4. Full precision, no intermediate rounding; **tier from the raw score** on half-open bands Low [0,25) / Moderate [25,50) / High [50,75) / Critical [75,100]. Do **not** change any weight, credit, cap, or boundary. (See `DESIGN_TOKENS.md` §11 and `INTERACTION_SPEC.md` §4.)
- **Mitigation cap** — credit clamps at 0.40; residual can never fall below 60% of inherent.
- **Jurisdiction / J separation** — selecting a jurisdiction shows reference material only; it **never auto-sets J**. The four J components are set manually. (`INTERACTION_SPEC.md` §6.)
- **Tracker filtering** — OR within an axis, AND across axes; URL-encoded state; empty-state with clear-filters; sortable headers with `aria-sort`. (`INTERACTION_SPEC.md` §1.)
- **Evidence panel** — persistent (desktop) / drawer (mobile); footnote markers reveal the matching Tier-tagged source with verbatim ≤50-word quote + official + archived links + accessed/verified dates. (`INTERACTION_SPEC.md` §2.)
- **Fixture banner** — present on every screen, non-dismissible in the fixtures profile. (`INTERACTION_SPEC.md` §9.)
- **Five disjoint semantic color systems** — epistemic / lifecycle / bindingness / source-tier / ADRS-tier never share a hue; confidence is neutral fill-density. Color is never the sole signal.

---

## Guardrails for implementation

- Do not redesign the product or add/remove screens.
- Do not change the ADRS methodology.
- Do not invent policy instruments, provisions, quotes, citations, dates, or scores.
- Use relative asset paths; embed no secrets or external credentials.
- Do not render non-`published` content in a production build; do not deploy a fixtures-profile artifact.
- Treat `SPEC.md` / `docs/PRD.md` / `docs/DESIGN_HANDOFF.md` / `docs/METHODOLOGY_DECISIONS.md` / `docs/ACCEPTANCE_CRITERIA.md` as source of truth.
