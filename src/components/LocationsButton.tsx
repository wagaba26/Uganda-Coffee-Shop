'use client';

import { useEffect, useMemo, useState } from 'react';
import { MapPin } from 'lucide-react';
import { stores } from '@/data/stores';
import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { IpLocation, scoreLocationMatch } from '@/lib/location';

type Locale = 'en' | 'ja';

export default function LocationsButton() {
  const locale = useLocale() as Locale;
  const t = useTranslations('LocationsButton');
  const [isOpen, setIsOpen] = useState(false);
  const [activeCity, setActiveCity] = useState<string | null>(null);
  const [location, setLocation] = useState<IpLocation | null>(null);

  const cities = useMemo(() => {
    const map = new Map<string, { en: string; ja: string }>();
    stores.forEach((store) => {
      if (!map.has(store.city.en)) {
        map.set(store.city.en, store.city);
      }
    });
    return Array.from(map.values());
  }, []);

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

  const sortedCities = useMemo(() => {
    if (!location) return cities;
    return [...cities]
      .map((city, index) => ({
        city,
        index,
        score: scoreLocationMatch(city.en, location)
      }))
      .sort((a, b) => (b.score - a.score) || (a.index - b.index))
      .map((item) => item.city);
  }, [cities, location]);

  const activeCityLabel = activeCity
    ? cities.find((city) => city.en === activeCity)?.[locale]
    : null;

  const activeStores = activeCity
    ? stores.filter((store) => store.city.en === activeCity)
    : [];

  if (stores.length === 0) return null;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 bg-brand-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors group"
        aria-label={t('open')}
      >
        <MapPin className="w-6 h-6" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-charcoal text-white text-xs font-medium px-3 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          {t('open')}
        </span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <button
            type="button"
            aria-label={t('close')}
            onClick={() => {
              setIsOpen(false);
              setActiveCity(null);
            }}
            className="absolute inset-0 bg-black/30"
          />
          <div className="absolute bottom-24 right-6 w-[min(92vw,380px)] bg-white border border-gray-200 shadow-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-charcoal/60">
                  {t('eyebrow')}
                </p>
                <h3 className="text-xl font-serif font-bold text-charcoal">
                  {t('title')}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOpen(false);
                  setActiveCity(null);
                }}
                className="text-xs font-sans uppercase tracking-widest text-charcoal/60 hover:text-charcoal"
              >
                {t('close')}
              </button>
            </div>

            {!activeCity && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 font-sans">
                  {t('city_prompt')}
                </p>
                <div className="grid grid-cols-1 gap-2">
                  {sortedCities.map((city) => (
                    <button
                      key={city.en}
                      type="button"
                      onClick={() => setActiveCity(city.en)}
                      className="w-full text-left border border-gray-200 px-4 py-3 text-sm font-sans text-charcoal hover:border-brand-red hover:text-brand-red transition-colors"
                    >
                      {city[locale]}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeCity && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-600 font-sans">
                    {t('stores_title', { city: activeCityLabel ?? '' })}
                  </p>
                  <button
                    type="button"
                    onClick={() => setActiveCity(null)}
                    className="text-xs font-sans uppercase tracking-widest text-charcoal/60 hover:text-charcoal"
                  >
                    {t('back')}
                  </button>
                </div>
                <div className="space-y-2">
                  {activeStores.map((store) => (
                    <Link
                      key={store.id}
                      href={`/locations/${store.slug}`}
                      className="block border border-gray-200 px-4 py-3 text-sm font-sans text-charcoal hover:border-brand-red hover:text-brand-red transition-colors"
                    >
                      <div className="font-medium">{store.name[locale]}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {store.contact[locale]}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
