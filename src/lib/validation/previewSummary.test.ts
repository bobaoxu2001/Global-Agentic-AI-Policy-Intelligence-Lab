import { describe, expect, it } from 'vitest';
import { derivePreviewSummary } from './previewSummary';

describe('derivePreviewSummary', () => {
  it('derives counts and the maximum verification date from rendered records', () => {
    expect(derivePreviewSummary([
      { jurisdiction_id: 'eu', bindingness: 'binding', last_verified: '2026-07-11' },
      { jurisdiction_id: 'sg', bindingness: 'non_binding', last_verified: '2026-07-12' },
    ], [{ last_verified: '2026-07-13' }])).toEqual({
      instrumentCount: 2, provisionCount: 1, jurisdictionCount: 2,
      bindingCount: 1, conditionallyBindingCount: 0, nonBindingCount: 1, lastVerified: '2026-07-13',
    });
  });

  it('is safe for an empty preview', () => {
    expect(derivePreviewSummary([], []).lastVerified).toBeNull();
  });
});
