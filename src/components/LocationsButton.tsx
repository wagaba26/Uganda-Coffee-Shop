'use client';

import { MapPin } from 'lucide-react';
import { stores } from '@/data/stores';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function LocationsButton() {
    const locale = useLocale() as 'en' | 'ja';
    const nearestStore = stores[0];

    if (!nearestStore) return null;

    return (
        <Link
            href={`/locations/${nearestStore.slug}`}
            className="fixed bottom-6 right-6 z-50 bg-brand-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors group"
        >
            <MapPin className="w-6 h-6" />
            <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-charcoal text-white text-xs font-medium px-3 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                {nearestStore.city[locale]}
            </span>
        </Link>
    );
}
