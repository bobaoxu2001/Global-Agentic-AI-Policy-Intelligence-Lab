import { SourceTierBadge } from '@/components/semantic';
import { PORTFOLIO_SOURCES } from '@/lib/portfolio/policySignals';
import { getPageDataset } from '@/lib/validation/pageData';

export default function BibliographyPage() {
  const ds = getPageDataset();
  return <>
    <h1>Bibliography</h1>
    <p className="status-note">Structured corpus sources are auto-rendered from the active profile. The interview preview also lists the separately governed, current-monitoring sources used by its role-facing work samples.</p>
    <h2>Structured corpus sources</h2>
    {ds.sources.length === 0 ? <p>No sources are published in this profile.</p> : <ol>{ds.sources.map((s) => <li id={s.id} key={s.id}><SourceTierBadge tier={s.tier} /> {s.publisher} — <a href={s.url} target="_blank" rel="noopener noreferrer"><i>{s.title}</i></a>{s.stable_ref ? ` (${s.stable_ref})` : ''} · accessed {s.accessed_date}</li>)}</ol>}
    {ds.profile === 'preview' ? <section>
      <h2>Portfolio monitoring sources</h2>
      <p>These Tier 1 records support the dated executive scan; they are not production corpus publications.</p>
      <ol>{PORTFOLIO_SOURCES.map((source) => <li id={source.id} key={source.id}><SourceTierBadge tier={source.tier} /> {source.publisher} — <a href={source.url} target="_blank" rel="noopener noreferrer"><i>{source.title}</i></a> · published {source.publishedDate} · checked {source.lastVerified} · re-check by {source.nextReview} · <code>{source.id}</code></li>)}</ol>
    </section> : null}
  </>;
}
