import type { Metadata } from 'next';
import { LocalizedText } from '@/components/LocalizedText';
import { getPageDataset } from '@/lib/validation/pageData';

export const metadata: Metadata = {
  title: 'Evidence Downloads',
  description: 'Status-labeled policy briefs, data exports, methods, and portfolio work samples.',
};

const PREVIEW_FILES = [
  ['policy-refresh', 'July-August policy refresh', '/downloads/policy-refresh-2026-08-06.md', 'EU lifecycle, EU/California transparency, and China anthropomorphic/agentic policy'],
  ['portfolio-pack', 'Global AI policy portfolio pack', '/downloads/global-ai-policy-portfolio-pack.md', 'Current monitoring, business implications, policy position, engagement, and limits'],
  ['executive-brief', 'Executive decision brief', '/downloads/executive-brief.md', 'Control investment now; market launch only after qualified review'],
  ['policy-memo', 'Policy memo', '/downloads/policy-memo-human-oversight-and-disclosure.md', 'Human oversight and disclosure architecture across a bounded four-market scan'],
  ['executive-deck', 'Executive briefing deck', '/downloads/Global_AI_Policy_Executive_Briefing.pptx', 'Editable six-slide policy briefing for leadership discussion'],
  ['intelligence-brief', 'Global AI policy intelligence brief', '/downloads/global-ai-policy-intelligence-brief.md', 'Updated international signals with owners and triggers'],
  ['technology-radar', 'Emerging-technology policy radar', '/downloads/emerging-tech-policy-radar.md', 'Agentic AI, semiconductors, compute, cloud, data centers, and standards'],
  ['business-matrix', 'Business implications matrix', '/downloads/business-implications-matrix.md', 'Six product surfaces mapped to risks, opportunities, actions, and evidence'],
  ['tencent-brief', 'Tencent public-information implications brief', '/downloads/tencent-public-information-implications-brief.md', 'Publicly described business surfaces mapped to questions and evidence gates'],
  ['position-note', 'Policy position note', '/downloads/policy-position-note-sample.md', 'Secure and interoperable agents: asks, trade-offs, and red lines'],
  ['consultation-response', 'Consultation response sample', '/downloads/consultation-response-sample.md', 'Regulator-facing position, safeguards, implementation evidence, and policy requests'],
  ['speaking-brief', 'Speaking brief sample', '/downloads/speaking-brief-sample.md', 'Opening, message house, anticipated questions, bridges, and red lines'],
  ['industry-tracker', 'Industry initiatives tracker', '/downloads/industry-initiatives-tracker.md', 'Standards and assurance initiatives with participation options and review triggers'],
  ['meeting-brief', 'Meeting brief sample', '/downloads/meeting-brief-sample.md', 'Fictional stakeholder-preparation artifact with explicit boundaries'],
  ['stakeholder-landscape', 'Stakeholder landscape', '/downloads/stakeholder-landscape.json', 'Public-source stakeholder tracker; every relationship marked not contacted'],
  ['adrs-note', 'ADRS sensitivity note', '/downloads/adrs-sensitivity-note.md', 'Decision use, sensitivity, evidence requirements, and calibration limits'],
  ['corpus-analysis', 'Structured corpus analysis', '/downloads/policy-corpus-descriptive-analysis.md', 'Generated counts, coverage ratios, denominators, and publication limits'],
  ['source-register', 'Curated research snapshot — source register', '/downloads/golden-8-source-register.md', 'Primary-source and review provenance'],
  ['preview-json', 'Curated research snapshot — JSON', '/downloads/golden-8-preview.json', 'Machine-readable scoped preview'],
  ['preview-csv', 'Curated research snapshot — CSV', '/downloads/golden-8-preview.csv', 'Tabular scoped preview'],
  ['publication-manifest', 'Curated research snapshot — publication manifest', '/downloads/golden-8-manifest.json', 'Deterministic inclusion boundary'],
] as const;

const PROFILE_FILES = [
  ['methodology', 'Methodology note', '/downloads/methodology.md', 'Research and scoring rules'],
  ['control-mapping', 'Control mapping CSV', '/downloads/control-mapping.csv', 'Provision-to-control relationships'],
  ['dataset-status', 'Dataset status JSON', '/downloads/atlas-dataset.json', 'Production publication status'],
] as const;

export default function DownloadsPage() {
  const ds = getPageDataset();
  const files = ds.profile === 'preview' ? [...PREVIEW_FILES, ...PROFILE_FILES] : PROFILE_FILES;
  return (
    <>
      <section className="page-intro">
        <p className="eyebrow"><LocalizedText id="support.downloads.eyebrow" fallback="Evidence library" /></p>
        <h1><LocalizedText id="support.downloads.title" fallback="Downloads" /></h1>
        <p><LocalizedText id="support.downloads.note" fallback="Every artifact carries its own research status. Preview work samples are linked here only in the research preview profile; their static files remain deliberately public, status-labeled portfolio artifacts rather than production policy records. None represents legal advice, a completed publication corpus, or a company position." /></p>
      </section>
      <div className="download-list">
        {files.map(([id, name, href, description]) => (
          <a key={href} href={href} className="download-row">
            <div><b><LocalizedText id={`support.downloads.file.${id}.name`} fallback={name} /></b><span><LocalizedText id={`support.downloads.file.${id}.description`} fallback={description} /></span></div><span><LocalizedText id="support.downloads.openEnglish" fallback="Open (English)" /> <span aria-hidden="true">↗</span></span>
          </a>
        ))}
      </div>
    </>
  );
}
