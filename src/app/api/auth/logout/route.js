import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { deleteSession } from '@/lib/store';

export async function POST() {
  const token = cookies().get('session')?.value;
  await deleteSession(token);  // deletes the hash from DB
  const res = NextResponse.json({ ok: true });
  // Overwrite with empty + expired cookie to force browser removal
  res.cookies.set('session', '', {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
    secure: process.env.NODE_ENV === 'production',
  });
  return res;
}