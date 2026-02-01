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
              <div className="bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden rounded-sm">
                <div className="relative h-44 sm:h-52 md:h-56 bg-gray-50 p-4 sm:p-6">
                  <Image
                    src={store.image}
                    alt={store.name[currentLocale]}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="p-6">
                  <p className="text-xs font-medium text-brand-red uppercase tracking-widest mb-3">
                    {store.city[currentLocale]}
                  </p>
                  <h2 className="text-xl font-serif font-bold text-charcoal mb-2 group-hover:text-brand-red transition-colors">
                    {store.name[currentLocale]}
                  </h2>
                  <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                    <a
                      href={store.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-medium uppercase tracking-widest text-charcoal border border-charcoal px-4 py-2 hover:bg-charcoal hover:text-white transition-colors"
                    >
                      {t('instagram_cta')}
                    </a>
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
