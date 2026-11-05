import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { FixtureBanner } from '@/components/FixtureBanner';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { LocalizedText } from '@/components/LocalizedText';
import { PrimaryNav } from '@/components/PrimaryNav';
import { languageBootstrapScript } from '@/lib/i18n/config';
import './globals.css';

export const metadata: Metadata = {
  applicationName: 'AI Policy Atlas',
  title: {
    default: 'AI Policy Atlas — Global Agentic AI Policy Intelligence',
    template: '%s · AI Policy Atlas',
  },
  description:
    'Source-traceable global AI policy intelligence translating regulatory change into product, cloud, and governance decisions.',
  openGraph: {
    type: 'website',
    title: 'AI Policy Atlas — Global Agentic AI Policy Intelligence',
    description: 'Source-traceable policy intelligence translating regulatory change into accountable product and cloud decisions.',
  },
};

const RESEARCH_LINKS = [
  ['/jurisdictions', 'Jurisdictions', 'shell.footer.jurisdictions'],
  ['/scenarios', 'Scenarios', 'shell.footer.scenarios'],
  ['/risk-management', 'AI Risk Management', 'shell.footer.riskManagement'],
  ['/risk-score', 'ADRS Method', 'shell.footer.adrs'],
  ['/taxonomy/policy', 'Policy Taxonomy', 'shell.footer.taxonomy'],
  ['/changelog', 'Changelog', 'shell.footer.changelog'],
] as const;

const EVIDENCE_LINKS = [
  ['/bibliography', 'Bibliography', 'shell.footer.bibliography'],
  ['/downloads', 'Downloads', 'shell.footer.downloads'],
  ['/glossary', 'Glossary', 'shell.footer.glossary'],
  ['/about', 'About & Limits', 'shell.footer.about'],
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-locale="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body>
        <Script id="language-bootstrap" strategy="beforeInteractive">{languageBootstrapScript()}</Script>
        <a className="skip-link" href="#main-content"><LocalizedText id="shell.skip" fallback="Skip to main content" /></a>
        <FixtureBanner />
        <header className="site-header">
          <div className="header-inner">
            <Link className="brand" href="/" aria-label="AI Policy Atlas home">
              <span className="brand-mark" aria-hidden="true">A</span>
              <span>
                <b>AI Policy Atlas</b>
                <small><LocalizedText id="shell.brandTagline" fallback="Global agentic AI intelligence" /></small>
              </span>
            </Link>
            <PrimaryNav />
            <LanguageSwitcher />
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <div>
              <p className="eyebrow">AI Policy Atlas</p>
              <p className="footer-statement"><LocalizedText id="shell.footer.statement" fallback="Policy change → business implication → accountable action." /></p>
              <p className="footer-note"><LocalizedText id="shell.footer.note" fallback="Independent portfolio research. Conclusions remain bounded by the checked, source-limited scope." /></p>
              <p className="footer-note language-boundary"><LocalizedText id="shell.translationBoundary" fallback="Interface translation is a reading aid. Official titles, verbatim quotations, source IDs, legal numbers, and downloadable evidence remain in their verified language." /></p>
            </div>
            <div>
              <p className="footer-heading"><LocalizedText id="shell.footer.research" fallback="Research" /></p>
              {RESEARCH_LINKS.map(([href, label, translationId]) => <Link key={href} href={href}><LocalizedText id={translationId} fallback={label} /></Link>)}
            </div>
            <div>
              <p className="footer-heading"><LocalizedText id="shell.footer.evidence" fallback="Evidence" /></p>
              {EVIDENCE_LINKS.map(([href, label, translationId]) => <Link key={href} href={href}><LocalizedText id={translationId} fallback={label} /></Link>)}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
