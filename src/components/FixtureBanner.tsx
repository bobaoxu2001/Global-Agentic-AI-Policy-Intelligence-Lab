import { FIXTURE_BANNER_TEXT, PREVIEW_BANNER_TEXT, getBuildProfile } from '@/lib/validation/buildProfile';

/**
 * Persistent, non-dismissible fixture banner (CB-4 / INTERACTION_SPEC §9).
 * Rendered on every page via the root layout whenever BUILD_PROFILE=fixtures.
 * Production builds render nothing here.
 */
export function FixtureBanner() {
  const profile = getBuildProfile();
  if (profile === 'preview') return <div className="fixture-banner" role="status" aria-live="off" data-testid="preview-banner"><b>{PREVIEW_BANNER_TEXT}</b><br />Primary sources were checked by an AI review workflow. Not all records have received independent human legal review. Not legal advice.</div>;
  if (profile !== 'fixtures') return null;
  return (
    <div className="fixture-banner" role="status" aria-live="off" data-testid="fixture-banner">
      {FIXTURE_BANNER_TEXT}
    </div>
  );
}
