export const PORTFOLIO_SIGNAL_AS_OF = '2026-08-13' as const;

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
  { id: 'PS-EU-OMNIBUS-2026', publisher: 'EUR-Lex', title: 'Regulation (EU) 2026/1744 amending the Artificial Intelligence Act', url: 'https://eur-lex.europa.eu/eli/reg/2026/1744/oj/eng', publishedDate: '2026-07-24', lastVerified: '2026-08-13', nextReview: '2026-11-13', tier: 1 },
  { id: 'PS-EU-ART50-CODE-2026', publisher: 'European Commission', title: 'Code of Practice on Transparency of AI-Generated Content', url: 'https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content', publishedDate: '2026-06-10', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-EU-ART50-CODE-ASSESSMENT-2026', publisher: 'European Commission', title: 'Commission and AI Board assessment of the Article 50 transparency code', url: 'https://digital-strategy.ec.europa.eu/en/library/commission-opinion-assessment-code-practice-transparency-ai-generated-content', publishedDate: '2026-07-09', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-EU-ART50-GUIDELINES-2026', publisher: 'European Commission', title: 'Guidelines on transparency obligations for providers and deployers of AI systems', url: 'https://digital-strategy.ec.europa.eu/en/policies/guidelines-ai-transparency-obligations', publishedDate: '2026-07-20', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-EU-AI-LITERACY-QA-2026', publisher: 'European Commission', title: 'AI Literacy — Questions & Answers (updated 27 July 2026)', url: 'https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers', publishedDate: '2026-07-27', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-EU-CADA-2026', publisher: 'European Commission', title: 'Proposal for the Cloud and AI Development Act', url: 'https://digital-strategy.ec.europa.eu/en/library/proposal-cloud-and-ai-development-act-cada', publishedDate: '2026-06-03', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-EU-CADA-PROCEDURE-2026', publisher: 'EUR-Lex', title: 'COM(2026) 502 — CADA proposal, procedure 2026/0138(COD)', url: 'https://eur-lex.europa.eu/procedure/EN/2026_138', publishedDate: '2026-06-03', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-US-BIS-GUIDANCE-2026-05', publisher: 'U.S. Bureau of Industry and Security', title: 'Guidance Regarding Enforcement of License Requirements for Advanced Computing Items', url: 'https://media.bis.gov/media/documents/bis-guidance-may-31-2026.pdf', publishedDate: '2026-05-31', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-US-BIS-FAQ-2026-06', publisher: 'U.S. Bureau of Industry and Security', title: 'Frequently Asked Questions on the May 2026 Advanced Computing Guidance', url: 'https://www.bis.gov/media/documents/May-31-FAQ.pdf', publishedDate: '2026-06-17', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-US-BIS-REVIEW-2026-01', publisher: 'U.S. Bureau of Industry and Security', title: 'Revision to License Review Policy for Advanced Computing Commodities', url: 'https://www.federalregister.gov/documents/2026/01/15/2026-00789/revision-to-license-review-policy-for-advanced-computing-commodities', publishedDate: '2026-01-15', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-US-BIS-UAE-2026-07', publisher: 'U.S. Bureau of Industry and Security', title: 'Enhanced Favorable Treatment for the United Arab Emirates Under the EAR', url: 'https://www.federalregister.gov/documents/2026/07/14/2026-14132/enhanced-favorable-treatment-for-the-united-arab-emirates-under-the-export-administration', publishedDate: '2026-07-14', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-US-NIST-AGENTS-2026', publisher: 'National Institute of Standards and Technology', title: 'AI Agent Standards Initiative', url: 'https://www.nist.gov/artificial-intelligence/ai-agent-standards-initiative', publishedDate: '2026-02-17', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-US-NIST-AGENT-RFI-800-5', publisher: 'National Institute of Standards and Technology', title: 'NIST AI 800-5 — RFI response analysis on AI agent security', url: 'https://www.nist.gov/publications/summary-analysis-responses-request-information-regarding-security-considerations-ai', publishedDate: '2026-05-18', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-US-DATACENTER-EO-14318', publisher: 'The White House', title: 'Executive Order 14318: Accelerating Federal Permitting of Data Center Infrastructure', url: 'https://www.whitehouse.gov/presidential-actions/2025/07/accelerating-federal-permitting-of-data-center-infrastructure/', publishedDate: '2025-07-23', lastVerified: '2026-08-13', nextReview: '2026-11-13', tier: 1 },
  { id: 'PS-US-EO-14409-AI-CYBER', publisher: 'The White House', title: 'Executive Order 14409 — Promoting Advanced Artificial Intelligence Innovation and Security', url: 'https://www.whitehouse.gov/presidential-actions/2026/06/promoting-advanced-artificial-intelligence-innovation-and-security/', publishedDate: '2026-06-02', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-US-GOLD-EAGLE-2026', publisher: 'The White House', title: 'Gold Eagle Initiative for Cybersecurity Vulnerability Coordination', url: 'https://www.whitehouse.gov/releases/2026/07/white-house-launches-gold-eagle-initiative-for-unprecedented-cybersecurity-vulnerability-coordination/', publishedDate: '2026-07-14', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-US-CA-AI-TRANSPARENCY-2026', publisher: 'California Legislative Information', title: 'California AI Transparency Act (codified Chapter 25; last amended by AB 853)', url: 'https://leginfo.legislature.ca.gov/faces/codes_displayText.xhtml?article=&chapter=25.&division=8.&lawCode=BPC&part=&title=', publishedDate: '2025-10-13', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-US-CA-SB1000-2026', publisher: 'California Legislative Information', title: 'SB 1000 — proposed amendments to the California AI Transparency Act', url: 'https://leginfo.legislature.ca.gov/faces/billStatusClient.xhtml?bill_id=202520260SB1000', publishedDate: '2026-06-09', lastVerified: '2026-08-13', nextReview: '2026-08-14', tier: 1 },
  { id: 'PS-SG-IMDA-AGENTS-2026', publisher: 'Infocomm Media Development Authority', title: 'Model AI Governance Framework for Agentic AI — launch edition', url: 'https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2026/new-model-ai-governance-framework-for-agentic-ai', publishedDate: '2026-01-22', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-SG-IMDA-AGENTS-V15-2026', publisher: 'Infocomm Media Development Authority', title: 'Updated Model AI Governance Framework for Agentic AI v1.5', url: 'https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2026/updated-model-ai-governance-framework-for-agentic-ai', publishedDate: '2026-05-20', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-SG-IMDA-SANDBOX-2026', publisher: 'Infocomm Media Development Authority', title: 'AI Agents: Insights from the Singapore Government and Google Sandbox', url: 'https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/factsheets/2026/ai-agents-insights-from-the-singapore-government-and-google-sandbox', publishedDate: '2026-05-20', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-KR-MSIT-AI-ACT-2026', publisher: 'Republic of Korea Ministry of Science and ICT', title: 'AI Basic Act and Enforcement Decree come into force', url: 'https://www.msit.go.kr/eng/bbs/view.do%3Bjsessionid%3DR15sRn4EJvYb4ya9k4Roiy9k6Ci-tgMefxkNeVIs.AP_msit_1?bbsSeqNo=42&mId=4&mPid=2&nttSeqNo=1214&sCode=eng', publishedDate: '2026-01-22', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-KR-AI-ACT-AMENDED-2026', publisher: 'Republic of Korea National Law Information Center', title: 'Amended AI Basic Act — Act No. 21311', url: 'https://www.law.go.kr/lsInfoP.do?chrClsCd=010102&lsiSeq=282791&viewCls=lsRvsDocInfoR', publishedDate: '2026-01-20', lastVerified: '2026-08-13', nextReview: '2026-11-13', tier: 1 },
  { id: 'PS-KR-AI-DECREE-AMENDED-2026', publisher: 'Republic of Korea National Law Information Center', title: 'Amended AI Basic Act Enforcement Decree — Presidential Decree No. 36506', url: 'https://www.law.go.kr/lsStmdInfoP.do?ancYnChk=0&lsiSeq=282879', publishedDate: '2026-07-20', lastVerified: '2026-08-13', nextReview: '2026-11-13', tier: 1 },
  { id: 'PS-UK-CMA-AGENTS-2026', publisher: 'UK Competition and Markets Authority', title: 'Agentic AI and consumers', url: 'https://www.gov.uk/government/publications/agentic-ai-and-consumers', publishedDate: '2026-03-09', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-UK-CMA-AGENT-GUIDANCE-2026', publisher: 'UK Competition and Markets Authority', title: 'Using AI agents: complying with consumer law', url: 'https://www.gov.uk/government/publications/complying-with-consumer-law-when-using-ai-agents', publishedDate: '2026-03-09', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-CN-CAC-GENAI-2023', publisher: 'Cyberspace Administration of China', title: 'Interim Measures for the Management of Generative AI Services', url: 'https://www.cac.gov.cn/2023-07/13/c_1690898327029107.htm', publishedDate: '2023-07-13', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-CN-CAC-LABELING-2025', publisher: 'Cyberspace Administration of China', title: 'Measures for Labeling AI-Generated Synthetic Content', url: 'https://www.cac.gov.cn/2025-03/14/c_1743654684782215.htm', publishedDate: '2025-03-14', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-CN-ANTHROPOMORPHIC-2026', publisher: 'Cyberspace Administration of China and four other authorities', title: 'Interim Measures for the Management of Anthropomorphic AI Interaction Services', url: 'https://www.cac.gov.cn/2026-04/10/c_1777558395078289.htm', publishedDate: '2026-04-10', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-CN-AGENTIC-OPINION-2026', publisher: 'Cyberspace Administration of China, NDRC, and MIIT', title: 'Implementation Opinion on the Standardized Application and Innovative Development of AI Agents', url: 'https://www.cac.gov.cn/2026-05/08/c_1779979789523320.htm', publishedDate: '2026-05-08', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
  { id: 'PS-CN-AGENT-INTEROP-2026', publisher: 'Cyberspace Administration of China', title: 'Global Cooperation Initiative on Mutual Trust, Connectivity, and Interoperability of AI Agents', url: 'https://www.cac.gov.cn/2026-07/17/c_1786032877362241.htm', publishedDate: '2026-07-17', lastVerified: '2026-08-13', nextReview: '2026-09-13', tier: 1 },
] as const satisfies readonly PortfolioSource[];

export type PortfolioSignal = {
  id: string;
  market: string;
  title: string;
  fact: string;
  implication: string;
  action: string;
  owner: string;
  evidenceGate: string;
  sourceIds: readonly string[];
  lastVerified: string;
  nextReview: string;
  href: string;
};

export const PORTFOLIO_SIGNALS = [
  {
    id: 'SIG-EU-CA-TRANSPARENCY', market: 'EU / California · Product', title: 'Transparency is now an operating requirement, not a countdown',
    fact: 'Regulation (EU) 2026/1744 is now in force; EU Article 50 duties and California\'s core covered-provider AI Transparency Act provisions became operative on 2 August 2026, while later California platform and hosting duties begin in 2027.',
    implication: 'Move from deadline preparation to product inventory, disclosure, provenance, and detection evidence—without assuming identical scope merely because the dates align.',
    action: 'Classify the product surface and entity role, then map the applicable paragraph or provision to a tested control.',
    owner: 'EU policy + US state policy + product counsel + product / engineering',
    evidenceGate: 'Escalate when a potentially in-scope surface lacks a recorded scope decision, control owner, or operating evidence.',
    sourceIds: ['PS-EU-OMNIBUS-2026', 'PS-EU-ART50-GUIDELINES-2026', 'PS-EU-ART50-CODE-2026', 'PS-EU-ART50-CODE-ASSESSMENT-2026', 'PS-US-CA-AI-TRANSPARENCY-2026'], lastVerified: '2026-08-13', nextReview: '2026-09-13', href: '/policy-refresh',
  },
  {
    id: 'SIG-CA-SB1000-PENDING', market: 'California · Pending legislation', title: 'California transparency scope could expand immediately if SB 1000 passes',
    fact: 'As of 13 August 2026, SB 1000 remains a pending urgency bill on the Assembly third-reading file. Its current text would remove the one-million-user threshold and revise disclosure-verification, latent-disclosure, privacy, and licensee controls. It is not current law.',
    implication: 'Keep applying codified Chapter 25 as written while maintaining a separate scenario for a materially broader covered-provider scope.',
    action: 'Track the floor vote, enrollment, and Governor action; rerun scope and control mapping immediately if the bill is chaptered.',
    owner: 'US state policy + product counsel + provenance engineering',
    evidenceGate: 'Do not replace the current-law threshold or duties with SB 1000 language unless official chaptering evidence shows enactment.',
    sourceIds: ['PS-US-CA-SB1000-2026'], lastVerified: '2026-08-13', nextReview: '2026-08-14', href: '/policy-refresh#california-transparency',
  },
  {
    id: 'SIG-COMPUTE-INFRA', market: 'US / EU · Infrastructure', title: 'Compute policy is becoming product strategy',
    fact: 'BIS ownership-linked guidance remains current, while a July final rule creates narrow approved-entity pathways for specified UAE transactions. The EU CADA remains an unadopted proposal in an ongoing legislative procedure.',
    implication: 'Destination alone is insufficient: ultimate parent, consignee and end user, chip class, end use, and approved-entity status can change the licensing route.',
    action: 'Screen ownership, end use, chip class, destination, consignee, end users, and approved-entity status before architecture or supply commitments.',
    owner: 'Export compliance + cloud strategy + procurement + product',
    evidenceGate: 'Escalate when customer ownership, end use, chip class, supply route, or region changes.',
    sourceIds: ['PS-US-BIS-GUIDANCE-2026-05', 'PS-US-BIS-FAQ-2026-06', 'PS-US-BIS-REVIEW-2026-01', 'PS-US-BIS-UAE-2026-07', 'PS-US-DATACENTER-EO-14318', 'PS-EU-CADA-2026', 'PS-EU-CADA-PROCEDURE-2026'], lastVerified: '2026-08-13', nextReview: '2026-09-13', href: '/downloads/emerging-tech-policy-radar.md',
  },
  {
    id: 'SIG-AGENT-STANDARDS', market: 'US / Singapore / China · Standards', title: 'Agent identity and authorization are policy issues',
    fact: 'NIST agent work and AI 800-5 remain non-binding research and standards activity; Singapore\'s current voluntary framework is v1.5; a July Chinese cooperation initiative calls for identity, interoperability, and lifecycle security but is not a regulation.',
    implication: 'Turn least privilege, approval boundaries, and audit records into reusable product evidence.',
    action: 'Crosswalk identity, authority, logging, evaluation, and prompt-injection controls to one low-risk agent use case.',
    owner: 'Standards policy + security + product engineering',
    evidenceGate: 'Escalate when the agent can take state-changing action without an identity, authority limit, or review record.',
    sourceIds: ['PS-US-NIST-AGENTS-2026', 'PS-US-NIST-AGENT-RFI-800-5', 'PS-SG-IMDA-AGENTS-V15-2026', 'PS-SG-IMDA-SANDBOX-2026', 'PS-CN-AGENT-INTEROP-2026'], lastVerified: '2026-08-13', nextReview: '2026-09-13', href: '/downloads/policy-position-note-sample.md',
  },
  {
    id: 'SIG-APAC-IMPLEMENTATION', market: 'China · Implementation', title: 'One agent signal is binding; the other is policy direction',
    fact: 'China\'s anthropomorphic-interaction rule took effect on 15 July 2026 for scoped continuous emotional interaction. Its May implementation opinion and July interoperability initiative are separate non-binding policy signals, not new generative-AI regulations.',
    implication: 'Run the rule\'s product-scope screen, but do not encode every recommendation in the broader opinion as a directly enforceable duty.',
    action: 'Separate the binding scope screen from direction-of-travel tracking and existing GenAI, algorithm, and labeling duties.',
    owner: 'China policy + local counsel + consumer / social product + trust & safety',
    evidenceGate: 'Escalate when a service simulates a natural person and adds continuous emotional interaction.',
    sourceIds: ['PS-CN-ANTHROPOMORPHIC-2026', 'PS-CN-AGENTIC-OPINION-2026', 'PS-CN-AGENT-INTEROP-2026'], lastVerified: '2026-08-13', nextReview: '2026-09-13', href: '/policy-refresh#china-agent-policy',
  },
  {
    id: 'SIG-UK-CONSUMER-AGENTS', market: 'UK · Consumer', title: 'Existing consumer law is already an agentic-AI policy channel',
    fact: 'On 9 March 2026 the CMA published both its agentic-AI research and separate business guidance explaining that existing consumer law still applies and businesses remain responsible for agents they use.',
    implication: 'Test disclosure, confirmation, cancellation, redress, and commercial influence across the whole agent journey.',
    action: 'Evaluate one end-to-end consumer journey, including commercial influence, confirmation, cancellation, and redress.',
    owner: 'UK consumer policy + product counsel + product design',
    evidenceGate: 'Escalate when an agent can commit a consumer without a clear confirmation, cancellation, or redress path.',
    sourceIds: ['PS-UK-CMA-AGENTS-2026', 'PS-UK-CMA-AGENT-GUIDANCE-2026'], lastVerified: '2026-08-13', nextReview: '2026-09-13', href: '/downloads/global-ai-policy-intelligence-brief.md',
  },
  {
    id: 'SIG-US-AI-CYBERSECURITY', market: 'US · AI cybersecurity', title: 'Federal AI cyber policy has moved from directive to coordinated operations',
    fact: 'EO 14409 directs federal cyber-defense upgrades, frontier-model benchmarking, and a voluntary developer framework. The White House reports Gold Eagle is operating as a public-private vulnerability-coordination clearinghouse. The order does not authorize mandatory model licensing or preclearance.',
    implication: 'Treat this as a government-facing assurance and coordination channel, not a general private-sector compliance mandate.',
    action: 'Track model-security evaluation, vulnerability intake, remediation, and information-sharing evidence while separating agency directives from voluntary industry participation.',
    owner: 'US federal policy + security + model assurance',
    evidenceGate: 'Escalate if an agency converts the order into a binding directive or rule, or if participation terms create contractual duties; do not label Gold Eagle as regulation.',
    sourceIds: ['PS-US-EO-14409-AI-CYBER', 'PS-US-GOLD-EAGLE-2026'], lastVerified: '2026-08-13', nextReview: '2026-09-13', href: '/downloads/emerging-tech-policy-radar.md',
  },
] as const satisfies readonly PortfolioSignal[];

export const PORTFOLIO_MONITORING_LOG = [
  { date: '2026-07-14', action: 'baseline snapshot', signalIds: ['SIG-COMPUTE-INFRA', 'SIG-AGENT-STANDARDS', 'SIG-UK-CONSUMER-AGENTS'], note: 'Initial role-facing monitoring snapshot checked against the listed official sources; no historical cadence is claimed.' },
  { date: '2026-08-06', action: 'change refresh', signalIds: ['SIG-EU-CA-TRANSPARENCY', 'SIG-APAC-IMPLEMENTATION'], note: 'Recorded the EU Official Journal correction, EU and California 2 August applicability transition, China\'s 15 July binding anthropomorphic-interaction rule, and the separate agent-policy opinion; this is a second dated snapshot, not a claim of real-time monitoring.' },
  { date: '2026-08-07', action: 'targeted verification pass', signalIds: ['SIG-EU-CA-TRANSPARENCY', 'SIG-APAC-IMPLEMENTATION'], note: 'Re-checked the official sources underpinning the EU lifecycle and Article 50, California transparency, and China binding-rule versus policy-direction change cards. This bounded freshness pass is not real-time or comprehensive monitoring.' },
  { date: '2026-08-13', action: 'bounded official-source refresh', signalIds: ['SIG-EU-CA-TRANSPARENCY', 'SIG-CA-SB1000-PENDING', 'SIG-COMPUTE-INFRA', 'SIG-AGENT-STANDARDS', 'SIG-APAC-IMPLEMENTATION', 'SIG-UK-CONSUMER-AGENTS', 'SIG-US-AI-CYBERSECURITY'], note: 'Re-checked the listed EU, US, China, Singapore, Korea, and UK official sources through 13 August 2026. No post-7 August substantive change was found in the existing tracked instruments; the pass adds missed official sources and flags California SB 1000 as a pending proposal, not current law. This selective review is not real-time or comprehensive monitoring.' },
] as const;

export type PolicyRefreshChange = {
  id: string;
  market: string;
  title: string;
  before: string;
  now: string;
  effectiveDate: string;
  fact: string;
  decisionQuestion: string;
  action: string;
  owner: string;
  evidenceGate: string;
  sourceIds: readonly string[];
};

export const POLICY_REFRESH_CHANGES = [
  {
    id: 'eu-lifecycle',
    market: 'European Union · legislative lifecycle',
    title: 'The amendment is no longer pending',
    before: 'Council approval; Official Journal publication still open',
    now: 'Regulation (EU) 2026/1744 published and in force',
    effectiveDate: 'In force 27 July 2026',
    fact: 'The regulation was published on 24 July. It moves Annex III high-risk obligations to 2 December 2027 and Annex I-embedded obligations to 2 August 2028, while preserving only a narrow Article 50(2) transition for systems already on the market.',
    decisionQuestion: 'Which work belongs to the current transparency track, and which belongs to the later high-risk track?',
    action: 'Replace adoption-stage language with the enacted CELEX record and keep the timelines separate.',
    owner: 'EU policy + legal operations',
    evidenceGate: 'The source register, instrument record, provision display, and briefing must all show the enacted status and both conditional dates.',
    sourceIds: ['PS-EU-OMNIBUS-2026'],
  },
  {
    id: 'eu-article-50',
    market: 'European Union · product transparency',
    title: 'Article 50 moved from countdown to evidence',
    before: 'Prepare disclosure and marking controls for 2 August',
    now: 'Relevant duties apply; final Commission guidance is available',
    effectiveDate: 'Applicable since 2 August 2026',
    fact: 'Direct-interaction disclosure, machine-readable marking, and deployer labeling are distinct, scope-dependent workstreams. The Commission published final implementation guidelines on 20 July.',
    decisionQuestion: 'For this product surface, which Article 50 paragraph, role, content type, and exception analysis apply?',
    action: 'Record the product facts, selected control, accountable owner, and operating evidence—not only a launch checklist.',
    owner: 'EU policy + product counsel + product / engineering',
    evidenceGate: 'Each potentially in-scope surface needs a paragraph-level scope decision and evidence that the disclosure or marking works.',
    sourceIds: ['PS-EU-ART50-GUIDELINES-2026', 'PS-EU-ART50-CODE-2026', 'PS-EU-ART50-CODE-ASSESSMENT-2026', 'PS-EU-OMNIBUS-2026'],
  },
  {
    id: 'california-transparency',
    market: 'California · content provenance',
    title: 'Core covered-provider duties are operative',
    before: 'Future state-law readiness',
    now: 'Core duties live; SB 1000 remains pending and is not current law',
    effectiveDate: 'Operative 2 August 2026',
    fact: 'Current Chapter 25 still turns on more than one million monthly visitors or users at the system level plus public accessibility within California, along with content modality and the entity\'s statutory role. As of 13 August, pending urgency bill SB 1000 would remove that threshold and revise several controls, but it has not been enacted.',
    decisionQuestion: 'Is the relevant entity a covered provider, large online platform, GenAI hosting platform, capture-device manufacturer, third-party licensee, or outside Chapter 25—and does the Section 22757.5 product-category exclusion apply?',
    action: 'Classify role, traffic threshold, modality, and date before selecting detection, disclosure, and provenance controls.',
    owner: 'US state policy + product counsel + content-platform / provenance engineering',
    evidenceGate: 'The current-law threshold, California accessibility, modality, statutory role, product exclusion, and staggered date must be recorded before a control conclusion; pending bill text stays in a separate scenario.',
    sourceIds: ['PS-US-CA-AI-TRANSPARENCY-2026', 'PS-US-CA-SB1000-2026'],
  },
  {
    id: 'china-agent-policy',
    market: 'China · anthropomorphic and agent policy',
    title: 'Binding scope and policy direction must stay separate',
    before: 'Agent-related signals discussed as one broad category',
    now: 'A scoped rule is in force; a separate agent opinion signals direction',
    effectiveDate: 'Rule effective 15 July 2026',
    fact: 'The binding rule centers on public-facing services that simulate natural-person characteristics and provide continuous emotional interaction. Customer service, Q&A, work assistants, education, and research are excluded when that feature is absent. The May implementation opinion and July interoperability initiative are treated as policy direction, not new binding GenAI regulations.',
    decisionQuestion: 'Does the service actually provide continuous emotional interaction, and which expectations come from binding law versus policy direction?',
    action: 'Run a targeted product-scope screen, then track implementing standards without converting every recommendation into a legal duty.',
    owner: 'China policy + local counsel + consumer / social product + trust & safety',
    evidenceGate: 'Complete the continuous-emotional-interaction scope screen before mapping the rule; track the implementation opinion separately.',
    sourceIds: ['PS-CN-ANTHROPOMORPHIC-2026', 'PS-CN-AGENTIC-OPINION-2026', 'PS-CN-AGENT-INTEROP-2026'],
  },
] as const satisfies readonly PolicyRefreshChange[];

export const EXECUTIVE_MARKETS = [
  {
    id: 'eu',
    market: 'European Union',
    legalForm: 'Binding regulation + non-binding guidance and voluntary code',
    signal: 'Article 50 transparency has applied since 2 August 2026. Article 4 still requires providers and deployers to take contextual AI-literacy measures; national supervision and enforcement began in early August.',
    implication: 'Disclosure and provenance evidence plus role- and risk-sensitive staff preparation are operating workstreams. Code adherence may support compliance evidence but is not conclusive proof.',
    action: 'Document product scope, the applicable Article 50 paragraph, the chosen control and evidence, plus AI-system users, context, risk, and literacy measures.',
    owner: 'EU policy + product counsel + product / engineering + learning',
    evidenceTrigger: 'An in-scope surface lacks paragraph-level evidence, or relevant staff lack contextual AI-literacy measures and records.',
    sourceIds: ['PS-EU-OMNIBUS-2026', 'PS-EU-ART50-GUIDELINES-2026', 'PS-EU-ART50-CODE-ASSESSMENT-2026', 'PS-EU-AI-LITERACY-QA-2026'],
  },
  {
    id: 'china',
    market: 'China',
    legalForm: 'Binding departmental rule + non-binding opinion and cooperation initiative',
    signal: 'A binding rule for continuous anthropomorphic interaction took effect on 15 July; the May agent opinion and July interoperability initiative remain policy direction.',
    implication: 'Consumer/social companion use cases need a scope screen; ordinary customer service, Q&A, work assistants, education, and research are excluded when they lack continuous emotional interaction.',
    action: 'Separate the binding rule\'s scoped duties from the broader implementation opinion and existing GenAI/labeling instruments.',
    owner: 'China policy + local counsel + consumer / social product + trust & safety',
    evidenceTrigger: 'A service adds continuous emotional interaction, or an implementation opinion is converted into a standard or sector rule.',
    sourceIds: ['PS-CN-CAC-GENAI-2023', 'PS-CN-CAC-LABELING-2025', 'PS-CN-ANTHROPOMORPHIC-2026', 'PS-CN-AGENTIC-OPINION-2026', 'PS-CN-AGENT-INTEROP-2026'],
  },
  {
    id: 'us',
    market: 'United States',
    legalForm: 'Binding California statute + pending urgency bill + federal policy screen',
    signal: 'Current Chapter 25 duties are operative. SB 1000 is on the Assembly third-reading file and could materially revise scope and controls if enacted, but it is not current law.',
    implication: 'Apply the current threshold and duties while keeping a separate, rapidly refreshable SB 1000 scenario.',
    action: 'Classify current Chapter 25 scope and controls; monitor the floor vote, enrollment, and Governor action before changing the baseline.',
    owner: 'US state policy + product counsel + content-platform / provenance engineering',
    evidenceTrigger: 'A current-law scope fact remains unresolved, or official evidence shows SB 1000 amendment, passage, enrollment, veto, or chaptering.',
    sourceIds: ['PS-US-CA-AI-TRANSPARENCY-2026', 'PS-US-CA-SB1000-2026', 'PS-US-EO-14409-AI-CYBER'],
  },
  {
    id: 'singapore',
    market: 'Singapore',
    legalForm: 'Non-binding governance framework + sandbox guidance',
    signal: 'IMDA\'s current v1.5 agentic-AI framework and sandbox material offer voluntary guidance on multi-agent, third-party-agent, automation-bias, and assurance risks.',
    implication: 'Assurance evidence can support responsible adoption without being treated as legal authorization.',
    action: 'Crosswalk controls to the IMDA framework and identify a sandbox-ready use case.',
    owner: 'APAC policy + security / assurance + product',
    evidenceTrigger: 'A proposed agent use case lacks bounded authority, lifecycle evidence, or a named accountable owner.',
    sourceIds: ['PS-SG-IMDA-AGENTS-V15-2026', 'PS-SG-IMDA-SANDBOX-2026'],
  },
] as const;

export function portfolioSourceMap() {
  return new Map(PORTFOLIO_SOURCES.map((source) => [source.id, source]));
}
