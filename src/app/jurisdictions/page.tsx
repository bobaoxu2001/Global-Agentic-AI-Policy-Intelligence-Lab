import Link from 'next/link';
import { LocalizedText } from '@/components/LocalizedText';
import { getPageDataset } from '@/lib/validation/pageData';

const JURISDICTIONS = [
  ['us', 'United States'], ['eu', 'European Union'], ['sg', 'Singapore'], ['cn', 'China'],
] as const;

export default function JurisdictionsPage() {
  const ds = getPageDataset();
  return <><h1><LocalizedText id="research.jurisdictions.title" fallback="Jurisdictions" /></h1><p className="status-note"><LocalizedText id="research.jurisdictions.note" fallback="Jurisdiction summaries surface only published records in production." /></p><ul>{JURISDICTIONS.map(([id, name]) => {
    const count = ds.instruments.filter((i) => i.jurisdiction_id === id).length;
    return <li key={id}><Link href={`/jurisdictions/${id}`}><LocalizedText id={`research.jurisdiction.${id}.name`} fallback={name} /></Link> — <LocalizedText id="research.jurisdictions.count" fallback="{count} published instruments" values={{ count }} /></li>;
  })}</ul></>;
}
