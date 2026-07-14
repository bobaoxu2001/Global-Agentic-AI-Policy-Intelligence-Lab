import type { Metadata } from 'next';
import { getPageDataset } from '@/lib/validation/pageData';

export const metadata: Metadata = {
  title: 'Evidence Downloads',
  description: 'Status-labeled policy briefs, data exports, methods, and portfolio work samples.',
};

const PREVIEW_FILES = [
  ['Global AI policy portfolio pack', '/downloads/global-ai-policy-portfolio-pack.md', 'Current monitoring, business implications, policy position, engagement, and limits'],
  ['Executive decision brief', '/downloads/executive-brief.md', 'Control investment now; market launch only after qualified review'],
  ['Policy memo', '/downloads/policy-memo-human-oversight-and-disclosure.md', 'Human oversight and disclosure architecture across a bounded four-market scan'],
  ['Executive briefing deck', '/downloads/Global_AI_Policy_Executive_Briefing.pptx', 'Editable six-slide policy briefing for leadership discussion'],
  ['Global AI policy intelligence brief', '/downloads/global-ai-policy-intelligence-brief.md', 'Seven dated international signals with owners and triggers'],
  ['Emerging-technology policy radar', '/downloads/emerging-tech-policy-radar.md', 'Agentic AI, semiconductors, compute, cloud, data centers, and standards'],
  ['Business implications matrix', '/downloads/business-implications-matrix.md', 'Six product surfaces mapped to risks, opportunities, actions, and evidence'],
  ['Tencent public-information implications brief', '/downloads/tencent-public-information-implications-brief.md', 'Publicly described business surfaces mapped to questions and evidence gates'],
  ['Tencent role-alignment map', '/downloads/tencent-role-alignment.md', 'Role requirements mapped to observable portfolio evidence and honest limits'],
  ['Policy position note', '/downloads/policy-position-note-sample.md', 'Secure and interoperable agents: asks, trade-offs, and red lines'],
  ['Consultation response sample', '/downloads/consultation-response-sample.md', 'Regulator-facing position, safeguards, implementation evidence, and policy requests'],
  ['Speaking brief sample', '/downloads/speaking-brief-sample.md', 'Opening, message house, anticipated questions, bridges, and red lines'],
  ['Industry initiatives tracker', '/downloads/industry-initiatives-tracker.md', 'Standards and assurance initiatives with participation options and review triggers'],
  ['Meeting brief sample', '/downloads/meeting-brief-sample.md', 'Fictional stakeholder-preparation artifact with explicit boundaries'],
  ['Stakeholder landscape', '/downloads/stakeholder-landscape.json', 'Public-source stakeholder tracker; every relationship marked not contacted'],
  ['ADRS sensitivity note', '/downloads/adrs-sensitivity-note.md', 'Decision use, sensitivity, evidence requirements, and calibration limits'],
  ['Structured corpus analysis', '/downloads/policy-corpus-descriptive-analysis.md', 'Generated counts, coverage ratios, denominators, and publication limits'],
  ['Golden 8 source register', '/downloads/golden-8-source-register.md', 'Primary-source and review provenance'],
  ['Golden 8 preview JSON', '/downloads/golden-8-preview.json', 'Machine-readable scoped preview'],
  ['Golden 8 preview CSV', '/downloads/golden-8-preview.csv', 'Tabular scoped preview'],
  ['Golden 8 publication manifest', '/downloads/golden-8-manifest.json', 'Deterministic inclusion boundary'],
] as const;

const PROFILE_FILES = [
  ['Methodology note', '/downloads/methodology.md', 'Research and scoring rules'],
  ['Control mapping CSV', '/downloads/control-mapping.csv', 'Provision-to-control relationships'],
  ['Dataset status JSON', '/downloads/atlas-dataset.json', 'Production publication status'],
] as const;

export default function DownloadsPage() {
  const ds = getPageDataset();
  const files = ds.profile === 'preview' ? [...PREVIEW_FILES, ...PROFILE_FILES] : PROFILE_FILES;
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow">Evidence library</p>
        <h1>Downloads</h1>
        <p>Every artifact carries its own research status. Preview work samples are linked here only in the interview profile; their static files remain deliberately public, status-labeled portfolio artifacts rather than production policy records. None represents legal advice, a completed publication corpus, or a company position.</p>
      </section>
      <div className="download-list">
        {files.map(([name, href, description]) => (
          <a key={href} href={href} className="download-row">
            <div><b>{name}</b><span>{description}</span></div><span aria-hidden="true">Open ↗</span>
          </a>
        ))}
      </div>
    </>
  );
}
