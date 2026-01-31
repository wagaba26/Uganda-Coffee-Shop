'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';

export default function Hero() {
  const t = useTranslations('HomePage');

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-charcoal text-white">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=2071&auto=format&fit=crop"
          alt="Coffee Background"
          fill
          className="object-cover"
          priority
        />
        {/* Stronger overlay for better text visibility */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50" />
      </div>

      <div className="relative z-10 px-4 max-w-5xl mx-auto w-full text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 tracking-tight leading-tight drop-shadow-lg"
          style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
        >
          {t('hero_title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-xl md:text-2xl font-sans font-light tracking-wide mb-12 text-white drop-shadow-md"
          style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.6)' }}
        >
          {t('hero_subtitle')}
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-brand-red text-white px-10 py-4 text-sm font-medium tracking-widest uppercase hover:bg-red-700 transition-colors shadow-lg"
        >
          {t('explore')}
        </motion.button>
      </div>
    </section>
  );
}
