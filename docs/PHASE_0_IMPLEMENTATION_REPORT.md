# Phase 0 Implementation Report — AI Policy Atlas

**Date:** 2026-07-11 · **Scope:** ENG §18 Phase 0 DoD + the four-part run (export inspection → normalization → design verification → Phase 0 build). **Design export verdict:** PASS WITH WARNINGS (see `DESIGN_EXPORT_VERIFICATION.md`). **Test results:** see `PHASE_0_TEST_REPORT.md` (real command output).

---

## 1. Files created

**Design normalization (Parts 1–3):** `design/AI-Policy-Atlas.dc.html` + `design/support.js` + `design/README.md` + `design/screenshots/` (empty — export had none); `docs/FINAL_DESIGN_HANDOFF.md`, `SCREEN_INVENTORY.md`, `COMPONENT_INVENTORY.md`, `DESIGN_TOKENS.md`, `RESPONSIVE_BEHAVIOR.md`, `INTERACTION_SPEC.md` (all copied verbatim from `export/`, preserved as raw backup); `docs/EXPORT_INVENTORY.md`, `docs/DESIGN_EXPORT_VERIFICATION.md`.

**Phase 0 engineering:**

| Area | Files |
|---|---|
| Project config | `package.json`, `tsconfig.json` (strict + `noUncheckedIndexedAccess`), `next.config.ts`, `eslint.config.mjs`, `vitest.config.ts`, `playwright.config.ts`, `.env.example`, `.gitignore` |
| ADRS formula | `src/lib/adrs/index.ts` (canonical, [LOCKED]), `src/lib/adrs/index.test.ts` (27 tests) |
| Schemas | `src/lib/schemas/enums.ts`, `src/lib/schemas/index.ts` (Zod = normative source); generated `schemas/*.schema.json` ×7 via `scripts/generate-json-schemas.ts` |
| Validation | `src/lib/validation/buildProfile.ts`, `integrity.ts` (10 validators), `loadDataset.ts`, `pageData.ts`; `scripts/validate.ts` (build gate) |
| Seeds | `src/data/seeds/capabilities.json` (C1–C12), `risks.json` (R1–R12) — SPEC §10/§11 verbatim |
| Fixtures | `src/data/fixtures/scenarios.json` (3, with §10 capability intensities), `assessments.json` (12), `sources.json` (2), `instruments.json` (1), `provisions.json` (2) — all `fixture:true`, all blatantly fictional |
| Route shells | `src/app/`: layout + `/', /policies, /policies/[id], /provisions/[id], /compare, /scenarios, /scenarios/[id], /calculator, /controls, /brief, /methodology, /changelog` + `_not-found` |
| Components | `src/components/FixtureBanner.tsx`, `src/components/AdrsCalculator.tsx` (client island, imports canonical module) |
| Tests | `src/test/integration/pipeline.test.ts` (18 tests), `e2e/smoke.spec.ts` (3 tests) |
| CI | `.github/workflows/ci.yml` |

## 2. Architecture summary

Next.js 15 (App Router) + TypeScript strict. All pages are server components pre-rendered at build; the only client island is the minimal calculator. Content is JSON under `src/data/` validated by **one pipeline** (`scripts/validate.ts` → Zod shape checks → cross-record integrity) that gates both build scripts (`build:fixtures`, `build:production`). The ADRS math lives in exactly one module imported by the UI island, the integrity recompute, and every test — no duplicated formulas (ENG §1 [LOCKED]).

## 3. Schema strategy

**Zod is the single normative source (MN-15/ENG §8).** `src/lib/schemas/` defines every enum (SPEC §8–§11 verbatim), citation/source/instrument/provision/epistemic-block/scenario/assessment/control shapes with all revision-era rules: dual quote limit (≤50 words AND ≤350 chars, OD-3), `translation_source_id` required with `quote_translated` (OD-4), provision-level `bindingness` override (MJ-2), `last_verified` distinct from `as_of_date` (MJ-1), kind-conditional epistemic requirements incl. "Tier 3 never cites a fact" and "recommendations carry no confidence" (§20/§21), strict assessment objects that **reject author-supplied computed fields** (§18.3). `schemas/*.schema.json` are generated artifacts stamped "GENERATED … Zod is normative"; CI fails if they drift.

## 4. ADRS implementation summary

`src/lib/adrs/index.ts` implements SPEC §13 exactly: weights A.25/T.20/D.20/E.15/R.20; credits M1–M9; `min(0.40, Σ)` credit cap; `J = min(1.30, 1 + Σ w·c)`; `min(100, residual×J)`; **half-open tiers** [0,25)/[25,50)/[50,75)/[75,100] computed from the **raw** score; `displayScore` (1 dp) fully separated and never re-entered. The F-1 floating-point finding is honored and regression-tested: the unclamped IEEE-754 J sum is 1.3000000000000003, so the clamp is load-bearing (`index.test.ts` asserts both the raw overflow and the clamped exact 1.30). Input guards reject non-integer anchors, duplicate mitigation classes, and non-0/1 J components.

## 5. Fixture strategy

Three §14 scenarios carry explicit capability intensities on the §10 scale (CB-1/MD-2). Twelve assessments (scenario × 4 jurisdictions) store dims + justifications (≥40 chars), mitigation evidence (≥40 chars), and 0/1 J components whose notes all read "FICTIONAL fixture value, illustrative pending Phase 1 research (OD-11/MD-3)". Computed scores are **never stored** — pages recompute through the canonical module. One overtly fictional instrument ("Fictional Agentic Systems Act (FIXTURE — NOT A REAL INSTRUMENT)", `example.invalid` URLs) with two provisions exercises the typed Fact→Inference→Recommendation chain, provision-level bindingness override, and the compare count. **No real policy facts exist anywhere in the repository.**

## 6. Build-profile behavior (CB-4)

`BUILD_PROFILE=fixtures|production`, default **production** (fail-closed). Fixtures: renders fixture content behind the persistent "FIXTURE DATA — ILLUSTRATIVE ONLY" banner (non-dismissible, every page, e2e-verified); allowed for dev/tests/screenshots only. Production: `getPageDataset()` serves no fixture content; validation rejects every `fixture:true` record (R7) and any `review_status ≠ published` (R8); `assertNotFixtureDeploy()` aborts when `BUILD_PROFILE=fixtures` meets `DEPLOY_ENV=production` (rule 10). Verified live: fixtures build exits 0 with 12 routes; production validation exits 1 with exactly 20 R7 rejections; deploy guard exits 1. Math-protecting checks run in **both** profiles.

## 7. Integrity validators (all 10 required)

| # | Requirement | Implementation |
|---|---|---|
| 1 | published content has source metadata | `checkSourceMetadata` (resolvable `source_id`/`translation_source_id`, non-empty rationale) |
| 2 | facts/inferences/recommendations stored separately | `EpistemicBlockSchema` kind-conditional rules + `checkEpistemicSeparation` (unique ids, resolvable `based_on`) |
| 3 | last_verified distinct from as_of_date | schema-required fields + `checkDateFields` (present, ordered) |
| 4 | provision bindingness may override instrument | `effectiveBindingness()` helper + `checkBindingnessResolution` |
| 5 | A/T/R identical across jurisdictions | `checkDimensionInvariance` (R5) |
| 6 | D/E divergence needs jurisdiction-specific justification | `checkDimensionInvariance` (R6) |
| 7 | production rejects fictional fixtures | `checkNoFixturesInProduction` (R7) |
| 8 | production rejects non-published | `checkPublishedOnlyInProduction` (R8) |
| 9 | fixture builds display the banner | `FixtureBanner` in root layout; e2e asserts exact text on every route |
| 10 | fixture mode unusable for production deploy | `assertNotFixtureDeploy` + CI guard job |

Plus the ADRS recompute gate (caps/tiers re-verified per assessment, both profiles).

## 8. Route shells

All 12 required routes render without crashing (e2e-verified, zero console errors), share the root layout (banner + disclaimer + nav), use fixture data only, and are visibly marked "Phase 0 shell" with no polished styling. Detail routes SSG from fixture ids (`dynamicParams=false`). `/compare` implements the MD-11 rule (currently-applicable binding provisions, build-date reference, **no intensity threshold**); `/scenarios/[id]` recomputes stored assessments through the canonical module; `/calculator` wires the formula live with manual J toggles and reference-only jurisdiction selection (CB-3).

## 9. Known limitations

1. `npm run build:production` **fails by design** in Phase 0 — the corpus is 100% fixtures, and the gate correctly rejects it. A deployable production build first becomes possible when Phase 1 publishes real, non-fixture content. This is CB-4 working, not a defect.
2. Route naming follows this task's list (`/policies`); SPEC §16 canonical is `/instruments` — divergence logged as open question Q1 in `IMPLEMENTATION_DECISIONS.md`.
3. The calculator is logic-complete but low-fi: no URL permalink state (P1-6), no anchor rubric text, no per-jurisdiction reference content (placeholders note Phase 1).
4. Tracker filtering/sorting, evidence side panel, brief export, changelog data — all deliberately deferred (P1/P2/P3 per backlog).
5. `design/screenshots/` is empty (export contained none — the sole design-export warning).
6. E2E runs against `next dev` (fixtures profile) for speed; CI could switch to `build+start` later.

## 10. Deferred Phase 1 work

P1-0 design system (5 disjoint palettes per DESIGN_TOKENS), P1-15 rendered templates to design fidelity, P1-1..4 semantic components (EpistemicBlock/CitationPopover/ClassificationChips/ConfidenceChip), P1-5..6 full calculator UX (anchors, permalink, deep links), P1-7..12 full pages, P1-14 expanded Playwright suite; `/instruments` rename (Q1); Phase 1 research corpus (EU→US→CN→SG) — **no real policy content was created in Phase 0**.
