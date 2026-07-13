# Current Project Status

**As of:** 2026-07-13
**Branch reconciled:** `main` (`aca3630` at review start)
**Verdict:** **CORPUS RECONCILED WITH BLOCKERS**

## Readiness split

| Dimension | Status | Evidence |
|---|---|---|
| Fixture demo | Ready | Fixture validation/build and browser suite pass. |
| Production code path | Ready | Profile separation and production empty-state coverage are in place. |
| Production content | Not ready | 15 instruments, 9 provisions, 13 controls, 10 mappings, and 2 changelog rows are all `in_review`. |
| Publication readiness | Blocked | No Pass 2 human-review or owner-sign-off evidence; source and coverage gaps remain. |
| Production build | Not eligible | `validate:production` must pass before build is run. |

## Current corpus

17 sources · 15 instruments · 9 provisions · 13 controls · 10 control mappings · 2 changelog records. Full breakdown: [Corpus Inventory](research/CORPUS_INVENTORY.md).

## What changed in this reconciliation

- Rebuilt the publication queue at individual instrument/provision level.
- Identified eight instruments without provision coverage and two provisions without control mappings.
- Flagged source/provenance and lifecycle contradictions without modifying underlying research records.
- Reconciled stale historic counts in the research log and demo/memo language to the current corpus state.

## Next safe action

Use the [Publication Review Queue](research/PUBLICATION_REVIEW_QUEUE.md) for an identified human Pass 2. Do not change `review_status` to `published` until each record has a documented source check, decision, and owner sign-off.
