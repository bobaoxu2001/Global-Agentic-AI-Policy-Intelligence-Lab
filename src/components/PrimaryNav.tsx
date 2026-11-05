'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useId, useState } from 'react';
import { LocalizedText } from '@/components/LocalizedText';

const PRIMARY_NAV = [
  ['/', 'Overview', 'shell.nav.overview'],
  ['/policy-refresh', 'Dated Update', 'shell.nav.latest'],
  ['/executive-brief', 'Executive Brief', 'shell.nav.executive'],
  ['/work-samples', 'Work Samples', 'shell.nav.samples'],
  ['/instruments', 'Instruments', 'shell.nav.instruments'],
  ['/compare', 'Compare', 'shell.nav.compare'],
  ['/controls', 'Controls', 'shell.nav.controls'],
  ['/methodology', 'Methodology', 'shell.nav.methodology'],
] as const;

function routeIsActive(pathname: string, href: string): boolean {
  return href === '/' ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
}

export function PrimaryNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const navId = useId();
  const navLabelId = `${navId}-label`;

  return (
    <div className={`nav-shell${open ? ' nav-open' : ''}`}>
      <button
        className="nav-toggle"
        type="button"
        aria-expanded={open}
        aria-controls={navId}
        onClick={() => setOpen((current) => !current)}
      >
        <LocalizedText id="shell.nav.menu" fallback="Menu" />
      </button>
      <span className="visually-hidden" id={navLabelId}>
        <LocalizedText id="shell.nav.label" fallback="Primary navigation" />
      </span>
      <nav id={navId} className="primary-nav" aria-labelledby={navLabelId}>
        {PRIMARY_NAV.map(([href, label, translationId]) => (
          <Link
            aria-current={pathname === href ? 'page' : routeIsActive(pathname, href) ? 'location' : undefined}
            key={href}
            href={href}
            onClick={() => setOpen(false)}
          >
            <LocalizedText id={translationId} fallback={label} />
          </Link>
        ))}
      </nav>
    </div>
  );
}
