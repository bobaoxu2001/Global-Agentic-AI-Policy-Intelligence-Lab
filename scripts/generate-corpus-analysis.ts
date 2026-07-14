import fs from 'node:fs';
import path from 'node:path';
import changelog from '../src/data/content/changelog.json';
import controlMaps from '../src/data/content/control-provision-map.json';
import controls from '../src/data/content/controls.json';
import instruments from '../src/data/content/instruments.json';
import provisions from '../src/data/content/provisions.json';
import sources from '../src/data/content/sources.json';

const countBy = <T>(rows: readonly T[], key: (row: T) => string | number) =>
  [...rows.reduce((map, row) => map.set(String(key(row)), (map.get(String(key(row))) ?? 0) + 1), new Map<string, number>())]
    .sort(([a], [b]) => a.localeCompare(b));

const table = (rows: Array<[string, number]>, denominator: number) => [
  '| Group | Count | Share |',
  '|---|---:|---:|',
  ...rows.map(([label, count]) => `| ${label} | ${count} | ${((count / denominator) * 100).toFixed(1)}% |`),
].join('\n');

const provisionParents = new Set(provisions.map((row) => row.instrument_id));
const controlledProvisions = new Set(controlMaps.map((row) => row.provision_id));
const recordStatuses = [...instruments, ...provisions, ...controls, ...controlMaps, ...changelog];
const published = recordStatuses.filter((row) => row.review_status === 'published').length;
const lastVerified = [...instruments, ...provisions].map((row) => row.last_verified).sort().at(-1) ?? '—';

const output = `# Structured Policy Corpus — Descriptive Analysis

**Generated:** 2026-07-14
**Data basis:** \`src/data/content/*.json\` working corpus
**Status:** reproducible descriptive portfolio analysis; not a legal-coverage or compliance study

## Executive readout

The working corpus contains **${sources.length} sources, ${instruments.length} instruments, ${provisions.length} provisions, ${controls.length} controls, ${controlMaps.length} control mappings, and ${changelog.length} change records**. It is useful for demonstrating structured policy research and policy-to-control analysis, but it is not the full MVP originally described in the specification: the provision sample reaches only **${((provisions.length / 120) * 100).toFixed(1)}% of the lower-bound target**. No reviewable record is published, so the production application correctly renders an empty structured corpus.

## 1. Coverage by jurisdiction

${table(countBy(instruments, (row) => row.jurisdiction_id), instruments.length)}

**Denominator:** ${instruments.length} instruments. Jurisdiction share describes this curated sample, not policy intensity, regulatory strictness, market importance, or legal exposure.

## 2. Instrument mix

### By instrument type

${table(countBy(instruments, (row) => row.instrument_type), instruments.length)}

### By lifecycle status

${table(countBy(instruments, (row) => row.lifecycle_status), instruments.length)}

Lifecycle counts are snapshots as last checked; they do not measure enforcement activity or future change probability.

## 3. Provision and control depth

| Measure | Numerator | Denominator | Coverage |
|---|---:|---:|---:|
| Instruments with at least one captured provision | ${provisionParents.size} | ${instruments.length} | ${((provisionParents.size / instruments.length) * 100).toFixed(1)}% |
| Provisions with at least one capability mapping | ${provisions.filter((row) => row.capability_map.length > 0).length} | ${provisions.length} | ${((provisions.filter((row) => row.capability_map.length > 0).length / provisions.length) * 100).toFixed(1)}% |
| Provisions with at least one risk mapping | ${provisions.filter((row) => row.risk_map.length > 0).length} | ${provisions.length} | ${((provisions.filter((row) => row.risk_map.length > 0).length / provisions.length) * 100).toFixed(1)}% |
| Provisions with at least one control mapping | ${controlledProvisions.size} | ${provisions.length} | ${((controlledProvisions.size / provisions.length) * 100).toFixed(1)}% |

The high mapping percentages describe completeness **within the nine selected provisions**. They do not offset the small provision denominator or prove the mappings are legally sufficient.

## 4. Source composition

### By source tier

${table(countBy(sources, (row) => row.tier), sources.length)}

### By language

${table(countBy(sources, (row) => row.language), sources.length)}

Tier is a provenance category, not a confidence score. Chinese-language records carry translation and reviewer limits described in the underlying data.

## 5. Publication and freshness

| Measure | Result |
|---|---:|
| Reviewable records across instruments, provisions, controls, mappings, and changelog | ${recordStatuses.length} |
| Published records | ${published} |
| Published share | ${((published / recordStatuses.length) * 100).toFixed(1)}% |
| Latest structured-record verification date | ${lastVerified} |
| Logged change events | ${changelog.length} |

The published share is intentionally zero. An owner approval for one instrument does not publish it, approve its provisions, or authorize the rest of the corpus.

## 6. Scope against the original specification

| Entity | Current | Original target | Share of lower bound |
|---|---:|---:|---:|
| Instruments | ${instruments.length} | 24–40 | ${((instruments.length / 24) * 100).toFixed(1)}% |
| Provisions | ${provisions.length} | 120–200 | ${((provisions.length / 120) * 100).toFixed(1)}% |
| Controls | ${controls.length} | 25–35 | ${((controls.length / 25) * 100).toFixed(1)}% |

For portfolio review, the repository formally treats the current data as a **curated research foundation** and the larger specification as a future research program. It does not claim MVP corpus completion.

## Method and reproducibility

- Counts come directly from the tracked JSON arrays; no rows are sampled out for this analysis.
- Shares use the displayed row count as denominator and are rounded to one decimal place.
- “With a mapping” means at least one stored mapping exists; it does not assess substantive quality or applicability.
- The generator is \`scripts/generate-corpus-analysis.ts\`; \`--check\` fails when this artifact is stale.

## Decision limits

Do not use these counts to rank jurisdictions, infer a missing obligation, estimate enforcement, claim comprehensive coverage, or calibrate ADRS. The appropriate decision is to use the data for workflow and evidence-design review while expanding and independently reviewing the corpus before publication.
`;

const outputPath = path.join(process.cwd(), 'docs/deliverables/POLICY_CORPUS_DESCRIPTIVE_ANALYSIS.md');
if (process.argv.includes('--check')) {
  if (!fs.existsSync(outputPath) || fs.readFileSync(outputPath, 'utf8') !== output) {
    console.error('[corpus-analysis] stale: docs/deliverables/POLICY_CORPUS_DESCRIPTIVE_ANALYSIS.md');
    process.exit(1);
  }
  console.log('[corpus-analysis] OK — descriptive analysis is current');
} else {
  fs.writeFileSync(outputPath, output);
  console.log('[corpus-analysis] wrote docs/deliverables/POLICY_CORPUS_DESCRIPTIVE_ANALYSIS.md');
}
