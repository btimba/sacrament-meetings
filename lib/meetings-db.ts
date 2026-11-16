import { neon } from '@neondatabase/serverless';
import type { SacramentMeeting } from './types';

const sql = neon(process.env.DATABASE_URL!);

const items_per_page = 5;

export async function getMeetingsFromDB(
   query: string = '',
  currentPage: number = 1
): Promise<SacramentMeeting[]> {
  const searchTerm = `%${query}%`;
  const offset = (currentPage - 1) * items_per_page;

  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
    ORDER BY date DESC
    LIMIT ${items_per_page} OFFSET ${offset}
  `;  
  return rows as unknown as SacramentMeeting[];
}


export async function getMeetingsTotalPages(
  query: string = ''
): Promise<number> {
  const searchTerm = `%${query}%`;
  const rows = await sql`
    SELECT COUNT(*) FROM meetings
    WHERE
      presiding     ILIKE ${searchTerm}
      OR conducting ILIKE ${searchTerm}
      OR meeting_type ILIKE ${searchTerm}
      OR speakers::text ILIKE ${searchTerm}
  `;
  return Math.ceil(Number(rows[0].count) / items_per_page);
}


export async function getMeetingById(
  id: number
): Promise<SacramentMeeting | null> {
  const rows = await sql`
    SELECT
      id,
      to_char(date, 'YYYY-MM-DD') AS "date",
      meeting_type                AS "meetingType",
      presiding, conducting, announcements,
      opening_hymn                AS "openingHymn",
      opening_prayer              AS "openingPrayer",
      ward_business               AS "wardBusiness",
      stake_business              AS "stakeBusiness",
      sacrament_hymn              AS "sacramentHymn",
      speakers,
      closing_hymn                AS "closingHymn",
      closing_prayer              AS "closingPrayer"
    FROM meetings WHERE id = ${id}
  `;
  return (rows[0] as unknown as SacramentMeeting) ?? null;
}


// Mutation stubs — will be wired to the database in Week 04
export async function addMeeting(
  data: Omit<SacramentMeeting, 'id'>
): Promise<SacramentMeeting> {
  throw new Error('addMeeting: database implementation coming in Week 04');
}

export async function updateMeeting(
  id: number,
  updates: Partial<SacramentMeeting>
): Promise<SacramentMeeting | null> {
  throw new Error('updateMeeting: database implementation coming in Week 04');
}

export async function deleteMeeting(id: number): Promise<boolean> {
  throw new Error('deleteMeeting: database implementation coming in Week 04');
}

const meetingTemplates: Omit<SacramentMeeting, 'date'>[] = [
  {
    id: 1,
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 2, title: 'The Spirit of God' },
    openingPrayer: 'Sister Williams',
    wardBusiness: [{ description: 'Sustaining of new Primary president' }],
    stakeBusiness: false,
    sacramentHymn: { number: 169, title: "In Remembrance of Thy Suffering" },
    speakers: [
      { name: 'Sister Brown', topic: 'Faith in Jesus Christ', type: 'speaker' },
      { name: 'Youth Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 31, title: 'O God, Our Help in Ages Past' },
    closingPrayer: 'Brother Davis',
    announcements: ['Ward temple night']
  },
   {
    id: 2,
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Davis',
    openingHymn: { number: 3, title: 'Now Let Us Rejoice' },
    openingPrayer: 'Brother Wilson',
    wardBusiness: [
      { description: 'Welcome of new ward members' },
      { description: 'Sustaining of Sunday School teachers' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 193, title: 'I Stand All Amazed' },
    speakers: [
      { name: 'Sister Johnson', topic: 'The Power of Prayer', type: 'speaker' },
      { name: 'Brother Anderson', topic: 'Strengthening Our Families', type: 'speaker' }
    ],
    closingHymn: { number: 85, title: 'How Firm a Foundation' },
    closingPrayer: 'Sister Taylor',
    announcements: ['Youth activity']
  },
  {
    id: 3,
    meetingType: 'testimony' ,
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 6, title: 'Redeemer of Israel' },
    openingPrayer: 'Sister Brown',
    wardBusiness: [],
    stakeBusiness: false,
    sacramentHymn: { number: 185, title: 'Reverently and Meekly Now' },
    speakers: [
      { name: 'Ward Members', topic: 'Personal Testimonies', type: 'speaker' },
      { name: 'Primary Children', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 19, title: 'We Thank Thee, O God, for a Prophet' },
    closingPrayer: 'Brother Clark',
    announcements: ['Ward service project']
  },
  {
    id: 4,
    meetingType: 'stake',
    presiding: 'President Anderson',
    conducting: 'President Wilson',
    openingHymn: { number: 27, title: 'Praise to the Man' },
    openingPrayer: 'Sister Davis',
    wardBusiness: [],
    stakeBusiness: true,
    sacramentHymn: { number: 188, title: 'Thy Will, O Lord, Be Done' },
    speakers: [
      { name: 'President Anderson', topic: 'Building Faith in Jesus Christ', type: 'speaker' },
      { name: 'Elder Thompson', topic: 'Serving One Another', type: 'speaker' },
      { name: 'Sister Miller', topic: 'Finding Joy in the Gospel', type: 'speaker' }
    ],
    closingHymn: { number: 134, title: 'I Believe in Christ' },
    closingPrayer: 'Brother Thomas',
    announcements: ['Stake youth conference registration is now open']
  },
  {
    id: 5,
    meetingType: 'regular',
    presiding: 'Bishop Smith',
    conducting: 'Brother Jones',
    openingHymn: { number: 81, title: 'Press Forward, Saints' },
    openingPrayer: 'Sister Wilson',
    wardBusiness: [
      { description: 'Sustaining of new ward missionaries' }
    ],
    stakeBusiness: false,
    sacramentHymn: { number: 194, title: 'There Is a Green Hill Far Away' },
    speakers: [
      { name: 'Brother Miller', topic: 'The Blessings of Temple Worship', type: 'speaker' },
      { name: 'Sister Taylor', topic: 'Following the Savior', type: 'speaker' },
      { name: 'Ward Choir', topic: '', type: 'musical-number' }
    ],
    closingHymn: { number: 89, title: 'The Lord Is My Light' },
    closingPrayer: 'Brother Anderson',
    announcements: ['Youth activity', 'Ward picnic']
  }
];

function getUpcomingSundayDate(weeksAhead = 0): string {
  const sunday = new Date();
  sunday.setHours(12, 0, 0, 0);
  sunday.setDate(
    sunday.getDate() + ((7 - sunday.getDay()) % 7) + weeksAhead * 7
  );

  return [
    sunday.getFullYear(),
    String(sunday.getMonth() + 1).padStart(2, '0'),
    String(sunday.getDate()).padStart(2, '0'),
  ].join('-');
}

export function getMeetings(date?: string | null): SacramentMeeting[] {
  const upcomingMeetings = meetingTemplates.map((meeting, index) => ({
    ...meeting,
    date: getUpcomingSundayDate(index),
  }));

  if (date) return upcomingMeetings.filter((meeting) => meeting.date === date);
  return upcomingMeetings;
}

export function getTemplateMeetingById(id: number): SacramentMeeting | null {
  return getMeetings().find((meeting) => meeting.id === id) ?? null;
}

export function getCurrentSundayMeeting(): SacramentMeeting | null {
  return getMeetings()[0] ?? null;
}

export function getMeetingCount(): number {
  return meetingTemplates.length;
}