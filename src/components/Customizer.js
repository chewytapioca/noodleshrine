'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useShrine, filterAndSort } from '@/lib/shrine-context';
import { RAMEN } from '@/lib/ramen';

const OPTS = {
  brand: [
    ['all', 'All brands'],
    ['Samyang', 'Samyang'],
    ['Nongshim', 'Nongshim'],
    ['Nissin', 'Nissin'],
    ['Indomie', 'Indomie'],
    ['MAMA', 'MAMA'],
    ['Maruchan', 'Maruchan'],
    ['Sanyo', 'Sapporo'],
    ['Ippudo', 'Ippudo'],
    ['Nestle', 'Maggi'],
    ['MyKuali', 'MyKuali'],
  ],
  heat: [
    ['all', 'Any spice'],
    ['mild', 'Mild < 4'],
    ['medium', 'Medium 4–6'],
    ['hot', 'Hot 7+'],
  ],
  type: [
    ['all', 'All types'],
    ['stir-fried', 'Stir-fried'],
    ['brothy', 'Brothy'],
  ],
  sort: [
    ['score', 'Top rated'],
    ['votes', 'Most voted'],
    ['heat', 'Spiciest'],
    ['name', 'A–Z'],
  ],
  country: [
    ['all',       'All countries'],
    ['Korea',     'Korea'],
    ['Japan',     'Japan'],
    ['Indonesia', 'Indonesia'],
    ['Thailand',  'Thailand'],
    ['Malaysia',  'Malaysia'],
    ['USA',       'USA'],
  ],
};

function labelOf(key, val) {
  const m = OPTS[key].find(p => p[0] === val);
  return m ? m[1] : OPTS[key][0][1];
}

const ROW_LABELS = { brand: 'BRAND', heat: 'HEAT', type: 'TYPE', sort: 'SORT BY', country: 'COUNTRY' };

export default function Customizer() {
  const { board, filter, sort, setFilter, setSort, openDetail } = useShrine();
  const [open, setOpen]       = useState(null);
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0, width: 200 });
  const triggerRefs           = useRef({});

  // close on outside click
  useEffect(() => {
    function onClick(e) {
      if (!e.target.closest('.cust-row') && !e.target.closest('.cust-menu')) {
        setOpen(null);
      }
    }
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const openMenu = useCallback((key) => {
    if (open === key) { setOpen(null); return; }
    const el = triggerRefs.current[key];
    if (el) {
      const rect = el.getBoundingClientRect();
      setMenuPos({
        top:   rect.bottom + 6,
        left:  rect.left - rect.width * 2,   // align under the value cell
        width: rect.width * 3,               // span label + value + trigger
      });
    }
    setOpen(key);
  }, [open]);

  const pick = (key, val) => {
    if (key === 'sort') setSort(val);
    else setFilter(f => ({ ...f, [key]: val }));
    setOpen(null);
  };

  const current = {
    brand: filter.brand, heat: filter.heat,
    type: filter.type, sort, country: filter.country,
  };

  const featured = filterAndSort(RAMEN, filter, sort, board)[0] || RAMEN[0];

  return (
    <section className="section paper" id="customize">
      <div className="section-head">
        <h2 className="display">Find your<br />spicy match!</h2>
        <div className="burst" style={{ marginLeft: 'auto' }}>FILTER &amp;<br />SORT ♡</div>
        <p className="aside">
          Tweak the rows to narrow your perfect slurp. The grid above updates live.<br />
          <strong>HEADS-UP &nbsp;(˶ᵔ ᵕ ᵔ˶) &nbsp;</strong>
          ratings are community averages and refresh on every save.
        </p>
      </div>

      <div className="customize-row">
        <div className="customizer">
          {Object.keys(OPTS).map((key) => (
            <div className="cust-row" key={key}>
              <span className="cust-label">{ROW_LABELS[key]}</span>
              <span className="cust-value">{labelOf(key, current[key])}</span>
              <button
                className="cust-trigger"
                ref={el => { triggerRefs.current[key] = el; }}
                onClick={(e) => { e.stopPropagation(); openMenu(key); }}
              >▼</button>
            </div>
          ))}
        </div>

        <div className="customize-featured">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={featured.img} alt={featured.name} />
          <button className="plus-corner" onClick={() => openDetail(featured.id)}>+</button>
        </div>
      </div>

      {/* dropdown rendered in a portal-like fixed position, outside all overflow contexts */}
      {open && (
        <div
          className="cust-menu"
          style={{ top: menuPos.top, left: menuPos.left, width: menuPos.width }}
        >
          {OPTS[open].map(([val, lbl]) => (
            <button
              key={val}
              className={current[open] === val ? 'on' : ''}
              onClick={() => pick(open, val)}
            >
              {lbl}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}