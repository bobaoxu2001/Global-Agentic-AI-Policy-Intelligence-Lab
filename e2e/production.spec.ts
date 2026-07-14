import { expect, test } from '@playwright/test';

test('production routes exclude preview records while public portfolio files retain explicit boundaries', async ({ page, request }) => {
  await page.goto('/');
  await expect(page.getByTestId('fixture-banner')).toHaveCount(0);
  await expect(page.getByText('No published content in this profile.')).toBeVisible();

  await page.goto('/instruments');
  await expect(page.getByTestId('fixture-banner')).toHaveCount(0);
  await expect(page.getByText('No published instruments in this profile.')).toBeVisible();

  await page.goto('/executive-brief');
  await expect(page.getByRole('heading', { name: 'Executive policy analysis is available only in the interview preview.' })).toBeVisible();
  await expect(page.locator('.market-table')).toHaveCount(0);

  await page.goto('/work-samples');
  await expect(page.getByRole('heading', { name: 'Policy work samples are available only in the interview preview.' })).toBeVisible();
  await expect(page.locator('.sample-card')).toHaveCount(0);

  await page.goto('/downloads');
  await expect(page.getByRole('link', { name: /Global AI policy intelligence brief/i })).toHaveCount(0);
  await expect(page.getByRole('link', { name: /Methodology note/i })).toBeVisible();

  const publicSample = await request.get('/downloads/global-ai-policy-intelligence-brief.md');
  expect(publicSample.ok()).toBe(true);
  const sampleText = await publicSample.text();
  expect(sampleText).toContain('independent portfolio work sample');
  expect(sampleText).toContain('not legal advice');
  expect(sampleText).toContain('not affiliated with any company');
});
