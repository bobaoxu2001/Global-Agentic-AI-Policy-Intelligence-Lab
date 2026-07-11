# Phase 1 Research Log — Batch 1 (all four jurisdictions)

**Pass 1 (authoring) date:** 2026-07-12 · **Analyst:** single-author mode (§19.4 two-pass protocol) · **All records:** `review_status: in_review` — nothing publishes until Pass 2 on a different day, working checklist-only against primary sources (§19.3).

Corpus after batch 1: **10 sources · 7 instruments · 7 provisions** (plus the 20-record fictional fixture corpus, which remains profile-separated). Production gate verified: R7 rejects fixtures, R8 rejects these in_review records — `build:production` stays red until Pass 2 publishes, by design.

---

## Verification record (what was actually checked, how)

| Record | Verification this session | Confidence outcome |
|---|---|---|
| EU AI Act (32024R1689) | EUR-Lex fetched (doc truncated before articles); Art 14(1) and Art 50(1) **verbatim via Commission AI Act Service Desk** (Tier 2 official mirror); omnibus status via Consilium press release — **fetch 403'd** (MJ-7 allowlist host), corroborated by ≥4 independent secondary reports + Parliament endorsement | Art texts: fact-high · status/dates: **medium** (§22 pending-amendment cap — omnibus adopted 2026-06-29, OJ publication pending) |
| 2026 digital omnibus (drift event) | Annex III high-risk → **2027-12-02**, Annex I → **2028-08-02**; **Art 50(1) NOT deferred** (2026-08-02 holds); Art 50(2) watermarking → 2026-12-02 for existing systems | medium; recorded in `key_dates`, not as amended text |
| GDPR (32016R0679) | CELEX metadata verified; **Art 22(1) verbatim NOT re-fetched** → paraphrase-only record | **medium** with honest rationale (no unverified quote shipped) |
| Colorado SB 24-205 | Official bill page **fetched** (signed 2024-05-17; original duties date 2026-02-01) | superseded-status: medium (see open item 1) |
| Colorado SB 26-189 | Official bill page **fetched** ("repeals and reenacts"; signed 2026-05-14; developer duties 2027-01-01) | fact-medium (summary-level; full text pending) |
| CN 标识办法 | **CAC notice fetched directly** — issued 2025-03-07, 国信办通字〔2025〕2号, effective 2025-09-01; 显式标识 definition quoted **verbatim in Chinese** (authoritative language, §6.4) | medium (analyst's own EN translation → §7.5 cap) |
| SG MGF-GenAI | **Official PDF fetched** — title/issuers/date verified (2024-05-30); text extraction limited | medium; nine-dimensions detail deferred, not asserted |

**Discipline notes:** no quote was shipped that was not retrieved this session; blocked fetches (Consilium 403) are recorded per MJ-7 with corroboration in `analyst_notes`, never silently upgraded; instruments knowable only second-hand this session (深度合成规定, 暂行办法, PDPA, EO 14179, NIST AI RMF) were **queued rather than cited from memory**.

## Regulatory-drift events captured (changelog seeds for P2-13)

1. **EU omnibus deferral** (2026-06-29): high-risk dates moved; Art 50(1) held — the flagship "same instrument, diverging dates" story.
2. **Colorado repeal-and-replace** (2026-05-14): SB 24-205 became the corpus's exemplar of `enacted_law → superseded` **without ever reaching applicability** — Axis A/C independence on a real instrument.

## Pass 2 queue (blocking publication)

1. **SB 26-189 repeal timing** — operative on signing vs 2026-08-12? Determines whether SB 24-205 duties were technically live 2026-06-30→08-12. (Open verification item in the record.)
2. **EU omnibus OJ publication** — capture new CELEX, update `key_dates`, lift §22 pending-amendment caps where warranted; re-score any assessment whose `near_term_hit` this touches (§19.5 trigger).
3. **GDPR Art 22(1) verbatim** re-fetch; **SB 26-189** and **标识办法** full-text passes (pin cites, article numbers); **MGF-GenAI** nine dimensions.
4. **Queued instruments:** CN 深度合成规定 + 生成式AI暂行办法; SG PDPA (+2020 amendment as MJ-4 event exemplar); US EO 14179/EO 14110 pair + NIST AI RMF/AI 600-1.
5. Per §19.3 checklist: re-resolve every URL, confirm quotes against pin cites, then flip to `published` and cut changelog entries for the two drift events.
