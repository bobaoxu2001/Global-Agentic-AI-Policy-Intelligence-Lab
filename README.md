# AI Policy Atlas

**Global Agentic AI Policy Intelligence Lab** — an independent portfolio project that turns policy change into business implications, product controls, public-affairs work products, and explicit decision gates.

> **Readiness split:** the policy-operating portfolio is interview-ready; the structured production corpus remains publication-gated. AI-assisted preview research is not legal advice and has not completed independent human legal review.

[Open the verified hiring-manager Preview](https://ai-policy-atlas-ax2183-5057-ao-xus-projects.vercel.app)

![AI Policy Atlas live hiring-manager overview](design/screenshots/live-qa/home-desktop.jpg)

## Hiring-manager quick read

The project demonstrates five parts of a global AI policy operating role:

1. **Monitor:** a [dated global policy intelligence brief](docs/deliverables/GLOBAL_AI_POLICY_INTELLIGENCE_BRIEF_2026-07-14.md) and [agentic AI / semiconductor / compute / cloud radar](docs/deliverables/EMERGING_TECH_POLICY_RADAR.md).
2. **Synthesize:** an [executive briefing deck](docs/deliverables/Global_AI_Policy_Executive_Briefing.pptx), [decision brief](docs/deliverables/EXECUTIVE_DECISION_BRIEF.md), and [policy memo](docs/deliverables/POLICY_MEMO_HUMAN_OVERSIGHT_AND_DISCLOSURE.md).
3. **Translate:** a [business implications matrix](docs/deliverables/BUSINESS_IMPLICATIONS_MATRIX.md) and [Tencent public-information implications brief](docs/deliverables/TENCENT_PUBLIC_INFORMATION_IMPLICATIONS_BRIEF.md) connecting policy signals to business, product, cloud, security, and engineering questions.
4. **Engage:** a [policy-position sample](docs/deliverables/POLICY_POSITION_NOTE_SAMPLE.md), [consultation response](docs/deliverables/CONSULTATION_RESPONSE_SAMPLE.md), [speaking brief](docs/deliverables/SPEAKING_BRIEF_SAMPLE.md), [industry initiatives tracker](docs/deliverables/INDUSTRY_INITIATIVES_TRACKER.md), [stakeholder landscape](docs/deliverables/STAKEHOLDER_LANDSCAPE.json), and [fictional meeting brief](docs/deliverables/MEETING_BRIEF_SAMPLE.md).
5. **Calibrate:** source tiers, lifecycle status, confidence, fact → inference → recommendation chains, an [ADRS sensitivity note](docs/deliverables/ADRS_SENSITIVITY_NOTE.md), and [generated corpus analysis](docs/deliverables/POLICY_CORPUS_DESCRIPTIVE_ANALYSIS.md) with explicit denominators.

The [role-alignment map](docs/deliverables/TENCENT_ROLE_ALIGNMENT.md) states both the evidence and the honest limits for the Tencent Associate, Global AI Policy role. The [hiring-manager review](docs/HIRING_MANAGER_REVIEW.md) records the weighted assessment, and the [dated QA report](docs/PORTFOLIO_QA_REPORT_2026-07-14.md) records the reproducible build and live-site evidence.

## The operating decision

The portfolio does not claim that one configuration is lawful everywhere. Its current executive posture is narrower and more useful:

> Build reusable identity, authorization, logging, disclosure, approval, testing, and redress controls now. Hold any universal launch decision until product facts, current primary law, operating evidence, and qualified market-specific review are available.

This is the throughline from policy source to accountable action:

`policy change → scoped fact → analytical implication → product/control owner → evidence gate → decision`

## What is genuinely ready

| Layer | Status | Meaning |
|---|---|---|
| Policy work-sample portfolio | **Interview-ready** | Dated, source-linked writing across monitoring, strategy, position development, stakeholder preparation, and executive communication |
| Golden 8 preview | **Runnable, non-production** | Six instruments, two provisions, four jurisdictions, and their validated dependencies; persistent AI-assisted-research boundary |
| Fixture product demo | **Runnable, fictional** | Interaction, calculation, and design testing only; never deploy |
| Production application path | **Fail-closed** | Structured records render only when `review_status` is `published` |
| Production corpus | **Not publication-ready** | No structured record is published; human Pass 2 review and owner decisions remain incomplete |

Working documents and preview downloads remain explicitly labeled in the repository. The production data boundary applies to structured application records; it does not turn working artifacts into approved publications.

## Role-facing proof map

| Global AI policy competency | Evidence in this repository |
|---|---|
| AI, GenAI, agentic AI, semiconductors, and emerging-tech monitoring | Current intelligence brief, compute/cloud radar, NIST/IMDA/BIS/CADA/Korea/UK source register |
| US and international policy comparison | Structured US/EU/China/Singapore Atlas plus Korea/UK monitoring samples |
| Briefings, memoranda, presentations, and executive summaries | Executive page, Markdown briefs, policy memo, and editable PowerPoint deck |
| Business, cloud, and technology implications | Six-surface business matrix, public-information-only Tencent brief, and policy-to-engineering control mappings |
| Risks and opportunities | Paired risk/opportunity analysis with reversible actions and escalation owners |
| Cross-functional work | Policy, legal, compliance, product, engineering, security, research, and leadership ownership fields |
| Policy positions and external materials | Position note, consultation response, speaking brief, and industry-initiatives tracker with explicit non-submission limits |
| Meeting and stakeholder preparation | Fictional meeting brief plus structured tracker; every relationship is marked `not_contacted` |
| Quantitative and qualitative analysis | ADRS method and sensitivity note, bounded as an uncalibrated prioritization heuristic |

## Research product and evidence model

The Atlas classifies policy instruments by type, bindingness, lifecycle, and regulatory approach; maps relevant provisions to agentic capabilities and governance risks; and maps those to technical and organizational controls.

`ADRS = min(100, InherentRisk × (1 − MitigationCredit) × J)`

ADRS supports prioritization and discussion. It is **not** a legal determination, compliance certification, probability estimate, or empirically calibrated risk score. See the [methodology decisions](docs/METHODOLOGY_DECISIONS.md) and [sensitivity note](docs/deliverables/ADRS_SENSITIVITY_NOTE.md).

## Build profiles

| Mode | Content | Purpose | Deployment boundary |
|---|---|---|---|
| `fixtures` | Explicitly fictional scenarios and records | Demo, interaction tests, design review | Never deploy |
| `preview` | Golden 8 structured records plus clearly labeled interview work samples | Hiring-manager research preview | Never Production; no completed human legal review |
| `production` | Published structured records only | Publication-gated delivery | Currently renders an empty corpus state |

Production selection excludes `fixture:true` data and renders only eligible `published` structured records. Unpublished records may remain in the working dataset, but they are excluded from production pages; the build fails closed when no published instrument exists. The reconciled working corpus contains 17 sources, 15 instruments, 9 provisions, 13 controls, 10 control mappings, and 2 changelog records; every reviewable record remains `in_review`. See [current status](docs/CURRENT_PROJECT_STATUS.md), [publication readiness](docs/research/PUBLICATION_READINESS_REPORT.md), and [corpus inventory](docs/research/CORPUS_INVENTORY.md).

## Preview boundaries

The Golden 8 structured preview contains only `eu-gdpr`, `eu-gdpr:art22`, `us-co-sb26-189`, `us-eo-14179`, `cn-ai-labeling-measures`, `cn-genai-interim-measures`, `cn-genai-interim-measures:art9`, and `sg-mgf-genai`, plus validated dependencies. It is AI-assisted, source-traceable work prepared for interview review, not legal publication.

The upgraded hiring-manager Preview is live at <https://ai-policy-atlas-ax2183-5057-ao-xus-projects.vercel.app>. It was verified on 2026-07-14 across desktop and mobile layouts, seven key routes, the primary CTA, 13 work-sample cards, and all 24 public downloads. It is marked `noindex`, uses the `preview` build profile, and is not a Production publication.

## Local setup and validation

```bash
npm ci
BUILD_PROFILE=preview npm run dev
```

```bash
npm run lint
npm run typecheck
npm test
npm run test:integration
npm run validate:preview
npm run build:preview
```

| Command | What it verifies |
|---|---|
| `npm run lint` | Static linting |
| `npm run typecheck` | TypeScript correctness |
| `npm test` | ADRS, schema, and validation behavior |
| `npm run test:integration` | Dataset, profile, and integrity pipeline |
| `npm run validate:fixtures` | Fictional corpus integrity |
| `npm run validate:preview` | Golden 8 manifest, exports, and dependency integrity |
| `npm run validate:production` | Publication gate; expected to fail while records remain `in_review` |
| `npm run build:fixtures` | Fixture static build |
| `npm run build:preview` | AI-assisted interview preview build |
| `npm run build:production` | Eligible only after publication validation passes |

Browser suites remain available as `test:e2e`, `test:e2e:preview`, and `test:e2e:production`. They are not required to understand the portfolio and should be run in an approved browser-testing environment.

## Interview demo flow

1. Open `/` and state the boundary: interview-ready portfolio, human-gated production corpus.
2. Open `/executive-brief` and explain why reusable controls are supportable while universal launch approval is not.
3. Open GDPR Article 22 and trace primary text → scoped inference → control recommendation → confidence and review date.
4. Compare EU, US, China, and Singapore without flattening instrument type, bindingness, lifecycle, or coverage.
5. Open `/work-samples` to show monitoring, emerging-tech, business, policy-position, stakeholder, and quantitative artifacts.
6. End with the five decision gates and the remaining human-review requirements.

## Route map

`/` · `/executive-brief` · `/work-samples` · `/instruments` · `/jurisdictions` · `/compare` · `/scenarios` · `/risk-score` · `/taxonomy/policy` · `/taxonomy/capabilities` · `/taxonomy/risks` · `/controls` · `/methodology` · `/bibliography` · `/glossary` · `/about` · `/downloads`

Legacy paths `/calculator`, `/policies`, and `/brief` permanently redirect to canonical routes.

## Repository structure

- `src/app/` — Next.js App Router pages and profile-aware presentation layer
- `src/components/` — semantic UI and interactive calculator/tracker
- `src/data/fixtures/` — explicitly fictional demo corpus
- `src/data/content/` — real working corpus, publication-gated
- `src/lib/` — ADRS, schemas, validation, applicability, and profile logic
- `docs/deliverables/` — policy work samples and executive deck
- `docs/research/` — review queue, evidence register, and publication artifacts
- `design/screenshots/` — reviewer-facing visual evidence

## Remaining gaps

1. Complete independent human policy/legal review and record the owner decision for every structured record.
2. Deepen provision-level coverage, especially outside the current four-jurisdiction structured preview.
3. Add real stakeholder engagement and cross-functional outcomes only when they actually occur; do not simulate experience as fact.
4. Re-run production validation and browser checks only after records are eligible for publication.
5. Keep the hosted Preview separate from Production until independently reviewed records satisfy the publication gate.

## Disclaimer

AI Policy Atlas is an independent research and application portfolio project. It is not legal advice, does not certify compliance, and is not affiliated with or representative of Tencent or any other company, government, regulator, or standards body.
