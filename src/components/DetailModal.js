'use client';
import { useState, useEffect, useMemo } from 'react';
import { useShrine, heatLabel } from '@/lib/shrine-context';
import { RAMEN } from '@/lib/ramen';
import { api } from '@/lib/api';

const PALETTE = ['#ff5390', '#9c6dd8', '#d4a020', '#5c8bb8', '#4db6ac'];

export default function DetailModal() {
  const { detailId, closeDetail, openAuth, user, board, refresh } = useShrine();
  const [hover, setHover]       = useState(0);
  const [pending, setPending]   = useState(0);
  const [newNote, setNewNote]   = useState('');
  const [comments, setComments] = useState([]);
  const [posting, setPosting]   = useState(false);
  const [postErr, setPostErr]   = useState('');

  const ramen = useMemo(() => RAMEN.find((r) => r.id === detailId), [detailId]);
  const b = board[detailId] || { avg: 0, count: 0, mine: null };

  // load real comments whenever ramen changes
  useEffect(() => {
    setHover(0); setPending(0); setNewNote(''); setComments([]); setPostErr('');
    if (!detailId) return;
    api.getComments(detailId)
      .then(({ comments }) => setComments(comments || []))
      .catch(() => {});
  }, [detailId]);

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') closeDetail(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeDetail]);

  if (!ramen) return null;

  const myScore   = b.mine ?? pending;
  const displayed = hover || myScore;
  const avg       = b.avg ? b.avg.toFixed(1) : '—';
  const barW      = b.avg ? Math.round(b.avg * 10) : 0;
  const tags      = ramen.tags.filter((t) => !['Samyang', 'Nongshim', 'Nissin', 'Indomie', 'MAMA', 'Maruchan', 'Sanyo', 'Ippudo', 'Nestle', 'MyKuali'].includes(t));

  const save = async () => {
    if (!pending) return;
    try {
      await api.rate(ramen.id, pending);
      await refresh();
      setPending(0);
    } catch {
      // rating failed silently — user can retry
    }
  };

  const post = async () => {
    const txt = newNote.trim();
    if (!txt || !user || posting) return;
    setPosting(true);
    setPostErr('');
    try {
      await api.postComment(ramen.id, txt);
      const { comments: fresh } = await api.getComments(ramen.id);
      setComments(fresh || []);
      setNewNote('');
    } catch (e) {
      setPostErr(e.message || 'could not post note');
    } finally {
      setPosting(false);
    }
  };

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) closeDetail(); }}>
      <div className="modal">
        <button className="modal-close" onClick={closeDetail}>✕</button>
        <div className="detail-img">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ramen.img} alt={ramen.name} />
        </div>
        <h3 className="display">{ramen.name}</h3>
        <p className="sub">{ramen.ko} &nbsp;·&nbsp; {ramen.maker}</p>
        <div className="detail-meta">
          <span>{ramen.maker}</span>
          {tags.map((t) => <span key={t}>{t}</span>)}
          <span className="heat">{heatLabel(ramen.heat)} · {ramen.heat}/10</span>
        </div>
        <p style={{ fontSize: '.88rem', color: 'var(--ink-soft)', lineHeight: 1.6, marginBottom: 18 }}>
          {ramen.desc}
        </p>
        <div className="detail-stats">
          <div>
            <span className="num">{avg}<small>/10</small></span>
            <div className="stat-label">COMMUNITY AVG</div>
          </div>
          <div>
            <span className="num" style={{ color: 'var(--ink)' }}>{b.count || 0}</span>
            <div className="stat-label">TOTAL VOTES</div>
          </div>
        </div>
        <div className="detail-bar"><i style={{ width: `${barW}%` }} /></div>

        {user ? (
          <div className="rater" style={{ marginTop: 24 }}>
            <div className="rater-label">
              <span>YOUR RATING</span>
              <span className="myval">{displayed ? `${displayed} ♡` : ''}</span>
            </div>
            <div className="hearts" onMouseLeave={() => setHover(0)}>
              {Array.from({ length: 10 }, (_, n) => (
                <span
                  key={n}
                  className={`heart${displayed > n ? ' on' : ''}`}
                  onMouseEnter={() => setHover(n + 1)}
                  onClick={() => setPending(n + 1)}
                >♥</span>
              ))}
            </div>
            {pending > 0 && pending !== b.mine && (
              <button className="save" onClick={save}>SAVE RATING ♡</button>
            )}
          </div>
        ) : (
          <div className="locked-note" style={{ marginTop: 24 }}>
            <button onClick={() => { closeDetail(); openAuth('login'); }}>Sign in</button>{' '}
            to rate &amp; leave a note &nbsp;ʕ•ᴥ•ʔ
          </div>
        )}

        <div className="comments-hd">NOTES &nbsp;✦</div>
        {comments.length === 0 ? (
          <p style={{ fontSize: '.82rem', color: 'var(--ink-soft)' }}>
            no notes yet &nbsp;(´｡• ᵕ •｡`) be the first.
          </p>
        ) : (
          comments.map((c, i) => (
            <div key={i} className="comment">
              <div className="avi" style={{ background: PALETTE[i % PALETTE.length] }}>
                {c.username.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="comment-user">@{c.username}</div>
                <div className="comment-text">{c.text}</div>
              </div>
            </div>
          ))
        )}

        {user && (
          <div className="comment-row-wrap">
            <div className="comment-row">
              <input
                className="comment-input"
                value={newNote}
                onChange={(e) => { setNewNote(e.target.value); setPostErr(''); }}
                onKeyDown={(e) => { if (e.key === 'Enter') post(); }}
                placeholder="drop a note ♡"
                disabled={posting}
              />
              <button className="post-btn" onClick={post} disabled={posting}>
                {posting ? '...' : 'POST'}
              </button>
            </div>
            {postErr && (
              <p style={{ fontSize: '.76rem', color: 'var(--hot)', marginTop: 6 }}>{postErr}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}