# US Pass 2 Independent Policy Review

**Scope:** All United States (`jurisdiction_id = 'us'`) records in the AI Policy Atlas corpus — 5 instruments, 1 provision, 5 sources, and their capability/risk/control mappings.
**Reviewer:** Automated Pass 2 verification (LLM agent acting under the §19.4 two-pass protocol as the *Reviewer* role). **This is not a human sign-off.** No `review_status` value was changed; no record was published. A named human owner must still perform final sign-off before any record is promoted.
**Review date:** 2026-07-13 · **Records `as_of` / `last_verified`:** 2026-07-12
**Method:** Every fact-typed claim, quote, pin cite, date, classification, section reference, and mapping was checked against the primary source (Federal Register / govinfo, the American Presidency Project mirror of the EO texts, the Colorado General Assembly bill pages, and nist.gov) or independent corroboration. `federalregister.gov` redirected automated fetches to a bot-wall host (`unblock.federalregister.gov`); that off-host redirect was **not** followed — EO text was verified via the American Presidency Project and govinfo instead.

---

## 1. Decision summary

| Record ID | Type | Decision |
|---|---|---|
| `us-eo-14179` | instrument | **APPROVE FOR OWNER SIGN-OFF** |
| `us-co-sb26-189` | instrument | **APPROVE FOR OWNER SIGN-OFF** |
| `us-nist-ai-rmf` | instrument | **APPROVE FOR OWNER SIGN-OFF** (coverage caveat) |
| `us-eo-14110` | instrument | **REVISE** |
| `us-co-sb24-205` | instrument | **REVISE** |
| `us-co-sb26-189:developer-disclosure` | provision | **REVISE** |
| `us-src-eo14179-govinfo` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `us-src-eo14148-govinfo` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `us-src-sb26189-leg` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `us-src-sb24205-leg` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `us-src-nist-airmf` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `cpm-sb189-k12` | control map | **APPROVE** (parent provision REVISE) |

**Net:** No US record is factually unsound — the US corpus is the strongest of the three jurisdictions I have reviewed. Every precise, load-bearing claim I could check verified **exactly** (EO 14148 §2(ggg); EO 14179 §5(a)/§5(b); the "revoked Executive Order 14110" phrase; the NIST voluntary-use sentence; Colorado SB24-205's duties never becoming operative). The three **REVISE** decisions are citation-completeness and pin-cite gaps, all of which my verification has resolved to the exact correction. No **BLOCK**.

**Note on divergence from `PUBLICATION_REVIEW_QUEUE.md`:** the queue lists `us-co-sb24-205`, `us-eo-14179`, `us-eo-14110`, `us-nist-ai-rmf`, and the `developer-disclosure` provision as **BLOCKED**. After primary-source verification I downgrade `us-eo-14179` and `us-nist-ai-rmf` to **APPROVE**, and the rest to **REVISE**, because the blocking questions (EO 14148 revocation, SB24-205 operativeness, NIST wording) are now answered against primary text.

---

## 2. What was verified clean (no correction required)

- **`us-eo-14179` — every asserted section verified.** Signed 2025-01-23; published in the Federal Register 2025-01-31 (FR Doc 2025-02172; 90 FR 8741). Section 2 policy "sustain and enhance America's global AI dominance" ✓; Section 4 directs the AI Action Plan ✓; **Section 5(a)** directs review/suspension of actions "taken pursuant to the revoked Executive Order 14110" ✓ (exact phrase confirmed); **Section 5(b)** directs OMB to "revise OMB Memoranda M-24-10 and M-24-18" ✓. `executive_action` + `conditionally_binding` (§8 rule 4) + `fully_applicable` correct. The record's precision note — that EO 14179 does *not* itself revoke EO 14110 — is correct and now fully substantiated.
- **`us-eo-14110` revocation chain.** EO 14110 signed 2023-10-30; revoked 2025-01-20 by **EO 14148 §2(ggg)** — verified verbatim: "(ggg) Executive Order 14110 of October 30, 2023 (Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence)." `rescinded` + `conditionally_binding` correct; the 14110→14148→14179 modeling (revocation vehicle ≠ replacement policy) is accurate.
- **`us-co-sb26-189` — fully corroborated.** Signed 2026-05-14 by Gov. Polis; repeals and reenacts the 2024 Colorado AI Act (SB24-205); effective 2027-01-01; pivots from duty-of-care/impact-assessment to a disclosure/notice/transparency framework; developer documentation-to-deployer duty. `enacted_law` + `binding` + `adopted_not_yet_applicable` correct; supersession link to SB24-205 correct.
- **`us-co-sb24-205` — "never took effect" is correct.** Signed 2024-05-17; original 2026-02-01 duties date delayed to 2026-06-30 by the SB25B-004 special-session bill; repealed/reenacted by SB26-189 (signed 2026-05-14) **before** the 2026-06-30 date, so the substantive duties never became operative. `superseded` status correct.
- **`us-nist-ai-rmf` — voluntary sentence verbatim.** The nist.gov program page reads exactly "The NIST AI Risk Management Framework (AI RMF) is intended for voluntary use and to improve the ability to incorporate trustworthiness considerations into the design, development, use, and evaluation of AI products, services, and systems" — matching the record's quote (correctly **without** the framework-PDF's "of organizations," because the record cites the webpage). AI RMF 1.0 released 2023-01-26; GenAI Profile (NIST-AI-600-1) 2024-07-26; four functions Govern/Map/Measure/Manage. `voluntary_framework` + `non_binding` correct.
- **Sources & mapping.** `us-src-eo14179-govinfo` (90 FR 8741 / FR Doc 2025-02172), `us-src-eo14148-govinfo` (90 FR 8237 / FR Doc 2025-01901, 2025-01-28), `us-src-sb26189-leg`, `us-src-sb24205-leg`, `us-src-nist-airmf` — all Tier 1, publisher/URL/`stable_ref` correct. `cpm-sb189-k12` rationale is sound and claims no legal compliance. No US recommendation block asserts compliance; epistemic fact/inference/recommendation separation is clean throughout.

---

## 3. REVISE details (no BLOCK)

### 3.1 `us-eo-14110` (instrument) — **REVISE**

- **Field:** `source_ids` / `key_dates[0]` — the "signed 2023-10-30" date claim.
- **Reason:** The instrument's own promulgation is cited only through `us-src-eo14148-govinfo` (the *revocation* order) and `us-src-eo14179-govinfo` (the *replacement* order). Neither establishes EO 14110's own signing/publication. Per §21.2, a status/date claim needs a Tier 1 citation to the document that establishes it — here, EO 14110's own Federal Register publication (**88 FR 75191**, FR 2023-11-01), which is **absent** from the corpus. The record acknowledges this ("Original 14110 FR citation (88 FR 75191) still to be added from its own FR document in a later pass").
- **Required correction:** add a Tier 1 source for EO 14110's own publication — **88 FR 75191 (Federal Register, 2023-11-01)**, govinfo pkg `FR-2023-11-01` — and point the 2023-10-30 signing `key_date` at it.
- **Primary-source evidence:** EO 14110 "Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence," signed 2023-10-30, published 88 FR 75191 (2023-11-01); revocation at EO 14148 §2(ggg) confirmed as above.

### 3.2 `us-co-sb24-205` (instrument) — **REVISE**

- **Field:** `analyst_notes` (two flagged OPEN VERIFICATION ITEMs) and `key_dates` (the SB25B-004 delay is uncited).
- **Reason:** Both open items are now resolvable and should be closed rather than left open (review step 12): (a) the SB25B-004 special-session delay (2026-02-01 → 2026-06-30) is currently narrated in `analyst_notes` as "not independently fetched this session"; it is corroborated and should be a cited `key_date`; (b) the "was the repeal operative on signing or 2026-08-12 / were duties live 2026-06-30→08-12" question is answered — the repeal took effect before the 2026-06-30 delayed date, so **duties never became operative**, confirming the record's own `superseded` / "never took effect" conclusion.
- **Required correction:** convert the SB25B-004 delay into a cited `key_date` (add a Colorado SB25B-004 source), and close the open verification item in `analyst_notes` with the corroborating evidence (duties never live). No change to `lifecycle_status` (`superseded` is correct).
- **Primary-source evidence:** independent corroboration — "SB 24-205 was repealed before it ever took effect… a special-session bill (SB 25B-004) delayed [the effective date] to June 30, 2026, before SB 26-189 then repealed and replaced the framework… in May 2026" (Seyfarth, Norton Rose Fulbright, Baker Botts, Davis Wright Tremaine analyses of the 2026 repeal). Colorado bill page `leg.colorado.gov/bills/sb24-205`.

### 3.3 `us-co-sb26-189:developer-disclosure` (provision) — **REVISE**

- **Field:** `pin_cite` (currently "(developer documentation duty — pin cite to section pending full-text pass)") and the absent `quote_verbatim`.
- **Reason:** The provision carries a placeholder rather than a real pin citation and no verbatim quote — it fails review step 6 (verify quote/provision against a specific pin). The `paraphrase_en` (developers must provide technical documentation to deployers from 2027-01-01) and `applies_from` are corroborated, so nothing is factually wrong; the record is structurally incomplete, not incorrect.
- **Required correction:** read the enrolled SB26-189 text, set `pin_cite` to the specific C.R.S. section the ADMT developer-documentation duty creates, and add a `quote_verbatim` of the operative duty. Confidence may then be re-evaluated per §22.
- **Primary-source evidence:** SB26-189 enrolled text at `leg.colorado.gov/bills/sb26-189` (and `leg.colorado.gov/bill_files/116489/download`); the developer duty — "provide each deployer with documentation describing intended and known harmful uses, categories of training data, known limitations, and instructions for appropriate use and meaningful human review" — is confirmed in independent summaries and must be pinned to its enacted section.

---

## 4. Coverage caveat on APPROVE records

- **`us-nist-ai-rmf` — APPROVE (metadata), with a coverage note.** Every claim in the record verifies, so the metadata is sign-off-ready. However, the instrument carries **zero provisions** ("function-level provisions… to be extracted from the PDFs in a later pass"), so it currently anchors no capability/risk/control mappings and contributes to the AC-2 / AC-4 coverage totals only as a context instrument. This is a corpus-completeness item, not a defect in the record. The same is true of the framework-type context instruments in other jurisdictions.
- **`us-co-sb26-189` — APPROVE (metadata).** The instrument metadata is fully verified; its only pending items (the provision pin cite §3.3, and AG-rulemaking status typed as a Pass-2 inference) live on other records. The Colorado AG's ADMT/ADAI rulemaking page exists and can be cited to firm up the enforcement inference before that inference is published.

---

## 5. Cross-cutting observations (not per-record blockers)

1. **The US EO records are exemplary on citation precision.** The two most falsifiable claims — EO 14148 §2(ggg) and EO 14179 §5(a)/§5(b) — are both exactly right. The record's careful separation of *revocation vehicle* (EO 14148) from *replacement policy* (EO 14179) is a genuine accuracy strength, not the collapse most trackers make.
2. **One structural asymmetry to note (not a defect):** the actual revoking instrument, **EO 14148, exists only as a source, not as an instrument**, so the `superseded_by_id` chain runs 14110 → 14179 and skips the order that legally revoked 14110. The record documents this in `analyst_notes`; a human owner should confirm this modeling choice is acceptable for the corpus (it is defensible — EO 14148 is a mass-revocation order, not AI-specific).
3. **Recent-events dependency.** The Colorado SB24-205/SB26-189 repeal-and-reenact all occurred in 2026 (May) and are corroborated only through law-firm analyses of the primary bills, not yet through a re-read of the enrolled statutes; the primary bill pages are Tier 1 and cited. The `developer-disclosure` provision cannot reach sign-off until its enrolled-text pin is filled (§3.3).
4. **`federalregister.gov` bot-wall.** Automated fetches to federalregister.gov redirected to `unblock.federalregister.gov`; this off-host redirect was not followed. All EO verifications rest on the American Presidency Project and govinfo. A human owner with direct browser access should confirm the 90 FR 8741 / 90 FR 8237 page citations against the Federal Register PDFs before sign-off.
5. **No owner sign-off exists anywhere in the corpus.** Even the three US records I approve on the merits still require a *human* owner to log the final `approved` action under §19.4 before publication. This review is the Reviewer-role Pass 2 input, nothing more.

---

*Prepared as the independent US Pass 2 verification. `review_status` values were not modified and no record was published. Quote, section, and date verifications were performed against primary text (govinfo, American Presidency Project, Colorado General Assembly, nist.gov) or independent corroboration, as noted per finding.*
