'use client';
import { useState, useEffect, useRef } from 'react';
import { useShrine, filterAndSort, heatLabel } from '@/lib/shrine-context';
import { RAMEN } from '@/lib/ramen';
import { api } from '@/lib/api';

const PALETTE = ['#ff5390', '#9c6dd8', '#d4a020', '#5c8bb8', '#4db6ac'];

export default function TryToday() {
  const { board, filter, sort, openDetail } = useShrine();
  const [showAll, setShowAll]       = useState(false);
  const [previews, setPreviews]     = useState({});  // ramenId -> comment[]
  const fetchedRef                  = useRef(new Set());

  const all  = filterAndSort(RAMEN, filter, sort, board);
  const list = showAll ? all : all.slice(0, 4);

  // fetch comment previews for visible cards (only once per ramen id)
  useEffect(() => {
    list.forEach((r) => {
      if (fetchedRef.current.has(r.id)) return;
      fetchedRef.current.add(r.id);
      api.getComments(r.id)
        .then(({ comments }) => {
          if (comments && comments.length > 0) {
            setPreviews(prev => ({ ...prev, [r.id]: comments.slice(0, 3) }));
          }
        })
        .catch(() => {});
    });
  }, [list]);

  return (
    <section className="section" id="try">
      <div className="section-head">
        <h2 className="display">Try them<br />today!</h2>
        <div className="burst">COMMUNITY<br />RATED ♡</div>
        <button
          className="see-all"
          onClick={() => setShowAll(v => !v)}
        >
          {showAll ? 'SHOW LESS ↑' : `SEE ALL ${all.length} →`}
        </button>
      </div>
      <div className={`card-grid${showAll ? ' card-grid--all' : ''}`}>
        {list.length === 0 ? (
          <div className="empty">
            no noodles match those filters &nbsp;(｡•́︿•̀｡) &nbsp;try widening the search
          </div>
        ) : (
          list.map((r) => {
            const b        = board[r.id] || { avg: 0, count: 0 };
            const avg      = b.avg ? b.avg.toFixed(1) : '—';
            const cardNotes = previews[r.id] || [];
            return (
              <div key={r.id} className="card" onClick={() => openDetail(r.id)}>
                <div className="card-img">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={r.img} alt={r.name} />
                </div>
                <div className="card-name">
                  <span>{r.name}</span>
                  <span className="score">{avg}<small>/10</small></span>
                </div>
                <div className="card-desc">{r.maker} · {heatLabel(r.heat)}</div>

                {cardNotes.length > 0 && (
                  <div className="card-notes">
                    <div className="card-notes-hd">NOTES ♡</div>
                    {cardNotes.map((c, i) => (
                      <div className="card-note" key={i}>
                        <div className="card-note-avi" style={{ background: PALETTE[i % PALETTE.length] }}>
                          {c.username.slice(0, 2).toUpperCase()}
                        </div>
                        <div className="card-note-body">
                          <span className="card-note-user">@{c.username}</span>
                          <span className="card-note-text">{c.text}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="card-bottom">
                  <span className="card-meta">{b.count || 0} VOTES</span>
                  <button
                    className="card-plus"
                    onClick={(e) => { e.stopPropagation(); openDetail(r.id); }}
                  >+</button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}