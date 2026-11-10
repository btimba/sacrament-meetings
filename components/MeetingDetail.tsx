'use client';

import type { ReactElement } from 'react';
import type { SacramentMeeting } from '@/lib/types';

function formatMeetingDate(date: string): string {
  return new Intl.DateTimeFormat('en', {
    dateStyle: 'full',
    timeZone: 'UTC',
  }).format(new Date(`${date}T12:00:00Z`));
}

interface MeetingDetailProps {
  meeting: SacramentMeeting;
}

export default function MeetingDetail({
  meeting,
}: MeetingDetailProps): ReactElement {
  return (
    <article className="mx-auto max-w-3xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
      <header className="border-b border-slate-200 pb-6">
        <p className="text-sm font-semibold text-blue-800">
          {formatMeetingDate(meeting.date)}
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">
          {meeting.meetingType} meeting
        </h1>
        <dl className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
          <div>
            <dt className="inline font-semibold">Presiding: </dt>
            <dd className="inline">{meeting.presiding}</dd>
          </div>
          <div>
            <dt className="inline font-semibold">Conducting: </dt>
            <dd className="inline">{meeting.conducting}</dd>
          </div>
        </dl>
      </header>

      <section className="py-6">
        <h2 className="text-lg font-bold text-slate-950">Meeting agenda</h2>
        <ol className="mt-4 space-y-4 text-slate-800">
          <li>
            <span className="font-semibold">Opening hymn: </span>
            {meeting.openingHymn.title} (Hymn {meeting.openingHymn.number})
          </li>
          <li>
            <span className="font-semibold">Opening prayer: </span>
            {meeting.openingPrayer}
          </li>
          {meeting.wardBusiness.map((item, index) => (
            <li key={`ward-business-${index}`}>
              <span className="font-semibold">Ward business: </span>
              {item.description}
            </li>
          ))}
          {meeting.stakeBusiness && (
            <li>
              <span className="font-semibold">Stake business</span>
            </li>
          )}
          <li>
            <span className="font-semibold">Sacrament hymn: </span>
            {meeting.sacramentHymn.title} (Hymn {meeting.sacramentHymn.number})
          </li>
          {meeting.speakers.map((speaker) => (
            <li key={`${speaker.name}-${speaker.topic}-${speaker.type}`}>
              <span className="font-semibold">
                {speaker.type === 'speaker' ? 'Speaker: ' : 'Musical number: '}
              </span>
              {speaker.name}
              {speaker.topic && ` — ${speaker.topic}`}
            </li>
          ))}
          {meeting.announcements?.map((announcement) => (
            <li key={announcement}>
              <span className="font-semibold">Announcement: </span>
              {announcement}
            </li>
          ))}
          <li>
            <span className="font-semibold">Closing hymn: </span>
            {meeting.closingHymn.title} (Hymn {meeting.closingHymn.number})
          </li>
          <li>
            <span className="font-semibold">Closing prayer: </span>
            {meeting.closingPrayer}
          </li>
        </ol>
      </section>

      <button
        type="button"
        onClick={() => window.print()}
        className="no-print rounded-md bg-blue-800 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-900 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        Print agenda
      </button>
    </article>
  );
}
