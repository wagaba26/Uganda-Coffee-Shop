import { getTranslations } from 'next-intl/server';
import { stores } from '@/data/stores';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import StoreContactForm from '@/components/StoreContactForm';

export async function generateStaticParams() {
  return stores.flatMap((store) => [
    { slug: store.slug, locale: 'en' },
    { slug: store.slug, locale: 'ja' }
  ]);
}

export default async function StorePage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const store = stores.find((s) => s.slug === slug);
  const currentLocale = locale as 'en' | 'ja';
  
  if (!store) {
    notFound();
  }

  const t = await getTranslations({locale, namespace: 'Locations'});

  return (
    <main className="min-h-screen bg-stark-white pt-20">
      <div className="relative h-[30vh] sm:h-[36vh] md:h-[44vh] w-full bg-gray-900 overflow-hidden">
        <Image
          src={store.image}
          alt=""
          fill
          className="object-cover scale-110 blur-2xl opacity-70"
          priority
        />
        <Image
          src={store.image}
          alt={store.name[currentLocale]}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />
        <div className="absolute bottom-0 left-0 p-8 text-white max-w-4xl container mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-red mb-4">
            {store.city[currentLocale]}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">{store.name[currentLocale]}</h1>
          {store.status && (
            <span className="inline-flex mt-4 text-xs font-medium uppercase tracking-widest border border-white/50 px-3 py-1">
              {store.status === 'coming-soon' ? t('status_coming') : t('status_open')}
            </span>
          )}
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column: Info */}
        <div className="md:col-span-1 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">{t('city_label')}</h3>
            <p className="text-lg text-charcoal font-sans">{store.city[currentLocale]}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">{t('contact_label')}</h3>
            <p className="text-lg text-charcoal font-sans">{store.contact[currentLocale]}</p>
          </div>

          {store.instagram && (
            <div>
              <h3 className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">{t('instagram_label')}</h3>
              <a
                href={store.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center border border-charcoal px-6 py-2 text-sm uppercase tracking-wide hover:bg-charcoal hover:text-white transition-colors"
              >
                @{store.instagram.handle}
              </a>
            </div>
          )}
        </div>

        {/* Right Column: Map & Inquiry */}
        <div className="md:col-span-2 space-y-12">
          {(store.details || store.highlights) && (
            <div className="bg-white border border-gray-100 p-8 shadow-sm space-y-6">
              <h3 className="text-2xl font-serif font-bold text-charcoal">{t('about_title')}</h3>
              {store.details && (
                <p className="text-gray-700 font-sans leading-relaxed">
                  {store.details[currentLocale]}
                </p>
              )}
              {store.highlights && store.highlights[currentLocale].length > 0 && (
                <div>
                  <h4 className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">
                    {t('highlights_title')}
                  </h4>
                  <ul className="space-y-2 text-gray-700 font-sans">
                    {store.highlights[currentLocale].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span className="mt-2 w-1.5 h-1.5 bg-brand-red rounded-full" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {/* Contact Form Placeholder */}
          <div className="bg-white border border-gray-100 p-8 shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">{t('inquiries_title')}</h3>
            <StoreContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
