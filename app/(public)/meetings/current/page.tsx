import { notFound, redirect } from 'next/navigation';
import { connection } from 'next/server';
import { Suspense } from 'react';
import type { ReactElement } from 'react';
import { getCurrentSundayMeeting } from '@/lib/meetings-db';

export default function CurrentMeetingPage(): ReactElement {
  return (
    <Suspense fallback={<p role="status">Finding this Sunday&apos;s meeting...</p>}>
      <RedirectToCurrentMeeting />
    </Suspense>
  );
}

async function RedirectToCurrentMeeting(): Promise<ReactElement> {
  await connection();
  const meeting = getCurrentSundayMeeting();

  if (!meeting) {
    return notFound();
  }

  return redirect(`/meetings/${meeting.id}`);
}
