import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getUserBySession } from '@/lib/store';

export async function GET() {
  const token = cookies().get('session')?.value;
  const user = await getUserBySession(token);
  return NextResponse.json({ username: user ? user.username : null });
}
