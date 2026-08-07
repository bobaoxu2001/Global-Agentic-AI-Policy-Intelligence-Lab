import { SourceTierBadge } from '@/components/semantic';
import { LocalizedText } from '@/components/LocalizedText';
import { PORTFOLIO_SOURCES } from '@/lib/portfolio/policySignals';
import { getPageDataset } from '@/lib/validation/pageData';

export default function BibliographyPage() {
  const ds = getPageDataset();
  return <>
    <h1><LocalizedText id="support.bibliography.title" fallback="Bibliography" /></h1>
    <p className="status-note"><LocalizedText id="support.bibliography.note" fallback="Structured corpus sources are auto-rendered from the active profile. The research preview also lists the separately governed, current-monitoring sources used by its applied work samples." /></p>
    <h2><LocalizedText id="support.bibliography.structured.title" fallback="Structured corpus sources" /></h2>
    {ds.sources.length === 0 ? <p><LocalizedText id="support.bibliography.empty" fallback="No sources are published in this profile." /></p> : <ol>{ds.sources.map((s) => <li id={s.id} key={s.id}><SourceTierBadge tier={s.tier} /> {s.publisher} — <a href={s.url} target="_blank" rel="noopener noreferrer"><i>{s.title}</i></a>{s.stable_ref ? ` (${s.stable_ref})` : ''} · <LocalizedText id="support.bibliography.accessed" fallback="accessed" /> {s.accessed_date}</li>)}</ol>}
    {ds.profile === 'preview' ? <section>
      <h2><LocalizedText id="support.bibliography.portfolio.title" fallback="Portfolio monitoring sources" /></h2>
      <p><LocalizedText id="support.bibliography.portfolio.note" fallback="These Tier 1 records support the dated executive scan; they are not production corpus publications." /></p>
      <ol>{PORTFOLIO_SOURCES.map((source) => <li id={source.id} key={source.id}><SourceTierBadge tier={source.tier} /> {source.publisher} — <a href={source.url} target="_blank" rel="noopener noreferrer"><i>{source.title}</i></a> · <LocalizedText id="support.bibliography.published" fallback="published" /> {source.publishedDate} · <LocalizedText id="support.bibliography.checked" fallback="checked" /> {source.lastVerified} · <LocalizedText id="support.bibliography.recheck" fallback="re-check by" /> {source.nextReview} · <code>{source.id}</code></li>)}</ol>
    </section> : null}
  </>;
}
