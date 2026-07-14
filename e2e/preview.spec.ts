import { expect, test } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const routes = [
  '/', '/instruments', '/instruments/eu-gdpr', '/provisions/eu-gdpr%3Aart22',
  '/instruments/us-co-sb26-189', '/instruments/us-eo-14179',
  '/instruments/cn-ai-labeling-measures', '/instruments/cn-genai-interim-measures',
  '/provisions/cn-genai-interim-measures%3Aart9', '/instruments/sg-mgf-genai',
  '/compare', '/controls', '/bibliography', '/downloads', '/methodology',
  '/executive-brief', '/work-samples',
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

test('Golden 8 content, dependencies, sources, and exports are complete', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.getByTestId('preview-summary')).toContainText('6 instruments · 2 provisions · 4 jurisdictions');
  await expect(page.getByTestId('preview-summary')).toContainText('last verified 2026-07-13');

  await page.goto('/instruments');
  await expect(page.locator('tbody tr')).toHaveCount(6);
  await page.goto('/instruments/eu-gdpr');
  const official = page.getByRole('heading', { name: 'Official sources' }).locator('..').getByRole('link');
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
  await expect(page.locator('.sample-card')).toHaveCount(13);
  const sampleLinks = page.locator('.sample-primary-link');
  await expect(sampleLinks).toHaveCount(13);
  const hrefs = await sampleLinks.evaluateAll((links) => links.map((link) => link.getAttribute('href')));
  expect(new Set(hrefs).size).toBe(13);

  const portfolioPaths = [
    '/downloads/global-ai-policy-intelligence-brief.md',
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
