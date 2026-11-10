import { getMeetings } from '@/lib/meetings-db';
import type { SacramentMeeting } from '@/lib/types';
import { connection } from 'next/server';

export async function GET(): Promise<Response> {
  await connection();
  const meetings: SacramentMeeting[] = getMeetings();
  return Response.json(meetings);
}
