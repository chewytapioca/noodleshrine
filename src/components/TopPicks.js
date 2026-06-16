'use client';
import { useShrine } from '@/lib/shrine-context';
import { RAMEN } from '@/lib/ramen';

export default function TopPicks() {
  const { board, openDetail } = useShrine();
  const top3 = [...RAMEN]
    .sort((a, b) => {
      const A = board[a.id] || {}, B = board[b.id] || {};
      return (B.avg || 0) - (A.avg || 0);
    })
    .slice(0, 3);

  return (
    <section className="section" id="top">
      <div className="section-head centered">
        <h2 className="display">Top picks</h2>
        <p className="script" style={{ fontSize: '1.5rem', color: 'var(--ink-soft)', marginTop: '-6px' }}>
          community-crowned (◍•ᴗ•◍)
        </p>
      </div>
      <div className="top-grid">
        {top3.map((r, i) => {
          const b = board[r.id] || { avg: 0, count: 0 };
          const avg = b.avg ? b.avg.toFixed(1) : '—';
          return (
            <div key={r.id} className={`top-card tc-${i + 1}`} onClick={() => openDetail(r.id)}>
              <span className="big-num">{i + 1}</span>
              <div className="top-img">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={r.img} alt={r.name} />
              </div>
              <div className="top-name">{r.name}</div>
              <div className="top-meta">
                <span className="new">{avg}/10 ♡</span> &nbsp;{b.count || 0} VOTES
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
