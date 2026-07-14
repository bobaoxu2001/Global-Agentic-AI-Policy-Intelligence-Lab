import type { Metadata } from 'next';
import Link from 'next/link';
import { FixtureBanner } from '@/components/FixtureBanner';
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

const PRIMARY_NAV = [
  ['/', 'Overview'],
  ['/executive-brief', 'Executive Brief'],
  ['/work-samples', 'Work Samples'],
  ['/instruments', 'Instruments'],
  ['/compare', 'Compare'],
  ['/controls', 'Controls'],
  ['/methodology', 'Methodology'],
] as const;

const RESEARCH_LINKS = [
  ['/jurisdictions', 'Jurisdictions'],
  ['/scenarios', 'Scenarios'],
  ['/risk-score', 'ADRS Method'],
  ['/taxonomy/policy', 'Policy Taxonomy'],
  ['/changelog', 'Changelog'],
] as const;

const EVIDENCE_LINKS = [
  ['/bibliography', 'Bibliography'],
  ['/downloads', 'Downloads'],
  ['/glossary', 'Glossary'],
  ['/about', 'About & Limits'],
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to main content</a>
        <FixtureBanner />
        <header className="site-header">
          <div className="header-inner">
            <Link className="brand" href="/" aria-label="AI Policy Atlas home">
              <span className="brand-mark" aria-hidden="true">A</span>
              <span>
                <b>AI Policy Atlas</b>
                <small>Global agentic AI intelligence</small>
              </span>
            </Link>
            <nav className="primary-nav" aria-label="Primary">
              {PRIMARY_NAV.map(([href, label]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </nav>
          </div>
        </header>
        <main id="main-content">{children}</main>
        <footer className="site-footer">
          <div className="footer-inner">
            <div>
              <p className="eyebrow">AI Policy Atlas</p>
              <p className="footer-statement">Policy change → business implication → accountable action.</p>
              <p className="footer-note">Independent portfolio research. Conclusions remain bounded by the checked, source-limited scope.</p>
            </div>
            <div>
              <p className="footer-heading">Research</p>
              {RESEARCH_LINKS.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
            <div>
              <p className="footer-heading">Evidence</p>
              {EVIDENCE_LINKS.map(([href, label]) => <Link key={href} href={href}>{label}</Link>)}
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
