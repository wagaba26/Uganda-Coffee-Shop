'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '@/context/CartContext';

export default function ShopPage() {
  const t = useTranslations('Shop');
  const { addToCart } = useCart();
  const [subscribeMode, setSubscribeMode] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Mock products - expanded
  const products = [
    { id: 1, name: 'Mt. Elgon Single Origin', category: 'beans', price: 2500, image: 'https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=2070&auto=format&fit=crop' },
    { id: 2, name: 'Terimba Liquid Gold', category: 'liquid', price: 1200, image: 'https://images.unsplash.com/photo-1589396575653-c0590258601b?q=80&w=2070&auto=format&fit=crop' },
    { id: 3, name: 'Heritage Gift Set', category: 'gifts', price: 5000, image: 'https://images.unsplash.com/photo-1584225064785-c62a8b43d148?q=80&w=1974&auto=format&fit=crop' },
    { id: 4, name: 'Dark Roast Blend', category: 'beans', price: 2400, image: 'https://images.unsplash.com/photo-1611854779393-1b2ae9d59836?q=80&w=2070&auto=format&fit=crop' },
    { id: 5, name: 'Drip Bag Box (10pcs)', category: 'drip', price: 1800, image: 'https://images.unsplash.com/photo-1511537632536-b7a48965ce4a?q=80&w=2070&auto=format&fit=crop' },
    { id: 6, name: 'Ceramic Mug Set', category: 'gifts', price: 3500, image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop' },
  ];

  const filteredProducts = categoryFilter === 'all'
    ? products
    : products.filter(p => p.category === categoryFilter);

  const formatPrice = (price: number) => {
    const finalPrice = subscribeMode ? Math.floor(price * 0.9) : price;
    return `¥${finalPrice.toLocaleString()}`;
  };

  const handleAddToCart = (product: typeof products[0]) => {
    const finalPrice = subscribeMode ? Math.floor(product.price * 0.9) : product.price;
    addToCart({
      id: product.id,
      name: product.name,
      price: finalPrice,
      image: product.image,
      category: product.category
    });
  };

  const categories = ['all', 'beans', 'liquid', 'drip', 'gifts'];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-stark-white px-6">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-gray-100 pb-6 gap-6">
          <div className="w-full md:w-auto">
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
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
                  {cat === 'all' ? 'All' : t(`categories.${cat}` as any)}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
            <span className={`text-sm font-sans font-medium transition-colors ${subscribeMode ? 'text-brand-red' : 'text-gray-500'}`}>
              {t('subscribe_toggle')}
            </span>
            <button
              onClick={() => setSubscribeMode(!subscribeMode)}
              className={`w-12 h-6 rounded-full relative transition-colors focus:outline-none ${subscribeMode ? 'bg-brand-red' : 'bg-gray-300'}`}
            >
              <motion.div
                className="absolute top-1 bg-white w-4 h-4 rounded-full shadow-sm"
                animate={{ left: subscribeMode ? 'calc(100% - 1.25rem)' : '0.25rem' }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredProducts.map(product => (
            <div key={product.id} className="group cursor-pointer" onClick={() => handleAddToCart(product)}>
              <div className="aspect-[3/4] bg-gray-100 mb-4 overflow-hidden relative rounded-sm">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {subscribeMode && (
                  <div className="absolute top-2 right-2 bg-brand-red text-white text-xs font-bold px-2 py-1 uppercase tracking-wider shadow-sm">
                    10% Off
                  </div>
                )}
              </div>
              <h3 className="text-xl font-serif font-medium text-charcoal mb-1">{product.name}</h3>
              <p className="text-sm text-gray-500 font-sans uppercase tracking-wide mb-2">{t(`categories.${product.category}` as any)}</p>
              <div className="flex justify-between items-center">
                <div className="flex flex-col">
                  <span className={`text-lg font-medium text-charcoal ${subscribeMode ? 'text-brand-red' : ''}`}>
                    {formatPrice(product.price)}
                  </span>
                  {subscribeMode && (
                    <span className="text-xs text-gray-400 line-through">
                      ¥{product.price.toLocaleString()}
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
