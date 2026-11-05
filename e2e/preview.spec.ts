import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import previewInstruments from '../src/data/content/instruments.json';

const PREVIEW_INSTRUMENTS = previewInstruments.filter((instrument) =>
  ['eu-gdpr', 'us-co-sb26-189', 'us-eo-14179', 'cn-ai-labeling-measures', 'cn-genai-interim-measures', 'sg-mgf-genai'].includes(instrument.id),
);

const routes = [
  '/', '/instruments', '/instruments/eu-gdpr', '/provisions/eu-gdpr%3Aart22',
  '/instruments/us-co-sb26-189', '/instruments/us-eo-14179',
  '/instruments/cn-ai-labeling-measures', '/instruments/cn-genai-interim-measures',
  '/provisions/cn-genai-interim-measures%3Aart9', '/instruments/sg-mgf-genai',
  '/compare', '/controls', '/bibliography', '/downloads', '/methodology',
  '/risk-management', '/policy-refresh', '/executive-brief', '/work-samples',
];

test('all preview routes render with persistent boundaries', async ({ page }) => {
  for (const route of routes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBeLessThan(400);
    await expect(page.getByTestId('preview-banner'), route).toContainText('AI-ASSISTED RESEARCH PREVIEW');
    await expect(page.locator('body'), route).not.toContainText('EU AI Act');
    await expect(page.locator('body'), route).not.toContainText('ARIA');
  }
});

test('curated snapshot content, dependencies, sources, and exports are complete', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.getByTestId('preview-summary')).toContainText('6 instruments · 2 provisions · 4 jurisdictions');
  await expect(page.getByTestId('preview-summary')).toContainText('Curated research snapshot');
  await expect(page.getByTestId('preview-summary')).toContainText('last verified 2026-08-07');
  await expect(page.locator('main')).not.toContainText('Golden 8');
  const jurisdictionLinks = page.locator('.jurisdiction-grid a');
  await expect(jurisdictionLinks).toHaveCount(4);
  expect(await jurisdictionLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href')))).toEqual(['/jurisdictions/us', '/jurisdictions/eu', '/jurisdictions/sg', '/jurisdictions/cn']);
  for (const [index, jurisdiction] of ['us', 'eu', 'sg', 'cn'].entries()) {
    const count = PREVIEW_INSTRUMENTS.filter((instrument) => instrument.jurisdiction_id === jurisdiction).length;
    await expect(jurisdictionLinks.nth(index)).toContainText(`${count} scoped ${count === 1 ? 'instrument' : 'instruments'}`);
  }
  await expect(page.locator('.signal-card')).toHaveCount(7);
  await expect(page.getByRole('heading', { name: 'California transparency scope could expand immediately if SB 1000 passes' })).toBeVisible();
  await expect(page.getByText('It is not current law.', { exact: false })).toBeVisible();

  await page.goto('/instruments');
  await expect(page.locator('tbody tr')).toHaveCount(6);
  await page.goto('/instruments/eu-gdpr');
  const official = page.getByRole('heading', { name: 'Official sources' }).locator('xpath=following-sibling::ul[1]').getByRole('link');
  await expect(official.first()).toHaveAttribute('href', /^https:\/\//);

  await page.goto('/provisions/eu-gdpr%3Aart22');
  await expect(page.locator('blockquote')).toContainText('based solely on automated processing');
  await expect(page.locator('blockquote')).toContainText('legal effects concerning him or her or similarly significantly affects him or her');
  await expect(page.locator('.ep-block a[href^="https://"]').first()).toBeVisible();

  await page.goto('/provisions/cn-genai-interim-measures%3Aart9');
  await expect(page.getByText('第九条 (Article 9)')).toBeVisible();
  await expect(page.locator('blockquote')).toContainText('提供者应当依法承担网络信息内容生产者责任');
  await expect(page.getByText('K04', { exact: false }).first()).toBeVisible();
  await expect(page.getByText('K13', { exact: false }).first()).toBeVisible();

  await page.goto('/instruments/sg-mgf-genai');
  await expect(page.getByText('Context instrument — no provision-level mapping in the current preview.')).toBeVisible();
  await page.goto('/instruments/us-co-sb26-189');
  await expect(page.getByText('Some associated provisions remain outside the approved preview set.', { exact: false })).toBeVisible();

  const exportPaths = ['/downloads/golden-8-preview.json', '/downloads/golden-8-preview.csv', '/downloads/golden-8-manifest.json', '/downloads/golden-8-source-register.md'];
  for (const exportPath of exportPaths) expect((await request.get(exportPath)).ok(), exportPath).toBe(true);
  const json = await (await request.get(exportPaths[0]!)).json();
  expect(json.records).toHaveLength(8);
  const csv = await (await request.get(exportPaths[1]!)).text();
  expect(csv.trim().split('\n')).toHaveLength(9);

  await page.goto('/work-samples');
  await expect(page.locator('.proof-section')).toHaveCount(0);
  await expect(page.locator('.sample-card')).toHaveCount(14);
  const sampleLinks = page.locator('.sample-primary-link');
  await expect(sampleLinks).toHaveCount(14);
  const hrefs = await sampleLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(new Set(hrefs).size).toBe(14);

  await page.goto('/compare');
  await expect(page.locator('.decision-comparison-table tbody tr')).toHaveCount(4);
  await expect(page.getByText('Binding departmental rule + non-binding opinion and cooperation initiative')).toBeVisible();
  await expect(page.getByText('Structured coverage appendix')).toBeVisible();
  await expect(page.getByText('— means no currently applicable binding provision identified in the scoped corpus; this does not mean no applicable legal obligation exists.')).toBeVisible();
  const unmapped = page.getByTestId('unmapped-provision');
  expect(await unmapped.count()).toBeGreaterThan(0);
  await expect(unmapped.first().locator('[aria-hidden="true"]')).toHaveText('—');
  await expect(page.locator('.coverage-appendix table').getByText('0', { exact: true })).toHaveCount(0);

  await page.goto('/executive-brief');
  await expect(page.getByText('Do not issue a single global launch approval based on this preview alone.')).toBeVisible();
  await expect(page.getByText('Proceed with reusable control development and require product-specific, market-specific review before deployment.')).toBeVisible();

  await page.goto('/controls');
  await expect(page.getByText('Derived controls are implementation recommendations, not direct statutory requirements.')).toBeVisible();
  await expect(page.getByText('Policy rationale / derived governance mapping:', { exact: true }).first()).toBeVisible();

  await page.goto('/policy-refresh');
  await expect(page.getByRole('heading', { name: 'Current law, one pending trigger, and coverage corrections.' })).toBeVisible();
  await expect(page.locator('.refresh-card')).toHaveCount(4);
  await expect(page.getByText('Regulation (EU) 2026/1744 published and in force')).toBeVisible();
  await expect(page.getByText('A scoped rule is in force; a separate agent opinion signals direction')).toBeVisible();
  await expect(page.locator('.refresh-card .signal-source a')).toHaveCount(10);

  await page.goto('/methodology');
  await expect(page.locator('.trust-model-grid li')).toHaveCount(4);
  await expect(page.getByText('2026-08-06 · change refresh', { exact: false })).toBeVisible();
  await expect(page.getByText('2026-08-07 · targeted verification pass', { exact: false })).toBeVisible();
  await expect(page.getByText('2026-08-13 · bounded official-source refresh', { exact: false })).toBeVisible();
  await expect(page.getByText('SB 1000 as a pending proposal, not current law', { exact: false })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open the applied AI RMF', exact: false })).toHaveAttribute('href', '/risk-management');
  const knownLimitsHeading = page.getByRole('heading', { level: 2, name: 'Known limits' });
  const appendixHeading = page.getByRole('heading', { level: 2, name: 'ADRS prioritization model' });
  await expect(knownLimitsHeading).toBeVisible();
  await expect(appendixHeading).toBeVisible();
  expect(await knownLimitsHeading.evaluate((heading) => {
    const appendix = document.getElementById('method-adrs-appendix-title');
    return appendix !== null && Boolean(heading.compareDocumentPosition(appendix) & Node.DOCUMENT_POSITION_FOLLOWING);
  })).toBe(true);
  await expect(page.getByText('Advanced method / appendix', { exact: true })).toBeVisible();
  const formulaDetails = page.locator('.method-appendix details');
  expect(await formulaDetails.getAttribute('open')).toBeNull();
  await expect(formulaDetails.locator('pre')).not.toBeVisible();

  await page.goto('/risk-management');
  await expect(page.locator('.rmf-function-card')).toHaveCount(4);
  await expect(page.locator('[data-epistemic-kind="fact"]')).toHaveCount(5);
  await expect(page.locator('[data-epistemic-kind="proposal"]')).toHaveCount(5);
  await expect(page.locator('[data-epistemic-kind="question"]')).toHaveCount(4);
  await expect(page.locator('.rmf-function-card h3')).toHaveText(['GOVERN', 'MAP', 'MEASURE', 'MANAGE']);
  await expect(page.locator('[data-evidence-boundary="public-information-only"]')).toContainText('not a claim that Tencent has adopted the framework');
  await expect(page.locator('a[href="https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.100-1.pdf"]')).toHaveCount(1);
  await expect(page.locator('a[href="https://www.tencent.com/tencent-hunyuan-officially-releases-hy3-advancing-agent-capabilities-and-deeper-product-integration/"]')).toHaveCount(2);

  const portfolioPaths = [
    '/downloads/global-ai-policy-intelligence-brief.md',
    '/downloads/policy-refresh-2026-08-06.md',
    '/downloads/emerging-tech-policy-radar.md',
    '/downloads/business-implications-matrix.md',
    '/downloads/policy-position-note-sample.md',
    '/downloads/meeting-brief-sample.md',
    '/downloads/adrs-sensitivity-note.md',
    '/downloads/stakeholder-landscape.json',
    '/downloads/policy-memo-human-oversight-and-disclosure.md',
    '/downloads/consultation-response-sample.md',
    '/downloads/speaking-brief-sample.md',
    '/downloads/industry-initiatives-tracker.md',
    '/downloads/policy-corpus-descriptive-analysis.md',
    '/downloads/tencent-public-information-implications-brief.md',
    '/downloads/Global_AI_Policy_Executive_Briefing.pptx',
  ];
  for (const portfolioPath of portfolioPaths) expect((await request.get(portfolioPath)).ok(), portfolioPath).toBe(true);
});

test('language selection localizes core routes and persists without changing evidence', async ({ page }) => {
  await page.goto('/');
  const selector = page.locator('#site-language');
  await expect(selector).toHaveValue('en');
  await expect(selector.locator('option')).toHaveCount(4);
  await expect(selector.locator('option')).toHaveText(['English', '简体中文', 'Español', 'Português']);

  await selector.selectOption('zh');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');
  await expect(page.getByRole('navigation', { name: '主要导航' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 1, name: '从政策变化到产品决策。' })).toBeVisible();
  await expect(page.getByRole('heading', { level: 2, name: '按司法管辖区探索政策' })).toBeVisible();
  await page.reload();
  await expect(selector).toHaveValue('zh');
  await expect(page.locator('html')).toHaveAttribute('lang', 'zh-CN');

  await page.getByRole('link', { name: '带日期更新', exact: true }).click();
  await expect(page).toHaveURL(/\/policy-refresh$/);
  await expect(page.getByRole('heading', { level: 1, name: '现行法、一个待审触发点，以及来源覆盖修正。' })).toBeVisible();
  await expect(page.getByText('PS-EU-OMNIBUS-2026', { exact: true }).first()).toBeVisible();

  await selector.selectOption('es');
  await expect(page.locator('html')).toHaveAttribute('lang', 'es');
  await expect(page.getByRole('heading', { level: 1, name: 'Ley vigente, un desencadenante pendiente y correcciones de cobertura.' })).toBeVisible();
  await page.getByRole('link', { name: 'Comparar', exact: true }).click();
  await expect(page).toHaveURL(/\/compare$/);
  await expect(page.locator('.decision-comparison-table tbody tr')).toHaveCount(4);

  await selector.selectOption('pt');
  await page.getByRole('link', { name: 'Amostras', exact: true }).click();
  await expect(page).toHaveURL(/\/work-samples$/);
  await expect(page.locator('html')).toHaveAttribute('lang', 'pt');
  await expect(page.getByRole('heading', { level: 1, name: 'Pesquisa aplicada sobre políticas globais de IA, traduzida em decisões' })).toBeVisible();
  await expect(page.locator('.sample-card')).toHaveCount(14);
  await expect(page.locator('.sample-primary-link').first()).not.toContainText('(English)');
  await expect(page.locator('.sample-primary-link').nth(1)).toContainText('(em inglês)');

  await page.evaluate(() => window.localStorage.clear());
  await page.reload();
  await expect(selector).toHaveValue('en');
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
});

test('localized header stays within the mobile document width', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  await page.goto('/');
  await page.locator('#site-language').selectOption('es');
  const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth + 1);
  await expect(page.locator('#site-language')).toBeVisible();
});

test('applied AI RMF preserves evidence links and responsive reading order across languages', async ({ page }) => {
  const sourceSelector = '.rmf-sources a[href^="https://"]';
  const expectedFunctions = ['GOVERN', 'MAP', 'MEASURE', 'MANAGE'];
  let canonicalSources: string[] = [];

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/risk-management');
  canonicalSources = await page.locator(sourceSelector).evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''));

  for (const locale of ['en', 'zh', 'es', 'pt']) {
    await page.locator('#site-language').selectOption(locale);
    await expect(page.locator('.rmf-function-card h3')).toHaveText(expectedFunctions);
    await expect(page.locator('[data-evidence-boundary="public-information-only"]')).toBeVisible();
    expect(await page.locator(sourceSelector).evaluateAll((links) => links.map((link) => link.getAttribute('href') ?? ''))).toEqual(canonicalSources);
  }

  for (const width of [900, 390, 320]) {
    await page.setViewportSize({ width, height: 900 });
    await page.locator('#site-language').selectOption(width === 900 ? 'es' : 'pt');
    const dimensions = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
    expect(dimensions.scrollWidth, `viewport ${width}px`).toBeLessThanOrEqual(dimensions.clientWidth + 1);
    await expect(page.locator('.rmf-function-card')).toHaveCount(4);
  }
});

test('capture intended desktop and mobile QA evidence', async ({ page }) => {
  test.skip(process.env.CAPTURE_QA_SCREENSHOTS !== '1', 'Evidence capture is opt-in outside CI');
  const output = path.join(process.cwd(), 'design', 'screenshots', 'golden-8-final-qa');
  fs.mkdirSync(output, { recursive: true });
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const [name, route] of [['dashboard', '/'], ['tracker', '/instruments'], ['gdpr-art22', '/provisions/eu-gdpr%3Aart22'], ['china-art9', '/provisions/cn-genai-interim-measures%3Aart9'], ['comparison', '/compare']] as const) {
    await page.goto(route); await page.screenshot({ path: path.join(output, `desktop-${name}.png`) });
  }
  await page.setViewportSize({ width: 390, height: 844 });
  for (const [name, route] of [['dashboard', '/'], ['tracker', '/instruments'], ['gdpr-art22', '/provisions/eu-gdpr%3Aart22']] as const) {
    await page.goto(route); await page.screenshot({ path: path.join(output, `mobile-${name}.png`) });
  }
});
