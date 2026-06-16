'use client';
import { useState, useEffect } from 'react';
import { useShrine } from '@/lib/shrine-context';
import { api } from '@/lib/api';

export default function AuthModal() {
  const { authMode, closeAuth, openAuth, refresh } = useShrine();
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr]           = useState('');

  // reset state when mode changes
  useEffect(() => {
    if (authMode) {
      setUsername(''); setEmail(''); setPassword(''); setErr('');
    }
  }, [authMode]);

  // ESC to close
  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') closeAuth(); }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeAuth]);

  if (!authMode) return null;

  const isSignup = authMode === 'signup';

  const submit = async () => {
    setErr('');
    try {
      if (isSignup) await api.signup({ username, email, password });
      else          await api.login({ username, password });
      closeAuth();
      await refresh();
    } catch (e) {
      setErr(e.message);
    }
  };

  return (
    <div className="overlay" onClick={(e) => { if (e.target === e.currentTarget) closeAuth(); }}>
      <div className="modal">
        <button className="modal-close" onClick={closeAuth}>✕</button>
        <h3 className="display">{isSignup ? 'Join the shrine' : 'Welcome back'}</h3>
        <p className="sub">
          {isSignup
            ? 'create an account to rate & leave notes  (˶ᵔ ᵕ ᵔ˶)'
            : 'sign in to rate & leave notes  (◍•ᴗ•◍)'}
        </p>
        <div className="err">{err}</div>
        {isSignup && (
          <>
            <label>EMAIL</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </>
        )}
        <label>USERNAME</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="noodle_devotee"
          autoFocus
        />
        <label>PASSWORD</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          onKeyDown={(e) => { if (e.key === 'Enter') submit(); }}
        />
        <button className="submit" onClick={submit}>
          {isSignup ? 'JOIN ✿' : 'SIGN IN'}
        </button>
        <div className="swap">
          <span>{isSignup ? 'already a member?' : 'no account yet?'}</span>{' '}
          <button onClick={() => openAuth(isSignup ? 'login' : 'signup')}>
            {isSignup ? 'SIGN IN' : 'JOIN ✿'}
          </button>
        </div>
      </div>
    </div>
  );
}
