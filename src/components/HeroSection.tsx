import React, { useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, Star, ShieldCheck, ArrowUpRight, Award, CheckCircle, Heart, Phone } from 'lucide-react';
import { CLINIC_IMAGES, CLINIC_DETAILS } from '../data/clinicData';
import { playPop, playSparkle } from '../utils/soundEffects';
import { TextHighlight } from './AnimatedText';

interface HeroSectionProps {
  onOpenBooking: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenBooking }) => {
  const [activeWorkerTip, setActiveWorkerTip] = useState<string | null>(null);
  const [toothShine, setToothShine] = useState(false);

  const { scrollY } = useScroll();
  const textY = useTransform(scrollY, [0, 500], [0, -10]);

  const handleWorkerClick = (message: string) => {
    playPop();
    setActiveWorkerTip(message);
    setTimeout(() => {
      setActiveWorkerTip(null);
    }, 3200);
  };

  const triggerToothSparkle = () => {
    playSparkle();
    setToothShine(true);
    setTimeout(() => setToothShine(false), 1200);
  };

  return (
    <section id="hero" className="relative pt-16 sm:pt-24 pb-8 sm:pb-14 px-2.5 sm:px-6 lg:px-8 overflow-visible">
      
      {/* Outer Atmospheric Frame */}
      <div className="absolute inset-0 -z-30 pointer-events-none" />

      {/* Floating Ambient Aura Highlights */}
      <div className="absolute top-8 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-amber-100/40 rounded-full blur-3xl pointer-events-none -z-20 animate-pulse" />
      <div className="absolute bottom-6 right-6 w-80 sm:w-[500px] h-80 sm:h-[500px] bg-emerald-50/50 rounded-full blur-3xl pointer-events-none -z-20" />

      {/* Signature Large Curved Canvas (Deep Slate Navy Section Card #293549) */}
      <div className="max-w-7xl mx-auto w-full relative rounded-[28px] sm:rounded-[44px] bg-[#293549] p-4 sm:p-8 lg:p-12 shadow-[0_20px_60px_rgba(15,25,40,0.22)] border-2 border-[#293549] ring-1 ring-white/20 overflow-hidden text-white">
        
        {/* Subtle inner sheen lighting */}
        <div className="absolute -top-28 -right-28 w-80 h-80 bg-white/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-80 h-80 bg-amber-100/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top Navbar Row inside card */}
        <div className="flex items-center justify-between pb-5 sm:pb-8 border-b border-white/25 relative z-20">
          <div className="text-left leading-tight">
            <span className="block font-black text-xs sm:text-base tracking-wider uppercase font-['Outfit',sans-serif] text-white">
              DR DEEPALS
            </span>
            <span className="block font-extrabold text-[10px] sm:text-xs tracking-widest uppercase font-['Outfit',sans-serif] text-[#FDE68A]">
              DENTAL CLINIC
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6 text-xs font-bold tracking-wider uppercase text-white/90">
            <a href="#about" className="hover:text-[#FDE68A] transition-colors">About</a>
            <a href="#treatments" className="hover:text-[#FDE68A] transition-colors">Treatments</a>
            <a href="#results" className="hover:text-[#FDE68A] transition-colors">Before & After</a>
            <a href="#doctor" className="hover:text-[#FDE68A] transition-colors">Doctor</a>
            <a href="#location" className="hover:text-[#FDE68A] transition-colors">Location</a>
          </div>

          <button
            onClick={onOpenBooking}
            className="gold-cta-btn animate-gold-shimmer flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[11px] sm:text-xs tracking-wider uppercase shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer font-['Outfit',sans-serif] text-[#0B1528] font-black"
          >
            <span>BOOK VISIT</span>
            <span className="text-sm leading-none font-black font-sans">↗</span>
          </button>
        </div>

        {/* Main Grid: Left Typography + Right Giant 3D Tooth - Tightened Gap */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 sm:gap-3 lg:gap-6 items-start lg:items-center pt-2 sm:pt-4 relative z-10">
          
          {/* Left Column: Bold Typography & Proof Pills */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: 'spring', damping: 16, stiffness: 180 }}
            style={{ y: textY }}
            className="lg:col-span-6 flex flex-col items-start z-20 space-y-2.5 sm:space-y-3.5 text-left max-w-xl pr-0 lg:pr-1"
          >
            {/* Main Display Headline */}
            <div className="space-y-2 sm:space-y-2.5">
              <motion.h1
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.6, type: 'spring', damping: 14 }}
                className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.08] sm:leading-[1.04] font-['Outfit',sans-serif]"
              >
                Restore <br />
                Your True <br />
                <span className="flex items-center gap-2.5 flex-wrap">
                  <span className="relative text-[#FDE68A] font-black">
                    Smile
                  </span>

                  {/* +2k Patient Avatars Pill Badge */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ type: 'spring', delay: 0.3, damping: 12 }}
                    className="inline-flex items-center bg-white/20 backdrop-blur-md px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/40 shadow-xs select-none -translate-y-0.5"
                  >
                    <div className="flex -space-x-1.5 items-center shrink-0">
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#E65100] border-2 border-white flex items-center justify-center text-[9px] font-black text-white">
                        L
                      </div>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#607D8B] border-2 border-white flex items-center justify-center text-[9px] font-black text-white">
                        P
                      </div>
                      <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#0288D1] border-2 border-white flex items-center justify-center text-[9px] font-black text-white">
                        A
                      </div>
                    </div>
                    <span className="text-[11px] sm:text-xs font-black text-[#FDE68A] ml-2 tracking-wider font-['Outfit',sans-serif] whitespace-nowrap">
                      +2,000 Smiles
                    </span>
                  </motion.div>
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xs sm:text-base text-blue-50 font-medium max-w-md pt-1 leading-relaxed"
              >
                Personalised dental care, focused on what you need.
              </motion.p>
            </div>

            {/* 98% Loyal Dental Patients Card & Malabar Hill Badge */}
            <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.25, type: 'spring', damping: 14 }}
                className="relative bg-white text-[#0F172A] p-3 sm:p-3.5 rounded-[20px] sm:rounded-[26px] shadow-md border border-white flex items-center justify-between sm:justify-start gap-3 group max-w-full sm:max-w-xs"
              >
                <div className="text-left">
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#C58B1B] font-['Outfit',sans-serif] leading-none">
                    98%
                  </div>
                  <div className="text-[10px] sm:text-[11px] font-bold text-slate-500 mt-0.5 leading-tight">
                    loyal dental patients
                  </div>
                </div>

                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center text-amber-700 shrink-0 border border-amber-300/60 shadow-xs">
                  <Heart className="w-5 h-5 fill-amber-500 text-amber-600" />
                </div>
              </motion.div>

              {/* Location Badge Pill */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: 0.35, type: 'spring', damping: 14 }}
                className="bg-white/20 backdrop-blur-md px-3.5 py-2.5 sm:py-3 rounded-[20px] sm:rounded-2xl border border-white/40 text-xs font-semibold text-white space-y-0.5 shadow-xs"
              >
                <div className="text-[#FDE68A] font-black text-[11px] sm:text-xs">
                  Malabar Hill, Mumbai
                </div>
                <div className="text-blue-100 text-[10px] sm:text-[11px] font-medium">
                  Guide Bldg, Gate 2 · Near Priyadarshini Park
                </div>
              </motion.div>
            </div>

            {/* Interactive Worker Message Toast */}
            {activeWorkerTip && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white text-[#0F172A] text-xs px-3.5 py-2 rounded-2xl shadow-lg flex items-center gap-2 border border-amber-300"
              >
                <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
                <span className="font-bold text-[11px] sm:text-xs">{activeWorkerTip}</span>
              </motion.div>
            )}

            {/* Book Appointment CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.2 }}
              transition={{ delay: 0.45, type: 'spring', damping: 14 }}
              className="pt-0 sm:pt-0.5"
            >
              <motion.button
                id="hero-book-appointment-btn"
                onClick={onOpenBooking}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                className="gold-cta-btn animate-gold-shimmer group relative inline-flex items-center justify-center gap-2.5 sm:gap-3 text-xs sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-full transition-all cursor-pointer font-['Outfit',sans-serif] tracking-wider uppercase shadow-md w-full sm:w-auto"
              >
                <span>BOOK YOUR CONSULTATION</span>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-[#0B1528] text-[#FDE68A] flex items-center justify-center group-hover:rotate-45 transition-transform duration-300 shadow-xs shrink-0">
                  <span className="text-sm font-black leading-none">↗</span>
                </div>
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Column: Giant 3D Tooth with Workers on Ladders & Rotating Badge - Tightly paired without gap */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, x: 20 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: 'spring', damping: 16, stiffness: 180, delay: 0.15 }}
            className="lg:col-span-6 relative flex items-start justify-center lg:justify-start pt-0 mt-1 sm:mt-2 lg:mt-0 -ml-0 lg:-ml-3"
          >
            {/* Visual Glass Stage */}
            <div className="relative w-full max-w-md sm:max-w-lg group">
              
              {/* Backlight halo */}
              <div className="absolute inset-0 bg-gradient-to-r from-amber-100/40 via-emerald-100/30 to-sky-100/40 rounded-[36px] filter blur-2xl scale-105 pointer-events-none" />

              {/* The Cinematic Tooth Render Box */}
              <div
                onClick={triggerToothSparkle}
                className="relative cursor-pointer rounded-[28px] sm:rounded-[36px] overflow-hidden border border-slate-200 shadow-xl bg-slate-100 transition-transform duration-500 group-hover:scale-[1.01]"
              >
                <img
                  src={CLINIC_IMAGES.heroToothWorkers}
                  alt="Dental specialists polishing giant 3D porcelain molar tooth"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  decoding="async"
                  fetchPriority="high"
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />

                {/* Sparkling layer on tap */}
                {toothShine && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1.1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-radial from-white/80 via-transparent to-transparent pointer-events-none flex items-center justify-center"
                  >
                    <Sparkles className="w-20 h-20 text-amber-500 animate-spin" />
                  </motion.div>
                )}

                {/* Worker Hotspots */}
                <button
                  id="worker-polisher-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWorkerClick("Specialist 1: High-gloss diamond polishing active! ✨");
                  }}
                  className="absolute top-[26%] right-[18%] flex items-center gap-1 bg-white/95 hover:bg-white text-[#0F172A] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer font-['Outfit',sans-serif] border border-slate-200"
                  title="Tap specialist"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                  <span>Diamond Polish</span>
                </button>

                <button
                  id="worker-mist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWorkerClick("Specialist 2: Gentle hydro-mist spray active! 💧");
                  }}
                  className="absolute top-[46%] left-[16%] flex items-center gap-1 bg-white/95 hover:bg-white text-[#0F172A] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer font-['Outfit',sans-serif] border border-slate-200"
                  title="Tap specialist"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Hydro-Mist</span>
                </button>

                <button
                  id="worker-scaffold-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWorkerClick("Specialist 3: Zirconia porcelain strength checked at 100%! 🛡️");
                  }}
                  className="absolute bottom-[24%] left-[26%] flex items-center gap-1 bg-white/95 hover:bg-white text-[#0F172A] px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full text-[10px] sm:text-[11px] font-black shadow-md transition-all hover:scale-110 active:scale-95 cursor-pointer font-['Outfit',sans-serif] border border-slate-200"
                  title="Tap specialist"
                >
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                  <span>Enamel Check</span>
                </button>
              </div>

              {/* Rotating Stamp Badge */}
              <motion.div
                onClick={onOpenBooking}
                whileHover={{ scale: 1.1, rotate: 15 }}
                whileTap={{ scale: 0.92 }}
                className="absolute -bottom-4 -right-2 sm:-bottom-8 sm:right-4 w-24 h-24 sm:w-36 sm:h-36 rounded-full bg-white text-[#0F172A] p-1.5 sm:p-2 flex items-center justify-center shadow-[0_15px_35px_rgba(15,23,42,0.12)] cursor-pointer border-2 sm:border-3 border-amber-300 z-30"
              >
                <div className="relative w-full h-full flex items-center justify-center">
                  <svg className="w-full h-full animate-[spin_10s_linear_infinite]" viewBox="0 0 100 100">
                    <path
                      id="heroCirclePath"
                      d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                      fill="none"
                    />
                    <text className="text-[9.5px] font-black uppercase tracking-[0.2em] fill-[#C58B1B]">
                      <textPath href="#heroCirclePath" startOffset="0%">
                        • BOOK YOUR CONSULTATION •
                      </textPath>
                    </text>
                  </svg>
                  <div className="absolute inset-0 m-auto w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-r from-[#DFAC38] to-[#FDE68A] text-[#0B1528] flex items-center justify-center shadow-md">
                    <span className="text-sm sm:text-lg font-black leading-none">↗</span>
                  </div>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>

      </div>

      {/* Subtle bottom guide */}
      <div className="text-center pt-5 sm:pt-8 pb-2 pointer-events-none">
        <span className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-slate-600 font-bold uppercase tracking-widest bg-white/95 backdrop-blur-md px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-full border border-slate-200 shadow-sm font-['Outfit',sans-serif]">
          Scroll to explore interactive care ↓
        </span>
      </div>

    </section>
  );
};
