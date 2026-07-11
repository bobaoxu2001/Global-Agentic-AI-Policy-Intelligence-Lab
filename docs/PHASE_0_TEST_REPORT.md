# Phase 0 Test Report — AI Policy Atlas

**Date:** 2026-07-11 · **Environment:** macOS (darwin), Node v22.22.0, npm 10.9.4. Every result below is from a **real command run in this repository**; nothing is claimed that did not execute.

## Command summary

| # | Command | Result | Detail |
|---|---|---|---|
| 1 | `npm install` | ✅ PASS | 365 packages in 54s |
| 2 | `npm run lint` (eslint .) | ✅ PASS | 0 errors, 0 warnings |
| 3 | `npm run typecheck` (tsc --noEmit, strict + noUncheckedIndexedAccess) | ✅ PASS | clean |
| 4 | `npm test` (Vitest unit) | ✅ PASS | **27/27 tests**, 1 file (`src/lib/adrs/index.test.ts`), 989ms |
| 5 | `npm run test:integration` (Vitest) | ✅ PASS | **18/18 tests**, 1 file (`src/test/integration/pipeline.test.ts`), 1.09s |
| 6 | `BUILD_PROFILE=fixtures npm run validate` | ✅ PASS (exit 0) | counts `{capabilities:12, risks:12, sources:2, instruments:1, provisions:2, scenarios:3, assessments:12}`; "OK — all schema and integrity checks passed" |
| 7 | `BUILD_PROFILE=production npm run validate` | ✅ PASS (exit 1, **required**) | **exactly 20 × `R7-no-fixtures-in-prod`** rejections (all 20 fixture records); "FAILED — build aborted" |
| 8 | `BUILD_PROFILE=fixtures DEPLOY_ENV=production npm run validate` | ✅ PASS (exit 1, **required**) | "GATE FAILURE: BUILD_PROFILE=fixtures cannot be deployed to production" |
| 9 | `npm run schemas:json` | ✅ PASS | 7 JSON Schema artifacts generated from Zod |
| 10 | `npm run build:fixtures` (validate + next build) | ✅ PASS (exit 0) | 12 routes prerendered; SSG params from fixtures (`/scenarios/{aria,sentinel,mira}`, `/provisions/…art7, …art12`, `/policies/fx-fictional-agentic-act`) |
| 11 | `npm run build:production` | ✅ PASS (exit 1, **required**) | fails at the validation gate with the same 20 R7 rejections — the production fixture-rejection test at build level (CB-4 working as designed) |
| 12 | `npx playwright install chromium` | ✅ PASS | Chromium 138.0.7204.23 (83.9 MiB) |
| 13 | `npm run test:e2e` (Playwright, fixtures profile) | ✅ PASS | **3/3 tests**, 27.4s |

**Totals: 48 automated tests executed, 48 passed, 0 failed, 0 skipped** (27 unit + 18 integration + 3 e2e), plus 5 gate/build commands with their required exit codes.

## Formula checks (unit, raw values, tolerance ±0.001 — SPEC §13.7)

- `inherentRisk({A3,T3,D3,E2,R2})` = **66.25** ✓
- `mitigationCredit([M2,M3,M4,M5,M8])` = **0.29**; `residualRisk(66.25, 0.29)` = **47.0375** ✓
- Unrounded chain: `adrs(47.0375, 1.20)` = **56.445** → tier **high**; `adrs(·, 1.10)` = **51.74125** → high; displays **47.0 / 56.4 / 51.7** ✓
- Sentinel: inherent **62.5**, credit **0.32**, residual **42.5** → moderate at J 1.05/1.10 ✓
- Mira: inherent **58.75**, credit **0.15**, residual **49.9375** (→ *moderate* pre-J — half-open boundary exercised); CN `×1.30` = **64.91875** high; EU `×1.25` = **62.421875** high ✓
- Guard test (AC-ADRS-12): raw path 56.445 ≠ wrongly-rounded path 56.4; `displayScore` output never re-entered ✓

## Boundary checks (half-open tiers, CB-2)

`tierOf`: 24.999→low · 25.000→moderate · 49.999→moderate · 50.000→high · 74.999→high · 75.000→critical · 0→low · 100→critical ✓ ; out-of-range and NaN throw ✓ ; tier from raw not display (49.96 → moderate though it displays 50.0) ✓

## Mitigation cap & J multiplier checks

- ΣM1..M9 = 0.50 → clamps to **0.40**, `creditCapped=true` ✓
- Property test over **all 512 mitigation subsets**: credit ≤ 0.40 and residual ≥ 60% of inherent, always ✓
- **F-1 regression:** raw IEEE-754 sum `1.00+0.10+0.05+0.05+0.10` > 1.30 asserted true; `jMultiplier(all four =1)` === **1.30 exactly** after clamping ✓
- Property test over all 16 J combinations: J ∈ [1.00, 1.30] ✓ ; binding+near = 1.15 ✓ ; `adrs(90, 1.30)` clamps to 100 → critical ✓
- Jurisdiction labels are not a formula input (module has no jurisdiction parameter); e2e additionally proves selecting "eu" changes neither J (stays 1.00) nor residual (stays 47.0375) — AC-ADRS-10 ✓

## Build-profile checks (CB-4)

- Fixtures validate: exit 0 ✓ · Fixtures build: exit 0, banner on every page (e2e: exact text "FIXTURE DATA — ILLUSTRATIVE ONLY" on all 9 static routes, zero console errors) ✓
- Production validate AND production build: exit 1 with **20/20** fixture records individually rejected (R7) ✓
- Fixture-deploy guard: exit 1 with explicit gate message ✓
- `getBuildProfile({})` defaults to **production** (fail-closed); unknown profile throws ✓

## Integrity validation checks (integration)

- Shipped fixture corpus: 0 schema errors, 0 integrity errors; every scenario assessed in all 4 jurisdictions ✓
- All 12 fixture assessments recompute through the canonical module within caps ✓ (expectations derived from fixture files, not literals — MJ-10)
- R5: mutated Aria-EU A=4 → A/T/R invariance violation detected ✓ ; R6: D divergence accepted **with** justification, rejected **without** ✓
- Crafted-bad rejections: author-supplied `final`/`tier` ✗ ; justification <40 chars ✗ ; 60-word quote under 350 chars ✗ (OD-3) ; `quote_translated` without `translation_source_id` ✗ (OD-4) ; Tier-3-only fact citation ✗ (§21.5) ; recommendation with confidence ✗ (§20.1) ; unknown enum `instrument_type:"law"` ✗ ; draft record in production ✗ (R8) ✓ all rejected as required

## E2E (Playwright, real browser, fixtures profile)

1. All 9 static route shells render with the fixture banner; zero page errors — 8.0s ✓
2. Scenario page renders per-jurisdiction rows counted from fixture files (MJ-10) — 1.9s ✓
3. Calculator: Aria dims → inherent 66.25; M2..M8 → credit 0.29, residual 47.0375; **jurisdiction select → J unchanged at 1.00**; manual toggles → J 1.20, final displays 56.4, tier high; all 9 mitigations → cap notice visible, credit 0.40 — 1.7s ✓

## Unresolved failures

**None.** Every failing exit code above is a *required* failure (production fixture-rejection and deploy guard) and is asserted as such in CI (`.github/workflows/ci.yml` inverts those exit codes).
