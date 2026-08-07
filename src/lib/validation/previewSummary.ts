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
    // This date represents the freshness of the complete scoped set. Using the
    // oldest row prevents one newly refreshed record from refreshing the whole
    // snapshot by implication.
    lastVerified: verified.at(0) ?? null,
  };
}
