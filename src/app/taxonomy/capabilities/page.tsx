import { LocalizedText } from '@/components/LocalizedText';
import capabilities from '@/data/seeds/capabilities.json';

export default function CapabilityTaxonomyPage() { return <><h1><LocalizedText id="research.capabilityTaxonomy.title" fallback="Agentic Capability Taxonomy" /></h1><p className="status-note"><LocalizedText id="research.capabilityTaxonomy.note" fallback="Capabilities describe what an agent can do, not whether a specific law applies." /></p><table><thead><tr><th>ID</th><th><LocalizedText id="research.table.capability" fallback="Capability" /></th><th><LocalizedText id="research.table.definition" fallback="Definition" /></th></tr></thead><tbody>{capabilities.map((c) => <tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.definition}</td></tr>)}</tbody></table></>; }
