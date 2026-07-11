import type { Metadata } from 'next';
import Link from 'next/link';
import { FixtureBanner } from '@/components/FixtureBanner';
import './globals.css';

export const metadata: Metadata = {
  title: 'AI Policy Atlas — Phase 0',
  description:
    'Agentic AI governance intelligence — Phase 0 foundation shells. Independent research project; hypothetical scenarios; not legal advice.',
};

const NAV = [
  ['/', 'Dashboard'],
  ['/instruments', 'Policy Tracker'],
  ['/compare', 'Compare'],
  ['/scenarios', 'Scenarios'],
  ['/calculator', 'ADRS Calculator'],
  ['/controls', 'Controls'],
  ['/brief', 'Brief'],
  ['/methodology', 'Methodology'],
  ['/changelog', 'Changelog'],
] as const;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <FixtureBanner />
        <div className="disclaimer">
          Independent research project. Hypothetical scenarios. Not legal advice. Not affiliated with any company.
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
