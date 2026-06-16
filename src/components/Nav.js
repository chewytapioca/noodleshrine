'use client';
import { useShrine } from '@/lib/shrine-context';
import { api } from '@/lib/api';

export default function Nav() {
  const { user, openAuth, refresh } = useShrine();

  const logout = async () => {
    await api.logout();
    await refresh();
  };

  return (
    <nav className="topbar">
      <div className="brand">
        <span className="bear">ʕ•ᴥ•ʔ</span>
        NOODLE SHRINE
      </div>
      <ul className="nav-links">
        <li><a href="#shrine">SHRINE</a></li>
        <li><a href="#try">RANK</a></li>
        <li><a href="#customize">FILTER</a></li>
        <li><a href="#top">TOP</a></li>
        <li><a href="#notes">NOTES</a></li>
        <li><a href="#contact">CONTACT</a></li>
      </ul>
      <div className="nav-icons">
        {user ? (
          <>
            <button className="who" title="logged in">@{user.slice(0, 10)}</button>
            <button className="who" onClick={logout}>LOG OUT</button>
          </>
        ) : (
          <>
            <button className="who" onClick={() => openAuth('login')}>SIGN IN</button>
            <button className="who" onClick={() => openAuth('signup')}>SIGN UP</button>
          </>
        )}
      </div>
    </nav>
  );
}webkitURL