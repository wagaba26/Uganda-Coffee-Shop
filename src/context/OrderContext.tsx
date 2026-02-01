'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DeliveryInfo {
    fullName: string;
    email: string;
    phone: string;
    postalCode: string;
    prefecture: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
    country: string;
    deliveryInstructions: string;
}

export interface OrderState {
    deliveryInfo: DeliveryInfo;
    orderPlaced: boolean;
    orderNumber: string | null;
}

interface OrderContextType {
    orderState: OrderState;
    setDeliveryInfo: (info: DeliveryInfo) => void;
    placeOrder: () => string;
    clearOrder: () => void;
}

const defaultDeliveryInfo: DeliveryInfo = {
    fullName: '',
    email: '',
    phone: '',
    postalCode: '',
    prefecture: '',
    city: '',
    addressLine1: '',
    addressLine2: '',
    country: 'Japan',
    deliveryInstructions: ''
};

const defaultOrderState: OrderState = {
    deliveryInfo: defaultDeliveryInfo,
    orderPlaced: false,
    orderNumber: null
};

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: React.ReactNode }) {
    const [orderState, setOrderState] = useState<OrderState>(defaultOrderState);

    // Load order state from localStorage on mount
    useEffect(() => {
        const savedOrder = localStorage.getItem('uganda-coffee-order');
        if (savedOrder) {
            try {
                setOrderState(JSON.parse(savedOrder));
            } catch (e) {
                console.error('Failed to parse order state', e);
            }
        }
    }, []);

    // Save order state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('uganda-coffee-order', JSON.stringify(orderState));
    }, [orderState]);

    const setDeliveryInfo = (info: DeliveryInfo) => {
        setOrderState(prev => ({
            ...prev,
            deliveryInfo: info
        }));
    };

    const placeOrder = (): string => {
        // Generate a unique order number
        const orderNumber = `UCS-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

        setOrderState(prev => ({
            ...prev,
            orderPlaced: true,
            orderNumber
        }));

        return orderNumber;
    };

    const clearOrder = () => {
        setOrderState(defaultOrderState);
    };

    return (
        <OrderContext.Provider
            value={{
                orderState,
                setDeliveryInfo,
                placeOrder,
                clearOrder
            }}
        >
            {children}
        </OrderContext.Provider>
    );
}

export function useOrder() {
    const context = useContext(OrderContext);
    if (context === undefined) {
        throw new Error('useOrder must be used within an OrderProvider');
    }
    return context;
}
