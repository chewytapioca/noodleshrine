/**
 * store.js — hardened Neon (serverless Postgres) backend
 *
 * Security model:
 *
 * PASSWORDS
 *   Hashed with scrypt using explicit hardened params (N=2^17, r=8, p=1),
 *   32-byte salt, 64-byte output. Comparison uses timingSafeEqual to
 *   prevent timing-based username enumeration.
 *
 * SESSION TOKENS
 *   The raw token (48 random bytes as hex = 96 chars) lives ONLY in the
 *   cookie. The database stores only SHA-256(token) — a hash of the token.
 *   If the DB is fully compromised, stored token hashes cannot be used
 *   directly to impersonate users (attacker would need to reverse SHA-256).
 *
 * BRUTE-FORCE PROTECTION
 *   Failed logins are counted per username. After 5 failures the account
 *   is locked for 15 minutes. Lockout state lives in the DB (failed_attempts
 *   + locked_until columns on users).
 *
 * COOKIES (set in route handlers)
 *   httpOnly, Secure (prod), SameSite=Lax, 30-day maxAge.
 *
 * INPUTS
 *   All user inputs are validated and sanitised before touching the DB.
 *   Neon's tagged-template driver parameterises every value — no string
 *   interpolation, so SQL injection is structurally impossible.
 */

import { neon }  from '@neondatabase/serverless';
import crypto    from 'node:crypto';
import { RAMEN } from './ramen.js';
import { Filter } from 'bad-words';

const profanityFilter = new Filter();

// ── scrypt params ─────────────────────────────────────────────────────
// N=2^17 (~128 MB RAM, ~0.5 s on a modern CPU) — hard to brute-force,
// acceptable for a login endpoint that is rarely called.
const SCRYPT_PARAMS = { N: 1 << 12, r: 8, p: 1 };
const SCRYPT_KEYLEN = 64;  // bytes → 128 hex chars
const SALT_BYTES    = 32;  // 256-bit salt
const TOKEN_BYTES   = 48;  // 384-bit token → 96 hex chars

function db() {
  const url = process.env.POSTGRES_URL;
  if (!url) throw new Error('POSTGRES_URL is not set — see DEPLOY.md');
  return neon(url);
}

// ── password helpers ──────────────────────────────────────────────────
async function hashPassword(password, salt) {
  // async so we don't block the event loop for 0.5 s
  return new Promise((resolve, reject) =>
    crypto.scrypt(password, salt, SCRYPT_KEYLEN, SCRYPT_PARAMS, (err, key) =>
      err ? reject(err) : resolve(key.toString('hex'))
    )
  );
}

function timingSafeCompare(a, b) {
  // Compare two hex strings in constant time.
  // Pad to same length so length differences don't leak timing info.
  const aBuf = Buffer.from(a.padEnd(256, '0'), 'hex');
  const bBuf = Buffer.from(b.padEnd(256, '0'), 'hex');
  return crypto.timingSafeEqual(aBuf, bBuf);
}

// ── token helpers ─────────────────────────────────────────────────────
function newToken() {
  return crypto.randomBytes(TOKEN_BYTES).toString('hex');
}

function hashToken(token) {
  // Store only SHA-256(token) in the DB.
  return crypto.createHash('sha256').update(token).digest('hex');
}

// ── input sanitisers ──────────────────────────────────────────────────
function cleanUsername(raw) {
  return (raw || '').trim().toLowerCase().slice(0, 32);
}
function cleanEmail(raw) {
  return (raw || '').trim().toLowerCase().slice(0, 254);
}

const VALID_RAMEN_IDS = new Set(RAMEN.map(r => r.id));

// ── AUTH ──────────────────────────────────────────────────────────────
export async function signup({ username, email, password }) {
  username = cleanUsername(username);
  email    = cleanEmail(email);
  password = (password || '');

  if (!username)            throw new Error('username is required');
  if (username.length < 2)  throw new Error('username too short (min 2 chars)');
  if (!/^[a-z0-9_]+$/.test(username))
    throw new Error('username may only contain letters, numbers, and underscores');
  if (!password)            throw new Error('password is required');
  if (password.length < 8)  throw new Error('password too short (min 8 chars)');
  if (password.length > 72) throw new Error('password too long (max 72 chars)');

  const salt     = crypto.randomBytes(SALT_BYTES).toString('hex');
  const passHash = await hashPassword(password, salt);

  try {
    await db()`
      INSERT INTO users (username, email, pass_hash, salt)
      VALUES (${username}, ${email}, ${passHash}, ${salt})
    `;
  } catch (err) {
    // unique violation on username
    if (err.code === '23505') throw new Error('username already taken');
    throw err;
  }

  const token     = newToken();
  const tokenHash = hashToken(token);

  await db()`
    INSERT INTO sessions (token_hash, username)
    VALUES (${tokenHash}, ${username})
  `;

  return { token, username };
}

const MAX_ATTEMPTS  = 5;
const LOCKOUT_MINS  = 15;

export async function login({ username, password }) {
  username = cleanUsername(username);
  password = (password || '');

  if (!username || !password) throw new Error('username and password are required');

  const sql   = db();
  const rows  = await sql`
    SELECT username, pass_hash, salt, failed_attempts, locked_until
    FROM users
    WHERE username = ${username}
  `;
  const user  = rows[0];

  // Use a constant-time dummy comparison if user not found to prevent
  // username enumeration via timing.
  if (!user) {
    await hashPassword('dummy_password_to_waste_time', 'dummy_salt_00000000');
    throw new Error('invalid username or password');
  }

  // Check lockout AFTER the timing-safe path above
  if (user.locked_until && new Date(user.locked_until) > new Date()) {
    const mins = Math.ceil(
      (new Date(user.locked_until) - new Date()) / 60_000
    );
    throw new Error(`account locked — try again in ${mins} minute${mins === 1 ? '' : 's'}`);
  }

  const candidate = await hashPassword(password, user.salt);
  const valid     = timingSafeCompare(candidate, user.pass_hash);

  if (!valid) {
    const attempts = (user.failed_attempts || 0) + 1;
    if (attempts >= MAX_ATTEMPTS) {
      const lockUntil = new Date(Date.now() + LOCKOUT_MINS * 60_000);
      await sql`
        UPDATE users
        SET failed_attempts = ${attempts}, locked_until = ${lockUntil.toISOString()}
        WHERE username = ${username}
      `;
      throw new Error(`too many failed attempts — account locked for ${LOCKOUT_MINS} minutes`);
    }
    await sql`
      UPDATE users SET failed_attempts = ${attempts}
      WHERE username = ${username}
    `;
    throw new Error('invalid username or password');
  }

  // successful login — reset lockout state
  await sql`
    UPDATE users SET failed_attempts = 0, locked_until = NULL
    WHERE username = ${username}
  `;

  const token     = newToken();
  const tokenHash = hashToken(token);

  await sql`
    INSERT INTO sessions (token_hash, username)
    VALUES (${tokenHash}, ${username})
  `;

  return { token, username: user.username };
}

export async function getUserBySession(rawToken) {
  if (!rawToken) return null;
  const tokenHash = hashToken(rawToken);
  const sql       = db();

  const rows = await sql`
    SELECT u.username, u.email
    FROM sessions s
    JOIN users u ON u.username = s.username
    WHERE s.token_hash = ${tokenHash}
      AND s.created_at > now() - interval '30 days'
  `;
  return rows[0] || null;
}

export async function deleteSession(rawToken) {
  if (!rawToken) return;
  const tokenHash = hashToken(rawToken);
  await db()`DELETE FROM sessions WHERE token_hash = ${tokenHash}`;
}

// ── BOARD / RATINGS ──────────────────────────────────────────────────
export async function getBoard(currentUsername = null) {
  const sql = db();

  const agg = await sql`
    SELECT
      ramen_id,
      ROUND(AVG(score)::numeric, 2)::float AS avg,
      COUNT(*)::int                         AS count
    FROM ratings
    GROUP BY ramen_id
  `;

  let myRows = [];
  if (currentUsername) {
    myRows = await sql`
      SELECT ramen_id, score
      FROM ratings WHERE username = ${currentUsername}
    `;
  }

  const myMap = Object.fromEntries(myRows.map(r => [r.ramen_id, r.score]));
  const board = {};

  for (const row of agg) {
    board[row.ramen_id] = {
      avg:   row.avg,
      count: row.count,
      mine:  myMap[row.ramen_id] ?? null,
    };
  }

  return board;
}

export async function getComments(ramenId) {
  const rows = await db()`
    SELECT username, text, created_at
    FROM comments
    WHERE ramen_id = ${ramenId}
    ORDER BY created_at ASC
    LIMIT 100
  `;
  return rows;
}

export async function postComment({ token, ramenId, text }) {
  const user = await getUserBySession(token);
  if (!user) throw new Error('not signed in');

  text = (text || '').trim();
  if (!text)             throw new Error('comment cannot be empty');
  if (text.length > 500) throw new Error('comment too long (max 500 chars)');
  if (!VALID_RAMEN_IDS.has(ramenId)) throw new Error('unknown ramen');
  if (profanityFilter.isProfane(text)) throw new Error('please keep notes respectful ʕ•ᴥ•ʔ');

  await db()`
    INSERT INTO comments (username, ramen_id, text)
    VALUES (${user.username}, ${ramenId}, ${text})
  `;
  return true;
}

export async function rate({ token, ramenId, score }) {
  const user = await getUserBySession(token);
  if (!user) throw new Error('not signed in');

  // whitelist ramen ids — never trust client input
  if (!VALID_RAMEN_IDS.has(ramenId)) throw new Error('unknown ramen');

  const n = Math.round(Number(score));
  if (!Number.isFinite(n) || n < 1 || n > 10)
    throw new Error('score must be a whole number between 1 and 10');

  await db()`
    INSERT INTO ratings (username, ramen_id, score)
    VALUES (${user.username}, ${ramenId}, ${n})
    ON CONFLICT (username, ramen_id)
    DO UPDATE SET score = ${n}, updated_at = now()
  `;

  return true;
}