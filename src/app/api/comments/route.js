import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getComments, postComment } from '@/lib/store';

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const ramenId = searchParams.get('ramenId');
    if (!ramenId) return NextResponse.json({ error: 'ramenId required' }, { status: 400 });
    const comments = await getComments(ramenId);
    return NextResponse.json({ comments });
  } catch {
    return NextResponse.json({ comments: [] });
  }
}

export async function POST(req) {
  try {
    const { ramenId, text } = await req.json();
    const token = cookies().get('session')?.value;
    await postComment({ token, ramenId, text });
    return NextResponse.json({ ok: true });
  } catch (err) {
    const safe = ['not signed in', 'comment cannot be empty', 'comment too long (max 500 chars)', 'unknown ramen', 'please keep notes respectful ʕ•ᴥ•ʔ'];
    const msg = safe.includes(err.message) ? err.message : 'something went wrong';
    return NextResponse.json({ error: msg }, { status: 400 });
  }
}