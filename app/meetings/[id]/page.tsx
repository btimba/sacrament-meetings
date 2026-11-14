import { notFound } from 'next/navigation';
import { connection } from 'next/server';
import MeetingDetail from '@/components/MeetingDetail';
import { getMeetingById } from '@/lib/meetings-db';
import { Suspense } from 'react';
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

  const meeting = getMeetingById(meetingId);
  if (!meeting) notFound();

  return <MeetingDetail meeting={meeting} />;
}
