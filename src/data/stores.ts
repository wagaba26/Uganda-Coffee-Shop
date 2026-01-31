export interface Store {
  id: string;
  slug: string;
  name: {
    en: string;
    ja: string;
  };
  address: {
    en: string;
    ja: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  hours: {
    en: string;
    ja: string;
  };
  phone: string;
  features: string[];
  image: string;
}

export const stores: Store[] = [
  {
    id: '1',
    slug: 'shibuya-crossing',
    name: { en: 'Uganda Coffee Shop - Shibuya', ja: 'ウガンダコーヒーショップ - 渋谷' },
    address: { en: '1-23-45 Shibuya, Shibuya-ku, Tokyo 150-0002', ja: '〒150-0002 東京都渋谷区渋谷1-23-45' },
    coordinates: { lat: 35.6580, lng: 139.7016 },
    hours: { en: 'Mon-Sun: 7:00 AM - 10:00 PM', ja: '月〜日: 7:00 - 22:00' },
    phone: '03-1234-5678',
    features: ['wifi', 'roastery', 'espresso', 'outdoor-seating'],
    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=2047&auto=format&fit=crop'
  },
  {
    id: '2',
    slug: 'kyoto-higashiyama',
    name: { en: 'Uganda Coffee Shop - Kyoto', ja: 'ウガンダコーヒーショップ - 京都東山' },
    address: { en: '456 Higashiyama-ku, Kyoto 605-0001', ja: '〒605-0001 京都府京都市東山区456' },
    coordinates: { lat: 35.0035, lng: 135.7792 },
    hours: { en: 'Mon-Sun: 8:00 AM - 6:00 PM', ja: '月〜日: 8:00 - 18:00' },
    phone: '075-123-4567',
    features: ['wifi', 'pourover', 'garden', 'historic-building'],
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: '3',
    slug: 'osaka-umeda',
    name: { en: 'Uganda Coffee Shop - Osaka', ja: 'ウガンダコーヒーショップ - 大阪梅田' },
    address: { en: '7-8-9 Umeda, Kita-ku, Osaka 530-0001', ja: '〒530-0001 大阪府大阪市北区梅田7-8-9' },
    coordinates: { lat: 34.7025, lng: 135.4959 },
    hours: { en: 'Mon-Sat: 7:30 AM - 9:00 PM', ja: '月〜土: 7:30 - 21:00' },
    phone: '06-1234-5678',
    features: ['wifi', 'espresso', 'pastries', 'study-space'],
    image: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=2071&auto=format&fit=crop'
  },
  {
    id: '4',
    slug: 'fukuoka-tenjin',
    name: { en: 'Uganda Coffee Shop - Fukuoka', ja: 'ウガンダコーヒーショップ - 福岡天神' },
    address: { en: '1-2-3 Tenjin, Chuo-ku, Fukuoka 810-0001', ja: '〒810-0001 福岡県福岡市中央区天神1-2-3' },
    coordinates: { lat: 33.5902, lng: 130.3989 },
    hours: { en: 'Mon-Sun: 8:00 AM - 8:00 PM', ja: '月〜日: 8:00 - 20:00' },
    phone: '092-123-4567',
    features: ['wifi', 'roastery', 'pet-friendly', 'terrace'],
    image: 'https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=2070&auto=format&fit=crop'
  },
  {
    id: '5',
    slug: 'yokohama-minatomirai',
    name: { en: 'Uganda Coffee Shop - Yokohama', ja: 'ウガンダコーヒーショップ - 横浜みなとみらい' },
    address: { en: '3-4-5 Minatomirai, Nishi-ku, Yokohama 220-0012', ja: '〒220-0012 神奈川県横浜市西区みなとみらい3-4-5' },
    coordinates: { lat: 35.4548, lng: 139.6312 },
    hours: { en: 'Mon-Sun: 9:00 AM - 9:00 PM', ja: '月〜日: 9:00 - 21:00' },
    phone: '045-123-4567',
    features: ['wifi', 'espresso', 'sea-view', 'outdoor-seating'],
    image: 'https://images.unsplash.com/photo-1575424909138-038352702755?q=80&w=2070&auto=format&fit=crop'
  }
];
