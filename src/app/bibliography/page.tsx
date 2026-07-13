import { SourceTierBadge } from '@/components/semantic';
import { getPageDataset } from '@/lib/validation/pageData';

export default function BibliographyPage() {
  const ds = getPageDataset();
  return <><h1>Bibliography</h1><p className="status-note">Auto-rendered from the active profile&apos;s source records. Tier 1 sources require an archive URL or logged manual verification.</p>{ds.sources.length === 0 ? <p>No sources are published in this profile.</p> : <ol>{ds.sources.map((s) => <li key={s.id}><SourceTierBadge tier={s.tier} /> {s.publisher} — <a href={s.url} target="_blank" rel="noopener noreferrer"><i>{s.title}</i></a>{s.stable_ref ? ` (${s.stable_ref})` : ''} · accessed {s.accessed_date}</li>)}</ol>}</>;
}
