import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { rate } from '@/lib/store';

export async function POST(req) {
  try {
    const { ramenId, score } = await req.json();
    const token = cookies().get('session')?.value;
    await rate({ token, ramenId, score });
    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
}
