'use client';

import { useTranslations } from 'next-intl';
import MembershipGate from '@/components/MembershipGate';

export default function MembershipPage() {
  const t = useTranslations('Membership');

  const oneTimeBeans = t.raw('price_list.one_time.beans') as string[];
  const oneTimeDrip = t.raw('price_list.one_time.drip') as string[];
  const liquidPrices = t.raw('price_list.liquid') as string[];
  const subscriptionBeans = t.raw('subscriptions.beans') as string[];
  const subscriptionLiquid = t.raw('subscriptions.liquid') as string[];
  const greenBeans = t.raw('green_beans.list') as string[];

  return (
    <main className="min-h-screen pt-24 pb-16 bg-stark-white px-6">
      <div className="container mx-auto max-w-5xl">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-600 font-sans">
            {t('subtitle')}
          </p>
        </header>

        <MembershipGate mode="panel">
          <section className="bg-gray-50 border border-gray-100 p-8 md:p-10 mb-12">
            <h3 className="text-xl font-serif font-bold text-charcoal mb-4">
              {t('membership_title')}
            </h3>
            <p className="text-gray-700 font-sans leading-relaxed mb-4">
              {t('membership_body')}
            </p>
            <p className="text-gray-700 font-sans leading-relaxed">
              {t('membership_body_2')}
            </p>
          </section>

          <section className="bg-white border border-gray-100 shadow-sm p-8 md:p-10 mb-12">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
              {t('price_list.title')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-serif font-bold text-charcoal mb-3">
                  {t('price_list.one_time.title')}
                </h3>
                <h4 className="text-sm uppercase tracking-widest text-brand-red mb-2">
                  {t('price_list.one_time.beans_title')}
                </h4>
                <ul className="space-y-2 text-gray-700 font-sans mb-4">
                  {oneTimeBeans.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <h4 className="text-sm uppercase tracking-widest text-brand-red mb-2">
                  {t('price_list.one_time.drip_title')}
                </h4>
                <ul className="space-y-2 text-gray-700 font-sans">
                  {oneTimeDrip.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                  {t('price_list.one_time.shipping_note')}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-charcoal mb-3">
                  {t('price_list.liquid_title')}
                </h3>
                <ul className="space-y-2 text-gray-700 font-sans">
                  {liquidPrices.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="text-sm text-gray-500 mt-4">
                  {t('price_list.liquid_note')}
                </p>
              </div>
            </div>
          </section>

          <section className="bg-gray-50 border border-gray-100 p-8 md:p-10 mb-12">
            <h2 className="text-2xl font-serif font-bold text-charcoal mb-6">
              {t('subscriptions.title')}
            </h2>
            <p className="text-gray-700 font-sans leading-relaxed mb-6">
              {t('subscriptions.subtitle')}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-serif font-bold text-charcoal mb-3">
                  {t('subscriptions.beans_title')}
                </h3>
                <ul className="space-y-2 text-gray-700 font-sans">
                  {subscriptionBeans.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-serif font-bold text-charcoal mb-3">
                  {t('subscriptions.liquid_title')}
                </h3>
                <ul className="space-y-2 text-gray-700 font-sans">
                  {subscriptionLiquid.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="text-sm text-gray-500 mt-6">
              {t('subscriptions.note')}
            </p>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white border border-gray-100 shadow-sm p-8">
              <h3 className="text-xl font-serif font-bold text-charcoal mb-4">
                {t('green_beans.title')}
              </h3>
              <ul className="space-y-2 text-gray-700 font-sans mb-4">
                {greenBeans.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="text-sm text-gray-500">
                {t('green_beans.note')}
              </p>
            </div>
            <div className="bg-white border border-gray-100 shadow-sm p-8">
              <h3 className="text-xl font-serif font-bold text-charcoal mb-4">
                {t('contact.title')}
              </h3>
              <p className="text-gray-700 font-sans mb-2">
                {t('contact.phone')}
              </p>
              <p className="text-gray-700 font-sans mb-6">
                {t('contact.email')}
              </p>
              <p className="text-gray-600 font-sans text-sm">
                {t('contact.cta')}
              </p>
            </div>
          </section>
        </MembershipGate>
      </div>
    </main>
  );
}
