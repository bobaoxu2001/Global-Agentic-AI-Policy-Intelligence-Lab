# AI Policy Atlas — Implementation Backlog

**Derived from:** `SPEC.md` v1.0, `docs/PRD.md`, `docs/ENGINEERING_HANDOFF.md`, `docs/DESIGN_HANDOFF.md`, `docs/ACCEPTANCE_CRITERIA.md`.
**Prioritization:** P0 foundation → P1 core product → P2 research integration → P3 polish → Deferred. Maps to SPEC §26 build sequence (Phase 0 → 1 → 2 → 3).
**Owner types:** `eng` = engineering, `design` = design, `research` = policy research.
**Complexity:** S (≤0.5 day), M (0.5–2 days), L (>2 days).

> Constraints honored throughout: preserve all formulas/IDs/taxonomies verbatim; no new policy claims; no ADRS changes; no chatbot; MVP scope only (SPEC §4–5).

---

## P0 — Foundation (SPEC Phase 0; gate: schemas validate, formula tests green)

| ID | Title | Rationale | Dependency | AC ref | Cx | Owner |
|----|-------|-----------|------------|--------|----|-------|
| P0-1 | Repo + CI skeleton | Reproducible clean-clone build is NFR-5; CI is where all integrity lives | — | ENG §13; AC-8 | M | eng |
| P0-2 | Enum constants module `[LOCKED]` | Single source for all taxonomy enums (C/R/M/A-D/etc.) | P0-1 | AC-INV-1 | S | eng |
| P0-3 | JSON Schemas (§18) in `/schemas` | §18 parity artifacts (draft 2020-12) | P0-2 | AC-INV-* | M | eng |
| P0-4 | Zod schemas + inferred TS types | Runtime validation + type source (mirror §18) | P0-2,3 | AC-INV-2/3/6; AC-MSRC-* | L | eng |
| P0-5 | **`adrs.ts` formula module `[LOCKED]`** | Canonical math shared by UI + build; core thesis | P0-2 | AC-ADRS-*, AC-CAP-*, AC-JUR-* | M | eng |
| P0-6 | ADRS unit tests (§14 examples, half-open tiers, full-precision ±0.001) | Guarantees Aria/Sentinel/Mira reproduce; locks CB-2/CB-5 | P0-5 | AC-ADRS-1..4,7,12; AC-CAP-1; AC-JUR-1,2 | M | eng |
| P0-4b | `BUILD_PROFILE=fixtures\|production` in pipeline (CB-4) | Resolves fixture publish-state deadlock; gates deploy | P0-9 | AC-INV-8 | S | eng |
| P0-7 | Confidence module (caps + propagation) | Enforce §22 caps and inference ≤ min(based_on) | P0-4 | AC-CONF-* | M | eng |
| P0-8 | Integrity-check module (`integrity.ts`) | Publish gates independent of reviewer diligence (§17/§24) | P0-4,5,7 | AC-REV-2/3; AC-INV-4/5; AC-MSRC-* | L | eng |
| P0-9 | Import/normalize pipeline → `/data/atlas.json` | Content→validated dataset; aborts on any failure (FR-13) | P0-4,8 | AC-REV-1; AC-INV-* | M | eng |
| P0-10 | Seed: `capabilities.json` (C1–C12) | Locked reference data from §10 | P0-4 | AC-CMP-4 | S | research+eng |
| P0-11 | Seed: `risks.json` (R1–R12) | Locked reference data from §11 | P0-4 | AC-CMP-4 | S | research+eng |
| P0-12 | Fixtures: 3 scenarios + 12 assessments (§14 numbers + §10 capability intensities), `fixture:true` | Enables template + formula testing pre-research; CB-1 intensities | P0-5,6 | AC-SCN-*, AC-ADRS-2..4 | M | research+eng |
| P0-13 | Example instruments/provisions/sources/controls fixtures (`fixture:true`) | Lets P1 templates render before Phase 1 | P0-4 | AC-DET-*, AC-CIT-1 | M | research |
| P0-14 | Integration tests: crafted-bad fixtures (incl. rule 13, fixture isolation) | Prove the pipeline rejects invalid/missing-source data | P0-8,9 | AC-INV-*, AC-MSRC-*, AC-CONF-* | M | eng |
| P0-16 | Wireframes: 5 core templates + component inventory | Phase 0 design deliverable (low-fi only, DESIGN §17) | — | — | M | design |

*(MJ-9: P0-15 rendered templates → **moved to P1-15**; P0-17 design system → **moved to P1-0**. Phase 0 ships schemas, formula, tests, fixtures, wireframes, validation only — matching the 2–3 day scope, SPEC §26 / ENG §18.)*

**P0 exit gate:** P0-3/4 validate sample records; P0-5/6 tests green (SPEC §26 Phase 0 gate). ENG §18 "Phase 0 DoD" satisfied. Rendered templates and the design system are **not** in the P0 gate.

---

## P1 — Core Product (interactive + rendering system; SPEC Phase 3 build items usable early)

| ID | Title | Rationale | Dependency | AC ref | Cx | Owner |
|----|-------|-----------|------------|--------|----|-------|
| P1-0 | Design system: epistemic/status/confidence/tier badges (moved from P0-17, MJ-9) | The product's whole semantic system; **three disjoint color families** (MN-10) | P0-16 | AC-EPI-5, AC-A11Y-3 | L | design |
| P1-15 | Rendered templates: 5 core pages + FIXTURE banner (moved from P0-15, MJ-9) | Renders fixtures under `BUILD_PROFILE=fixtures` | P0-9; P0-4b; P1-0 | AC-DESK-1; AC-INV-8 | L | eng+design |
| P1-1 | `EpistemicBlock` component (3 variants) | Renders the fact/inference/recommendation system everywhere | P1-0 | AC-EPI-1/2/3/5 | M | eng+design |
| P1-2 | `CitationPopover` component | Cited-fact traceability (§21.7); a11y-safe | P1-0 | AC-CIT-1; AC-A11Y-2 | M | eng+design |
| P1-3 | `ClassificationChips` + lifecycle/bindingness treatment | Instrument status legibility without conflation | P1-0 | AC-STA-1/2/4; AC-DET-1 | M | eng+design |
| P1-4 | `ConfidenceChip` + staleness marker | Confidence + last-verified display (§22, §16.5) | P1-0 | AC-CONF-*, AC-LV-1/2 | S | eng+design |
| P1-5 | **ADRS calculator island** (manual J toggles, CB-3; no auto-J) | The interactive centerpiece (FR-5); URL state | P0-5; P1-4,15 | AC-ADRS-5/6/8/9/10/11; AC-CAP-1; AC-JUR-3; AC-ERR-2 | L | eng |
| P1-6 | Calculator URL encode/decode + unit tests | Shareable permalink; deep-link from scenarios | P1-5 | AC-ADRS-8; AC-SCN-4 | S | eng |
| P1-7 | Instrument detail page | Classification + provisions + supersession + change history (amendment events, MJ-4) | P1-15; P1-3 | AC-DET-1/2; AC-STA-3/4 | M | eng |
| P1-8 | Provision detail + `MappingChain` | Typed policy→capability→control chain (§15.1) | P1-1,2 | AC-DET-3/4; AC-MAP-1/2 | L | eng |
| P1-9 | Scenario detail page + scorecards | Renders stored assessments, expandable justifications (FR-6) | P0-12; P1-5 | AC-SCN-1/2/3; AC-ADRS-* | L | eng |
| P1-10 | Jurisdiction detail + `FilterBar` | Faceted filtering, URL state (FR-2) | P1-15 | AC-TRK-1..5 | M | eng |
| P1-11 | Home page | Entry point; jurisdiction/scenario cards + tier badges | P1-3,9 | AC-DESK-1; OD-5 | M | eng+design |
| P1-12 | Global frame (nav, disclaimer bar, legend, footer) | Persistent disclaimers + epistemic legend on every page | P1-15 | AC-EPI-4; PRD §7 | M | eng+design |
| P1-13 | 404 + calculator error handling | Runtime resilience (static site) | P1-5 | AC-ERR-1/2/3 | S | eng |
| P1-14 | Playwright critical paths P-1…P-8 (fixture-driven expectations, MJ-10) | Lock the demo-critical flows | P1-5,7,8,9,10 | AC-ADRS-6; AC-DET-3; AC-A11Y-1 | L | eng |

---

## P2 — Research Integration (SPEC Phase 1 + 2 content lands in the system)

| ID | Title | Rationale | Dependency | AC ref | Cx | Owner |
|----|-------|-----------|------------|--------|----|-------|
| P2-1 | EU corpus: instruments + provisions + sources | Hardest-first (SPEC §26); stresses taxonomy | P0-9 | AC-1, AC-2, AC-CIT-* | L | research |
| P2-2 | US corpus (incl. EO 14179/14110 supersession pair) | Supersession + executive-action classification | P0-9 | AC-DET-2; AC-STA-1 | L | research |
| P2-3 | China corpus (translation flags, confidence caps) | Deep-synthesis/labeling/PIPL; translation discipline | P0-9; P0-7 | AC-CONF-1; AC-DET-4 | L | research |
| P2-4 | Singapore corpus | PDPA + Model AI Governance Framework | P0-9 | AC-1, AC-2 | M | research |
| P2-5 | Control catalog (~25–35, K-series) | Provision→control targets (§15.2/15.3) | P2-1..4 | AC-MAP-4; AC-4 | L | research+eng |
| P2-6 | Provision→capability & provision→risk maps | Join layer for scenarios/compare (§17) | P2-1..4; P0-10,11 | AC-MAP-1; AC-CMP-1 | L | research |
| P2-7 | Control→provision maps (scenario-driving provisions) | Full typed chain for top-5 provisions per scenario | P2-5,6 | AC-MAP-1; AC-4 | M | research |
| P2-8 | Finalize 12 scenario assessments w/ justifications + citations | Replace illustrative J with cited, justified values (§13.5/§14) | P2-1..6 | AC-SCN-2; AC-JUR-3; AC-3 | L | research |
| P2-9 | `mapping_conflicts` records | Cross-jurisdiction tension as first-class content (§15.4.4) | P2-6 | AC-MAP-3 | M | research |
| P2-10 | Glossary + jurisdictional variants (§Appendix B) | Auto-linking defined terms (FR-14) | P2-1..4 | AC-glossary (PRD §7.14) | M | research+eng |
| P2-11 | Compare matrix page + aggregation | Cross-jurisdiction inference view (FR-7); degradable | P2-6 | AC-CMP-1/2/3/4 | M | eng |
| P2-12 | Controls catalog page | Filterable catalog + chain expansion (FR-8) | P2-5,7 | AC-MAP-4 | M | eng |
| P2-13 | Changelog content + page | Status changes during build period (FR-9, §19.5) | P2-1..4 | AC-STA-3; AC-LV-3; AC-6 | M | research+eng |
| P2-14 | Review-log content + two-pass protocol enforcement | Publish gate + honest single-author disclosure (§19.4) | P0-8 | AC-REV-1/4/5 | M | research+eng |

---

## P3 — Polish (SPEC Phase 3 finish; gate: AC-5…AC-10)

| ID | Title | Rationale | Dependency | AC ref | Cx | Owner |
|----|-------|-----------|------------|--------|----|-------|
| P3-1 | Methodology page (§6,7,13,15,19–22 + AI-assist disclosure) | Trust surface; verbatim confidence table | P2-* | AC-9b | M | research+eng |
| P3-2 | Taxonomy pages (policy/capabilities/risks) | Reference pages with cross-links (§16.3–5) | P0-10,11 | AC-CMP-4 | M | eng |
| P3-3 | Bibliography page (auto-generated) | Orphan-source CI + tier display (FR-10) | P2-* | AC-CIT-5 | S | eng |
| P3-4 | Glossary auto-link pass | First-occurrence linking per page (FR-14) | P2-10 | PRD §7.14 | S | eng |
| P3-5 | Executive brief (section + PDF) | Deliverable §29; traceable numbers | P2-8 | AC-BRF-1/2/3 | M | research+design |
| P3-6 | Two-page policy memo (PDF) | Deliverable §28 | P2-* | AC-10 | M | research |
| P3-7 | Three-minute demo script | Deliverable §30 | P3-1,5 | AC-10 | S | research |
| P3-8 | Exports: control-mapping CSV + dataset JSON | FR-11 downloadables | P2-5,7,9 | AC-10 | S | eng |
| P3-9 | Print styles (memo/brief/methodology) | NFR-9; ■▲● retained in print | P3-1,5,6 | AC-BRF-3 | S | eng+design |
| P3-10 | Accessibility pass (axe, keyboard, lang, live region) | NFR-3 across P0 pages | P1-*, P2-* | AC-A11Y-1..4 | M | eng+design |
| P3-11 | Performance pass (Lighthouse ≥90 ×3 pages) | NFR-2 | P1-* | AC-DESK-2 | M | eng |
| P3-12 | Responsive pass (375px, table containers) | NFR-4 | P1-* | AC-MOB-1/2 | M | eng+design |
| P3-13 | Link checker in CI + `archived_url` backfill | Dead-link prevention at demo (P9) | P2-* | AC-CIT-4; AC-MSRC-3 | S | eng+research |
| P3-14 | Optional cookieless analytics beacon (off by default) | NFR-7 privacy-respecting counts | P1-12 | PRD §22 | S | eng |
| P3-15 | Final 30-day re-verification sweep | AC-6 launch condition | P2-13 | AC-LV-3; AC-6 | M | research |
| P3-16 | Cold-reader test (AC-9) | Validate legibility of thesis with a fresh user | P3-1,2; P1-* | AC-9 | S | research |
| P3-17 | About page + long-form disclaimer | Scope limits, non-affiliation (§16.15) | P1-12 | PRD §7.16 | S | research+design |

---

## Deferred (explicitly out of MVP; SPEC §4/§5)

| ID | Title | Reason deferred |
|----|-------|-----------------|
| D-1 | User accounts / auth | Out of scope §4 |
| D-2 | Comments / annotations | Out of scope §4 |
| D-3 | Alerts / notifications / subscriptions | Out of scope §4 |
| D-4 | Full-text search across primary sources | Out of scope §4 |
| D-5 | Automated ingestion / scraping / live feeds | Non-goal §5.5 |
| D-6 | Additional jurisdictions beyond US/EU/SG/CN | Out of scope §4 |
| D-7 | Public API | Out of scope §4 |
| D-8 | Any conversational / chatbot / runtime-LLM feature | Non-goal §5.3 — permanently excluded |
| D-9 | Compliance certification / attestation | Non-goal §5.6 |
| D-10 | Enforcement-action DB, litigation tracking, lobbying content | Non-goal §5.8 |
| D-11 | Multi-language UI (beyond i18n-ready storage) | NFR-8 defers UI i18n |
| D-12 | SQLite runtime query layer | Build-time JSON suffices for read-only MVP |

---

## Open Implementation Decisions

**OD-1…OD-10 are now RESOLVED** in `SPEC.md`/docs by the 2026-07-10 revision (see `docs/REVISION_LOG.md`; methodology-affecting ones are in `docs/METHODOLOGY_DECISIONS.md`). The default adopted for each is the one previously listed (e.g., OD-3 both units, OD-4 FK added, OD-5 worst-of-four + hint, OD-6 pages added, OD-7 highest published version, OD-9 shared sources). They no longer block work; they remain here only as a resolution index.

The items below are **genuinely open** — they require a human decision that could not be settled by reconciling the spec, and each has a default that lets Phase 0 proceed. This list is **not claimed to be exhaustive** (MJ-8): new open items are added here as they surface.

| OD | Decision | Default (unblocks work) | Must resolve by | Notes |
|----|----------|-------------------------|-----------------|-------|
| OD-11 | **Final published J-component values** per scenario×jurisdiction — SPEC §14 marks all J values "illustrative pending research"; the real values depend on Phase 1/2 primary-source findings and must be re-justified per §13.5. | Ship the §14 illustrative values under `BUILD_PROFILE=fixtures` only; production requires researched, cited values. | Phase 2 (P2-8) | Fixtures ≠ production (CB-4); MD-3 |
| OD-12 | **Capability-intensity assignments** for the three §14 scenarios (now set per §10 scale) may be revised when Phase 1 research firms up the scenario-relevant provisions. | Use the §14 intensities as authored; revisit alongside OD-11. | Phase 2 (P2-8) | MD-2 |
| OD-13 | **SSG choice** — Astro vs Next.js static export (NFR-10 allows either). | Astro (ENG §2 preference). | Phase 0 (P0-1) | pure eng choice |
| OD-14 | **US corpus scoping** — how many pending federal bills to include as `proposed_legislation`, and whether non-Colorado state laws appear as full instruments or glossary notes (Appendix A leaves this open). | Colorado SB 24-205 as the state exemplar instrument; other state laws as glossary notes; ≤2 pending federal bills. | Phase 1 (P2-2) | research scoping |
| OD-15 | **Analytics at launch** — enable the optional cookieless page-count beacon or ship with none (NFR-7/MN-7). | Ship with none enabled. | Phase 3 (P3-14) | privacy default |

**Note on updating SPEC.md:** the OD-1/3/4/6-driven schema additions have already been written into `SPEC.md` §8/§16/§17/§18 in this revision (per ENG §20). None change the ADRS model, taxonomies, IDs, or epistemic rules — they reconcile documented schema gaps. Any future change to a **[LOCKED]** item (ENG §20) still requires editing `SPEC.md` first.
