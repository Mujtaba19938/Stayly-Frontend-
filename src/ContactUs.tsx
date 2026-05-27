import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactUs() {
  return (
    <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-24">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-4">Get in Touch</h1>
        <p className="text-lg text-gray-500">
          Have a question about your booking, or want to partner with us? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div className="lg:col-span-1 space-y-6">
          <InfoCard 
            icon={<Mail className="w-6 h-6 text-blue-500" />}
            title="Email Us"
            detail="support@stayly.com"
          />
          <InfoCard 
            icon={<Phone className="w-6 h-6 text-green-500" />}
            title="Call Us"
            detail="+1 (555) 123-4567"
          />
          <InfoCard 
            icon={<MapPin className="w-6 h-6 text-orange-500" />}
            title="Visit Us"
            detail="123 Travel Way, Suite 400, San Francisco, CA 94105"
          />
        </div>

        {/* Form Container */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900/60 rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-slate-800/40">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900 dark:text-slate-200">First Name</label>
                <input type="text" placeholder="John" className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-900 dark:text-slate-200">Last Name</label>
                <input type="text" placeholder="Doe" className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-slate-200">Email Address</label>
              <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-slate-200">Subject</label>
              <input type="text" placeholder="How can we help?" className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-900 dark:text-slate-200">Message</label>
              <textarea placeholder="Write your message here..." rows={5} className="w-full bg-gray-50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700/50 rounded-xl px-4 py-3 text-sm text-gray-800 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"></textarea>
            </div>

            <button type="button" className="w-full bg-blue-500 hover:bg-blue-600 text-white rounded-xl px-4 py-3.5 text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm">
              <Send className="w-4 h-4" />
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon, title, detail }: { icon: React.ReactNode, title: string, detail: string }) {
  return (
    <div className="bg-white dark:bg-slate-900/60 rounded-2xl p-6 border border-gray-100 dark:border-slate-800/40 shadow-sm flex items-start gap-4">
      <div className="w-12 h-12 rounded-xl bg-gray-50 dark:bg-slate-800 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h3 className="font-bold text-gray-900 dark:text-slate-100 mb-1">{title}</h3>
        <p className="text-sm text-gray-500 dark:text-slate-400 leading-relaxed">{detail}</p>
      </div>
    </div>
  );
}
