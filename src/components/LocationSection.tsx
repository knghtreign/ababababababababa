import React from 'react';
import { motion } from 'motion/react';
import { Compass } from 'lucide-react';
import { TextHighlight, PopBadge } from './AnimatedText';

export const LocationSection: React.FC = () => {
  const mapQuery = encodeURIComponent(
    "Dr Deepals Dental Clinic, Guide Building, Gate No. 2, Shop No. 9, Ground Floor, Near Priyadarshini Park, L.D. Ruparel Marg, Malabar Hill, Mumbai 400006"
  );
  const embedUrl = `https://maps.google.com/maps?q=${mapQuery}&t=m&z=16&ie=UTF8&iwloc=&output=embed`;

  return (
    <section id="location" className="relative py-8 sm:py-14 -mt-4 sm:-mt-6 px-3 sm:px-8 overflow-hidden z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 sm:mb-8 gap-3"
        >
          <div>
            <PopBadge className="mb-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black uppercase tracking-widest text-[#293549] bg-amber-100 px-3 py-1 rounded-full shadow-xs font-['Outfit',sans-serif] border border-amber-300/60">
                <Compass className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-600" />
                MALABAR HILL, MUMBAI
              </span>
            </PopBadge>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-[#293549] font-['Outfit',sans-serif] tracking-tight leading-tight">
              Visit <TextHighlight color="coral" variant="bracket">Our Clinic</TextHighlight>
            </h2>
          </div>
          <div className="flex flex-col sm:items-end gap-2">
            <p className="text-slate-600 text-xs sm:text-sm max-w-md font-medium leading-relaxed">
              Guide Building, Gate No. 2, Shop No. 9, Ground Floor, Near Priyadarshini Park, L.D. Ruparel Marg, Malabar Hill, Mumbai 400006
            </p>
            <a
              id="location-google-profile-btn"
              href="https://maps.app.goo.gl/h5W6TMUFYsorp8uw9?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200/90 shadow-2xs text-[11px] font-bold transition-all hover:scale-105 active:scale-95 font-['Outfit',sans-serif] cursor-pointer"
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
                <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
              </svg>
              <span>View Google Profile ↗</span>
            </a>
          </div>
        </motion.div>

        {/* Real Interactive Google Maps Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 16, stiffness: 180 }}
          className="relative rounded-[24px] sm:rounded-[36px] bg-[#293549] p-2.5 sm:p-4 border-2 border-[#293549] ring-1 ring-white/20 shadow-[0_16px_48px_rgba(15,25,40,0.2)] overflow-hidden"
        >
          
          {/* Real Google Maps Iframe */}
          <div className="relative w-full h-[320px] sm:h-[460px] rounded-[18px] sm:rounded-[28px] overflow-hidden bg-slate-200 shadow-inner">
            <iframe
              id="google-maps-iframe"
              title="Dr Deepals Dental Clinic Google Maps Location"
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            />
          </div>

        </motion.div>

      </div>
    </section>
  );
};
