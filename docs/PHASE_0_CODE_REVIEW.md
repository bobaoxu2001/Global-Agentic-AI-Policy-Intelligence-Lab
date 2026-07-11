# AI Policy Atlas — Phase 0 Independent Engineering Review

**Date:** 2026-07-11 · **Reviewer:** independent engineering review (not the implementation author)
**Requested scope:** full repository, SPEC.md, ENGINEERING_HANDOFF.md, ACCEPTANCE_CRITERIA.md, METHODOLOGY_DECISIONS.md, PHASE_0_IMPLEMENTATION_REPORT.md, PHASE_0_TEST_REPORT.md.

---

## 0. Primary Finding — the review target does not exist

**Phase 0 has not been implemented in this repository.** This review cannot audit code that is not there, and it will not simulate a review of imagined artifacts.

**Evidence (repository inventory, 2026-07-11):**

```
Global Agentic AI Policy Intelligence Lab/
├── SPEC.md
└── docs/
    ├── ACCEPTANCE_CRITERIA.md      ├── IMPLEMENTATION_BACKLOG.md
    ├── DESIGN_HANDOFF.md           ├── METHODOLOGY_DECISIONS.md
    ├── ENGINEERING_HANDOFF.md      ├── PRD.md
    └── REVISION_LOG.md
```

Absent (checked by filesystem search of the project and all sibling directories under `AI Projects/`):

| Expected artifact (ENG §18 Phase 0 DoD) | Status |
|---|---|
| `docs/PHASE_0_IMPLEMENTATION_REPORT.md` (named in the review request) | **does not exist** |
| `docs/PHASE_0_TEST_REPORT.md` (named in the review request) | **does not exist** |
| Repo/CI skeleton (`package.json`, `.github/workflows/ci.yml`, tsconfig) | does not exist |
| `/src/lib/zod/*` (normative Zod schemas) + `/schemas/*.json` | does not exist |
| `/src/lib/adrs.ts` (locked formula module) + unit tests | does not exist |
| Seed files (`capabilities.json`, `risks.json`, enums) | does not exist |
| Fixtures (3 scenarios + 12 assessments, `fixture:true`) | does not exist |
| Validation/integrity pipeline (`build-data`, `integrity.ts`) → `/data/atlas.json` | does not exist |
| `BUILD_PROFILE` handling | does not exist |
| Low-fi wireframes (Phase 0 design deliverable) | does not exist |

The repository is not a git repository, so no history exists in which these artifacts might have been committed and removed. Conclusion: either Phase 0 was never started, or it was executed in an environment whose output was never synced here. **A review request that names implementation and test reports which do not exist is itself a process defect** — future review requests should be gated on the artifacts being present.

Because there is no code, the audit items below are split into: (A) what could be audited today (the normative spec-side artifacts Phase 0 must implement), and (B) what is blocked.

---

## A. Audited today — specification-side verification (independent recomputation)

The reviewer recomputed every normative number from first principles (script: `adrs_audit.py`, scratchpad; weights/credits/caps taken from SPEC §13 only, results compared against SPEC §14 / AC §5 / ENG §12.1 within ±0.001 per §13.7).

### A1. ADRS calculations — **PASS**
All 21 numeric checks match:
- **Aria:** inherent 66.25; credit 0.29; residual 47.0375; EU 56.445; SG/US 51.74125 — all OK.
- **Sentinel:** inherent 62.5; credit 0.32; residual 42.5; finals 44.625–46.75 — all OK.
- **Mira:** inherent 58.75; credit 0.15; residual 49.9375; CN 64.91875; EU 62.421875; US/SG 54.93125 — all OK.
- One trivial doc-precision note: ENG §12.1.3 states SG/US as 51.74125 (exact); SPEC §14.1 shows 51.741 (display-truncated in prose). Within the ±0.001 convention; no action.

### A2. Tier boundaries — **PASS**
Half-open intervals verified at 0, 24.999, 25.000, 49.999, 50.000, 74.999, 75.000, 100 → low/low/moderate/moderate/high/high/critical/critical. SPEC §12, PRD §11, ENG §9, AC-ADRS-7, DES §8 are mutually consistent. All 12 scenario×jurisdiction tiers recomputed: Aria High×4, Sentinel Moderate×4, Mira High×4 — matches §14.

### A3. Full-precision behavior — **PASS (spec level)**
§13.7 convention is coherent and propagated (no intermediate rounding; display 1 dp; tier from raw; tests ±0.001). ENG §12.1.12's guard test (raw-chain ≠ rounded-chain) is correctly constructed: 56.445 vs 56.4.

### A4. Mitigation cap — **PASS**
ΣM1..M9 = 0.50 → clamps to 0.40 exactly; residual floor = 60% of inherent holds; per-credit values in ENG §9 `MITIGATION_CREDITS` match SPEC §13.4 exactly.

### A5. Jurisdiction multiplier inputs — **PASS, with one real finding for implementation**
Component weights (0.10/0.05/0.05/0.10), 0/1 domains, `binding_hit` computability (intensity ≥2 + §13.5 operational applicability definition), and `assessed_date` anchoring all verified consistent.

> **Finding F-1 (brittle assumption, must be honored in `adrs.ts`):** in IEEE-754 arithmetic, `1.00 + 0.10 + 0.05 + 0.05 + 0.10 = 1.3000000000000003 > 1.30`. The documented claim that the J cap is "a defensive no-op at these weights" (AC-JUR-2, ENG §12.1.7) is **false in floating point**: without the `min(J_CAP, ·)` clamp, `jMultiplier` exceeds 1.30 by 3 ulp, and any exact-equality assertion (`=== 1.30`) fails. The clamp is therefore **load-bearing** and the AC-JUR-2 property test (J never exceeds 1.30) is the right test. Implementation must keep the clamp and must not "simplify it away" on the strength of the prose. No document change required — the normative rule (clamp + ±0.001 tolerance) already produces correct behavior — but the implementer should be aware the "no-op" remark is only true in exact arithmetic.

### A6. Zod schemas — **BLOCKED** (no code). Spec-side inputs (§18 + ENG §8 single-normative-source rule) are implementable as written; conditional requirements (§18.6 fact/inference/recommendation; `translation_source_id` iff `quote_translated`; dual quote-length refinement) are all expressible in Zod. No blocker.

### A7. Fixture/production separation — **BLOCKED** (no code). Design (BUILD_PROFILE table, `fixture:true`, banner, deploy gate, AC-INV-8) is complete and testable as specified.

### A8. Integrity validation — **BLOCKED** (no code). The 14-rule PRD §24 set + SPEC §17 rule 13 is enumerable and each rule has a crafted-bad-fixture test defined (ENG §12.2.1–15). No spec gap found.

### A9. Test completeness — **BLOCKED** (no tests exist). The defined suite (ENG §12.1.1–12, §12.2.1–15, §12.3 P-1–P-8) covers every locked formula property, every integrity rule, and the fixture-isolation boundary; adequate for Phase 0 **when implemented**.

### A10. Environment validation — **BLOCKED** (no code). ENG §15 env table is complete; reviewer notes `BUILD_PROFILE` default = `production` is the safe default (fail-closed against fixture leakage).

### A11. Methodology drift — **PASS**
No drift found among SPEC §13/§14, ENG §9 constants, AC §5–7, METHODOLOGY_DECISIONS MD-1…MD-12. Weights, credits, caps, tier intervals, intensity scale, and worked examples are digit-identical across documents.

### A12. Security issues — **PASS (docs) / BLOCKED (code)**
Static-only architecture, no runtime API/LLM, no PII capture, CSP guidance, no secrets in bundle, cookieless page counts off by default — sound. Nothing to audit in code yet.

### A13. Brittle assumptions — three found
- **F-1** (above): float sum of J weights exceeds 1.30; clamp is load-bearing.
- **F-2:** the prior verification's residues **N-1/N-2/N-3 remain unfixed** (confirmed by grep today): DESIGN_HANDOFF §11 still permits the keyword filter PRD §9 forbids; SPEC §6.5 "every record carries `last_verified`" still contradicts §17's instruments+provisions scope (AC-LV-1 inherits it); AC-SCN-3 still hardcodes CN/EU=High against MJ-10. These were the explicit pre-P1 cleanup conditions of the last verdict and were not done.
- **F-3:** the repository is **not under version control** (`git init` never run). NFR-5/NFR-6 (reproducibility, content versioning, `CONTENT_VERSION` = git SHA) and the append-only `review_log` discipline all presuppose git. Starting Phase 0 without it would violate the handoff's own assumptions from the first commit.

**Fixes applied by this review:** none. The instruction was to fix only high-confidence *engineering* defects — there is no code to fix, F-1 requires no document change (behavior is already correctly specified by clamp + tolerance), and F-2's document edits were explicitly assigned as pre-P1 cleanup owned by the methodology owner, not silently patched during an independent review.

---

## B. Blocked audit items

ADRS module correctness, Zod schema fidelity, fixture/production enforcement, integrity-pipeline behavior, test execution results, and environment validation **cannot be assessed** until the ENG §18 deliverables exist. No partial credit is given for well-specified-but-unbuilt components: Phase 0's gate is "schemas validate sample records; formula tests green" (SPEC §26), and no schema, sample record, formula module, or test exists to be green.

---

## C. Re-entry criteria for re-review

Re-request this review when ALL of the following are true:
1. `git init` done; all work committed (F-3).
2. ENG §18 items 1–6 exist in-repo: CI skeleton, Zod schemas + JSON mirrors, `adrs.ts` + §12.1 tests passing, seeds, 12 assessment fixtures (`fixture:true`, §14 values incl. capability intensities), pipeline emitting `/data/atlas.json` under `BUILD_PROFILE=fixtures`, wireframes.
3. `docs/PHASE_0_IMPLEMENTATION_REPORT.md` and `docs/PHASE_0_TEST_REPORT.md` actually exist and reflect real runs (test report must include the raw runner output).
4. F-1 respected: clamp present; no exact-equality float assertions.
5. N-1/N-2/N-3 document residues cleared (or explicitly waived by the owner).

---

## Final Verdict

# **FAIL**

Not on the merits of any code — on the absence of it. Phase 0 has not been implemented: none of the ten mandatory deliverables exists, and the two reports this review was asked to audit do not exist. The specification side is in strong shape (all 21 normative ADRS values, tier boundaries, cap and multiplier invariants independently recomputed and confirmed; zero methodology drift across five documents), and one genuinely useful implementation constraint was surfaced (F-1: the J cap is load-bearing in floating point). But an engineering review of a phase with zero engineering artifacts can only fail. Build the ENG §18 deliverables, then re-run this review against real code and real test output.
