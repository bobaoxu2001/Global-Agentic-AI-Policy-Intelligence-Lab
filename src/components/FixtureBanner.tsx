import { FIXTURE_BANNER_TEXT, PREVIEW_BANNER_TEXT, getBuildProfile } from '@/lib/validation/buildProfile';

/**
 * One persistent, non-dismissible research-status banner per profile.
 * Keeping the legal/research boundary in this component prevents stacked,
 * competing banners at the top of the application.
 */
export function FixtureBanner() {
  const profile = getBuildProfile();
  if (profile === 'preview') return <div className="fixture-banner" role="status" aria-live="off" data-testid="preview-banner"><b>{PREVIEW_BANNER_TEXT}</b><br />AI-assisted primary-source review · Independent human publication review incomplete · Not legal advice · No company affiliation</div>;
  if (profile === 'fixtures') return <div className="fixture-banner" role="status" aria-live="off" data-testid="fixture-banner"><b>{FIXTURE_BANNER_TEXT}</b><br />Fictional test data · Not policy research · Not legal advice · Never a production evidence surface</div>;
  return <div className="disclaimer" role="status">Independent research · Only approved structured records render · Not legal advice · No company affiliation</div>;
}
