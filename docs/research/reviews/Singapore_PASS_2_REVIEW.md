# Singapore Pass 2 Independent Policy Review

**Scope:** All Singapore (`jurisdiction_id = 'sg'`) records in the AI Policy Atlas corpus — 2 instruments, 0 provisions, 2 sources, 0 control mappings.
**Reviewer:** Automated Pass 2 verification (LLM agent acting under the §19.4 two-pass protocol as the *Reviewer* role). **This is not a human sign-off.** No `review_status` value was changed; no record was published. A named human owner must still perform final sign-off before any record is promoted.
**Review date:** 2026-07-13 · **Records `as_of` / `last_verified`:** 2026-07-12
**Method:** Every fact-typed claim, date, issuer, count, and classification was checked against the primary source (aiverifyfoundation.sg, the IMDA/MDDI newsroom, and the official framework PDF) or independent corroboration (Future of Privacy Forum, OECD.AI, law-firm analyses). `aiverifyfoundation.sg` was reachable this pass.

---

## 1. Decision summary

| Record ID | Type | Decision |
|---|---|---|
| `sg-mgf-genai` | instrument | **APPROVE FOR OWNER SIGN-OFF** (coverage caveat) |
| `sg-src-mgf-genai` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `sg-src-aiverify-foundation` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `sg-ai-verify` | instrument | **REVISE** |

**Net:** No Singapore record is factually unsound; both instruments' dates, issuers, counts, and classifications verify. The single **REVISE** is a citation-completeness fix that the record itself had flagged as an open Pass-2 item — and which my verification has now resolved to the exact source to add. No **BLOCK**. The dominant issue for Singapore is **jurisdiction-level coverage**, not record correctness (see §4).

**Note on divergence from `PUBLICATION_REVIEW_QUEUE.md`:** the queue lists both SG instruments as **BLOCKED** (zero provision coverage; voluntariness/substantive-criteria unverified). After primary-source verification I downgrade `sg-mgf-genai` to **APPROVE** (it asserts only verified title/issuer/date facts) and `sg-ai-verify` to **REVISE** (its voluntariness is now sourceable). The zero-provision state is a corpus-completeness gap, decided as a caveat rather than a per-record block, consistent with the treatment of other framework-type context instruments (NIST AI RMF, TC260).

---

## 2. What was verified clean (no correction required)

- **`sg-mgf-genai`.** Released **30 May 2024** by **IMDA and the AI Verify Foundation** as the Model AI Governance Framework for Generative AI ("Fostering a Trusted Ecosystem"); proposes **nine dimensions** to foster a trusted AI ecosystem; expands the 2020 Model AI Governance Framework; serves as voluntary "baseline guidance… to adopt best practices." `voluntary_framework` + `non_binding` + `fully_applicable` all correct. The record asserts only title, issuers, and date as fact — each verified — and **deliberately does not assert** the nine dimensions' content (correctly deferred), so nothing exceeds the source.
- **`sg-ai-verify` — dates, issuers, and the 11 principles.** MVP launched **25 May 2022** by **IMDA and PDPC**; open-sourced on GitHub **7 June 2023** under AI Verify Foundation stewardship; a testing framework + software toolkit evaluating AI systems against **11** internationally-recognised governance principles (transparency, explainability, repeatability/reproducibility, safety, security, robustness, fairness, data governance, accountability, human agency & oversight, inclusive growth/societal & environmental well-being) via technical tests and process checks — all confirmed on the official page. `voluntary_framework` (correctly not `technical_standard` — the Foundation is not a standards body, §9.7) is right.
- **`sg-src-mgf-genai`** — Tier 1, publisher (AI Verify Foundation & IMDA), the May-2024 framework PDF URL, and 2024-05-30 date all valid.
- **`sg-src-aiverify-foundation`** — Tier 1, the official "What is AI Verify" page; dates and the 11 principles on it verify.
- **Epistemic hygiene.** Both records separate fact from inference cleanly (non-binding/assurance-first framing typed `▲ INFERENCE (medium)`); neither contains a recommendation block, so there is no compliance-claim risk. No capability/risk/control mappings exist to review (zero provisions).

---

## 3. REVISE detail

### 3.1 `sg-ai-verify` (instrument) — **REVISE**

- **Field:** `bindingness` (`non_binding`) supporting evidence / `analyst_notes` (open Pass-2 item: "Foundation page does not explicitly state voluntariness… sentence-level confirmation queued for Pass 2") and `source_ids`.
- **Reason:** The `non_binding` classification is **substantively correct** (AI Verify is a self-assessment toolkit with no statutory penalty for non-use — it plainly meets the §9.6 voluntary-framework test), but the **only cited source (`sg-src-aiverify-foundation`, the "What is AI Verify" page) does not state voluntariness** — I confirmed this directly this pass. The record's own open item therefore remains unresolved against its cited source (review step 12), and a classification field currently rests on inference rather than a citation.
- **Required correction:** add an official/authoritative source that explicitly states AI Verify's voluntary nature, to close the open note — e.g., the IMDA/MDDI newsroom announcement "Singapore launches world's first AI testing framework and toolkit," or the IMDA "Invitation to Pilot AI Governance Testing" document — then the `non_binding` classification is citation-backed rather than inferred. (Optional, while editing: add a `key_date` for the **29 May 2025** updated AI Verify framework release, which the current record omits.)
- **Primary-source evidence:** "AI Verify is explicitly voluntary and does not itself create statutory penalties, with no prescribed sanctions… for non-participation or for failing tests"; organisations use it "to conduct a voluntary self-assessment" (Future of Privacy Forum; OECD.AI; MDDI newsroom `mddi.gov.sg/newsroom/sg-launches-first-ai-testing-framework-and-toolkit/`). The "What is AI Verify" page (`aiverifyfoundation.sg/what-is-ai-verify/`) contains the dates and 11 principles but no voluntariness sentence.

---

## 4. Coverage caveats and cross-cutting observations (jurisdiction-level, not per-record blockers)

1. **`sg-mgf-genai` — APPROVE with coverage caveat.** Every asserted fact verifies, so the metadata is sign-off-ready, but the instrument carries **zero provisions** ("nine governance dimensions… a Pass 2 full-text item"), so it anchors no capability/risk/control mappings and stands only as a context instrument. This is corpus-completeness work, not a defect in the record.
2. **Singapore currently has no binding instrument in the corpus.** Both SG records are `non_binding` frameworks; the actual binding SG regime — the **PDPA** (and its 2020 amendment, itself the MJ-4 amendment-as-event exemplar the corpus wants) — is flagged in `analyst_notes` as "queued for the next SG pass" but is **absent**. Consequence: any SG `binding_hit` is currently 0 and the `/compare` matrix shows no SG binding provisions. A human owner should weigh whether SG can be published at all before at least one binding instrument (PDPA) and some provisions are added — this is the single most important SG gap.
3. **AC-1 / AC-2 shortfall.** SG has **2** instruments (AC-1 wants ≥6 per jurisdiction) and **0** provisions (AC-2 wants provisions with pin cites and mappings). Neither existing record is wrong, but Singapore is far from the acceptance-criteria coverage bar.
4. **No `archived_url` on either SG Tier 1 source (§21.6).** `aiverifyfoundation.sg` was reachable this pass (not an allowlisted bot-block host), so a web-archive snapshot is feasible and should be added before sign-off, since the `stable_ref` values ("MGF-GenAI (May 2024)") are not resolvable identifiers.
5. **A later MGF PDF exists.** Besides the cited "May 2024" PDF, a "19 June 2024" version of the framework is published on the Foundation site. The cited May PDF is valid for the 30 May 2024 release date, but a human owner may wish to confirm which PDF is the authoritative final and cite it consistently.
6. **No owner sign-off exists anywhere in the corpus.** Even `sg-mgf-genai`, which I approve on the merits, still requires a *human* owner to log the final `approved` action under §19.4 before publication. This review is the Reviewer-role Pass 2 input, nothing more.

---

*Prepared as the independent Singapore Pass 2 verification. `review_status` values were not modified and no record was published. Date, issuer, count, and voluntariness verifications were performed against primary text (aiverifyfoundation.sg, IMDA/MDDI) or independent corroboration, as noted per finding.*
