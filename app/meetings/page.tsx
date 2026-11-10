import MeetingCard from '@/components/MeetingCard';
import { getMeetings } from '@/lib/meetings-db';
import { connection } from 'next/server';
import { Suspense } from 'react';
import type { ReactElement } from 'react';

export default function MeetingsPage(): ReactElement {
  return (
    <Suspense fallback={<p role="status">Loading meeting schedule...</p>}>
      <MeetingsList />
    </Suspense>
  );
}

async function MeetingsList(): Promise<ReactElement> {
  await connection();
  const meetings = getMeetings();

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
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {meetings.map((meeting) => (
          <MeetingCard key={meeting.id} meeting={meeting} />
        ))}
      </div>
    </>
  );
}
