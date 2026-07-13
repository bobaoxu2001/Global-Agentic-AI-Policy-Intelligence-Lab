# Publication Readiness Report

**Reconciled:** 2026-07-13
**Scope:** current `main` content corpus (`src/data/content/`)
**Verdict:** **NOT READY FOR PUBLICATION**

## Current evidence base

| Entity | Current count | Status |
|---|---:|---|
| Sources | 17 | 14 Tier 1 / 3 Tier 2; source rows do not have `review_status` |
| Instruments | 15 | all `in_review` |
| Provisions | 9 | all `in_review` |
| Controls | 13 | all `in_review` |
| Control mappings | 10 | all `in_review` |
| Changelog records | 2 | all `in_review` |

The prior 15-instrument/9-provision headline remains accurate, but it was incomplete: the reconciled reviewer-facing baseline must also state 17 sources, 13 controls, 10 mappings, and 2 changelog records. See [Corpus Inventory](CORPUS_INVENTORY.md).

## Publication gates

| Gate | Result | Evidence / consequence |
|---|---|---|
| Fixture exclusion | Pass | Production loader selects real content only; no fixture row is in the content corpus. |
| Referential integrity | Pass | Instrument source IDs and provision parent/source references resolve. |
| Instrument/provision dates and classifications | Schema-pass, review-pending | All current instrument/provision rows carry `last_verified`; factual source questions remain. |
| Fact/inference/recommendation separation | Schema-pass, review-pending | All current provisions carry typed blocks, but this does not replace human source review. |
| Provision capability/risk coverage | Pass | All 9 provisions have at least one capability and risk map. |
| Provision control coverage | Fail | Two China algorithm-recommendation provisions have no control mapping. |
| Instrument provision coverage | Fail | Eight of 15 instruments have no provision record. |
| Pin-citation completeness | Fail | Two provision pins explicitly remain pending. |
| Translation review | Fail | China English paraphrases remain analyst translations pending Pass 2 review. |
| Human review log / owner sign-off | Fail | No identified human reviewer, decision, or owner sign-off exists. |
| `review_status: published` | Fail | 0 instruments, 0 provisions, 0 controls, 0 mappings, and 0 changelog records are published. |

## Why no record is promoted

This reconciliation does not verify primary-source texts anew, infer a reviewer, or resolve open analyst notes. Metadata completeness and validation success are not a substitute for the documented second-pass workflow. Every record remains `in_review`.

## Required sequence before production publication

1. Resolve the record-level questions in [Publication Review Queue](PUBLICATION_REVIEW_QUEUE.md).
2. Have an identified reviewer log each primary-source, pin-cite, translation, lifecycle, and mapping check.
3. Obtain owner sign-off for only the approved records.
4. Change those records to `published` in an auditable commit.
5. Run `npm run validate:production`; only if it passes, run `npm run build:production`.

Until then, the honest product verdict remains **CODE READY, CONTENT NOT READY**.
