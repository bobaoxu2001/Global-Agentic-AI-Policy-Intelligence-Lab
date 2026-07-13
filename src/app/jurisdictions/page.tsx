import Link from 'next/link';
import { getPageDataset } from '@/lib/validation/pageData';

const JURISDICTIONS = [
  ['us', 'United States'], ['eu', 'European Union'], ['sg', 'Singapore'], ['cn', 'China'],
] as const;

export default function JurisdictionsPage() {
  const ds = getPageDataset();
  return <><h1>Jurisdictions</h1><p className="status-note">Jurisdiction summaries surface only published records in production.</p><ul>{JURISDICTIONS.map(([id, name]) => <li key={id}><Link href={`/jurisdictions/${id}`}>{name}</Link> — {ds.instruments.filter((i) => i.jurisdiction_id === id).length} published instruments</li>)}</ul></>;
}
