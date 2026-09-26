export type Language = 'en' | 'th' | 'ja' | 'zh';

export type MenuCategory = 'all' | 'coffee' | 'tea' | 'frappe' | 'bakery' | 'refresher';

export interface MenuItem {
  id: string;
  name: {
    en: string;
    th: string;
    ja: string;
    zh: string;
  };
  description: {
    en: string;
    th: string;
    ja: string;
    zh: string;
  };
  price: number; // in THB
  category: MenuCategory;
  image: string;
  isPopular?: boolean;
  isNew?: boolean;
  calories?: number;
  availableSizes?: ('16oz' | '22oz')[];
  allowsCustomization?: boolean;
}

export interface CustomizationOptions {
  temperature: 'iced' | 'hot' | 'frappe';
  size: '16oz' | '22oz';
  sweetness: 0 | 25 | 50 | 100;
  milk: 'regular' | 'oat' | 'almond' | 'soy';
  extraShots: number;
  toppings: string[];
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  customization: CustomizationOptions;
  unitPrice: number;
  totalPrice: number;
}

export interface StoreLocation {
  id: string;
  name: {
    en: string;
    th: string;
    ja: string;
    zh: string;
  };
  address: {
    en: string;
    th: string;
    ja: string;
    zh: string;
  };
  city: string;
  district: string;
  coordinates: {
    lat: number;
    lng: number;
    mapX: number; // % on custom stylized map (0-100)
    mapY: number; // % on custom stylized map (0-100)
  };
  hours: string;
  phone: string;
  features: ('drivethru' | '24hours' | 'garden' | 'wifi' | 'coworking' | 'ev')[];
  image?: string;
}

export interface LoyaltyVoucher {
  id: string;
  code: string;
  title: {
    en: string;
    th: string;
    ja: string;
    zh: string;
  };
  description: {
    en: string;
    th: string;
    ja: string;
    zh: string;
  };
  costPoints: number;
  discountType: 'fixed' | 'percent' | 'freeItem' | 'upsize';
  discountValue: number; // amount in THB or % or free
  isRedeemed?: boolean;
  expiresInDays?: number;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  orderType: 'pickup' | 'delivery';
  pickupStore?: string;
  deliveryAddress?: string;
  customerName: string;
  customerPhone: string;
  status: 'received' | 'brewing' | 'ready' | 'completed';
}

export interface AmbiancePhoto {
  id: string;
  title: {
    en: string;
    th: string;
    ja: string;
    zh: string;
  };
  description: {
    en: string;
    th: string;
    ja: string;
    zh: string;
  };
  category: 'glasshouse' | 'barista' | 'garden' | 'seating';
  image: string;
  highlight: string;
}
