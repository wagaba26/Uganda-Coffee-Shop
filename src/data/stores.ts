export interface Store {
  id: string;
  slug: string;
  name: {
    en: string;
    ja: string;
  };
  city: {
    en: string;
    ja: string;
  };
  contact: {
    en: string;
    ja: string;
  };
  instagram: {
    handle: string;
    url: string;
  };
  image: string;
}

export const stores: Store[] = [
  {
    id: '1',
    slug: 'kitchen-sawasawa',
    name: { en: 'kitchen SAWASAWA', ja: 'キッチン サワサワ' },
    city: { en: 'Higashi Osaka City', ja: '東大阪市' },
    contact: {
      en: '1-7-14 Hanazonohonmachi, Higashiosaka City, Osaka, Japan; Phone: 072-964-4457; Hours: 10:00-19:00 (closed Monday)',
      ja: '〒578-0931 大阪府東大阪市花園本町1-7-14 / 電話: 072-964-4457 / 営業時間: 10:00-19:00（定休日: 月曜日）'
    },
    instagram: {
      handle: 'kitchen_sawasawa',
      url: 'https://www.instagram.com/kitchen_sawasawa/'
    },
    image: '/images/locations/kitchen-sawasawa.jpeg'
  },
  {
    id: '2',
    slug: 'yasashii-gyoza-hofu',
    name: { en: 'Yasashii Gyoza', ja: 'やさしい餃子' },
    city: { en: 'Hofu City', ja: '防府市' },
    contact: {
      en: '12-20 Motohashi-cho, Hofu City, Yamaguchi Prefecture, Japan; Open 24 hours',
      ja: '〒747-0054 山口県防府市本橋町12-20 / 24時間営業'
    },
    instagram: {
      handle: 'yasashii_gyoza_hofu',
      url: 'https://www.instagram.com/yasashii_gyoza_hofu/'
    },
    image: '/images/locations/yasashii-gyoza.jpeg'
  },
  {
    id: '3',
    slug: 'panaf-african-dining-hall',
    name: { en: "PANAF' African Dining Hall", ja: 'パナフ アフリカンダイニングホール' },
    city: { en: 'Osaka (Expo 2025)', ja: '大阪（万博2025）' },
    contact: {
      en: 'Shinsaibashi, Osaka (New store planned around March, part of Osaka Expo 2025)',
      ja: '大阪・心斎橋 / 2025年大阪・関西万博にて新店舗オープン予定（3月頃）'
    },
    instagram: {
      handle: 'panafexpo',
      url: 'https://www.instagram.com/panafexpo/'
    },
    image: '/images/locations/panaf.jpeg'
  },
  {
    id: '4',
    slug: 'chaoshien',
    name: { en: 'Chaoshien (Japanese Tea Shop)', ja: '茶香苑（日本茶専門店）' },
    city: { en: 'Sanyo-Onoda City', ja: '山陽小野田市' },
    contact: {
      en: 'In front of JR Onoda Station, Sanyo-Onoda City, Yamaguchi Prefecture, Japan; Hours: 9:30-17:30 (seasonal); Closed: 1st, 3rd & 5th Sundays',
      ja: 'JR小野田駅前 / 山口県山陽小野田市 / 営業時間: 9:30-17:30（季節により変動）/ 定休日: 第1・第3・第5日曜日'
    },
    instagram: {
      handle: 'chaoshien',
      url: 'https://www.instagram.com/chaoshien/'
    },
    image: '/images/locations/chaoshien.jpeg'
  },
  {
    id: '5',
    slug: 'english-4-u-ube',
    name: { en: 'English 4 U (E4U)', ja: 'イングリッシュフォーユー' },
    city: { en: 'Ube City', ja: '宇部市' },
    contact: {
      en: '755-0019 1-33 Higashishinkawa-cho 2F, Ube City, Yamaguchi Prefecture, Japan',
      ja: '〒755-0019 山口県宇部市東新川町1-33 2F'
    },
    instagram: {
      handle: 'e4u_ube',
      url: 'https://www.instagram.com/e4u_ube/'
    },
    image: '/images/locations/english-4-u.jpeg'
  },
  {
    id: '6',
    slug: 'omusubi-robin',
    name: { en: 'Omusubi Robin', ja: 'おむすびロビン' },
    city: { en: 'Ube City', ja: '宇部市' },
    contact: {
      en: '2-1-15 Shinten-machi, Ube City, Yamaguchi Prefecture, Japan; Hours: 11:00-14:00; Closed: Sat, Sun & holidays',
      ja: '〒755-0029 山口県宇部市新天町2-1-15 / 営業時間: 11:00-14:00 / 定休日: 土日祝'
    },
    instagram: {
      handle: 'omusubi.robin',
      url: 'https://www.instagram.com/omusubi.robin/'
    },
    image: '/images/locations/omusubi-robin.jpeg'
  },
  {
    id: '7',
    slug: 'piccoro-coffee',
    name: { en: 'Piccoro Coffee', ja: 'ピッコロコーヒー' },
    city: { en: 'Ube City', ja: '宇部市' },
    contact: {
      en: '2-7-20 Shinten-machi, Ube City, Yamaguchi Prefecture, Japan; Hours: 6:00-14:00; Sat & holidays: 8:00-16:00; Closed: Sun & Mon',
      ja: '〒755-0029 山口県宇部市新天町2-7-20 / 営業時間: 6:00-14:00（祝・土は8:00-16:00）/ 定休日: 日・月'
    },
    instagram: {
      handle: 'piccoro_coffee_',
      url: 'https://www.instagram.com/piccoro_coffee_/'
    },
    image: '/images/locations/piccoro-coffee.jpeg'
  },
  {
    id: '8',
    slug: 'nishida-coffee',
    name: { en: 'Nishida Coffee', ja: '西田珈琲' },
    city: { en: 'Yamaguchi City', ja: '山口市' },
    contact: {
      en: 'Yuda Onsen, Yamaguchi City, Yamaguchi Prefecture, Japan',
      ja: '山口県山口市 湯田温泉'
    },
    instagram: {
      handle: 'nishida_coffee',
      url: 'https://www.instagram.com/nishida_coffee/'
    },
    image: '/images/locations/nishida-coffee.jpeg'
  }
];
