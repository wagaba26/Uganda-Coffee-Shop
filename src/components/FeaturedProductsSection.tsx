'use client';

import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { products as productData } from '@/data/products';

export default function FeaturedProductsSection() {
  const t = useTranslations('HomeProducts');
  const locale = useLocale() as 'en' | 'ja';
  const featured = productData.slice(0, 3).map((product) => ({
    ...product,
    displayName: product.name[locale]
  }));

  return (
    <section className="bg-stark-white">
      <div className="container mx-auto px-6 py-16 md:py-24">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-brand-red font-bold mb-3">
              {t('eyebrow')}
            </p>
            <h2 className="text-2xl md:text-4xl font-serif font-bold text-charcoal mb-3">
              {t('title')}
            </h2>
            <p className="text-base md:text-lg text-gray-600 font-sans leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
          <Link
            href="/shop"
            className="text-sm uppercase tracking-widest text-charcoal border-b border-charcoal pb-1 hover:text-brand-red hover:border-brand-red transition-colors"
          >
            {t('cta')}
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product) => (
            <div key={product.id} className="group">
              <div className="relative aspect-[1/1] sm:aspect-[2/3] bg-gray-100 overflow-hidden rounded-sm">
                <Image
                  src={product.image}
                  alt={product.displayName}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className="mt-3 sm:mt-4">
                <h3 className="text-base font-serif font-bold text-charcoal mb-1">
                  {product.displayName}
                </h3>
                <p className="text-xs text-gray-500 font-sans uppercase tracking-wide">
                  {t(`categories.${product.category}` as const)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
