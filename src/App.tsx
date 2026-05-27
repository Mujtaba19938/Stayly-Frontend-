/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Destinations from './Destinations';
import SpecialOffers from './SpecialOffers';
import ContactUs from './ContactUs';
import AboutUs from './AboutUs';
import PropertyDetail from './PropertyDetail';
import ExperienceDetail from './ExperienceDetail';
import { properties } from './data';
import { Property } from './types';
import { 
  Building2, Home, MapPin, Search, Star, Building, Ticket, 
  Settings2, Palmtree, Map as MapIcon, X 
} from 'lucide-react';

export default function App() {
  const [page, setPage] = useState('accommodations');
  const [selectedCategory, setSelectedCategory] = useState<'Villa' | 'Apartment' | 'Guesthouse' | 'Hotel'>('Villa');
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Dynamic state for dynamic sub-pages
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<{ title: string, subtitle: string, image: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Dynamic style calculation for the sliding pill background
  useEffect(() => {
    const updatePill = () => {
      const container = tabsContainerRef.current;
      if (!container) return;
      
      const activeBtn = container.querySelector(`[data-tab-name="${selectedCategory}"]`) as HTMLButtonElement;
      if (activeBtn) {
        setPillStyle({
          left: activeBtn.offsetLeft,
          width: activeBtn.offsetWidth,
          opacity: 1
        });
      }
    };
    
    // Run immediately
    updatePill();
    
    // Run with a tiny timeout to ensure dynamic font rendering and ref alignments are correct
    const timeoutId = setTimeout(updatePill, 50);
    
    window.addEventListener('resize', updatePill);
    return () => {
      window.removeEventListener('resize', updatePill);
      clearTimeout(timeoutId);
    };
  }, [selectedCategory]);

  const handleCategoryClick = (category: 'Villa' | 'Apartment' | 'Guesthouse' | 'Hotel') => {
    setSelectedCategory(category);
    const element = document.getElementById('discover-stays');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setPage('property-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectExperience = (experience: { title: string, subtitle: string, image: string }) => {
    setSelectedExperience(experience);
    setPage('experience-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectDestination = (destinationName: string) => {
    // Extract main name e.g. "Bali" from "Bali, Indonesia"
    const cleanName = destinationName.split(',')[0].trim();
    setSearchQuery(cleanName);
    setPage('accommodations');
    
    // Smooth scroll to stays section
    setTimeout(() => {
      const element = document.getElementById('discover-stays');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 150);
  };

  // Filter properties dynamically based on the selected category and search query
  const filteredProperties = properties.filter(prop => {
    const matchesCategory = prop.type === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      prop.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prop.location.toLowerCase().includes(searchQuery.toLowerCase()) || 
      prop.type.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FDFDFD] dark:bg-[#090d16] font-sans text-gray-900 dark:text-slate-100 pb-24 transition-colors duration-500">
      <Header 
        page={page === 'property-detail' || page === 'experience-detail' ? 'accommodations' : page} 
        setPage={(newPage) => {
          setPage(newPage);
          setSelectedProperty(null);
          setSelectedExperience(null);
        }} 
      />
      
      {page === 'accommodations' ? (
        <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <Hero />
          
          {/* Floating Categories Bar */}
          <div className="relative -mt-12 z-10 max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-6 px-4 md:px-10 flex flex-wrap lg:flex-nowrap items-center justify-between gap-4">
            <CategoryItem 
              icon={<Home className="w-6 h-6 text-blue-500" />} 
              label="Villa" 
              onClick={() => handleCategoryClick('Villa')}
            />
            <CategoryItem 
              icon={<Building2 className="w-6 h-6 text-blue-400" />} 
              label="Hotel" 
              onClick={() => handleCategoryClick('Hotel')}
            />
            <CategoryItem 
              icon={<Building className="w-6 h-6 text-cyan-400" />} 
              label="Apartment" 
              onClick={() => handleCategoryClick('Apartment')}
            />
            <CategoryItem 
              icon={<Home className="w-6 h-6 text-indigo-400" />} 
              label="Guesthouse" 
              onClick={() => handleCategoryClick('Guesthouse')}
            />
            <CategoryItem icon={<Ticket className="w-6 h-6 text-orange-400" />} label="Voucher" />
            <CategoryItem icon={<Star className="w-6 h-6 text-red-400" />} label="BIG DEAL" />
            <CategoryItem icon={<MapIcon className="w-6 h-6 text-blue-600" />} label="To Do" />
          </div>

          {/* Section: Discover Stays */}
          <section id="discover-stays" className="mt-24 scroll-mt-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Discover the most-loved stays<br/>handpicked just for you!</h2>
                <p className="text-gray-500 mt-2">Top-Rated Getaways</p>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                {/* Filter inputs */}
                <div className="flex items-center w-full sm:w-auto bg-gray-100 rounded-full p-1.5 border border-transparent focus-within:border-gray-200">
                  <div className="flex items-center bg-transparent px-4 flex-1 sm:flex-none">
                    <Search className="w-4 h-4 text-gray-400 mr-2 shrink-0" />
                    <input 
                      type="text" 
                      placeholder="Stays to Bali" 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-transparent border-none outline-none w-32 text-sm text-gray-800 placeholder:text-gray-400" 
                    />
                  </div>
                  {searchQuery && (
                    <button 
                      onClick={() => setSearchQuery('')}
                      className="p-1 rounded-full hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors mr-1 cursor-pointer"
                      title="Clear search"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                  <button className="bg-blue-500 text-white p-2 px-4 rounded-full flex items-center text-sm font-medium hover:bg-blue-600 transition-colors shrink-0">
                    <Settings2 className="w-4 h-4 mr-2" />
                    Filter
                  </button>
                </div>
                
                {/* Category Tabs (Sleek One Pill Segmented Control with animated spring sliding pill) */}
                <div className="flex items-center w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 no-scrollbar">
                  <div 
                    ref={tabsContainerRef}
                    className="relative flex items-center bg-gray-100/70 p-1 rounded-full border border-gray-200/50 shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.04)] overflow-hidden"
                  >
                    {/* Sliding active pill background */}
                    <div 
                      className="absolute top-1 bottom-1 bg-white rounded-full shadow-[0_2px_8px_rgba(15,23,42,0.06),_0_1px_3px_rgba(15,23,42,0.02)] border border-slate-100 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0"
                      style={{
                        left: `${pillStyle.left}px`,
                        width: `${pillStyle.width}px`,
                        opacity: pillStyle.opacity,
                      }}
                    />
                    
                    {/* Tab buttons */}
                    {[
                      { name: 'Villa', icon: <Home className="w-4 h-4" />, activeColor: 'text-blue-500' },
                      { name: 'Apartment', icon: <Building className="w-4 h-4" />, activeColor: 'text-cyan-500' },
                      { name: 'Guesthouse', icon: <Home className="w-4 h-4" />, activeColor: 'text-indigo-500' },
                      { name: 'Hotel', icon: <Building2 className="w-4 h-4" />, activeColor: 'text-blue-500' },
                    ].map((category) => {
                      const isActive = selectedCategory === category.name;
                      return (
                        <button
                          key={category.name}
                          data-tab-name={category.name}
                          onClick={() => setSelectedCategory(category.name as any)}
                          className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap active:scale-[0.97] select-none ${
                            isActive 
                              ? 'text-gray-900 font-bold' 
                              : 'text-gray-500 hover:text-gray-800'
                          }`}
                        >
                          <span className={`transition-all duration-300 ${isActive ? `${category.activeColor} scale-110` : 'text-gray-400'}`}>
                            {category.icon}
                          </span>
                          <span>{category.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Promo Banners */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <PromoCard 
                title="Get 30% Off!" 
                subtitle="Enjoy a 30% discount on your next stay in Bali, Seminyak. Don't miss out—limited time offer!" 
                iconType="home"
                iconBg="bg-blue-50"
                iconColor="text-blue-500"
              />
              <PromoCard 
                title="Get 30% Off for Hotel!" 
                subtitle="Enjoy a 30% discount on your next stay in Bali, Seminyak. Don't miss out—limited time offer!" 
                iconType="hotel"
                iconBg="bg-orange-50"
                iconColor="text-orange-500"
              />
            </div>

            {/* Property Grid 1 */}
            {filteredProperties.length > 0 ? (
              <div 
                key={selectedCategory} 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-slide-in"
              >
                {filteredProperties.slice(0, 4).map((prop) => (
                  <PropertyCard key={prop.id} property={prop} onSelect={handleSelectProperty} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-slate-50 rounded-[28px] border border-dashed border-gray-200">
                <p className="text-gray-500 font-bold text-lg">No stays found matching "{searchQuery}"</p>
                <button 
                  onClick={() => setSearchQuery('')}
                  className="mt-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold text-sm px-6 py-2 rounded-full transition-all"
                >
                  Reset search
                </button>
              </div>
            )}
          </section>

          {/* Map Placeholder Section */}
          <section className="mt-16 w-full max-w-[1240px] mx-auto h-[350px] relative rounded-[32px] overflow-hidden border border-gray-100 bg-[#F1F5F9] shadow-sm">
             {/* Abstract aesthetic map representation */}
             <div className="absolute inset-0 bg-[#E2E8F0] opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23cbd5e1\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
             
             <svg className="absolute inset-0 w-full h-full text-slate-400 opacity-60" preserveAspectRatio="none" viewBox="0 0 1000 350">
               <path d="M100 100 Q 250 50, 400 200 T 800 150" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
               <path d="M300 300 Q 500 400, 700 250 T 1100 350" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
               <path d="M500 50 Q 600 200, 450 350 T 900 400" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
             </svg>
             
             {/* Map Pins (Mock) */}
             <MapPinMarker top="25%" left="30%" type="hotel" />
             <MapPinMarker top="45%" left="50%" type="active" />
             <MapPinMarker top="65%" left="22%" type="beach" />
             <MapPinMarker top="35%" left="65%" type="hotel" />
             <MapPinMarker top="60%" left="75%" type="temple" />
             <MapPinMarker top="50%" left="88%" type="hotel" />
             <MapPinMarker top="75%" left="40%" type="apartment" />
          </section>

          {/* Property Grid 2 */}
          {filteredProperties.length > 4 && (
            <section className="mt-16">
              <div 
                key={`${selectedCategory}-grid2`} 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-slide-in"
              >
                {filteredProperties.slice(4, 8).map((prop) => (
                  <PropertyCard key={prop.id} property={prop} onSelect={handleSelectProperty} />
                ))}
              </div>
            </section>
          )}

          {/* Every Traveler Section */}
          <section className="mt-24 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8">Every Traveler</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
               <ExperienceCard 
                 title="The Vibes of Bali's Best Beach Clubs"
                 subtitle="Experience the Vibes of Bali's Beach Clubs"
                 image="https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
                 onSelect={() => handleSelectExperience({
                   title: "The Vibes of Bali's Best Beach Clubs",
                   subtitle: "Experience the Vibes of Bali's Beach Clubs",
                   image: "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?auto=format&fit=crop&w=800&q=80"
                 })}
               />
               <ExperienceCard 
                 title="Ocean Adventure in Nusa Penida"
                 subtitle="Snorkeling and Exploring Caves in Nusa Penida"
                 image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
                 onSelect={() => handleSelectExperience({
                   title: "Ocean Adventure in Nusa Penida",
                   subtitle: "Snorkeling and Exploring Caves in Nusa Penida",
                   image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
                 })}
               />
            </div>
          </section>

        </main>
      ) : page === 'destinations' ? (
        <Destinations onSelectDestination={handleSelectDestination} />
      ) : page === 'special' ? (
        <SpecialOffers />
      ) : page === 'contact' ? (
        <ContactUs />
      ) : page === 'property-detail' && selectedProperty ? (
        <PropertyDetail property={selectedProperty} onBack={() => {
          setSelectedProperty(null);
          setPage('accommodations');
        }} />
      ) : page === 'experience-detail' && selectedExperience ? (
        <ExperienceDetail experience={selectedExperience} onBack={() => {
          setSelectedExperience(null);
          setPage('accommodations');
        }} />
      ) : (
        <AboutUs />
      )}
    </div>
  );
}

// Subcomponents

function CategoryItem({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick?: () => void }) {
  return (
    <div onClick={onClick} className="flex flex-col items-center gap-3 cursor-pointer group flex-1 min-w-[80px]">
      <div className="w-[60px] h-[60px] rounded-[18px] bg-white text-gray-600 flex items-center justify-center group-hover:bg-blue-50 transition-colors shadow-[0_2px_12px_rgb(0,0,0,0.04)] border border-gray-50 transition-all duration-300 active:scale-95">
        {icon}
      </div>
      <span className="text-sm font-semibold text-gray-600 group-hover:text-blue-600 transition-colors">{label}</span>
    </div>
  );
}

function TabButton({ active, icon, label }: { active?: boolean, icon: React.ReactNode, label: string }) {
  return (
    <button className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all whitespace-nowrap border ${active ? 'bg-white border-gray-200 text-gray-900 shadow-sm' : 'bg-transparent border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}>
      {icon}
      {label}
    </button>
  );
}

function PromoCard({ title, subtitle, iconType, iconBg, iconColor }: { title: string, subtitle: string, iconType: string, iconBg: string, iconColor: string }) {
  return (
    <div className="bg-[#F0FDF4] rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 border border-green-50 relative overflow-hidden shadow-sm">
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-green-200 opacity-20 rounded-full blur-3xl" />
      
      <div className={`w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center shrink-0 z-10 bg-white`}>
        {iconType === 'home' ? <Home className={`w-8 h-8 ${iconColor}`} /> : <Building2 className={`w-8 h-8 ${iconColor}`} />}
      </div>
      <div className="flex-1 z-10 text-center sm:text-left">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 max-w-sm">{subtitle}</p>
      </div>
      <button className="bg-white border border-blue-100 text-blue-500 hover:bg-blue-50 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors z-10 shrink-0 shadow-sm">
        Claim
      </button>
    </div>
  );
}

function PropertyCard({ property, onSelect }: { property: any, onSelect: (prop: any) => void }) {
  return (
    <div 
      onClick={() => onSelect(property)}
      className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl p-3 border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden mb-4 bg-gray-100">
        <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${property.badgeStyle} shadow-sm`}>
          {property.type}
        </div>
      </div>
      
      <div className="px-1 flex-1 flex flex-col">
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-orange-500">
                <Star className="w-[14px] h-[14px] fill-current" />
            </div>
            <span className="text-sm font-bold text-gray-900">{property.rating}</span>
            <span className="text-sm font-medium text-gray-500">({property.reviews} Reviews)</span>
          </div>
          
          <h3 className="text-base font-bold text-gray-900 leading-snug mb-1 line-clamp-1">{property.name}</h3>
          <p className="text-sm text-gray-500 mb-4 font-medium">{property.location}</p>
          
          <div className="flex items-end justify-between mt-auto pt-2 border-t border-gray-50">
            <div>
              <p className="text-xs text-gray-500 mb-0.5 font-medium">Start From</p>
              <p className="text-lg font-extrabold text-gray-900">${property.price}<span className="text-xs font-semibold text-gray-500 ml-1">/Night</span></p>
            </div>
            <button 
              onClick={(e) => {
                e.stopPropagation();
                onSelect(property);
              }}
              className="bg-blue-500 hover:bg-blue-600 active:scale-95 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm cursor-pointer"
            >
              Book Now
            </button>
          </div>
      </div>
    </div>
  );
}

function ExperienceCard({ title, subtitle, image, onSelect }: { title: string, subtitle: string, image: string, onSelect: () => void }) {
  return (
    <div 
      onClick={onSelect}
      className="relative h-[280px] rounded-3xl overflow-hidden group cursor-pointer shadow-md"
    >
      <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
        <h3 className="text-2xl font-bold text-white mb-2 leading-tight pr-4">{title}</h3>
        <p className="text-sm text-white/80 mb-6 font-medium pr-8">{subtitle}</p>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onSelect();
          }}
          className="self-start text-sm font-semibold text-blue-50 bg-white/20 hover:bg-white/30 backdrop-blur-md px-6 py-2.5 rounded-full transition-colors border border-white/10 shadow-sm cursor-pointer"
        >
          Explore
        </button>
      </div>
    </div>
  );
}

function MapPinMarker({ top, left, type }: { top: string, left: string, type: string }) {
  const isTarget = type === 'active';
  return (
    <div 
      className="absolute flex items-center justify-center cursor-pointer group" 
      style={{ top, left, transform: 'translate(-50%, -50%)' }}
    >
      <div className={`
        relative flex items-center justify-center rounded-full shadow-md transition-transform group-hover:scale-110
        ${isTarget ? 'bg-blue-500 w-[42px] h-[42px] z-20 shadow-blue-500/30' : 'bg-white border-2 border-[#E2E8F0] w-9 h-9 z-10'}
      `}>
         {isTarget ? (
           <MapPin className="w-5 h-5 text-white fill-white" />
         ) : type === 'hotel' ? (
           <Building2 className="w-4 h-4 text-slate-600" />
         ) : type === 'beach' ? (
           <Palmtree className="w-4 h-4 text-slate-600" />
         ) : (
           <Building className="w-4 h-4 text-slate-600" />
         )}
         
         {isTarget && (
           <>
            <div className="absolute -inset-2 rounded-full bg-blue-400 opacity-20 animate-ping" />
            <div className="absolute -inset-4 rounded-full border border-blue-200" />
            <div className="absolute -inset-8 rounded-full border border-blue-100" />
           </>
         )}
      </div>
    </div>
  )
}
