import { FIXTURE_BANNER_TEXT, PREVIEW_BANNER_TEXT, getBuildProfile } from '@/lib/validation/buildProfile';
import { LocalizedText } from './LocalizedText';

/**
 * One persistent, non-dismissible research-status banner per profile.
 * Keeping the legal/research boundary in this component prevents stacked,
 * competing banners at the top of the application.
 */
export function FixtureBanner() {
  const profile = getBuildProfile();
  if (profile === 'preview') return <div className="fixture-banner" role="status" aria-live="off" data-testid="preview-banner"><b><LocalizedText id="banner.preview.title" fallback={PREVIEW_BANNER_TEXT} /></b><br /><LocalizedText id="banner.preview.detail" fallback="AI-assisted primary-source review · Independent human publication review incomplete · Not legal advice · No company affiliation" /></div>;
  if (profile === 'fixtures') return <div className="fixture-banner" role="status" aria-live="off" data-testid="fixture-banner"><b><LocalizedText id="banner.fixtures.title" fallback={FIXTURE_BANNER_TEXT} /></b><br /><LocalizedText id="banner.fixtures.detail" fallback="Fictional test data · Not policy research · Not legal advice · Never a production evidence surface" /></div>;
  return <div className="disclaimer" role="status"><LocalizedText id="banner.production.detail" fallback="Independent research · Only approved structured records render · Not legal advice · No company affiliation" /></div>;
}
