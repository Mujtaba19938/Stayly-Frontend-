import { Globe, Users, Shield, Target } from 'lucide-react';

export default function AboutUs() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-24">
      {/* Hero Section */}
      <div className="relative w-full h-[400px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl">
        <img 
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=2000" 
          alt="Team collaboration" 
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/40" />
        
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16 lg:px-24">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white max-w-2xl leading-tight">
            Connecting you <br/> with the world
          </h1>
          <p className="text-white/90 mt-4 text-base md:text-lg max-w-xl font-medium">
            We are on a mission to modernize accommodation booking, making travel effortless and memorable for everyone.
          </p>
        </div>
      </div>

      {/* Stats/Values Section */}
      <div className="relative -mt-12 z-10 max-w-5xl mx-auto bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] py-8 px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4">
        <div className="text-center md:text-left flex-1">
          <p className="text-3xl font-bold text-gray-900 mb-1">10M+</p>
          <p className="text-sm font-medium text-gray-500">Happy Travelers</p>
        </div>
        <div className="w-full md:w-px h-px md:h-12 bg-gray-100" />
        <div className="text-center md:text-left flex-1">
          <p className="text-3xl font-bold text-gray-900 mb-1">50k+</p>
          <p className="text-sm font-medium text-gray-500">Properties Worldwide</p>
        </div>
        <div className="w-full md:w-px h-px md:h-12 bg-gray-100" />
        <div className="text-center md:text-left flex-1">
          <p className="text-3xl font-bold text-gray-900 mb-1">120</p>
          <p className="text-sm font-medium text-gray-500">Countries Served</p>
        </div>
        <div className="w-full md:w-px h-px md:h-12 bg-gray-100" />
         <div className="text-center md:text-left flex-1">
          <p className="text-3xl font-bold text-blue-600 mb-1">4.9/5</p>
          <p className="text-sm font-medium text-gray-500">Average Rating</p>
        </div>
      </div>

      {/* Our Mission */}
      <section className="mt-24 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-6">Our Mission</h2>
        <p className="text-lg text-gray-600 leading-relaxed">
          At Stayly, we believe that travel should be accessible, seamless, and completely worry-free. 
          Founded in 2023, our platform bridges the gap between avid travelers and premium accommodations. 
          We're constantly innovating to provide transparency, top-tier customer service, and the best prices 
          in the industry.
        </p>
      </section>

      {/* Core Values */}
      <section className="mt-24">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight mb-8 text-center">Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ValueCard 
            icon={<Target className="w-6 h-6 text-blue-500" />}
            title="Customer First"
            description="Our users are at the center of every decision we make."
          />
          <ValueCard 
            icon={<Shield className="w-6 h-6 text-green-500" />}
            title="Trust & Safety"
            description="We rigorously vet every property to ensure your peace of mind."
          />
          <ValueCard 
            icon={<Globe className="w-6 h-6 text-cyan-500" />}
            title="Global Access"
            description="Breaking down barriers to make worldwide travel accessible."
          />
          <ValueCard 
            icon={<Users className="w-6 h-6 text-purple-500" />}
            title="Community"
            description="Building lasting relationships with our hosts and travelers."
          />
        </div>
      </section>

    </div>
  );
}

function ValueCard({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) {
  return (
    <div className="bg-gray-50 dark:bg-slate-900/60 rounded-2xl p-6 border border-gray-100/50 dark:border-slate-800/40 flex flex-col items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700/50 flex items-center justify-center shrink-0 shadow-sm">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-2">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
