# Publication Readiness Report

**Reviewed:** 2026-07-13  
**Scope:** `src/data/content/` under the production publication gate  
**Verdict:** **CONTENT NOT READY FOR PUBLICATION**

## Summary

The real corpus contains 15 instruments, 9 provisions, 17 sources, 13 controls, and 2 changelog entries. All 15 instruments and all 9 provisions are marked `in_review`; therefore the production validator correctly rejects them. No record has been promoted by this review.

| Requirement | Current result | Publication consequence |
|---|---|---|
| Fixture isolation | Implemented and tested | Pass for code path |
| Source metadata | Present for the 17 current source records; Tier 1 records carry a manual verification date | Pass at schema level; not a substitute for review |
| `last_verified`, lifecycle, bindingness | Present on the 15 instruments and 9 provisions | Pass at schema level |
| Pin citations and epistemic separation | Present on the 9 provisions and validated by the schema/integrity pipeline | Pass at schema level |
| Human publication review log | No reviewer identity, review decision, or signed publication record in the corpus | Blocker for every real record |
| `review_status: published` | 0 of 15 instruments; 0 of 9 provisions | Hard production-gate blocker |
| Scenario assessments | Only illustrative fixtures exist | Production scenario/brief publishing blocked |

## Honest publication decision

Metadata completeness is necessary but not sufficient. The project’s methodology requires a second human review before publication. That review is not evidenced in the repository, so this report does **not** promote any record. The correct production behavior is to load the real corpus for validation, reject its `in_review` status, and render a truthful zero-published-record state.

## Required next action

Work through `PUBLICATION_REVIEW_QUEUE.md`. A reviewer must independently verify cited primary sources, resolve every analyst note labelled open or pending, record a decision, and then change only the approved records to `published` in a reviewable commit.
