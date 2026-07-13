import { describe, expect, it } from 'vitest';
import { approvedPreviewIds, PreviewManifestSchema, previewManifest } from './previewManifest';

describe('Golden 8 preview manifest', () => {
  it('contains exactly eight uniquely approved records', () => {
    expect(approvedPreviewIds()).toHaveLength(8);
    expect(new Set(approvedPreviewIds()).size).toBe(8);
  });

  it('rejects duplicate record IDs', () => {
    const duplicate = { ...previewManifest, records: [...previewManifest.records, previewManifest.records[0]!] };
    expect(PreviewManifestSchema.safeParse(duplicate).success).toBe(false);
  });
});
