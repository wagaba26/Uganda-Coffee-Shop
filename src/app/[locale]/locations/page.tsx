import { getTranslations } from 'next-intl/server';
import { stores } from '@/data/stores';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

export default async function LocationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({locale, namespace: 'Locations'});
  const currentLocale = locale as 'en' | 'ja';

  return (
    <main className="min-h-screen pt-24 pb-16 bg-stark-white px-6">
      <div className="container mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4 text-center">
          {t('title')}
        </h1>
        <p className="text-center text-gray-600 mb-16 font-sans">
          {t('subtitle')}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store) => (
            <Link 
              key={store.id} 
              href={`/locations/${store.slug}`}
              className="group block"
            >
              <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={store.image}
                    alt={store.name[currentLocale]}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-serif font-bold text-charcoal mb-2 group-hover:text-brand-red transition-colors">
                    {store.name[currentLocale]}
                  </h2>
                  <p className="text-sm text-gray-500 font-sans mb-4">
                    {store.address[currentLocale]}
                  </p>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <span className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                      {store.hours[currentLocale]}
                    </span>
                    <span className="text-sm font-medium text-brand-red">
                      {t('view_details')} →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
