import { LocalizedText } from '@/components/LocalizedText';

const TERMS = [
  ['agentic-ai', 'Agentic AI', 'AI systems that can access data, call tools, communicate externally, and execute multi-step actions.'],
  ['instrument', 'Instrument', 'A policy document with lifecycle metadata; the Atlas treats provisions as the primary unit of analysis.'],
  ['provision', 'Provision', 'An article, section, or clause with an identifiable obligation, prohibition, right, definition, or scope rule.'],
  ['adrs', 'ADRS', 'Agent Deployment Risk Score: a transparent analytical score, not a compliance determination.'],
] as const;
export default function GlossaryPage() { return <><h1><LocalizedText id="support.glossary.title" fallback="Glossary" /></h1><p className="status-note"><LocalizedText id="support.glossary.note" fallback="A lightweight reference surface. Jurisdiction-specific legal definitions are added only after their underlying source records are published." /></p><dl>{TERMS.map(([id, term, definition]) => <div key={id}><dt><b><LocalizedText id={`support.glossary.${id}.term`} fallback={term} /></b></dt><dd><LocalizedText id={`support.glossary.${id}.definition`} fallback={definition} /></dd></div>)}</dl></>; }
