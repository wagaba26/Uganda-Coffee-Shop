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
      {/* Hero / Gallery */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={store.image}
          alt={store.name[currentLocale]}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute bottom-0 left-0 p-8 text-white max-w-4xl container mx-auto">
          <h1 className="text-4xl md:text-6xl font-serif font-bold mb-2">{store.name[currentLocale]}</h1>
          <p className="text-xl font-sans opacity-90">{store.address[currentLocale]}</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* Left Column: Info */}
        <div className="md:col-span-1 space-y-8">
          <div>
            <h3 className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">{t('hours')}</h3>
            <p className="text-lg text-charcoal font-sans">{store.hours[currentLocale]}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">{t('address')}</h3>
            <p className="text-lg text-charcoal font-sans mb-4">{store.address[currentLocale]}</p>
            <a 
              href={`https://maps.google.com/?q=${store.coordinates.lat},${store.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-charcoal px-6 py-2 text-sm uppercase tracking-wide hover:bg-charcoal hover:text-white transition-colors"
            >
              {t('get_directions')}
            </a>
          </div>

          <div>
             <h3 className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">Contact</h3>
             <p className="text-lg text-charcoal font-sans">{store.phone}</p>
          </div>

          <div>
            <h3 className="text-sm font-bold text-brand-red uppercase tracking-widest mb-4">Features</h3>
            <ul className="space-y-2">
              {store.features.map(f => (
                <li key={f} className="text-gray-600 font-sans capitalize flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-brand-red rounded-full" />
                  {f.replace('-', ' ')}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Map & Inquiry */}
        <div className="md:col-span-2 space-y-12">
          {/* Map Placeholder */}
          <a 
            href={`https://maps.google.com/?q=${store.coordinates.lat},${store.coordinates.lng}`}
            target="_blank"
            rel="noopener noreferrer"
            className="block group"
          >
            <div className="bg-gray-100 h-96 w-full relative overflow-hidden rounded-sm group-hover:opacity-90 transition-opacity">
               <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-500 font-sans">
                 <div className="text-center">
                   <p className="mb-2 font-bold text-charcoal">Click to Open in Google Maps</p>
                   <p className="text-xs">Lat: {store.coordinates.lat}, Lng: {store.coordinates.lng}</p>
                 </div>
              </div>
            </div>
          </a>

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
