# EU Pass 2 Independent Policy Review

**Scope:** All European Union records in the AI Policy Atlas corpus — instruments, provisions, sources, and their capability/risk/control mappings.
**Reviewer:** Automated Pass 2 verification (LLM agent acting under the §19.4 two-pass protocol as the *Reviewer* role). **This is not a human sign-off.** No `review_status` value has been changed; no record has been published. A named human owner must still perform the final sign-off before any record is promoted.
**Review date:** 2026-07-13 · **Records `as_of` / `last_verified`:** 2026-07-12
**Method:** Every fact-typed claim, quote, pin cite, date, classification, and mapping was checked against the primary source or, where the primary host blocked automated retrieval (EUR-Lex full text render, Consilium 403, `digital-strategy.ec.europa.eu` network block), against independent corroboration plus the official mirror text. Findings below cite what was actually verified this pass.

---

## 1. Decision summary

| Record ID | Type | Decision |
|---|---|---|
| `eu-gdpr` | instrument | **APPROVE FOR OWNER SIGN-OFF** |
| `eu-ai-act` | instrument | **REVISE** |
| `eu-prohibited-practices-guidelines` | instrument | **REVISE** |
| `eu-ai-act:art14` | provision | **REVISE** |
| `eu-ai-act:art50-1` | provision | **REVISE** |
| `eu-gdpr:art22` | provision | **REVISE** |
| `eu-src-gdpr-eurlex` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `eu-src-aiact-eurlex` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `eu-src-aiact-servicedesk` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `eu-src-prohibited-guidelines` | source | **REVISE** |
| `eu-src-omnibus-consilium` | source | **REVISE** |
| `cpm-gdpr22-k01`, `cpm-gdpr22-k04` | control map | **APPROVE FOR OWNER SIGN-OFF** (parent provision REVISE) |
| `cpm-art14-k01`, `cpm-art14-k04` | control map | **APPROVE FOR OWNER SIGN-OFF** (parent provision REVISE) |
| `cpm-art50-k09` | control map | **APPROVE FOR OWNER SIGN-OFF** (parent provision REVISE) |

**Net:** No EU record is factually unsound. One instrument (`eu-gdpr`) and its sources are clean and sign-off-ready. Every remaining record is **REVISE** — fixable provenance/mapping/coverage items — not **BLOCK**. My independent verification **resolved** two of the three blockers the Publication Review Queue recorded against `eu-prohibited-practices-guidelines` and downgraded the three AI-Act "omnibus" blockers to REVISE, because the deferral facts were corroborated and are correctly epistemically typed.

**Note on divergence from `PUBLICATION_REVIEW_QUEUE.md`:** the queue lists `eu-ai-act`, `eu-ai-act:art14`, `eu-ai-act:art50-1`, and `eu-prohibited-practices-guidelines` as **BLOCKED**. After primary-source verification I downgrade all four to **REVISE**; my reasoning is given per record. This is the independent Pass 2 exercising its own judgment, as intended.

---

## 2. What was verified clean (no correction required)

- **`eu-ai-act` classification & core lifecycle.** `enacted_law` (correct per SPEC §9.3 — the AI Act is a "Regulation" in EU-law terms but primary legislation here), `binding`, `in_force_partially_applicable`, `status_date` 2024-08-01. Adopted 2024-06-13, published OJ **12 July 2024**, entered into force **1 August 2024**, prohibitions + AI-literacy from 2 Feb 2025, GPAI from 2 Aug 2025 — all corroborated against EUR-Lex ELI (`eur-lex.europa.eu/eli/reg/2024/1689/oj/eng`) and multiple independent reports. `CELEX:32024R1689` and issuing body correct.
- **`eu-ai-act:art14` verbatim quote.** Exact match to official Article 14(1): "High-risk AI systems shall be designed and developed in such a way, including with appropriate human-machine interface tools, that they can be effectively overseen by natural persons during the period in which they are in use." Pin cite `Article 14(1)` correct; ≤50 words / ≤350 chars satisfied.
- **`eu-ai-act:art50-1` verbatim quote.** Exact prefix of official Article 50(1) (verified against the AI Act article text): the record correctly truncates at "…informed that they are interacting with an AI system" to stay ≤50 words. Pin cite correct.
- **`eu-ai-act` omnibus deferral facts (content true).** Independently corroborated (Morgan Lewis, Gibson Dunn, Sidley, CSA, Council press release surfaced in search): Council final approval **2026-06-29**; Annex III stand-alone high-risk deferred **2 Aug 2026 → 2 Dec 2027**; Annex I-embedded → **2 Aug 2028**; **Article 50(1) transparency NOT deferred (stays 2 Aug 2026)**; Art 50(2) provider watermarking → 2 Dec 2026 with grandfathering. Every one of these matches the record's `key_dates`, `summary_md`, and both AI-Act provisions.
- **`eu-gdpr`** — `enacted_law` / `binding` / `fully_applicable`; adopted 2016-04-27, OJ L 119 04-05-2016, fully applicable 2018-05-25 (Art 99(2)); amendment-as-event handling correct (MJ-4). `CELEX:32016R0679` correct.
- **`eu-gdpr:art22` paraphrase.** Verified accurate against official Article 22(1) ("The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her"). Applies-from 2018-05-25 correct. Capability map C8/C9 and control maps sound.
- **`eu-prohibited-practices-guidelines`** — `regulator_guidance` / `non_binding` correct (§9.5 exemplar); the verbatim non-binding sentence ("they are non-binding, with authoritative interpretations reserved for the Court of Justice of the European Union (CJEU)") is confirmed against independent reporting of the Commission guidelines; published 4 Feb 2025; covers the eight Article 5 prohibited practices.
- **All five EU control mappings** — strengths (`direct`/`derived`), relations (`satisfies_in_part`/`supports_evidence`/`implements_general_duty`), and rationales are defensible and, critically, **none claims legal compliance**; both GDPR-22 and Art-14 mappings explicitly reserve the "meaningful"/"obvious" judgment to counsel. No epistemic-labeling or compliance-overreach defects found in any EU recommendation block.

---

## 3. REVISE and BLOCK details

Each finding: record ID → field → reason → required correction → primary-source evidence.

### 3.1 `eu-ai-act` (instrument) — **REVISE**

**Finding A — omnibus source provenance is not archived and cannot be primary-verified.**
- **Field:** `source_ids` → `eu-src-omnibus-consilium`; and `key_dates[4]` / `summary_md` (the omnibus fact).
- **Reason:** The deferral is typed **■ FACT** and its only citation is the Council (Consilium) press release, a **Tier 2** source that returns **HTTP 403** to automated fetch and carries **no `archived_url` and no `manual_verification_date`**. The amending act itself has **no Official Journal / CELEX number yet** (not published as of 2026-07-12), so no Tier 1 anchor exists. Under SPEC §21.1, a Tier-2-only fact is admissible here because the Council release is the *authoritative statement of the Council's own action* — but §21.6 link-integrity and §7.4 permanence still require an archival snapshot, which is absent.
- **Required correction:** (1) add an `archived_url` (web-archive snapshot) and a `manual_verification_date` to `eu-src-omnibus-consilium`; (2) keep the omnibus deferral content as-is (it is corroborated and correctly stated) but **capture the amending act's CELEX/OJ reference the moment it publishes** and add it as a Tier 1 `key_dates` source, then re-score dependent assessments (§19.5); until then the `▲ INFERENCE (medium)` caveat "the dates on the books remain those of Reg 2024/1689" must stay.
- **Primary-source evidence:** Council final approval and the exact deferral dates independently corroborated (Consilium press release of 2026-06-29 surfaced in search; Morgan Lewis "EU Approves Delays…"; Gibson Dunn "EU AI Act Omnibus Agreement — Postponed High-Risk Deadlines"; CSA research note). EUR-Lex shows only the original Reg (EU) 2024/1689 with no amending-act CELEX yet.

**Finding B — open analyst note cannot be closed this pass.**
- **Field:** `analyst_notes` ("Re-verify OJ publication of the amending act before Pass 2 review").
- **Reason:** Step 12 of the review requires open notes to be resolved. The amending act is still unpublished, so this note is inherently open; the instrument therefore is not yet stable enough for owner sign-off.
- **Required correction:** hold at REVISE; convert to a tracked §19.5 re-verification trigger keyed to OJ publication.

### 3.2 `eu-ai-act:art14` (provision) — **REVISE**

- **Field:** `applies_from` (2026-08-02) and `confidence_rationale`.
- **Reason:** The quote, pin cite, capability map (C5/C7/C8), risk map (R6), and mappings all verify. The sole issue is that `applies_from` = 2026-08-02 is the *original* Annex III high-risk date, which the (approved but unpublished) omnibus defers to 2027-12-02. The record correctly keeps the on-the-books date and documents the deferral, but this value will change within weeks and its deferral provenance is the same unverifiable Tier 2 source as §3.1. Not a factual error and **not** the "contradiction" the queue flagged — a properly documented current-law-vs-pending-amendment distinction — but it blocks *stable* sign-off.
- **Required correction:** on OJ publication of the omnibus, update `applies_from`/`key_dates` and re-score (§19.5); until then keep confidence capped `medium`. The verbatim quote and all mappings are approved as-is.
- **Primary-source evidence:** Article 14(1) text verified verbatim (see §2); original Annex III applicability 2 Aug 2026 and its omnibus deferral to 2 Dec 2027 corroborated as in §3.1.

### 3.3 `eu-ai-act:art50-1` (provision) — **REVISE**

**Finding A — C1 capability mapping is overstated.**
- **Field:** `capability_map[0]` (C1, confidence `high`, rationale "Disclosure duty attaches to systems generating interaction with humans").
- **Reason:** Article 50(1)'s operative trigger is a system **"intended to interact directly with natural persons,"** i.e. external interaction (C6), **not** content generation (C1). The synthetic-content duty is Art 50(2), not 50(1). Mapping 50(1) → C1 at **high** confidence with a generation-based rationale conflates the two and overstates the link that (via §13.5) can drive `binding_hit`.
- **Required correction:** downgrade the C1 mapping to `derived`/`medium` and re-word the rationale to the interaction trigger, or drop C1 and rely on C6 (which is correctly `high`). Re-check any assessment that leaned on C1 here.
- **Primary-source evidence:** Article 50(1) verbatim (see §2) — trigger is "interact directly with natural persons," qualified by the "obvious… reasonably well-informed, observant and circumspect" carve-out.

**Finding B — truncated quote does not mark the omission.**
- **Field:** `quote_verbatim`.
- **Reason:** The quote ends at "an AI system" and silently drops the "unless this is obvious…" qualifier. The `paraphrase_en` and `confidence_rationale` do disclose the qualifier, so this is not misrepresentation, but the verbatim field should signal the truncation.
- **Required correction:** append an ellipsis ("…") to `quote_verbatim`, or add the qualifier if it fits within ≤50 words / ≤350 chars.
- **Primary-source evidence:** full Article 50(1) text (see §2) continues "…unless this is obvious from the point of view of a natural person who is reasonably well-informed…".

**Finding C** — same omnibus Tier 2 provenance as §3.1 underlies fact block `b2`; same required correction (archive + capture CELEX). The "not deferred" claim itself is **true and corroborated**.

### 3.4 `eu-gdpr:art22` (provision) — **REVISE**

- **Field:** `quote_verbatim` (absent) — record is paraphrase-only.
- **Reason:** Article 22(1)'s load-bearing phrase "**solely** automated processing" governs scope, and SPEC §7.3 requires load-bearing legal phrases to appear as a verbatim quote. The record deliberately omitted the quote pending re-fetch and capped confidence `medium`. I have now verified the exact text this pass, so the gap is closable.
- **Required correction:** add `quote_verbatim` = "The data subject shall have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects concerning him or her or similarly significantly affects him or her." (pin `Article 22(1)`, EN, ≤50 words / ≤350 chars — satisfied). Confidence may then be re-evaluated upward per §22. Paraphrase is accurate and needs no change.
- **Primary-source evidence:** Article 22(1) text confirmed verbatim via independent verification this pass (Data Protection Commission / ICO / GDPR-Text renderings all identical).

### 3.5 `eu-prohibited-practices-guidelines` (instrument) — **REVISE** (queue had BLOCKED)

**Finding A — formal-adoption reference is now available; backfill it.**
- **Field:** `analyst_notes` / source `stable_ref` ("formal-adoption reference to backfill in Pass 2").
- **Reason:** The record noted only "Approval of the content of the draft Communication" with no C-number. The formal Communication reference exists: **C(2025) 5052 final, Brussels, 29.7.2025** (the guidelines PDF hosted on the Commission's AI Act Service Desk).
- **Required correction:** add `C(2025) 5052 final` as the formal-adoption `stable_ref`, and **reconcile the two dates**: the Commission *approved the draft* on 2025-02-04 (current `adopted_date`/`status_date`) but the formal Communication is dated **2025-07-29** — document which date each field represents so the timeline is unambiguous.
- **Primary-source evidence:** guidelines PDF header "EUROPEAN COMMISSION Brussels, 29.7.2025 C(2025) 5052 final," at `ai-act-service-desk.ec.europa.eu/.../guidelines_on_prohibited_artificial_intelligence_practices_established_by_regulation_eu_20241689_ai_act_english_…PDF`.

**Finding B — zero provision coverage.**
- **Field:** provisions (none exist for this instrument).
- **Reason:** SPEC §6.2 admits an instrument only if it yields ≥1 provision mapping to a capability/risk; this record has none, so it cannot yet anchor the EU manipulation/minors reasoning the `summary_md` promises.
- **Required correction:** extract ≥1 Art 5 provision (e.g., the Art 5(1)(a) harmful-manipulation prohibition touching C1/C6/C9 engagement mechanics) with pin cite and mapping, or explicitly mark the record a context-only instrument.
- **Primary-source evidence:** guidelines cover the **eight** Article 5 prohibited practices (harmful manipulation, exploitation of vulnerabilities, social scoring, predictive-policing, untargeted facial scraping, emotion recognition, biometric categorisation, real-time remote biometric ID) — corroborated by independent summaries (Inside Privacy, DLA Piper, Wilson Sonsini).

**Finding C — source not independently re-fetchable this pass.** The `digital-strategy.ec.europa.eu` library page was network-blocked to me; content was corroborated via independent reporting and the Service Desk PDF rather than the primary page. The record's `manual_verification_date` 2026-07-12 stands; a human reviewer should re-open the primary page directly before sign-off.

### 3.6 Sources

- **`eu-src-omnibus-consilium` — REVISE.** Missing `archived_url` **and** `manual_verification_date`; host 403s. Add both (see §3.1). Tier 2 classification is correct.
- **`eu-src-prohibited-guidelines` — REVISE.** Add the `C(2025) 5052 final` formal reference and, ideally, an `archived_url`; primary page not re-fetchable this pass (see §3.5).
- **`eu-src-aiact-eurlex`, `eu-src-aiact-servicedesk`, `eu-src-gdpr-eurlex` — APPROVE.** Tier, publisher, URL, CELEX/`stable_ref`, and `manual_verification_date` all correct; the Service Desk host is confirmed genuine (it serves the official guidelines PDF).

### 3.7 Control mappings

`cpm-art14-k01`, `cpm-art14-k04`, `cpm-art50-k09`, `cpm-gdpr22-k01`, `cpm-gdpr22-k04`: rationales, `strength`, and `relation` values are all sound and compliance-safe. **No independent defect.** They inherit the REVISE status of their parent provisions only because those provisions are held; the mapping records themselves are approve-quality and require no edit.

---

## 4. Cross-cutting observations (not per-record blockers)

1. **The omnibus is the single load-bearing EU risk.** Three EU records (`eu-ai-act`, `:art14`, `:art50-1`) depend on one unverifiable-to-primary Tier 2 source for a date narrative that is *true and corroborated* but not yet law. Once the amending act hits the OJ, capture the CELEX, archive the Consilium release, and re-score — this closes all three in one pass.
2. **`applies_from` on both AI-Act provisions (2026-08-02) is ~3 weeks from the review date** and, for Art 14, is the value the omnibus moves. Treat these as active §19.5 re-scoring triggers, not settled dates.
3. **No owner sign-off exists anywhere in the corpus** (per `PUBLICATION_REVIEW_QUEUE.md`). Even `eu-gdpr`, which I approve on the merits, still needs a *human* owner to log the final `approved`/sign-off action under §19.4 before publication. This review is the Reviewer-role Pass 2 input to that decision, nothing more.

---

*Prepared as the independent EU Pass 2 verification. `review_status` values were not modified and no record was published. All quote and date verifications above were performed against primary text or, where the primary host blocked retrieval, against the official mirror plus independent corroboration, as noted per finding.*
