import { FIXTURE_BANNER_TEXT, getBuildProfile } from '@/lib/validation/buildProfile';

/**
 * Persistent, non-dismissible fixture banner (CB-4 / INTERACTION_SPEC §9).
 * Rendered on every page via the root layout whenever BUILD_PROFILE=fixtures.
 * Production builds render nothing here.
 */
export function FixtureBanner() {
  if (getBuildProfile() !== 'fixtures') return null;
  return (
    <div className="fixture-banner" role="status" aria-live="off" data-testid="fixture-banner">
      {FIXTURE_BANNER_TEXT}
    </div>
  );
}
