const TERMS = [
  ['Agentic AI', 'AI systems that can access data, call tools, communicate externally, and execute multi-step actions.'],
  ['Instrument', 'A policy document with lifecycle metadata; the Atlas treats provisions as the primary unit of analysis.'],
  ['Provision', 'An article, section, or clause with an identifiable obligation, prohibition, right, definition, or scope rule.'],
  ['ADRS', 'Agent Deployment Risk Score: a transparent analytical score, not a compliance determination.'],
];
export default function GlossaryPage() { return <><h1>Glossary</h1><p className="status-note">A lightweight reference surface. Jurisdiction-specific legal definitions are added only after their underlying source records are published.</p><dl>{TERMS.map(([term, definition]) => <div key={term}><dt><b>{term}</b></dt><dd>{definition}</dd></div>)}</dl></>; }
