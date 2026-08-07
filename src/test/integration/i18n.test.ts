import fs from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import capabilities from '../../data/seeds/capabilities.json';
import controls from '../../data/content/controls.json';
import {
  EXECUTIVE_MARKETS,
  POLICY_REFRESH_CHANGES,
  PORTFOLIO_MONITORING_LOG,
  PORTFOLIO_SIGNALS,
} from '../../lib/portfolio/policySignals';
import {
  DEFAULT_LANGUAGE,
  htmlLangFor,
  isLanguageCode,
  LANGUAGE_CODES,
  LANGUAGE_STORAGE_KEY,
  LANGUAGES,
  languageBootstrapScript,
} from '../../lib/i18n/config';
import { TRANSLATIONS, translatedText } from '../../lib/i18n/translations';

const CORE_FILES = [
  'src/app/layout.tsx',
  'src/components/FixtureBanner.tsx',
  'src/app/page.tsx',
  'src/app/policy-refresh/page.tsx',
  'src/app/executive-brief/page.tsx',
  'src/app/compare/page.tsx',
  'src/app/controls/page.tsx',
  'src/app/work-samples/page.tsx',
  'src/app/methodology/page.tsx',
  'src/app/risk-management/page.tsx',
  'src/app/provisions/[id]/page.tsx',
  'src/components/semantic.tsx',
  'src/app/instruments/page.tsx',
  'src/app/instruments/[id]/page.tsx',
  'src/components/InstrumentTracker.tsx',
  'src/app/bibliography/page.tsx',
  'src/app/downloads/page.tsx',
  'src/app/changelog/page.tsx',
  'src/app/glossary/page.tsx',
  'src/app/about/page.tsx',
  'src/app/jurisdictions/page.tsx',
  'src/app/jurisdictions/[id]/page.tsx',
  'src/app/scenarios/page.tsx',
  'src/app/scenarios/[id]/page.tsx',
  'src/app/taxonomy/capabilities/page.tsx',
  'src/app/taxonomy/policy/page.tsx',
  'src/app/taxonomy/risks/page.tsx',
  'src/app/risk-score/page.tsx',
  'src/components/AdrsCalculator.tsx',
] as const;

const SAMPLE_IDS = [
  'policy-refresh', 'global-intelligence', 'oversight-memo', 'compute-radar',
  'business-matrix', 'agent-position', 'stakeholder-brief', 'consultation-response',
  'speaking-brief', 'industry-tracker', 'adrs-note', 'corpus-analysis',
  'tencent-brief', 'executive-deck',
] as const;

const DOWNLOAD_IDS = [
  'policy-refresh', 'portfolio-pack', 'executive-brief', 'policy-memo', 'executive-deck',
  'intelligence-brief', 'technology-radar', 'business-matrix', 'tencent-brief',
  'position-note', 'consultation-response', 'speaking-brief', 'industry-tracker', 'meeting-brief',
  'stakeholder-landscape', 'adrs-note', 'corpus-analysis', 'source-register', 'preview-json',
  'preview-csv', 'publication-manifest', 'methodology', 'control-mapping', 'dataset-status',
] as const;

const PUBLIC_AUDIENCE_LEAK = /\b(?:interview\w*|second[-\s]+round|six[-\s]+minute|hiring[-\s]+managers?|entrevistas?)\b|面试|二轮|第二轮|六分钟|招聘(?:经理|负责人)|segunda\s+(?:ronda|rodada|entrevista)|seis\s+minutos|(?:responsable|responsável|gerente|gestor(?:a)?|encargad[oa])\s+(?:de|pela)\s+contrata(?:ción|ção)/iu;
const PUBLIC_TEXT_FILES = [
  'README.md',
  ...fs.readdirSync(path.join(process.cwd(), 'public/downloads'))
    .filter((filename) => /\.(?:md|json|csv|txt|html|srt)$/i.test(filename))
    .map((filename) => path.join('public/downloads', filename)),
] as const;

function literalKeys() {
  const keys = new Set<string>();
  const pattern = /<LocalizedText\s+id="([^"]+)"/g;
  for (const filename of CORE_FILES) {
    const source = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');
    for (const match of source.matchAll(pattern)) keys.add(match[1]!);
  }
  return [...keys];
}

function dynamicKeys() {
  const keys = new Set<string>();
  const add = (...values: string[]) => values.forEach((value) => keys.add(value));

  for (const profile of ['preview', 'fixtures', 'production']) {
    for (const field of ['eyebrow', 'title', 'lede', 'primaryLabel', 'secondaryLabel', 'footnote', 'postureLabel', 'postureTitle', 'postureText', 'gate']) {
      add(`home.${profile}.${field}`);
    }
    add(`home.status.${profile}`);
  }
  for (const capability of ['monitor', 'synthesize', 'translate', 'engage', 'calibrate']) {
    add(`home.capability.${capability}.title`, `home.capability.${capability}.text`);
  }
  for (const signal of PORTFOLIO_SIGNALS.slice(0, 4)) {
    for (const field of ['market', 'title', 'fact', 'implication', 'owner', 'action', 'evidenceGate']) add(`signal.${signal.id}.${field}`);
  }
  for (const change of POLICY_REFRESH_CHANGES) {
    for (const field of ['market', 'effectiveDate', 'title', 'before', 'now', 'fact', 'decisionQuestion', 'owner', 'evidenceGate', 'action']) add(`refresh.change.${change.id}.${field}`);
  }
  for (const step of ['classify', 'trace', 'evidence', 'decide']) {
    add(`refresh.model.${step}.title`, `refresh.model.${step}.text`);
  }
  for (const market of EXECUTIVE_MARKETS) {
    for (const field of ['name', 'legalForm', 'signal', 'implication', 'owner', 'action', 'evidenceTrigger']) add(`market.${market.id}.${field}`);
  }
  for (const capability of capabilities) add(`capability.${capability.id}.name`);
  for (let index = 1; index <= 6; index += 1) add(`executive.risks.${index}`);
  for (let index = 1; index <= 4; index += 1) add(`executive.opportunities.${index}`);
  for (const step of ['policy', 'product', 'engineering', 'leadership']) {
    for (const field of ['owner', 'title', 'text', 'time']) add(`executive.plan.${step}.${field}`);
  }
  for (let index = 1; index <= 5; index += 1) add(`executive.gates.${index}`);
  for (const entry of PORTFOLIO_MONITORING_LOG) {
    add(`method.monitoring.${entry.date}.action`, `method.monitoring.${entry.date}.note`);
  }
  for (const sampleId of SAMPLE_IDS) {
    for (const field of ['type', 'title', 'proof', 'limit']) add(`workSamples.sample.${sampleId}.${field}`);
  }
  add('workSamples.sample.policy-refresh.secondary', 'workSamples.sample.stakeholder-brief.secondary');
  for (const control of controls) {
    for (const field of ['name', 'description', 'implementation', 'verification']) add(`control.${control.id}.${field}`);
  }
  for (const category of ['technical', 'process', 'organizational', 'documentation']) add(`controls.category.${category}`);
  for (const level of ['high', 'medium', 'low']) add(`evidence.confidence.${level}`);
  for (const level of ['binding', 'conditionally_binding', 'non_binding']) add(`value.bindingness.${level}`);
  for (const status of ['proposed', 'adopted_not_yet_applicable', 'in_force_partially_applicable', 'fully_applicable', 'amended', 'superseded', 'rescinded', 'expired', 'withdrawn']) add(`value.lifecycle.${status}`);
  for (const type of ['enacted_law', 'proposed_legislation', 'regulation', 'executive_action', 'regulator_guidance', 'voluntary_framework', 'technical_standard']) add(`value.instrumentType.${type}`);
  for (const type of ['obligation', 'prohibition', 'right', 'definition', 'enforcement', 'scope']) add(`value.obligation.${type}`);
  for (const level of ['direct', 'derived', 'prudential']) add(`value.mapping.${level}`);
  for (const relation of ['satisfies_in_part', 'supports_evidence', 'implements_general_duty']) add(`value.relation.${relation}`);
  for (const tier of ['low', 'moderate', 'high', 'critical']) add(`value.tier.${tier}`);

  for (const axis of ['jur', 'type', 'binding', 'lifecycle']) add(`instrument.filter.axis.${axis}`);
  for (const jurisdiction of ['us', 'eu', 'sg', 'cn']) add(`instrument.filter.jurisdiction.${jurisdiction}`);
  for (const term of ['agentic-ai', 'instrument', 'provision', 'adrs']) {
    add(`support.glossary.${term}.term`, `support.glossary.${term}.definition`);
  }
  for (const download of DOWNLOAD_IDS) {
    add(`support.downloads.file.${download}.name`, `support.downloads.file.${download}.description`);
  }
  for (const jurisdiction of ['us', 'eu', 'sg', 'cn']) add(`research.jurisdiction.${jurisdiction}.name`);
  for (const status of ['proposed', 'adopted_not_yet_applicable', 'in_force_partially_applicable', 'fully_applicable', 'amended', 'superseded', 'rescinded', 'expired', 'withdrawn']) add(`research.lifecycle.${status}`);
  for (const axis of ['instrumentType', 'bindingness', 'lifecycle', 'approach']) {
    add(`research.policyTaxonomy.${axis}.label`, `research.policyTaxonomy.${axis}.values`);
  }
  for (const dimension of ['A', 'T', 'D', 'E', 'R']) {
    add(`adrs.dimension.${dimension}`);
    for (let anchor = 0; anchor <= 4; anchor += 1) add(`adrs.anchor.${dimension}.${anchor}`);
  }
  for (let mitigation = 1; mitigation <= 9; mitigation += 1) add(`adrs.mitigation.M${mitigation}`);
  for (const component of ['binding_hit', 'near_term_hit', 'enforcement_posture', 'prohibition_adjacent']) add(`adrs.j.${component}`);
  return [...keys];
}

function placeholders(value: string) {
  return [...value.matchAll(/\{([a-zA-Z0-9_]+)\}/g)].map((match) => match[1]).sort();
}

describe('presentation-layer internationalization', () => {
  it('offers exactly four validated language options and maps the document language', () => {
    expect(LANGUAGE_CODES).toEqual(['en', 'zh', 'es', 'pt']);
    expect(LANGUAGES.map((language) => language.label)).toEqual(['English', '简体中文', 'Español', 'Português']);
    expect(htmlLangFor('zh')).toBe('zh-CN');
    expect(htmlLangFor('en')).toBe('en');
    expect(isLanguageCode('zh')).toBe(true);
    expect(isLanguageCode('de')).toBe(false);
    expect(DEFAULT_LANGUAGE).toBe('en');
  });

  it('has complete non-empty translations for every core static and dynamic UI key', () => {
    const required = new Set([...literalKeys(), ...dynamicKeys()]);
    for (const key of required) {
      expect(TRANSLATIONS[key], `missing translation key: ${key}`).toBeDefined();
      expect(TRANSLATIONS[key]!.zh.trim(), `${key}:zh`).not.toBe('');
      expect(TRANSLATIONS[key]!.es.trim(), `${key}:es`).not.toBe('');
      expect(TRANSLATIONS[key]!.pt.trim(), `${key}:pt`).not.toBe('');
    }
  });

  it('keeps interpolation variables aligned across translated languages', () => {
    for (const [key, translation] of Object.entries(TRANSLATIONS)) {
      const expected = placeholders(translation.zh);
      expect(placeholders(translation.es), `${key}:es placeholders`).toEqual(expected);
      expect(placeholders(translation.pt), `${key}:pt placeholders`).toEqual(expected);
    }
  });

  it('keeps public product copy free of recruiting and interview framing', () => {
    for (const filename of [...CORE_FILES, ...PUBLIC_TEXT_FILES]) {
      const source = fs.readFileSync(path.join(process.cwd(), filename), 'utf8');
      expect(source, filename).not.toMatch(PUBLIC_AUDIENCE_LEAK);
    }

    for (const [key, translation] of Object.entries(TRANSLATIONS)) {
      expect(Object.values(translation).join('\n'), key).not.toMatch(PUBLIC_AUDIENCE_LEAK);
    }
  });

  it('falls back safely and bootstraps only validated persisted values', () => {
    expect(translatedText('en', 'unknown', 'Canonical English')).toBe('Canonical English');
    expect(translatedText('zh', 'unknown', 'Canonical English')).toBe('Canonical English');
    const script = languageBootstrapScript();
    expect(script).toContain(LANGUAGE_STORAGE_KEY);
    expect(script).toContain('document.documentElement.dataset.locale');
    expect(script).toContain("document.documentElement.lang");
    expect(script).toContain("valid.indexOf(saved)>-1");
  });
});
