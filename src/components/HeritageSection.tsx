'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function HeritageSection() {
  const t = useTranslations('HeritageSection');

  return (
    <section className="py-24 md:py-32 bg-stark-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="md:w-1/2 w-full">
               <motion.div
                 initial={{ opacity: 0, x: -50 }}
                 whileInView={{ opacity: 1, x: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="relative aspect-[3/2] bg-gray-100 overflow-hidden"
               >
                 <Image 
                   src="/images/story/heritage-new.jpeg"
                   alt="Heritage Craftsmanship"
                   fill
                   className="object-cover"
                 />
            </motion.div>
          </div>
          
          <div className="md:w-1/2 w-full">
            <motion.span 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="block text-brand-red text-sm font-bold tracking-widest uppercase mb-4"
            >
              {t('label')}
            </motion.span>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-serif font-bold text-charcoal mb-8 leading-tight"
            >
              {t('title')}
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-lg text-gray-600 font-sans leading-relaxed"
            >
              {t('description')}
            </motion.p>
           </div>
         </div>
       </div>
     </section>
  );
}
