const FILES = [
  ['Methodology note', '/downloads/methodology.md'],
  ['Executive brief status note', '/downloads/executive-brief.md'],
  ['Control mapping CSV', '/downloads/control-mapping.csv'],
  ['Dataset status JSON', '/downloads/atlas-dataset.json'],
];
export default function DownloadsPage() { return <><h1>Downloads</h1><p className="status-note">Downloadable artifacts state their research status plainly. No file represents legal advice or a completed publication corpus.</p><ul>{FILES.map(([name, href]) => <li key={href}><a href={href}>{name}</a></li>)}</ul></>; }
