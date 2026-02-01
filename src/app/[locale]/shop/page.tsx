'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { products as productData } from '@/data/products';
import { createSupabaseClient } from '@/lib/supabaseClient';

export default function ShopPage() {
  const t = useTranslations('Shop');
  const locale = useLocale() as 'en' | 'ja';
  const { addToCart } = useCart();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const supabase = useMemo(() => createSupabaseClient(), []);
  const [isMember, setIsMember] = useState(false);

  const products = productData.map((product) => ({
    ...product,
    displayName: product.name[locale],
    displayDescription: product.description[locale]
  }));

  useEffect(() => {
    let unsubscribe: (() => void) | null = null;

    const init = async () => {
      if (!supabase) return;
      const { data } = await supabase.auth.getSession();
      setIsMember(!!data.session);
      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsMember(!!session);
      });
      unsubscribe = () => listener.subscription.unsubscribe();
    };

    init();

    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [supabase]);

  const filteredProducts = categoryFilter === 'all'
    ? products
    : products.filter(p => p.category === categoryFilter);

  const formatPrice = (price: number) => `¥${price.toLocaleString()}`;

  const handleAddToCart = (product: typeof products[0]) => {
    addToCart({
      id: product.id,
      name: product.displayName,
      price: product.price,
      image: product.image,
      category: product.category
    });
  };

  const categories = ['all', ...Array.from(new Set(products.map((product) => product.category)))];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-stark-white px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6 gap-6">
          <div className="w-full md:w-auto">
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-charcoal mb-4">
              {t('title')}
            </h1>
            {/* Categories */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`text-sm font-sans uppercase tracking-widest transition-colors whitespace-nowrap pb-1 ${categoryFilter === cat ? 'text-brand-red border-b-2 border-brand-red' : 'text-gray-400 hover:text-charcoal'}`}
                >
                  {cat === 'all' ? 'All' : t(`categories.${cat}`)}
                </button>
              ))}
            </div>
          </div>

          <div />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {filteredProducts.map(product => (
              <div key={product.id} className="group cursor-pointer" onClick={() => handleAddToCart(product)}>
               <div className="aspect-[1/1] sm:aspect-[3/4] bg-gray-100 mb-3 sm:mb-4 overflow-hidden relative rounded-sm">
                 <Image
                   src={product.image}
                   alt={product.displayName}
                   fill
                   className="object-cover group-hover:scale-105 transition-transform duration-500"
                 />
                 {isMember && (
                   <div className="absolute top-2 left-2 bg-charcoal text-white text-xs font-bold px-2 py-1 uppercase tracking-wider shadow-sm">
                     {t('member_badge')}
                   </div>
                 )}
              </div>
              <h3 className="text-lg sm:text-xl font-serif font-medium text-charcoal mb-1">{product.displayName}</h3>
              <p className="text-sm text-gray-500 font-sans uppercase tracking-wide mb-2">{t(`categories.${product.category}`)}</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                   <span className="text-lg font-medium text-charcoal">
                     {formatPrice(product.price)}
                   </span>
                   {isMember && (
                     <span className="text-xs text-gray-400">
                       {t('member_pricing')}
                     </span>
                   )}
                </div>
                <button className="text-brand-red text-sm font-bold uppercase tracking-wider hover:underline">
                  {t('add_to_cart')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
