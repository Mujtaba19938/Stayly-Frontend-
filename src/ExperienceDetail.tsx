import React, { useState } from 'react';
import { 
  ArrowLeft, Star, Clock, MapPin, Plus, Minus, 
  Calendar, Users, DollarSign, CheckCircle2, Ticket,
  Compass, Sparkles, Send, Map
} from 'lucide-react';

interface ExperienceDetailProps {
  experience: {
    title: string;
    subtitle: string;
    image: string;
  };
  onBack: () => void;
}

export default function ExperienceDetail({ experience, onBack }: ExperienceDetailProps) {
  const [participants, setParticipants] = useState(2);
  const [bookingDate, setBookingDate] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  
  // Custom mock data for beach clubs vs snorkeling
  const isBeachClub = experience.title.toLowerCase().includes('beach');
  
  const pricePerPerson = isBeachClub ? 85 : 75;
  const totalPrice = pricePerPerson * participants;
  
  const itinerary = isBeachClub ? [
    { time: '11:00 AM', title: 'Luxury Hotel Pick-up', desc: 'Direct pick-up from your villa or hotel in a premium private air-conditioned vehicle.' },
    { time: '12:30 PM', title: 'VIP Daybed Arrival', desc: 'Arrive at the famous Seminyak Beach Club with priority reserved beachside VIP daybeds.' },
    { time: '1:00 PM', title: 'Gourmet Tapas & Fusion Lunch', desc: 'A curated multi-course lunch featuring Mediterranean-inspired tapas and chilled coconut refreshments.' },
    { time: '3:30 PM', title: 'Infinity Pool & Swim-up Bar Session', desc: 'Enjoy relaxing lounge beats by world-class DJs, swim in the pools, or dip in the sea.' },
    { time: '5:30 PM', title: 'Golden Hour Sunset Lounge', desc: 'Premium custom cocktails served directly to your bed with unmatched views of the iconic sunset.' }
  ] : [
    { time: '08:00 AM', title: 'Harbor Departure', desc: 'Board the premium high-speed catamaran directly from Sanur beach harbor.' },
    { time: '09:30 AM', title: 'Snorkeling in Manta Point & Crystal Bay', desc: 'Swim alongside majestic Manta Rays in the pristine crystal waters under expert supervision.' },
    { time: '12:00 PM', title: 'Cliffside Organic Lunch', desc: 'Enjoy a beautiful local buffet at a clifftop eco-restaurant with stunning panoramic reef views.' },
    { time: '1:30 PM', title: 'Kelingking "T-Rex" Cliff Hike', desc: 'Take beautiful photos and explore the spectacular Kelingking secret beach coastline.' },
    { time: '4:00 PM', title: 'Sunset Catamaran Cruise Back', desc: 'Chilled drinks and live music as we sail back to Bali main harbor during sunset.' }
  ];

  const highlights = isBeachClub ? [
    'Private VIP Daybed Reservations included',
    'Chilled welcome cocktail + local snack platters',
    'Towel service + private changing suites',
    'Complimentary private SUV transport roundtrip'
  ] : [
    'All snorkeling gear (high-quality mask, fins, lifejacket) provided',
    'Professional underwater photography/videography included',
    'Dolphin watching and reef swimming',
    'Speedboat transport with full maritime insurance coverage'
  ];

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !bookingDate) {
      alert('Please fill out all fields.');
      return;
    }
    setIsBooked(true);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-slide-in">
      {/* Back button */}
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2.5 text-sm font-bold text-gray-600 hover:text-blue-500 transition-all bg-white border border-gray-100 hover:border-blue-100 px-5 py-2.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-pointer group active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Discover
      </button>

      {/* Large Premium Hero Banner */}
      <div className="relative w-full h-[350px] sm:h-[480px] rounded-[32px] overflow-hidden mb-12 shadow-xl border border-slate-100 bg-gray-50">
        <img 
          src={experience.image} 
          alt={experience.title} 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/35 to-transparent" />
        
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-4xl text-white">
          <div className="flex items-center gap-2 mb-3">
            <span className="bg-blue-500 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-widest">
              POPULAR EXPEDITION
            </span>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full text-xs font-bold border border-white/10">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>4.96 Rating</span>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">{experience.title}</h1>
          <p className="text-white/85 text-base md:text-lg mt-3 font-semibold max-w-2xl">{experience.subtitle}</p>
        </div>
      </div>

      {/* Double Column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        
        {/* Left Column: Itinerary Details */}
        <div className="lg:col-span-2 space-y-10">
          
          {/* Highlights */}
          <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/20 border border-blue-100/50 rounded-3xl p-6 sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              Adventure Highlights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-semibold text-gray-700">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Vertical Itinerary Timeline */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8 flex items-center gap-2">
              <Map className="w-6 h-6 text-blue-500" />
              Your Daily Itinerary
            </h2>
            
            <div className="relative pl-6 border-l-2 border-blue-100 ml-3 space-y-8">
              {itinerary.map((item, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline circular pulse marker */}
                  <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-white border-4 border-blue-500 shadow-sm flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                  </div>

                  <div>
                    <span className="inline-flex items-center gap-1 bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-xs font-bold mb-2">
                      <Clock className="w-3 h-3 text-slate-500" />
                      {item.time}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm mt-1.5 font-medium leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Dynamic Join Widget */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sticky top-24">
          {!isBooked ? (
            <form onSubmit={handleBooking} className="space-y-5">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">Book Adventure</h3>
                <p className="text-xs text-gray-500 font-semibold">Reserve your spot instantly with Stayly.</p>
              </div>

              {/* Price display */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Per Traveler</p>
                  <p className="text-xl font-black text-gray-900">${pricePerPerson}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Total Cost</p>
                  <p className="text-xl font-black text-blue-500">${totalPrice}</p>
                </div>
              </div>

              {/* Date Input */}
              <div className="border border-gray-200 focus-within:border-blue-500 rounded-2xl p-3.5 transition-colors">
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">Adventure Date</label>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                  <input 
                    type="date" 
                    required
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-sm text-gray-800 font-bold focus:ring-0 cursor-pointer"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              {/* Participant Stepper Selector */}
              <div className="border border-gray-200 rounded-2xl p-3.5">
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Total Participants</label>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Travelers</p>
                      <p className="text-[10px] text-gray-400 font-medium">Group sizes up to 12</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      type="button"
                      disabled={participants <= 1}
                      onClick={() => setParticipants(prev => prev - 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-400 disabled:opacity-40 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <span className="text-sm font-bold text-gray-800 w-4 text-center">{participants}</span>
                    <button 
                      type="button"
                      disabled={participants >= 12}
                      onClick={() => setParticipants(prev => prev + 1)}
                      className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-400 disabled:opacity-40 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Traveler Details */}
              <div className="space-y-4 pt-2">
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">Full Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-2xl p-3 text-sm font-semibold outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1.5">Email Address</label>
                  <input 
                    type="email" 
                    required
                    placeholder="e.g. john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-2xl p-3 text-sm font-semibold outline-none transition-colors"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3.5 px-4 rounded-2xl font-bold transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)] flex items-center justify-center gap-2 cursor-pointer pt-3 active:scale-95"
              >
                <span>Join Group & Book Now</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-6 animate-scale-up">
              <div className="w-14 h-14 bg-green-50 border border-green-200 rounded-full flex items-center justify-center mx-auto text-green-500">
                <CheckCircle2 className="w-8 h-8 fill-current text-white" />
              </div>
              <div>
                <h4 className="text-xl font-black text-gray-900">Spot Reserved!</h4>
                <p className="text-xs text-gray-500 mt-1.5 font-medium leading-relaxed">
                  We've successfully registered you and your companions for this incredible experience on <strong>{bookingDate}</strong>. Checking details sent to <strong>{email}</strong>.
                </p>
              </div>

              {/* Experience Boarding Pass Ticket */}
              <div className="bg-slate-900 border border-slate-800 text-white rounded-3xl p-5 text-left relative overflow-hidden shadow-xl">
                <div className="absolute top-[108px] -left-3 w-6 h-6 bg-white rounded-full" />
                <div className="absolute top-[108px] -right-3 w-6 h-6 bg-white rounded-full" />
                <div className="absolute top-[119px] left-5 right-5 border-t border-dashed border-slate-700" />
                
                <div className="pb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[8px] font-extrabold uppercase text-blue-400 tracking-widest">Adventure Voucher</span>
                    <Ticket className="w-4 h-4 text-blue-400" />
                  </div>
                  <h5 className="text-sm font-extrabold line-clamp-1">{experience.title}</h5>
                  <p className="text-[10px] text-gray-400 mt-0.5">{experience.subtitle}</p>
                </div>

                <div className="pt-6 space-y-3.5">
                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="block text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">Group Leader</span>
                      <span className="font-bold text-white mt-0.5 block">{fullName}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">Companions</span>
                      <span className="font-bold text-white mt-0.5 block">{participants} Travelers</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-[11px]">
                    <div>
                      <span className="block text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">Date Scheduled</span>
                      <span className="font-bold text-white mt-0.5 block">{bookingDate}</span>
                    </div>
                    <div>
                      <span className="block text-[8px] font-extrabold text-slate-500 uppercase tracking-wider">Amount Paid</span>
                      <span className="font-bold text-green-400 mt-0.5 block">${totalPrice}</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => {
                  setIsBooked(false);
                  setFullName('');
                  setEmail('');
                  setBookingDate('');
                  onBack();
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 px-4 rounded-2xl font-bold transition-all shadow-sm cursor-pointer"
              >
                Return to Discover Stays
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
