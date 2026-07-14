import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const exports = new Map([
  ['docs/deliverables/GLOBAL_AI_POLICY_PORTFOLIO_PACK.md', 'public/downloads/global-ai-policy-portfolio-pack.md'],
  ['docs/deliverables/EXECUTIVE_DECISION_BRIEF.md', 'public/downloads/executive-brief.md'],
  ['docs/deliverables/POLICY_MEMO_HUMAN_OVERSIGHT_AND_DISCLOSURE.md', 'public/downloads/policy-memo-human-oversight-and-disclosure.md'],
  ['docs/deliverables/GLOBAL_AI_POLICY_INTELLIGENCE_BRIEF_2026-07-14.md', 'public/downloads/global-ai-policy-intelligence-brief.md'],
  ['docs/deliverables/EMERGING_TECH_POLICY_RADAR.md', 'public/downloads/emerging-tech-policy-radar.md'],
  ['docs/deliverables/BUSINESS_IMPLICATIONS_MATRIX.md', 'public/downloads/business-implications-matrix.md'],
  ['docs/deliverables/POLICY_POSITION_NOTE_SAMPLE.md', 'public/downloads/policy-position-note-sample.md'],
  ['docs/deliverables/MEETING_BRIEF_SAMPLE.md', 'public/downloads/meeting-brief-sample.md'],
  ['docs/deliverables/ADRS_SENSITIVITY_NOTE.md', 'public/downloads/adrs-sensitivity-note.md'],
  ['docs/deliverables/STAKEHOLDER_LANDSCAPE.json', 'public/downloads/stakeholder-landscape.json'],
  ['docs/deliverables/CONSULTATION_RESPONSE_SAMPLE.md', 'public/downloads/consultation-response-sample.md'],
  ['docs/deliverables/SPEAKING_BRIEF_SAMPLE.md', 'public/downloads/speaking-brief-sample.md'],
  ['docs/deliverables/INDUSTRY_INITIATIVES_TRACKER.md', 'public/downloads/industry-initiatives-tracker.md'],
  ['docs/deliverables/POLICY_CORPUS_DESCRIPTIVE_ANALYSIS.md', 'public/downloads/policy-corpus-descriptive-analysis.md'],
  ['docs/deliverables/TENCENT_PUBLIC_INFORMATION_IMPLICATIONS_BRIEF.md', 'public/downloads/tencent-public-information-implications-brief.md'],
  ['docs/deliverables/TENCENT_ROLE_ALIGNMENT.md', 'public/downloads/tencent-role-alignment.md'],
  ['docs/deliverables/Global_AI_Policy_Executive_Briefing.pptx', 'public/downloads/Global_AI_Policy_Executive_Briefing.pptx'],
]);

const checkOnly = process.argv.includes('--check');
let stale = false;

const publicNameByCanonicalName = new Map(
  [...exports.entries()].map(([sourcePath, outputPath]) => [path.basename(sourcePath), path.basename(outputPath)]),
);

function publicArtifact(sourcePath: string, source: Buffer) {
  if (path.extname(sourcePath).toLowerCase() !== '.md') return source;
  let markdown = source.toString('utf8');
  for (const [canonicalName, publicName] of publicNameByCanonicalName) {
    markdown = markdown.replaceAll(`](${canonicalName}`, `](${publicName}`);
  }
  return Buffer.from(markdown);
}

for (const [sourcePath, outputPath] of exports) {
  const source = path.join(root, sourcePath);
  const output = path.join(root, outputPath);
  const expected = publicArtifact(sourcePath, fs.readFileSync(source));

  if (checkOnly) {
    if (!fs.existsSync(output) || !fs.readFileSync(output).equals(expected)) {
      console.error(`[portfolio-exports] stale: ${outputPath}`);
      stale = true;
    }
    continue;
  }

  fs.mkdirSync(path.dirname(output), { recursive: true });
  fs.writeFileSync(output, expected);
  console.log(`[portfolio-exports] wrote ${outputPath}`);
}

if (stale) process.exit(1);
if (checkOnly) console.log('[portfolio-exports] OK — generated artifacts are current');
