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
    desc: 'the original GOAT — spicy beef broth that built the instant ramen empire',
    comments: [
      { user: 'oldschool',  color: '#c8421e', text: 'been eating this since i was 6. nothing comes close to the broth. nothing.' },
      { user: 'spice_lord', color: '#d4a020', text: 'add an egg and some green onion and it\'s actually a meal. iconic.' },
      { user: 'purist',     color: '#9c6dd8', text: 'all these fancy buldak flavors are cool but shin ramyun is the mountain everything else is measured against' },
      { user: 'seoulbowl',  color: '#5c8bb8', text: 'the dried mushroom pieces in here are genuinely delicious' },
      { user: 'ramenfan99', color: '#4db6ac', text: 'standard go-to. stock a case of this and you\'re never unprepared' },
    ]
  },
  {
    id: 'shin-black',
    name: 'Shin Ramyun Black',
    ko: '신라면 블랙',
    img: '/ramen/shin-black.png',
    heat: 8, maker: 'Nongshim', tags: ['Nongshim', 'brothy', 'premium', 'Korea'],
    desc: 'premium upgrade with garlic-mushroom beef bone broth — richer, deeper, more luxurious',
    comments: [
      { user: 'upgrade_andy',  color: '#c8421e', text: 'if shin ramyun is a 10 this is an 11' },
      { user: 'bone_broth_bae', color: '#d4a020', text: 'the bone broth base is noticeably thicker and more savory. worth the extra cost' },
      { user: 'luxurynoodle',  color: '#5c8bb8', text: 'top tier gift for ramen fans who think they\'ve had everything' },
    ]
  },
  {
    id: 'carbonara',
    name: 'Buldak Carbonara',
    ko: '불닭볶음면 까르보',
    img: '/ramen/pink_buldak.png',
    heat: 7, maker: 'Samyang', tags: ['Samyang', 'stir-fried', 'creamy-spicy', 'Korea'],
    desc: 'rosy cheese sauce meets fire noodles — addictive from the first slurp',
    comments: [
      { user: 'noods4eva',   color: '#e8603a', text: 'honestly the perfect balance of spicy and creamy. i could eat this every day' },
      { user: 'ramenqueen',  color: '#9c6dd8', text: 'the cheese sauce makes it SO much more addictive than regular buldak' },
      { user: 'heatseeker',  color: '#d4a020', text: 'mild enough to actually taste the carbonara flavor, 10/10' },
      { user: 'tiktokramen', color: '#5c8bb8', text: 'went viral for a reason. the sauce coating on the noodles is insane' },
      { user: 'k_foodie',    color: '#4db6ac', text: 'if you\'re scared of regular buldak, start here. gateway drug' },
    ]
  },
  {
    id: 'cream',
    name: 'Buldak Cream Carbonara',
    ko: '크림 까르보나라',
    img: '/ramen/cream_carbonara.png',
    heat: 5, maker: 'Samyang', tags: ['Samyang', 'stir-fried', 'silky', 'Korea'],
    desc: 'dreamiest of the lineup — silky cream sauce with the gentlest heat',
    comments: [
      { user: 'softspicy',  color: '#4db6ac', text: 'this is what i give to people who say they can\'t handle spice. converts every time' },
      { user: 'noodle_mom', color: '#e8603a', text: 'the cream sauce coats every noodle so perfectly. absolute comfort food' },
      { user: 'hochi_fan',  color: '#9c6dd8', text: 'lighter than carbonara but somehow still rich? hochi knows what she\'s doing' },
      { user: 'mildgang',   color: '#5c8bb8', text: 'perfect late night snack when you want flavor without suffering' },
    ]
  },
  {
    id: 'rose',
    name: 'Buldak Rosé',
    ko: '로제 불닭볶음면',
    img: '/ramen/rose_buldak.png',
    heat: 6, maker: 'Samyang', tags: ['Samyang', 'stir-fried', 'rosé sauce', 'Korea'],
    desc: 'tomato cream meets gochujang heat — the most aesthetic bowl in the shrine',
    comments: [
      { user: 'pastavibes', color: '#e8603a', text: 'it literally tastes like a spicy arrabbiata cream pasta. so good??' },
      { user: 'k_foodie',   color: '#5c8bb8', text: 'the pink color when you mix it absolutely stunning, tastes even better' },
      { user: 'heatcheck',  color: '#9c6dd8', text: 'hits different with a soft boiled egg on top. trust me on this' },
      { user: 'aesthetic_eats', color: '#f4a0c0', text: 'genuinely the prettiest ramen i have ever made. instagram worthy every time' },
    ]
  },
  {
    id: 'buldak-original',
    name: 'Buldak Original',
    ko: '불닭볶음면',
    img: '/ramen/buldak-original.png',
    heat: 10, maker: 'Samyang', tags: ['Samyang', 'stir-fried', 'extremely-spicy', 'Korea'],
    desc: 'the fire noodle challenge original — legendary heat that launched a million tears',
    comments: [
      { user: 'firebreathr', color: '#c8421e', text: 'ate this on a dare. cried. ordered more the next day.' },
      { user: 'capsaicin_queen', color: '#d4a020', text: 'add the whole sauce packet if you\'re brave. half if you want to survive.' },
      { user: 'tiktok_tears', color: '#9c6dd8', text: 'the tiktok challenge exists for a reason. this is genuinely painful and genuinely delicious' },
      { user: 'spice_veteran', color: '#5c8bb8', text: 'if this is your daily driver you are a different breed and i respect you' },
      { user: 'milkplease', color: '#4db6ac', text: 'keep dairy nearby. not optional.' },
    ]
  },
  {
    id: 'jjajang',
    name: 'Chapagetti',
    ko: '짜파게티',
    img: '/ramen/jjajang.png',
    heat: 2, maker: 'Nongshim', tags: ['Nongshim', 'stir-fried', 'black-bean', 'Korea'],
    desc: 'black bean sauce stir-fried noodles — the ramen of Parasite fame, rich and savory',
    comments: [
      { user: 'parasitegal',  color: '#2a2a2a', text: 'watched parasite and made this immediately. zero regrets.' },
      { user: 'jjajang_life', color: '#9c6dd8', text: 'the closest instant noodle to real jjajangmyeon. it\'s genuinely good' },
      { user: 'mixtape',     color: '#d4a020', text: 'mix with neoguri for the real chapauri experience. game changing.' },
      { user: 'darkbowl',    color: '#5c8bb8', text: 'savory, deep, zero spice. perfect for spice-free days' },
    ]
  },
  {
    id: 'neoguri',
    name: 'Neoguri Spicy Seafood',
    ko: '너구리',
    img: '/ramen/neoguri.png',
    heat: 7, maker: 'Nongshim', tags: ['Nongshim', 'brothy', 'seafood', 'Korea'],
    desc: 'thick udon-style noodles in spicy seafood broth — cult favorite since 1982',
    comments: [
      { user: 'thicknoods',   color: '#5c8bb8', text: 'the thick noodles are everything. more texture than regular ramen, so satisfying' },
      { user: 'seafoodlvr',  color: '#4db6ac', text: 'real kelp and seafood flavor, not fake. one of the best broths out there' },
      { user: 'udon_or_ramen', color: '#d4a020', text: 'can\'t decide if it\'s udon or ramen. it doesn\'t matter. it\'s perfect.' },
      { user: 'classic_kfood', color: '#9c6dd8', text: 'mix with chapagetti and make chapauri. your life will never be the same.' },
    ]
  },

  // ── JAPAN ──────────────────────────────────────────────────────────
  {
    id: 'cup-noodle',
    name: 'Nissin Cup Noodle Original',
    ko: 'カップヌードル',
    img: '/ramen/cup-noodle.png',
    heat: 2, maker: 'Nissin', tags: ['Nissin', 'brothy', 'classic', 'Japan'],
    desc: 'the OG. invented by Momofuku Ando in 1971 — billions sold, still iconic',
    comments: [
      { user: 'og_eater',     color: '#d4a020', text: 'this is literally the reason instant noodles exist and it still holds up' },
      { user: 'airplane_meal', color: '#5c8bb8', text: 'best thing you can eat at 2am with nothing else in the fridge' },
      { user: '1971fan',      color: '#9c6dd8', text: 'classic for a reason. the mystery meat included is part of the experience.' },
      { user: 'world_eater',  color: '#4db6ac', text: 'available in like 80 countries. global icon. bow down.' },
    ]
  },
  {
    id: 'chicken-ramen',
    name: 'Nissin Chicken Ramen',
    ko: 'チキンラーメン',
    img: '/ramen/chicken-ramen.png',
    heat: 1, maker: 'Nissin', tags: ['Nissin', 'brothy', 'original', 'Japan'],
    desc: 'the very first instant noodle ever made (1958) — simple, light chicken broth',
    comments: [
      { user: 'history_buff',  color: '#d4a020', text: 'eating this is eating history. momofuku ando changed the world with this noodle.' },
      { user: 'gentle_slurp',  color: '#5c8bb8', text: 'the lightest, most delicate broth. total comfort food.' },
      { user: 'authentic_jp',  color: '#9c6dd8', text: 'crack an egg into the dry noodles before pouring hot water. the japanese way and it\'s perfect' },
    ]
  },
  {
    id: 'sapporo-miso',
    name: 'Sapporo Ichiban Miso',
    ko: '味噌ラーメン',
    img: '/ramen/sapporo-miso.png',
    heat: 3, maker: 'Sanyo Foods', tags: ['Sanyo', 'brothy', 'miso', 'Japan'],
    desc: 'deep fermented miso broth with a rich, umami-forward flavor profile',
    comments: [
      { user: 'misomisomiso',  color: '#d4a020', text: 'the miso flavor here is legit. much better than other instant miso ramens' },
      { user: 'umami_queen',   color: '#9c6dd8', text: 'add corn and butter for a sapporo-style miso ramen experience at home. incredible.' },
      { user: 'japan_trip',    color: '#5c8bb8', text: 'reminds me of the miso ramen i had in hokkaido. comfort in a packet.' },
    ]
  },
  {
    id: 'tonkotsu',
    name: 'Ippudo Tonkotsu',
    ko: '豚骨ラーメン',
    img: '/ramen/tonkotsu.png',
    heat: 3, maker: 'Ippudo', tags: ['Ippudo', 'brothy', 'tonkotsu', 'Japan'],
    desc: 'restaurant-grade tonkotsu pork bone broth from the famous Hakata ramen chain',
    comments: [
      { user: 'ramen_tourist',  color: '#d4a020', text: 'closest instant tonkotsu i\'ve ever had to the real thing. the richness is insane.' },
      { user: 'pork_king',     color: '#5c8bb8', text: 'if you want the experience of a $20 tonkotsu bowl for $3, this is it' },
      { user: 'hakata_lover',  color: '#9c6dd8', text: 'add chashu and nori and you will forget you\'re at home' },
    ]
  },

  // ── INDONESIA ──────────────────────────────────────────────────────
  {
    id: 'mi-goreng',
    name: 'Indomie Mi Goreng',
    ko: 'Mi Goreng',
    img: '/ramen/mi-goreng.png',
    heat: 3, maker: 'Indomie', tags: ['Indomie', 'stir-fried', 'classic', 'Indonesia'],
    desc: 'the world\'s most beloved dry noodle — 5 sachets of pure flavor magic from Indonesia',
    comments: [
      { user: 'indomie4life', color: '#e8603a', text: 'ate this for breakfast lunch and dinner for a week. i regret nothing.' },
      { user: 'goreng_gang',  color: '#9c6dd8', text: 'the five sachets system is unmatched. every ingredient has a purpose.' },
      { user: 'worldtraveler', color: '#d4a020', text: 'found this in australia, indonesia, netherlands, nigeria. truly a global icon' },
      { user: 'noodlephd',    color: '#5c8bb8', text: 'technically not ramen but honestly better than 90% of ramens i\'ve had' },
      { user: 'crackegg',     color: '#4db6ac', text: 'crack two eggs in while it\'s hot and it becomes a completely different meal' },
    ]
  },
  {
    id: 'indomie-spicy',
    name: 'Indomie Mi Goreng Pedas',
    ko: 'Pedas',
    img: '/ramen/indomie-spicy.png',
    heat: 6, maker: 'Indomie', tags: ['Indomie', 'stir-fried', 'spicy', 'Indonesia'],
    desc: 'the spicy sibling of mi goreng — same magic sauce base with serious sambal heat',
    comments: [
      { user: 'spicyindon',   color: '#c8421e', text: 'the sambal here is the real deal. not fake spicy. actual sambal heat.' },
      { user: 'mi_lover',     color: '#9c6dd8', text: 'everything that makes mi goreng great, now with heat. perfect upgrade.' },
      { user: 'indonesian_mom', color: '#d4a020', text: 'add fried shallots on top. trust.' },
    ]
  },

  // ── THAILAND ───────────────────────────────────────────────────────
  {
    id: 'mama-tom-yum',
    name: 'MAMA Tom Yum',
    ko: 'ต้มยำกุ้ง',
    img: '/ramen/mama-tom-yum.png',
    heat: 6, maker: 'MAMA', tags: ['MAMA', 'brothy', 'tom-yum', 'Thailand'],
    desc: 'iconic Thai tom yum prawn flavor — sour, spicy, fragrant with lemongrass and lime',
    comments: [
      { user: 'thai_obsessed', color: '#d4a020', text: 'this is the standard everyone else\'s tom yum is measured against. amazing.' },
      { user: 'sourpower',    color: '#5c8bb8', text: 'the lime and lemongrass are real, not artificial. you can smell it from across the room.' },
      { user: 'bangkokbowl',  color: '#9c6dd8', text: 'add shrimp, mushrooms, and lime juice fresh. street food level in minutes.' },
      { user: 'fragrance_fan', color: '#4db6ac', text: 'honestly might be top 3 broths in all of instant noodle history. bold claim. standing by it.' },
    ]
  },
  {
    id: 'mama-shrimp',
    name: 'MAMA Shrimp Creamy Tom Yum',
    ko: 'ต้มยำกุ้ง ครีมี่',
    img: '/ramen/mama-shrimp.png',
    heat: 5, maker: 'MAMA', tags: ['MAMA', 'brothy', 'creamy', 'Thailand'],
    desc: 'the creamier, milkier cousin of tom yum — coconut-style richness with prawn flavor',
    comments: [
      { user: 'creamydreamy',  color: '#f4a0c0', text: 'if you like tom yum but want it richer and more coconut-y this is perfect' },
      { user: 'thai_cuisine',  color: '#5c8bb8', text: 'tastes like tom kha gai crossed with tom yum. extremely pleasant.' },
    ]
  },

  // ── MALAYSIA ───────────────────────────────────────────────────────
  {
    id: 'maggi-asam-laksa',
    name: 'Maggi Asam Laksa',
    ko: 'Asam Laksa',
    img: '/ramen/maggi-asam-laksa.png',
    heat: 5, maker: 'Nestlé', tags: ['Nestle', 'brothy', 'laksa', 'Malaysia'],
    desc: 'tamarind-sour fish broth that captures the legendary Penang asam laksa — intensely complex',
    comments: [
      { user: 'penang_native',  color: '#d4a020', text: 'not the real thing but genuinely the best instant laksa i\'ve had. really captures the sour fish vibe.' },
      { user: 'sourhead',       color: '#9c6dd8', text: 'if you\'ve never had asam laksa before prepare to question every other noodle you\'ve eaten' },
      { user: 'southeast_asia', color: '#5c8bb8', text: 'brought a case back from malaysia. rationing it like gold.' },
      { user: 'umami_hunter',   color: '#4db6ac', text: 'the most unique flavor profile in instant noodles. nothing else tastes like this.' },
    ]
  },
  {
    id: 'mykuali',
    name: 'MyKuali Penang White Curry',
    ko: 'Penang White Curry Noodle',
    img: '/ramen/mykuali.png',
    heat: 5, maker: 'MyKuali', tags: ['MyKuali', 'brothy', 'curry', 'Malaysia'],
    desc: 'award-winning Penang white curry — rich coconut milk broth with turmeric warmth',
    comments: [
      { user: 'penang_curry',   color: '#d4a020', text: 'voted best instant noodle multiple years. this is a real title and it is deserved.' },
      { user: 'curry_queen',    color: '#9c6dd8', text: 'the coconut milk base is creamy, the curry is complex. unreal for instant' },
      { user: 'award_chaser',   color: '#5c8bb8', text: 'sought this out specifically because of the awards. 100% worth the hunt.' },
    ]
  },

  // ── UNITED STATES ──────────────────────────────────────────────────
  {
    id: 'maruchan-chicken',
    name: 'Maruchan Chicken',
    ko: 'チキン味',
    img: '/ramen/maruchan-chicken.png',
    heat: 1, maker: 'Maruchan', tags: ['Maruchan', 'brothy', 'classic', 'USA'],
    desc: 'the all-american classic — the noodle that fed a generation on $0.25 a meal',
    comments: [
      { user: 'dormlife',   color: '#d4a020', text: 'this got me through college. no notes, no regrets.' },
      { user: 'noodle_dad', color: '#4db6ac', text: 'simple, reliable, hits the spot when you need something easy' },
      { user: 'retroeats',  color: '#5c8bb8', text: 'underrated actually — add butter, soy sauce and a fried egg and it slaps' },
      { user: '90s_kid',    color: '#9c6dd8', text: 'saturday morning cartoons. maruchan. core memory.' },
      { user: 'budgetking', color: '#e8603a', text: 'still 25 cents at walmart. respect this noodle.' },
    ]
  },
  {
    id: 'top-ramen-beef',
    name: 'Nissin Top Ramen Beef',
    ko: 'Top Ramen Beef',
    img: '/ramen/top-ramen-beef.png',
    heat: 2, maker: 'Nissin', tags: ['Nissin', 'brothy', 'classic', 'USA'],
    desc: 'beefy, salty, nostalgic — the other american icon that lives in every pantry',
    comments: [
      { user: 'beef_ramen_guy', color: '#c8421e', text: 'maruchan vs top ramen is the pepsi vs coke of instant noodles. i\'m team top ramen.' },
      { user: 'pantry_queen',   color: '#5c8bb8', text: 'always have 10 packs of this. always.' },
      { user: 'umami_simple',   color: '#d4a020', text: 'add a splash of worcestershire sauce and it\'s actually incredible' },
    ]
  },

]; 