import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CustomizationOptions } from '../types';

export const CustomizationModal: React.FC = () => {
  const { customizingItem, setCustomizingItem, addToCart, t, language } = useApp();

  const [temperature, setTemperature] = useState<'iced' | 'hot' | 'frappe'>('iced');
  const [size, setSize] = useState<'16oz' | '22oz'>('16oz');
  const [sweetness, setSweetness] = useState<0 | 25 | 50 | 100>(50);
  const [milk, setMilk] = useState<'regular' | 'oat' | 'almond' | 'soy'>('regular');
  const [extraShots, setExtraShots] = useState<number>(0);
  const [toppings, setToppings] = useState<string[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset states when item opens
  useEffect(() => {
    if (customizingItem) {
      setTemperature(customizingItem.category === 'frappe' ? 'frappe' : 'iced');
      setSize('16oz');
      setSweetness(50);
      setMilk('regular');
      setExtraShots(0);
      setToppings([]);
      setSpecialInstructions('');
    }
  }, [customizingItem]);

  if (!customizingItem) return null;

  // Calculate current customized unit price
  let currentPrice = customizingItem.price;
  if (temperature === 'frappe') currentPrice += 10;
  if (size === '22oz') currentPrice += 10;
  if (milk === 'oat' || milk === 'almond') currentPrice += 15;
  if (milk === 'soy') currentPrice += 10;
  if (extraShots > 0) currentPrice += extraShots * 15;
  if (toppings.includes('toppingJelly')) currentPrice += 12;
  if (toppings.includes('toppingPearls')) currentPrice += 12;
  if (toppings.includes('toppingWhip')) currentPrice += 10;
  if (toppings.includes('toppingHoney')) currentPrice += 8;

  const toggleTopping = (topKey: string) => {
    setToppings((prev) =>
      prev.includes(topKey) ? prev.filter((t) => t !== topKey) : [...prev, topKey]
    );
  };

  const handleConfirm = () => {
    const cust: CustomizationOptions = {
      temperature,
      size,
      sweetness,
      milk,
      extraShots,
      toppings: toppings.map((key) => t(key)),
      specialInstructions: specialInstructions.trim() || undefined,
    };
    addToCart(customizingItem, cust, 1);
    setCustomizingItem(null);
  };

  const isDrink = customizingItem.category !== 'bakery';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="relative bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-[#E6E0D5] my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="p-5 border-b border-[#EAE5DB] flex items-center justify-between bg-[#FDFBF7]">
          <div>
            <span className="text-xs uppercase tracking-wider text-[#1B5E45] font-semibold">
              {t('customizeTitle')}
            </span>
            <h3 className="text-lg font-bold font-display text-[#0B3B2B] mt-0.5">
              {customizingItem.name[language] || customizingItem.name.en}
            </h3>
          </div>
          <button
            onClick={() => setCustomizingItem(null)}
            className="p-1.5 text-[#5B6D64] hover:text-[#0B3B2B] hover:bg-[#EAE5DB] rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Temperature / Style */}
          {isDrink && (
            <div>
              <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-2.5">
                {t('temperatureLabel')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['iced', 'hot', 'frappe'] as const).map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setTemperature(style)}
                    className={`py-2.5 px-3 text-xs font-medium rounded-xl border text-center transition-all ${
                      temperature === style
                        ? 'border-[#0B3B2B] bg-[#0B3B2B] text-white shadow-sm'
                        : 'border-[#D9D3C7] bg-[#FAF8F5] text-[#2C3B34] hover:border-[#1B5E45]'
                    }`}
                  >
                    {t(style)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size */}
          {isDrink && (
            <div>
              <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-2.5">
                {t('sizeLabel')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSize('16oz')}
                  className={`py-2.5 px-4 text-xs font-medium rounded-xl border text-center transition-all ${
                    size === '16oz'
                      ? 'border-[#0B3B2B] bg-[#0B3B2B] text-white shadow-sm'
                      : 'border-[#D9D3C7] bg-[#FAF8F5] text-[#2C3B34] hover:border-[#1B5E45]'
                  }`}
                >
                  Regular (16 oz)
                </button>
                <button
                  type="button"
                  onClick={() => setSize('22oz')}
                  className={`py-2.5 px-4 text-xs font-medium rounded-xl border text-center transition-all ${
                    size === '22oz'
                      ? 'border-[#0B3B2B] bg-[#0B3B2B] text-white shadow-sm'
                      : 'border-[#D9D3C7] bg-[#FAF8F5] text-[#2C3B34] hover:border-[#1B5E45]'
                  }`}
                >
                  Grande (22 oz) (+฿10)
                </button>
              </div>
            </div>
          )}

          {/* Sweetness */}
          {isDrink && (
            <div>
              <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-2.5">
                {t('sweetnessLabel')}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {([0, 25, 50, 100] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setSweetness(level)}
                    className={`py-2 px-2 text-xs font-medium rounded-xl border text-center transition-all ${
                      sweetness === level
                        ? 'border-[#0B3B2B] bg-[#0B3B2B] text-white shadow-sm'
                        : 'border-[#D9D3C7] bg-[#FAF8F5] text-[#2C3B34] hover:border-[#1B5E45]'
                    }`}
                  >
                    {level === 0 && '0%'}
                    {level === 25 && '25%'}
                    {level === 50 && '50% (Standard)'}
                    {level === 100 && '100%'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Milk Choice */}
          {isDrink && (
            <div>
              <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-2.5">
                {t('milkLabel')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'regular', labelKey: 'milkRegular' },
                  { key: 'oat', labelKey: 'milkOat' },
                  { key: 'almond', labelKey: 'milkAlmond' },
                  { key: 'soy', labelKey: 'milkSoy' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setMilk(item.key as any)}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border text-left transition-all flex items-center justify-between ${
                      milk === item.key
                        ? 'border-[#0B3B2B] bg-[#EBF3EF] text-[#0B3B2B] font-semibold'
                        : 'border-[#D9D3C7] bg-[#FAF8F5] text-[#2C3B34] hover:border-[#1B5E45]'
                    }`}
                  >
                    <span className="truncate">{t(item.labelKey)}</span>
                    {milk === item.key && <Check className="w-3.5 h-3.5 text-[#1B5E45] shrink-0" />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Extra Espresso Shots */}
          {customizingItem.category === 'coffee' && (
            <div>
              <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-2.5">
                {t('extraShotsLabel')}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[0, 1, 2].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setExtraShots(num)}
                    className={`py-2 px-3 text-xs font-medium rounded-xl border text-center transition-all ${
                      extraShots === num
                        ? 'border-[#0B3B2B] bg-[#0B3B2B] text-white shadow-sm'
                        : 'border-[#D9D3C7] bg-[#FAF8F5] text-[#2C3B34] hover:border-[#1B5E45]'
                    }`}
                  >
                    {num === 0 ? t('shotsNormal') : `+${num} Shot (+฿${num * 15})`}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Gourmet Toppings */}
          {isDrink && (
            <div>
              <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-2.5">
                {t('toppingsLabel')}
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { key: 'toppingJelly' },
                  { key: 'toppingPearls' },
                  { key: 'toppingWhip' },
                  { key: 'toppingHoney' },
                ].map((top) => {
                  const isSelected = toppings.includes(top.key);
                  return (
                    <button
                      key={top.key}
                      type="button"
                      onClick={() => toggleTopping(top.key)}
                      className={`py-2 px-3 text-xs font-medium rounded-xl border text-left transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#0B3B2B] bg-[#EBF3EF] text-[#0B3B2B] font-semibold'
                          : 'border-[#D9D3C7] bg-[#FAF8F5] text-[#2C3B34] hover:border-[#1B5E45]'
                      }`}
                    >
                      <span className="truncate">{t(top.key)}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-[#1B5E45] shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Barista Notes */}
          <div>
            <label className="block text-xs font-semibold text-[#1A2621] uppercase tracking-wide mb-2">
              {t('specialNotes')}
            </label>
            <textarea
              rows={2}
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              placeholder={t('specialNotesPlaceholder')}
              className="w-full text-xs p-3 border border-[#D9D3C7] rounded-xl bg-[#FAF8F5] focus:outline-none focus:ring-2 focus:ring-[#1B5E45] focus:border-transparent text-[#1A2621]"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-5 border-t border-[#EAE5DB] bg-[#FDFBF7] flex items-center justify-between">
          <div className="text-left">
            <span className="text-[11px] text-[#5B6D64] uppercase block">{t('estimatedTotal')}</span>
            <span className="text-xl font-bold font-display text-[#0B3B2B] tabular-nums">
              ฿{currentPrice}
            </span>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={() => setCustomizingItem(null)}
              className="px-4 py-2.5 text-xs font-medium text-[#4D5E55] hover:bg-[#EAE5DB] rounded-xl transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="button"
              onClick={handleConfirm}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0B3B2B] hover:bg-[#1B5E45] active:scale-[0.98] rounded-xl shadow-md transition-all"
            >
              {t('confirmAddToCart')}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
