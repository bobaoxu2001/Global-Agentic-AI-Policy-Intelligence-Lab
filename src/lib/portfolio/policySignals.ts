export const PORTFOLIO_SIGNAL_AS_OF = '2026-07-14' as const;

export type PortfolioSource = {
  id: string;
  publisher: string;
  title: string;
  url: string;
  publishedDate: string;
  lastVerified: string;
  nextReview: string;
  tier: 1;
};

export const PORTFOLIO_SOURCES = [
  { id: 'PS-EU-OMNIBUS-2026', publisher: 'Council of the European Union', title: 'AI: final green light to simplify and streamline rules', url: 'https://www.consilium.europa.eu/en/press/press-releases/2026/06/29/artificial-intelligence-council-gives-final-green-light-to-simplify-and-streamline-rules/', publishedDate: '2026-06-29', lastVerified: '2026-07-14', nextReview: '2026-08-03', tier: 1 },
  { id: 'PS-EU-ART50-CODE-2026', publisher: 'European Commission', title: 'Code of Practice on Transparency of AI-Generated Content', url: 'https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content', publishedDate: '2026-06-10', lastVerified: '2026-07-14', nextReview: '2026-08-03', tier: 1 },
  { id: 'PS-EU-CADA-2026', publisher: 'European Commission', title: 'Proposal for the Cloud and AI Development Act', url: 'https://digital-strategy.ec.europa.eu/en/library/proposal-cloud-and-ai-development-act-cada', publishedDate: '2026-06-03', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-US-BIS-GUIDANCE-2026-05', publisher: 'U.S. Bureau of Industry and Security', title: 'Guidance Regarding Enforcement of License Requirements for Advanced Computing Items', url: 'https://media.bis.gov/media/documents/bis-guidance-may-31-2026.pdf', publishedDate: '2026-05-31', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-US-BIS-FAQ-2026-06', publisher: 'U.S. Bureau of Industry and Security', title: 'Frequently Asked Questions on the May 2026 Advanced Computing Guidance', url: 'https://www.bis.gov/media/documents/May-31-FAQ.pdf', publishedDate: '2026-06-17', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-US-BIS-REVIEW-2026-01', publisher: 'U.S. Bureau of Industry and Security', title: 'Commerce Revises License Review Policy for Semiconductor Exports', url: 'https://www.bis.gov/sites/default/files/documents/DoC%20Revises%20License%20Review%20Policy%20for%20Semiconductors%20Exports.pdf', publishedDate: '2026-01-13', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-US-NIST-AGENTS-2026', publisher: 'National Institute of Standards and Technology', title: 'AI Agent Standards Initiative', url: 'https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative', publishedDate: '2026-02-17', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-US-DATACENTER-EO-14318', publisher: 'The White House', title: 'Executive Order 14318: Accelerating Federal Permitting of Data Center Infrastructure', url: 'https://www.whitehouse.gov/presidential-actions/2025/07/accelerating-federal-permitting-of-data-center-infrastructure/', publishedDate: '2025-07-23', lastVerified: '2026-07-14', nextReview: '2026-10-14', tier: 1 },
  { id: 'PS-SG-IMDA-AGENTS-2026', publisher: 'Infocomm Media Development Authority', title: 'Model AI Governance Framework for Agentic AI', url: 'https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai', publishedDate: '2026-01-22', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-SG-IMDA-SANDBOX-2026', publisher: 'Infocomm Media Development Authority', title: 'AI Agents: Insights from the Singapore Government and Google Sandbox', url: 'https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2026/ai-agents-insights-from-the-singapore-government-and-google-sandbox', publishedDate: '2026-05-20', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-KR-MSIT-AI-ACT-2026', publisher: 'Republic of Korea Ministry of Science and ICT', title: 'AI Basic Act and Enforcement Decree come into force', url: 'https://www.msit.go.kr/eng/bbs/view.do%3Bjsessionid%3DR15sRn4EJvYb4ya9k4Roiy9k6Ci-tgMefxkNeVIs.AP_msit_1?bbsSeqNo=42&mId=4&mPid=2&nttSeqNo=1214&sCode=eng', publishedDate: '2026-01-22', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-UK-CMA-AGENTS-2026', publisher: 'UK Competition and Markets Authority', title: 'Agentic AI and consumers', url: 'https://www.gov.uk/government/publications/agentic-ai-and-consumers', publishedDate: '2026-03-09', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-CN-CAC-GENAI-2023', publisher: 'Cyberspace Administration of China', title: 'Interim Measures for the Management of Generative AI Services', url: 'https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm', publishedDate: '2023-07-13', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-CN-CAC-LABELING-2025', publisher: 'Cyberspace Administration of China', title: 'Measures for Labeling AI-Generated Synthetic Content', url: 'https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm', publishedDate: '2025-03-14', lastVerified: '2026-07-14', nextReview: '2026-08-14', tier: 1 },
] as const satisfies readonly PortfolioSource[];

export type PortfolioSignal = {
  id: string;
  market: string;
  title: string;
  fact: string;
  implication: string;
  sourceIds: readonly string[];
  lastVerified: string;
  nextReview: string;
  href: string;
};

export const PORTFOLIO_SIGNALS = [
  {
    id: 'SIG-EU-TRANSPARENCY', market: 'EU · Product', title: 'Transparency now precedes the heavier high-risk workstream',
    fact: 'Article 50 transparency obligations apply from 2 August 2026; the Council-approved omnibus moves specified high-risk timelines later.',
    implication: 'Finish interaction-disclosure and output-provenance decisions without treating the high-risk delay as a general delay.',
    sourceIds: ['PS-EU-OMNIBUS-2026', 'PS-EU-ART50-CODE-2026'], lastVerified: '2026-07-14', nextReview: '2026-08-03', href: '/executive-brief',
  },
  {
    id: 'SIG-COMPUTE-INFRA', market: 'US / EU · Infrastructure', title: 'Compute policy is becoming product strategy',
    fact: 'BIS ownership-linked licensing guidance, U.S. data-center permitting policy, and the EU CADA proposal move alongside model policy.',
    implication: 'Screen ownership and end use early; keep region and procurement architecture reversible.',
    sourceIds: ['PS-US-BIS-GUIDANCE-2026-05', 'PS-US-BIS-FAQ-2026-06', 'PS-US-DATACENTER-EO-14318', 'PS-EU-CADA-2026'], lastVerified: '2026-07-14', nextReview: '2026-08-14', href: '/downloads/emerging-tech-policy-radar.md',
  },
  {
    id: 'SIG-AGENT-STANDARDS', market: 'US / SG · Standards', title: 'Agent identity and authorization are policy issues',
    fact: 'NIST and IMDA are focusing on bounded authority, identity, authorization, lifecycle controls, and accountability.',
    implication: 'Turn least privilege, approval boundaries, and audit records into reusable product evidence.',
    sourceIds: ['PS-US-NIST-AGENTS-2026', 'PS-SG-IMDA-AGENTS-2026', 'PS-SG-IMDA-SANDBOX-2026'], lastVerified: '2026-07-14', nextReview: '2026-08-14', href: '/downloads/policy-position-note-sample.md',
  },
  {
    id: 'SIG-APAC-IMPLEMENTATION', market: 'APAC · Implementation', title: 'Asia cannot be treated as one governance market',
    fact: 'The scoped corpus includes binding Chinese content-governance rules, Singapore assurance guidance, and Korea’s operational AI Basic Act.',
    implication: 'Assign local-language source owners and separate market classification before launch planning.',
    sourceIds: ['PS-CN-CAC-GENAI-2023', 'PS-CN-CAC-LABELING-2025', 'PS-SG-IMDA-AGENTS-2026', 'PS-KR-MSIT-AI-ACT-2026'], lastVerified: '2026-07-14', nextReview: '2026-08-14', href: '/downloads/global-ai-policy-intelligence-brief.md',
  },
  {
    id: 'SIG-UK-CONSUMER-AGENTS', market: 'UK · Consumer', title: 'Existing consumer law is already an agentic-AI policy channel',
    fact: 'The CMA published Agentic AI and consumers on 9 March 2026, covering opportunities, risks, applicable law, and business actions.',
    implication: 'Test disclosure, confirmation, cancellation, redress, and commercial influence across the whole agent journey.',
    sourceIds: ['PS-UK-CMA-AGENTS-2026'], lastVerified: '2026-07-14', nextReview: '2026-08-14', href: '/downloads/global-ai-policy-intelligence-brief.md',
  },
] as const satisfies readonly PortfolioSignal[];

export const PORTFOLIO_MONITORING_LOG = [
  { date: '2026-07-14', action: 'verified', signalIds: PORTFOLIO_SIGNALS.map((signal) => signal.id), note: 'Initial role-facing monitoring snapshot checked against the listed official sources; no historical cadence is claimed.' },
] as const;

export const EXECUTIVE_MARKETS = [
  {
    market: 'European Union',
    signal: 'Article 50 transparency applies from 2 August 2026; specified high-risk dates moved later.',
    implication: 'Disclosure and output provenance are an earlier workstream than the deferred high-risk dates.',
    action: 'Complete the Article 50 product inventory and gap test.',
    sourceIds: ['PS-EU-OMNIBUS-2026', 'PS-EU-ART50-CODE-2026'],
  },
  {
    market: 'China',
    signal: 'The scoped Atlas preview includes binding generative-AI service and synthetic-content-labeling rules.',
    implication: 'Labels and metadata belong inside the generation and distribution pipeline.',
    action: 'Validate UI and file-layer labels against authoritative Chinese text.',
    sourceIds: ['PS-CN-CAC-GENAI-2023', 'PS-CN-CAC-LABELING-2025'],
  },
  {
    market: 'United States',
    signal: 'Federal posture, state ADMT rules, sectors, export controls, and generally applicable law form a fragmented screen.',
    implication: 'No comprehensive federal AI statute does not mean no applicable law or policy exposure.',
    action: 'Run a product, state, sector, consumer, privacy, export, and civil-rights applicability review.',
    sourceIds: ['PS-US-BIS-GUIDANCE-2026-05', 'PS-US-BIS-REVIEW-2026-01'],
  },
  {
    market: 'Singapore',
    signal: 'The 2026 agentic-AI framework offers non-binding deployment guidance and testing direction.',
    implication: 'Assurance evidence can support responsible adoption without being treated as legal authorization.',
    action: 'Crosswalk controls to the IMDA framework and identify a sandbox-ready use case.',
    sourceIds: ['PS-SG-IMDA-AGENTS-2026', 'PS-SG-IMDA-SANDBOX-2026'],
  },
] as const;

export function portfolioSourceMap() {
  return new Map(PORTFOLIO_SOURCES.map((source) => [source.id, source]));
}
