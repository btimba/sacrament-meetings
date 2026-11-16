import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import MeetingDetail from '@/components/MeetingDetail';
import { MeetingSearch } from '@/components/MeetingSearch';
import Pagination from '@/components/Pagination';
import { getMeetingById } from '@/lib/meetings-db';
import { Suspense } from 'react';
import { getMeetingCount } from '@/lib/meetings-db';
import type { ReactElement } from 'react';

interface MeetingPageProps {
  params: Promise<{ id: string }>;
}

export default function MeetingPage({
  params,
}: MeetingPageProps): ReactElement {
  return (
    <Suspense fallback={<p role="status">Loading meeting agenda...</p>}>
      <MeetingContent params={params} />
    </Suspense>
  );
}

async function MeetingContent({
  params,
}: MeetingPageProps): Promise<ReactElement> {
  await connection();
  const { id } = await params;
  const meetingId = Number(id);
  
  if (!/^[1-9]\d*$/.test(id) || !Number.isSafeInteger(meetingId)) {
    notFound();
  }

  const [meeting] = await Promise.all([
    getMeetingById(meetingId),
    getMeetingCount() 
  ]);
  if (!meeting) notFound();

  return (
    <section className="mx-auto max-w-3xl space-y-6">
      <MeetingSearch />
      <MeetingDetail meeting={meeting} />
      <Pagination />
    </section>
  );
}