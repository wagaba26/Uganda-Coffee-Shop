'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useState } from 'react';

export default function Footer() {
  const t = useTranslations('Footer');
  const [subscribeStatus, setSubscribeStatus] = useState<'idle' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeStatus('success');
    setTimeout(() => setSubscribeStatus('idle'), 3000);
  };

  return (
    <footer className="bg-charcoal text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link href="/" className="text-2xl font-serif font-bold tracking-tighter uppercase">
              Uganda Coffee Shop
            </Link>
            <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-xs">
              Ugandan Heritage, Japanese Precision.
            </p>
          </div>

          {/* Links Column 1 */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">{t('shop')}</h4>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              <li><Link href="/shop" className="hover:text-white transition-colors">All Coffee</Link></li>
              <li><Link href="/shop?category=beans" className="hover:text-white transition-colors">Beans</Link></li>
              <li><Link href="/shop?category=drip" className="hover:text-white transition-colors">Drip Bags</Link></li>
              <li><Link href="/shop?category=gift" className="hover:text-white transition-colors">Gifts</Link></li>
              <li><Link href="/membership" className="hover:text-white transition-colors">{t('membership')}</Link></li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">{t('about')}</h4>
            <ul className="space-y-4 font-sans text-sm text-gray-400">
              <li><Link href="/about" className="hover:text-white transition-colors">Our Story</Link></li>
              <li><Link href="/locations" className="hover:text-white transition-colors">Locations</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">{t('newsletter')}</h4>
            <p className="text-gray-400 font-sans text-sm mb-4">{t('newsletter_desc')}</p>
            {subscribeStatus === 'success' ? (
              <div className="bg-white/10 p-3 rounded-sm">
                <p className="text-white font-sans text-sm">
                  Thank you for subscribing!
                </p>
              </div>
            ) : (
              <form className="flex gap-2" onSubmit={handleSubscribe}>
                <input 
                  type="email" 
                  required
                  placeholder={t('email_placeholder')} 
                  className="bg-transparent border-b border-gray-600 py-2 w-full text-sm outline-none focus:border-brand-red transition-colors text-white"
                />
                <button type="submit" className="text-xs uppercase tracking-widest hover:text-brand-red transition-colors">
                  {t('subscribe')}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-sans">{t('copyright')}</p>
          <div className="flex gap-6 text-xs text-gray-500 font-sans">
            <Link href="/privacy" className="hover:text-white transition-colors">{t('privacy')}</Link>
            <Link href="/terms" className="hover:text-white transition-colors">{t('terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
