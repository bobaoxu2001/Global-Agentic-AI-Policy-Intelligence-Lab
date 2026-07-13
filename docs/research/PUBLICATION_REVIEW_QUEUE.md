# Publication Review Queue

**Reconciled:** 2026-07-13
**Rule:** This is a Pass 2 checklist, not authorization to publish. No entry has a named human reviewer or owner sign-off. Every record therefore remains `in_review`.

## Decision meanings

- **BLOCKED** — a factual, citation, lifecycle, source, translation, or coverage blocker must be resolved before Pass 2 can finish.
- **READY FOR PASS 2** — structured metadata is present and an identified reviewer can perform the required source check; it is not publishable yet.
- **READY FOR OWNER SIGN-OFF** — no current record qualifies.

## Instrument queue

| Record | Jurisdiction · status | Tier / official source | Last verified · lifecycle · bindingness | Provision coverage / open analyst notes | Decision |
|---|---|---|---|---|---|
| `eu-ai-act` | EU · `in_review` | T1 EUR-Lex AI Act; T2 Commission Service Desk / Council | 2026-07-12 · in force partially applicable · binding | 2 provisions; English source, no translation. Verify omnibus Official Journal/CELEX, date deferral, and 403-blocked Council evidence. | **BLOCKED** |
| `eu-gdpr` | EU · `in_review` | T1 EUR-Lex GDPR | 2026-07-12 · fully applicable · binding | 1 provision; English source, no translation. Art 22 verbatim text was not re-fetched. | **READY FOR PASS 2** |
| `eu-prohibited-practices-guidelines` | EU · `in_review` | T2 Commission prohibited-practices library page | 2026-07-12 · fully applicable · non-binding | No provision coverage; English source, no translation. Backfill formal-adoption reference and extract Art 5 capability hooks. | **BLOCKED** |
| `us-co-sb24-205` | US · `in_review` | T1 Colorado SB24-205 and SB26-189 bill pages | 2026-07-12 · superseded · binding | No provision coverage; English source, no translation. Resolve repeal operative date and whether duties were ever live. | **BLOCKED** |
| `us-co-sb26-189` | US · `in_review` | T1 Colorado SB26-189 bill page | 2026-07-12 · adopted not yet applicable · binding | 1 provision; English source, no translation. Verify enforcement/rulemaking condition and enrolled-text sections. | **BLOCKED** |
| `us-eo-14179` | US · `in_review` | T1 govinfo EO 14179 PDF | 2026-07-12 · fully applicable · conditionally binding | No provision coverage; English source, no translation. Verify OMB revision status and make policy-replacement link precise. | **BLOCKED** |
| `us-eo-14110` | US · `in_review` | T1 govinfo EO 14148 / EO 14179 PDFs | 2026-07-12 · rescinded · conditionally binding | No provision coverage; English source, no translation. Add original EO 14110 Federal Register source. | **BLOCKED** |
| `us-nist-ai-rmf` | US · `in_review` | T1 NIST AI RMF program page | 2026-07-12 · fully applicable · non-binding | No provision coverage; English source, no translation. Extract RMF/GenAI Profile function-level agent-relevant material from PDFs. | **BLOCKED** |
| `cn-ai-labeling-measures` | China · `in_review` | T1 CAC Labeling Measures notice | 2026-07-12 · fully applicable · binding | 1 provision; Chinese source, analyst English translation. Pin article number remains pending. | **BLOCKED** |
| `cn-genai-interim-measures` | China · `in_review` | T1 CAC Interim Measures notice | 2026-07-12 · fully applicable · binding | 1 provision; Chinese source, analyst English translation. Resolve filing and Art 17 cross-reference. | **READY FOR PASS 2** |
| `cn-deep-synthesis-provisions` | China · `in_review` | T1 CAC Deep Synthesis Provisions notice | 2026-07-12 · fully applicable · binding | 1 provision; Chinese source, analyst English translation. Backfill order number. | **READY FOR PASS 2** |
| `cn-algo-recommendation-provisions` | China · `in_review` | T1 CAC Algorithmic Recommendation Provisions notice | 2026-07-12 · fully applicable · binding | 2 provisions; Chinese source, analyst English translation. Add control mappings. | **BLOCKED** |
| `cn-tc260-ai-safety-framework` | China · `in_review` | T1 CAC TC260 Framework 2.0 announcement | 2026-07-12 · fully applicable · non-binding | No provision coverage; Chinese source, analyst English translation. Verify v1 source/PDF and extract framework content. | **BLOCKED** |
| `sg-mgf-genai` | Singapore · `in_review` | T1 MGF-GenAI official PDF | 2026-07-12 · fully applicable · non-binding | No provision coverage; English source, no translation. Full-text extraction and agent-relevant sections remain unverified. | **BLOCKED** |
| `sg-ai-verify` | Singapore · `in_review` | T1 AI Verify Foundation page | 2026-07-12 · fully applicable · non-binding | No provision coverage; English source, no translation. Direct proof of voluntariness and substantive criteria required. | **BLOCKED** |

## Provision queue

| Record | Jurisdiction · status | Tier / official source | Last verified · parent lifecycle / bindingness · applies from | Pin / translation / mappings | Open factual question | Decision |
|---|---|---|---|---|---|---|
| `eu-ai-act:art14` | EU · `in_review` | T1 EUR-Lex; quote checked through T2 Service Desk | 2026-07-12 · in force partially applicable / binding · 2026-08-02 recorded | Pin complete: Art 14(1); original EN quote; C5/C7/C8 → R6 → K01/K04 | Pending omnibus creates date/provenance contradiction; verify OJ. | **BLOCKED** |
| `eu-ai-act:art50-1` | EU · `in_review` | T1 EUR-Lex; quote checked through T2 Service Desk | 2026-07-12 · in force partially applicable / binding · 2026-08-02 | Pin complete: Art 50(1); original EN quote; C1/C6 → R4 → K09 | Confirm non-deferral in final OJ text, not blocked Council fetch. | **BLOCKED** |
| `eu-gdpr:art22` | EU · `in_review` | T1 EUR-Lex GDPR | 2026-07-12 · fully applicable / binding · 2018-05-25 | Pin complete: Art 22(1); paraphrase-only; C8/C9 → R3 → K01/K04 | Re-fetch verbatim article text and review paraphrase. | **READY FOR PASS 2** |
| `us-co-sb26-189:developer-disclosure` | US · `in_review` | T1 Colorado SB26-189 bill page | 2026-07-12 · adopted not yet applicable / binding · 2027-01-01 | **Pin pending**; no quote; C8 → R3 → K12 | Read enrolled text, establish section pin and duty wording. | **BLOCKED** |
| `cn-ai-labeling-measures:explicit-def` | China · `in_review` | T1 CAC Labeling Measures | 2026-07-12 · fully applicable / binding · 2025-09-01 | **Article number pending**; Chinese original quote; analyst EN paraphrase; C1/C6 → R4/R9 → K09 | Confirm article number and independently review translation. | **BLOCKED** |
| `cn-genai-interim-measures:art9` | China · `in_review` | T1 CAC Interim Measures | 2026-07-12 · fully applicable / binding · 2023-08-15 | Pin complete: Art 9; Chinese original quote; analyst EN paraphrase; C1 → R9 → K04/K13 | Independently review translation and service-scope inference. | **READY FOR PASS 2** |
| `cn-deep-synthesis-provisions:art17` | China · `in_review` | T1 CAC Deep Synthesis Provisions | 2026-07-12 · fully applicable / binding · 2023-01-10 | Pin complete: Art 17; Chinese original quote; analyst EN paraphrase; C1/C6 → R4 → K09 | Independently review translation and chat-surface scope inference. | **READY FOR PASS 2** |
| `cn-algo-recommendation-provisions:art16` | China · `in_review` | T1 CAC Algorithmic Recommendation Provisions | 2026-07-12 · fully applicable / binding · 2022-03-01 | Pin complete: Art 16; Chinese original quote; analyst EN paraphrase; C9/C6 → R4; **no control** | Independently review translation; author/review control mapping. | **BLOCKED** |
| `cn-algo-recommendation-provisions:art24` | China · `in_review` | T1 CAC Algorithmic Recommendation Provisions | 2026-07-12 · fully applicable / binding · 2022-03-01 | Pin complete: Art 24; Chinese original quote; analyst EN paraphrase; C1/C6 → R9/R12; **no control** | Independently review translation; author/review control mapping. | **BLOCKED** |

## Cross-cutting publication prerequisites

For any later promotion, the reviewer must record: reviewer identity/role, date, authoritative URL and access result, pin-cite check, translation decision, epistemic-block check, lifecycle/bindingness decision, mapping decision, and owner sign-off. This file records none of those approvals today.
