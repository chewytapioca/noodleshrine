'use client';
import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { api } from './api';

const ShrineCtx = createContext(null);

export function ShrineProvider({ children }) {
  const [board, setBoard]   = useState({});
  const [user, setUser]     = useState(null);
  const [filter, setFilter] = useState({ brand: 'all', heat: 'all', type: 'all', country: 'all' });
  const [sort, setSort]     = useState('score');
  const [detailId, setDetailId] = useState(null);
  const [authMode, setAuthMode] = useState(null);  // 'login' | 'signup' | null

  const refresh = useCallback(async () => {
    try {
      const [{ board }, { username }] = await Promise.all([api.getBoard(), api.me()]);
      setBoard(board);
      setUser(username);
    } catch (e) {
      console.error('refresh failed', e);  // silenced in prod build by Next.js tree-shaking
    }
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const openAuth   = (mode) => setAuthMode(mode);
  const closeAuth  = () => setAuthMode(null);
  const openDetail = (id) => setDetailId(id);
  const closeDetail = () => setDetailId(null);

  const value = {
    board, user, filter, sort, detailId, authMode,
    setFilter, setSort,
    openAuth, closeAuth, openDetail, closeDetail,
    refresh,
  };

  return <ShrineCtx.Provider value={value}>{children}</ShrineCtx.Provider>;
}

export function useShrine() {
  const ctx = useContext(ShrineCtx);
  if (!ctx) throw new Error('useShrine must be inside <ShrineProvider>');
  return ctx;
}

// ── helpers ──
export const HEAT_BUCKETS = {
  mild:   (r) => r.heat < 4,
  medium: (r) => r.heat >= 4 && r.heat <= 6,
  hot:    (r) => r.heat >= 7,
  all:    () => true,
};

export function heatLabel(h) {
  if (h >= 8) return 'INFERNO';
  if (h >= 6) return 'HOT';
  if (h >= 4) return 'MEDIUM';
  if (h >= 2) return 'MILD';
  return 'GENTLE';
}

export function filterAndSort(list, filter, sort, board) {
  let out = [...list];
  if (filter.brand   !== 'all') out = out.filter((r) => r.tags.includes(filter.brand));
  if (filter.heat    !== 'all') out = out.filter(HEAT_BUCKETS[filter.heat]);
  if (filter.type    !== 'all') out = out.filter((r) => r.tags.includes(filter.type));
  if (filter.country !== 'all') out = out.filter((r) => r.tags.includes(filter.country));
  out.sort((a, b) => {
    const A = board[a.id] || {}, B = board[b.id] || {};
    if (sort === 'name')  return a.name.localeCompare(b.name);
    if (sort === 'heat')  return b.heat - a.heat;
    if (sort === 'votes') return (B.count || 0) - (A.count || 0);
    return (B.avg || 0) - (A.avg || 0);
  });
  return out;
}