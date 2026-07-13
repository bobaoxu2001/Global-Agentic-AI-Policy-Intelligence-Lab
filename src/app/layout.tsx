import type { Metadata } from 'next';
import Link from 'next/link';
import { FixtureBanner } from '@/components/FixtureBanner';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Policy Atlas — Agentic AI Governance Intelligence',
  description:
    'Source-traceable policy intelligence for agentic AI. Independent research project; not legal advice.',
};

const NAV = [
  ['/', 'Overview'],
  ['/instruments', 'Instruments'],
  ['/jurisdictions', 'Jurisdictions'],
  ['/compare', 'Compare'],
  ['/scenarios', 'Scenarios'],
  ['/risk-score', 'Risk Score'],
  ['/taxonomy/policy', 'Taxonomies'],
  ['/controls', 'Controls'],
  ['/executive-brief', 'Brief'],
  ['/methodology', 'Methodology'],
  ['/changelog', 'Changelog'],
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FixtureBanner />
        <div className="disclaimer">
          Independent research project. Corpus publication requires human review. Hypothetical scenarios. Not legal advice. Not affiliated with any company.
        </div>
        <nav className="primary" aria-label="Primary" style={{ maxWidth: 960, margin: '0 auto', padding: '8px 16px' }}>
          {NAV.map(([href, label]) => (
            <Link key={href} href={href}>
              {label}
            </Link>
          ))}
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
