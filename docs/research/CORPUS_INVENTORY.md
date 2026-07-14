# Corpus Inventory

**Reconciled:** 2026-07-14
**Data authority:** `src/data/content/*.json`; commit SHA is recorded in the publication handoff after release
**Publication state:** no record is published.

## Exact totals

| Entity | Count | Review-status breakdown |
|---|---:|---|
| Sources | 17 | no `review_status` field |
| Instruments | 15 | 15 `in_review` |
| Provisions | 9 | 9 `in_review` |
| Controls | 13 | 13 `in_review` |
| Control mappings | 10 | 10 `in_review` |
| Changelog records | 2 | 2 `in_review` |

## Instruments

### By jurisdiction

| EU | US | China | Singapore |
|---:|---:|---:|
| 3 | 5 | 5 | 2 |

### By instrument type

| Type | Count |
|---|---:|
| enacted_law | 4 |
| regulation | 4 |
| voluntary_framework | 3 |
| executive_action | 2 |
| regulator_guidance | 1 |
| technical_standard | 1 |

### By lifecycle

| Lifecycle | Count |
|---|---:|
| fully_applicable | 11 |
| in_force_partially_applicable | 1 |
| adopted_not_yet_applicable | 1 |
| superseded | 1 |
| rescinded | 1 |

## Provisions and mappings

| Jurisdiction | Provisions | With capability map | With risk map | With control map |
|---|---:|---:|---:|---:|
| EU | 3 | 3 | 3 | 3 |
| US | 1 | 1 | 1 | 1 |
| China | 5 | 5 | 5 | 3 |
| Singapore | 0 | — | — | — |

All 9 provisions have at least one capability and risk mapping. Two provisions lack a control mapping: `cn-algo-recommendation-provisions:art16` and `cn-algo-recommendation-provisions:art24`.

## Sources and controls

- Sources: 14 Tier 1, 3 Tier 2; 12 English, 5 Chinese.
- Controls: 9 technical, 3 process, 1 documentation; 11 map to mitigation classes and 2 have no mitigation class.
- Every instrument source ID resolves; every provision source is listed on its parent instrument; no source is orphaned.

## Portfolio MVP boundary

For hiring-manager review, the current implementation is a **curated research and workflow MVP**: it demonstrates source governance, typed policy-to-control mapping, profile isolation, generated analysis, and a fail-closed publication path. It does not claim the original specification’s large corpus target was completed.

The 24–40 instrument, 120–200 provision, and 25–35 control ranges are retained as a **future research-program target**, not an acceptance claim for this portfolio release. Publication readiness is determined record by record through source, reviewer, and owner evidence—not by reaching a row count.

## Coverage against the future research-program target

The SPEC target is 24–40 instruments, 120–200 provisions, and 25–35 controls. The current corpus is 15 instruments (9–25 short), 9 provisions (111–191 short), and 13 controls (12–22 short). The data is a curated Pass-1 foundation, not an MVP-complete publication corpus.
