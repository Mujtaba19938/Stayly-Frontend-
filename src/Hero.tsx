import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <div className="hero w-full h-[500px] lg:h-[600px] rounded-3xl mt-6 shadow-xl">
      {/* Premium blur overlays */}
      <div className="blur-overlay blur-overlay-top" />
      <div className="blur-overlay blur-overlay-bottom" />
      
      {/* Background Image using CSS styling */}
      <div 
        className="hero-bg rounded-3xl" 
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=2000)' }} 
      />

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/20 rounded-3xl" style={{ zIndex: 2 }} />

      {/* Content Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24" style={{ zIndex: 10 }}>
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white max-w-2xl leading-tight">
          Enjoy your journey <br/> without limits
        </h1>
        <p className="text-white/90 mt-4 text-base md:text-lg max-w-xl font-medium">
          Find accommodations and exciting experiences
        </p>

        {/* Main Search Bar */}
        <div className="mt-8 bg-white p-2 rounded-full flex items-center w-full max-w-2xl shadow-lg">
          <div className="flex items-center flex-1 px-4">
            <Search className="w-5 h-5 text-gray-400 mr-3" />
            <input 
              type="text" 
              placeholder="Stays to Bali" 
              className="w-full bg-transparent border-none outline-none text-gray-800 text-base py-3"
            />
          </div>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-medium transition-colors whitespace-nowrap">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}
