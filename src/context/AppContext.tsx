import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Language,
  MenuItem,
  CustomizationOptions,
  CartItem,
  LoyaltyVoucher,
  Order,
} from '../types';
import { translations } from '../data/translations';
import { initialVouchers } from '../data/loyaltyData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  
  // Cart
  cart: CartItem[];
  addToCart: (menuItem: MenuItem, customization?: CustomizationOptions, quantity?: number) => void;
  updateCartItemQuantity: (cartItemId: string, quantity: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartTotalCount: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;

  // Customization modal
  customizingItem: MenuItem | null;
  setCustomizingItem: (item: MenuItem | null) => void;

  // Checkout modal
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  latestOrder: Order | null;
  setLatestOrder: (order: Order | null) => void;

  // Loyalty Rewards
  loyaltyPoints: number;
  stamps: number;
  punchStamp: () => void;
  redeemVoucher: (voucherId: string) => boolean;
  activeVouchers: LoyaltyVoucher[];
  appliedVoucher: LoyaltyVoucher | null;
  applyVoucherToCart: (voucher: LoyaltyVoucher | null) => void;

  // Orders
  orders: Order[];
  createOrder: (data: {
    orderType: 'pickup' | 'delivery';
    pickupStore?: string;
    deliveryAddress?: string;
    customerName: string;
    customerPhone: string;
  }) => Order;

  // Store locator highlight
  selectedStoreId: string | null;
  setSelectedStoreId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Language
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('amz_language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('amz_language', lang);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('amz_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Loyalty
  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(() => {
    const saved = localStorage.getItem('amz_points');
    return saved !== null ? parseInt(saved, 10) : 240;
  });

  const [stamps, setStamps] = useState<number>(() => {
    const saved = localStorage.getItem('amz_stamps');
    return saved !== null ? parseInt(saved, 10) : 7;
  });

  const [activeVouchers, setActiveVouchers] = useState<LoyaltyVoucher[]>(() => {
    try {
      const saved = localStorage.getItem('amz_active_vouchers');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedVoucher, setAppliedVoucher] = useState<LoyaltyVoucher | null>(null);

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('amz_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Selected store for map
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>('store-siam-glasshouse');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('amz_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('amz_points', loyaltyPoints.toString());
  }, [loyaltyPoints]);

  useEffect(() => {
    localStorage.setItem('amz_stamps', stamps.toString());
  }, [stamps]);

  useEffect(() => {
    localStorage.setItem('amz_active_vouchers', JSON.stringify(activeVouchers));
  }, [activeVouchers]);

  useEffect(() => {
    localStorage.setItem('amz_orders', JSON.stringify(orders));
  }, [orders]);

  // Cart actions
  const defaultCustomization: CustomizationOptions = {
    temperature: 'iced',
    size: '16oz',
    sweetness: 50,
    milk: 'regular',
    extraShots: 0,
    toppings: [],
  };

  const calculateUnitPrice = (item: MenuItem, cust: CustomizationOptions): number => {
    let price = item.price;
    if (cust.temperature === 'frappe') price += 10;
    if (cust.size === '22oz') price += 10;
    if (cust.milk === 'oat' || cust.milk === 'almond') price += 15;
    if (cust.milk === 'soy') price += 10;
    if (cust.extraShots > 0) price += cust.extraShots * 15;
    if (cust.toppings.includes('Coffee Jelly (+฿12)')) price += 12;
    if (cust.toppings.includes('Brown Sugar Pearls (+฿12)')) price += 12;
    if (cust.toppings.includes('Velvet Whipped Cream (+฿10)')) price += 10;
    if (cust.toppings.includes('Wildflower Honey (+฿8)')) price += 8;
    return price;
  };

  const addToCart = (
    menuItem: MenuItem,
    customization: CustomizationOptions = defaultCustomization,
    quantity = 1
  ) => {
    const unitPrice = calculateUnitPrice(menuItem, customization);
    const cartItemId = `${menuItem.id}-${customization.temperature}-${customization.size}-${customization.sweetness}-${customization.milk}-${customization.extraShots}-${customization.toppings.sort().join(',')}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.cartItemId === cartItemId
            ? {
                ...item,
                quantity: item.quantity + quantity,
                totalPrice: (item.quantity + quantity) * unitPrice,
              }
            : item
        );
      }
      return [
        ...prev,
        {
          cartItemId,
          menuItem,
          quantity,
          customization,
          unitPrice,
          totalPrice: unitPrice * quantity,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateCartItemQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId
          ? {
              ...item,
              quantity,
              totalPrice: item.unitPrice * quantity,
            }
          : item
      )
    );
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
  };

  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Calculate discount based on applied voucher
  let cartDiscount = 0;
  if (appliedVoucher && cartSubtotal > 0) {
    if (appliedVoucher.discountType === 'percent') {
      cartDiscount = Math.round((cartSubtotal * appliedVoucher.discountValue) / 100);
    } else if (appliedVoucher.discountType === 'freeItem' || appliedVoucher.discountType === 'fixed') {
      cartDiscount = Math.min(appliedVoucher.discountValue, cartSubtotal);
    } else if (appliedVoucher.discountType === 'upsize') {
      cartDiscount = Math.min(10, cartSubtotal);
    }
  }
  const cartTotal = Math.max(0, cartSubtotal - cartDiscount);

  // Loyalty actions
  const punchStamp = () => {
    setStamps((prev) => {
      const next = prev >= 10 ? 1 : prev + 1;
      if (next === 10) {
        // Automatically grant free signature drink voucher
        const freeVoucher = initialVouchers.find((v) => v.id === 'vouch-free-signature');
        if (freeVoucher && !activeVouchers.some((v) => v.code === freeVoucher.code)) {
          setActiveVouchers((vPrev) => [freeVoucher, ...vPrev]);
        }
      }
      return next;
    });
  };

  const redeemVoucher = (voucherId: string): boolean => {
    const voucher = initialVouchers.find((v) => v.id === voucherId);
    if (!voucher) return false;
    if (loyaltyPoints < voucher.costPoints) return false;

    setLoyaltyPoints((prev) => prev - voucher.costPoints);
    setActiveVouchers((prev) => {
      if (prev.some((v) => v.id === voucher.id)) return prev;
      return [voucher, ...prev];
    });
    return true;
  };

  const applyVoucherToCart = (voucher: LoyaltyVoucher | null) => {
    setAppliedVoucher(voucher);
  };

  // Order creation
  const createOrder = (data: {
    orderType: 'pickup' | 'delivery';
    pickupStore?: string;
    deliveryAddress?: string;
    customerName: string;
    customerPhone: string;
  }): Order => {
    const pointsEarned = Math.floor(cartTotal / 25); // 1 point per 25 THB
    const newOrder: Order = {
      id: `AMZ-${Date.now().toString().slice(-6)}`,
      date: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      items: [...cart],
      subtotal: cartSubtotal,
      discount: cartDiscount,
      total: cartTotal,
      orderType: data.orderType,
      pickupStore: data.pickupStore,
      deliveryAddress: data.deliveryAddress,
      customerName: data.customerName,
      customerPhone: data.customerPhone,
      status: 'received',
    };

    setOrders((prev) => [newOrder, ...prev]);
    setLatestOrder(newOrder);
    setLoyaltyPoints((prev) => prev + pointsEarned);
    punchStamp();
    clearCart();
    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        cart,
        addToCart,
        updateCartItemQuantity,
        removeFromCart,
        clearCart,
        cartTotalCount,
        cartSubtotal,
        cartDiscount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
        customizingItem,
        setCustomizingItem,
        isCheckoutOpen,
        setIsCheckoutOpen,
        latestOrder,
        setLatestOrder,
        loyaltyPoints,
        stamps,
        punchStamp,
        redeemVoucher,
        activeVouchers,
        appliedVoucher,
        applyVoucherToCart,
        orders,
        createOrder,
        selectedStoreId,
        setSelectedStoreId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
