import type { SacramentMeeting } from './types';

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

export function getMeetingById(id: number): SacramentMeeting | null {
  return getMeetings().find((meeting) => meeting.id === id) ?? null;
}

export function getCurrentSundayMeeting(): SacramentMeeting | null {
  return getMeetings()[0] ?? null;
}
