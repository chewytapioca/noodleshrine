// Ramen catalog — images live in public/ramen/
// For globally sourced entries without a local image, img points to the
// closest available pack or falls back to /ramen/shin_ramen.png.
// Replace img paths once you add the real pack art to public/ramen/.

export const RAMEN = [

  // ── KOREA ─────────────────────────────────────────────────────────
  {
    id: 'shin',
    name: 'Shin Ramyun',
    ko: '신라면',
    img: '/ramen/shin_ramen.png',
    heat: 8, maker: 'Nongshim', tags: ['Nongshim', 'brothy', 'classic', 'Korea'],
    desc: 'the original GOAT — spicy beef broth that built the instant ramen empire'
  },
  {
    id: 'shin-black',
    name: 'Shin Ramyun Black',
    ko: '신라면 블랙',
    img: '/ramen/shin-black.png',
    heat: 8, maker: 'Nongshim', tags: ['Nongshim', 'brothy', 'premium', 'Korea'],
    desc: 'premium upgrade with garlic-mushroom beef bone broth — richer, deeper, more luxurious'
  },
  {
    id: 'carbonara',
    name: 'Buldak Carbonara',
    ko: '불닭볶음면 까르보',
    img: '/ramen/pink_buldak.png',
    heat: 7, maker: 'Samyang', tags: ['Samyang', 'stir-fried', 'creamy-spicy', 'Korea'],
    desc: 'rosy cheese sauce meets fire noodles — addictive from the first slurp'
  },
  {
    id: 'cream',
    name: 'Buldak Cream Carbonara',
    ko: '크림 까르보나라',
    img: '/ramen/cream_carbonara.png',
    heat: 5, maker: 'Samyang', tags: ['Samyang', 'stir-fried', 'silky', 'Korea'],
    desc: 'dreamiest of the lineup — silky cream sauce with the gentlest heat'
  },
  {
    id: 'rose',
    name: 'Buldak Rosé',
    ko: '로제 불닭볶음면',
    img: '/ramen/rose_buldak.png',
    heat: 6, maker: 'Samyang', tags: ['Samyang', 'stir-fried', 'rosé sauce', 'Korea'],
    desc: 'tomato cream meets gochujang heat — the most aesthetic bowl in the shrine'
  },
  {
    id: 'buldak-original',
    name: 'Buldak Original',
    ko: '불닭볶음면',
    img: '/ramen/buldak-original.png',
    heat: 10, maker: 'Samyang', tags: ['Samyang', 'stir-fried', 'extremely-spicy', 'Korea'],
    desc: 'the fire noodle challenge original — legendary heat that launched a million tears'
  },
  {
    id: 'jjajang',
    name: 'Chapagetti',
    ko: '짜파게티',
    img: '/ramen/jjajang.png',
    heat: 2, maker: 'Nongshim', tags: ['Nongshim', 'stir-fried', 'black-bean', 'Korea'],
    desc: 'black bean sauce stir-fried noodles — the ramen of Parasite fame, rich and savory'
  },
  {
    id: 'neoguri',
    name: 'Neoguri Spicy Seafood',
    ko: '너구리',
    img: '/ramen/neoguri.png',
    heat: 7, maker: 'Nongshim', tags: ['Nongshim', 'brothy', 'seafood', 'Korea'],
    desc: 'thick udon-style noodles in spicy seafood broth — cult favorite since 1982'
  },

  // ── JAPAN ──────────────────────────────────────────────────────────
  {
    id: 'cup-noodle',
    name: 'Nissin Cup Noodle Original',
    ko: 'カップヌードル',
    img: '/ramen/cup-noodle.png',
    heat: 2, maker: 'Nissin', tags: ['Nissin', 'brothy', 'classic', 'Japan'],
    desc: 'the OG. invented by Momofuku Ando in 1971 — billions sold, still iconic'
  },
  {
    id: 'chicken-ramen',
    name: 'Nissin Chicken Ramen',
    ko: 'チキンラーメン',
    img: '/ramen/chicken-ramen.png',
    heat: 1, maker: 'Nissin', tags: ['Nissin', 'brothy', 'original', 'Japan'],
    desc: 'the very first instant noodle ever made (1958) — simple, light chicken broth'
  },
  {
    id: 'sapporo-miso',
    name: 'Sapporo Ichiban Miso',
    ko: '味噌ラーメン',
    img: '/ramen/sapporo-miso.png',
    heat: 3, maker: 'Sanyo Foods', tags: ['Sanyo', 'brothy', 'miso', 'Japan'],
    desc: 'deep fermented miso broth with a rich, umami-forward flavor profile'
  },
  {
    id: 'tonkotsu',
    name: 'Ippudo Tonkotsu',
    ko: '豚骨ラーメン',
    img: '/ramen/tonkotsu.png',
    heat: 3, maker: 'Ippudo', tags: ['Ippudo', 'brothy', 'tonkotsu', 'Japan'],
    desc: 'restaurant-grade tonkotsu pork bone broth from the famous Hakata ramen chain'
  },

  // ── INDONESIA ──────────────────────────────────────────────────────
  {
    id: 'mi-goreng',
    name: 'Indomie Mi Goreng',
    ko: 'Mi Goreng',
    img: '/ramen/mi-goreng.png',
    heat: 3, maker: 'Indomie', tags: ['Indomie', 'stir-fried', 'classic', 'Indonesia'],
    desc: 'the world\'s most beloved dry noodle — 5 sachets of pure flavor magic from Indonesia'
  },
  {
    id: 'indomie-spicy',
    name: 'Indomie Mi Goreng Pedas',
    ko: 'Pedas',
    img: '/ramen/indomie-spicy.png',
    heat: 6, maker: 'Indomie', tags: ['Indomie', 'stir-fried', 'spicy', 'Indonesia'],
    desc: 'the spicy sibling of mi goreng — same magic sauce base with serious sambal heat'
  },

  // ── THAILAND ───────────────────────────────────────────────────────
  {
    id: 'mama-tom-yum',
    name: 'MAMA Tom Yum',
    ko: 'ต้มยำกุ้ง',
    img: '/ramen/mama-tom-yum.png',
    heat: 6, maker: 'MAMA', tags: ['MAMA', 'brothy', 'tom-yum', 'Thailand'],
    desc: 'iconic Thai tom yum prawn flavor — sour, spicy, fragrant with lemongrass and lime'
  },
  {
    id: 'mama-shrimp',
    name: 'MAMA Shrimp Creamy Tom Yum',
    ko: 'ต้มยำกุ้ง ครีมี่',
    img: '/ramen/mama-shrimp.png',
    heat: 5, maker: 'MAMA', tags: ['MAMA', 'brothy', 'creamy', 'Thailand'],
    desc: 'the creamier, milkier cousin of tom yum — coconut-style richness with prawn flavor'
  },

  // ── MALAYSIA ───────────────────────────────────────────────────────
  {
    id: 'maggi-asam-laksa',
    name: 'Maggi Asam Laksa',
    ko: 'Asam Laksa',
    img: '/ramen/maggi-asam-laksa.png',
    heat: 5, maker: 'Nestlé', tags: ['Nestle', 'brothy', 'laksa', 'Malaysia'],
    desc: 'tamarind-sour fish broth that captures the legendary Penang asam laksa — intensely complex'
  },
  {
    id: 'mykuali',
    name: 'MyKuali Penang White Curry',
    ko: 'Penang White Curry Noodle',
    img: '/ramen/mykuali.png',
    heat: 5, maker: 'MyKuali', tags: ['MyKuali', 'brothy', 'curry', 'Malaysia'],
    desc: 'award-winning Penang white curry — rich coconut milk broth with turmeric warmth'
  },

  // ── UNITED STATES ──────────────────────────────────────────────────
  {
    id: 'maruchan-chicken',
    name: 'Maruchan Chicken',
    ko: 'チキン味',
    img: '/ramen/maruchan-chicken.png',
    heat: 1, maker: 'Maruchan', tags: ['Maruchan', 'brothy', 'classic', 'USA'],
    desc: 'the all-american classic — the noodle that fed a generation on $0.25 a meal'
  },
  {
    id: 'top-ramen-beef',
    name: 'Nissin Top Ramen Beef',
    ko: 'Top Ramen Beef',
    img: '/ramen/top-ramen-beef.png',
    heat: 2, maker: 'Nissin', tags: ['Nissin', 'brothy', 'classic', 'USA'],
    desc: 'beefy, salty, nostalgic — the other american icon that lives in every pantry'
  },

];