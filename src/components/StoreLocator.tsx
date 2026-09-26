import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  Navigation,
  Search,
  Coffee,
  Car,
  Wifi,
  Trees,
  BatteryCharging,
  Compass,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { storeLocations } from '../data/storesData';
import { StoreLocation } from '../types';

export const StoreLocator: React.FC = () => {
  const { t, language, selectedStoreId, setSelectedStoreId } = useApp();
  const [filterFeature, setFilterFeature] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [userLocationSimulated, setUserLocationSimulated] = useState(false);

  // Filtered stores
  const filteredStores = useMemo(() => {
    return storeLocations.filter((store) => {
      // Feature filter
      if (filterFeature !== 'all' && !store.features.includes(filterFeature as any)) {
        return false;
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const name = (store.name[language] || store.name.en).toLowerCase();
        const addr = (store.address[language] || store.address.en).toLowerCase();
        const city = store.city.toLowerCase();
        const district = store.district.toLowerCase();
        return (
          name.includes(query) ||
          addr.includes(query) ||
          city.includes(query) ||
          district.includes(query)
        );
      }
      return true;
    });
  }, [filterFeature, searchQuery, language]);

  const activeStore = useMemo(() => {
    return (
      storeLocations.find((s) => s.id === selectedStoreId) ||
      filteredStores[0] ||
      storeLocations[0]
    );
  }, [selectedStoreId, filteredStores]);

  const handleLocateNearest = () => {
    setUserLocationSimulated(true);
    setSelectedStoreId('store-siam-glasshouse');
  };

  const getFeatureIcon = (feature: string) => {
    switch (feature) {
      case 'drivethru':
        return (
          <span title="Drive-Thru">
            <Car className="w-3.5 h-3.5 text-[#1B5E45]" />
          </span>
        );
      case '24hours':
        return (
          <span title="24 Hours">
            <Clock className="w-3.5 h-3.5 text-[#C89547]" />
          </span>
        );
      case 'garden':
        return (
          <span title="Garden Terrace">
            <Trees className="w-3.5 h-3.5 text-[#1B5E45]" />
          </span>
        );
      case 'wifi':
      case 'coworking':
        return (
          <span title="Free Wi-Fi">
            <Wifi className="w-3.5 h-3.5 text-[#0B3B2B]" />
          </span>
        );
      case 'ev':
        return (
          <span title="EV Charging">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <section id="locations" className="py-16 md:py-24 bg-[#FAF7F0] border-b border-[#E6E0D5] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-[#1B5E45] uppercase tracking-wider block">
              Store Directory & Navigation
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-[#0B3B2B] tracking-tight">
              {t('locationsTitle')}
            </h2>
            <p className="text-sm text-[#4E6057] max-w-xl">
              {t('locationsSubtitle')}
            </p>
          </div>

          <button
            onClick={handleLocateNearest}
            className="self-start md:self-auto inline-flex items-center space-x-2 px-4 py-2.5 text-xs font-semibold text-[#0B3B2B] bg-white hover:bg-[#EBF3EF] border border-[#DDD7CC] rounded-xl shadow-xs transition-colors"
          >
            <Compass className="w-4 h-4 text-[#1B5E45]" />
            <span>{t('findNearest')}</span>
          </button>
        </div>

        {/* Filters & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-8">
          {/* Segmented Filter Buttons */}
          <div className="flex items-center space-x-1.5 p-1 bg-[#EBE7DE] rounded-xl overflow-x-auto no-scrollbar">
            {[
              { id: 'all', labelKey: 'filterAll' },
              { id: 'drivethru', labelKey: 'filterDriveThru' },
              { id: '24hours', labelKey: 'filter24h' },
              { id: 'garden', labelKey: 'filterGarden' },
              { id: 'coworking', labelKey: 'filterCoworking' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterFeature(f.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                  filterFeature === f.id
                    ? 'bg-white text-[#0B3B2B] shadow-xs'
                    : 'text-[#506359] hover:text-[#0B3B2B]'
                }`}
              >
                {t(f.labelKey)}
              </button>
            ))}
          </div>

          {/* Search box */}
          <div className="relative min-w-[240px] md:w-64">
            <Search className="w-3.5 h-3.5 text-[#7B8D84] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('searchStorePlaceholder')}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-[#DDD7CC] rounded-xl text-[#1A2621] focus:outline-none focus:ring-2 focus:ring-[#1B5E45]"
            />
          </div>
        </div>

        {/* Map & Store List Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Map */}
          <div className="lg:col-span-7 bg-[#EAE5D9] rounded-2xl border border-[#D9D3C7] overflow-hidden shadow-sm relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]">
            {/* Custom stylized vector map surface */}
            <div className="absolute inset-0 bg-[#E8E2D4] flex items-center justify-center overflow-hidden select-none">
              
              {/* Stylized background terrain contours / roads */}
              <svg
                viewBox="0 0 800 600"
                className="w-full h-full opacity-60 pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* River curve */}
                <path
                  d="M100,-20 Q350,150 420,300 T480,620"
                  fill="none"
                  stroke="#C3D6CB"
                  strokeWidth="28"
                  strokeLinecap="round"
                />
                {/* Secondary water canals */}
                <path
                  d="M420,300 Q650,280 820,320"
                  fill="none"
                  stroke="#C3D6CB"
                  strokeWidth="12"
                />
                <path
                  d="M200,50 Q430,220 300,550"
                  fill="none"
                  stroke="#C3D6CB"
                  strokeWidth="8"
                />
                {/* Expressway grid lines */}
                <path
                  d="M-50,220 L850,260"
                  fill="none"
                  stroke="#DDD6C7"
                  strokeWidth="8"
                  strokeDasharray="12,6"
                />
                <path
                  d="M380,-50 L460,650"
                  fill="none"
                  stroke="#DDD6C7"
                  strokeWidth="8"
                  strokeDasharray="12,6"
                />
                <circle cx="480" cy="300" r="140" fill="#E2DDD0" opacity="0.4" />
                <circle cx="200" cy="120" r="80" fill="#DDE4DC" opacity="0.5" />
              </svg>

              {/* Thailand Metropolitan Region Labels */}
              <div className="absolute top-4 left-4 text-[10px] font-mono uppercase tracking-wider text-[#687C71] bg-white/70 backdrop-blur-xs px-2 py-1 rounded">
                Interactive Sanctuary Radar · Asia Network
              </div>

              {/* Interactive Store Location Pins on the Map */}
              {storeLocations.map((store) => {
                const isSelected = store.id === activeStore.id;
                return (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStoreId(store.id)}
                    style={{ left: `${store.coordinates.mapX}%`, top: `${store.coordinates.mapY}%` }}
                    className={`absolute -translate-x-1/2 -translate-y-full group cursor-pointer transition-all duration-200 z-10 ${
                      isSelected ? 'z-30 scale-110' : 'hover:scale-105'
                    }`}
                  >
                    <div className="relative flex flex-col items-center">
                      {/* Store name popover on hover or active */}
                      <div
                        className={`mb-1 px-2.5 py-1 rounded-md text-[10px] font-semibold whitespace-nowrap shadow-md pointer-events-none transition-all ${
                          isSelected
                            ? 'bg-[#0B3B2B] text-white'
                            : 'bg-white text-[#2C3B34] border border-[#DDD7CC] group-hover:block'
                        }`}
                      >
                        {store.name[language] || store.name.en}
                      </div>

                      {/* Pin marker icon */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                          isSelected
                            ? 'bg-[#0B3B2B] text-white ring-4 ring-emerald-300'
                            : 'bg-white text-[#1B5E45] border-2 border-[#1B5E45] hover:bg-[#1B5E45] hover:text-white'
                        }`}
                      >
                        <Coffee className="w-4 h-4" />
                      </div>

                      {/* Pin pointer tip */}
                      <div
                        className={`w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[6px] -mt-0.5 ${
                          isSelected ? 'border-t-[#0B3B2B]' : 'border-t-[#1B5E45]'
                        }`}
                      />
                    </div>
                  </button>
                );
              })}

              {/* User simulated location pin */}
              {userLocationSimulated && (
                <div
                  style={{ left: '46%', top: '56%' }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20 flex flex-col items-center animate-bounce"
                >
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full border-2 border-white ring-4 ring-blue-300 shadow-md" />
                  <span className="text-[9px] font-bold text-blue-900 bg-white/90 px-1 rounded mt-0.5 shadow-xs">
                    You Are Here
                  </span>
                </div>
              )}

            </div>

            {/* Quick Map Controls Overlay */}
            <div className="absolute bottom-4 right-4 flex flex-col space-y-2 z-20">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                  `Cafe Amazon ${activeStore.address.en}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold text-white bg-[#0B3B2B] hover:bg-[#1B5E45] rounded-xl shadow-md transition-colors"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{t('getDirections')}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Store Cards List */}
          <div className="lg:col-span-5 space-y-3.5 max-h-[580px] overflow-y-auto pr-1">
            {filteredStores.length === 0 ? (
              <div className="p-8 bg-white border border-[#E6E0D5] rounded-2xl text-center text-xs text-[#52645C]">
                No branches match the selected filters.
              </div>
            ) : (
              filteredStores.map((store) => {
                const isSelected = store.id === activeStore.id;
                const name = store.name[language] || store.name.en;
                const address = store.address[language] || store.address.en;

                return (
                  <div
                    key={store.id}
                    onClick={() => setSelectedStoreId(store.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all duration-150 ${
                      isSelected
                        ? 'bg-white border-[#0B3B2B] shadow-md ring-1 ring-[#0B3B2B]'
                        : 'bg-white/80 border-[#E4DEC9] hover:bg-white hover:border-[#1B5E45]'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 pr-2">
                        <div className="flex items-center space-x-2 text-[11px] text-[#1B5E45] font-semibold">
                          <span>{store.city}</span>
                          <span aria-hidden="true">·</span>
                          <span className="text-[#64766E]">{store.district}</span>
                        </div>
                        <h4 className="text-sm font-bold text-[#0B3B2B] font-display">{name}</h4>
                        <p className="text-xs text-[#52645C] leading-relaxed">{address}</p>
                      </div>

                      <div className="flex items-center space-x-1 shrink-0 p-1 bg-[#F5F2EB] rounded-lg">
                        {store.features.map((f) => (
                          <span key={f} className="p-1">
                            {getFeatureIcon(f)}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-[#F2ECE2] flex items-center justify-between text-xs text-[#52645C]">
                      <div className="flex items-center space-x-1.5">
                        <Clock className="w-3.5 h-3.5 text-[#1B5E45]" />
                        <span className="tabular-nums font-medium text-[#1A2621]">{store.hours}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Phone className="w-3.5 h-3.5 text-[#72837B]" />
                        <span className="tabular-nums">{store.phone}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
