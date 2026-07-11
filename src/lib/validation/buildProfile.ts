/**
 * BUILD_PROFILE=fixtures|production (CB-4, ENG §10).
 * - fixtures: renders fictional §14 fixtures behind the persistent
 *   "FIXTURE DATA — ILLUSTRATIVE ONLY" banner; local dev / tests / design review only.
 * - production: rejects fixture records and non-published records; the only
 *   profile permitted to deploy.
 * Methodology-protecting checks (ADRS recompute, A/T/R invariance, caps) run in BOTH profiles.
 */
export type BuildProfile = 'fixtures' | 'production';

export const FIXTURE_BANNER_TEXT = 'FIXTURE DATA — ILLUSTRATIVE ONLY';

export function getBuildProfile(env: NodeJS.ProcessEnv = process.env): BuildProfile {
  const raw = env.BUILD_PROFILE ?? 'production'; // fail-closed default
  if (raw === 'fixtures' || raw === 'production') return raw;
  throw new Error(`Invalid BUILD_PROFILE "${raw}" — expected "fixtures" or "production"`);
}

/**
 * Guard: a fixtures-profile artifact must never be a production deployment.
 * Deploy environments set DEPLOY_ENV=production (see .env.example); CI blocks
 * the combination. Called at build time by scripts/validate.ts.
 */
export function assertNotFixtureDeploy(env: NodeJS.ProcessEnv = process.env): void {
  if (getBuildProfile(env) === 'fixtures' && env.DEPLOY_ENV === 'production') {
    throw new Error(
      'BUILD_PROFILE=fixtures cannot be deployed to production (DEPLOY_ENV=production). Build with BUILD_PROFILE=production.',
    );
  }
}
