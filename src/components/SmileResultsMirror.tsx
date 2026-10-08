import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Eye, MoveHorizontal } from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { playSoftClick, playChime, playMirrorSlideChime } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

export const SmileResultsMirror: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage 0 to 100
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lastSoundPosRef = useRef<number>(50);

  // Keep track of container width accurately across all screen sizes
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    window.addEventListener('resize', updateDimensions);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateDimensions);
    };
  }, []);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);

    // Audio cue throttle: trigger soft chime when moving past 12% thresholds
    if (Math.abs(percentage - lastSoundPosRef.current) > 12) {
      playMirrorSlideChime(percentage / 100);
      lastSoundPosRef.current = percentage;
    }
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    updatePosition(e.clientX);
    playSoftClick();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        e.currentTarget.releasePointerCapture(e.pointerId);
      } catch {
        // Pointer capture release safety
      }
    }
  };

  const handlePreset = (pos: number) => {
    playChime();
    setSliderPos(pos);
    lastSoundPosRef.current = pos;
  };

  return (
    <section id="results" className="relative py-10 sm:py-14 -mt-4 sm:-mt-6 px-4 sm:px-8 overflow-hidden z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
        >
          <PopBadge className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#293549] bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full shadow-xs font-['Outfit',sans-serif]">
              <Eye className="w-3.5 h-3.5 text-amber-600" />
              BEFORE & AFTER RESULTS
            </span>
          </PopBadge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#293549] font-['Outfit',sans-serif] tracking-tight">
            Before & <span className="text-[#C58B1B]">After</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-2">
            Drag the slider to see the before and after results of our dental treatments.
          </p>
        </motion.div>

        {/* The Interactive Dental Mirror Canvas with main color outline */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 16, stiffness: 180 }}
          className="relative max-w-4xl mx-auto rounded-[32px] sm:rounded-[40px] bg-[#293549] p-3 sm:p-8 border-2 border-[#293549] ring-1 ring-white/20 shadow-[0_20px_60px_rgba(15,25,40,0.22)]"
        >
          
          <div
            ref={containerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className="relative w-full h-[340px] sm:h-[480px] rounded-[24px] sm:rounded-[32px] overflow-hidden select-none cursor-ew-resize bg-stone-900 group touch-none"
          >
            {/* 1. Base Layer: BEFORE (Discolored/Slightly dull natural tone) */}
            <div className="absolute inset-0 w-full h-full filter saturate-75 brightness-90 pointer-events-none">
              <img
                src={CLINIC_IMAGES.smileResult}
                alt="Patient Smile Before Treatment"
                referrerPolicy="no-referrer"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center filter sepia-[0.35] brightness-90"
              />
              {/* Subtle BEFORE label badge */}
              <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-slate-900/80 backdrop-blur-md text-white text-[10px] sm:text-xs font-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase tracking-wider font-['Outfit',sans-serif] border border-white/20 shadow-sm">
                BEFORE
              </div>
            </div>

            {/* 2. Top Layer: AFTER (Clipped at slider position, bright, luminous, perfect) */}
            <div
              style={{ width: `${sliderPos}%` }}
              className="absolute inset-y-0 left-0 overflow-hidden border-r-2 border-white/95 z-10 pointer-events-none"
            >
              <div
                style={{
                  width: containerWidth > 0 ? `${containerWidth}px` : '100%',
                  minWidth: containerWidth > 0 ? `${containerWidth}px` : '100%',
                  height: '100%'
                }}
                className="relative h-full overflow-hidden"
              >
                <img
                  src={CLINIC_IMAGES.smileResult}
                  alt="Patient Smile After Treatment"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  style={{
                    width: containerWidth > 0 ? `${containerWidth}px` : '100%',
                    minWidth: containerWidth > 0 ? `${containerWidth}px` : '100%',
                    maxWidth: containerWidth > 0 ? `${containerWidth}px` : '100%',
                    height: '100%'
                  }}
                  className="h-full object-cover object-center filter brightness-110 contrast-105"
                />
                
                {/* Luminous flare on AFTER side */}
                <div className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-emerald-700/90 text-white text-[10px] sm:text-xs font-black px-3 sm:px-4 py-1 sm:py-1.5 rounded-full uppercase tracking-wider shadow-md font-['Outfit',sans-serif] flex items-center gap-1.5 border border-emerald-400">
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300" />
                  AFTER
                </div>
              </div>
            </div>

            {/* 3. Physical Dental Mirror Handle & Circular Lens at Slider Position */}
            <div
              style={{ left: `${sliderPos}%` }}
              className="absolute top-0 bottom-0 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center justify-center"
            >
              {/* Dental Mirror Handle (Top rod) */}
              <div className="w-1.5 h-12 sm:h-16 bg-gradient-to-r from-stone-400 via-stone-100 to-stone-400 shadow-md rounded-t-full" />

              {/* Circular Mirror Head with Chrome Rim */}
              <div className="relative w-18 h-18 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-amber-200/40 via-white/95 to-white border-3 sm:border-4 border-amber-300 shadow-[0_0_25px_rgba(15,23,42,0.3)] flex items-center justify-center backdrop-blur-xs">
                {/* Reflection highlight arc */}
                <div className="absolute inset-1 rounded-full border-2 border-white/60 pointer-events-none" />
                
                <div className="flex flex-col items-center justify-center text-[#0B1528]">
                  <MoveHorizontal className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B1528] animate-pulse" />
                  <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest font-['Outfit',sans-serif]">
                    DRAG
                  </span>
                </div>
              </div>

              {/* Dental Mirror Handle (Bottom stainless grip) */}
              <div className="w-2.5 h-full max-h-36 sm:max-h-44 bg-gradient-to-r from-stone-400 via-stone-200 to-stone-500 shadow-lg rounded-b-full border border-stone-300">
                {/* Knurled grip grooves */}
                <div className="w-full h-full flex flex-col justify-around py-3 sm:py-4 opacity-40">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="w-full h-0.5 bg-stone-700" />
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* Quick preset positions */}
          <div className="flex items-center justify-between mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-white/25 flex-wrap gap-2">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <motion.button
                id="preset-before-btn"
                onClick={() => handlePreset(0)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                className={`text-[11px] sm:text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer font-['Outfit',sans-serif] ${
                  sliderPos === 0
                    ? 'gold-cta-btn animate-gold-shimmer text-[#0B1528] shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/40'
                }`}
              >
                Before
              </motion.button>
              <motion.button
                id="preset-split-btn"
                onClick={() => handlePreset(50)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                className={`text-[11px] sm:text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer font-['Outfit',sans-serif] ${
                  sliderPos === 50
                    ? 'gold-cta-btn animate-gold-shimmer text-[#0B1528] shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/40'
                }`}
              >
                50/50 Split
              </motion.button>
              <motion.button
                id="preset-after-btn"
                onClick={() => handlePreset(100)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                className={`text-[11px] sm:text-xs font-black px-3 sm:px-4 py-1.5 sm:py-2 rounded-full transition-all cursor-pointer font-['Outfit',sans-serif] ${
                  sliderPos === 100
                    ? 'gold-cta-btn animate-gold-shimmer text-[#0B1528] shadow-md'
                    : 'bg-white/20 text-white hover:bg-white/30 border border-white/40'
                }`}
              >
                After
              </motion.button>
            </div>

            <span className="text-xs font-black text-[#FDE68A] font-['Outfit',sans-serif]">
              {Math.round(sliderPos)}% Reveal
            </span>
          </div>

        </motion.div>
      </div>
    </section>
  );
};
