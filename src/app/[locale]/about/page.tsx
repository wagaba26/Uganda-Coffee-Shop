import { useTranslations } from 'next-intl';
import Image from 'next/image';

export default function AboutPage() {
  const t = useTranslations('About');
  const features = t.raw('features') as string[];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-stark-white">
      {/* Hero Section */}
      <div className="container mx-auto px-6 max-w-5xl mb-24 text-center">
        <h1 className="text-4xl md:text-6xl font-serif font-bold text-charcoal mb-8 leading-tight">
          {t('title')}
        </h1>
        <div className="w-24 h-1 bg-brand-red mx-auto mb-8" />
      </div>

      <div className="container mx-auto px-6 max-w-6xl space-y-32">
        
        {/* Heritage Section - Kabaka */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
           <div className="relative aspect-[4/5] bg-gray-100 rounded-sm overflow-hidden">
             {/* Placeholder for Kabaka/Heritage Image */}
             <Image 
                src="https://images.unsplash.com/photo-1524350876685-274059332603?q=80&w=2071&auto=format&fit=crop"
                alt="Ugandan Heritage"
                fill
                className="object-cover"
             />
           </div>
           <div className="space-y-6">
              <h2 className="text-3xl font-serif font-bold text-charcoal">{t('heritage_title')}</h2>
              <p className="text-lg text-gray-600 font-sans leading-relaxed">
                {t('heritage_text')}
              </p>
              <div className="pt-4 border-l-4 border-brand-red pl-6">
                <p className="font-serif italic text-xl text-charcoal">
                  &ldquo;Prosperity for all through the land&apos;s bounty.&rdquo;
                </p>
              </div>
           </div>
        </section>

        {/* Uganda Coffee Shop Section */}
        <section className="bg-white border border-gray-100 shadow-sm p-8 md:p-10">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-3xl font-serif font-bold text-charcoal">
              {t('intro_title')}
            </h2>
            <p className="text-gray-700 font-sans leading-relaxed">
              {t('intro_body')}
            </p>
            <p className="text-gray-700 font-sans leading-relaxed">
              {t('intro_body_2')}
            </p>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 border border-gray-100 p-8 md:p-12">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-serif font-bold text-charcoal mb-6">
              {t('features_title')}
            </h2>
            <ul className="space-y-3 text-gray-700 font-sans">
              {features.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 w-1.5 h-1.5 bg-brand-red rounded-full" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Team Section - 500+ Grid */}
        <section className="space-y-12">
           <div className="text-center max-w-3xl mx-auto space-y-6">
              <h2 className="text-3xl font-serif font-bold text-charcoal">{t('team_title')}</h2>
              <p className="text-lg text-gray-600 font-sans leading-relaxed">
                {t('team_text')}
              </p>
           </div>
           
           {/* Visual Grid of 500+ */}
           <div className="w-full overflow-hidden relative py-12">
              <div className="absolute inset-0 z-10 bg-gradient-to-r from-stark-white via-transparent to-stark-white pointer-events-none" />
              <div className="flex flex-wrap justify-center gap-1 opacity-20 max-h-[400px] overflow-hidden">
                {Array.from({ length: 500 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={`w-3 h-3 rounded-[1px] ${i % 10 === 0 ? 'bg-brand-red' : 'bg-charcoal'}`} 
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center z-20">
                 <div className="bg-white/90 backdrop-blur-sm px-12 py-6 border border-gray-200 shadow-lg text-center">
                    <p className="text-5xl font-serif font-bold text-brand-red mb-2">500+</p>
                    <p className="text-xs font-sans uppercase tracking-widest text-charcoal">Dedicated Artisans</p>
                 </div>
              </div>
           </div>
        </section>

      </div>
    </main>
  );
}
