import { NextResponse } from 'next/server';
import { login } from '@/lib/store';

const COOKIE_OPTS = {
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  maxAge: 60 * 60 * 24 * 30,
  secure: process.env.NODE_ENV === 'production',
};

const SAFE_ERRORS = new Set([
  'username and password are required',
  'invalid username or password',
  // lockout messages match a pattern — handled below
]);

export async function POST(req) {
  try {
    const contentLength = req.headers.get('content-length');
    if (contentLength && Number(contentLength) > 4096) {
      return NextResponse.json({ error: 'request too large' }, { status: 413 });
    }

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== 'object') {
      return NextResponse.json({ error: 'invalid request' }, { status: 400 });
    }

    const { username, password } = body;
    const { token, username: name } = await login({ username, password });
    const res = NextResponse.json({ username: name });
    res.cookies.set('session', token, COOKIE_OPTS);
    return res;
  } catch (err) {
    const msg = err.message || '';
    // Allow safe messages + lockout messages (start with "too many" or "account locked")
    const safe = SAFE_ERRORS.has(msg) ||
      msg.startsWith('too many failed') ||
      msg.startsWith('account locked');
    return NextResponse.json(
      { error: safe ? msg : 'login failed' },
      { status: 401 }
    );
  }
}