export interface Product {
    id: number;
    slug: string;
    name: {
        en: string;
        ja: string;
    };
    description: {
        en: string;
        ja: string;
    };
    price: number;
    image: string;
    category: 'liquid' | 'drip' | 'beans' | 'ground' | 'gifts';
}

export const products: Product[] = [
    {
        id: 1,
        slug: 'liquid-coffee-1l',
        name: {
            en: 'Terimba Coffee Organic Liquid Coffee (1L)',
            ja: 'テリンバコーヒー オーガニック リキッドコーヒー（1L）'
        },
        description: {
            en: '100% natural, unsweetened liquid coffee made from organic Ugandan coffee beans. Perfect for drinking straight, with milk, or for café and commercial use.',
            ja: 'ウガンダ産オーガニック豆を使用した、100％ナチュラルな無糖リキッドコーヒー。そのまま飲んでも、ミルクやアレンジにも最適。業務用にもおすすめ。'
        },
        price: 2480,
        image: '/images/products/liquid-coffee-1l.jpg',
        category: 'liquid'
    },
    {
        id: 2,
        slug: 'drip-coffee-box-10',
        name: {
            en: 'Terimba Coffee Organic Drip Coffee Pack (Ground) – Box of 10',
            ja: 'テリンバコーヒー オーガニック ドリップパック（粉）10パック／1箱'
        },
        description: {
            en: 'Convenient single-serve drip coffee packs made from organic Ugandan coffee. Ideal for home, office, or as a gift.',
            ja: '1杯ずつ手軽に楽しめるドリップタイプ。ウガンダ産オーガニックコーヒーの豊かな香りとコクを、ご家庭やギフトに。'
        },
        price: 3300,
        image: '/images/products/drip-coffee-box.jpg',
        category: 'drip'
    },
    {
        id: 3,
        slug: 'ground-coffee-100g',
        name: {
            en: 'Terimba Coffee Organic Ground Coffee (100g)',
            ja: 'テリンバコーヒー オーガニック 粉コーヒー（100g）'
        },
        description: {
            en: 'Washed process, medium roast organic coffee. Smooth, well-balanced flavor suitable for daily brewing.',
            ja: 'ウォッシュド製法・ミディアムロースト。バランスの取れた酸味とコクが特徴の、毎日飲みやすい粉タイプ。'
        },
        price: 1650,
        image: '/images/products/ground-coffee-100g.jpg',
        category: 'ground'
    },
    {
        id: 4,
        slug: 'drip-coffee-single-10g',
        name: {
            en: 'Terimba Coffee Organic Drip Coffee Pack (10g)',
            ja: 'テリンバコーヒー オーガニック ドリップパック（粉）10g'
        },
        description: {
            en: 'Single-serve drip coffee pack, easy to carry and brew anywhere. Perfect for travel, office, or outdoor use.',
            ja: '持ち運びに便利な1杯分ドリップパック。アウトドア、オフィス、旅行にも最適。'
        },
        price: 350,
        image: '/images/products/drip-coffee-single.jpg',
        category: 'drip'
    },
    {
        id: 5,
        slug: 'coffee-beans-100g',
        name: {
            en: 'Terimba Coffee Organic Coffee Beans (100g)',
            ja: 'テリンバコーヒー オーガニック コーヒー豆（100g）'
        },
        description: {
            en: 'Whole organic coffee beans from Uganda. Ideal for customers who prefer freshly ground coffee.',
            ja: 'ウガンダ産オーガニック豆を使用。挽きたての香りを楽しみたい方におすすめの豆タイプ。'
        },
        price: 1650,
        image: '/images/products/coffee-beans-100g.jpg',
        category: 'beans'
    }
];
