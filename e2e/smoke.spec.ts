/**
 * Phase 0 e2e — critical flows under BUILD_PROFILE=fixtures.
 * Scenario expectations are read from fixture data files, never hardcoded (MJ-10).
 */
import { expect, test } from '@playwright/test';
import assessments from '../src/data/fixtures/assessments.json';
import scenarios from '../src/data/fixtures/scenarios.json';

test('every route shell renders with the fixture banner and no console errors', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(String(e)));
  const routes = ['/', '/instruments', '/compare', '/scenarios', '/calculator', '/controls', '/brief', '/methodology', '/changelog'];
  for (const r of routes) {
    await page.goto(r);
    await expect(page.getByTestId('fixture-banner')).toHaveText('FIXTURE DATA — ILLUSTRATIVE ONLY');
  }
  expect(errors).toEqual([]);
});

test('scenario page renders per-jurisdiction tiers computed from fixtures (MJ-10)', async ({ page }) => {
  const first = scenarios[0]!;
  await page.goto(`/scenarios/${first.id}`);
  await expect(page.getByRole('heading', { level: 1 })).toContainText(first.name.split(' — ')[0]!);
  const jurCount = assessments.filter((a) => a.scenario_id === first.id).length;
  await expect(page.locator('[data-testid="adrs-worksheets"] tbody tr')).toHaveCount(jurCount);
});

test('calculator: live arithmetic, cap notice, jurisdiction never auto-sets J (AC-ADRS-10)', async ({ page }) => {
  await page.goto('/calculator');
  // set A=3,T=3,D=3,E=2,R=2 (Aria dims)
  for (const [d, v] of [['A', 3], ['T', 3], ['D', 3], ['E', 2], ['R', 2]] as const) {
    await page.locator(`input[name="dim-${d}"]`).nth(v).check();
  }
  await expect(page.getByTestId('out-inherent')).toHaveText('66.25');
  // toggle M2,M3,M4,M5,M8 → credit 0.29, residual 47.0375
  for (const m of ['M2', 'M3', 'M4', 'M5', 'M8']) {
    await page.getByTestId(`mit-${m}`).check();
  }
  await expect(page.getByTestId('out-credit')).toHaveText('0.29');
  await expect(page.getByTestId('out-residual')).toHaveText('47.0375');
  // jurisdiction selection must NOT change J
  await expect(page.getByTestId('out-j')).toHaveText('1.00');
  await page.getByTestId('jurisdiction-select').selectOption('eu');
  await expect(page.getByTestId('out-j')).toHaveText('1.00');
  await expect(page.getByTestId('out-residual')).toHaveText('47.0375');
  // set J manually: binding+near+enforcement = 1.20 → final displays 56.4, tier high
  await page.getByTestId('j-binding_hit').check();
  await page.getByTestId('j-near_term_hit').check();
  await page.getByTestId('j-enforcement_posture').check();
  await expect(page.getByTestId('out-j')).toHaveText('1.20');
  await expect(page.getByTestId('out-final')).toHaveText('56.4');
  await expect(page.getByTestId('out-tier')).toContainText('high');
  // cap notice appears when all mitigations selected (0.50 → 0.40)
  for (const m of ['M1', 'M6', 'M7', 'M9']) {
    await page.getByTestId(`mit-${m}`).check();
  }
  await expect(page.getByTestId('cap-notice')).toBeVisible();
  await expect(page.getByTestId('out-credit')).toHaveText('0.40');
});

test('calculator permalink round-trips state (AC-ADRS-8) and anchor text updates', async ({ page }) => {
  await page.goto('/calculator?A=3&T=3&D=3&E=2&R=2&m=M2,M3,M4,M5,M8&binding=1&near=1&enf=1&proh=0');
  await expect(page.getByTestId('out-inherent')).toHaveText('66.25');
  await expect(page.getByTestId('out-credit')).toHaveText('0.29');
  await expect(page.getByTestId('out-j')).toHaveText('1.20');
  await expect(page.getByTestId('out-final')).toHaveText('56.4');
  await expect(page.getByTestId('anchor-A')).toContainText('hard policy limits');
  // invalid params clamp, never crash (AC-ERR-2)
  await page.goto('/calculator?A=9&T=-1&m=BOGUS,M2');
  await expect(page.getByTestId('out-inherent')).toHaveText('0.00');
  await expect(page.getByTestId('out-credit')).toHaveText('0.08');
});

test('tracker filters: OR within axis, AND across axes, URL state, empty state (AC-TRK-2/3/4)', async ({ page }) => {
  await page.goto('/instruments');
  const total = await page.locator('tbody tr').count();
  expect(total).toBeGreaterThanOrEqual(9);
  // AND across axes: jurisdiction=eu AND type=enacted_law
  await page.getByTestId('f-jur-eu').check();
  await page.getByTestId('f-type-enacted_law').check();
  await expect(page.getByTestId('result-count')).toContainText('3 of'); // eu-ai-act, eu-gdpr + the fictional EU fixture
  expect(page.url()).toContain('jur=eu');
  expect(page.url()).toContain('type=enacted_law');
  // OR within axis: add jurisdiction=us → grows
  await page.getByTestId('f-jur-us').check();
  await expect(page.getByTestId('result-count')).toContainText('5 of'); // + Colorado pair
  // impossible combo → empty state
  await page.getByTestId('f-lifecycle-withdrawn').check();
  await expect(page.getByTestId('empty-state')).toBeVisible();
  // clear all restores
  await page.getByTestId('clear-filters').click();
  await expect(page.locator('tbody tr')).toHaveCount(total);
  // URL round-trip: direct load with params applies filters
  await page.goto('/instruments?jur=cn');
  await expect(page.getByTestId('result-count')).toContainText('4 of'); // CN stack complete: 4 instruments
});
