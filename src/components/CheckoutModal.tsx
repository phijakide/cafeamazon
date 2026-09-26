import React, { useState } from 'react';
import { X, CheckCircle2, Clock, MapPin, Coffee, QrCode } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storeLocations } from '../data/storesData';
import { Order } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    cartTotal,
    cartDiscount,
    cartSubtotal,
    createOrder,
    latestOrder,
    setLatestOrder,
    t,
    language,
    punchStamp,
  } = useApp();

  const [orderType, setOrderType] = useState<'pickup' | 'delivery'>('pickup');
  const [pickupStore, setPickupStore] = useState(storeLocations[0].id);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isCheckoutOpen) return null;

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setCompletedOrder(null);
    setLatestOrder(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerPhone.trim()) {
      return;
    }
    if (orderType === 'delivery' && !deliveryAddress.trim()) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const selectedStore = storeLocations.find((s) => s.id === pickupStore);
      const storeName = selectedStore
        ? selectedStore.name[language] || selectedStore.name.en
        : undefined;

      const order = createOrder({
        orderType,
        pickupStore: storeName,
        deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
        customerName: customerName.trim(),
        customerPhone: customerPhone.trim(),
      });

      setCompletedOrder(order);
      setIsSubmitting(false);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-[#FDFBF7] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E6E0D5] my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-[#EAE5DB] flex items-center justify-between bg-white">
          <h3 className="text-base font-bold font-display text-[#0B3B2B]">
            {completedOrder ? t('orderSuccessTitle') : t('checkoutTitle')}
          </h3>
          <button
            onClick={handleClose}
            className="p-1.5 text-[#5F7167] hover:text-[#0B3B2B] hover:bg-[#F1EDE4] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content: Form OR Receipt/Tracker */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {completedOrder ? (
            /* Order Success Receipt & Status Tracker */
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <div className="w-14 h-14 bg-[#EBF3EF] text-[#1B5E45] rounded-full mx-auto flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-lg font-bold font-display text-[#0B3B2B]">
                  {t('orderSuccessTitle')}
                </h4>
                <p className="text-xs text-[#52645C]">{t('orderSuccessMsg')}</p>
                <div className="inline-block px-3 py-1 bg-white border border-[#D9D3C7] rounded-lg text-xs font-mono font-bold text-[#0B3B2B] mt-1">
                  Order ID: {completedOrder.id}
                </div>
              </div>

              {/* Live Status Tracker */}
              <div className="p-4 bg-white rounded-xl border border-[#E6E0D5] space-y-3">
                <span className="text-xs font-semibold text-[#0B3B2B] uppercase tracking-wider block">
                  {t('trackStatus')}
                </span>
                
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 bg-[#EBF3EF] text-[#0B3B2B] font-semibold rounded-lg border border-[#D0E4DA] flex flex-col items-center">
                    <CheckCircle2 className="w-4 h-4 text-[#1B5E45] mb-1" />
                    <span>{t('statusReceived')}</span>
                  </div>
                  <div className="p-2 bg-[#FAF8F5] text-[#1B5E45] font-semibold rounded-lg border border-[#E6E0D5] flex flex-col items-center animate-pulse">
                    <Coffee className="w-4 h-4 text-[#C89547] mb-1" />
                    <span>{t('statusBrewing')}</span>
                  </div>
                  <div className="p-2 bg-[#FAF8F5] text-[#86988F] rounded-lg border border-[#EAE5DB] flex flex-col items-center">
                    <Clock className="w-4 h-4 mb-1" />
                    <span>{t('statusReady')}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-[#52645C] pt-2 border-t border-[#F1EDE4]">
                  <span>{t('estimatedReady')}</span>
                  <span className="font-bold text-[#0B3B2B] tabular-nums">~8-12 Minutes</span>
                </div>
              </div>

              {/* Order Receipt Details */}
              <div className="p-4 bg-white rounded-xl border border-[#E6E0D5] text-xs space-y-2">
                <div className="flex justify-between font-semibold text-[#0B3B2B]">
                  <span>{completedOrder.orderType === 'pickup' ? t('pickup') : t('delivery')}</span>
                  <span className="text-right text-[#52645C] font-normal truncate max-w-[200px]">
                    {completedOrder.pickupStore || completedOrder.deliveryAddress}
                  </span>
                </div>
                <div className="flex justify-between text-[#52645C]">
                  <span>Customer:</span>
                  <span className="font-medium text-[#1A2621]">
                    {completedOrder.customerName} ({completedOrder.customerPhone})
                  </span>
                </div>
                <div className="pt-2 border-t border-[#F1EDE4] flex justify-between font-bold text-sm text-[#0B3B2B]">
                  <span>Total Paid:</span>
                  <span className="font-display tabular-nums">฿{completedOrder.total}</span>
                </div>
              </div>

              {/* Rewards Earned Callout */}
              <div className="p-4 bg-[#EBF3EF] rounded-xl border border-[#CFE4DA] flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-[#0B3B2B]">
                    {t('loyaltyPointsEarned')}
                  </div>
                  <div className="text-sm font-display font-bold text-[#1B5E45] tabular-nums">
                    +{Math.floor(completedOrder.total / 25)} Points
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    punchStamp();
                    handleClose();
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0B3B2B] hover:bg-[#1B5E45] rounded-lg transition-colors"
                >
                  {t('collectStampBtn')}
                </button>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full py-3 text-xs font-semibold text-[#0B3B2B] bg-[#EAE5DB] hover:bg-[#DDD6C8] rounded-xl transition-colors"
              >
                Done / Back to Store
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Pickup vs Delivery Toggle */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-2">
                  {t('orderType')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setOrderType('pickup')}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                      orderType === 'pickup'
                        ? 'border-[#0B3B2B] bg-[#0B3B2B] text-white shadow-sm'
                        : 'border-[#D9D3C7] bg-white text-[#2C3B34]'
                    }`}
                  >
                    {t('pickup')}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType('delivery')}
                    className={`py-2.5 px-3 text-xs font-semibold rounded-xl border text-center transition-all ${
                      orderType === 'delivery'
                        ? 'border-[#0B3B2B] bg-[#0B3B2B] text-white shadow-sm'
                        : 'border-[#D9D3C7] bg-white text-[#2C3B34]'
                    }`}
                  >
                    {t('delivery')}
                  </button>
                </div>
              </div>

              {/* Branch Selector or Delivery Address */}
              {orderType === 'pickup' ? (
                <div>
                  <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-1.5">
                    {t('selectPickupStore')}
                  </label>
                  <select
                    value={pickupStore}
                    onChange={(e) => setPickupStore(e.target.value)}
                    className="w-full text-xs p-3 border border-[#D9D3C7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5E45]"
                  >
                    {storeLocations.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name[language] || store.name.en} ({store.hours})
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-1.5">
                    {t('deliveryAddressLabel')}
                  </label>
                  <input
                    type="text"
                    required
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder={t('deliveryAddressPlaceholder')}
                    className="w-full text-xs p-3 border border-[#D9D3C7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5E45]"
                  />
                </div>
              )}

              {/* Customer Info */}
              <div className="space-y-3">
                <span className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide">
                  {t('contactDetails')}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-[#55675E] mb-1">
                      {t('yourName')}
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Somchai S."
                      className="w-full text-xs p-2.5 border border-[#D9D3C7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5E45]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-[#55675E] mb-1">
                      {t('yourPhone')}
                    </label>
                    <input
                      type="tel"
                      required
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      placeholder="e.g. 081-234-5678"
                      className="w-full text-xs p-2.5 border border-[#D9D3C7] rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-[#1B5E45]"
                    />
                  </div>
                </div>
              </div>

              {/* Payment Option */}
              <div>
                <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-2">
                  {t('paymentMethod')}
                </label>
                <div className="space-y-2">
                  <label className="flex items-center p-3 border border-[#D9D3C7] rounded-xl bg-white cursor-pointer hover:border-[#1B5E45]">
                    <input
                      type="radio"
                      name="payment"
                      defaultChecked
                      className="text-[#1B5E45] focus:ring-[#1B5E45]"
                    />
                    <div className="ml-3 flex items-center space-x-2">
                      <QrCode className="w-4 h-4 text-[#1B5E45]" />
                      <span className="text-xs font-medium text-[#1A2621]">
                        {t('payAtCounter')}
                      </span>
                    </div>
                  </label>
                  <label className="flex items-center p-3 border border-[#D9D3C7] rounded-xl bg-white cursor-pointer hover:border-[#1B5E45]">
                    <input
                      type="radio"
                      name="payment"
                      className="text-[#1B5E45] focus:ring-[#1B5E45]"
                    />
                    <div className="ml-3 flex items-center space-x-2">
                      <span className="text-xs font-medium text-[#1A2621]">
                        {t('payCredit')}
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Order Amount Breakdown */}
              <div className="p-3.5 bg-white rounded-xl border border-[#E6E0D5] text-xs space-y-1">
                <div className="flex justify-between text-[#55675E]">
                  <span>{t('subtotal')} ({cart.length} items)</span>
                  <span className="tabular-nums">฿{cartSubtotal}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#1B5E45] font-semibold">
                    <span>{t('discount')}</span>
                    <span className="tabular-nums">-฿{cartDiscount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#F0EBE1] flex justify-between font-bold text-sm text-[#0B3B2B]">
                  <span>{t('estimatedTotal')}</span>
                  <span className="font-display tabular-nums">฿{cartTotal}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-[#0B3B2B] hover:bg-[#1B5E45] active:scale-[0.98] rounded-xl shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
              >
                <span>{isSubmitting ? 'Preparing Order...' : t('placeOrderBtn')}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
