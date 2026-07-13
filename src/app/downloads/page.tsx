const FILES = [
  ['Methodology note', '/downloads/methodology.md'],
  ['Executive brief status note', '/downloads/executive-brief.md'],
  ['Control mapping CSV', '/downloads/control-mapping.csv'],
  ['Dataset status JSON', '/downloads/atlas-dataset.json'],
  ['Golden 8 preview JSON', '/downloads/golden-8-preview.json'],
  ['Golden 8 preview CSV', '/downloads/golden-8-preview.csv'],
  ['Golden 8 publication manifest', '/downloads/golden-8-manifest.json'],
  ['Golden 8 source register', '/downloads/golden-8-source-register.md'],
];
export default function DownloadsPage() { return <><h1>Downloads</h1><p className="status-note">Downloadable artifacts state their research status plainly. No file represents legal advice or a completed publication corpus.</p><ul>{FILES.map(([name, href]) => <li key={href}><a href={href}>{name}</a></li>)}</ul></>; }
