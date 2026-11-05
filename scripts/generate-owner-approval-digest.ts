import { publicationRecordSha256 } from '../src/lib/validation/integrity';
import { loadAndValidate } from '../src/lib/validation/loadDataset';

const RECORD_TYPES = ['instrument', 'provision', 'assessment', 'changelog', 'control', 'control_provision_map'] as const;
type RecordType = (typeof RECORD_TYPES)[number];

const [recordTypeInput, recordId] = process.argv.slice(2);

if (!RECORD_TYPES.includes(recordTypeInput as RecordType) || !recordId) {
  console.error(`Usage: npm run owner:digest -- <${RECORD_TYPES.join('|')}> <record-id>`);
  process.exitCode = 1;
} else {
  const recordType = recordTypeInput as RecordType;
  const report = loadAndValidate('production');
  const collections = {
    instrument: report.dataset.instruments,
    provision: report.dataset.provisions,
    assessment: report.dataset.assessments,
    changelog: report.dataset.changelog,
    control: report.controls,
    control_provision_map: report.controlMaps,
  } as const;
  const record = collections[recordType].find((candidate) => candidate.id === recordId);

  if (!record) {
    console.error(`No ${recordType} record found with id "${recordId}".`);
    process.exitCode = 1;
  } else {
    const recordWithSources = record as { source_id?: string; source_ids?: string[]; translation_source_id?: string };
    const sourceIds = recordWithSources.source_ids ?? [recordWithSources.source_id, recordWithSources.translation_source_id]
      .filter((sourceId): sourceId is string => typeof sourceId === 'string');
    const resolvedSources = report.dataset.sources.filter((source) => sourceIds.includes(source.id));
    console.log(JSON.stringify({
      record_id: recordId,
      record_type: recordType,
      record_sha256: publicationRecordSha256(record, resolvedSources),
      review_status: record.review_status,
    }, null, 2));
  }
}
