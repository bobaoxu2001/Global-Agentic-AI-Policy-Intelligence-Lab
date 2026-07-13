import { expect, test } from '@playwright/test';

test('preview banner persists and Golden 8 boundaries hold', async ({ page }) => {
  for (const route of ['/', '/instruments', '/compare', '/controls', '/bibliography', '/downloads']) {
    await page.goto(route);
    await expect(page.getByTestId('preview-banner')).toContainText('AI-ASSISTED RESEARCH PREVIEW');
  }
  await page.goto('/instruments');
  await expect(page.locator('tbody tr')).toHaveCount(6);
  await expect(page.getByText('EU AI Act', { exact: false })).toHaveCount(0);
  await page.goto('/provisions/eu-gdpr%3Aart22');
  await expect(page.locator('blockquote')).toContainText('based solely on automated processing');
  await page.goto('/provisions/cn-genai-interim-measures%3Aart9');
  await expect(page.getByText('第九条 (Article 9)')).toBeVisible();
  await page.goto('/instruments/sg-mgf-genai');
  await expect(page.getByText('Context instrument — no provision-level mapping in the current preview.')).toBeVisible();
  await page.goto('/instruments/us-co-sb26-189');
  await expect(page.getByText('Some associated provisions remain outside the approved preview set.')).toBeVisible();
});
