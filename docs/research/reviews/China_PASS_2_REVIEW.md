# China Pass 2 Independent Policy Review

**Scope:** All China (`jurisdiction_id = 'cn'`) records in the AI Policy Atlas corpus — 5 instruments, 5 provisions, 5 sources, and their capability/risk/control mappings.
**Reviewer:** Automated Pass 2 verification (LLM agent acting under the §19.4 two-pass protocol as the *Reviewer* role). **This is not a human sign-off.** No `review_status` value was changed; no record was published. A named human owner must still perform final sign-off before any record is promoted.
**Review date:** 2026-07-13 · **Records `as_of` / `last_verified`:** 2026-07-12
**Method:** Every fact-typed claim, verbatim Chinese quote, pin cite, date, classification, order number, and mapping was checked against the primary CAC text or, where `cac.gov.cn` blocked automated retrieval (MJ-7 allowlist host, confirmed blocked this pass), against authoritative mirrors (维基文库 / Wikisource) and independent corroboration. Because every CN English rendering is the analyst's own translation, confidence is capped at **Medium** per §7.5 — that cap is correctly applied throughout and is not itself a defect.

---

## 1. Decision summary

| Record ID | Type | Decision |
|---|---|---|
| `cn-genai-interim-measures` | instrument | **APPROVE FOR OWNER SIGN-OFF** |
| `cn-ai-labeling-measures` | instrument | **APPROVE FOR OWNER SIGN-OFF** |
| `cn-algo-recommendation-provisions` | instrument | **APPROVE FOR OWNER SIGN-OFF** |
| `cn-deep-synthesis-provisions` | instrument | **REVISE** |
| `cn-tc260-ai-safety-framework` | instrument | **REVISE** |
| `cn-genai-interim-measures:art9` | provision | **APPROVE FOR OWNER SIGN-OFF** |
| `cn-ai-labeling-measures:explicit-def` | provision | **REVISE** |
| `cn-algo-recommendation-provisions:art16` | provision | **REVISE** |
| `cn-algo-recommendation-provisions:art24` | provision | **REVISE** |
| `cn-deep-synthesis-provisions:art17` | provision | **BLOCK** |
| `cn-src-genai-interim-cac`, `cn-src-algo-rec-cac`, `cn-src-labeling-cac` | source | **APPROVE FOR OWNER SIGN-OFF** |
| `cn-src-deepsynthesis-cac` | source | **REVISE** |
| `cn-src-tc260-framework-cac` | source | **REVISE** |
| `cpm-genai9-k04`, `cpm-genai9-k13`, `cpm-label-k09` | control map | **APPROVE** (parent status noted) |
| `cpm-ds17-k09` | control map | **REVISE / HELD** (parent provision BLOCKED) |

**Net:** One provision — `cn-deep-synthesis-provisions:art17` — is **BLOCK**: its `quote_verbatim` field does **not** contain the verbatim text of Article 17 and drops a material scope qualifier, overstating the obligation. Everything else is either clean (`cn-genai-interim-measures` + Art 9, the Labeling and Algo-Recommendation instruments) or **REVISE** for fixable pin-cite / date / order-number / coverage items, most of which my verification has already resolved to the exact correction.

**Note on divergence from `PUBLICATION_REVIEW_QUEUE.md`:** the queue lists Art 17 as *READY FOR PASS 2*. Independent verification finds it a **BLOCK** (non-verbatim quote). Conversely the queue *BLOCKED* `cn-ai-labeling-measures` and `cn-algo-recommendation-provisions` at instrument level; I approve those instruments' metadata (the blockers are provision-field and mapping-coverage items, decided separately per record below).

---

## 2. What was verified clean (no correction required)

- **`cn-genai-interim-measures:art9` — verbatim quote EXACT.** Record: "提供者应当依法承担网络信息内容生产者责任，履行网络信息安全义务。" This is the exact first sentence of Article 9; truncation is at a clean sentence boundary (the dropped remainder concerns personal-information duties). Pin `第九条` correct; paraphrase (provider bears content-producer responsibility) accurate; capability map C1 and risk R9 sound.
- **`cn-genai-interim-measures` instrument.** Order No. 15 (国家互联网信息办公室令第15号), seven departments (CAC, NDRC, MOE, MOST, MIIT, MPS, NRTA), 公布 2023-07-10, 施行 2023-08-15, `regulation` + `binding` per §8 rule 3 — all corroborated.
- **`cn-algo-recommendation-provisions` instrument.** Order No. 9 (四部门令第9号), four departments (CAC, MIIT, MPS, SAMR), 公布 2021-12-31, 施行 2022-03-01 — all corroborated. (The record correctly uses the order date 2021-12-31, not the 2022-01-04 website-posting date.)
- **`cn-ai-labeling-measures` instrument.** Four departments (CAC, MIIT, MPS, NRTA), 国信办通字〔2025〕2号, 成文 2025-03-07, 施行 2025-09-01, `regulation` + `binding` per §8 rule 3 (a 规范性文件, bundled with 部门规章 by that rule). Correct.
- **`cn-algo-recommendation-provisions:art16` — quoted text is accurate** (it is a faithful excerpt of the first clause of Article 16; the fidelity issue is punctuation/truncation marking only — see §3.3).
- **`cn-tc260-ai-safety-framework` classification & v2.0 facts.** `technical_standard` + `non_binding` corroborated ("全国网安标委技术文件"); v2.0 released **2025-09-15** at the 2025 国家网络安全宣传周主论坛; CNCERT-led (国家互联网应急中心牵头); v1.0 in **September 2024**.
- **All CN recommendation / mapping blocks are compliance-safe.** No CN recommendation or control-mapping `rationale` asserts legal compliance; e.g. `cpm-label-k09` frames a single labeling choke point as serving multiple regimes without claiming it "makes you compliant." No epistemic-typing violation (fact/inference/recommendation) found in any CN record's `epistemic_blocks` other than the Art 17 overstatement noted below.

---

## 3. REVISE and BLOCK details

### 3.1 `cn-deep-synthesis-provisions:art17` (provision) — **BLOCK**

- **Field:** `quote_verbatim` (and, derivatively, `epistemic_blocks[b1].text_md` and `[b2]`).
- **Reason:** The stored `quote_verbatim` — "提供智能对话、合成人声、人脸生成、沉浸式拟真场景等生成或显著改变信息内容功能的服务的，应当进行显著标识。" — is **not the verbatim text of Article 17**. It is an analyst condensation that (a) **omits the operative scope qualifier "可能导致公众混淆或者误认的"** (only services that *may cause public confusion or misidentification* must be labeled), (b) collapses the enumerated list （一）–（五） into a single phrase, and (c) drops "在生成或者编辑的信息内容的合理位置、区域进行显著标识，向公众提示深度合成情况". Because the qualifier is deleted, the quote makes a **conditional** labeling duty read as **unconditional** — the fact text therefore *exceeds the source* (violates review step 7 and §7.3/§18.2, which require `quote_verbatim` to be verbatim). Inference `b2` inherits the overstatement ("an agent's chat surface is within scope by enumeration, not interpretation" — true only for services that may cause confusion).
- **Required correction:** replace `quote_verbatim` with the true text, preserving the qualifier and using an ellipsis to satisfy ≤50 words / ≤350 chars, e.g.: "深度合成服务提供者提供以下深度合成服务，可能导致公众混淆或者误认的，应当在生成或者编辑的信息内容的合理位置、区域进行显著标识，向公众提示深度合成情况：（一）智能对话……". Re-word `b1`/`b2` so the "智能对话 is enumerated" point is stated *within* the confusion-qualifier condition. Re-run the wording-lint after the fix.
- **Primary-source evidence:** Article 17 verbatim confirmed via 维基文库 (`zh.wikisource.org/zh-hans/互联网信息服务深度合成管理规定`) and independent search: "深度合成服务提供者提供以下深度合成服务，可能导致公众混淆或者误认的，应当在生成或者编辑的信息内容的合理位置、区域进行显著标识，向公众提示深度合成情况：（一）智能对话、智能写作…；（二）合成人声、仿声…；（三）人脸生成、人脸替换…；（四）沉浸式拟真场景…；（五）其他…".

### 3.2 `cn-deep-synthesis-provisions` (instrument) — **REVISE**

- **Field:** `adopted_date` / `key_dates[0]` (the "公布" event, recorded 2022-12-11); source `stable_ref` (order number "未见于发布页").
- **Reason:** The Provisions were promulgated as **Order No. 12** (国家互联网信息办公室、工业和信息化部、公安部令第12号), dated **2022-11-25**. The record uses **2022-12-11** (the CAC website-posting date) and labels it "公布 (three departments)", and leaves the order number blank. The 施行 date 2023-01-10 is correct.
- **Required correction:** set `adopted_date` and the "公布" `key_date` to **2022-11-25** (or relabel 2022-12-11 as the website-posting event and add the 2022-11-25 promulgation date); backfill the order number **令第12号** into the source `stable_ref` and instrument metadata.
- **Primary-source evidence:** 维基文库 header — "令号：第12号 · 发布部门：国家互联网信息办公室、工业和信息化部、公安部 · 发布日期：2022年11月25日"; independent search confirms issuance "on November 25, 2022".

### 3.3 `cn-algo-recommendation-provisions:art16` (provision) — **REVISE**

- **Field:** `quote_verbatim`.
- **Reason:** The quote ends "…算法推荐服务的情况。" with a full stop, but Article 16's first clause ends with a comma and continues "…情况，**并以适当方式公示算法推荐服务的基本原理、目的意图和主要运行机制等。**" The quoted words are accurate, but substituting a period for the original comma and omitting the second clause without an ellipsis presents a mid-sentence cut as a complete sentence (§7.3 / §21.3 fidelity).
- **Required correction:** append an ellipsis — "…算法推荐服务的情况……" — or quote the full sentence (it fits within ≤350 chars). No meaning was overstated, so this is a fidelity fix, not a scope error.
- **Primary-source evidence:** Article 16 full text (人民网 / DigiChina / CAC): "算法推荐服务提供者应当以显著方式告知用户其提供算法推荐服务的情况，并以适当方式公示算法推荐服务的基本原理、目的意图和主要运行机制等。"

**Additional field — missing control mapping.** No `control_provision_map` row exists for this provision (AC-4 requires each scenario top-5 provision to map to ≥1 control with the full typed chain). Required correction: author a mapping (e.g., → K09 disclosure surface, `strength: derived`) or confirm the provision is out of the scenario top-5 set.

### 3.4 `cn-algo-recommendation-provisions:art24` (provision) — **REVISE**

- **Field:** `quote_verbatim`.
- **Reason:** The quote reads "…通过互联网信息服务算法备案系统**填报信息**。" but Article 24 says "…算法备案系统**填报服务提供者的名称、服务形式、应用领域、算法类型、算法自评估报告、拟公示内容等信息，履行备案手续。**" The record condenses the enumerated filing contents to "填报信息" and drops "履行备案手续" without an ellipsis — so the `quote_verbatim` field is not verbatim. Unlike Art 17 this does **not** overstate the obligation (the 10-working-day filing duty is intact), so REVISE rather than BLOCK.
- **Required correction:** restore verbatim with an ellipsis to fit the limit, e.g. "具有舆论属性或者社会动员能力的算法推荐服务提供者应当在提供服务之日起十个工作日内通过互联网信息服务算法备案系统填报……信息，履行备案手续。"
- **Primary-source evidence:** Article 24 full text (人民网 / CAC / DigiChina): "具有舆论属性或者社会动员能力的算法推荐服务提供者应当在提供服务之日起十个工作日内通过互联网信息服务算法备案系统填报服务提供者的名称、服务形式、应用领域、算法类型、算法自评估报告、拟公示内容等信息，履行备案手续。"

**Additional field — missing control mapping.** Same AC-4 gap as §3.3: no `control_provision_map` row for this provision. Required correction: author a mapping (e.g., → K12 filing/documentation, `strength: direct`, `relation: satisfies_in_part`) or confirm out-of-scope.

### 3.5 `cn-ai-labeling-measures:explicit-def` (provision) — **REVISE**

- **Field:** `pin_cite` (currently "定义条款 (article number pending full-text pass)") and `epistemic_blocks[b1].citations[0].pin_cite`.
- **Reason:** The article number is no longer "pending" — the 显式标识 definition is **Article 3 (第三条)** of the Labeling Measures. Leaving a real, resolvable pin cite as "pending" fails review step 6 (verify each quote against a specific pin citation).
- **Required correction:** set `pin_cite` to **第三条 (Article 3)**. The `quote_verbatim` "在生成合成内容或者交互场景界面中添加的，以文字、声音、图形等方式呈现并可以被用户明显感知到的标识。" is an accurate excerpt of the Article 3 定义 (the record omits the lead-in "显式标识是指"); the translation/paraphrase is faithful and needs no change.
- **Primary-source evidence:** Article 3: "显式标识是指在生成合成内容或者交互场景界面中添加的，以文字、声音、图形等方式呈现并可以被用户明显感知到的标识" (independent search + PwC/Lexology compliance analyses of 国信办通字〔2025〕2号). Note Article 3 also defines 隐式标识, supporting the record's paraphrase reference to the implicit label.

### 3.6 `cn-tc260-ai-safety-framework` (instrument) — **REVISE**

- **Field:** `key_dates[0]` (v1.0 date 2024-09-09) + `source_ids` (v1.0 source not captured); `summary_md` purpose quote; provision coverage (none).
- **Reason:** v2.0 (2025-09-15) and the `technical_standard`/`non_binding` classification are corroborated, but (a) the **v1.0 exact date 2024-09-09 and its source PDF were not verifiable this pass** (search confirms only "2024年9月"); (b) the verbatim purpose quote "促进形成安全、可信、可控的人工智能发展生态，构建跨国界、跨领域、跨行业的协同治理格局" **could not be confirmed against the framework text this pass** (cac.gov.cn blocked); (c) the instrument carries **zero provisions**, so it cannot yet anchor any capability/risk mapping (§6.2 curation).
- **Required correction:** capture the v1.0 primary source (TC260 postDetail / CAC 2024-09 page) and confirm the exact 2024-09-09 date; verify the purpose quote verbatim against the framework document; extract ≥1 agent-relevant provision or mark the record context-only.
- **Primary-source evidence:** v2.0 corroborated at `tc260.org.cn/front/postDetail.html?id=20250915124214` and `cac.gov.cn/2025-09/15/c_1759653448369123.htm` (blocked to me; surfaced via search); v1.0 "2024年9月…受到国内外广泛关注" — day-level date and the purpose sentence remain to be verified against the primary PDF.

### 3.7 Sources

- **`cn-src-deepsynthesis-cac` — REVISE.** `stable_ref` still says "文号未见于发布页 — Pass 2 补录"; backfill **令第12号** and reconcile the 2022-12-11 posting date vs the 2022-11-25 promulgation date (see §3.2).
- **`cn-src-tc260-framework-cac` — REVISE.** Captures only the v2.0 announcement; add the v1.0 source (see §3.6).
- **`cn-src-genai-interim-cac`, `cn-src-algo-rec-cac`, `cn-src-labeling-cac` — APPROVE.** Tier 1, publisher/URL/`stable_ref`/order-number correct, `manual_verification_date` logged (satisfies §21.6 for allowlisted `cac.gov.cn`).
- **Cross-cutting (all 5 CN sources):** none records an `archived_url`. §21.6 requires Tier 1 sources to record an archive snapshot "wherever legally and technically possible." Because `cac.gov.cn` is allowlisted and a manual verification date is logged, this is a **warning-tier** item, not a build-blocker — but a web-archive snapshot should be added for each before owner sign-off, since the CELEX-equivalent 文号 is not a resolvable URL.

### 3.8 Control mappings

- **`cpm-genai9-k04`, `cpm-genai9-k13`, `cpm-label-k09` — APPROVE.** Rationales, `strength`, `relation` sound; no compliance claim. (`cpm-label-k09`'s parent provision is REVISE for the pin cite only; the mapping itself is unaffected.)
- **`cpm-ds17-k09` — REVISE / HELD.** The mapping substance (K09 render-layer 显著标识 for 智能对话) is defensible, but its parent provision `cn-deep-synthesis-provisions:art17` is **BLOCKED**; the mapping cannot advance until the parent's `quote_verbatim` is corrected, and its rationale should then track the confusion-qualifier scope.
- **Coverage gap:** `cn-algo-recommendation-provisions:art16` and `:art24` have **no** control mappings (§3.3–3.4).

---

## 4. Cross-cutting observations (not per-record blockers)

1. **Verbatim discipline is the CN corpus's main weakness.** Three of five CN provision quotes (`art17`, `art16`, `art24`) put non-verbatim or truncated-without-ellipsis text in `quote_verbatim`. Only `art17` overstates the obligation (→ BLOCK); the other two are fidelity fixes (→ REVISE). Re-fetching the four CAC texts and restoring exact strings (with ellipses to meet the ≤50-word / ≤350-char rule) closes all three plus the Art 3 pin.
2. **Pin cites and order numbers are now resolvable.** This pass has established the previously-"pending" facts: Labeling 显式标识 = **Article 3**; Deep Synthesis = **Order No. 12**, promulgated **2022-11-25**. These were the specific open analyst-note items (review step 12) — they can be backfilled directly rather than deferred again.
3. **Translation caps are correctly applied.** Every CN record confidence is capped Medium for analyst-own translation (§7.5). I verified the Chinese originals; the English paraphrases I could check (Art 9, Art 16, Art 24, Art 3 定义) are faithful. A human reviewer fluent in Chinese should still confirm the Art 17 paraphrase after its quote is corrected.
4. **Primary-host access caveat.** `cac.gov.cn` blocked automated retrieval throughout this pass (expected per the MJ-7 allowlist); all CN verifications above rest on authoritative mirrors (维基文库) plus independent corroboration. A human owner should re-open the CAC primary pages directly before final sign-off, especially for the unverified TC260 purpose quote (§3.6).
5. **No owner sign-off exists anywhere in the corpus.** Even the three CN records I approve on the merits still require a *human* owner to log the final `approved` action under §19.4 before publication. This review is the Reviewer-role Pass 2 input, nothing more.

---

*Prepared as the independent China Pass 2 verification. `review_status` values were not modified and no record was published. Verbatim and date verifications were performed against primary CAC text or, where the primary host blocked retrieval, against authoritative mirrors plus independent corroboration, as noted per finding.*
