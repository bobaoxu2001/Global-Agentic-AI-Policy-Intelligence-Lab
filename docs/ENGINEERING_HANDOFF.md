# AI Policy Atlas — Engineering Handoff

**Derived from:** `SPEC.md` v1.0 + `docs/PRD.md`. **Audience:** implementing engineer / Codex. **Goal:** enable Phase 0 (§26 SPEC) to be built with zero further questions.

> Canonical rules (formulas, IDs, taxonomies, integrity rules) come from `SPEC.md`. This document specifies *how* to build them. Items marked **[LOCKED]** must not change without updating `SPEC.md` (see §20).

---

## 1. Recommended Architecture

- **Static-first, content-as-code.** All content authored as JSON + Markdown under `/content`, validated by a build-time pipeline, compiled to typed data, and rendered by a static site generator into fully pre-rendered HTML. **No backend, no database server at runtime, no runtime LLM, no server mutation** (NFR-1, §5).
- **Single source of truth for math.** One ADRS formula module (`/src/lib/adrs.ts`) is imported by (a) the interactive calculator (client) and (b) the build-time recompute/verification check. The math is never duplicated. **[LOCKED]**
- **Validation before build.** `content → Zod/JSON-Schema validation → integrity checks → normalized dataset (JSON) → SSG render`. Any failure aborts the build (FR-13). **[LOCKED]**
- **Data layer.** SQLite is optional as an authoring/query convenience; the *shipping* artifact is build-time JSON. MVP may skip SQLite entirely and load `/content` directly. If SQLite is used, it is a build input only.

```
/content (JSON+MD)  ──►  validate (Zod)  ──►  integrity checks  ──►  /data/atlas.json  ──►  SSG  ──►  /dist (static)
                                    │                    │
                                    └── ajv/zod errors   └── adrs recompute, links, orphans, enums, FKs
```

---

## 2. Recommended Stack (NFR-10; engineer may substitute equivalents)

| Concern | Choice | Notes |
|---------|--------|-------|
| SSG/framework | **Astro** (preferred) or Next.js static export | Astro suits content-heavy static sites; islands for the one interactive component (calculator) |
| Language | **TypeScript** (strict) | shared types generated from Zod |
| Validation | **Zod** (primary) + optional AJV for raw JSON-Schema parity with §18 | Zod is the runtime + type source; JSON Schemas in §18 are mirrored |
| Interactive island | React (or Astro/Preact island) for `ADRSCalculator` | only interactive component |
| Styling | CSS modules / Tailwind (either) | must meet WCAG AA + non-color cues |
| Content parsing | gray-matter + markdown-it/remark | render Markdown in epistemic blocks |
| Tests | **Vitest** (unit/integration) + **Playwright** (E2E) | |
| PDF export | build-time HTML→PDF (e.g., Playwright print, or a static React-PDF) | memo, brief, methodology |
| CSV/JSON export | build-time generators | control-mapping CSV, dataset JSON |
| Lint/format | ESLint + Prettier | |
| Link check | lychee or linkinator in CI | validates citation URLs |
| a11y | axe-core (Playwright) | |
| Perf | Lighthouse CI | ≥90 on 3 pages |

---

## 3. Folder Structure

```
/
├─ SPEC.md
├─ docs/
│  ├─ PRD.md  ENGINEERING_HANDOFF.md  DESIGN_HANDOFF.md
│  ├─ ACCEPTANCE_CRITERIA.md  IMPLEMENTATION_BACKLOG.md
├─ content/
│  ├─ jurisdictions/{us,eu,sg,cn}.json
│  ├─ instruments/*.json                 # one file per instrument
│  ├─ provisions/*.json                   # one file per provision (or nested under instrument)
│  ├─ sources/*.json                      # shared source records (referenced by id)
│  ├─ capabilities.json                   # C1..C12 (seed, §10)
│  ├─ risks.json                          # R1..R12 (seed, §11)
│  ├─ controls/*.json                     # K-series controls
│  ├─ mappings/
│  │  ├─ provision-capability/*.json
│  │  ├─ provision-risk/*.json
│  │  └─ control-provision/*.json
│  ├─ scenarios/{aria,sentinel,mira}.json
│  ├─ assessments/*.json                  # scenario×jurisdiction×version
│  ├─ mapping-conflicts/*.json
│  ├─ changelog/*.json
│  ├─ glossary/*.json
│  └─ review-log/*.json                   # append-only review actions
├─ schemas/                               # JSON Schemas mirroring §18 (draft 2020-12)
│  ├─ instrument.schema.json  provision.schema.json  assessment.schema.json
│  ├─ citation.schema.json  action-log.schema.json  epistemic-block.schema.json
├─ src/
│  ├─ lib/
│  │  ├─ adrs.ts                          # [LOCKED] canonical formula module
│  │  ├─ zod/                             # Zod schemas (source of TS types)
│  │  ├─ validate.ts                      # runs zod over content
│  │  ├─ integrity.ts                     # publish-pipeline integrity checks (§24 PRD)
│  │  ├─ normalize.ts                     # content → /data/atlas.json
│  │  └─ confidence.ts                    # confidence caps + propagation (§22)
│  ├─ components/                         # EpistemicBlock, CitationPopover, ClassificationChips,
│  │                                      # ConfidenceChip, ProvisionTable, ADRSCalculator, ...
│  ├─ pages/ (or routes/)                 # per §5 route structure
│  └─ styles/
├─ data/atlas.json                        # generated; git-ignored or committed per NFR-6
├─ tests/
│  ├─ unit/  integration/  e2e/
├─ scripts/  (build, validate, export-pdf, export-csv, link-check)
├─ .github/workflows/ci.yml
└─ package.json  tsconfig.json  astro.config.*  playwright.config.ts
```

---

## 4. Route Structure (mirrors PRD §5)

| Route | Rendering | Data source |
|-------|-----------|-------------|
| `/` | static | jurisdictions, scenarios (summary) |
| `/methodology` | static | SPEC-derived content |
| `/taxonomy/policy` | static | enums + §8–9 text |
| `/taxonomy/capabilities` | static | `capabilities.json` |
| `/taxonomy/risks` | static | `risks.json` |
| `/jurisdictions` | static index | jurisdictions |
| `/jurisdictions/[id]` | static (getStaticPaths: us,eu,sg,cn) | jurisdiction + instruments |
| `/instruments/[slug]` | static (paths from published instruments) | instrument + provisions + changelog |
| `/provisions/[id]` | static (paths from published provisions) | provision + mappings |
| `/scenarios` | static index | scenarios |
| `/scenarios/[id]` | static (aria,sentinel,mira) | scenario + assessments + mappings |
| `/risk-score` | static shell + hydrated island | adrs.ts + rubric text |
| `/controls` | static | controls + mappings |
| `/compare` | static | provisions + mappings aggregated |
| `/changelog` | static | changelog |
| `/glossary` | static | glossary |
| `/bibliography` | static | sources |
| `/about` | static | text |
| `/404` | static | — |

Only **published** entities produce paths (PRD §15).

---

## 5. Domain Model Mapping

Entities (§17): `Jurisdiction, Instrument, Source, Provision, Capability, Risk, Control, Scenario, Assessment, MappingConflict, ReviewLogEntry, ChangelogEntry, GlossaryTerm` + relations `ProvisionCapabilityMap, ProvisionRiskMap, ControlProvisionMap`.

Value objects / enums **[LOCKED]** (verbatim from SPEC):
- `InstrumentType = enacted_law | proposed_legislation | regulation | executive_action | regulator_guidance | voluntary_framework | technical_standard`
- `Bindingness = binding | conditionally_binding | non_binding`
- `LifecycleStatus = proposed | adopted_not_yet_applicable | in_force_partially_applicable | fully_applicable | amended | superseded | rescinded | expired | withdrawn`
- `ApproachTag = horizontal_comprehensive | sector_specific | technology_specific | data_protection_derived | content_governance | safety_security | procurement_internal_government | standards_assurance`
- `ObligationType = obligation | prohibition | right | definition | enforcement | scope`
- `CapabilityId = C1..C12`; `RiskId = R1..R12`; `MitigationClass = M1..M9`; `Dimension = A|T|D|E|R`
- `Confidence = high | medium | low`; `Tier = low | moderate | high | critical`
- `MappingStrength = direct | derived | prudential`
- `MappingRelation = satisfies_in_part | supports_evidence | implements_general_duty`
- `ReviewStatus = draft | in_review | published` (workflow also uses `approved`, `re_verified`, `changes_requested`, `submitted_for_review`, `created`, `edited` as `review_log.action`)
- `ControlCategory = technical | process | organizational | documentation`

---

## 6. Database Entity Mapping

Use §17 DDL verbatim if SQLite is used (updated in the 2026-07-10 revision — see REVISION_LOG). Key points:
- `instruments.approach_tags`, `key_dates` are JSON-encoded TEXT; `scenarios.capability_profile`, `assessments.dims/mitigations/j_components` are JSON TEXT.
- `assessments` is **append-only**, `UNIQUE (scenario_id, jurisdiction_id, version)`. Current = max `version` where `review_status='published'` (MD-4). **[LOCKED intent]**
- `provisions.translation_source_id TEXT REFERENCES sources(id)` is now in SPEC §17 (required when `quote_translated` set); `provisions.bindingness` nullable (inherits instrument's when null — MJ-2); `provisions.epistemic_blocks TEXT` (JSON, §18.6); `instruments.last_verified` and `provisions.last_verified` NOT NULL (MJ-1). Effective bindingness resolution (`provision.bindingness ?? instrument.bindingness`) is a shared helper used by `binding_hit` and the compare count.
- **Date fields are distinct (MJ-1):** `publication_date`/`adopted_date`, `applies_from` (effective), `status_date`, `assessed_date`, `as_of_date`, `last_verified` — see SPEC §17 date dictionary; never alias `last_verified` to `as_of_date`.
- Foreign keys enforced; content pipeline additionally checks referential integrity (SQLite FK enforcement is off by default) and cross-file integrity rule 13 (A/T/R invariance across a scenario's four assessments).

---

## 7. API Contracts

**There is no runtime HTTP API** (static site, NFR-1). "Contracts" are the **build-time data contracts** = the JSON Schemas (§18) / Zod schemas (§9 below) and the shape of generated `/data/atlas.json`.

`/data/atlas.json` (generated) shape:
```ts
interface AtlasDataset {
  meta: { buildDate: string; contentVersion: string; asOf: string };
  jurisdictions: Jurisdiction[];
  instruments: Instrument[];      // published only
  provisions: Provision[];        // published only, with resolved capability/risk maps
  sources: Source[];              // referenced only (orphans fail CI)
  capabilities: Capability[];     // C1..C12
  risks: Risk[];                  // R1..R12
  controls: Control[];
  controlProvisionMaps: ControlProvisionMap[];
  scenarios: Scenario[];
  assessments: Assessment[];      // current published version per scenario×jurisdiction
  mappingConflicts: MappingConflict[];
  changelog: ChangelogEntry[];
  glossary: GlossaryTerm[];
}
```
The static export `/downloads/atlas-dataset.json` (FR-11) is this object (published subset).

---

## 8. Zod Schema Plan

**Zod is the single normative schema source (MN-15).** Zod schemas in `/src/lib/zod/` are the **source of truth** for both TypeScript types (`z.infer`) and validation. The JSON Schema files in `/schemas` are **illustrative/reference artifacts** mirroring §18 for documentation; where a conditional construct (e.g., §18.6 `allOf`/`if`/`then`) cannot round-trip cleanly through `zod-to-json-schema`, the **Zod definition governs** and the JSON Schema is best-effort. Do not treat the two as co-equal normative sources — validation runs Zod, not the JSON Schema files.

Schemas to author:
1. `citation.ts` — mirrors §18.4; required `tier(1|2|3), publisher, title, url(uri), pin_cite, accessed_date(date)`; optional `stable_ref, pub_date, version_date, language, is_translation, archived_url`. **Refinements:** if `tier===1` and no `stable_ref` → require `archived_url` (§21.6).
2. `source.ts` — the `sources` table row; superset of citation with `id, language, is_translation, translation_of?`.
3. `instrument.ts` — §18.1; enums locked; `approach_tags` min 1; `key_dates[]` require `date,event,source_id`; `sources[]` min 1 (references to source ids). Refinement: EU-AI-Act-type note is data, not validation.
4. `provision.ts` — §18.2; required `id, instrument_id, pin_cite, paraphrase_en(≤600), obligation_type, source_id, confidence, confidence_rationale, epistemic_blocks[]`, and **at least one** of `capability_map[]`/`risk_map[]` (min combined 1). `quote_verbatim` ≤350 chars **and** ≤50 words (custom refinement, OD-3). If `quote_translated` set → require `translation_source_id`. Each map item requires `rationale, confidence` (+ ids).
5. `assessment.ts` — §18.3; `dims` object with **exactly** keys A,T,D,E,R, each `{score: int 0..4, justification: minLength 40}`; `mitigations[]` `{class: M1..M9, evidence: minLength 40}` (credit **computed, not authored** — reject if present); `j_components` four keys `{value: 0|1, note, provision_ids?}`; `assessed_by, assessed_date`. **Reject** author-supplied `inherent/residual/final/tier` (computed only).
6. `epistemic-block.ts` — §18.6; `kind ∈ {fact,inference,recommendation}`, `text_md`. Conditional required: fact→`citations,confidence`; inference→`confidence,based_on`; recommendation→`based_on` (no confidence).
7. `control.ts`, `scenario.ts`, `mapping-*.ts`, `changelog.ts`, `glossary.ts`, `review-log.ts`, `mapping-conflict.ts`, `jurisdiction.ts`, `capability.ts`, `risk.ts` — mirror §17 columns + enums.
8. `action-log.ts` — §18.5 reference artifact (validated for the sample rendered on the site / methodology, not part of atlas dataset).

All enums are shared constants in `/src/lib/zod/enums.ts` **[LOCKED]**.

---

## 9. ADRS Formula Module Interface (`/src/lib/adrs.ts`) **[LOCKED]**

```ts
export const WEIGHTS = { A: 0.25, T: 0.20, D: 0.20, E: 0.15, R: 0.20 } as const; // §13.2
export const MITIGATION_CREDITS = {                                             // §13.4
  M1: 0.10, M2: 0.08, M3: 0.07, M4: 0.06, M5: 0.05, M6: 0.04, M7: 0.04, M8: 0.03, M9: 0.03,
} as const;
export const MITIGATION_CAP = 0.40;   // §13.3 / §13.4
export const J_CAP = 1.30;            // §13.5
export const J_COMPONENT_WEIGHTS = {  // §13.5
  binding_hit: 0.10, near_term_hit: 0.05, enforcement_posture: 0.05, prohibition_adjacent: 0.10,
} as const;

export type Dimension = 'A'|'T'|'D'|'E'|'R';
export type Dims = Record<Dimension, 0|1|2|3|4>;
export type MitigationClass = keyof typeof MITIGATION_CREDITS;
export interface JComponents {
  binding_hit: 0|1; near_term_hit: 0|1; enforcement_posture: 0|1; prohibition_adjacent: 0|1;
}
export type Tier = 'low'|'moderate'|'high'|'critical';

export function inherentRisk(d: Dims): number;                 // Σ w_i·d_i·25, ∈[0,100]
export function mitigationCredit(m: MitigationClass[]): number; // min(0.40, Σ credit)
export function residualRisk(inherent: number, credit: number): number; // inherent·(1−credit)
export function jMultiplier(j: JComponents): number;           // 1 + Σ w·c, capped 1.30
export function adrs(residual: number, j: number): number;     // min(100, residual·j)
// Half-open intervals (SPEC §12, CB-2): [0,25) low · [25,50) moderate · [50,75) high · [75,100] critical
export function tierOf(score: number): Tier;
export function displayScore(raw: number): number;             // round(raw, 1) — DISPLAY ONLY, never fed back in

export interface AdrsInput { dims: Dims; mitigations: MitigationClass[]; j: JComponents; }
export interface AdrsResult {
  inherent: number; credit: number; creditCapped: boolean;
  residual: number; j: number; final: number; tier: Tier;   // all raw full-precision; tier from raw final
  contributions: Record<Dimension, number>; // w_i·d_i·25 per dimension
}
export function computeAdrs(input: AdrsInput): AdrsResult;
```
- **Numeric convention (SPEC §13.7 — CB-5) [LOCKED]:** all functions compute at **full floating-point precision with no intermediate rounding**; `AdrsResult` fields are raw. `tierOf` uses **half-open intervals** and is applied to the **raw** `final` score. `displayScore` rounds to 1 dp for presentation only and its output is **never** re-entered into the formula (do not chain `adrs(displayScore(residual), j)`).
- `tierOf` implementation: `score < 25 → 'low'; score < 50 → 'moderate'; score < 75 → 'high'; else 'critical'` (upper bound of each tier belongs to the next; 100 is critical).
- `creditCapped` true when `Σ credit > 0.40`.

---

## 10. Import & Validation Pipeline

**`BUILD_PROFILE` env — `fixtures | production` (CB-4) [LOCKED behavior].** The pipeline runs in one of two profiles:

| Aspect | `fixtures` | `production` |
|--------|-----------|--------------|
| Purpose | tests, local dev, screenshots, design review | the deployable public site |
| Publish gate | may render **approved fictional §14 examples** without the full production publish gate | strictly enforces `review_status='published'` + all integrity checks |
| Fictional placeholder content | allowed | **rejected** |
| Banner | every page shows persistent **"FIXTURE DATA — ILLUSTRATIVE ONLY"** banner | no fixture banner |
| Deployment | **must never be deployed to production** (CI blocks deploy unless `BUILD_PROFILE=production`) | the only profile permitted to deploy |

Integrity rules that protect the *methodology* (ADRS recompute equality, A/T/R invariance, mitigation/J/ADRS clamps, enum conformance, referential integrity) run in **both** profiles — fixtures relaxes only the *publication/review-state* and *fictional-content* gates, never the math. This resolves the fixture publish-state deadlock: P1 e2e tests run under `fixtures` and see rendered scenario pages; production builds never ship fixtures.

`scripts/build-data.ts` (run before SSG, and standalone in CI):
1. **Load** all `/content/**` files (fixtures are `/content` files tagged with a `fixture: true` marker and, in production, are excluded and their presence in a production build fails CI).
2. **Zod-validate** each against its schema (§8). Collect all errors; fail with a readable report (file + path + message).
3. **Normalize** inline citations into shared `sources` records; resolve `source_id` references (OD-9/MD-8).
4. **Integrity checks** (`integrity.ts`, PRD §24, incl. rule 13 A/T/R invariance): publish gates *(production only)*, FK resolution, enum conformance, quote length (≤50 words AND ≤350 chars), Tier-3-never-cites-fact, confidence caps + propagation, orphan sources, mitigation-credit/J/ADRS recompute equality at full precision ±0.001 *(both profiles)*, assessment "current version" selection.
5. **Link check** citation URLs — **warning-tier** with retry + host allowlist (MJ-7); a Tier 1 source with no resolving URL, no `archived_url`, and no logged manual verification fails the build in `production`.
6. **Emit** `/data/atlas.json` (published subset in production; approved fixtures in fixtures profile) + `/downloads/atlas-dataset.json`.
7. Any hard failure → non-zero exit; SSG does not run.

---

## 11. Seed-Data Strategy

- **Locked seed content (Phase 0):** `capabilities.json` (C1–C12, §10 verbatim), `risks.json` (R1–R12, §11 verbatim), enum constants, and the **three §14 scenarios + their 12 assessments** encoded as fixtures so the formula module and templates can be built and tested before Phase 1 research lands.
- Scenario/assessment fixtures use the **exact numbers in §14** so unit tests assert reproduction (Aria/Sentinel/Mira). Mark clearly that J values are "illustrative pending research" (§14 note) in `note` fields.
- A minimal set of 2–3 **example instruments/provisions/sources/controls** (clearly fictional or clearly cited real primary sources for the taxonomy demo) lets templates render in Phase 0; real corpus arrives in Phase 1 (policy-research owner).
- Fixtures live under `/content` with a `fixture: true` marker and are rendered only under **`BUILD_PROFILE=fixtures`** (CB-4, §10) behind the "FIXTURE DATA — ILLUSTRATIVE ONLY" banner; the `production` profile excludes them and fails if any fixture-marked file is present. This is how P1 e2e tests (§12.3) see rendered scenario pages before the real Phase 1 corpus exists — without weakening the production publish gate. Taxonomy seeds (C1–C12, R1–R12) are reference data, not fixtures, and render in both profiles.

---

## 12. Testing Strategy

- **Unit (Vitest):** pure functions — `adrs.ts`, `confidence.ts`, `integrity.ts` helpers, URL-state encode/decode for the calculator.
- **Integration (Vitest):** run the full validation+integrity pipeline over fixtures; assert good fixtures pass and crafted-bad fixtures fail with the right error.
- **E2E (Playwright):** critical user paths (§15 below); a11y (axe) and console-error assertions.
- **Perf (Lighthouse CI):** home, one instrument, one scenario ≥90 (NFR-2).

### 12.1 Unit test cases (must include)
All numeric assertions compare **raw full-precision** values with absolute tolerance **±0.001** (SPEC §13.7). Do **not** chain rounded intermediates.
1. `inherentRisk` for Aria dims {A3,T3,D3,E2,R2} = **66.25**.
2. Aria `mitigationCredit([M2,M3,M4,M5,M8])` = **0.29**; `residualRisk(66.25, 0.29)` = **47.0375**.
3. Aria full chain, unrounded intermediates: `adrs(residualRisk(66.25,0.29), 1.20)` = **56.445** → `tierOf` = **high**; SG/US `adrs(residualRisk(66.25,0.29), 1.10)` = **51.74125** → **high**. (`displayScore` → 47.0, 56.4, 51.7.)
4. Sentinel dims {A3,T4,D1,E1,R3} inherent = **62.5**; credit [M2,M3,M4,M6,M7,M9] = **0.32**; residual = **42.5** → tier **moderate**.
5. Mira dims {A2,T1,D3,E3,R3} inherent = **58.75**; credit [M3,M5,M8] = **0.15**; residual = **49.9375**; CN `adrs(49.9375, 1.30)` = **64.91875** → **high**; EU `adrs(49.9375, 1.25)` = **62.421875** → **high**.
6. Mitigation cap: sum of all M1..M9 (0.50) clamps to **0.40**, `creditCapped=true`.
7. **J invariant (CB-5):** all four J components = 1 → `jMultiplier` = **1.30** exactly (1.00 + 0.10 + 0.05 + 0.05 + 0.10 = 1.30; the cap is a defensive no-op at these weights). **Property test:** for every combination of the four 0/1 components, `jMultiplier` ∈ [1.00, 1.30] and never exceeds 1.30.
8. ADRS cap: `adrs(90, 1.30)` = 117 → clamps to **100** → tier **critical**.
9. **`tierOf` half-open boundaries (CB-2):** `tierOf(24.999)` = low; `tierOf(25.000)` = moderate; `tierOf(49.999)` = moderate; `tierOf(50.000)` = high; `tierOf(74.999)` = high; `tierOf(75.000)` = critical; `tierOf(100)` = critical; `tierOf(0)` = low.
10. Confidence propagation: inference with based_on facts {high, medium} → capped ≤ **medium**; translation-only fact → ≤ **medium**; proposed-status enactment prediction → ≤ **low**.
11. Calculator URL encode/decode round-trips dims/mitigations/J exactly.
12. `displayScore` rounds to 1 dp and its output is never re-entered into the formula (guard test: `adrs(residualRisk(66.25,0.29),1.20)` ≠ `adrs(47.0,1.20)` — the raw path yields 56.445, the wrongly-rounded path 56.4).

### 12.2 Integration test cases (must include)
1. Provision missing `source_id` → publish rejected (§24.1).
2. Provision with only a Tier-3 citation on a fact block → rejected (§24.6).
3. Assessment with a blank dimension justification → rejected (§24.2).
4. Assessment with author-supplied `final` → rejected (§9/§18.3).
5. Assessment whose stored `final` ≠ recompute → rejected (§24.4) (test by corrupting a fixture).
6. Quote of 60 words / 400 chars → rejected (OD-3).
7. `quote_translated` without `translation_source_id` → rejected (OD-4).
8. Orphan source (unreferenced) → rejected (§24.10).
9. Mapping referencing a non-existent capability id → rejected (§24.11).
10. Enum violation (`instrument_type:'law'`) → rejected (§24.12).
11. Published provision with zero capability and zero risk maps → rejected (§24.1).
12. Confidence exceeding cap (e.g., high on translation-only) → rejected (§22).
13. **A/T/R invariance (rule 13):** a scenario whose four assessments have differing A (or T or R) → rejected; a scenario with differing D and a non-empty `divergence_justification` → **accepted**; differing D with empty justification → rejected.
14. **Fixture profile isolation (CB-4):** a `fixture:true` file present under `BUILD_PROFILE=production` → build fails; the same file under `BUILD_PROFILE=fixtures` → renders with the FIXTURE banner.
15. Whole-instrument citation `pin_cite:"(instrument as a whole)"` → accepted; empty `pin_cite` → rejected (MN-5).

### 12.3 Playwright critical paths
**MJ-10 — expectations load from fixtures, not literals.** Scenario/e2e assertions (P-4 especially) MUST read expected ADRS numbers/tiers from the fixture files (the built dataset), never hardcode `64.9`/`High` in the test, because Phase 2 research may legitimately revise J. Only the **pure formula unit tests** (§12.1) hardcode values — they test math with explicit inputs. E2E runs under `BUILD_PROFILE=fixtures`.
1. **P-1 Instrument status (AC-9a):** Home → EU jurisdiction → open AI Act → assert type/bindingness/lifecycle chips + dated source visible.
2. **P-2 Typed chain (UF-2):** Scenario Aria → open a provision → assert ■ fact + ▲ inference + ● recommendation all present with labels, and a control link resolves.
3. **P-3 Calculator (AC-9c):** `/risk-score` → set dims → toggle a mitigation → assert live inherent/residual/final + tier update; verify cap message appears when >0.40; assert URL updates and reload reproduces state.
4. **P-4 Scenario worksheet reproduction:** open Mira → assert CN and EU tiers and displayed scores **equal the values read from the built fixture dataset** (not literals, MJ-10).
5. **P-5 Epistemic legend (AC-9b):** any content page → legend present; a fact block has citation popover; a recommendation has no confidence chip.
6. **P-6 Filters:** jurisdiction page → apply type+approach filters → URL reflects state → result count correct → empty state on impossible combo.
7. **P-7 a11y:** axe scan on home, instrument, provision, risk-score, scenario → no serious/critical violations; keyboard-only calculator operation.
8. **P-8 No console errors** on all above.

---

## 13. CI Checks (`.github/workflows/ci.yml`)

Order (fail-fast per job, but run all to report):
1. `lint` (ESLint) + `format:check` (Prettier).
2. `typecheck` (tsc --noEmit).
3. `validate` (Zod over `/content`).
4. `integrity` (publish gates + ADRS recompute ±0.001 + confidence + FKs + enums + orphan sources + **rule 13 A/T/R invariance** + effective-bindingness resolution).
5. `test:unit` + `test:integration` (Vitest).
6. `build` — runs twice: `BUILD_PROFILE=fixtures` (for e2e) and `BUILD_PROFILE=production` (the deployable artifact; fails if any `fixture:true` file is present).
7. `linkcheck` — **warning-tier** (retry + backoff + host allowlist, MJ-7); does not fail the build on transient 403/429/timeout for allowlisted hosts. A Tier 1 source with no resolving URL **and** no `archived_url` **and** no logged manual verification is a hard failure.
8. `test:e2e` (Playwright against the `BUILD_PROFILE=fixtures` `/dist`) incl. axe.
9. `lighthouse` (≥90 on 3 pages, incl. SEO — see SEO checklist §16.1).
**Deploy only the `production`-profile `/dist`, and only if all jobs green** (NFR-5 reproducibility: a clean clone runs 1–6 successfully). CI must block deployment of any `fixtures`-profile build (CB-4).

---

## 14. Deployment Assumptions

- Output `/dist` deployed to a static host (GitHub Pages / Netlify / Vercel static) (NFR-1).
- No runtime env/config needed to serve; all computation at build.
- Published site shows build date + content version (NFR-6) sourced from `AtlasDataset.meta`.
- Print styles for memo/brief/methodology (NFR-9); PDFs pre-generated at build and served from `/downloads`.
- Optional cookieless analytics via a single static beacon (NFR-7); off by default.

---

## 15. Environment Variables

MVP requires **none at runtime**. Build-time:
| Var | Purpose | Default |
|-----|---------|---------|
| `BUILD_PROFILE` | `fixtures` \| `production` (CB-4). `production` is required to deploy; `fixtures` renders approved §14 examples behind the FIXTURE banner and is blocked from deploy | `production` |
| `SITE_URL` | canonical URL for sitemap/OG (SEO §16.1) | localhost |
| `CONTENT_VERSION` | stamped into `meta.contentVersion` | git short SHA |
| `ANALYTICS_BEACON_URL` | optional cookieless **page-count** counter (NFR-7; MN-7) | unset (disabled) |
| `LINKCHECK_OFFLINE` | skip external link check locally | false |
| `LINKCHECK_ALLOWLIST` | comma-separated hosts treated as warning-tier on transient failure (MJ-7) | built-in list incl. cac.gov.cn, eur-lex.europa.eu |
No secrets ship in the client bundle (PRD §23).

---

## 16. Logging & Error Handling

- **Build/CI:** structured, aggregated error report (never fail on first error only) — list every file+path+rule that failed so a research author can fix a batch in one pass. Exit non-zero on any failure.
- **Client:** the only interactive component (calculator) must never throw on bad URL params — clamp/reset with a non-blocking notice (PRD §21). Wrap the island in an error boundary that degrades to the default (all-zero) state rather than a blank page.
- **404:** static 404 page.
- No client telemetry of errors beyond optional anonymous page counts (NFR-7).

### 16.1 SEO implementation checklist (supports NFR-2 Lighthouse SEO ≥90 — MN-14)
The SEO score is a *caused* outcome, not an assertion. Each page must ship: a unique `<title>` and `<meta name="description">`; canonical URL (`SITE_URL`); semantic landmarks and one `<h1>`; descriptive `alt` on non-decorative images; OpenGraph/Twitter tags on Home and scenario pages; a generated `sitemap.xml` and `robots.txt`; valid `lang` on `<html>` and on original-language quotes (NFR-8); crawlable static links (no JS-only navigation). If the SEO target is later dropped, remove it from NFR-2 rather than leaving it unbacked.

---

## 17. Known Technical Risks (from §27 SPEC + build-specific)

| Risk | Mitigation |
|------|-----------|
| Formula drift between UI and build (P5) | single `adrs.ts` imported by both; unit tests on §14 examples **[LOCKED]** |
| Float rounding makes §14 examples miss tier boundaries | full-precision math, round only for display; tier from unrounded score; tests pin exact expected values |
| Dead citation links at demo (P9) | warning-tier link checker (retry + allowlist, MJ-7) + **`archived_url` required for all Tier 1** |
| Fixture data leaking into production (CB-4) | `BUILD_PROFILE` gate; CI blocks deploy of fixtures profile; `fixture:true` in production fails build |
| Content pipeline lets bad data publish (P6) | integrity checks independent of reviewer diligence; crafted-bad fixtures in tests |
| Compare matrix cost/complexity (P7) | degrade to static table; build aggregation offline |
| SQLite FK enforcement off by default | pipeline does explicit referential-integrity checks regardless of DB |
| Schema §17 vs §18 divergence (epistemic_blocks, translation_source_id, quote unit) | see OD-1/3/4; add columns/fields, update SPEC on confirmation |

---

## 18. Phase 0 Definition of Done (SPEC §26)

Phase 0 is a **2–3 day scope** (SPEC §26): normative schemas, formula module, tests, fixtures, low-fidelity **wireframes**, and validation rules — **not** rendered page templates and **not** the full design system (those move to P1, per MJ-9). Codex can complete Phase 0 with this doc alone:
1. Repo + CI skeleton (§13).
2. `/src/lib/zod` (normative, §8) + `/schemas` illustrative mirror of §18.
3. `adrs.ts` implemented with the unit tests in §12.1 green, incl. half-open `tierOf` boundaries and full-precision convention **[LOCKED]**.
4. Seed files: `capabilities.json`, `risks.json`, enum constants; three scenarios + 12 assessment fixtures reproducing §14 (with capability intensities per §10 scale), marked `fixture:true` (§11).
5. Validation+integrity pipeline producing `/data/atlas.json` from fixtures under `BUILD_PROFILE=fixtures`, with crafted-bad-fixture integration tests (§12.2, incl. rule 13 and fixture-isolation tests).
6. **Low-fidelity wireframes** (not rendered templates) for the 5 core pages (home, jurisdiction, instrument, scenario, calculator) — design deliverable, owned with design.
*Gate:* schemas validate sample records; formula tests green (SPEC §26 Phase 0 gate). **Rendered templates and the badge/design system are P1**, built against the fixtures profile.

---

## 19. Sequencing (SPEC §26)

Phase 0 Foundations → Phase 1 Research (EU→US→CN→SG) → Phase 2 Analysis (controls, mappings, assessments, compare, glossary) → Phase 3 Build & polish (all pages, calculator UI, exports, a11y/perf, cold-reader test). Engineering owns Phase 0 and Phase 3 build; policy research owns Phase 1 and the analytical content of Phase 2.

---

## 20. Decisions That Must Not Change Without Updating SPEC.md **[LOCKED]**

1. ADRS formula, weights (A.25/T.20/D.20/E.15/R.20), mitigation credits (M1..M9 values), 0.40 credit cap, J formula + component weights, 1.30 J cap, 100 ADRS cap, **half-open tier boundaries** [0,25)/[25,50)/[50,75)/[75,100] (§12), the capability-intensity 0–4 scale (§10), and the full-precision/±0.001 numeric convention (§13.7).
2. Taxonomy IDs and enums: C1–C12, R1–R12, M1–M9, A/T/D/E/R, instrument types, bindingness, lifecycle statuses, approach tags, obligation types, mapping strength/relation, confidence levels, tiers (§8–11, §13, §15).
3. Epistemic model: Fact/Inference/Recommendation definitions, required fields, "no mixed blocks," recommendations carry no confidence (§20).
4. Citation model: Tier 1/2/3 hierarchy, "Tier 3 never cites a fact," quote ≤50 words, translation flags, confidence caps (§7, §21, §22).
5. Publish integrity rules (§17 / PRD §24) and human-review states (§19).
6. Non-goals: no chatbot, no runtime LLM, no server mutation, no extra jurisdictions, hypothetical-only scenarios, not legal advice (§4, §5).
7. Single canonical `adrs.ts` shared by UI and build (§25 assumptions).

Any change here requires editing `SPEC.md` first, then this handoff.
