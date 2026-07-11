# AI Policy Atlas — Phase 0 Independent Engineering Review (v2)

**Date:** 2026-07-12 · **Reviewer:** independent engineering review of the implemented Phase 0.
**Supersedes:** the 2026-07-11 v1 review (FAIL — implementation absent). Phase 0 now exists; this review audits it as-is and reproduces every claim itself. Reviewed at commit `bc177a2`; fixes landed as `cb4a96e`.

---

## 1. Method

Every reported result was **reproduced, not trusted**: all commands below were run fresh against the working tree, and each audit area was checked against source with file:line references. Two defects were additionally **proven with live reproductions** before fixing (see §4).

### Commands run (real output, this review)

| Command | Result |
|---|---|
| `npm run lint` | 0 errors, 0 warnings |
| `npx tsc --noEmit` | clean |
| `npm test` (unit) | **27/27 passed** (`src/lib/adrs/index.test.ts`) |
| `npm run test:integration` | pre-fix **18/18**; post-fix **22/22** (4 regression tests added) |
| `npm run test:e2e` | **3/3 passed** (fixtures profile, Chromium) |
| `BUILD_PROFILE=fixtures npm run validate` | exit 0 — "all schema and integrity checks passed" |
| `BUILD_PROFILE=production npm run validate` | exit 1 — exactly **20 × R7-no-fixtures-in-prod** (all 20 fixture records rejected) |
| `BUILD_PROFILE=fixtures DEPLOY_ENV=production npm run validate` | exit 1 — "GATE FAILURE: BUILD_PROFILE=fixtures cannot be deployed to production" |
| `npm run schemas:json` + `git diff schemas/` | no drift |
| `npm run build:fixtures` | exit 0 — 12 routes prerendered (SSG paths from fixtures) |
| `npm run build:production` | exit 1 at the validation gate (20 × R7) — **correct by design** in Phase 0 |

**Reproduced test totals: 52** (27 unit + 22 integration + 3 e2e), all passing after fixes.

---

## 2. Audit results by area (25 requested areas)

| # | Area | Verdict | Evidence |
|---|---|---|---|
| 1 | ADRS arithmetic | ✅ | Constants digit-identical to SPEC §13: `WEIGHTS` (adrs/index.ts:17), `MITIGATION_CREDITS` (:19), caps (:31–32), `J_COMPONENT_WEIGHTS` (:35). Worked examples reproduce at ±0.001 (unit tests §12.1.1–5) |
| 2 | Tier boundaries | ✅ | `tierOf` (:109) half-open `<25/<50/<75`; boundary tests at 24.999/25.000/49.999/50.000/74.999/75.000/0/100 pass; out-of-range throws |
| 3 | Full precision | ✅ | No intermediate rounding anywhere in the chain; guard test proves raw path (56.445) ≠ rounded path (56.4) |
| 4 | Display rounding separation | ✅ | `displayScore` (:120) is display-only; tier computed from raw (`computeAdrs` passes raw `final` to `tierOf`); "49.96 → moderate though displays 50.0" tested |
| 5 | Mitigation cap | ✅ | `min(0.40, Σ)`; exhaustive 512-subset property test asserts credit ≤0.40 and residual ≥60% of inherent |
| 6 | J multiplier inputs | ✅ | Pure function of four 0/1 components only — **no jurisdiction parameter exists in the API**; non-0/1 rejected (:92–94) |
| 7 | Floating-point clamp (F-1) | ✅ | Verified live: unclamped IEEE sum = 1.3000000000000003; clamp makes all-four = exactly 1.3; both asserted in tests; 16-combination property test |
| 8 | Zod schema correctness | ✅ after fix | Enums verbatim from SPEC §8–§11; dual quote limit, translation-source rule, bindingness override, kind-conditional epistemic rules, strict assessment (computed fields rejected) all verified by crafted-bad tests. **Defect found & fixed:** Tier-1 archive rule was claimed in comments but unimplemented (F2, §4) |
| 9 | Generated JSON Schemas | ✅ with caveat | 7 artifacts regenerate drift-free; CI enforces. Caveat (inherent to MN-15 policy): Zod refinements (word counts, conditional rules, the new Tier-1 rule) do **not** appear in generated JSON — the files are stamped "Zod is normative" and must never be used as the sole validator |
| 10 | Fixture/production separation | ✅ | R7 rejects all 20 `fixture:true` records in production (reproduced); `getPageDataset` serves no fixture content in production; fixtures build renders them behind the banner |
| 11 | Deployment guard | ✅ | `assertNotFixtureDeploy` (buildProfile.ts) aborts fixtures+DEPLOY_ENV=production (reproduced, exit 1); default profile is `production` (fail-closed); unknown profile throws; CI has a dedicated inverted-exit guard step |
| 12 | Integrity validators | ✅ after fix | All 10 required validators present and unit/integration-tested; ADRS recompute gate runs in both profiles. **Gap found & fixed:** no uniqueness check for SPEC §17's `UNIQUE (scenario_id, jurisdiction_id, version)` (F3, §4) |
| 13 | A/T/R invariance | ✅ | `checkDimensionInvariance` R5; mutation test (Aria EU A→4) fails correctly |
| 14 | D/E divergence justification | ✅ | R6: justified divergence accepted, unjustified rejected — both directions tested |
| 15 | Source metadata validation | ✅ | `checkSourceMetadata` resolves `source_id`/`translation_source_id`, non-empty rationale; orphan-reference test passes |
| 16 | Fact/inference/recommendation separation | ✅ | Kind-conditional schema (facts: citations+confidence, Tier-3-never-cites-fact; inferences: confidence+based_on; recommendations: based_on, **no confidence**) + `checkEpistemicSeparation`; crafted-bad tests for each |
| 17 | Environment validation | ✅ | `getBuildProfile` validates enum, fail-closed default; `.env.example` documents both vars and the no-secrets policy |
| 18 | Route shells | ✅ | All 12 required routes render (e2e loop, zero console errors); SSG from fixture ids with `dynamicParams=false`; `/compare` implements MD-11 (no intensity threshold, build-date reference); shells marked "Phase 0" |
| 19 | Fixture banner | ✅ | Exact text `FIXTURE DATA — ILLUSTRATIVE ONLY` asserted on every route in e2e; absent in production profile (component returns null) |
| 20 | Test completeness | ✅ | ENG §12.1 items 1–12 all present; §12.2 crafted-bad set covered; e2e covers banner/shells/calculator incl. the CB-3 no-auto-J flow; MJ-10 honored (scenario expectations read from fixture files; only pure formula tests hardcode) |
| 21 | CI correctness | ✅ | Order matches ENG §13; includes production-rejection gate and deploy-guard as *inverted* checks (pass = gate fails), schema-drift check, dual builds; deploy job intentionally absent with CB-4 conditions documented |
| 22 | Security | ✅ | No secrets (grep-scanned), no `dangerouslySetInnerHTML`/`eval`/network calls in `src/`; design prototype's Google-Fonts link is not part of the served app; `.gitignore` blocks `.env` |
| 23 | Methodology drift | ✅ none | Every constant, boundary, and rule verified against SPEC §10/§12/§13/§13.7; fixture J notes all marked "FICTIONAL … (OD-11/MD-3)"; no real policy claims anywhere (all fixture sources use `example.invalid`) |
| 24 | Brittle assumptions | ⚠ 3 noted | See §5 — none blocking |
| 25 | Reports vs. code | ✅ after fix | Every claim in both Phase 0 reports reproduced exactly. One mismatch found: the CitationSchema comment claimed an unimplemented refinement (fixed, F2). Report test totals (48) are now 52 after this review's regression tests — noted here so the audit trail stays truthful |

---

## 3. Findings by severity

**High — none.**

**Medium — 3 found, 3 fixed (see §4).**

**Low / observations (not fixed — outside "high-confidence defect" bar or explicitly P1 scope):**

| # | Finding | Location | Why left |
|---|---|---|---|
| L1 | §20.5 word-ban lint ("likely/should/…" over analyst-authored fields) not implemented | validation layer | Not among the 10 required Phase 0 validators; belongs with P1 content tooling. Tracked. |
| L2 | Cross-provision `based_on` refs (containing `:`) bypass epistemic-reference validation | integrity.ts:58 | Deliberate escape hatch; cross-record resolution needs the P1 content graph. Tracked. |
| L3 | `paraphrase_en` enforces ≤600 chars but not the §17 comment's "≤80 words" | schemas/index.ts | Revised SPEC §18.2 (normative) specifies maxLength 600 only; no contradiction, noted for P1 tightening. |
| L4 | E2E runs against `next dev`, not `build`+`start` | playwright.config.ts | Faster loop; behavior-identical for these assertions. CI can harden later. |
| L5 | Route naming `/policies` vs SPEC §16 `/instruments` | src/app/policies | Known divergence, logged as Q1 in IMPLEMENTATION_DECISIONS; rename in P1. |

---

## 4. Defects fixed (commit `cb4a96e`, separate from this report)

**F1 — MEDIUM: `currentVersions` violated MD-4.**
`src/lib/validation/integrity.ts` (pre-fix :178–186) selected the highest version of **any** review status, while its own docstring and MD-4 require "highest version whose `review_status='published'`". **Proven live:** `[published v1, draft v2] → draft v2`. A draft re-score would have silently replaced a published score on scenario pages and in the A/T/R invariance check. **Fix** (:184–201): published versions always win per key; non-published fallback only where a key has no published version (preserves the CB-4 fixtures-profile relaxation). Regression tests added.

**F2 — MEDIUM: Tier-1 archive rule documented but not enforced (comment/code mismatch).**
`src/lib/schemas/index.ts` comments on CitationSchema/SourceSchema claimed the §21.6/MJ-7 rule; **no refinement existed** — a Tier 1 source with neither `archived_url` nor a logged manual verification validated cleanly, directly contradicting SPEC §21.6/PRD §24.9 ("hard failure"). **Fix** (:77–86): `SourceSchema.superRefine` — `tier===1` requires `archived_url` **or** `manual_verification_date`; `stable_ref` explicitly does not substitute; CitationSchema's false comment replaced with an accurate pointer. Shipped fixtures already carried `archived_url`, so no fixture change. Regression tests cover accept/reject/both-alternatives/tier-2-exempt/stable-ref-insufficient.

**F3 — MEDIUM: SPEC §17 `UNIQUE (scenario_id, jurisdiction_id, version)` had no pipeline equivalent.**
There is no database in the content-as-files pipeline, so nothing enforced the uniqueness constraint; **proven live:** two `(aria, eu, v1)` records → one silently dropped by map-overwrite, corrupting version selection undetectably. **Fix:** `checkVersionUniqueness` (integrity.ts:203–215), wired into `runIntegrity` (:217+), with regression test.

All three fixes are spec-restoring (MD-4, §21.6, §17) — **no methodology change, no new features.** Post-fix full regression: lint 0 · tsc clean · 27 + 22 + 3 = 52/52 · fixtures validate OK · production rejects 20 · deploy guard holds · schemas drift-free · fixtures build OK.

---

## 5. Remaining risks

1. **Generated JSON Schemas are lossy by design** (MN-15): refinements (incl. F2's rule) exist only in Zod. Anyone validating with the JSON artifacts alone gets weaker checks. Mitigation: files are stamped "Zod is normative"; keep it that way.
2. **`build:production` fails until Phase 1 real content exists** — correct CB-4 behavior, but a future engineer may be tempted to weaken R7 to "make the build green." The CI gate is inverted (green = rejection works) precisely to resist this; do not remove it.
3. **E2E label-locator coupling** — calculator tests locate mitigation toggles by label-text regex (`^M2 `); P1 restyling must keep `data-testid`s or update locators.
4. **Compare-page reference date** is module-load time (`BUILD_DATE`) — correct for SSG; if ISR/long-lived dev servers appear later, revisit.
5. **F-1 discipline**: the J clamp is load-bearing in floating point (regression-tested here). Any "cleanup" removing `Math.min(J_CAP, …)` will break exact-1.30 behavior.

---

## 6. Final verdict

# **PASS WITH FIXES**

The implementation is faithful to the locked methodology — every constant, boundary, cap, and epistemic rule verified against SPEC and reproduced by 52 passing tests, with the fixture/production separation and both deployment gates working exactly as specified. The three medium defects found (MD-4 version selection, unenforced Tier-1 archive rule, missing §17 uniqueness check) were real, spec-grounded, proven with live reproductions, fixed surgically in `cb4a96e`, and covered by new regression tests. No high-severity issues, no methodology drift, no security findings, no report falsification — the prior reports' claims all reproduced. Phase 0 stands; proceed to P1 with the five tracked risks above.
