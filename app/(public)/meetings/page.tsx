import MeetingCard from '@/components/MeetingCard';
import { MeetingSearch } from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { getMeetingsFromDB, getMeetingsTotalPages } from '@/lib/meetings-db';
import { connection } from 'next/server';
import { Suspense } from 'react';
import type { ReactElement } from 'react';

interface MeetingsPageProps {
  searchParams: Promise<{
    query?: string | string[];
    page?: string | string[];
  }>;
}

export default function MeetingsPage({
  searchParams,
}: MeetingsPageProps): ReactElement {
  return (
    <Suspense fallback={<p role="status">Loading meeting schedule...</p>}>
      <MeetingsList searchParams={searchParams} />
    </Suspense>
  );
}

async function MeetingsList({
  searchParams,
}: MeetingsPageProps): Promise<ReactElement> {
  await connection();
  const params = await searchParams;
  const rawQuery = Array.isArray(params.query)
    ? params.query[0] ?? ''
    : params.query ?? '';
  const query = rawQuery.trim();
  const rawPage = Array.isArray(params.page) ? params.page[0] : params.page;
  const requestedPage = Number(rawPage ?? '1');
  const page =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
  const [meetings, totalPages] = await Promise.all([
    getMeetingsFromDB(query, page),
    getMeetingsTotalPages(query),
  ]);

  return (
    <>
      <header className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-blue-800">
          Schedule
        </p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-950">
          Sacrament meetings
        </h1>
        <p className="mt-2 text-slate-600">
          Browse upcoming meeting agendas and details.
        </p>
      </header>
      <div className="mb-6">
        <MeetingSearch />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
      {meetings.length === 0 && (
        <p className="mt-6 text-center text-slate-600">
          No meetings match your search.
        </p>
      )}
      <Pagination totalPages={totalPages} />
    </>
  );
}
