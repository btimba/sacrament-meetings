import type { ReactElement } from 'react';
import NavLinks from './NavLinks';
import { connection } from 'next/server';

export default async function Header(): Promise<ReactElement> {
  await connection();
  const currentDate = new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
  }).format(new Date());

  return (
    <header className="no-print bg-slate-900 text-white">
      <div className="mx-auto flex max-w-5xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xl font-bold tracking-tight">Hermanus Ward Sacrament Meetings</p>
          <p className="mt-1 text-sm text-slate-300">{currentDate}</p>
        </div>
        <NavLinks />
      </div>
    </header>
  );
}
