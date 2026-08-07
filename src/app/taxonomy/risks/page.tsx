import { LocalizedText } from '@/components/LocalizedText';
import risks from '@/data/seeds/risks.json';

export default function RiskTaxonomyPage() { return <><h1><LocalizedText id="research.riskTaxonomy.title" fallback="Governance-Risk Taxonomy" /></h1><p className="status-note"><LocalizedText id="research.riskTaxonomy.note" fallback="Risks are a structured analytical taxonomy; scenario failure narratives remain hypothetical." /></p><table><thead><tr><th>ID</th><th><LocalizedText id="research.table.risk" fallback="Risk" /></th><th><LocalizedText id="research.table.definition" fallback="Definition" /></th></tr></thead><tbody>{risks.map((r) => <tr key={r.id}><td>{r.id}</td><td>{r.name}</td><td>{r.definition}</td></tr>)}</tbody></table></>; }
