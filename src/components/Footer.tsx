import React from 'react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { t } = useApp();

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0B3B2B] text-white pt-16 pb-12 border-t border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-emerald-900/60">
          
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <span className="font-display text-2xl font-bold tracking-tight text-white block">
              Café Amazan
            </span>
            <p className="text-xs sm:text-sm text-emerald-100/75 leading-relaxed max-w-sm">
              {t('footerDesc')}
            </p>
            <div className="text-xs text-emerald-300 font-medium">
              Sustainably Sourced · Highland Arabica · Botanical Haven
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block">
              {t('quickLinks')}
            </span>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <button
                  onClick={() => handleNavClick('#menu')}
                  className="hover:text-white transition-colors"
                >
                  {t('navMenu')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#locations')}
                  className="hover:text-white transition-colors"
                >
                  {t('navLocations')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#ambiance')}
                  className="hover:text-white transition-colors"
                >
                  {t('navAmbiance')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#loyalty')}
                  className="hover:text-white transition-colors"
                >
                  {t('navLoyalty')}
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('#contact')}
                  className="hover:text-white transition-colors"
                >
                  {t('navContact')}
                </button>
              </li>
            </ul>
          </div>

          {/* Service Hours & Care */}
          <div className="md:col-span-4 space-y-3">
            <span className="text-xs font-semibold text-emerald-200 uppercase tracking-wider block">
              Operating Hours & Care
            </span>
            <p className="text-xs text-emerald-100/75 leading-relaxed">
              {t('hoursInfo')}
            </p>
            <div className="pt-2 text-xs text-emerald-200 space-y-1">
              <p><span className="text-emerald-400 font-semibold">Toll-Free Hotline:</span> 1365 (24/7)</p>
              <p><span className="text-emerald-400 font-semibold">LINE Official:</span> @cafeamazan</p>
              <p><span className="text-emerald-400 font-semibold">Inquiries:</span> hello@cafeamazan.com</p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-4">
          <p>{t('copyright')}</p>
          <div className="flex items-center space-x-6">
            <span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition-colors">Terms of Service</span>
            <span className="hover:text-white cursor-pointer transition-colors">Rainforest Sustainability</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
