# AI Policy Atlas — Revision Log

**Revision:** Adversarial-review remediation · **Date:** 2026-07-10 · **Owner:** principal product architect / methodology owner.
**Scope:** surgical, in-place edits to the existing document set to resolve the adversarial review's 5 Critical Blockers, 11 Major Issues, and 15 Minor Issues. No second version of the spec was created; the MVP was not expanded; the ADRS model was not changed except to remove documented contradictions (tier boundaries, precision). New docs added: `docs/METHODOLOGY_DECISIONS.md`, `docs/REVISION_LOG.md`.

Legend for "Files": S=SPEC.md, PRD, ENG=ENGINEERING_HANDOFF, DES=DESIGN_HANDOFF, AC=ACCEPTANCE_CRITERIA, BL=IMPLEMENTATION_BACKLOG, MD=METHODOLOGY_DECISIONS.

---

## Critical Blockers

| ID | Files | Sections changed | Resolution |
|----|-------|------------------|------------|
| **CB-1** Capability intensity undefined | S, BL, MD | S §10 (new 0–4 scale + edge cases + deterministic `binding_hit`), S §14.1/14.2/14.3 (explicit intensities for every capability in Aria/Sentinel/Mira), MD-1/MD-2, BL P0-12 | Added an operational 0–4 intensity scale (0 absent…4 broad/unconstrained) distinct from the ADRS dimensions; assigned explicit intensities to all three scenarios; `binding_hit` now computes without interpretation (intensity ≥2). |
| **CB-2** Tier boundaries undefined for real scores | S, PRD, ENG, AC, DES, MD | S §12 (half-open table + note), PRD §11, ENG §9 (`tierOf` spec + impl rule), AC-ADRS-7 (24.999…75.000), DES §8, MD-8 | Tiers are half-open intervals Low [0,25)/Moderate [25,50)/High [50,75)/Critical [75,100]; boundary tests added at 24.999/25.000/49.999/50.000/74.999/75.000. |
| **CB-3** Calculator jurisdiction→J broken | S, PRD, DES, AC | S §16.9 (normative interaction), PRD §11 item 3, DES §10, AC-ADRS-10/11 | Jurisdiction selection shows reference material only; user sets the four J toggles manually; no capability questionnaire; scenario deep links pre-populate J from the approved assessment with evidence/rationale shown. |
| **CB-4** Fixture publish-state deadlock | ENG, AC, BL | ENG §10 (`BUILD_PROFILE` table + pipeline), ENG §11, §12.3, §13, §15, §17; AC-INV-8; BL P0-4b, P1-15 | Added `BUILD_PROFILE=fixtures\|production`: fixtures renders approved §14 examples behind a persistent "FIXTURE DATA — ILLUSTRATIVE ONLY" banner and is blocked from deploy; production enforces the full gate and rejects fixture content. Math-integrity checks run in both. |
| **CB-5** ADRS test errors + rounding unstated | S, PRD, ENG, AC, MD | S §13.7 (new numeric convention) + §14.1 arithmetic; PRD §11; ENG §9, §12.1 (tests 2/3/7/9/12 rewritten); AC preamble + AC-ADRS-2/4/12, AC-JUR-2; MD-8 | Full precision, no intermediate rounding, display 1 dp, tests ±0.001. Impossible J-clamp test replaced with "all components=1 → J=1.30 + invariant property test." Chained example fixed to 47.0375 → 56.445. |

## Major Issues

| ID | Files | Sections changed | Resolution |
|----|-------|------------------|------------|
| **MJ-1** `last_verified` + date confusion | S, PRD, ENG, AC | S §17 (date-field dictionary + `last_verified` on instruments/provisions), PRD §16.5, ENG §6, AC-LV-1 | Five date concepts defined and kept distinct; `last_verified` added as a required column; never alias to `as_of_date`. |
| **MJ-2** No provision-level bindingness | S, PRD, ENG, AC | S §17 (`provisions.bindingness` nullable + resolution rule), §18.2, integrity note; PRD §10; ENG §6; PRD §24.14 | Provisions may override instrument bindingness; effective bindingness = `provision.bindingness ?? instrument.bindingness`, used by `binding_hit` and compare. |
| **MJ-3** "Currently applicable binding provision" undefined; compare misused intensity | S, PRD, DES, AC, MD | S §13.5 (operational definition), §16.12; PRD §7.12, §20; DES §4; AC-CMP-1/3; MD-11 | Defined via bindingness + lifecycle + `applies_from` ≤ reference date; removed the "intensity ≥2" test from the compare matrix (no agent there). |
| **MJ-4** Amendment as mutually-exclusive status | S, PRD, DES, AC | S §8 Axis C, PRD §10/§16.3, DES §7, AC-STA-4 | Amendment is an event in `key_dates`; amended-but-in-force instruments keep their live status; `amended` enum reserved for wholesale replacement. |
| **MJ-5** Epistemic-typing scope unbounded | S, PRD | S §20.0 (new scope rule) | Typing applies to policy-analytical content only; chrome/nav/methodology/labels exempt and must not mimic block styling. |
| **MJ-6** Wording lint would hit quotes | S | S §20.1, §20.5 (new) | Lint runs on analyst-authored fields only; `quote_verbatim`/`quote_translated` exempt. |
| **MJ-7** Hard-fail link check brittle | S, PRD, ENG, AC | S §21.6 (rewritten), PRD §24.9, ENG §10/§13/§15, AC-CIT-4/AC-MSRC-3 | Warning-tier link check with retry + host allowlist; `archived_url` now required for **all** Tier 1 sources; only a truly unverifiable Tier 1 source hard-fails. |
| **MJ-8** False completeness claim | PRD, BL | PRD §30 (claim removed, items marked resolved), BL Open Decisions | Removed "these are the only genuine open items"; backlog Open Implementation Decisions is the authoritative, explicitly non-exhaustive register. |
| **MJ-9** Phase 0 over-scoped | S, ENG, BL | ENG §18 (DoD trimmed), BL P0 (P0-15/P0-17 moved to P1-15/P1-0) | Phase 0 = schemas, formula, tests, fixtures, wireframes, validation only; rendered templates + design system are P1. |
| **MJ-10** Hardcoded scenario expectations in tests | ENG | ENG §12.1 (unit tests keep literals), §12.3 (e2e reads fixtures), P-4 | Only pure formula unit tests hardcode numbers; scenario/e2e expectations load from fixture files. |
| **MJ-11** No A/T/R invariance check | S, PRD, ENG, AC, MD | S §13.6.1, §17 (integrity rule 13), §18.3 (`divergence_justification`); PRD §24.13; ENG §6/§12.2; AC-INV-7; MD-12 | A/T/R identical across a scenario's four assessments; D/E divergence requires justification; enforced at build. |

## Minor Issues

| ID | Files | Sections changed | Resolution |
|----|-------|------------------|------------|
| **MN-1** J-cap AC was a no-op | AC | AC-JUR-2 | Rewritten as max-value + invariant property test. |
| **MN-2** Changelog `analyst` missing | S, DES, AC | S §17 (`analyst` column), DES §4, AC-STA-3 | Column added; shown on `/changelog`. |
| **MN-3** No Atlas-level glossary terms | S | S §17 glossary (`scope`, `atlas` sentinel, `definition_md`) | House definitions supported without a defining provision. |
| **MN-4** Missing review fields | S | S §17 (`controls`, `mapping_conflicts` gain `review_status`/`as_of_date`) + preamble | Added; preamble lists all content tables. |
| **MN-5** Whole-instrument pin cite | S | S §18.2, §21.7 | Convention `pin_cite:"(instrument as a whole)"`. |
| **MN-6** `review_status` vs 6-state workflow | S, AC | S §17 (reconciliation note), AC-REV-1 | Column has 3 values; six workflow actions live in `review_log`; mapping documented. |
| **MN-7** Analytics over-scoped | PRD, ENG | PRD §22, ENG §15 | Reduced to a single cookieless `page_view` count; event taxonomy removed. |
| **MN-8** Unsupported keyword filter | PRD, DES | PRD §9, DES §11 (implicitly) | Removed from MVP; faceted filtering only. |
| **MN-9** Changelog not demo-priority | DES | DES §2 | Promoted to P0 (on-screen in demo §30). |
| **MN-10** Color-semantics collision | DES | DES §6, §7 | Three disjoint hue families (epistemic ink/violet/teal; lifecycle neutral→amber→green; tier green→red). |
| **MN-11** Projected score drift | S, PRD, DES, MD | S §13.6.4, PRD §11, DES §10, MD-6 | Marked optional/deferred out of MVP; no AC. |
| **MN-12** ACs assert unmarked OD defaults | AC | AC preamble + AC-ADRS-11 tag | Provisional ACs tagged `[provisional: OD-n]`. |
| **MN-13** `near_term_hit` unanchored | S, MD | S §13.5, §19.5, MD-10 | Anchored to `assessed_date`; re-scoring triggers added. |
| **MN-14** SEO target unbacked | ENG | ENG §16.1 (new checklist) | Concrete SEO checklist added to back NFR-2. |
| **MN-15** Zod/JSON-Schema drift | ENG | ENG §8 | Zod declared the single normative source; JSON Schemas illustrative. |

---

## Intentionally deferred (not fixed in this revision — by design)

| Item | Why deferred |
|------|--------------|
| OD-11 final researched J values | Depend on Phase 1/2 primary-source research; cannot be settled at spec time (SPEC §14 note). Fixtures carry illustrative values; production requires cited values. |
| OD-12 scenario capability intensities | Provisional pending the same research; authored now so Phase 0 is exercisable. |
| OD-13 SSG choice (Astro vs Next) | Genuine engineering preference; default Astro. |
| OD-14 US corpus scoping | Research scoping decision for Phase 1. |
| OD-15 analytics at launch | Deployment-time privacy choice; default off. |
| Projected-score view (MN-11) | Explicitly out of MVP; may return post-MVP. |

No Critical Blocker or Major Issue was deferred; all are resolved above.

---

## Cross-document consistency review (post-edit)

Checked after all edits:
1. **Formula constants** — weights, mitigation credits, caps, J weights unchanged across S §13, PRD §11, ENG §9. ✔
2. **Worked examples** reproduce with the new precision convention: Aria 66.25 → 47.0375 → 56.445 (EU); Sentinel 62.5 → 42.5; Mira 58.75 → 49.9375 → 64.91875 (CN) / 62.421875 (EU). Consistent in S §14, PRD §11, AC §5, ENG §12.1, DES §16. ✔
3. **Tier intervals** half-open and identical in S §12, PRD §11, ENG §9, AC-ADRS-7, DES §8. ✔
4. **Capability-intensity scale** referenced consistently (S §10 defines; §14 uses; MD-1/2; `binding_hit` in §13.5). ✔
5. **Enums** unchanged; `amended` retained in the lifecycle enum with narrowed usage (S §8/§17 note; PRD §16.3; DES §7). ✔ *(See consistency note C-1 below.)*
6. **Date fields** dictionary consistent across S §17, PRD §16.5, ENG §6, AC-LV-1. ✔
7. **BUILD_PROFILE** consistent across ENG §10/§13/§15, AC-INV-8, BL P0-4b/P1-15, DES §16. ✔
8. **Integrity rule 13** consistent across S §17, PRD §24.13, ENG §6/§12.2, AC-INV-7, MD-12. ✔
9. **Open-decision IDs** OD-1…OD-15 reconciled between PRD §30 (resolution index) and BL (authoritative register). ✔
10. **Cross-references** to the two new docs (METHODOLOGY_DECISIONS, REVISION_LOG) resolve. ✔

**Consistency notes (non-blocking, tracked):**
- **C-1 — `amended` in enums.** The lifecycle enum still lists `amended` (S §8/§17 CHECK constraint, DES §5 "Lifecycle status (9)") but §8/MJ-4 narrows its use to wholesale replacement. This is intentional (keeps the enum stable) but authors must follow the §8 rule; validation cannot detect misuse, so it is a review-checklist item, not a hard check. No action required beyond the reviewer checklist.
- **C-2 — `provisions.epistemic_blocks`.** Now required by S §18.2 and added as a column (S §17 note / ENG §6). Authors must supply epistemic blocks per provision; the example fixtures (P0-13) must include them or fail validation. Flagged for Phase 0 fixture authoring.

No unresolved blocker remains.

---

## Readiness verdict

**READY FOR DESIGN AND PHASE 0.**

All five Critical Blockers and all eleven Major Issues are resolved in place; the Phase 0 gate is now well-defined (half-open `tierOf`, a constructible and correct formula test suite, capability intensities with a defined scale, a coherent calculator-J interaction, and a fixture build profile that unblocks e2e without weakening production integrity). The remaining open items (OD-11…OD-15) are genuine research/deployment choices with safe defaults that do not block Phase 0. Codex can implement Phase 0 from `SPEC.md` + `docs/ENGINEERING_HANDOFF.md` §18 without further clarification.
