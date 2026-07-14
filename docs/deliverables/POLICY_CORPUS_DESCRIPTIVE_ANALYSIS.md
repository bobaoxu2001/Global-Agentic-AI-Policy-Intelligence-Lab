# Structured Policy Corpus — Descriptive Analysis

**Generated:** 2026-07-14
**Data basis:** `src/data/content/*.json` working corpus
**Status:** reproducible descriptive portfolio analysis; not a legal-coverage or compliance study

## Executive readout

The working corpus contains **17 sources, 15 instruments, 9 provisions, 13 controls, 10 control mappings, and 2 change records**. It is useful for demonstrating structured policy research and policy-to-control analysis, but it is not the full MVP originally described in the specification: the provision sample reaches only **7.5% of the lower-bound target**. No reviewable record is published, so the production application correctly renders an empty structured corpus.

## 1. Coverage by jurisdiction

| Group | Count | Share |
|---|---:|---:|
| cn | 5 | 33.3% |
| eu | 3 | 20.0% |
| sg | 2 | 13.3% |
| us | 5 | 33.3% |

**Denominator:** 15 instruments. Jurisdiction share describes this curated sample, not policy intensity, regulatory strictness, market importance, or legal exposure.

## 2. Instrument mix

### By instrument type

| Group | Count | Share |
|---|---:|---:|
| enacted_law | 4 | 26.7% |
| executive_action | 2 | 13.3% |
| regulation | 4 | 26.7% |
| regulator_guidance | 1 | 6.7% |
| technical_standard | 1 | 6.7% |
| voluntary_framework | 3 | 20.0% |

### By lifecycle status

| Group | Count | Share |
|---|---:|---:|
| adopted_not_yet_applicable | 1 | 6.7% |
| fully_applicable | 11 | 73.3% |
| in_force_partially_applicable | 1 | 6.7% |
| rescinded | 1 | 6.7% |
| superseded | 1 | 6.7% |

Lifecycle counts are snapshots as last checked; they do not measure enforcement activity or future change probability.

## 3. Provision and control depth

| Measure | Numerator | Denominator | Coverage |
|---|---:|---:|---:|
| Instruments with at least one captured provision | 7 | 15 | 46.7% |
| Provisions with at least one capability mapping | 9 | 9 | 100.0% |
| Provisions with at least one risk mapping | 9 | 9 | 100.0% |
| Provisions with at least one control mapping | 7 | 9 | 77.8% |

The high mapping percentages describe completeness **within the nine selected provisions**. They do not offset the small provision denominator or prove the mappings are legally sufficient.

## 4. Source composition

### By source tier

| Group | Count | Share |
|---|---:|---:|
| 1 | 14 | 82.4% |
| 2 | 3 | 17.6% |

### By language

| Group | Count | Share |
|---|---:|---:|
| en | 12 | 70.6% |
| zh | 5 | 29.4% |

Tier is a provenance category, not a confidence score. Chinese-language records carry translation and reviewer limits described in the underlying data.

## 5. Publication and freshness

| Measure | Result |
|---|---:|
| Reviewable records across instruments, provisions, controls, mappings, and changelog | 49 |
| Published records | 0 |
| Published share | 0.0% |
| Latest structured-record verification date | 2026-07-13 |
| Logged change events | 2 |

The published share is intentionally zero. An owner approval for one instrument does not publish it, approve its provisions, or authorize the rest of the corpus.

## 6. Scope against the original specification

| Entity | Current | Original target | Share of lower bound |
|---|---:|---:|---:|
| Instruments | 15 | 24–40 | 62.5% |
| Provisions | 9 | 120–200 | 7.5% |
| Controls | 13 | 25–35 | 52.0% |

For portfolio review, the repository formally treats the current data as a **curated research foundation** and the larger specification as a future research program. It does not claim MVP corpus completion.

## Method and reproducibility

- Counts come directly from the tracked JSON arrays; no rows are sampled out for this analysis.
- Shares use the displayed row count as denominator and are rounded to one decimal place.
- “With a mapping” means at least one stored mapping exists; it does not assess substantive quality or applicability.
- The generator is `scripts/generate-corpus-analysis.ts`; `--check` fails when this artifact is stale.

## Decision limits

Do not use these counts to rank jurisdictions, infer a missing obligation, estimate enforcement, claim comprehensive coverage, or calibrate ADRS. The appropriate decision is to use the data for workflow and evidence-design review while expanding and independently reviewing the corpus before publication.
