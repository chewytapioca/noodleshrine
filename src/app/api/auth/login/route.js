import { NextResponse } from 'next/server';
import { signup } from '@/lib/store';

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
  secure: process.env.NODE_ENV === 'production',
};

export async function POST(req) {
  try {
    const { username, email, password } = await req.json();
    const { token, username: name } = await signup({ username, email, password });
    const res = NextResponse.json({ username: name });
    res.cookies.set('session', token, COOKIE_OPTS);
    return res;
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}