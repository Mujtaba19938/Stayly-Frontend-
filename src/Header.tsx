import { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown, Sun, Moon } from 'lucide-react';
import { motion } from 'motion/react';

export default function Header({ page = 'accommodations', setPage }: { page?: string, setPage?: (page: string) => void }) {
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navContainerRef = useRef<HTMLElement>(null);

  // Responsive Dark and Light Mode toggle state
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);


  // Calculate sliding pill positions dynamically
  useEffect(() => {
    const updatePill = () => {
      const container = navContainerRef.current;
      if (!container) return;

      const activeLink = container.querySelector(`[data-nav-name="${page}"]`) as HTMLElement;
      if (activeLink) {
        setPillStyle({
          left: activeLink.offsetLeft,
          width: activeLink.offsetWidth,
          opacity: 1
        });
      }
    };

    updatePill();
    
    // Tiny delay to ensure layout rendering and styling are complete
    const timeoutId = setTimeout(updatePill, 50);

    window.addEventListener('resize', updatePill);
    return () => {
      window.removeEventListener('resize', updatePill);
      clearTimeout(timeoutId);
    };
  }, [page]);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setPage?.('accommodations')}>
          <div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center text-white font-bold text-xl">
            S
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">Stayly</span>
        </div>

        {/* Global Search - Hidden on small screens */}
        <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 w-72 h-10">
          <Search className="w-4 h-4 text-gray-400 mr-2" />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-transparent border-none outline-none text-sm w-full"
          />
        </div>

        {/* Navigation (One Pill Segmented Control with spring slide) */}
        <nav 
          ref={navContainerRef}
          className="hidden md:flex items-center bg-gray-100/70 p-1 rounded-full border border-gray-200/50 relative shadow-[inset_0_1.5px_3px_rgba(0,0,0,0.03)] overflow-hidden"
        >
          {/* Sliding active background indicator */}
          <div 
            className="absolute top-1 bottom-1 bg-white rounded-full shadow-[0_2px_8px_rgba(15,23,42,0.06),_0_1px_3px_rgba(15,23,42,0.02)] border border-slate-100/50 transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0"
            style={{
              left: `${pillStyle.left}px`,
              width: `${pillStyle.width}px`,
              opacity: pillStyle.opacity,
            }}
          />

          {[
            { id: 'destinations', label: 'Destinations' },
            { id: 'accommodations', label: 'Accommodations' },
            { id: 'special', label: 'Special Offers' },
            { id: 'contact', label: 'Contact Us' },
            { id: 'about', label: 'About Us' }
          ].map((item) => {
            const isActive = page === item.id;
            return (
              <a
                key={item.id}
                href="#"
                data-nav-name={item.id}
                onClick={(e) => {
                  e.preventDefault();
                  setPage?.(item.id);
                }}
                className={`relative z-10 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 whitespace-nowrap active:scale-[0.97] select-none ${
                  isActive ? 'text-gray-900 font-bold' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-1 cursor-pointer text-sm font-medium text-gray-700">
            <span>🇬🇧</span>
            <span className="ml-1">ENG</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Glass Theme Toggle Switch */}
          <div 
            className="relative flex items-center cursor-pointer shrink-0"
            onClick={() => setIsDark(!isDark)}
            style={{ WebkitTapHighlightColor: 'transparent' }}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {/* Pill track */}
            <motion.div 
              layout
              animate={{
                backgroundColor: isDark ? '#090d16' : 'rgba(15, 23, 42, 0.06)',
                boxShadow: isDark 
                  ? 'inset 0 2px 4px rgba(0,0,0,0.6)' 
                  : 'inset 0 1.5px 3px rgba(0,0,0,0.06)',
              }}
              transition={{ duration: 0.5 }}
              className="w-[110px] h-[40px] rounded-full flex items-center relative justify-between px-4 z-0 border border-slate-200/20"
            >
              <motion.span 
                animate={{ opacity: isDark ? 1 : 0, x: isDark ? 0 : -10 }}
                transition={{ duration: 0.4 }}
                className="text-white text-xs font-bold font-sans tracking-wide pt-[1px] select-none"
              >
                Dark
              </motion.span>
              
              <motion.span 
                animate={{ opacity: !isDark ? 1 : 0, x: !isDark ? 0 : 10 }}
                transition={{ duration: 0.4 }}
                className="text-slate-800 text-xs font-bold font-sans tracking-wide pt-[1px] select-none"
              >
                Light
              </motion.span>
            </motion.div>

            {/* Knob */}
            <motion.div
              layout
              animate={{
                x: isDark ? 66 : -4,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute z-10 w-[48px] h-[48px] rounded-full flex items-center justify-center pointer-events-none"
            >
              {/* Knob Background & Glass Effect */}
              <motion.div
                animate={{
                  backgroundColor: isDark ? '#141517' : 'rgba(255, 255, 255, 0.4)',
                  boxShadow: isDark 
                    ? 'inset -2px -3px 6px rgba(50, 120, 255, 0.5), inset 2px 2px 4px rgba(255,255,255,0.1), 0 8px 16px rgba(0,0,0,0.4), 0 4px 8px rgba(0,0,0,0.4)' 
                    : 'inset 2px 3px 6px rgba(255, 255, 255, 0.9), inset -2px -2px 4px rgba(0,0,0,0.05), 0 8px 16px rgba(0,0,0,0.1)',
                  borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.5)',
                }}
                transition={{ duration: 0.3 }}
                className="w-full h-full rounded-full absolute border"
                style={{
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)'
                }}
              />
              
              {/* Icons */}
              <motion.div 
                initial={false}
                animate={{ 
                  scale: isDark ? 1 : 0.5, 
                  rotate: isDark ? 0 : -90, 
                  opacity: isDark ? 1 : 0 
                }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                className="absolute text-white z-10 drop-shadow-md"
              >
                <Moon size={18} fill="white" className="ml-[2px] mt-[1px]" />
              </motion.div>

              <motion.div 
                initial={false}
                animate={{ 
                  scale: !isDark ? 1 : 0.5, 
                  rotate: !isDark ? 0 : 90, 
                  opacity: !isDark ? 1 : 0 
                }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                className="absolute text-white z-10 drop-shadow-sm"
              >
                <Sun size={20} className="text-amber-500 fill-amber-100" />
              </motion.div>

            </motion.div>
          </div>

          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer">
            Login
          </button>
        </div>
      </div>
    </header>
  );
}
