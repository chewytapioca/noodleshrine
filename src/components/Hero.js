'use client';
import { RAMEN } from '@/lib/ramen';

export default function Hero() {
  const picks = RAMEN.slice(0, 3);
  return (
    <section className="hero" id="shrine">
      <div className="hero-left">
        <div>
          <h1 className="display">Noodle<br />Shrine</h1>
          <p className="hero-blurb">
            Slurp, score, repeat. Rate the world&apos;s<br />
            best instant ramen with the community.<br />
            <span className="kao">ʕ→ᴥ←ʔ &nbsp;·&nbsp; (˶ᵔ ᵕ ᵔ˶)</span>
          </p>
        </div>
        <a className="hero-cta" href="#try">
          <span className="stack stack-2"></span>
          <span className="stack"></span>
          <span className="btn">RANK NOODLES</span>
        </a>
      </div>
      <div className="hero-right">
        <div className="hero-stack">
          {picks.map((r, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={r.id} src={r.img} alt={r.name} className={`stack-pack pack-${i + 1}`} />
          ))}
        </div>
      </div>
    </section>
  );
}