import { useState, useEffect } from 'react';
import { 
  ArrowLeft, Star, MapPin, Wifi, Waves, Coffee, Car, 
  Plus, Minus, ShieldCheck, CheckCircle2, Calendar, Users, 
  CreditCard, Lock, ArrowRight, Sparkles, AlertCircle
} from 'lucide-react';
import { Property } from './types';

interface PropertyDetailProps {
  property: Property;
  onBack: () => void;
}

export default function PropertyDetail({ property, onBack }: PropertyDetailProps) {
  // Gallery states
  const [activeImage, setActiveImage] = useState(property.image);
  
  // Interactive Dates
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [nights, setNights] = useState(0);
  
  // Guest Steppers
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildrenCount] = useState(0);
  
  // Modal booking form state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [bookingStep, setBookingStep] = useState(1); // 1 = Details, 2 = Payment, 3 = Ticket Success
  
  // Form Inputs
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');
  
  // Form Errors
  const [formError, setFormError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate mock secondary images for a rich gallery
  const galleryImages = [
    property.image,
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80',
    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?auto=format&fit=crop&w=600&q=80'
  ];

  // Calculate nights whenever dates change
  useEffect(() => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays > 0) {
        setNights(diffDays);
        setFormError('');
      } else {
        setNights(0);
      }
    } else {
      setNights(0);
    }
  }, [checkIn, checkOut]);

  // Handle auto date setting for demonstration if left blank
  const handleSetQuickDates = () => {
    const today = new Date();
    const future = new Date();
    future.setDate(today.getDate() + 4);
    
    setCheckIn(today.toISOString().split('T')[0]);
    setCheckOut(future.toISOString().split('T')[0]);
  };

  // Pricing calculations
  const basePrice = property.price * (nights || 1);
  const cleaningFee = 45;
  const serviceFee = 25;
  const taxes = Math.round((basePrice + cleaningFee) * 0.1);
  const totalPrice = basePrice + cleaningFee + serviceFee + taxes;

  // Format Card Number (with spaces every 4 digits)
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || '';
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(value);
    }
  };

  // Handle Form Progress
  const validateStep1 = () => {
    if (!fullName.trim() || !email.trim() || !phone.trim()) {
      setFormError('Please fill out all personal details.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address.');
      return false;
    }
    setFormError('');
    return true;
  };

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep1()) {
      setBookingStep(2);
    }
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.replace(/\s/g, '').length < 16 || expiry.length < 5 || cvc.length < 3) {
      setFormError('Please enter valid credit card details.');
      return;
    }
    
    setFormError('');
    setIsSubmitting(true);
    
    // Simulate premium payment processor charge delay
    setTimeout(() => {
      setIsSubmitting(false);
      setBookingStep(3);
    }, 2000);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-slide-in">
      {/* Top Breadcrumbs / Back button */}
      <button 
        onClick={onBack}
        className="mb-6 flex items-center gap-2.5 text-sm font-bold text-gray-600 hover:text-blue-500 transition-all bg-white border border-gray-100 hover:border-blue-100 px-5 py-2.5 rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.03)] cursor-pointer group active:scale-95"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
        Back to Accommodations
      </button>

      {/* Property Title & Header info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <span className={`px-3.5 py-1 text-xs font-bold rounded-full ${property.badgeStyle} shadow-sm uppercase tracking-wider`}>
              {property.type}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 text-amber-600 px-2.5 py-0.5 rounded-full text-xs font-bold">
              <Sparkles className="w-3 h-3 fill-current" />
              Guest Favorite
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">{property.name}</h1>
          <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-gray-500 font-semibold">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span className="text-gray-900 font-bold">{property.rating}</span>
              <span>({property.reviews} Reviews)</span>
            </div>
            <span>•</span>
            <div className="flex items-center gap-1 text-gray-600">
              <MapPin className="w-4 h-4 text-blue-500" />
              <span>{property.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Dynamic Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
        <div className="lg:col-span-2 relative h-[350px] sm:h-[480px] rounded-3xl overflow-hidden border border-gray-100 bg-gray-50 shadow-sm">
          <img 
            src={activeImage} 
            alt={property.name} 
            className="w-full h-full object-cover transition-all duration-500 hover:scale-102"
          />
        </div>
        <div className="grid grid-cols-3 lg:grid-cols-1 gap-4 lg:h-[480px]">
          {galleryImages.map((img, idx) => (
            <div 
              key={idx}
              onClick={() => setActiveImage(img)}
              className={`relative h-[100px] lg:h-[110px] rounded-2xl overflow-hidden cursor-pointer border-2 transition-all shadow-sm ${
                activeImage === img ? 'border-blue-500 scale-[0.98]' : 'border-transparent opacity-80 hover:opacity-100'
              }`}
            >
              <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      {/* Details & Interactive Sidebar Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Left: Main Details */}
        <div className="lg:col-span-2 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-4">About this premium stay</h2>
            <p className="text-gray-600 leading-relaxed text-base">
              Experience the pinnacle of luxury and comfort in this stunning {property.type.toLowerCase()} located in the heart of {property.location}. Carefully designed to combine modern convenience with local craftsmanship, this retreat offers beautiful views, exceptional comfort, and immediate access to top-rated attractions, restaurants, and nature walks. Perfectly suited for couples, families, or small groups looking for an unforgettable getaway.
            </p>
          </div>

          <hr className="border-gray-100" />

          {/* Premium Amenities Grid */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">What this place offers</h3>
            <div className="grid grid-cols-2 gap-y-5 gap-x-8">
              <AmenityItem icon={<Wifi className="w-5 h-5 text-blue-500" />} title="Superfast Wi-Fi (250 Mbps)" />
              <AmenityItem icon={<Waves className="w-5 h-5 text-blue-500" />} title="Infinity swimming pool" />
              <AmenityItem icon={<Car className="w-5 h-5 text-blue-500" />} title="Free on-site parking" />
              <AmenityItem icon={<Coffee className="w-5 h-5 text-blue-500" />} title="Espresso machine & coffee" />
              <AmenityItem icon={<ShieldCheck className="w-5 h-5 text-blue-500" />} title="24/7 Monitored Security" />
              <AmenityItem icon={<Sparkles className="w-5 h-5 text-blue-500" />} title="Daily premium housekeeping" />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Luxury Host details */}
          <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 flex flex-col sm:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-200 border-2 border-white shadow-sm shrink-0">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" alt="Host Profile" className="w-full h-full object-cover" />
            </div>
            <div className="text-center sm:text-left flex-1">
              <p className="text-xs font-extrabold text-blue-500 uppercase tracking-widest mb-0.5">Stayly Partner Host</p>
              <h4 className="text-lg font-bold text-gray-900">Hosted by Madeleine Claire</h4>
              <p className="text-sm text-gray-500 mt-1">Superhost • 4.98 Rating • 3 years hosting</p>
            </div>
            <button className="bg-white border border-slate-200 hover:border-blue-200 text-gray-700 hover:text-blue-500 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-sm active:scale-95">
              Contact Host
            </button>
          </div>
        </div>

        {/* Right: Sticky Booking Calculator Widget */}
        <div className="bg-white border border-gray-100 rounded-3xl p-6 lg:p-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] sticky top-24">
          <div className="flex items-end justify-between mb-6">
            <div>
              <span className="text-2xl font-extrabold text-gray-900">${property.price}</span>
              <span className="text-sm font-semibold text-gray-500 ml-1">/ night</span>
            </div>
            <div className="flex items-center gap-1 text-sm font-bold text-amber-500">
              <Star className="w-4 h-4 fill-current" />
              <span>{property.rating}</span>
            </div>
          </div>

          {/* Interactive Date Selection */}
          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-3">
              <div className="border border-gray-200 rounded-2xl p-3 focus-within:border-blue-500 transition-colors">
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Check-in</label>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                  <input 
                    type="date" 
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-sm text-gray-800 font-bold focus:ring-0 cursor-pointer"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
              <div className="border border-gray-200 rounded-2xl p-3 focus-within:border-blue-500 transition-colors">
                <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-1">Check-out</label>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gray-400 shrink-0" />
                  <input 
                    type="date" 
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-sm text-gray-800 font-bold focus:ring-0 cursor-pointer"
                    min={checkIn || new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>

            {/* Quick Select Dates button (when dates are empty) */}
            {!nights && (
              <button 
                onClick={handleSetQuickDates}
                className="w-full text-xs font-bold text-blue-500 hover:text-blue-600 bg-blue-50 hover:bg-blue-100/70 py-2.5 rounded-xl border border-blue-100/50 transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Fill Sample Stay (4 Nights)
              </button>
            )}

            {/* Guests Selector */}
            <div className="border border-gray-200 rounded-2xl p-3">
              <label className="block text-[10px] font-extrabold text-gray-400 uppercase tracking-wider mb-2">Guests</label>
              
              <div className="space-y-3 mt-1.5">
                {/* Adults */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Adults</p>
                      <p className="text-[10px] text-gray-400 font-medium">Age 13 or above</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => adults > 1 && setAdults(prev => prev - 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 hover:border-gray-400 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="text-sm font-bold text-gray-800 w-4 text-center">{adults}</span>
                    <button 
                      onClick={() => setAdults(prev => prev + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 hover:border-gray-400 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between pt-2 border-t border-gray-50">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-xs font-bold text-gray-800">Children</p>
                      <p className="text-[10px] text-gray-400 font-medium">Ages 2 – 12</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => childrenCount > 0 && setChildrenCount(prev => prev - 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 hover:border-gray-400 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                      <Minus className="w-3 h-3 text-gray-600" />
                    </button>
                    <span className="text-sm font-bold text-gray-800 w-4 text-center">{childrenCount}</span>
                    <button 
                      onClick={() => setChildrenCount(prev => prev + 1)}
                      className="w-7 h-7 rounded-full border border-gray-200 hover:border-gray-400 flex items-center justify-center hover:bg-slate-50 transition-colors"
                    >
                      <Plus className="w-3 h-3 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing breakdown breakdown */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between text-sm text-gray-500 font-semibold">
              <span>${property.price} x {nights || 1} {nights === 1 || !nights ? 'night' : 'nights'}</span>
              <span className="text-gray-900 font-bold">${basePrice}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 font-semibold">
              <span>Cleaning fee</span>
              <span className="text-gray-900 font-bold">${cleaningFee}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 font-semibold">
              <span>Stayly Service fee</span>
              <span className="text-gray-900 font-bold">${serviceFee}</span>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-500 font-semibold">
              <span>Taxes (10%)</span>
              <span className="text-gray-900 font-bold">${taxes}</span>
            </div>
            
            <div className="flex items-center justify-between text-base text-gray-950 font-extrabold pt-3 border-t border-dashed border-gray-200">
              <span>Total cost</span>
              <span>${totalPrice}</span>
            </div>
          </div>

          {/* Book Now trigger */}
          <button 
            onClick={() => {
              if (!checkIn || !checkOut || nights <= 0) {
                handleSetQuickDates();
              }
              setIsBookingModalOpen(true);
            }}
            className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-3.5 px-4 rounded-2xl font-bold transition-all shadow-[0_4px_20px_rgba(59,130,246,0.25)] flex items-center justify-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <span>Book Stay Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          
          <div className="mt-3 text-center flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium">
            <Lock className="w-3.5 h-3.5 text-gray-400" />
            <span>Secure 256-bit encrypted checkout</span>
          </div>
        </div>
      </div>

      {/* Dynamic step-by-step Booking checkout modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-[32px] overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] animate-scale-up">
            
            {/* Header */}
            <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="font-extrabold text-gray-900 text-lg">Booking Checkout</h3>
                <p className="text-xs text-gray-500 font-medium">{property.name}</p>
              </div>
              
              {bookingStep < 3 && (
                <button 
                  onClick={() => {
                    setIsBookingModalOpen(false);
                    setBookingStep(1);
                  }}
                  className="w-8 h-8 rounded-full border border-gray-200 hover:border-gray-400 flex items-center justify-center text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Stepper Steps Bar */}
            {bookingStep < 3 && (
              <div className="flex items-center justify-between px-8 py-4 bg-slate-50/30 border-b border-gray-100/50">
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    bookingStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>1</span>
                  <span className="text-xs font-bold text-gray-800">Your Details</span>
                </div>
                <div className="h-px bg-gray-200 flex-1 mx-4" />
                <div className="flex items-center gap-2">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    bookingStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>2</span>
                  <span className="text-xs font-bold text-gray-600">Payment</span>
                </div>
              </div>
            )}

            {/* Content area */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              
              {formError && (
                <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mb-6 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-semibold text-red-600">{formError}</p>
                </div>
              )}

              {/* STEP 1: Guest Personal Details */}
              {bookingStep === 1 && (
                <form onSubmit={handleStep1Submit} className="space-y-5">
                  <div className="bg-blue-50/50 border border-blue-100 rounded-2xl p-4 flex items-center justify-between gap-4 mb-2">
                    <div className="text-sm text-gray-700 font-semibold">
                      <p className="font-bold text-blue-900">Stay Duration:</p>
                      <p className="text-xs text-blue-700 mt-0.5">
                        {checkIn ? `${checkIn} to ${checkOut}` : 'Sample Stay'} ({nights || 4} Nights, {adults + childrenCount} guests)
                      </p>
                    </div>
                    <span className="text-lg font-extrabold text-blue-900">${totalPrice}</span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. John Doe"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-2xl p-3 text-sm font-medium outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-2xl p-3 text-sm font-medium outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="e.g. +1 234 567 890"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-2xl p-3 text-sm font-medium outline-none transition-colors"
                    />
                  </div>

                  <button 
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3.5 px-4 rounded-2xl font-bold transition-all shadow-[0_4px_15px_rgba(59,130,246,0.2)] flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Continue to Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}

              {/* STEP 2: Credit Card Form */}
              {bookingStep === 2 && (
                <form onSubmit={handleStep2Submit} className="space-y-5">
                  <div className="bg-slate-50 border border-gray-150 rounded-2xl p-4 flex items-center justify-between mb-4">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Grand Total</p>
                      <p className="text-lg font-black text-gray-900">${totalPrice}</p>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-blue-600 font-extrabold bg-blue-50 border border-blue-100 px-3 py-1 rounded-full">
                      <Lock className="w-3.5 h-3.5" />
                      <span>Encrypted Payment</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Cardholder Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. JOHN DOE"
                      value={fullName.toUpperCase()}
                      disabled
                      className="w-full bg-slate-100 border border-gray-200 rounded-2xl p-3 text-sm font-bold outline-none text-gray-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-2">Card Number</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        required
                        maxLength={19}
                        placeholder="0000 0000 0000 0000"
                        value={cardNumber}
                        onChange={handleCardNumberChange}
                        className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-2xl p-3 pl-11 text-sm font-bold outline-none transition-colors"
                      />
                      <CreditCard className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">Expiry Date</label>
                      <input 
                        type="text" 
                        required
                        maxLength={5}
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => {
                          let value = e.target.value.replace(/[^0-9]/g, '');
                          if (value.length >= 2) {
                            setExpiry(value.slice(0, 2) + '/' + value.slice(2, 4));
                          } else {
                            setExpiry(value);
                          }
                        }}
                        className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-2xl p-3 text-sm font-bold outline-none transition-colors text-center"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-2">CVC / CVV</label>
                      <input 
                        type="password" 
                        required
                        maxLength={3}
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value.replace(/[^0-9]/g, ''))}
                        className="w-full bg-slate-50 border border-gray-200 focus:border-blue-500 focus:bg-white rounded-2xl p-3 text-sm font-bold outline-none transition-colors text-center"
                      />
                    </div>
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white py-4 px-4 rounded-2xl font-bold transition-all shadow-[0_4px_15px_rgba(34,197,94,0.2)] flex items-center justify-center gap-2 cursor-pointer mt-6"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing Charge...
                      </span>
                    ) : (
                      <>
                        <span>Pay ${totalPrice} & Complete Booking</span>
                        <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <button 
                    type="button"
                    onClick={() => setBookingStep(1)}
                    className="w-full text-center text-xs font-bold text-gray-500 hover:text-gray-700 transition-colors py-2 cursor-pointer"
                  >
                    Go Back to Details
                  </button>
                </form>
              )}

              {/* STEP 3: Complete Booking Success Ticket */}
              {bookingStep === 3 && (
                <div className="text-center py-6 animate-scale-up">
                  <div className="w-16 h-16 bg-green-50 border-2 border-green-200 rounded-full flex items-center justify-center mx-auto mb-6 text-green-500 shadow-md">
                    <CheckCircle2 className="w-9 h-9 fill-current text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">Booking Confirmed!</h3>
                  <p className="text-sm text-gray-500 mt-2 max-w-sm mx-auto font-medium">Your stay is booked and ready! We've sent a digital invoice and checking instructions to <strong>{email}</strong>.</p>
                  
                  {/* Digital Ticket card design */}
                  <div className="relative mt-8 max-w-md mx-auto bg-slate-900 text-white rounded-3xl p-6 text-left shadow-2xl border border-slate-800 overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
                    <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-green-500/10 rounded-full blur-2xl" />
                    
                    {/* Ticket tear edge line decoration */}
                    <div className="absolute top-[138px] -left-3 w-6 h-6 bg-white rounded-full z-10" />
                    <div className="absolute top-[138px] -right-3 w-6 h-6 bg-white rounded-full z-10" />
                    <div className="absolute top-[149px] left-5 right-5 border-t border-dashed border-slate-700 z-10" />

                    {/* Ticket details */}
                    <div className="pb-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-extrabold uppercase text-blue-400 tracking-widest">Digital Boarding Pass</span>
                        <span className="text-[10px] font-black text-white/40 bg-white/10 px-2.5 py-0.5 rounded-full">Ref: #{Math.floor(100000 + Math.random() * 900000)}</span>
                      </div>
                      <h4 className="text-base font-extrabold tracking-tight line-clamp-1">{property.name}</h4>
                      <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-400" />
                        {property.location}
                      </p>
                    </div>

                    <div className="pt-6 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] font-extrabold uppercase text-gray-500 tracking-wider">Guest Name</span>
                          <p className="text-xs font-bold mt-0.5">{fullName}</p>
                        </div>
                        <div>
                          <span className="text-[9px] font-extrabold uppercase text-gray-500 tracking-wider">Room Type</span>
                          <p className="text-xs font-bold mt-0.5">{property.type}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <span className="text-[9px] font-extrabold uppercase text-gray-500 tracking-wider">Check-in</span>
                          <p className="text-xs font-bold mt-0.5">{checkIn || '2026-05-28'}</p>
                        </div>
                        <div>
                          <span className="text-[9px] font-extrabold uppercase text-gray-500 tracking-wider">Check-out</span>
                          <p className="text-xs font-bold mt-0.5">{checkOut || '2026-06-01'}</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-800">
                        <div>
                          <span className="text-[9px] font-extrabold uppercase text-slate-500 tracking-wider">Total Paid</span>
                          <p className="text-sm font-black text-green-400">${totalPrice}</p>
                        </div>
                        <div className="flex items-center justify-end">
                          <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-extrabold">PAID IN FULL</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setIsBookingModalOpen(false);
                      setBookingStep(1);
                      onBack();
                    }}
                    className="w-full max-w-xs mt-8 bg-blue-500 hover:bg-blue-600 text-white py-3.5 px-6 rounded-2xl font-bold transition-all shadow-[0_4px_15px_rgba(59,130,246,0.15)] inline-flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Done, Return Home</span>
                  </button>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

    </div>
  );
}

function AmenityItem({ icon, title }: { icon: React.ReactNode; title: string }) {
  return (
    <div className="flex items-center gap-3.5 bg-slate-50 border border-slate-100/50 px-4 py-3.5 rounded-2xl">
      <div className="w-9 h-9 rounded-xl bg-white border border-slate-100 flex items-center justify-center shrink-0 shadow-sm">
        {icon}
      </div>
      <span className="text-sm font-bold text-gray-700">{title}</span>
    </div>
  );
}
