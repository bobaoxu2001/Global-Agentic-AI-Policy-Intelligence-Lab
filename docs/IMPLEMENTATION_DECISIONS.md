# Implementation Decisions — Phase 0

**Date:** 2026-07-11. Engineering decisions made during Phase 0, deviations from the handoff documents, and genuinely open questions. Methodology itself was **not** altered anywhere (SPEC §13 constants, caps, tiers, and epistemic rules are byte-consistent with the docs).

## Key engineering decisions

1. **Next.js 15 App Router, hand-scaffolded** (no `create-next-app`) for a pinned, minimal dependency set. All shells are server components; the calculator is the single client island — mirroring ENG §1's "one interactive component" posture.
2. **Zod is the normative schema source (MN-15/ENG §8).** `schemas/*.schema.json` are generated (`npm run schemas:json`), stamped as generated, and CI fails on drift (`git diff --exit-code schemas/`). Zod refinements that don't round-trip (word counts, kind-conditional epistemic rules) simply govern from the Zod side, as the handoff prescribes.
3. **One formula module.** UI island, integrity recompute, unit/integration/e2e tests all import `src/lib/adrs/index.ts`. No numeric constant for ADRS exists anywhere else in `src/`.
4. **Computed scores are never persisted.** Assessments store inputs only (strict Zod rejects `inherent/residual/final/tier`); pages and validators recompute on demand. This makes SPEC §18.3's "single source of truth = formula code" structural rather than procedural.
5. **Validation is a build gate, not a test.** `build:fixtures` / `build:production` both run `scripts/validate.ts` first; `next build` cannot run on invalid content (FR-13). Errors are collected and reported in batch, never fail-fast (ENG §16).
6. **Integrity validators are pure functions** over an in-memory dataset, unit-testable by construction; profile-dependent rules (R7/R8) take the profile as an argument instead of reading env, so tests can exercise both profiles without env mutation.

## Deviations from handoff documents (all logged, none methodological)

| # | Deviation | Reason | Status |
|---|---|---|---|
| D1 | Routes use `/policies`, `/calculator`, `/brief` per this task's explicit route list; SPEC §16 / design README use `/instruments`, `/risk-score`, `/scenarios/{slug}/brief` | Task instruction is the operative order for Phase 0 shells | Open question Q1 — rename in P1 |
| D2 | Phase 0 ships a *minimal functional* calculator rather than a static shell | Proves single-module math end-to-end in a browser; unstyled, ~150 lines; explicitly not the P1-5 UX (no permalink, no anchor text) | Within scope: shells "use placeholder fixture data, no polished styling" |
| D3 | E2E uses `next dev` (fixtures profile) as the Playwright web server | Fastest reliable local loop; CI can later switch to `build+start` | Non-normative |
| D4 | `mitigationCredit` throws on duplicate mitigation classes | Defensive: silent dedup could mask authoring errors | Stricter than spec, never looser |
| D5 | `checkDateFields` also rejects `last_verified < as_of_date` | Cheap ordering sanity on top of MJ-1's "distinct fields" | Stricter than spec |

## Floating-point handling (F-1)

IEEE-754 makes `1.00+0.10+0.05+0.05+0.10 = 1.3000000000000003`, so the "J cap is a no-op" prose is false in float arithmetic. Decisions: (a) the clamp stays in production code (`Math.min(J_CAP, raw)`); (b) a dedicated regression test asserts the raw sum exceeds 1.30 **and** the clamped result is exactly `1.3`; (c) all test assertions on chained values use tolerance ±0.001 per SPEC §13.7; (d) `displayScore` (round-half-up to 1 dp) is a separate function whose output is never re-entered — enforced by a guard test comparing the raw chain (56.445) to the wrongly-rounded chain (56.4).

## Schema source of truth

Zod (`src/lib/schemas/`) → TypeScript types via `z.infer`/`z.output` → generated JSON Schema artifacts. Enum lists exist exactly once (`enums.ts`). The Dataset type used by validators derives from Zod outputs, so a schema change propagates compile-time errors into every validator and page.

## Fixture / production separation (CB-4)

- Profile default is **production** (fail-closed): a mis-set environment renders *nothing* fictional rather than everything.
- Fixture records carry `fixture:true` at the record level (not directory level), so the production gate cannot be bypassed by moving files.
- The banner text is a single exported constant (`FIXTURE_BANNER_TEXT`) asserted verbatim by integration and e2e tests — it cannot drift.
- Deploy protection is layered: R7 record rejection + `assertNotFixtureDeploy` env guard + CI job that *requires* the production-profile validation to fail while fixtures exist.

## Unresolved engineering questions

| Q | Question | Proposed default |
|---|---|---|
| Q1 | Rename `/policies`→`/instruments`, `/calculator`→`/risk-score`, brief under scenario (SPEC §16 vs this task's route list) | Rename in P1-15 when design-fidelity templates land; add redirects |
| Q2 | When should `build:production` first be expected to pass? | First Phase 1 publish of ≥1 real, reviewed, non-fixture instrument (then CI gains a green production-build job alongside the fixture-rejection job) |
| Q3 | E2E server: switch CI to `next build && next start` for parity? | Yes, once P1 templates stabilize |
| Q4 | `assessed_by` for fixtures is `"fixture-author"` — introduce real reviewer identities with the §19.4 two-pass log in Phase 1? | Yes; review_log content files arrive with P2-14 |
