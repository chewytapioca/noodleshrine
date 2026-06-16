# noodleshrine ʕ•ᴥ•ʔ — instant ramen ranker

next.js app that users are able to rate instant ramen 1–10 with tappable hearts,
and are able to watch the community averages update live.

## run it locally

```bash
npm install
npm run dev
```

Open **http://localhost:3000**.

For a production-style run instead:

```bash
npm run build
npm start
```

> Requires Node.js 18.17+.

## how it works

| layer | file(s) | notes |
|-------|---------|-------|
| UI | `src/app/page.js`, `src/components/*` | client components, kawaii styling in `src/app/globals.css` |
| client API wrapper | `src/lib/api.js` | the only thing the UI calls — wraps `fetch` |
| API routes | `src/app/api/**/route.js` | auth, board, rate; set an httpOnly session cookie |


Ramen images live in `public/ramen/` (transparent PNGs).

## ≽^• ˕ • ྀི≼ swapping in a real SQL backend

Everything that touches "the database" is isolated in **`src/lib/store.js`**.
Right now it's an in-memory object that **resets when the server restarts** and
stores passwords in plaintext (fine for a mock, not for production).

To go real, keep the same exported function signatures and replace the bodies
with queries. Suggested schema:

```sql
users(id PK, username UNIQUE, email, pass_hash, created_at)
ramens(id PK, name, ko, heat, accent, img, tags JSON)
ratings(user_id FK, ramen_id FK, score INT, updated_at, PRIMARY KEY(user_id, ramen_id))
```

Key changes when you do:
- **hash passwords** server-side with bcrypt/argon2 (`signup`/`login` in `store.js`)
- `getBoard` → `SELECT ramen_id, AVG(score), COUNT(*) FROM ratings GROUP BY ramen_id`
- `rate` → `INSERT ... ON CONFLICT (user_id, ramen_id) DO UPDATE SET score = ...`
- consider storing sessions in the DB (or use signed JWTs) instead of the in-memory map

Because the UI and routes only ever call `store.js` functions, **nothing above
that layer changes.**

## notes
- The board is seeded with fake votes so it isn't empty on first load — delete the
  seed block in `store.js` when you have real data.
- `<img>` is used for simplicity; switch to `next/image` if you want optimization.
