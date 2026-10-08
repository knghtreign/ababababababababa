import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, RefreshCw } from 'lucide-react';
import { TREATMENTS } from '../data/clinicData';
import { TreatmentType } from '../types';
import { playSparkle, playPop, playSoftClick } from '../utils/soundEffects';

interface InteractiveToothStageProps {
  onSelectTreatmentForBooking: (treatmentName: string) => void;
}

export const InteractiveToothStage: React.FC<InteractiveToothStageProps> = ({
  onSelectTreatmentForBooking,
}) => {
  const [selectedTreatment, setSelectedTreatment] = useState<TreatmentType>('whitening');
  const [animKey, setAnimKey] = useState(0);

  const currentInfo = TREATMENTS.find((t) => t.id === selectedTreatment) || TREATMENTS[0];

  const handleSelectTreatment = (id: TreatmentType) => {
    if (id !== selectedTreatment) {
      setSelectedTreatment(id);
      setAnimKey((prev) => prev + 1);
      playPop();
      if (id === 'whitening' || id === 'cleaning' || id === 'veneers') {
        setTimeout(() => playSparkle(), 340);
      }
    }
  };

  const handleReplay = () => {
    setAnimKey((prev) => prev + 1);
    playPop();
    setTimeout(() => playSparkle(), 280);
  };

  return (
    <section id="interactive-stage" className="relative py-12 sm:py-20 px-3 sm:px-6 lg:px-8 overflow-hidden z-10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[750px] bg-[#415A77]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Section Title Matching Reference Image */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center max-w-2xl mx-auto mb-6 sm:mb-9"
        >
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FEF3C7] border border-[#FDE68A] text-[11px] sm:text-xs font-black uppercase text-[#0F172A] tracking-wider mb-3.5 shadow-2xs font-['Outfit',sans-serif]">
            <span className="text-amber-600 font-black">⚡</span>
            <span>INTERACTIVE DENTAL SIMULATION</span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0F172A] font-['Outfit',sans-serif] tracking-tight leading-tight">
            Watch How We <span className="text-[#DFAC38]">Transform</span> You
          </h2>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2 max-w-xl mx-auto leading-relaxed">
            Select any treatment below to preview the microscopic care and real-time enamel restoration.
          </p>
        </motion.div>

        {/* Treatment Selector Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 14, stiffness: 180 }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6 sm:mb-8"
        >
          {TREATMENTS.map((treatment) => {
            const isSelected = selectedTreatment === treatment.id;
            return (
              <motion.button
                key={treatment.id}
                id={`treatment-tab-${treatment.id}`}
                onClick={() => handleSelectTreatment(treatment.id)}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                animate={{
                  scale: isSelected ? 1.03 : 0.97,
                }}
                transition={{ type: 'spring', damping: 14, stiffness: 180 }}
                className={`relative px-4 sm:px-6 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-black tracking-wider transition-all duration-300 font-['Outfit',sans-serif] cursor-pointer select-none border uppercase ${
                  isSelected
                    ? 'gold-cta-btn animate-gold-shimmer shadow-lg border-amber-400 z-10 text-[#0B1528]'
                    : 'bg-[#293549] text-white hover:bg-[#34445d] border border-white/20 shadow-xs'
                }`}
              >
                <span className="flex items-center gap-2">
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#0B1528] animate-pulse" />}
                  <span>{treatment.name}</span>
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Central Visual Stage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.15, type: 'spring', damping: 16, stiffness: 200 }}
          className="relative bg-[#293549] rounded-[28px] sm:rounded-[44px] border-2 border-[#293549] shadow-[0_20px_60px_rgba(15,25,40,0.22)] p-3 sm:p-6 lg:p-8 overflow-hidden text-white"
        >
          {/* Inner Clean White Simulation Canvas (matching reference screenshot) */}
          <div className="relative rounded-[22px] sm:rounded-[36px] overflow-hidden bg-white border border-slate-200/90 shadow-xs min-h-[390px] sm:min-h-[480px] md:min-h-[520px] flex items-center justify-center p-4 sm:p-8">
            
            {/* Replay Demo Button at Top Right */}
            <button
              id="replay-demo-btn"
              onClick={handleReplay}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-1.5 bg-white/95 hover:bg-slate-50 text-slate-700 hover:text-slate-900 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold border border-slate-200/90 shadow-xs transition-all cursor-pointer hover:scale-105 active:scale-95 font-['Outfit',sans-serif] z-20 select-none"
              title="Replay animation"
            >
              <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
              <span>Replay Demo</span>
            </button>

            {/* Interactive Animated SVG Simulation matching the screenshot */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${selectedTreatment}-${animKey}`}
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.04 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="w-full flex items-center justify-center py-6 select-none"
              >
                {selectedTreatment === 'whitening' && <WhiteningToothSimulation />}
                {selectedTreatment === 'veneers' && <VeneersToothSimulation />}
                {selectedTreatment === 'implants' && <ImplantsToothSimulation />}
                {selectedTreatment === 'rootcanal' && <RootCanalToothSimulation />}
                {selectedTreatment === 'cleaning' && <CleaningToothSimulation />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Treatment Description & Action Footer Below Canvas */}
          <div className="mt-5 sm:mt-6 pt-5 border-t border-white/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1 text-left max-w-xl">
              <span className="text-[11px] sm:text-xs font-black text-[#FDE68A] uppercase tracking-wider font-['Outfit',sans-serif] block">
                {currentInfo.badge} · {currentInfo.duration}
              </span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white font-['Outfit',sans-serif]">
                {currentInfo.tagline}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 font-medium leading-relaxed pt-0.5">
                {currentInfo.shortDesc}
              </p>
            </div>

            {/* Direct Booking CTA */}
            <motion.button
              id="book-this-treatment-btn"
              onClick={() => onSelectTreatmentForBooking(currentInfo.name)}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="inline-flex items-center justify-center gap-2 gold-cta-btn animate-gold-shimmer text-xs sm:text-sm px-6 sm:px-8 py-3.5 sm:py-4 rounded-full shadow-xl transition-all shrink-0 font-['Outfit',sans-serif] cursor-pointer tracking-wider uppercase text-[#0B1528] font-black w-full sm:w-auto"
            >
              <Sparkles className="w-4 h-4 text-[#0B1528]" />
              <span>Book {currentInfo.name} Visit</span>
              <span className="text-base font-black">↗</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* =========================================================================
   COMMON EXACT TOOTH PATH & DIMENSIONS (Matching the reference screenshot)
   - Plump rounded top with gentle center dip.
   - Smooth curved shoulders and gently tapering flanks.
   - Dual rounded blunt roots with arched bifurcation valley in the center.
   ========================================================================= */
const TOOTH_PATH = `M 130,48 C 114,38 92,34 76,46 C 60,56 48,78 46,110 C 44,142 48,178 52,204 C 54,228 58,252 68,266 C 76,278 88,276 96,260 C 108,236 116,198 130,198 C 144,198 152,236 164,260 C 172,276 184,278 192,266 C 202,252 206,228 208,204 C 212,178 216,142 214,110 C 212,78 200,56 184,46 C 168,34 146,38 130,48 Z`;

/* Reusable Specular Gloss Highlight Bar on Upper Right Flank */
const ToothSpecularHighlight: React.FC<{ delay?: number }> = ({ delay = 0.5 }) => (
  <motion.rect
    x="184"
    y="90"
    width="5.5"
    height="42"
    rx="3"
    fill="#FFFFFF"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.92 }}
    transition={{ delay, duration: 0.6 }}
  />
);

/* Reusable 4-Point Star Sparkles (Exact match with reference screenshot) */
const ToothSparkleStars: React.FC<{ delay?: number }> = ({ delay = 0.6 }) => (
  <>
    {/* 4-Point Golden Star: Top Right */}
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: -15 }}
      animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.95], rotate: [0, 8, 0] }}
      transition={{ delay, duration: 0.65, ease: 'easeOut' }}
      className="absolute top-4 right-10 sm:top-6 sm:right-14 pointer-events-none"
    >
      <svg className="w-10 h-10 overflow-visible" viewBox="0 0 32 32">
        <path
          d="M 16,3 C 16.6,10 20,13.4 27,14 C 20,14.6 16.6,18 16,25 C 15.4,18 12,14.6 5,14 C 12,13.4 15.4,10 16,3 Z"
          fill="none"
          stroke="#E6BF68"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <circle cx="28" cy="6" r="1.5" fill="#E6BF68" />
      </svg>
    </motion.div>

    {/* 4-Point Mint-Teal Star: Bottom Left */}
    <motion.div
      initial={{ scale: 0, opacity: 0, rotate: 15 }}
      animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.9], rotate: [0, -10, 0] }}
      transition={{ delay: delay + 0.18, duration: 0.65, ease: 'easeOut' }}
      className="absolute bottom-16 left-10 sm:bottom-20 sm:left-14 pointer-events-none"
    >
      <svg className="w-9 h-9 overflow-visible" viewBox="0 0 32 32">
        <path
          d="M 16,3 C 16.6,10 20,13.4 27,14 C 20,14.6 16.6,18 16,25 C 15.4,18 12,14.6 5,14 C 12,13.4 15.4,10 16,3 Z"
          fill="none"
          stroke="#5EEAD4"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="25" r="1.5" fill="#5EEAD4" />
      </svg>
    </motion.div>
  </>
);

/* =========================================================================
   1. WHITENING TOOTH SIMULATION (Exact 1:1 match with user screenshot)
   ========================================================================= */
const WhiteningToothSimulation: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-72 sm:w-84 h-72 sm:h-84">
      <ToothSparkleStars delay={0.45} />

      <svg viewBox="0 0 260 290" className="w-56 sm:w-68 h-64 sm:h-76 overflow-visible">
        <defs>
          {/* Reference Image Vertical Shading Gradient: Pure white top -> Soft warm cream roots */}
          <linearGradient id="whitenedToothRefGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FFFFFF" />
            <stop offset="70%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#F8E8C0" />
          </linearGradient>

          {/* Whitening Laser Wave Sweep */}
          <linearGradient id="laserBeamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="50%" stopColor="#FEF08A" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Tooth Silhouette - Transitions smoothly to radiant white */}
        <motion.path
          d={TOOTH_PATH}
          initial={{ fill: '#F5E6BF', stroke: '#DFC896' }}
          animate={{
            fill: ['#F5E6BF', '#FFFDF5', 'url(#whitenedToothRefGrad)'],
            stroke: ['#DFC896', '#EAD9B0', '#F1E3C3'],
          }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Dynamic Light Sweep Bar gliding across enamel */}
        <motion.rect
          x="30"
          y="40"
          width="42"
          height="240"
          fill="url(#laserBeamGrad)"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 230, opacity: [0, 0.75, 0] }}
          transition={{ duration: 1.1, ease: 'easeInOut' }}
          className="pointer-events-none"
        />

        {/* Specular Highlight Pill */}
        <ToothSpecularHighlight delay={0.65} />
      </svg>
    </div>
  );
};

/* =========================================================================
   2. VENEERS TOOTH SIMULATION (Exact silhouette & dimensions from reference)
   ========================================================================= */
const VeneersToothSimulation: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-72 sm:w-84 h-72 sm:h-84">
      <ToothSparkleStars delay={0.8} />

      <svg viewBox="0 0 260 290" className="w-56 sm:w-68 h-64 sm:h-76 overflow-visible">
        <defs>
          <linearGradient id="veneerToothBase" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFDF7" />
            <stop offset="60%" stopColor="#FBF4E2" />
            <stop offset="100%" stopColor="#F8E8C0" />
          </linearGradient>

          <linearGradient id="veneerFacingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#FAF1D8" />
          </linearGradient>
        </defs>

        {/* 1. Underlying Natural Tooth (Identical TOOTH_PATH) */}
        <path
          d={TOOTH_PATH}
          fill="url(#veneerToothBase)"
          stroke="#DFC896"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* 2. Porcelain Veneer Shell - Smoothly descends onto the front smile face */}
        <motion.path
          d="M 130,48 C 114,38 92,34 76,46 C 60,56 48,78 46,110 C 44,142 48,178 52,204 C 80,214 180,214 208,204 C 212,178 216,142 214,110 C 212,78 200,56 184,46 C 168,34 146,38 130,48 Z"
          fill="url(#veneerFacingGrad)"
          stroke="#F1E3C3"
          strokeWidth="3.2"
          strokeLinejoin="round"
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: 'spring', damping: 16, stiffness: 150 }}
        />

        {/* 3. Distinct Veneer Margin Contour Line */}
        <motion.path
          d="M 52,204 C 80,214 180,214 208,204"
          stroke="#DFC896"
          strokeWidth="2.6"
          strokeLinecap="round"
          fill="none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        />

        {/* 4. Specular Highlight */}
        <ToothSpecularHighlight delay={0.7} />

        {/* 5. Curing Light Flash Glow */}
        <motion.circle
          cx="130"
          cy="204"
          r="20"
          fill="#FEF08A"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: [0, 1.8, 0], opacity: [0, 0.85, 0] }}
          transition={{ delay: 0.68, duration: 0.55 }}
        />
      </svg>
    </div>
  );
};

/* =========================================================================
   3. IMPLANTS TOOTH SIMULATION
   - Uses the EXACT crown shape & size of the reference tooth!
   - Root is replaced by a precision medical titanium screw fixture.
   - Titanium fixture + Golden abutment collar + Anatomical crown lock together!
   ========================================================================= */
const ImplantsToothSimulation: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-72 sm:w-84 h-72 sm:h-84">
      <ToothSparkleStars delay={0.9} />

      <svg viewBox="0 0 260 290" className="w-56 sm:w-68 h-64 sm:h-76 overflow-visible">
        <defs>
          {/* Porcelain Crown Gradient matching reference tooth crown */}
          <linearGradient id="implantCrownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="85%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#F8E8C0" />
          </linearGradient>

          {/* Golden Abutment Collar Gradient */}
          <linearGradient id="abutmentGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C98616" />
            <stop offset="25%" stopColor="#F5C842" />
            <stop offset="50%" stopColor="#FEF08A" />
            <stop offset="75%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>

          {/* Machined Titanium Screw Gradient */}
          <linearGradient id="screwGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="25%" stopColor="#94A3B8" />
            <stop offset="50%" stopColor="#F1F5F9" />
            <stop offset="75%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>

        {/* 1. Titanium Threaded Screw Root Fixture (anchored in root space) */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.65, type: 'spring', damping: 15 }}
        >
          {/* Screw Flanged Ridges */}
          <path d="M 96,166 L 164,166 L 159,180 L 101,180 Z" fill="url(#screwGrad)" stroke="#475569" strokeWidth="1.4" />
          <path d="M 100,182 L 160,182 L 155,196 L 105,196 Z" fill="url(#screwGrad)" stroke="#475569" strokeWidth="1.4" />
          <path d="M 104,198 L 156,198 L 151,212 L 109,212 Z" fill="url(#screwGrad)" stroke="#475569" strokeWidth="1.4" />
          <path d="M 108,214 L 152,214 L 147,228 L 113,228 Z" fill="url(#screwGrad)" stroke="#475569" strokeWidth="1.4" />
          <path d="M 112,230 L 148,230 L 143,244 L 117,244 Z" fill="url(#screwGrad)" stroke="#475569" strokeWidth="1.4" />
          {/* Tapered Apex Tip */}
          <path d="M 118,246 L 142,246 L 133,266 L 127,266 Z" fill="url(#screwGrad)" stroke="#475569" strokeWidth="1.4" />

          {/* Specular Titanium Reflection Line */}
          <line x1="128" y1="168" x2="128" y2="262" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.7" />
        </motion.g>

        {/* 2. Golden Metallic Abutment Collar */}
        <motion.g
          initial={{ scaleX: 0.75, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5, type: 'spring' }}
        >
          <rect
            x="92"
            y="146"
            width="76"
            height="18"
            rx="4"
            fill="url(#abutmentGrad)"
            stroke="#854D0E"
            strokeWidth="1.4"
          />
          <line x1="94" y1="155" x2="166" y2="155" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.6" />
        </motion.g>

        {/* 3. Upper Anatomical Crown - EXACT match to TOOTH_PATH crown contours & size */}
        <motion.path
          d="M 130,48 C 114,38 92,34 76,46 C 60,56 48,78 46,110 C 44,126 48,138 58,146 L 202,146 C 212,138 216,126 214,110 C 212,78 200,56 184,46 C 168,34 146,38 130,48 Z"
          fill="url(#implantCrownGrad)"
          stroke="#F1E3C3"
          strokeWidth="3.2"
          strokeLinejoin="round"
          initial={{ y: -50, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ delay: 0.45, duration: 0.75, type: 'spring', damping: 15 }}
        />

        {/* Anatomical Center Sulcus Groove */}
        <motion.path
          d="M 130,50 C 130,68 130,95 130,120"
          stroke="#F1E3C3"
          strokeWidth="2.2"
          strokeLinecap="round"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 0.75, duration: 0.3 }}
        />

        {/* Specular Highlight */}
        <ToothSpecularHighlight delay={0.75} />
      </svg>
    </div>
  );
};

/* =========================================================================
   4. ROOT CANAL TOOTH SIMULATION (Smooth, Bug-Free, Medical-Grade Animation)
   - Base tooth is the EXACT same TOOTH_PATH and dimensions!
   - Shows dual root canals aligning with the actual roots.
   - 1: Sensitive inflamed pulp glow (visualizing toothache).
   - 2: Soothing rotary micro-laser file clears infection cleanly.
   - 3: Golden biocompatible gutta-percha smoothly seals channels.
   - 4: Restorative ceramic core locks the crown with radiant health!
   ========================================================================= */
const RootCanalToothSimulation: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-72 sm:w-84 h-72 sm:h-84">
      <ToothSparkleStars delay={2.1} />

      <svg viewBox="0 0 260 290" className="w-56 sm:w-68 h-64 sm:h-76 overflow-visible">
        <defs>
          {/* Luminous Tooth Gradient */}
          <linearGradient id="rcToothGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#F8E8C0" />
          </linearGradient>

          {/* Smooth clip mask to keep internal canal animation pristine */}
          <clipPath id="toothInteriorClip">
            <path d={TOOTH_PATH} />
          </clipPath>
        </defs>

        {/* 1. Base Tooth Body (Exact TOOTH_PATH) */}
        <path
          d={TOOTH_PATH}
          fill="url(#rcToothGrad)"
          stroke="#F1E3C3"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* Group clipped to inside the tooth */}
        <g clipPath="url(#toothInteriorClip)">
          {/* 2. Natural Pulp Chamber Background Channel */}
          {/* Left Root Canal Conduit */}
          <path
            d="M 130,105 C 122,112 102,145 96,175 C 90,205 82,238 82,266"
            stroke="#FEF3C7"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right Root Canal Conduit */}
          <path
            d="M 130,105 C 138,112 158,145 164,175 C 170,205 178,238 178,266"
            stroke="#FEF3C7"
            strokeWidth="9"
            strokeLinecap="round"
            fill="none"
          />
          {/* Central Coronal Chamber Conduit */}
          <circle cx="130" cy="105" r="14" fill="#FEF3C7" />

          {/* 3. Initial Inflammation / Toothache Nerve Sensitivity Glow (Fades out gently) */}
          <motion.g
            initial={{ opacity: 0.9 }}
            animate={{ opacity: [0.9, 0.9, 0] }}
            transition={{ duration: 1.5, times: [0, 0.45, 1], ease: 'easeOut' }}
          >
            <circle cx="130" cy="105" r="16" fill="#F87171" opacity="0.65" />
            <path
              d="M 130,105 C 122,112 102,145 96,175 C 90,205 82,238 82,266"
              stroke="#EF4444"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
            <path
              d="M 130,105 C 138,112 158,145 164,175 C 170,205 178,238 178,266"
              stroke="#EF4444"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
              opacity="0.75"
            />
          </motion.g>

          {/* 4. Micro-Rotary Soothing Laser / Ultrasonic Disinfection Stream */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ duration: 1.4, times: [0, 0.2, 0.8, 1], delay: 0.2 }}
          >
            {/* Soothing green/teal therapeutic wave traveling down */}
            <motion.path
              d="M 130,105 C 122,112 102,145 96,175 C 90,205 82,238 82,266"
              stroke="#10B981"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 0.9, delay: 0.2, ease: 'easeInOut' }}
            />
            <motion.path
              d="M 130,105 C 138,112 158,145 164,175 C 170,205 178,238 178,266"
              stroke="#10B981"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: [0, 1] }}
              transition={{ duration: 0.9, delay: 0.25, ease: 'easeInOut' }}
            />
          </motion.g>

          {/* 5. Golden Gutta-Percha Biocompatible Sealant Filling Canals from apex upwards */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.3 }}
          >
            {/* Left Canal Fill */}
            <motion.path
              d="M 82,266 C 82,238 90,205 96,175 C 102,145 122,112 130,105"
              stroke="#DFAC38"
              strokeWidth="6.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.15, duration: 0.85, ease: 'easeOut' }}
            />
            {/* Right Canal Fill */}
            <motion.path
              d="M 178,266 C 178,238 170,205 164,175 C 158,145 138,112 130,105"
              stroke="#DFAC38"
              strokeWidth="6.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.2, duration: 0.85, ease: 'easeOut' }}
            />
            {/* Chamber Core Seal */}
            <motion.circle
              cx="130"
              cy="105"
              r="12"
              fill="#DFAC38"
              stroke="#FFF6D0"
              strokeWidth="2"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1.85, duration: 0.45, type: 'spring' }}
            />
          </motion.g>

          {/* 6. Enamel Restorative Glow Flash across the tooth */}
          <motion.rect
            x="30"
            y="40"
            width="35"
            height="240"
            fill="#FFFFFF"
            opacity="0"
            initial={{ x: -20 }}
            animate={{ x: 230, opacity: [0, 0.7, 0] }}
            transition={{ delay: 1.95, duration: 0.8, ease: 'easeInOut' }}
          />
        </g>

        {/* Specular Highlight Pill */}
        <ToothSpecularHighlight delay={2.0} />
      </svg>
    </div>
  );
};

/* =========================================================================
   5. CLEANING TOOTH SIMULATION (Silky-Smooth, Realistic Ultrasonic Hydro-Care)
   - Base tooth is the EXACT same TOOTH_PATH and dimensions!
   - Natural organic tea/coffee stains along the cervical margin.
   - Polished ultrasonic handpiece scaler tip glides with micro-vibrations.
   - Gentle hydro-mist spray washes over enamel, dissolving stains in real time.
   - Enamel turns gleaming white with mirror shine & stars!
   - 100% bug-free: no floating blue sticks, no arbitrary shrinking circles.
   ========================================================================= */
const CleaningToothSimulation: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center w-72 sm:w-84 h-72 sm:h-84">
      <ToothSparkleStars delay={1.9} />

      <svg viewBox="0 0 260 290" className="w-56 sm:w-68 h-64 sm:h-76 overflow-visible">
        <defs>
          {/* Gleaming Cleaned Tooth Gradient */}
          <linearGradient id="cleanedToothGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#FFFFFF" />
            <stop offset="75%" stopColor="#FFFDF7" />
            <stop offset="100%" stopColor="#F8E8C0" />
          </linearGradient>

          {/* Organic Tea/Plaque Stain Gradient */}
          <radialGradient id="plaqueStainGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#C48227" stopOpacity="0.75" />
            <stop offset="50%" stopColor="#D97706" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
          </radialGradient>

          {/* Hydro-Mist Conical Spray Gradient */}
          <linearGradient id="hydroMistCone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.7" />
            <stop offset="60%" stopColor="#7DD3FC" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0" />
          </linearGradient>

          {/* Interior Clip Path */}
          <clipPath id="cleaningToothClip">
            <path d={TOOTH_PATH} />
          </clipPath>
        </defs>

        {/* 1. Base Tooth (Exact TOOTH_PATH) */}
        <path
          d={TOOTH_PATH}
          fill="url(#cleanedToothGrad)"
          stroke="#F1E3C3"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />

        {/* 2. Natural Surface Stains (Clipped to tooth interior) */}
        <g clipPath="url(#cleaningToothClip)">
          {/* Initial Warm Plaque/Tarter Tint over Enamel (Dissolves as scaler passes) */}
          <motion.path
            d={TOOTH_PATH}
            fill="#FEF3C7"
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: 'easeOut' }}
          />

          {/* Organic Stain Band 1: Upper Right Enamel Flank */}
          <motion.ellipse
            cx="160"
            cy="115"
            rx="24"
            ry="14"
            fill="url(#plaqueStainGrad)"
            initial={{ opacity: 0.85 }}
            animate={{ opacity: [0.85, 0.85, 0], scale: [1, 1, 0.2] }}
            transition={{ duration: 1.2, times: [0, 0.4, 1] }}
          />

          {/* Organic Stain Band 2: Center-Left Enamel Groove */}
          <motion.ellipse
            cx="105"
            cy="135"
            rx="26"
            ry="16"
            fill="url(#plaqueStainGrad)"
            initial={{ opacity: 0.85 }}
            animate={{ opacity: [0.85, 0.85, 0], scale: [1, 1, 0.2] }}
            transition={{ duration: 1.5, times: [0, 0.5, 1] }}
          />

          {/* Organic Stain Band 3: Cervical Gumline Margin */}
          <motion.path
            d="M 68,188 C 95,202 165,202 192,188 C 175,208 85,208 68,188 Z"
            fill="#B45309"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.7, 0.7, 0], scale: [1, 1, 0.3] }}
            transition={{ duration: 1.7, times: [0, 0.6, 1] }}
          />
        </g>

        {/* 3. Ultrasonic Scaler Handpiece Instrument (Glides smoothly across tooth) */}
        <motion.g
          initial={{ x: 230, y: 70, opacity: 0 }}
          animate={{
            x: [230, 160, 100, 140, 240],
            y: [70, 110, 135, 185, 230],
            opacity: [0, 1, 1, 1, 0],
          }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="pointer-events-none"
        >
          {/* Scaler Metallic Handle / Shank */}
          <line x1="0" y1="0" x2="36" y2="-28" stroke="#64748B" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="0" y1="0" x2="36" y2="-28" stroke="#E2E8F0" strokeWidth="1.5" strokeLinecap="round" />
          
          {/* Precision Curved Working Scaler Tip */}
          <path d="M 0,0 Q -8,4 -14,2" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          
          {/* Active Ultrasonic Hydro-Mist Spray emanating directly from tip */}
          <path
            d="M -14,2 L -38,-14 L -42,16 Z"
            fill="url(#hydroMistCone)"
            opacity="0.8"
          />

          {/* Micro Water Effervescence Droplets */}
          <circle cx="-24" cy="-3" r="2.2" fill="#7DD3FC" opacity="0.9" />
          <circle cx="-32" cy="7" r="1.8" fill="#BAE6FD" opacity="0.85" />
          <circle cx="-18" cy="8" r="2" fill="#38BDF8" opacity="0.95" />
        </motion.g>

        {/* 4. Fine Sparkling Hydro-Bubbles gently dissipating */}
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ delay: 0.8, duration: 0.9 }}
        >
          <circle cx="150" cy="110" r="3.5" fill="#7DD3FC" />
          <circle cx="100" cy="140" r="3" fill="#BAE6FD" />
          <circle cx="130" cy="180" r="3.5" fill="#38BDF8" />
        </motion.g>

        {/* 5. Pure Light Polishing Sweep Bar */}
        <motion.rect
          x="30"
          y="40"
          width="40"
          height="240"
          fill="url(#laserBeamGrad)"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 230, opacity: [0, 0.7, 0] }}
          transition={{ delay: 1.5, duration: 0.8, ease: 'easeInOut' }}
          className="pointer-events-none"
        />

        {/* 6. Specular Highlight Pill */}
        <ToothSpecularHighlight delay={1.8} />
      </svg>
    </div>
  );
};
