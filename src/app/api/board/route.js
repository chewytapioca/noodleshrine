import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserBySession, getBoard } from '@/lib/store';

export async function GET() {
  try {
    const token = cookies().get('session')?.value;
    const user  = await getUserBySession(token);
    const board = await getBoard(user ? user.username : null);
    return NextResponse.json({ board });
  } catch {
    // Never expose DB errors — return an empty board instead
    return NextResponse.json({ board: {} });
  }
}