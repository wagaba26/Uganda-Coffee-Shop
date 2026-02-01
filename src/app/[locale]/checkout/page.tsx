'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useCart } from '@/context/CartContext';
import { useOrder, DeliveryInfo } from '@/context/OrderContext';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Link } from '@/i18n/routing';
import { ArrowLeft, ArrowRight, Check, Package, Truck, CreditCard, CheckCircle, ShoppingBag } from 'lucide-react';

type CheckoutStep = 'cart' | 'delivery' | 'review' | 'complete';

export default function CheckoutPage() {
    const t = useTranslations('Checkout');
    const { items, cartTotal, clearCart } = useCart();
    const { orderState, setDeliveryInfo, placeOrder, clearOrder } = useOrder();
    const [currentStep, setCurrentStep] = useState<CheckoutStep>('cart');
    const [orderNumber, setOrderNumber] = useState<string | null>(null);

    const [formData, setFormData] = useState<DeliveryInfo>({
        fullName: orderState.deliveryInfo.fullName || '',
        email: orderState.deliveryInfo.email || '',
        phone: orderState.deliveryInfo.phone || '',
        postalCode: orderState.deliveryInfo.postalCode || '',
        prefecture: orderState.deliveryInfo.prefecture || '',
        city: orderState.deliveryInfo.city || '',
        addressLine1: orderState.deliveryInfo.addressLine1 || '',
        addressLine2: orderState.deliveryInfo.addressLine2 || '',
        country: orderState.deliveryInfo.country || 'Japan',
        deliveryInstructions: orderState.deliveryInfo.deliveryInstructions || ''
    });

    const [errors, setErrors] = useState<Partial<DeliveryInfo>>({});

    const steps = [
        { id: 'cart', label: 'Cart', icon: ShoppingBag },
        { id: 'delivery', label: 'Delivery', icon: Truck },
        { id: 'review', label: 'Review', icon: Package },
        { id: 'complete', label: 'Complete', icon: CheckCircle }
    ];

    const validateDeliveryForm = (): boolean => {
        const newErrors: Partial<DeliveryInfo> = {};

        if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
        if (formData.email.trim() && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
        if (!formData.prefecture.trim()) newErrors.prefecture = 'Prefecture is required';
        if (!formData.city.trim()) newErrors.city = 'City/Ward is required';
        if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (currentStep === 'cart' && items.length > 0) {
            setCurrentStep('delivery');
        } else if (currentStep === 'delivery') {
            if (validateDeliveryForm()) {
                setDeliveryInfo(formData);
                setCurrentStep('review');
            }
        } else if (currentStep === 'review') {
            const newOrderNumber = placeOrder();
            setOrderNumber(newOrderNumber);
            clearCart();
            setCurrentStep('complete');
        }
    };

    const handlePrevStep = () => {
        if (currentStep === 'delivery') setCurrentStep('cart');
        else if (currentStep === 'review') setCurrentStep('delivery');
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof DeliveryInfo]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const formatPrice = (price: number) => `¥${price.toLocaleString()}`;

    // Redirect to shop if cart is empty on initial load
    useEffect(() => {
        if (items.length === 0 && currentStep === 'cart') {
            // Allow viewing empty cart state
        }
    }, [items, currentStep]);

    return (
        <main className="min-h-screen pt-24 pb-16 bg-gray-50 px-6">
            <div className="container mx-auto max-w-4xl">
                {/* Progress Steps */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
                        <div
                            className="absolute top-5 left-0 h-0.5 bg-brand-red transition-all duration-500"
                            style={{
                                width: currentStep === 'cart' ? '0%' :
                                    currentStep === 'delivery' ? '33%' :
                                        currentStep === 'review' ? '66%' : '100%'
                            }}
                        />

                        {steps.map((step, index) => {
                            const StepIcon = step.icon;
                            const isActive = step.id === currentStep;
                            const isCompleted = steps.findIndex(s => s.id === currentStep) > index;

                            return (
                                <div key={step.id} className="relative z-10 flex flex-col items-center">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${isActive ? 'bg-brand-red text-white scale-110' :
                                            isCompleted ? 'bg-brand-red text-white' :
                                                'bg-white text-gray-400 border-2 border-gray-200'
                                            }`}
                                    >
                                        {isCompleted ? <Check className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                                    </div>
                                    <span className={`mt-2 text-xs font-medium uppercase tracking-wider ${isActive ? 'text-brand-red' : isCompleted ? 'text-charcoal' : 'text-gray-400'
                                        }`}>
                                        {step.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Step Content */}
                <AnimatePresence mode="wait">
                    {/* Cart Review Step */}
                    {currentStep === 'cart' && (
                        <motion.div
                            key="cart"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-lg shadow-sm p-8"
                        >
                            <h1 className="text-3xl font-serif font-bold text-charcoal mb-8">
                                {t('cart_title')}
                            </h1>

                            {items.length === 0 ? (
                                <div className="text-center py-12">
                                    <ShoppingBag className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                                    <p className="text-gray-500 font-sans mb-6">{t('empty_cart')}</p>
                                    <Link
                                        href="/shop"
                                        className="inline-block bg-brand-red text-white px-8 py-3 text-sm uppercase tracking-widest font-medium hover:bg-red-700 transition-colors"
                                    >
                                        {t('continue_shopping')}
                                    </Link>
                                </div>
                            ) : (
                                <>
                                    <div className="space-y-6 mb-8">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex gap-4 pb-6 border-b border-gray-100">
                                                <div className="relative w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                                                    <Image src={item.image} alt={item.name} fill className="object-cover" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-serif font-bold text-charcoal">{item.name}</h3>
                                                    <p className="text-sm text-gray-500 uppercase tracking-wide">{item.category}</p>
                                                    <p className="text-sm text-gray-600 mt-1">Qty: {item.quantity}</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-charcoal">{formatPrice(item.price * item.quantity)}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="border-t border-gray-200 pt-6">
                                        <div className="flex justify-between items-center text-lg">
                                            <span className="font-serif text-charcoal">{t('subtotal')}</span>
                                            <span className="font-bold text-charcoal">{formatPrice(cartTotal)}</span>
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">{t('free_shipping_note')}</p>
                                    </div>
                                </>
                            )}
                        </motion.div>
                    )}

                    {/* Delivery Information Step */}
                    {currentStep === 'delivery' && (
                        <motion.div
                            key="delivery"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="bg-white rounded-lg shadow-sm p-8"
                        >
                            <h1 className="text-3xl font-serif font-bold text-charcoal mb-8">
                                {t('delivery_title')}
                            </h1>

                            <form className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Full Name */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {t('full_name')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="fullName"
                                            value={formData.fullName}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-colors ${errors.fullName ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="Enter your full name"
                                        />
                                        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {t('email')}
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-colors ${errors.email ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="your@email.com"
                                        />
                                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {t('phone')}
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-colors ${errors.phone ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="+256 700 000 000"
                                        />
                                    </div>

                                    {/* Postal Code */}
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {t('postal_code')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="postalCode"
                                            value={formData.postalCode}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-colors ${errors.postalCode ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="123-4567"
                                        />
                                        {errors.postalCode && <p className="text-red-500 text-xs mt-1">{errors.postalCode}</p>}
                                    </div>

                                    {/* Prefecture */}
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {t('prefecture')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="prefecture"
                                            value={formData.prefecture}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-colors ${errors.prefecture ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="Tokyo"
                                        />
                                        {errors.prefecture && <p className="text-red-500 text-xs mt-1">{errors.prefecture}</p>}
                                    </div>

                                    {/* Address */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {t('address_line1')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine1"
                                            value={formData.addressLine1}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-colors ${errors.addressLine1 ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="Chiyoda 1-1-1"
                                        />
                                        {errors.addressLine1 && <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>}
                                    </div>

                                    {/* Address Line 2 */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {t('address_line2')}
                                        </label>
                                        <input
                                            type="text"
                                            name="addressLine2"
                                            value={formData.addressLine2}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-colors"
                                            placeholder="Building, floor, room (optional)"
                                        />
                                    </div>

                                    {/* City */}
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {t('city')} *
                                        </label>
                                        <input
                                            type="text"
                                            name="city"
                                            value={formData.city}
                                            onChange={handleInputChange}
                                            className={`w-full px-4 py-3 border rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-colors ${errors.city ? 'border-red-500' : 'border-gray-200'
                                                }`}
                                            placeholder="Shibuya-ku"
                                        />
                                        {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
                                    </div>

                                    {/* Country */}
                                    <div>
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {t('country')}
                                        </label>
                                        <select
                                            name="country"
                                            value={formData.country}
                                            onChange={handleInputChange}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-colors bg-white"
                                        >
                                            <option value="Japan">Japan</option>
                                        </select>
                                    </div>

                                    {/* Delivery Instructions */}
                                    <div className="md:col-span-2">
                                        <label className="block text-sm font-medium text-charcoal mb-2">
                                            {t('delivery_instructions')}
                                        </label>
                                        <textarea
                                            name="deliveryInstructions"
                                            value={formData.deliveryInstructions}
                                            onChange={handleInputChange}
                                            rows={3}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-sm focus:outline-none focus:ring-2 focus:ring-brand-red/20 focus:border-brand-red transition-colors resize-none"
                                            placeholder="Special instructions for delivery (optional)"
                                        />
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {/* Review Step */}
                    {currentStep === 'review' && (
                        <motion.div
                            key="review"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            <div className="bg-white rounded-lg shadow-sm p-8">
                                <h1 className="text-3xl font-serif font-bold text-charcoal mb-8">
                                    {t('review_title')}
                                </h1>

                                {/* Order Summary */}
                                <div className="mb-8">
                                    <h2 className="text-lg font-serif font-bold text-charcoal mb-4 pb-2 border-b border-gray-100">
                                        {t('order_summary')}
                                    </h2>
                                    <div className="space-y-3">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex justify-between text-sm">
                                                <span className="text-gray-600">{item.name} × {item.quantity}</span>
                                                <span className="font-medium text-charcoal">{formatPrice(item.price * item.quantity)}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
                                        <span className="font-serif text-lg text-charcoal">{t('total')}</span>
                                        <span className="font-bold text-xl text-brand-red">{formatPrice(cartTotal)}</span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-2">{t('free_shipping_note')}</p>
                                </div>

                                {/* Delivery Details */}
                                <div>
                                    <h2 className="text-lg font-serif font-bold text-charcoal mb-4 pb-2 border-b border-gray-100">
                                        {t('delivery_details')}
                                    </h2>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500">{t('full_name')}</p>
                                            <p className="font-medium text-charcoal">{formData.fullName}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">{t('email')}</p>
                                            <p className="font-medium text-charcoal">{formData.email}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">{t('phone')}</p>
                                            <p className="font-medium text-charcoal">{formData.phone}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500">{t('address')}</p>
                                            <p className="font-medium text-charcoal">
                                                {formData.postalCode} {formData.prefecture} {formData.city}
                                            </p>
                                            <p className="font-medium text-charcoal">{formData.addressLine1}</p>
                                            {formData.addressLine2 && (
                                                <p className="font-medium text-charcoal">{formData.addressLine2}</p>
                                            )}
                                        </div>
                                        {formData.deliveryInstructions && (
                                            <div className="md:col-span-2">
                                                <p className="text-gray-500">{t('delivery_instructions')}</p>
                                                <p className="font-medium text-charcoal">{formData.deliveryInstructions}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Payment Section Placeholder */}
                            <div className="bg-white rounded-lg shadow-sm p-8">
                                <h2 className="text-lg font-serif font-bold text-charcoal mb-4 flex items-center gap-2">
                                    <CreditCard className="w-5 h-5" />
                                    {t('payment_section')}
                                </h2>
                                <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-6 text-center">
                                    <p className="text-gray-600 font-sans mb-2">
                                        {t('payment_coming_soon')}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        {t('payment_methods_hint')}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Complete Step */}
                    {currentStep === 'complete' && (
                        <motion.div
                            key="complete"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-lg shadow-sm p-12 text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                            >
                                <CheckCircle className="w-10 h-10 text-green-600" />
                            </motion.div>

                            <h1 className="text-3xl font-serif font-bold text-charcoal mb-4">
                                {t('order_placed')}
                            </h1>

                            <p className="text-gray-600 font-sans mb-2">
                                {t('order_confirmation')}
                            </p>

                            {orderNumber && (
                                <div className="bg-gray-50 inline-block px-6 py-3 rounded-lg mb-8">
                                    <p className="text-sm text-gray-500 mb-1">{t('order_number')}</p>
                                    <p className="font-mono font-bold text-charcoal text-lg">{orderNumber}</p>
                                </div>
                            )}

                            <p className="text-sm text-gray-500 mb-8">
                                {t('email_confirmation')}
                            </p>

                            <Link
                                href="/shop"
                                className="inline-block bg-brand-red text-white px-8 py-3 text-sm uppercase tracking-widest font-medium hover:bg-red-700 transition-colors"
                            >
                                {t('continue_shopping')}
                            </Link>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Navigation Buttons */}
                {currentStep !== 'complete' && (
                    <div className="flex justify-between items-center mt-8">
                        {currentStep !== 'cart' ? (
                            <button
                                onClick={handlePrevStep}
                                className="flex items-center gap-2 text-charcoal hover:text-brand-red transition-colors font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                {t('back')}
                            </button>
                        ) : (
                            <Link
                                href="/shop"
                                className="flex items-center gap-2 text-charcoal hover:text-brand-red transition-colors font-medium"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                {t('continue_shopping')}
                            </Link>
                        )}

                        {items.length > 0 && (
                            <button
                                onClick={handleNextStep}
                                className="bg-brand-red text-white px-8 py-3 text-sm uppercase tracking-widest font-medium hover:bg-red-700 transition-colors flex items-center gap-2"
                            >
                                {currentStep === 'review' ? t('place_order') : t('continue')}
                                <ArrowRight className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                )}
            </div>
        </main>
    );
}
