'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';

interface LanguageSwitcherProps {
  textColor?: string;
}

export default function LanguageSwitcher({ textColor = 'text-charcoal' }: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  const activeColor = 'text-brand-red';
  const inactiveColor = textColor;
  const separatorColor = textColor.includes('white') ? 'text-white/40' : 'text-gray-300';

  return (
    <div className="flex gap-2 text-sm font-medium font-sans">
      <button
        onClick={() => switchLocale('en')}
        className={`${locale === 'en' ? activeColor : `${inactiveColor} hover:opacity-70`} transition-colors`}
      >
        English
      </button>
      <span className={separatorColor}>|</span>
      <button
        onClick={() => switchLocale('ja')}
        className={`${locale === 'ja' ? activeColor : `${inactiveColor} hover:opacity-70`} transition-colors`}
      >
        日本語
      </button>
    </div>
  );
}
