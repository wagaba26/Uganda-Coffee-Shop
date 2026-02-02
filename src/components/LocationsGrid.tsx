'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { stores as allStores, Store } from '@/data/stores';
import { IpLocation, scoreLocationMatch } from '@/lib/location';

type Locale = 'en' | 'ja';

type Props = {
  locale: Locale;
  t: {
    (key: 'view_details' | 'instagram_cta' | 'coming_soon'): string;
  };
  stores?: Store[];
};

export default function LocationsGrid({ locale, t, stores = allStores }: Props) {
  const [location, setLocation] = useState<IpLocation | null>(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/', { cache: 'no-store' });
        if (!response.ok) return;
        const data = (await response.json()) as IpLocation;
        setLocation({ city: data.city, region: data.region, country: data.country });
      } catch {
        setLocation(null);
      }
    };

    fetchLocation();
  }, []);

  const sortedStores = useMemo(() => {
    if (!location) return stores;
    return [...stores]
      .map((store, index) => ({
        store,
        index,
        score: scoreLocationMatch(store.city.en, location)
      }))
      .sort((a, b) => (b.score - a.score) || (a.index - b.index))
      .map((item) => item.store);
  }, [location, stores]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {sortedStores.map((store) => (
        <Link
          key={store.id}
          href={`/locations/${store.slug}`}
          className="group block"
        >
          <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden rounded-sm">
            <div className="relative h-44 sm:h-52 md:h-56 bg-gray-50 p-4 sm:p-6">
              <Image
                src={store.image}
                alt={store.name[locale]}
                fill
                className="object-contain"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-3 mb-3">
                <p className="text-xs font-medium text-brand-red uppercase tracking-widest">
                  {store.city[locale]}
                </p>
                {store.status === 'coming-soon' && (
                  <span className="text-[10px] font-medium uppercase tracking-widest text-charcoal border border-charcoal/40 px-2 py-1">
                    {t('coming_soon')}
                  </span>
                )}
              </div>
              <h2 className="text-xl font-serif font-bold text-charcoal mb-2 group-hover:text-brand-red transition-colors">
                {store.name[locale]}
              </h2>
              <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                {store.instagram ? (
                  <a
                    href={store.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium uppercase tracking-widest text-charcoal border border-charcoal px-4 py-2 hover:bg-charcoal hover:text-white transition-colors"
                  >
                    {t('instagram_cta')}
                  </a>
                ) : (
                  <span className="text-xs font-medium uppercase tracking-widest text-charcoal/60">
                    {t('coming_soon')}
                  </span>
                )}
                <span className="text-sm font-medium text-brand-red">
                  {t('view_details')} →
                </span>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
