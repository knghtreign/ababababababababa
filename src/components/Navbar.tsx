import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Phone, X, ArrowRight } from 'lucide-react';
import { CLINIC_DETAILS } from '../data/clinicData';
import { playSoftClick } from '../utils/soundEffects';

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: 'ABOUT', href: '#about' },
    { label: 'TREATMENTS', href: '#treatments' },
    { label: 'BEFORE & AFTER', href: '#results' },
    { label: 'DOCTOR', href: '#doctor' },
    { label: 'CLINIC', href: '#location' },
    { label: 'CONTACT', href: '#contact' },
  ];

  const handleNavClick = (href: string) => {
    playSoftClick();
    setIsOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header id="main-nav-header" className="absolute top-0 left-0 right-0 z-40 px-3 sm:px-6 lg:px-8 py-2.5 sm:py-4 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
          {/* Top Left: Google Profile Button */}
          <a
            id="nav-google-profile-btn"
            href="https://maps.app.goo.gl/h5W6TMUFYsorp8uw9?g_st=ac"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 bg-white/95 hover:bg-white text-[#0F172A] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-[0_4px_16px_rgba(15,23,42,0.06)] border border-slate-200/90 text-[11px] sm:text-xs font-black tracking-wider uppercase font-['Outfit',sans-serif] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md"
            title="Dr. Deepal's Dental Clinic Google Profile"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>Google Profile</span>
            <span className="text-[10px] text-slate-400 font-bold">↗</span>
          </a>

          {/* Top Right: Menu Trigger */}
          <button
            id="center-menu-trigger"
            onClick={() => {
              playSoftClick();
              setIsOpen(!isOpen);
            }}
            className="flex items-center gap-1.5 sm:gap-2 bg-white/95 hover:bg-white text-[#0F172A] px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full shadow-[0_4px_16px_rgba(15,23,42,0.06)] border border-slate-200/90 text-[11px] sm:text-xs font-black tracking-widest uppercase font-['Outfit',sans-serif] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer backdrop-blur-md"
          >
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B544] animate-pulse" />
              <span className="w-1.5 h-1.5 rounded-full bg-[#415A77]" />
              <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
            </div>
            <span>{isOpen ? 'CLOSE' : 'MENU'}</span>
          </button>
        </div>
      </header>

      {/* Center-Expanding Minimal Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <div id="center-nav-modal" className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-md"
            />

            {/* Expanding Circle / Card from Center */}
            <motion.div
              initial={{ scale: 0, opacity: 0, rotate: -6 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: 6 }}
              transition={{ type: 'spring', damping: 24, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-[36px] p-8 sm:p-12 shadow-[0_25px_70px_rgba(15,23,42,0.18)] border-2 border-[#293549] overflow-hidden text-[#293549]"
            >
              {/* Decorative subtle background elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-100/50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-100/40 rounded-full blur-2xl pointer-events-none -ml-12 -mb-12" />

              {/* Close Button */}
              <button
                id="close-menu-btn"
                onClick={() => {
                  playSoftClick();
                  setIsOpen(false);
                }}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center shadow-xs hover:scale-105 active:scale-95 transition-all border border-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative z-10 text-center">
                <span className="inline-block text-[11px] font-black tracking-widest text-[#293549] uppercase bg-gradient-to-r from-amber-100 to-amber-200/80 px-3.5 py-1 rounded-full mb-4 shadow-xs font-['Outfit',sans-serif] border border-amber-300/60">
                  Dr Deepals Dental Clinic · Malabar Hill
                </span>
                
                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#293549] font-['Outfit',sans-serif] tracking-tight mb-8">
                  Navigate Experience
                </h3>

                {/* Minimalist Menu List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {navItems.map((item, idx) => (
                    <motion.button
                      key={item.label}
                      id={`nav-link-${item.label.toLowerCase()}`}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.05 * idx, duration: 0.3 }}
                      onClick={() => handleNavClick(item.href)}
                      className="group flex items-center justify-between bg-slate-50 hover:bg-amber-50/60 text-[#0F172A] p-4 rounded-2xl border border-slate-200/90 hover:border-amber-400/80 shadow-xs transition-all duration-300 text-left cursor-pointer"
                    >
                      <span className="text-base font-extrabold font-['Outfit',sans-serif] tracking-wide">
                        {item.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-amber-600 group-hover:translate-x-1 transition-all" />
                    </motion.button>
                  ))}
                </div>

                {/* Direct Action */}
                <button
                  id="menu-book-btn"
                  onClick={() => {
                    setIsOpen(false);
                    onOpenBooking();
                  }}
                  className="w-full gold-cta-btn animate-gold-shimmer text-sm py-4 px-6 rounded-full shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer tracking-wider uppercase"
                >
                  <Sparkles className="w-4 h-4 text-[#0B1528]" />
                  <span>BOOK YOUR CONSULTATION</span>
                  <span className="text-base font-black">↗</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

