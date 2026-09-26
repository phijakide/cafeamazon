import React, { useState } from 'react';
import { Maximize2, X, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ambiancePhotos } from '../data/ambianceData';
import { AmbiancePhoto } from '../types';

export const AmbianceGallery: React.FC = () => {
  const { t, language } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<AmbiancePhoto | null>(null);

  const categories = [
    { id: 'all', labelKey: 'allAmbiance' },
    { id: 'glasshouse', labelKey: 'glasshouseCat' },
    { id: 'barista', labelKey: 'baristaCat' },
    { id: 'garden', labelKey: 'gardenCat' },
    { id: 'seating', labelKey: 'seatingCat' },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? ambiancePhotos
      : ambiancePhotos.filter((p) => p.category === activeCategory);

  return (
    <section id="ambiance" className="py-16 md:py-24 bg-[#FDFBF7] border-b border-[#E6E0D5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-10">
          <div className="text-xs font-semibold text-[#1B5E45] tracking-wider uppercase">
            Tropical Glasshouse Sanctuary
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B3B2B] tracking-tight">
            {t('galleryTitle')}
          </h2>
          <p className="text-sm sm:text-base text-[#4E6057] leading-relaxed">
            {t('gallerySubtitle')}
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center space-x-1.5 p-1 bg-[#EFECE5] rounded-xl max-w-fit mx-auto mb-10 overflow-x-auto no-scrollbar">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                activeCategory === c.id
                  ? 'bg-white text-[#0B3B2B] shadow-xs'
                  : 'text-[#506359] hover:text-[#0B3B2B]'
              }`}
            >
              {t(c.labelKey)}
            </button>
          ))}
        </div>

        {/* Masonry / Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo, idx) => {
            const title = photo.title[language] || photo.title.en;
            const desc = photo.description[language] || photo.description.en;
            const isLarge = idx === 0;

            return (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-[#EFECE5] ${
                  isLarge ? 'sm:col-span-2 aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <img
                  src={photo.image}
                  alt={title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />

                {/* Scrim Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Inset Content */}
                <div className="absolute bottom-5 left-5 right-5 text-white flex items-end justify-between">
                  <div className="space-y-1 pr-3">
                    <span className="text-[11px] font-semibold text-emerald-300 uppercase tracking-wider block">
                      {photo.highlight}
                    </span>
                    <h3 className="font-display text-lg font-bold text-white drop-shadow-xs">
                      {title}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-2 max-w-md">
                      {desc}
                    </p>
                  </div>

                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 text-white group-hover:bg-white group-hover:text-[#0B3B2B] transition-colors">
                    <Maximize2 className="w-4 h-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative max-w-3xl w-full bg-[#18231E] rounded-2xl overflow-hidden border border-white/10 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 text-white/80 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-[16/10] bg-black overflow-hidden">
              <img
                src={selectedPhoto.image}
                alt={selectedPhoto.title[language] || selectedPhoto.title.en}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="p-6 space-y-2 text-white bg-[#18231E]">
              <div className="flex items-center space-x-2 text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{selectedPhoto.highlight}</span>
              </div>
              <h3 className="font-display text-2xl font-bold text-white">
                {selectedPhoto.title[language] || selectedPhoto.title.en}
              </h3>
              <p className="text-sm text-neutral-300 leading-relaxed">
                {selectedPhoto.description[language] || selectedPhoto.description.en}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
