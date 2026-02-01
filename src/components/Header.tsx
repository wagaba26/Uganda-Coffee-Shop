'use client';

import { Link, usePathname } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Search, ShoppingBag, Menu, X, Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';
import { useState, useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function Header() {
  const t = useTranslations('Navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const [isScrolled, setIsScrolled] = useState(false);
  const { cartCount, cartTotal, items, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?category=all`); // In a real app, this would be /shop?q=${searchQuery}
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const isHomePage = pathname === '/';
  const textColor = (isHomePage && !isScrolled) ? 'text-white' : 'text-charcoal';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-sm py-4' : 'bg-transparent py-6'
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Mobile Menu Button */}
          <button
            className={`md:hidden ${textColor}`}
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className={`text-xl font-serif font-bold tracking-tighter uppercase ${textColor}`}>
            Uganda Coffee Shop
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/about" className={`text-sm font-sans font-medium hover:text-brand-red transition-colors uppercase tracking-wide ${textColor}`}>
              {t('about')}
            </Link>
            <Link href="/shop" className={`text-sm font-sans font-medium hover:text-brand-red transition-colors uppercase tracking-wide ${textColor}`}>
              {t('shop')}
            </Link>
            <Link href="/membership" className={`text-sm font-sans font-medium hover:text-brand-red transition-colors uppercase tracking-wide ${textColor}`}>
              {t('membership')}
            </Link>
            <Link href="/locations" className={`text-sm font-sans font-medium hover:text-brand-red transition-colors uppercase tracking-wide ${textColor}`}>
              {t('locations')}
            </Link>
          </nav>

          {/* Utilities */}
          <div className="flex items-center gap-6">
            <LanguageSwitcher textColor={textColor} />

            <div className="relative">
              {isSearchOpen ? (
                <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-white border border-gray-200 rounded-full pl-4 pr-2 py-1 shadow-sm w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 outline-none text-sm font-sans min-w-0"
                    autoFocus
                  />
                  <button type="button" onClick={() => setIsSearchOpen(false)} className="p-1 text-gray-400 hover:text-charcoal">
                    <X className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`${textColor} hover:text-brand-red transition-colors`}
                >
                  <Search className="w-5 h-5" />
                </button>
              )}
            </div>

            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative ${textColor} hover:text-brand-red transition-colors`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-brand-red text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-[80%] max-w-sm bg-white z-[70] shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <span className="text-xl font-serif font-bold text-charcoal uppercase">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="text-gray-400 hover:text-charcoal transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <nav className="flex-1 p-6 flex flex-col gap-6">
                <Link
                  href="/"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-serif font-medium text-charcoal hover:text-brand-red transition-colors"
                >
                  {t('home')}
                </Link>
                <Link
                  href="/about"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-serif font-medium text-charcoal hover:text-brand-red transition-colors"
                >
                  {t('about')}
                </Link>
                <Link
                  href="/shop"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-serif font-medium text-charcoal hover:text-brand-red transition-colors"
                >
                  {t('shop')}
                </Link>
                <Link
                  href="/membership"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-serif font-medium text-charcoal hover:text-brand-red transition-colors"
                >
                  {t('membership')}
                </Link>
                <Link
                  href="/locations"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-serif font-medium text-charcoal hover:text-brand-red transition-colors"
                >
                  {t('locations')}
                </Link>
                <Link
                  href="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-serif font-medium text-charcoal hover:text-brand-red transition-colors"
                >
                  {t('contact')}
                </Link>
              </nav>

              <div className="p-6 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-center text-gray-500 font-sans">
                  © 2026 Uganda Coffee Shop
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Cart Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-xl font-serif font-bold text-charcoal">Shopping Cart ({cartCount})</h2>
                <button onClick={() => setIsCartOpen(false)} className="text-gray-400 hover:text-charcoal transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingBag className="w-12 h-12 text-gray-200 mx-auto mb-4" />
                    <p className="text-gray-500 font-sans">Your cart is empty.</p>
                    <Link
                      href="/shop"
                      onClick={() => setIsCartOpen(false)}
                      className="inline-block mt-4 text-brand-red font-bold uppercase text-xs tracking-widest border-b border-brand-red pb-1"
                    >
                      Start Shopping
                    </Link>
                  </div>
                ) : (
                  items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="relative w-20 h-20 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-serif font-bold text-charcoal text-sm">{item.name}</h3>
                          <button onClick={() => removeFromCart(item.id)} className="text-gray-300 hover:text-brand-red transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-wide">{item.category}</p>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center border border-gray-200 rounded-sm">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-charcoal"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 text-xs font-medium text-charcoal">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-charcoal"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <p className="font-medium text-charcoal text-sm">¥{(item.price * item.quantity).toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {items.length > 0 && (
                <div className="p-6 border-t border-gray-100 bg-gray-50">
                  <div className="flex justify-between items-center mb-4">
                    <span className="font-serif text-charcoal">Subtotal</span>
                    <span className="font-bold text-lg text-charcoal">¥{cartTotal.toLocaleString()}</span>
                  </div>
                  <Link
                    href="/checkout"
                    onClick={() => setIsCartOpen(false)}
                    className="w-full bg-brand-red text-white py-4 text-sm uppercase tracking-widest font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 group"
                  >
                    Checkout
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    Taxes and shipping calculated at checkout.
                  </p>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
