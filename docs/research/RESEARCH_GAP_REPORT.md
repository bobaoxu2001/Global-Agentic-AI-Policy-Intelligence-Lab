# Research Gap Report

**Reconciled:** 2026-07-13
**Verdict:** blockers remain; no publication promotion is authorized.

## Publication blockers

1. **No documented human Pass 2 or owner sign-off.** All 15 instruments, 9 provisions, 13 controls, 10 mappings, and 2 changelog records remain `in_review`.
2. **Provision coverage is incomplete.** Eight instruments have no meaningful provision record: `us-co-sb24-205`, `us-eo-14179`, `us-eo-14110`, `us-nist-ai-rmf`, `eu-prohibited-practices-guidelines`, `sg-mgf-genai`, `sg-ai-verify`, and `cn-tc260-ai-safety-framework`.
3. **Control coverage is incomplete.** `cn-algo-recommendation-provisions:art16` and `cn-algo-recommendation-provisions:art24` have capability/risk mappings but no control mapping.
4. **Pin-citation blockers.** `us-co-sb26-189:developer-disclosure` and `cn-ai-labeling-measures:explicit-def` explicitly retain pending article/section pin cites.
5. **Translation review is unresolved.** All five China provisions quote Chinese original text; the English paraphrases are analyst translations and retain a medium-confidence cap pending review.

## Record and metadata contradictions to resolve

| Item | Contradiction or ambiguity | Required resolution |
|---|---|---|
| `eu-ai-act:art14` | The provision’s `source_id` is Tier 1 EUR-Lex, while its rationale says the verbatim text was checked through the Tier 2 Service Desk; its `applies_from` still says 2026-08-02 while the note describes a pending omnibus deferral. | Check the Official Journal amending act; align date and quote-evidence provenance. |
| `eu-ai-act:art50-1` | Same Tier-1 source/Tier-2 quote-verification split; non-deferral rests on a Consilium page that was unavailable to automated fetch. | Re-check the Official Journal and record the final legal source. |
| `us-co-sb24-205` | Record says superseded before applicability, while its note leaves the repeal’s operative date and any 2026 live-duty window unresolved. | Verify the enrolled act/effective-date rule and revise lifecycle narrative only after evidence review. |
| `us-eo-14110` | Revocation is supported by EO 14148, but the original EO 14110 Federal Register citation is absent. | Add and verify the original EO text before sign-off. |
| `sg-ai-verify` | Non-binding classification is inferred from self-assessment framing; the official page does not explicitly establish voluntariness. | Obtain a direct official statement or retain a narrower classification rationale. |
| `cn-deep-synthesis-provisions` | The order number is not captured. | Backfill from authoritative text or another official publication. |
| `cn-tc260-ai-safety-framework` | Version 2 announcement is present, but v1 source/PDF and version-evolution evidence remain unreviewed. | Verify v1 and the framework text. |

## Structural review gaps

- Sources have no `review_status`; they cannot independently demonstrate publication approval.
- Controls, control mappings, and changelog records have `review_status` but no `last_verified` field, so their freshness cannot be reconciled like instruments/provisions.
- The prior research log’s “batch 3” snapshot (16 sources / 13 instruments / 11 provisions) is historical and does not match the current JSON corpus. It must never be cited as current state.

## No-gap findings

- No orphan source IDs.
- No unresolved instrument/provision foreign keys.
- No provision without a capability map.
- No provision without a risk map.
- No fixture record appears in `src/data/content/`.
