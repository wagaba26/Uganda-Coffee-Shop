'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { HandHeart, GraduationCap, HeartPulse, Droplet, ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useEffect, useRef } from 'react';

const journeyImages = [
  '/images/story/story-1-hand.webp',
  '/images/story/story-2.webp',
  '/images/story/story-3.webp',
  '/images/story/story-4.webp'
];

const impactIcons = [HandHeart, GraduationCap, HeartPulse, Droplet];

export default function BukonzoJourneySection() {
  const t = useTranslations('Bukonzo');
  const steps = t.raw('journey.steps') as Array<{ title: string; description: string }>;
  const impacts = t.raw('impact.items') as Array<{ title: string; description: string; year: string }>;
  const loopSteps = [...steps, ...steps];
  const scrollerRef = useRef<HTMLDivElement>(null);
  const isAdjustingRef = useRef(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    const setInitialPosition = () => {
      const loopWidth = scroller.scrollWidth / 2;
      if (loopWidth > 0) {
        scroller.scrollLeft = loopWidth;
      }
    };

    setInitialPosition();
    const timeoutId = window.setTimeout(setInitialPosition, 400);

    const handleScroll = () => {
      if (isAdjustingRef.current) return;
      const loopWidth = scroller.scrollWidth / 2;
      if (loopWidth === 0) return;

      const maxScroll = scroller.scrollWidth - scroller.clientWidth;

      if (scroller.scrollLeft <= 0) {
        isAdjustingRef.current = true;
        scroller.scrollLeft += loopWidth;
        requestAnimationFrame(() => {
          isAdjustingRef.current = false;
        });
      } else if (scroller.scrollLeft >= maxScroll - 1) {
        isAdjustingRef.current = true;
        scroller.scrollLeft -= loopWidth;
        requestAnimationFrame(() => {
          isAdjustingRef.current = false;
        });
      }
    };

    scroller.addEventListener('scroll', handleScroll, { passive: true });
    const resizeObserver = new ResizeObserver(() => setInitialPosition());
    resizeObserver.observe(scroller);

    return () => {
      window.clearTimeout(timeoutId);
      scroller.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <section className="bg-stark-white" id="bukonzo-story">
      <div className="container mx-auto px-6 py-24">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-red font-bold mb-4">
            {t('eyebrow')}
          </p>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-6">
            {t('title')}
          </h2>
          <p className="text-lg text-gray-600 font-sans leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-stark-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-stark-white to-transparent pointer-events-none" />
          <div className="absolute right-4 top-4 z-10 rounded-full border border-charcoal/20 bg-white/90 p-2 text-charcoal shadow-sm md:hidden">
            <ArrowRight className="h-4 w-4" />
          </div>
          <div
            ref={scrollerRef}
            className="story-scroll flex gap-6 overflow-x-auto pb-6"
          >
            {loopSteps.map((step, index) => (
              <div key={`${step.title}-${index}`} className="w-[320px] sm:w-[340px] lg:w-[360px] flex-shrink-0">
                <div className="bg-white border border-gray-100 shadow-sm overflow-hidden h-full rounded-2xl">
                  <div className="relative h-72">
                    <Image
                      src={journeyImages[index % journeyImages.length]}
                      alt={step.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-xs font-bold text-brand-red uppercase tracking-widest mb-3">
                      {t('journey.step_label', { index: (index % steps.length) + 1 })}
                    </p>
                    <h3 className="text-lg font-serif font-bold text-charcoal mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-sans leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-50">
        <div className="container mx-auto px-6 py-24">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-charcoal mb-4">
              {t('impact.title')}
            </h2>
            <p className="text-lg text-gray-600 font-sans leading-relaxed">
              {t('impact.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impacts.map((impact, index) => {
              const Icon = impactIcons[index % impactIcons.length];
              return (
                <div key={impact.title} className="bg-white border border-gray-100 shadow-sm p-6">
                  <div className="w-12 h-12 rounded-full bg-brand-red/10 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-brand-red" />
                  </div>
                  <h3 className="text-lg font-serif font-bold text-charcoal mb-2">
                    {impact.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-sans leading-relaxed mb-4">
                    {impact.description}
                  </p>
                  <span className="inline-flex items-center text-xs uppercase tracking-widest text-charcoal border border-charcoal/20 px-3 py-1">
                    {impact.year}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-charcoal text-white">
        <div className="container mx-auto px-6 py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg text-white/80 font-sans max-w-2xl mx-auto mb-8">
            {t('cta.subtitle')}
          </p>
          <Link
            href="/locations"
            className="inline-flex items-center justify-center bg-brand-red text-white px-10 py-4 text-sm uppercase tracking-widest font-medium hover:bg-red-700 transition-colors"
          >
            {t('cta.button')}
          </Link>
        </div>
      </div>
    </section>
  );
}
