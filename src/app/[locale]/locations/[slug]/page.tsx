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
      <div className="relative h-[40vh] w-full bg-gray-50">
        <Image
          src={store.image}
          alt={store.name[currentLocale]}
          fill
          className="object-contain p-8"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute bottom-0 left-0 p-8 text-white max-w-4xl container mx-auto">
          <p className="text-xs font-medium uppercase tracking-widest text-brand-red mb-4">
            {store.city[currentLocale]}
          </p>
          <h1 className="text-4xl md:text-6xl font-serif font-bold">{store.name[currentLocale]}</h1>
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
        </div>

        {/* Right Column: Map & Inquiry */}
        <div className="md:col-span-2 space-y-12">
          {/* Contact Form Placeholder */}
          <div className="bg-white border border-gray-100 p-8 shadow-sm">
            <h3 className="text-2xl font-serif font-bold text-charcoal mb-6">Inquiries</h3>
            <StoreContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
