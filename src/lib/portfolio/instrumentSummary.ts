export type InstrumentSummaryBlock = {
  kind: 'fact' | 'inference' | 'unclassified';
  confidence?: 'high' | 'medium' | 'low';
  text: string;
};

const MARKER = /([■▲])\s+(FACT|INFERENCE)(?:\s+\(([^)]*)\))?:\s*/g;

/**
 * The authored instrument summary format predates structured epistemic blocks.
 * Parse its explicit markers for honest presentation while leaving the source
 * content unchanged; provision records remain the canonical structured chain.
 */
export function parseInstrumentSummary(summary: string): InstrumentSummaryBlock[] {
  const matches = [...summary.matchAll(MARKER)];
  if (matches.length === 0) return [{ kind: 'unclassified', text: summary.trim() }];

  return matches.map((match, index) => {
    const confidence = match[3]?.match(/\b(high|medium|low)\b/)?.[1] as InstrumentSummaryBlock['confidence'];
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? summary.length;
    return {
      kind: match[2] === 'INFERENCE' ? 'inference' : 'fact',
      ...(confidence ? { confidence } : {}),
      text: summary.slice(start, end).trim(),
    };
  });
}
