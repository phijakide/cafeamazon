import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, Plus, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { menuItems } from '../data/menuData';
import { MenuCategory, MenuItem } from '../types';

export const SignatureMenu: React.FC = () => {
  const { t, language, setCustomizingItem, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<MenuCategory>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: { id: MenuCategory; labelKey: string }[] = [
    { id: 'all', labelKey: 'catAll' },
    { id: 'coffee', labelKey: 'catCoffee' },
    { id: 'tea', labelKey: 'catTea' },
    { id: 'frappe', labelKey: 'catFrappe' },
    { id: 'bakery', labelKey: 'catBakery' },
    { id: 'refresher', labelKey: 'catRefresher' },
  ];

  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      const matchesCategory =
        selectedCategory === 'all' || item.category === selectedCategory;

      const localizedName = (item.name[language] || item.name.en).toLowerCase();
      const localizedDesc = (item.description[language] || item.description.en).toLowerCase();
      const query = searchQuery.trim().toLowerCase();

      const matchesSearch =
        query === '' || localizedName.includes(query) || localizedDesc.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery, language]);

  const handleItemClick = (item: MenuItem) => {
    if (item.allowsCustomization) {
      setCustomizingItem(item);
    } else {
      addToCart(item);
    }
  };

  return (
    <section id="menu" className="py-16 md:py-24 bg-[#FDFBF7] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="text-xs font-semibold text-[#1B5E45] tracking-wider uppercase">
            Crafted for Botanical Refreshment
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B3B2B] tracking-tight">
            {t('menuTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#4E6057] leading-relaxed">
            {t('menuSubtitle')}
          </p>
        </div>

        {/* Filter Controls & Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          
          {/* Segmented Filter Buttons (Clean, Zero-Pill discipline) */}
          <div className="flex items-center space-x-1.5 p-1.5 bg-[#EFECE5] rounded-xl overflow-x-auto no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-white text-[#0B3B2B] shadow-sm'
                    : 'text-[#506359] hover:text-[#0B3B2B] hover:bg-white/50'
                }`}
              >
                {t(cat.labelKey)}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[260px] md:w-72">
            <Search className="w-4 h-4 text-[#7B8D84] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchPlaceholder')}
              className="w-full text-xs pl-10 pr-4 py-2.5 bg-white border border-[#DDD7CC] rounded-xl text-[#1A2621] focus:outline-none focus:ring-2 focus:ring-[#1B5E45] focus:border-transparent placeholder:text-[#8D9E96] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8D9E96] hover:text-[#1A2621]"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Menu Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-16 bg-white border border-[#E6E0D5] rounded-2xl max-w-md mx-auto p-8">
            <SlidersHorizontal className="w-8 h-8 text-[#A4B5AC] mx-auto mb-3" />
            <p className="text-sm font-medium text-[#2C3B34]">{t('emptyMenuSearch')}</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="mt-4 px-4 py-2 text-xs font-semibold text-[#0B3B2B] bg-[#EBF3EF] hover:bg-[#DDEEE6] rounded-lg transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => {
              const name = item.name[language] || item.name.en;
              const desc = item.description[language] || item.description.en;

              return (
                <div
                  key={item.id}
                  className="group bg-white rounded-2xl border border-[#E6E0D5] overflow-hidden flex flex-col hover:shadow-lg transition-all duration-200"
                >
                  {/* Lead with imagery (65-75% visual weight) with zero-broken-image fallback */}
                  <div className="relative aspect-[4/3] bg-[#EFECE5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                      onError={(e) => {
                        // Fallback container
                        e.currentTarget.style.display = 'none';
                      }}
                    />

                    {/* Subtle, unboxed editorial badge indicator */}
                    {(item.isPopular || item.isNew) && (
                      <div className="absolute top-3 left-3 bg-[#0B3B2B]/90 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-md flex items-center space-x-1 shadow-sm">
                        <Sparkles className="w-3 h-3 text-[#E8C581]" />
                        <span>{item.isPopular ? t('popularBadge') : 'New Seasonal'}</span>
                      </div>
                    )}
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1.5">
                      {/* Clean unboxed metadata with typographic dot separator */}
                      <div className="flex items-center space-x-2 text-xs text-[#63756C]">
                        <span className="uppercase tracking-wider font-semibold text-[#1B5E45]">
                          {item.category.toUpperCase()}
                        </span>
                        {item.calories && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="tabular-nums">{item.calories} kcal</span>
                          </>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="font-display text-lg font-bold text-[#0B3B2B] group-hover:text-[#1B5E45] transition-colors line-clamp-1">
                        {name}
                      </h3>

                      {/* Description */}
                      <p className="text-xs text-[#4F6158] leading-relaxed line-clamp-2">
                        {desc}
                      </p>
                    </div>

                    {/* Bottom Action Row */}
                    <div className="pt-3 border-t border-[#F0EBE1] flex items-center justify-between">
                      <div>
                        <span className="text-xs text-[#718279] block">Price</span>
                        <span className="text-lg font-bold font-display text-[#0B3B2B] tabular-nums">
                          ฿{item.price}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {item.allowsCustomization ? (
                          <button
                            onClick={() => setCustomizingItem(item)}
                            className="px-3.5 py-2 text-xs font-semibold text-[#0B3B2B] bg-[#EBF3EF] hover:bg-[#0B3B2B] hover:text-white rounded-xl transition-all duration-150 flex items-center space-x-1.5"
                          >
                            <SlidersHorizontal className="w-3.5 h-3.5" />
                            <span>{t('customizeAndAdd')}</span>
                          </button>
                        ) : (
                          <button
                            onClick={() => addToCart(item)}
                            className="px-3.5 py-2 text-xs font-semibold text-white bg-[#0B3B2B] hover:bg-[#1B5E45] active:scale-[0.98] rounded-xl transition-all duration-150 flex items-center space-x-1.5 shadow-sm"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>{t('addToCart')}</span>
                          </button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
