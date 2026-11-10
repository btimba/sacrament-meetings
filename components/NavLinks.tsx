'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ReactElement } from 'react';

interface NavigationLink {
  href: `/${string}`;
  label: string;
}

const links: NavigationLink[] = [
  { href: '/meetings', label: 'Meetings' },
  { href: '/meetings/current', label: 'This Sunday' },
];

export default function NavLinks(): ReactElement {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation">
      <ul className="flex flex-wrap gap-2">
        {links.map(({ href, label }) => {
          const isActive = pathname === href;

          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 ${
                  isActive
                    ? 'bg-white text-slate-950'
                    : 'text-slate-100 hover:bg-white/15 hover:text-white'
                }`}
              >
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
