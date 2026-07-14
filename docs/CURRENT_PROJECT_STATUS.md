# Current Project Status

**As of:** 2026-07-14
**Status split:** **INTERVIEW-READY PORTFOLIO / PUBLICATION-GATED PRODUCTION CORPUS**

## Readiness

| Dimension | Status | Evidence |
|---|---|---|
| Global AI policy work-sample portfolio | Ready for hiring-manager review | Intelligence and emerging-tech monitoring; business/Tencent implications; executive, consultation, speaking, position, stakeholder, quantitative, and presentation artifacts |
| Golden 8 preview application | Ready for non-production review | Profile-scoped data, persistent AI-assisted-research disclosure, source chains, and deterministic preview exports |
| Fixture application | Ready for product testing | Explicitly fictional profile with validation and interaction coverage |
| Production code path | Ready and fail-closed | Structured routes select only non-fixture records with `review_status: published` |
| Production content | Not ready | 15 instruments, 9 provisions, 13 controls, 10 mappings, and 2 changelog rows remain `in_review` |
| Publication readiness | Blocked | Independent Pass 2 review and canonical owner decisions are incomplete |

## 2026-07-14 portfolio upgrade

- Added a dated global policy intelligence brief spanning agentic AI, compute/semiconductors, cloud/data centers, standards, and international implementation.
- Added business risk/opportunity and product-action analysis, with cross-functional owners and evidence gates.
- Added a policy-position sample, stakeholder landscape, and fictional meeting brief without claiming external relationships.
- Added a consultation response, speaking brief, and industry-initiatives tracker with explicit non-submission, non-invitation, and non-membership boundaries.
- Added a public-information-only Tencent implications brief grounded in official company disclosures and separated disclosed facts from analytical hypotheses.
- Added generated corpus analysis with explicit denominators, future-program targets, and publication limits.
- Added an ADRS sensitivity note that prevents false precision and keeps the score outside legal/compliance use.
- Replaced the empty executive surface with a bounded interview-preview decision brief.
- Added a role-facing work-sample page, redesigned overview, clearer navigation/footer, responsive behavior, and accessibility improvements.
- Preserved the production application boundary by rendering current-policy analysis pages and structured policy records only in `preview`; standalone work-sample downloads remain deliberately public and carry their own portfolio-only status.
- Added an editable executive PowerPoint work sample under `docs/deliverables/`.

## Current corpus

17 sources · 15 instruments · 9 provisions · 13 controls · 10 control mappings · 2 changelog records. Full breakdown: [Corpus Inventory](research/CORPUS_INVENTORY.md).

The production application correctly presents no structured policy content while the published count is zero. Preview artifacts and working documents are labeled as such; they are not owner-approved publications. Static work-sample downloads are intentionally reachable as standalone portfolio files, but they are not imported into or counted as production corpus records.

## Current verification state

The 2026-07-14 release pass completed:

- lint and TypeScript: passed;
- unit tests: 31 / 31;
- integration tests: 36 / 36;
- fixture and preview validation: passed;
- fixture and preview Next.js builds: passed;
- production validation: failed only with the intended `R8-publication-empty` gate;
- presentation QA: six slides rendered, inspected, and passed the overflow test;
- live Vercel Preview: seven key routes and all 24 downloads returned HTTP 200;
- in-app browser: desktop/mobile layouts, primary CTA, 13 work-sample cards, banner, and console verified without horizontal overflow or console errors.

Verified Preview: <https://ai-policy-atlas-ax2183-5057-ao-xus-projects.vercel.app>

Full evidence: [Portfolio QA Report — 2026-07-14](PORTFOLIO_QA_REPORT_2026-07-14.md).

## Next safe action

Run an identified, independent Pass 2 reviewer through the [Publication Review Queue](research/PUBLICATION_REVIEW_QUEUE.md), then record a canonical owner decision. Do not change `review_status` to `published` on the strength of an AI-assisted draft, a checklist mark, or this portfolio upgrade alone.
