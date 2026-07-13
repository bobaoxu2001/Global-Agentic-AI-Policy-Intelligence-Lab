import fs from 'node:fs';
import path from 'node:path';
import instruments from '../src/data/content/instruments.json';
import provisions from '../src/data/content/provisions.json';
import sources from '../src/data/content/sources.json';
import { approvedPreviewIds, previewManifest } from '../src/lib/validation/previewManifest';

const root = process.cwd();
const approvedIds = approvedPreviewIds();
const recordsById = new Map<string, { id: string }>();
for (const record of instruments) recordsById.set(record.id, record);
for (const record of provisions) recordsById.set(record.id, record);
const sourcesById = new Map(sources.map((source) => [source.id, source]));

const rows = approvedIds.map((recordId) => {
  const manifestRecord = previewManifest.records.find((record) => record.record_id === recordId)!;
  const contentRecord = recordsById.get(recordId);
  if (!contentRecord) throw new Error(`Preview manifest record "${recordId}" does not resolve`);
  const source = sourcesById.get(manifestRecord.source_ids[0]!);
  if (!source) throw new Error(`Preview source "${manifestRecord.source_ids[0]}" does not resolve for ${recordId}`);
  return {
    record_id: recordId,
    review_basis: previewManifest.review_basis,
    review_decision: manifestRecord.decision,
    reviewed_by: previewManifest.reviewed_by,
    human_review_status: previewManifest.human_review_status,
    last_verified: manifestRecord.last_verified,
    source_url: source.url,
    disclaimer: previewManifest.disclaimer,
  };
});

const quoteCsv = (value: string) => `"${value.replaceAll('"', '""')}"`;
const columns = ['record_id', 'review_basis', 'review_decision', 'reviewed_by', 'human_review_status', 'last_verified', 'source_url', 'disclaimer'] as const;
const csv = [columns.join(','), ...rows.map((row) => columns.map((column) => quoteCsv(row[column])).join(','))].join('\n') + '\n';
const json = JSON.stringify({
  review_basis: previewManifest.review_basis,
  reviewed_by: previewManifest.reviewed_by,
  human_review_status: previewManifest.human_review_status,
  disclaimer: previewManifest.disclaimer,
  records: rows,
}, null, 2) + '\n';
const publicManifest = JSON.stringify(previewManifest, null, 2) + '\n';
const sourceRegister = [
  '# Golden 8 source register', '',
  `Review basis: ${previewManifest.review_basis}  `,
  `Reviewed by: ${previewManifest.reviewed_by}  `,
  `Human review status: ${previewManifest.human_review_status}  `,
  `Disclaimer: ${previewManifest.disclaimer}`, '',
  ...rows.map((row) => `- \`${row.record_id}\` — ${row.source_url}`), '',
].join('\n');

const outputs = new Map([
  ['public/downloads/golden-8-preview.json', json],
  ['public/downloads/golden-8-preview.csv', csv],
  ['public/downloads/golden-8-manifest.json', publicManifest],
  ['public/downloads/golden-8-source-register.md', sourceRegister],
]);

const checkOnly = process.argv.includes('--check');
let stale = false;
for (const [relativePath, expected] of outputs) {
  const target = path.join(root, relativePath);
  if (checkOnly) {
    if (!fs.existsSync(target) || fs.readFileSync(target, 'utf8') !== expected) {
      console.error(`[preview-exports] stale: ${relativePath}`);
      stale = true;
    }
  } else {
    fs.writeFileSync(target, expected);
    console.log(`[preview-exports] wrote ${relativePath}`);
  }
}
if (stale) process.exit(1);
if (checkOnly) console.log('[preview-exports] OK — generated artifacts are current');
