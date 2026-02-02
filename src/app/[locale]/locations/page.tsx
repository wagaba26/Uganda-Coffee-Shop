import { getTranslations } from 'next-intl/server';
import LocationsGrid from '@/components/LocationsGrid';

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

        <LocationsGrid
          locale={currentLocale}
          t={(key) => t(key)}
        />
      </div>
    </main>
  );
}
