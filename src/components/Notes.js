const TILES = [
  { c: 't-1', tag: 'RATING ♡',  quote: '"the perfect balance of spicy and creamy. i could eat this every day"', by: '@noods4eva', kao: '(˶ᵔ ᵕ ᵔ˶)' },
  { c: 't-2', tag: 'VERDICT',  quote: '"this is what i give to people who say they can\'t handle spice. converts every time"', by: '@softspicy', kao: '⊂◉‿◉つ' },
  { c: 't-3', tag: 'HOT TAKE', quote: '"all the fancy flavors are cool but Shin Ramyun is still the mountain everything is measured against"', by: '@purist', kao: 'ʕ→ᴥ←ʔ' },
  { c: 't-4', tag: 'PRO TIP',  quote: '"hits different with a soft boiled egg on top. trust me on this"', by: '@heatcheck', kao: '(◕‿◕)' },
  { c: 't-5', tag: 'NOSTALGIA', quote: '"got me through college. no notes, no regrets."', by: '@dormlife', kao: '(´｡• ᵕ •｡`)' },
];

export default function Notes() {
  return (
    <section className="section notes-section" id="notes">
      <div className="section-head centered">
        <h2 className="display">@noodleshrine</h2>
        <p style={{ marginTop: 6, fontFamily: "'Archivo Black', sans-serif", fontSize: '.78rem', letterSpacing: '.14em' }}>
          COMMUNITY NOTES &nbsp;ʕ•ᴥ•ʔ
        </p>
      </div>
      <div className="notes-grid">
        {TILES.map((t, i) => (
          <div key={i} className={`note-tile ${t.c}`}>
            <span className="tag">{t.tag}</span>
            <p className="quote">{t.quote}</p>
            <div><span className="by">{t.by}</span> &nbsp;<span className="kao">{t.kao}</span></div>
          </div>
        ))}
      </div>
    </section>
  );
}
