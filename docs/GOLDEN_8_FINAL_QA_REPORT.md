# Golden 8 Final QA Report

Date: 2026-07-13  
Profile: `BUILD_PROFILE=preview`  
Review basis: automated Playwright coverage plus an independent interactive browser smoke check  
Publication class: interview research preview, not final legal publication

## Result

**PASS — public Preview ready with the production publication gate intentionally closed.** The rendered dataset contains exactly six instruments and two provisions. All 15 required routes returned a successful response and displayed the persistent AI-assisted preview banner.

Public Vercel Preview: <https://ai-policy-atlas-cckww5o6g-ao-xus-projects.vercel.app>

| Route | HTTP/render | Banner | Source/content result |
|---|---|---|---|
| `/` | Pass | Pass | Derived 6/2/4 counts and maximum verification date |
| `/instruments` | Pass | Pass | Exactly six instrument rows |
| `/instruments/eu-gdpr` | Pass | Pass | Official EUR-Lex link present |
| `/provisions/eu-gdpr%3Aart22` | Pass | Pass | Article 22(1) quote, pin evidence, and source link present |
| `/instruments/us-co-sb26-189` | Pass | Pass | Excluded-child caveat present |
| `/instruments/us-eo-14179` | Pass | Pass | Official source and context-only coverage shown |
| `/instruments/cn-ai-labeling-measures` | Pass | Pass | Official CAC source present |
| `/instruments/cn-genai-interim-measures` | Pass | Pass | Official CAC source and included child shown |
| `/provisions/cn-genai-interim-measures%3Aart9` | Pass | Pass | Chinese quote plus K04/K13 mappings present |
| `/instruments/sg-mgf-genai` | Pass | Pass | Context-only caveat and framework source present |
| `/compare` | Pass | Pass | Preview records only |
| `/controls` | Pass | Pass | Three required controls only |
| `/bibliography` | Pass | Pass | Six required sources only |
| `/downloads` | Pass | Pass | Four preview artifacts returned successfully |
| `/methodology` | Pass | Pass | Methodology rendered without corpus leakage |

## Boundary and export checks

- JSON: 8 records.
- CSV: header plus 8 record rows.
- Manifest: the same 8 ordered record IDs.
- Source register: the same 8 ordered record IDs and official URLs.
- No fixture record, EU AI Act record, Colorado excluded provision, or unrelated corpus record rendered.
- Official-source links use HTTPS and are exposed as usable links.
- Desktop evidence was captured at 1440×900 for dashboard, tracker, GDPR Article 22, China Article 9, and comparison.
- Mobile evidence was captured at 390×844 for dashboard, tracker, and GDPR Article 22.

Evidence is stored in `design/screenshots/golden-8-final-qa/`.

## Defects found and fixed

- Replaced the three-row hand-maintained CSV with deterministic eight-record exports.
- Added schema, duplicate, reference, parent, source, control, and mapping validation around the preview manifest.
- Replaced the hardcoded dashboard date and counts with derived metadata, including an empty-safe state.
- Made evidence citations and instrument official sources clickable.
- Generalized the context-only coverage caveat to any preview instrument without included provision coverage.
- Added mobile navigation wrapping and horizontal containment for wide policy tables.
- Added explicit Vercel production/preview guards without weakening the human production gate.
- Upgraded Next.js, Playwright, and Vitest to patched compatible releases and pinned patched PostCSS; `npm audit` reports zero vulnerabilities.

## Remaining limitations

- The preview is AI-assisted research and is not a final legal publication or legal advice.
- Only `eu-gdpr` has a separately evidenced owner decision, and that decision is instrument-only with no provision inheritance.
- Production remains blocked because the corpus does not satisfy the formal published/human-review workflow.
- Scenario assessments are intentionally absent from the Golden 8 preview.
- The public Preview is marked `noindex`; it is intended for interview review, not search indexing or production publication.
