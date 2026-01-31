'use client';

import { useState } from 'react';
import { MapPin, X, Navigation, Clock, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { stores } from '@/data/stores';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

export default function LocationsButton() {
    const [isOpen, setIsOpen] = useState(false);
    const locale = useLocale() as 'en' | 'ja';

    const handleGetDirections = (lat: number, lng: number, name: string) => {
        const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}&destination_place_id=${encodeURIComponent(name)}`;
        window.open(url, '_blank');
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(true)}
                className="fixed bottom-6 right-6 z-50 bg-brand-red text-white p-4 rounded-full shadow-lg hover:bg-red-700 transition-colors group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
            >
                <MapPin className="w-6 h-6" />
                <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-charcoal text-white text-xs font-medium px-3 py-2 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                    Find a Store
                </span>
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm"
                        />

                        {/* Modal Content */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed inset-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-2xl md:max-h-[80vh] bg-white z-[101] rounded-lg shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                                <div>
                                    <h2 className="text-2xl font-serif font-bold text-charcoal">Find a Store</h2>
                                    <p className="text-sm text-gray-500 font-sans mt-1">{stores.length} locations near you</p>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-gray-400 hover:text-charcoal transition-colors p-2"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Store List */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {stores.map((store, index) => (
                                    <motion.div
                                        key={store.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors group"
                                    >
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-lg font-serif font-bold text-charcoal group-hover:text-brand-red transition-colors">
                                                    {store.name[locale]}
                                                </h3>
                                                <p className="text-sm text-gray-600 font-sans mt-1 flex items-start gap-2">
                                                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                                                    {store.address[locale]}
                                                </p>
                                                <div className="flex flex-wrap gap-4 mt-3 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Clock className="w-3.5 h-3.5" />
                                                        {store.hours[locale]}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Phone className="w-3.5 h-3.5" />
                                                        {store.phone}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="flex flex-col gap-2">
                                                <button
                                                    onClick={() => handleGetDirections(store.coordinates.lat, store.coordinates.lng, store.name[locale])}
                                                    className="bg-brand-red text-white px-4 py-2 text-xs font-medium uppercase tracking-wider rounded hover:bg-red-700 transition-colors flex items-center gap-2"
                                                >
                                                    <Navigation className="w-3.5 h-3.5" />
                                                    Directions
                                                </button>
                                                <Link
                                                    href={`/locations/${store.slug}`}
                                                    onClick={() => setIsOpen(false)}
                                                    className="border border-gray-300 text-charcoal px-4 py-2 text-xs font-medium uppercase tracking-wider rounded hover:border-charcoal transition-colors text-center"
                                                >
                                                    Details
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Footer */}
                            <div className="p-4 border-t border-gray-100 bg-gray-50">
                                <Link
                                    href="/locations"
                                    onClick={() => setIsOpen(false)}
                                    className="block text-center text-brand-red font-medium text-sm uppercase tracking-wider hover:underline"
                                >
                                    View All Locations →
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
