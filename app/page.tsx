import Link from 'next/link';
import type { ReactElement } from 'react';

export default function Home(): ReactElement {
  return (
    <section className="mx-auto flex w-full flex-1 items-center px-4 py-16">
      <div className="max-w-2xl">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
          Weekly schedule
        </p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
          Sacrament meeting agendas, all in one place.
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Review upcoming meeting details, speakers, hymns, and the order of
          service.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/meetings"
            className="rounded-md bg-blue-800 px-4 py-2 font-semibold text-white hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            Browse meetings
          </Link>
          <Link
            href="/meetings/current"
            className="rounded-md border border-slate-300 bg-white px-4 py-2 font-semibold text-slate-900 hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
          >
            This Sunday
          </Link>
        </div>
      </div>
    </section>
  );
}
