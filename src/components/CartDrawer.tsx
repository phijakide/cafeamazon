import React from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    updateCartItemQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    t,
    language,
    setIsCheckoutOpen,
    activeVouchers,
    appliedVoucher,
    applyVoucherToCart,
  } = useApp();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FDFBF7] shadow-2xl flex flex-col border-l border-[#E6E0D5] animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-5 border-b border-[#EAE5DB] flex items-center justify-between bg-white">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="w-5 h-5 text-[#1B5E45]" />
              <h2 className="text-base font-bold font-display text-[#0B3B2B]">
                {t('yourOrder')}
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-[#5F7167] hover:text-[#0B3B2B] hover:bg-[#F1EDE4] rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                <div className="w-16 h-16 rounded-full bg-[#EBF3EF] flex items-center justify-center text-[#1B5E45]">
                  <ShoppingBag className="w-8 h-8 opacity-60" />
                </div>
                <h3 className="text-base font-semibold text-[#1A2621]">{t('cartEmpty')}</h3>
                <p className="text-xs text-[#52645C] max-w-xs">{t('cartEmptyDesc')}</p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-3 px-4 py-2 text-xs font-semibold text-[#0B3B2B] bg-[#EBF3EF] hover:bg-[#DDEEE6] rounded-xl transition-colors"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map((item) => {
                const name = item.menuItem.name[language] || item.menuItem.name.en;
                const cust = item.customization;

                return (
                  <div
                    key={item.cartItemId}
                    className="p-4 bg-white rounded-xl border border-[#E8E2D7] shadow-xs flex flex-col space-y-3"
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 pr-2">
                        <h4 className="text-sm font-semibold text-[#0B3B2B]">{name}</h4>
                        
                        {/* Customization Details */}
                        <div className="text-[11px] text-[#55675E] space-y-0.5">
                          <p>
                            {cust.temperature.toUpperCase()} · {cust.size} · Sweetness {cust.sweetness}%
                          </p>
                          {cust.milk !== 'regular' && (
                            <p>Milk: <span className="font-medium text-[#1B5E45]">{cust.milk}</span></p>
                          )}
                          {cust.extraShots > 0 && (
                            <p>Extra Shot: +{cust.extraShots}</p>
                          )}
                          {cust.toppings.length > 0 && (
                            <p className="text-[#1B5E45] font-medium">
                              +{cust.toppings.join(', ')}
                            </p>
                          )}
                          {cust.specialInstructions && (
                            <p className="italic text-[#798A82]">Note: "{cust.specialInstructions}"</p>
                          )}
                        </div>
                      </div>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        className="text-[#96A79E] hover:text-rose-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="pt-2 border-t border-[#F2ECE2] flex items-center justify-between">
                      {/* Quantity Stepper */}
                      <div className="flex items-center space-x-2 border border-[#D9D3C7] rounded-lg p-0.5 bg-[#FAF8F5]">
                        <button
                          onClick={() =>
                            updateCartItemQuantity(item.cartItemId, item.quantity - 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#2C3B34] hover:bg-white rounded transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-semibold px-2 tabular-nums text-[#0B3B2B]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateCartItemQuantity(item.cartItemId, item.quantity + 1)
                          }
                          className="w-6 h-6 flex items-center justify-center text-[#2C3B34] hover:bg-white rounded transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold font-display text-[#0B3B2B] tabular-nums">
                          ฿{item.totalPrice}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Active Voucher Selection in Cart */}
            {cart.length > 0 && activeVouchers.length > 0 && (
              <div className="p-3.5 bg-[#F2EDE4] rounded-xl border border-[#E0D8CA] space-y-2">
                <div className="flex items-center space-x-1.5 text-xs font-semibold text-[#0B3B2B]">
                  <Tag className="w-3.5 h-3.5 text-[#1B5E45]" />
                  <span>Available Loyalty Coupons</span>
                </div>
                <div className="space-y-1.5">
                  {activeVouchers.map((v) => {
                    const isApplied = appliedVoucher?.code === v.code;
                    return (
                      <div
                        key={v.id}
                        className={`p-2 rounded-lg flex items-center justify-between text-xs transition-colors ${
                          isApplied
                            ? 'bg-[#0B3B2B] text-white'
                            : 'bg-white text-[#2C3B34] border border-[#DDD7CC]'
                        }`}
                      >
                        <div className="truncate pr-2">
                          <p className="font-semibold truncate">{v.title[language] || v.title.en}</p>
                          <p className={`text-[10px] ${isApplied ? 'text-emerald-200' : 'text-[#6C7E74]'}`}>
                            Code: {v.code}
                          </p>
                        </div>
                        <button
                          onClick={() => applyVoucherToCart(isApplied ? null : v)}
                          className={`px-2 py-1 text-[11px] font-bold rounded-md shrink-0 transition-colors ${
                            isApplied
                              ? 'bg-white text-[#0B3B2B]'
                              : 'bg-[#EBF3EF] text-[#0B3B2B] hover:bg-[#DCEEE5]'
                          }`}
                        >
                          {isApplied ? 'Applied' : 'Apply'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Footer Summary & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-[#EAE5DB] bg-white space-y-3">
              <div className="space-y-1.5 text-xs text-[#52645C]">
                <div className="flex justify-between">
                  <span>{t('subtotal')}</span>
                  <span className="font-semibold tabular-nums text-[#1A2621]">
                    ฿{cartSubtotal}
                  </span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-[#1B5E45] font-semibold">
                    <span>{t('discount')} ({appliedVoucher?.code})</span>
                    <span className="tabular-nums">-฿{cartDiscount}</span>
                  </div>
                )}
                <div className="pt-2 border-t border-[#F2ECE2] flex justify-between text-sm font-bold text-[#0B3B2B]">
                  <span>{t('estimatedTotal')}</span>
                  <span className="text-base font-display tabular-nums">
                    ฿{cartTotal}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-3.5 px-4 text-xs font-semibold text-white bg-[#0B3B2B] hover:bg-[#1B5E45] active:scale-[0.98] rounded-xl shadow-md transition-all flex items-center justify-center space-x-2"
              >
                <span>{t('proceedToCheckout')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
