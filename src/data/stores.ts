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
    name: { en: 'kitchen SAWASAWA', ja: 'kitchen SAWASAWA' },
    city: { en: 'Higashi Osaka City', ja: 'Higashi Osaka City' },
    contact: {
      en: '1-7-14 Hanazonohonmachi, Higashiosaka City, Osaka, Japan; Phone: 072-964-4457; Hours: 10:00-19:00 (closed Monday)',
      ja: '1-7-14 Hanazonohonmachi, Higashiosaka City, Osaka, Japan; Phone: 072-964-4457; Hours: 10:00-19:00 (closed Monday)'
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
    name: { en: 'Yasashii Gyoza', ja: 'Yasashii Gyoza' },
    city: { en: 'Hofu City', ja: 'Hofu City' },
    contact: {
      en: '12-20 Motohashi-cho, Hofu City, Yamaguchi Prefecture, Japan; Open 24 hours',
      ja: '12-20 Motohashi-cho, Hofu City, Yamaguchi Prefecture, Japan; Open 24 hours'
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
    name: { en: "PANAF' African Dining Hall", ja: "PANAF' African Dining Hall" },
    city: { en: 'Osaka (Expo 2025)', ja: 'Osaka (Expo 2025)' },
    contact: {
      en: 'Shinsaibashi, Osaka (New store planned around March, part of Osaka Expo 2025)',
      ja: 'Shinsaibashi, Osaka (New store planned around March, part of Osaka Expo 2025)'
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
    name: { en: 'Chaoshien (Japanese Tea Shop)', ja: 'Chaoshien (Japanese Tea Shop)' },
    city: { en: 'Sanyo-Onoda City', ja: 'Sanyo-Onoda City' },
    contact: {
      en: 'In front of JR Onoda Station, Sanyo-Onoda City, Yamaguchi Prefecture, Japan; Hours: 9:30-17:30 (seasonal); Closed: 1st, 3rd & 5th Sundays',
      ja: 'In front of JR Onoda Station, Sanyo-Onoda City, Yamaguchi Prefecture, Japan; Hours: 9:30-17:30 (seasonal); Closed: 1st, 3rd & 5th Sundays'
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
    name: { en: 'English 4 U (E4U)', ja: 'English 4 U (E4U)' },
    city: { en: 'Ube City', ja: 'Ube City' },
    contact: {
      en: '755-0019 1-33 Higashishinkawa-cho 2F, Ube City, Yamaguchi Prefecture, Japan',
      ja: '755-0019 1-33 Higashishinkawa-cho 2F, Ube City, Yamaguchi Prefecture, Japan'
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
    name: { en: 'Omusubi Robin', ja: 'Omusubi Robin' },
    city: { en: 'Ube City', ja: 'Ube City' },
    contact: {
      en: '2-1-15 Shinten-machi, Ube City, Yamaguchi Prefecture, Japan; Hours: 11:00-14:00; Closed: Sat, Sun & holidays',
      ja: '2-1-15 Shinten-machi, Ube City, Yamaguchi Prefecture, Japan; Hours: 11:00-14:00; Closed: Sat, Sun & holidays'
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
    name: { en: 'Piccoro Coffee', ja: 'Piccoro Coffee' },
    city: { en: 'Ube City', ja: 'Ube City' },
    contact: {
      en: '2-7-20 Shinten-machi, Ube City, Yamaguchi Prefecture, Japan; Hours: 6:00-14:00; Sat & holidays: 8:00-16:00; Closed: Sun & Mon',
      ja: '2-7-20 Shinten-machi, Ube City, Yamaguchi Prefecture, Japan; Hours: 6:00-14:00; Sat & holidays: 8:00-16:00; Closed: Sun & Mon'
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
    name: { en: 'Nishida Coffee', ja: 'Nishida Coffee' },
    city: { en: 'Yamaguchi City', ja: 'Yamaguchi City' },
    contact: {
      en: 'Yuda Onsen, Yamaguchi City, Yamaguchi Prefecture, Japan',
      ja: 'Yuda Onsen, Yamaguchi City, Yamaguchi Prefecture, Japan'
    },
    instagram: {
      handle: 'nishida_coffee',
      url: 'https://www.instagram.com/nishida_coffee/'
    },
    image: '/images/locations/nishida-coffee.jpeg'
  }
];
