import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, X, Award, MapPin, Phone, Star, CheckCircle2, ShieldCheck, Heart } from 'lucide-react';
import { CLINIC_IMAGES, CLINIC_DETAILS } from '../data/clinicData';
import { playPop, playSoftClick, playSparkle } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

interface DoctorSectionProps {
  onOpenBooking: () => void;
}

export const DoctorSection: React.FC<DoctorSectionProps> = ({ onOpenBooking }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Lock body scroll when modal is open to prevent page bleed and scroll glitches
  useEffect(() => {
    if (isExpanded) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isExpanded]);

  const handleOpen = () => {
    playPop();
    setIsExpanded(true);
  };

  const handleClose = () => {
    playSoftClick();
    setIsExpanded(false);
  };

  return (
    <section id="doctor" className="relative py-10 sm:py-16 px-3 sm:px-6 lg:px-8 overflow-visible z-10">
      
      {/* Background Soft Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] h-[520px] bg-gradient-to-tr from-[#415A77]/20 via-[#778D7A]/15 to-[#415A77]/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center rounded-[32px] sm:rounded-[40px] border-2 border-[#293549] bg-white/40 backdrop-blur-xs p-6 sm:p-10 shadow-xs">
        
        {/* Section Header with bouncy pop-in card header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="mb-6 sm:mb-8 inline-block"
        >
          <PopBadge className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#293549] bg-amber-100 px-3.5 py-1.5 rounded-full shadow-xs font-['Outfit',sans-serif] border border-amber-300/60">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              LEAD CLINICIAN
            </span>
          </PopBadge>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#293549] font-['Outfit',sans-serif] tracking-tight">
            Personal Care by <span className="text-[#C58B1B] font-black">Dr. Deepal Shah</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto mt-2 leading-relaxed">
            Every procedure is personally sculpted and performed with gentle precision in Malabar Hill.
          </p>
        </motion.div>

        {/* The Interactive Pill Container (Stable DOM layout) */}
        <div className="py-4 flex flex-col items-center justify-center">
          
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            whileInView={{ scale: 1, opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.2 }}
            animate={{
              y: [0, -6, 0]
            }}
            transition={{
              y: { repeat: Infinity, duration: 4.5, ease: 'easeInOut' },
              scale: { type: 'spring', damping: 12, stiffness: 180 }
            }}
            className="relative group cursor-pointer select-none"
            onClick={handleOpen}
          >
            {/* The Spec Pill with Bouncy Pop-In & Specular Surface Shine */}
            <motion.button
              id="meet-dr-deepal-pill"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="gold-cta-btn animate-gold-shimmer relative min-w-[240px] h-[60px] text-[#0B1528] rounded-full px-5 shadow-md flex items-center justify-between gap-3 transition-all font-['Outfit',sans-serif] z-10 cursor-pointer"
            >
              {/* Left: Small dark Accent Dot with subtle pulse */}
              <div className="relative flex items-center justify-center shrink-0">
                <span className="w-3.5 h-3.5 rounded-full bg-[#0B1528] border border-amber-200 shadow-xs" />
                <span className="absolute w-3.5 h-3.5 rounded-full bg-[#0B1528] animate-ping opacity-50" />
              </div>

              {/* Center Text: MEET DR. DEEPAL SHAH */}
              <span className="text-[12px] font-black tracking-wider text-[#0B1528] whitespace-nowrap">
                MEET DR. DEEPAL SHAH
              </span>

              {/* Right: Arrow Icon */}
              <div className="w-8 h-8 rounded-full bg-[#0B1528] text-amber-300 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-all duration-200 shadow-xs">
                <ArrowRight className="w-4 h-4 text-amber-300 stroke-[2.5]" />
              </div>
            </motion.button>
            
            {/* Helper Text */}
            <span className="block text-center text-[10px] uppercase font-black tracking-widest text-[#C58B1B] mt-3">
              Click to open profile ✨
            </span>
          </motion.div>

          {/* Quick Doctor Badges Grid below pill */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5 max-w-lg mx-auto">
            <motion.span
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 12, stiffness: 260 }}
              className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 text-[11px] font-black text-[#0F172A] shadow-xs font-['Outfit',sans-serif] cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>21 Years Clinical Mastery</span>
            </motion.span>

            <motion.span
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 12, stiffness: 260 }}
              className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 text-[11px] font-black text-[#0F172A] shadow-xs font-['Outfit',sans-serif] cursor-pointer"
            >
              <Star className="w-3.5 h-3.5 fill-[#DFAC38] text-[#C58B1B]" />
              <span>5.0 Star Rated Care</span>
            </motion.span>

            <motion.span
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', damping: 12, stiffness: 260 }}
              className="inline-flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-full border border-slate-200 text-[11px] font-black text-[#0F172A] shadow-xs font-['Outfit',sans-serif] cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Gentle & Pain-Free</span>
            </motion.span>
          </div>

        </div>

      </div>

      {/* EXPANDED MODAL OVERLAY RENDERED IN PORTAL TO PREVENT ANY OVERLAP/SCROLL GLITCH */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isExpanded && (
              <div
                id="doctor-profile-modal-portal"
                className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
                style={{ isolation: 'isolate' }}
              >
                {/* Opaque backdrop */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  onClick={handleClose}
                  className="fixed inset-0 bg-slate-900/50 backdrop-blur-md cursor-pointer z-[99998]"
                />

                {/* Modal Card with Bouncy Spring Pop-In */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  exit={{ scale: 0.8, opacity: 0, y: 30 }}
                  transition={{
                    type: 'spring',
                    damping: 18,
                    stiffness: 280,
                  }}
                  className="relative w-full max-w-lg bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-8 shadow-[0_30px_90px_rgba(15,23,42,0.18)] border-2 border-[#293549] overflow-hidden z-[99999] text-left my-auto text-[#293549]"
                >
                  {/* Top Gradient Ribbon */}
                  <div className="absolute top-0 inset-x-0 h-2.5 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-300" />

                  {/* Close Button with Pop-In */}
                  <motion.button
                    id="close-dr-deepal-panel"
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                    onClick={handleClose}
                    className="absolute top-4 right-4 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer shadow-xs z-30 border border-slate-200"
                    title="Close Profile"
                  >
                    <X className="w-5 h-5" />
                  </motion.button>

                  <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-2">
                    
                    {/* Doctor Portrait */}
                    <div className="w-28 sm:w-36 aspect-[3/4] rounded-[24px] overflow-hidden bg-slate-100 border-2 border-amber-300 shadow-md shrink-0 relative">
                      <img
                        src={CLINIC_IMAGES.drDeepalPortrait}
                        alt="Dr. Deepal Shah - Lead Clinician at Malabar Hill"
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-1.5 left-1.5 right-1.5 bg-[#0D1B2A] text-white text-[9px] font-black text-center py-0.5 rounded-md font-['Outfit',sans-serif] border border-amber-300/40">
                        MALABAR HILL
                      </div>
                    </div>

                    {/* Doctor Details */}
                    <div className="flex-1 space-y-3 text-center sm:text-left">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#0F172A] bg-amber-100 px-3 py-1 rounded-full inline-block mb-1 shadow-xs font-['Outfit',sans-serif] border border-amber-300/60">
                          Dentist & Lead Clinician
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-[#0F172A] font-['Outfit',sans-serif] leading-tight">
                          Dr. Deepal Shah
                        </h3>
                        <p className="text-xs font-bold text-[#C58B1B] flex items-center justify-center sm:justify-start gap-1 mt-0.5">
                          <MapPin className="w-3.5 h-3.5 text-[#C58B1B]" />
                          Malabar Hill, Mumbai
                        </p>
                      </div>

                      {/* Description */}
                      <p className="text-xs text-slate-600 leading-relaxed font-medium">
                        Focused on gentle, pain-free dentistry and preserving natural tooth vitality through modern aesthetic techniques and unhurried personal care.
                      </p>

                      {/* Credentials List */}
                      <div className="flex flex-wrap gap-1.5 pt-1 justify-center sm:justify-start font-['Outfit',sans-serif]">
                        <span className="text-[10px] font-black text-[#0F172A] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                          MDS Prosthodontics
                        </span>
                        <span className="text-[10px] font-black text-[#0F172A] bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg">
                          21 Years Clinical Practice
                        </span>
                        <span className="text-[10px] font-black text-[#0B1528] bg-amber-200/80 px-2.5 py-1 rounded-lg border border-amber-300">
                          Zero-Pain Protocol
                        </span>
                      </div>

                      {/* Actions with bouncy pop-in */}
                      <div className="pt-3 flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                        <motion.button
                          id="doctor-modal-book-btn"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                          onClick={() => {
                            handleClose();
                            playSparkle();
                            onOpenBooking();
                          }}
                          className="gold-cta-btn animate-gold-shimmer text-xs sm:text-sm px-6 py-3 rounded-full shadow-xl font-['Outfit',sans-serif] flex items-center gap-2 cursor-pointer uppercase tracking-wider"
                        >
                          <Sparkles className="w-4 h-4 text-[#0B1528]" />
                          <span>Book Consultation</span>
                          <span className="text-sm font-black font-sans">↗</span>
                        </motion.button>

                        <motion.a
                          id="doctor-modal-call-btn"
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                          href={`tel:${CLINIC_DETAILS.phoneClean}`}
                          className="bg-slate-100 hover:bg-slate-200 text-[#0F172A] font-bold text-xs px-4 py-3 rounded-full border border-slate-200 transition-all flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-amber-600" />
                          <span>Call Clinic</span>
                        </motion.a>
                      </div>
                    </div>

                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        )}

    </section>
  );
};
