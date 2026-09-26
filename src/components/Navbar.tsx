import React, { useState } from 'react';
import { ShoppingBag, Globe, Menu as MenuIcon, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Language } from '../types';

export const Navbar: React.FC = () => {
  const { language, setLanguage, t, cartTotalCount, setIsCartOpen } = useApp();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const languages: { code: Language; label: string; flag: string }[] = [
    { code: 'en', label: 'English', flag: 'EN' },
    { code: 'th', label: 'ไทย (Thai)', flag: 'TH' },
    { code: 'ja', label: '日本語 (JA)', flag: 'JA' },
    { code: 'zh', label: '中文 (ZH)', flag: 'ZH' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FDFBF7]/95 backdrop-blur-md border-b border-[#E6E0D5] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark in display face */}
        <a
          href="#"
          className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[#0B3B2B] hover:text-[#1B5E45] transition-colors shrink-0"
        >
          Café Amazan
        </a>

        {/* Zone 2: 4-5 clean text nav links with subtle hover underlines */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-[#2C3B34]">
          <button
            onClick={() => handleNavClick('#menu')}
            className="hover:text-[#0B3B2B] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#1B5E45] decoration-2"
          >
            {t('navMenu')}
          </button>
          <button
            onClick={() => handleNavClick('#locations')}
            className="hover:text-[#0B3B2B] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#1B5E45] decoration-2"
          >
            {t('navLocations')}
          </button>
          <button
            onClick={() => handleNavClick('#ambiance')}
            className="hover:text-[#0B3B2B] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#1B5E45] decoration-2"
          >
            {t('navAmbiance')}
          </button>
          <button
            onClick={() => handleNavClick('#loyalty')}
            className="hover:text-[#0B3B2B] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#1B5E45] decoration-2"
          >
            {t('navLoyalty')}
          </button>
          <button
            onClick={() => handleNavClick('#contact')}
            className="hover:text-[#0B3B2B] transition-colors relative py-1 hover:underline underline-offset-8 decoration-[#1B5E45] decoration-2"
          >
            {t('navContact')}
          </button>
        </nav>

        {/* Zone 3: Primary actions (Language Switcher, Cart Drawer trigger, Order Online button) */}
        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center space-x-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#2C3B34] bg-[#F1EDE4] hover:bg-[#E8E2D7] rounded-lg transition-colors"
              aria-label="Change language"
              aria-expanded={isLangOpen}
            >
              <Globe className="w-3.5 h-3.5 text-[#1B5E45]" />
              <span className="uppercase">{language}</span>
            </button>

            {isLangOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsLangOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-36 bg-white border border-[#E6E0D5] rounded-xl shadow-lg py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
                  {languages.map((item) => (
                    <button
                      key={item.code}
                      onClick={() => {
                        setLanguage(item.code);
                        setIsLangOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs font-medium flex items-center justify-between transition-colors ${
                        language === item.code
                          ? 'bg-[#EBF3EF] text-[#0B3B2B] font-semibold'
                          : 'text-[#4A5952] hover:bg-[#F9F7F2]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span className="text-[10px] text-[#7A8A82] font-mono">{item.flag}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-[#0B3B2B] hover:bg-[#F1EDE4] rounded-lg transition-colors"
            aria-label="Open Shopping Cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartTotalCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#1B5E45] text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center tabular-nums shadow-sm animate-in zoom-in">
                {cartTotalCount}
              </span>
            )}
          </button>

          {/* Order Online Quick CTA */}
          <button
            onClick={() => handleNavClick('#menu')}
            className="hidden sm:inline-flex items-center px-4 py-2 text-xs font-semibold text-white bg-[#0B3B2B] hover:bg-[#1B5E45] active:scale-[0.98] rounded-lg transition-all shadow-sm whitespace-nowrap"
          >
            {t('orderOnlineBtn')}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-[#0B3B2B] hover:bg-[#F1EDE4] rounded-lg transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#FDFBF7] border-b border-[#E6E0D5] px-4 pt-3 pb-6 space-y-3 shadow-lg">
          <button
            onClick={() => handleNavClick('#menu')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#1A2621] hover:bg-[#F1EDE4] rounded-lg"
          >
            {t('navMenu')}
          </button>
          <button
            onClick={() => handleNavClick('#locations')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#1A2621] hover:bg-[#F1EDE4] rounded-lg"
          >
            {t('navLocations')}
          </button>
          <button
            onClick={() => handleNavClick('#ambiance')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#1A2621] hover:bg-[#F1EDE4] rounded-lg"
          >
            {t('navAmbiance')}
          </button>
          <button
            onClick={() => handleNavClick('#loyalty')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#1A2621] hover:bg-[#F1EDE4] rounded-lg"
          >
            {t('navLoyalty')}
          </button>
          <button
            onClick={() => handleNavClick('#contact')}
            className="block w-full text-left py-2 px-3 text-sm font-medium text-[#1A2621] hover:bg-[#F1EDE4] rounded-lg"
          >
            {t('navContact')}
          </button>
          <div className="pt-2 border-t border-[#E6E0D5]">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsCartOpen(true);
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 px-4 text-xs font-semibold text-white bg-[#0B3B2B] rounded-lg"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>
                {t('cart')} ({cartTotalCount})
              </span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
