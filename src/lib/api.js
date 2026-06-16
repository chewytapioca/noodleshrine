// Thin fetch wrapper. The UI talks only to this module.

async function json(path, opts = {}) {
  const res = await fetch(path, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    ...opts,
    body: opts.body ? JSON.stringify(opts.body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'request failed');
  return data;
}

export const api = {
  signup: ({ username, email, password }) =>
    json('/api/auth/signup', { method: 'POST', body: { username, email, password } }),
  login: ({ username, password }) =>
    json('/api/auth/login', { method: 'POST', body: { username, password } }),
  logout: () => json('/api/auth/logout', { method: 'POST' }),
  me: () => json('/api/auth/me'),
  getBoard: () => json('/api/board'),
  rate: (ramenId, score) =>
    json('/api/rate', { method: 'POST', body: { ramenId, score } }),
  getComments: (ramenId) =>
    json(`/api/comments?ramenId=${encodeURIComponent(ramenId)}`),
  postComment: (ramenId, text) =>
    json('/api/comments', { method: 'POST', body: { ramenId, text } }),
};