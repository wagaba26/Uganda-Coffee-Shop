'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ContactPage() {
  const t = useTranslations('Contact');
  const [inquiryType, setInquiryType] = useState('general');
  const [formStatus, setFormStatus] = useState<'idle' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen pt-24 pb-16 bg-stark-white px-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-4">
            {t('title')}
          </h1>
          <p className="text-lg text-gray-500 font-sans">
            {t('subtitle')}
          </p>
        </div>

        <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-sm max-w-2xl mx-auto">
          {formStatus === 'success' ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto text-green-500 text-2xl">
                ✓
              </div>
              <h3 className="text-2xl font-serif font-bold text-charcoal">Message Sent</h3>
              <p className="text-gray-500 font-sans">
                Thank you for contacting us. We will get back to you shortly.
              </p>
              <button 
                onClick={() => setFormStatus('idle')}
                className="mt-6 text-brand-red text-sm font-bold uppercase tracking-widest hover:underline"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form className="space-y-8" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-red">{t('form.name')}</label>
                  <input required type="text" className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-red transition-colors font-sans text-charcoal" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-brand-red">{t('form.email')}</label>
                  <input required type="email" className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-red transition-colors font-sans text-charcoal" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-red">{t('form.subject')}</label>
                <select 
                  value={inquiryType} 
                  onChange={(e) => setInquiryType(e.target.value)}
                  className="w-full border-b border-gray-300 py-2 outline-none bg-transparent font-sans text-charcoal"
                >
                  <option value="general">{t('form.types.general')}</option>
                  <option value="wholesale">{t('form.types.wholesale')}</option>
                  <option value="press">{t('form.types.press')}</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-brand-red">{t('form.message')}</label>
                <textarea required rows={6} className="w-full border-b border-gray-300 py-2 outline-none focus:border-brand-red transition-colors font-sans text-charcoal resize-none"></textarea>
              </div>

              <div className="pt-4 text-center">
                <button type="submit" className="bg-charcoal text-white px-10 py-3 text-sm uppercase tracking-widest hover:bg-brand-red transition-colors font-sans font-medium">
                  {t('form.send')}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
