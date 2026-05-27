import React from 'react';
import { Search, MapPin, Compass, Navigation } from 'lucide-react';

interface DestinationsProps {
  onSelectDestination: (name: string) => void;
}

export default function Destinations({ onSelectDestination }: DestinationsProps) {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative w-full h-[500px] lg:h-[600px] rounded-3xl overflow-hidden mt-6 shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&q=80&w=2000" 
          alt="Tropical beach at sunset" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white max-w-2xl leading-tight">
            Explore world-class <br/> destinations
          </h1>
          <p className="text-white/90 mt-4 text-base md:text-lg max-w-xl font-medium">
            Find the perfect spot for your next unforgettable adventure
          </p>

          <div className="mt-8 bg-white p-2 rounded-full flex items-center w-full max-w-2xl shadow-lg">
            <div className="flex items-center flex-1 px-4">
              <Search className="w-5 h-5 text-gray-400 mr-3" />
              <input 
                type="text" 
                placeholder="Where to next? (e.g. Bali)" 
                id="destination-search-input"
                className="w-full bg-transparent border-none outline-none text-gray-800 text-base py-3 placeholder:text-gray-400"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    onSelectDestination((e.target as HTMLInputElement).value);
                  }
                }}
              />
            </div>
            <button 
              onClick={() => {
                const val = (document.getElementById('destination-search-input') as HTMLInputElement)?.value;
                if (val) onSelectDestination(val);
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors whitespace-nowrap cursor-pointer"
            >
              Explore
            </button>
          </div>
        </div>
      </div>

      {/* Floating Insights Bar */}
      <div className="relative -mt-12 z-10 max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-6 px-4 md:px-10 flex flex-wrap sm:flex-nowrap items-center justify-between gap-6">
        <StatItem icon={<MapPin className="w-6 h-6 text-blue-500" />} label="120+ Locations" />
        <div className="w-px h-10 bg-gray-100 hidden sm:block" />
        <StatItem icon={<Compass className="w-6 h-6 text-blue-400" />} label="Curated Guides" />
        <div className="w-px h-10 bg-gray-100 hidden sm:block" />
        <StatItem icon={<Navigation className="w-6 h-6 text-cyan-400" />} label="Easy Planning" />
      </div>

      <section className="mt-24">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Popular Destinations</h2>
        <p className="text-gray-500 mt-2 mb-8">Most visited & loved places right now</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DestinationCard 
            name="Bali, Indonesia"
            deals="450+ Properties"
            image="https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&q=80"
            onSelect={() => onSelectDestination('Bali')}
          />
          <DestinationCard 
            name="Santorini, Greece"
            deals="210+ Properties"
            image="https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?auto=format&fit=crop&w=800&q=80"
            onSelect={() => onSelectDestination('Santorini')}
          />
          <DestinationCard 
            name="Maldives"
            deals="180+ Properties"
            image="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=800&q=80"
            onSelect={() => onSelectDestination('Maldives')}
          />
        </div>
      </section>

      <section className="mt-20 mb-20">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Trending Regions in Asia</h2>
            <p className="text-gray-500 mt-1">Discover exotic cultures and landscapes</p>
          </div>
          <button className="text-sm font-semibold text-blue-600 hover:text-blue-700 hidden sm:block">View All</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <RegionCard 
            name="Kyoto, Japan" 
            rating={4.9} 
            image="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80" 
            onSelect={() => onSelectDestination('Kyoto')}
          />
          <RegionCard 
            name="Chiang Mai, Thailand" 
            rating={4.8} 
            image="https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=600&q=80" 
            onSelect={() => onSelectDestination('Chiang Mai')}
          />
          <RegionCard 
            name="Jeju Island, Korea" 
            rating={4.7} 
            image="https://images.unsplash.com/photo-1589370845341-2679ed8c47ef?auto=format&fit=crop&w=600&q=80" 
            onSelect={() => onSelectDestination('Jeju')}
          />
          <RegionCard 
            name="Palawan, Philippines" 
            rating={5.0} 
            image="https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?auto=format&fit=crop&w=600&q=80" 
            onSelect={() => onSelectDestination('Palawan')}
          />
        </div>
      </section>
    </div>
  );
}

function StatItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-4 flex-1 justify-center sm:justify-start">
      <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
        {icon}
      </div>
      <span className="font-semibold text-gray-900">{label}</span>
    </div>
  );
}

function DestinationCard({ name, deals, image, onSelect }: { name: string, deals: string, image: string, onSelect: () => void }) {
  return (
    <div 
      onClick={onSelect}
      className="relative h-[400px] rounded-[24px] overflow-hidden group cursor-pointer shadow-md"
    >
      <img src={image} alt={name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 p-8 w-full">
        <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
        <div className="flex items-center justify-between">
          <p className="text-sm text-white/90 font-medium">{deals}</p>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onSelect();
            }}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors cursor-pointer"
          >
            Explore
          </button>
        </div>
      </div>
    </div>
  );
}

function RegionCard({ name, rating, image, onSelect }: { name: string, rating: number, image: string, onSelect: () => void }) {
  return (
    <div 
      onClick={onSelect}
      className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl p-3 border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden mb-4 bg-gray-100">
        <img src={image} alt={name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
      </div>
      <div className="px-1 pb-1">
        <div className="flex items-center justify-between mb-1">
          <h3 className="text-base font-bold text-gray-900 line-clamp-1">{name}</h3>
          <div className="flex items-center gap-1 text-orange-500 shrink-0">
            <span className="text-sm font-bold text-gray-900">{rating}</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <p className="text-sm text-gray-500 font-medium">Explore Region</p>
      </div>
    </div>
  );
}
