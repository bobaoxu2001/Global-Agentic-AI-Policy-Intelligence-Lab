type SummaryRecord = { jurisdiction_id?: string; bindingness?: string | null; last_verified: string };

export function derivePreviewSummary(instruments: SummaryRecord[], provisions: SummaryRecord[]) {
  const verified = [...instruments, ...provisions].map((record) => record.last_verified).filter(Boolean).sort();
  return {
    instrumentCount: instruments.length,
    provisionCount: provisions.length,
    jurisdictionCount: new Set(instruments.map((record) => record.jurisdiction_id).filter(Boolean)).size,
    bindingCount: instruments.filter((record) => record.bindingness === 'binding').length,
    conditionallyBindingCount: instruments.filter((record) => record.bindingness === 'conditionally_binding').length,
    nonBindingCount: instruments.filter((record) => record.bindingness === 'non_binding').length,
    lastVerified: verified.at(-1) ?? null,
  };
}
