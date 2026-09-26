import React, { useState } from 'react';
import { Award, Gift, Check, Sparkles, Tag, Coffee } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { initialVouchers } from '../data/loyaltyData';

export const LoyaltyTracker: React.FC = () => {
  const {
    t,
    language,
    loyaltyPoints,
    stamps,
    punchStamp,
    activeVouchers,
    redeemVoucher,
    applyVoucherToCart,
    setIsCartOpen,
  } = useApp();

  const [notification, setNotification] = useState<string | null>(null);

  const handlePunch = () => {
    punchStamp();
    setNotification(t('punchStampSuccess'));
    setTimeout(() => setNotification(null), 3000);
  };

  const handleRedeem = (voucherId: string) => {
    const success = redeemVoucher(voucherId);
    if (success) {
      setNotification('Coupon redeemed successfully! Ready to use in cart.');
      setTimeout(() => setNotification(null), 3000);
    } else {
      setNotification('Insufficient points for this voucher.');
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <section id="loyalty" className="py-16 md:py-24 bg-[#F2EDE4] border-b border-[#E6E0D5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <div className="text-xs font-semibold text-[#1B5E45] tracking-wider uppercase flex items-center justify-center space-x-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Café Amazan Privilege</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B3B2B] tracking-tight">
            {t('loyaltyTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#4E6057] leading-relaxed">
            {t('loyaltySubtitle')}
          </p>
        </div>

        {/* Temporary Notification Banner */}
        {notification && (
          <div className="max-w-md mx-auto mb-8 p-3.5 bg-[#0B3B2B] text-white text-xs font-semibold rounded-xl text-center shadow-lg flex items-center justify-center space-x-2 animate-in fade-in slide-in-from-top-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Digital Member Pass & Stamp Card */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Digital Member Card */}
            <div className="relative rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-[#0B3B2B] via-[#134937] to-[#08291E] text-white shadow-xl overflow-hidden border border-emerald-900">
              {/* Background botanical watermark circle */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-emerald-700/20 rounded-full blur-2xl pointer-events-none" />

              <div className="flex items-start justify-between relative z-10">
                <div>
                  <div className="text-xs font-medium text-emerald-300 uppercase tracking-widest">
                    {t('memberTier')}
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white tracking-wide mt-1">
                    Café Amazan Club
                  </h3>
                </div>
                <Award className="w-8 h-8 text-[#E8C581]" />
              </div>

              <div className="my-8 relative z-10 flex items-end justify-between">
                <div>
                  <div className="text-xs text-emerald-200/80 uppercase tracking-wider">
                    {t('pointsBalance')}
                  </div>
                  <div className="text-4xl font-display font-bold text-white tabular-nums tracking-tight mt-0.5">
                    {loyaltyPoints} <span className="text-sm font-sans font-normal text-emerald-300">{t('pts')}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-emerald-200/70">{t('memberId')}</div>
                  <div className="text-xs font-mono font-semibold text-white tracking-wider">
                    AMZ-8894-2026
                  </div>
                </div>
              </div>

              {/* Barcode Strip */}
              <div className="pt-4 border-t border-white/15 flex items-center justify-between relative z-10">
                <div className="text-xs text-emerald-100 font-medium">{t('cardHolder')}</div>
                <div className="flex items-center space-x-1 font-mono text-[10px] tracking-widest opacity-80">
                  ||| | |||| | ||| |||| | ||
                </div>
              </div>
            </div>

            {/* Digital Stamp Card */}
            <div className="p-6 bg-white rounded-2xl border border-[#DDD7CC] shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-[#0B3B2B] font-display">
                    {t('stampsCardTitle')}
                  </h4>
                  <p className="text-xs text-[#52645C] mt-0.5">{t('stampsProgress')}</p>
                </div>
                <span className="text-xs font-bold text-[#1B5E45] font-display tabular-nums bg-[#EBF3EF] px-2.5 py-1 rounded-md">
                  {stamps} / 10
                </span>
              </div>

              {/* 10 Stamp Grid */}
              <div className="grid grid-cols-5 gap-3 pt-2">
                {Array.from({ length: 10 }).map((_, index) => {
                  const isPunched = index < stamps;
                  return (
                    <div
                      key={index}
                      className={`aspect-square rounded-xl border flex flex-col items-center justify-center transition-all ${
                        isPunched
                          ? 'bg-[#0B3B2B] border-[#0B3B2B] text-white shadow-xs scale-100'
                          : 'bg-[#FAF8F5] border-dashed border-[#D9D3C7] text-[#9AAEA4]'
                      }`}
                    >
                      {isPunched ? (
                        <Coffee className="w-5 h-5 text-[#E8C581] animate-in zoom-in duration-200" />
                      ) : (
                        <span className="text-[11px] font-mono tabular-nums font-semibold">
                          {index + 1}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-[#F2ECE2] flex items-center justify-between">
                <span className="text-xs text-[#64766E]">
                  Collect with every freshly brewed beverage
                </span>
                <button
                  onClick={handlePunch}
                  className="px-3.5 py-2 text-xs font-semibold text-[#0B3B2B] bg-[#EBF3EF] hover:bg-[#DDEEE6] active:scale-[0.98] rounded-xl transition-colors"
                >
                  + Stamp Simulation
                </button>
              </div>
            </div>

          </div>

          {/* Right Column: Vouchers Redemption & Active Wallet */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Active Vouchers in Wallet */}
            {activeVouchers.length > 0 && (
              <div className="p-5 bg-white rounded-2xl border border-[#DDD7CC] shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1.5 text-xs font-bold text-[#0B3B2B] uppercase tracking-wider">
                    <Tag className="w-3.5 h-3.5 text-[#1B5E45]" />
                    <span>{t('activeVouchers')}</span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="text-xs font-semibold text-[#1B5E45] hover:underline"
                  >
                    Open Cart to Use
                  </button>
                </div>

                <div className="space-y-2">
                  {activeVouchers.map((v) => (
                    <div
                      key={v.id}
                      className="p-3 bg-[#FAF8F5] border border-[#E4DEC9] rounded-xl flex items-center justify-between"
                    >
                      <div className="space-y-0.5 pr-2">
                        <span className="text-xs font-bold text-[#0B3B2B]">
                          {v.title[language] || v.title.en}
                        </span>
                        <div className="text-[11px] font-mono text-[#1B5E45]">
                          Code: {v.code}
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          applyVoucherToCart(v);
                          setIsCartOpen(true);
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-[#0B3B2B] hover:bg-[#1B5E45] rounded-lg transition-colors shrink-0"
                      >
                        {t('applyVoucher')}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Redeem Catalog */}
            <div className="p-6 bg-white rounded-2xl border border-[#DDD7CC] shadow-xs space-y-4">
              <div>
                <h4 className="text-sm font-bold text-[#0B3B2B] font-display">
                  {t('redeemVouchersTitle')}
                </h4>
                <p className="text-xs text-[#52645C] mt-0.5">
                  Exchange your accumulated rewards points for immediate benefits.
                </p>
              </div>

              <div className="space-y-3">
                {initialVouchers.map((voucher) => {
                  const isAlreadyRedeemed = activeVouchers.some((v) => v.id === voucher.id);
                  const canAfford = loyaltyPoints >= voucher.costPoints;

                  return (
                    <div
                      key={voucher.id}
                      className="p-4 rounded-xl border border-[#E6E0D5] bg-[#FAF8F5] hover:bg-white transition-all flex items-center justify-between gap-3"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Gift className="w-4 h-4 text-[#1B5E45] shrink-0" />
                          <h5 className="text-xs font-bold text-[#0B3B2B]">
                            {voucher.title[language] || voucher.title.en}
                          </h5>
                        </div>
                        <p className="text-[11px] text-[#55675E] leading-relaxed">
                          {voucher.description[language] || voucher.description.en}
                        </p>
                        <span className="text-[11px] font-semibold text-[#C89547] block tabular-nums">
                          {voucher.costPoints} Points
                        </span>
                      </div>

                      <div className="shrink-0">
                        {isAlreadyRedeemed ? (
                          <span className="inline-flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold text-[#1B5E45] bg-[#EBF3EF] rounded-lg">
                            <Check className="w-3.5 h-3.5" />
                            <span>Claimed</span>
                          </span>
                        ) : (
                          <button
                            onClick={() => handleRedeem(voucher.id)}
                            disabled={!canAfford}
                            className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                              canAfford
                                ? 'bg-[#0B3B2B] text-white hover:bg-[#1B5E45]'
                                : 'bg-[#EAE5DB] text-[#8C9E95] cursor-not-allowed'
                            }`}
                          >
                            {t('redeemBtn')}
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
