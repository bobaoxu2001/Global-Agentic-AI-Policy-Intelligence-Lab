import { expect, test } from '@playwright/test';

test('production routes exclude fixtures and describe the unpublished corpus truthfully', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('fixture-banner')).toHaveCount(0);
  await expect(page.getByText('No published content in this profile.')).toBeVisible();

  await page.goto('/instruments');
  await expect(page.getByTestId('fixture-banner')).toHaveCount(0);
  await expect(page.getByText('No published instruments in this profile.')).toBeVisible();
});
