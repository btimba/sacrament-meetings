import { getMeetingById } from '@/lib/meetings-db';
import type { ApiError, SacramentMeeting } from '@/lib/types';
import { connection } from 'next/server';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
): Promise<Response> {
  await connection();
  const { id } = await params;
  const parsedId = Number(id);

  if (
    !/^[1-9]\d*$/.test(id) ||
    !Number.isSafeInteger(parsedId)
  ) {
    const error: ApiError = { error: 'Invalid meeting ID.' };
    return Response.json(error, { status: 400 });
  }

  const meeting: SacramentMeeting | null = getMeetingById(parsedId);
  if (!meeting) {
    const error: ApiError = { error: 'Meeting not found.' };
    return Response.json(error, { status: 404 });
  }

  return Response.json(meeting);
}
