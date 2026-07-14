/**
 * BUILD_PROFILE=fixtures|preview|production.
 * - fixtures: renders fictional §14 fixtures behind the persistent
 *   "FIXTURE DATA — ILLUSTRATIVE ONLY" banner; local dev / tests / design review only.
 * - production: rejects fixtures, renders only the published subset, and
 *   requires independently approved publication evidence; the only profile
 *   permitted to deploy.
 * Methodology-protecting checks (ADRS recompute, A/T/R invariance, caps) run in BOTH profiles.
 */
export type BuildProfile = 'fixtures' | 'preview' | 'production';

export const FIXTURE_BANNER_TEXT = 'FIXTURE DATA — ILLUSTRATIVE ONLY';
export const PREVIEW_BANNER_TEXT = 'AI-ASSISTED RESEARCH PREVIEW';

export function getBuildProfile(env: NodeJS.ProcessEnv = process.env): BuildProfile {
  const raw = env.BUILD_PROFILE ?? 'production'; // fail-closed default
  if (raw === 'fixtures' || raw === 'preview' || raw === 'production') return raw;
  throw new Error(`Invalid BUILD_PROFILE "${raw}" — expected "fixtures", "preview", or "production"`);
}

/**
 * Guard: a fixtures-profile artifact must never be a production deployment.
 * Deploy environments set DEPLOY_ENV=production (see .env.example); CI blocks
 * the combination. Called at build time by scripts/validate.ts.
 */
export function assertNotFixtureDeploy(env: NodeJS.ProcessEnv = process.env): void {
  const profile = getBuildProfile(env);
  const productionDeployment = env.DEPLOY_ENV === 'production' || env.VERCEL_ENV === 'production';
  if (profile !== 'production' && productionDeployment) {
    throw new Error(
      'BUILD_PROFILE=fixtures or preview cannot be deployed to production (DEPLOY_ENV=production or VERCEL_ENV=production). Build with BUILD_PROFILE=production.',
    );
  }
}
