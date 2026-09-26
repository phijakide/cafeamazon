import React from 'react';
import { ArrowRight, Compass, Sparkles, Coffee, Trees, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Hero: React.FC = () => {
  const { t } = useApp();

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden bg-[#FDFBF7] pt-8 pb-16 md:pt-12 md:pb-24 border-b border-[#E6E0D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            {/* Clean unboxed text kicker with dot separator (Zero-pill discipline) */}
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#1B5E45] tracking-wide uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{t('heroBadge')}</span>
              <span aria-hidden="true" className="text-[#A4B5AC]">·</span>
              <span className="text-[#52645C]">Highland Roasted</span>
            </div>

            {/* Display Headline with balanced wrapping */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#0B3B2B] leading-[1.12] [text-wrap:balance]">
              {t('heroTitle')}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#41534A] leading-relaxed max-w-xl">
              {t('heroSubtitle')}
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button
                onClick={() => scrollTo('#menu')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#0B3B2B] hover:bg-[#1B5E45] active:scale-[0.98] rounded-xl shadow-md transition-all duration-150 group"
              >
                <span>{t('exploreMenu')}</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => scrollTo('#locations')}
                className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-[#0B3B2B] bg-[#F1EDE4] hover:bg-[#E6DFD3] active:scale-[0.98] rounded-xl transition-all duration-150"
              >
                <Compass className="w-4 h-4 mr-2 text-[#1B5E45]" />
                <span>{t('findStore')}</span>
              </button>
            </div>

            {/* Subtle editorial trust metrics (No pill badges) */}
            <div className="pt-6 border-t border-[#E6E0D5] grid grid-cols-3 gap-4 text-left">
              <div>
                <div className="text-2xl font-bold font-display text-[#0B3B2B] tabular-nums">4,200+</div>
                <div className="text-xs text-[#52645C] mt-0.5">Sanctuaries across Asia</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-[#0B3B2B] tabular-nums">100%</div>
                <div className="text-xs text-[#52645C] mt-0.5">Northern Thai Arabica</div>
              </div>
              <div>
                <div className="text-2xl font-bold font-display text-[#0B3B2B] tabular-nums">&lt;10m</div>
                <div className="text-xs text-[#52645C] mt-0.5">Express Pickup Order</div>
              </div>
            </div>
          </div>

          {/* Right Showcase Media Column */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[16/10] sm:aspect-[16/9] lg:aspect-[4/3] bg-[#E8E2D7] group">
              <img
                src="/src/assets/images/hero_cafe_ambiance_1790408821013.jpg"
                alt="Café Amazan Lush Glasshouse Botanical Sanctuary"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                onError={(e) => {
                  // Fallback container
                  e.currentTarget.style.display = 'none';
                }}
              />

              {/* Scrim Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />

              {/* In-Frame Context Overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
                <div className="text-xs font-medium text-emerald-300 uppercase tracking-wider mb-1">
                  Bangkok Flagship Sanctuary
                </div>
                <div className="text-lg sm:text-xl font-display font-semibold text-white drop-shadow-sm">
                  The Botanical Glasshouse Pavilion
                </div>
                <div className="text-xs text-white/80 mt-1 flex items-center space-x-2">
                  <span>Open Daily 06:30 – 22:00</span>
                  <span>·</span>
                  <span>Free High-Speed Wi-Fi</span>
                  <span>·</span>
                  <span>Garden Waterfall</span>
                </div>
              </div>
            </div>

            {/* Decorative organic accent leaf / circle */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#E3EFE9] rounded-full filter blur-2xl -z-10 pointer-events-none" />
          </div>

        </div>

        {/* 3 Value Pillars */}
        <div className="mt-16 pt-12 border-t border-[#E6E0D5] grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#EBF3EF] flex items-center justify-center shrink-0 text-[#1B5E45]">
              <Coffee className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#0B3B2B]">{t('freshRoastedArabica')}</h2>
              <p className="text-xs sm:text-sm text-[#4E6057] mt-1 leading-relaxed">
                {t('freshRoastedDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#EBF3EF] flex items-center justify-center shrink-0 text-[#1B5E45]">
              <Trees className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#0B3B2B]">{t('botanicalAmbiance')}</h2>
              <p className="text-xs sm:text-sm text-[#4E6057] mt-1 leading-relaxed">
                {t('botanicalDesc')}
              </p>
            </div>
          </div>

          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 rounded-xl bg-[#EBF3EF] flex items-center justify-center shrink-0 text-[#1B5E45]">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-semibold text-[#0B3B2B]">{t('quickPickup')}</h2>
              <p className="text-xs sm:text-sm text-[#4E6057] mt-1 leading-relaxed">
                {t('quickPickupDesc')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
