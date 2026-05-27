import { Home, Building2, Ticket, Percent, Clock } from 'lucide-react';
import { properties } from './data';

export default function SpecialOffers() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden mt-6 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-700 flex items-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80&w=2000')] mix-blend-overlay opacity-30 object-cover" />
        
        <div className="relative z-10 px-8 md:px-16 lg:px-24">
          <div className="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-bold tracking-wider mb-6 backdrop-blur-md border border-white/30">
            LIMITED TIME
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white max-w-2xl leading-tight">
            Special Offers <br/> & Exclusives
          </h1>
          <p className="text-white/90 mt-4 text-base md:text-lg max-w-xl font-medium">
            Save big on your next getaway with our handpicked deals and seasonal promotions.
          </p>
        </div>
      </div>

      {/* Categories */}
      <div className="relative -mt-8 z-10 max-w-4xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-6 px-4 md:px-10 flex flex-wrap sm:flex-nowrap items-center justify-between gap-6">
        <StatItem icon={<Percent className="w-6 h-6 text-pink-500" />} label="Up to 50% Off" />
        <div className="w-px h-10 bg-gray-100 hidden sm:block" />
        <StatItem icon={<Clock className="w-6 h-6 text-orange-400" />} label="Last Minute" />
        <div className="w-px h-10 bg-gray-100 hidden sm:block" />
        <StatItem icon={<Ticket className="w-6 h-6 text-cyan-400" />} label="Member Deals" />
      </div>

      <section className="mt-24">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Active Promotions</h2>
        <p className="text-gray-500 mt-2 mb-8">Claim these vouchers before they expire</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <PromoCard 
            title="Summer Escapes - 30% Off" 
            subtitle="Enjoy a 30% discount on your next stay in Bali, Seminyak. Don't miss out—limited time offer!" 
            iconType="home"
            bgClass="bg-[#F0FDF4] border-green-50"
            glowClass="bg-green-200"
            iconColor="text-green-500"
          />
          <PromoCard 
            title="City Breaks - 25% Off" 
            subtitle="Get away for the weekend to the best city hotels. Early booking discount applied!" 
            iconType="hotel"
            bgClass="bg-[#F8FAFC] border-slate-100"
            glowClass="bg-slate-200"
            iconColor="text-slate-500"
          />
          <PromoCard 
            title="Luxury Villas - 40% Off" 
            subtitle="Premium villas now more affordable than ever. Applies to stays longer than 5 nights." 
            iconType="home"
            bgClass="bg-[#FEFCE8] border-yellow-50"
            glowClass="bg-yellow-200"
            iconColor="text-yellow-500"
          />
          <PromoCard 
            title="Family Packages - Kids Stay Free" 
            subtitle="Bring the whole family. Kids under 12 stay and eat for free at selected properties." 
            iconType="hotel"
            bgClass="bg-[#EFF6FF] border-blue-50"
            glowClass="bg-blue-200"
            iconColor="text-blue-500"
          />
        </div>
      </section>

      <section className="mt-20 mb-12">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Deals of the Week</h2>
            <p className="text-gray-500 mt-1">Our absolute lowest prices on top-rated stays</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <DealCard property={properties[0]} oldPrice={750} />
          <DealCard property={properties[2]} oldPrice={580} />
          <DealCard property={properties[3]} oldPrice={450} />
          <DealCard property={properties[5]} oldPrice={590} />
        </div>
      </section>
    </div>
  );
}

function StatItem({ icon, label }: { icon: React.ReactNode, label: string }) {
  return (
    <div className="flex items-center gap-4 flex-1 justify-center sm:justify-start">
      <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center">
        {icon}
      </div>
      <span className="font-semibold text-gray-900">{label}</span>
    </div>
  );
}

function PromoCard({ title, subtitle, iconType, bgClass, glowClass, iconColor }: { title: string, subtitle: string, iconType: string, bgClass: string, glowClass: string, iconColor: string }) {
  return (
    <div className={`${bgClass} rounded-2xl p-6 flex flex-col sm:flex-row items-center gap-6 border relative overflow-hidden shadow-sm`}>
      <div className={`absolute -top-12 -right-12 w-48 h-48 ${glowClass} opacity-30 rounded-full blur-3xl`} />
      
      <div className={`w-16 h-16 rounded-2xl shadow-sm flex items-center justify-center shrink-0 z-10 bg-white`}>
        {iconType === 'home' ? <Home className={`w-8 h-8 ${iconColor}`} /> : <Building2 className={`w-8 h-8 ${iconColor}`} />}
      </div>
      <div className="flex-1 z-10 text-center sm:text-left">
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-sm text-gray-600 mt-1 max-w-sm">{subtitle}</p>
      </div>
      <button className="bg-white border border-blue-100 text-blue-500 hover:bg-blue-50 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors z-10 shrink-0 shadow-sm">
        Claim Deal
      </button>
    </div>
  );
}

function DealCard({ property, oldPrice }: { property: any, oldPrice: number }) {
  return (
    <div className="group cursor-pointer flex flex-col h-full bg-white rounded-2xl p-3 border border-transparent hover:border-gray-100 hover:shadow-lg transition-all duration-300 relative">
      <div className="absolute top-6 right-6 z-10 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-md">
        -{Math.round(((oldPrice - property.price) / oldPrice) * 100)}%
      </div>
      <div className="relative w-full aspect-[4/3] rounded-[14px] overflow-hidden mb-4 bg-gray-100">
        <img src={property.image} alt={property.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-semibold rounded-full ${property.badgeStyle} shadow-sm`}>
          {property.type}
        </div>
      </div>
      
      <div className="px-1 flex-1 flex flex-col">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-base font-bold text-gray-900 leading-snug line-clamp-1">{property.name}</h3>
          </div>
          <p className="text-sm text-gray-500 mb-4 font-medium">{property.location}</p>
          
          <div className="flex items-end justify-between mt-auto pt-2 border-t border-gray-50">
            <div>
              <p className="text-xs text-gray-500 mb-0.5 font-medium line-through">${oldPrice}</p>
              <p className="text-lg font-extrabold text-red-500">${property.price}<span className="text-xs font-semibold text-gray-500 ml-1">/Night</span></p>
            </div>
            <button className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-sm">
              Book Deal
            </button>
          </div>
      </div>
    </div>
  );
}
