import Link from 'next/link';
import type { ReactElement } from 'react';
import type { SacramentMeeting } from '@/lib/types';

function formatMeetingDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}

interface MeetingCardProps {
  meeting: SacramentMeeting;
}

export default function MeetingCard({
  meeting,
}: MeetingCardProps): ReactElement {
  return (
    <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold text-blue-800">
        {formatMeetingDate(meeting.date)}
      </p>
      <h2 className="mt-2 text-xl font-bold capitalize text-slate-950">
        {meeting.meetingType} meeting
      </h2>
      <p className="mt-2 text-sm text-slate-600">
        Presiding: {meeting.presiding}
      </p>
      <Link
        href={`/meetings/${meeting.id}`}
        className="mt-4 inline-flex rounded-md bg-blue-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        View meeting agenda
      </Link>
    </article>
  );
}
