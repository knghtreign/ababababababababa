import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { CLINIC_SERVICES } from '../data/clinicData';
import { playPop, playChime, playSoftClick } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

interface ServicesCarouselProps {
  onSelectTreatment: (treatmentName: string) => void;
}

export const ServicesCarousel: React.FC<ServicesCarouselProps> = ({ onSelectTreatment }) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dragStartX = useRef<number>(0);
  const totalServices = CLINIC_SERVICES.length;

  // Preload adjacent services lazily so navigation is instant without choking initial page load
  useEffect(() => {
    const timer = setTimeout(() => {
      const indicesToPreload = [
        activeIndex,
        (activeIndex + 1) % totalServices,
        (activeIndex - 1 + totalServices) % totalServices,
        (activeIndex + 2) % totalServices,
        (activeIndex - 2 + totalServices) % totalServices,
      ];
      indicesToPreload.forEach((idx) => {
        const srv = CLINIC_SERVICES[idx];
        if (srv?.imageSrc) {
          const img = new Image();
          img.src = srv.imageSrc;
        }
      });
    }, 150);

    return () => clearTimeout(timer);
  }, [activeIndex, totalServices]);

  const activeService = CLINIC_SERVICES[activeIndex];

  const handlePrev = () => {
    playSoftClick();
    setActiveIndex((prev) => (prev - 1 + totalServices) % totalServices);
  };

  const handleNext = () => {
    playChime();
    setActiveIndex((prev) => (prev + 1) % totalServices);
  };

  const handleSelectCard = (index: number) => {
    if (index === activeIndex) {
      playPop();
      onSelectTreatment(activeService.name);
      return;
    }
    playChime();
    setActiveIndex(index);
  };

  // Touch Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    dragStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = e.changedTouches[0].clientX - dragStartX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) {
        handlePrev();
      } else {
        handleNext();
      }
    }
  };

  return (
    <section
      id="services"
      className="relative py-8 sm:py-14 px-3 sm:px-6 lg:px-8 overflow-hidden z-10 select-none"
    >
      {/* Anchor for #treatments compatibility */}
      <div id="treatments" className="absolute -top-16" />

      {/* Subtle Depth Aura in Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[720px] h-[460px] bg-gradient-to-r from-[#415A77]/15 via-[#778D7A]/15 to-[#415A77]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Sparse Floating Accent Sparkles */}
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-8 left-[12%] text-[#D4C4A8]/40 pointer-events-none hidden sm:block"
      >
        <Sparkles className="w-6 h-6" />
      </motion.div>
      <motion.div
        animate={{ y: [8, -8, 8], rotate: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 7, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-12 right-[10%] text-[#778D7A]/40 pointer-events-none hidden sm:block"
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>

      <div className="max-w-6xl mx-auto">
        
        {/* Section Header with Word-by-Word Scroll Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 16, stiffness: 200 }}
          className="text-center mb-5 sm:mb-8"
        >
          <PopBadge className="mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#293549] bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full shadow-xs font-['Outfit',sans-serif]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              TREATMENTS & PROCEDURES
            </span>
          </PopBadge>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#293549] font-['Outfit',sans-serif] tracking-tight">
            Dental Treatments & <span className="text-[#C58B1B]">Procedures</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-lg mx-auto mt-1.5">
            Explore the treatments and procedures available at Dr Deepals Dental Clinic.
          </p>

          {/* Controls Bar: Prev/Next & Service Counter */}
          <div className="flex items-center justify-center gap-2.5 sm:gap-3.5 mt-4 sm:mt-5">
            <motion.button
              id="services-carousel-prev"
              onClick={handlePrev}
              whileHover={{ scale: 1.12, x: -2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', damping: 14, stiffness: 300 }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-slate-50 text-[#0F172A] flex items-center justify-center shadow-sm border border-slate-200 transition-all cursor-pointer"
              title="Previous Service"
            >
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </motion.button>

            {/* Pill Counter with Active Service Info */}
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-full border border-slate-200 shadow-xs font-['Outfit',sans-serif]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-black text-[#0F172A]">
                {activeIndex + 1} <span className="text-slate-400 font-normal">/</span> {totalServices}
              </span>
              <span className="hidden sm:inline text-xs font-bold text-[#C58B1B]">
                · {activeService.name}
              </span>
            </div>

            <motion.button
              id="services-carousel-next"
              onClick={handleNext}
              whileHover={{ scale: 1.12, x: 2 }}
              whileTap={{ scale: 0.92 }}
              transition={{ type: 'spring', damping: 14, stiffness: 300 }}
              className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white hover:bg-slate-50 text-[#0F172A] flex items-center justify-center shadow-sm border border-slate-200 transition-all cursor-pointer"
              title="Next Service"
            >
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
            </motion.button>
          </div>
        </motion.div>

        {/* 5-Card 3D Interactive Depth Arc Stage */}
        <div
          className="relative min-h-[360px] sm:min-h-[430px] flex items-center justify-center overflow-visible py-2"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div className="relative w-full max-w-4xl h-[330px] sm:h-[390px] flex items-center justify-center">
            {CLINIC_SERVICES.map((service, idx) => {
              // Calculate circular offset from activeIndex [-totalServices/2, totalServices/2]
              let diff = idx - activeIndex;
              if (diff > totalServices / 2) diff -= totalServices;
              if (diff < -totalServices / 2) diff += totalServices;

              const isCenter = diff === 0;
              const isVisible = Math.abs(diff) <= 2;
              const isGhost = Math.abs(diff) === 3; // for smooth entering/exiting

              if (!isVisible && !isGhost) return null;

              // Arc transformation variables
              const xOffsetDesktop = diff * 185;
              const xOffsetMobile = diff * 115;
              const yOffset = isCenter ? -10 : Math.abs(diff) * 14;
              const rotZ = diff * 5.5;
              const rotY = -diff * 14;
              const scaleValue = isCenter ? 1.05 : Math.max(0.72, 1 - Math.abs(diff) * 0.12);
              const zIndexValue = 30 - Math.abs(diff) * 8;
              const opacityValue = isGhost ? 0 : isCenter ? 1 : Math.max(0.5, 0.88 - Math.abs(diff) * 0.2);
              const blurValue = isGhost ? 3 : Math.abs(diff) * 0.8;

              return (
                <motion.div
                  key={service.id}
                  id={`service-card-${service.id}`}
                  onClick={() => handleSelectCard(idx)}
                  onMouseEnter={() => setHoveredIndex(idx)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  animate={{
                    x: typeof window !== 'undefined' && window.innerWidth < 640 ? xOffsetMobile : xOffsetDesktop,
                    y: yOffset,
                    scale: scaleValue,
                    rotateZ: rotZ,
                    rotateY: rotY,
                    zIndex: zIndexValue,
                    opacity: opacityValue,
                    filter: `blur(${blurValue}px)`,
                  }}
                  whileHover={{
                    scale: isCenter ? 1.07 : scaleValue + 0.04,
                    y: yOffset - 6,
                  }}
                  whileTap={{ scale: scaleValue * 0.96 }}
                  transition={{
                    type: 'spring',
                    damping: 20,
                    stiffness: 190,
                    mass: 0.8,
                  }}
                  style={{
                    transformOrigin: 'bottom center',
                    perspective: 1000,
                  }}
                  className={`absolute top-0 w-[240px] sm:w-[280px] h-[320px] sm:h-[370px] rounded-[30px] sm:rounded-[34px] overflow-hidden cursor-pointer select-none border-3 transition-colors duration-300 ${
                    isCenter
                      ? 'border-amber-400 shadow-[0_24px_55px_-12px_rgba(223,172,56,0.3)] ring-2 ring-amber-300'
                      : 'border-[#293549]/40 shadow-[0_12px_30px_-10px_rgba(15,23,42,0.1)]'
                  }`}
                >
                  {/* Card Background Container with Slight Parallax Shift */}
                  <div className="relative w-full h-full bg-slate-100 overflow-hidden">
                    <motion.img
                      src={service.imageSrc}
                      alt={service.name}
                      referrerPolicy="no-referrer"
                      loading={isCenter ? 'eager' : 'lazy'}
                      decoding="async"
                      animate={{
                        x: -diff * 6,
                        scale: isCenter && hoveredIndex === idx ? 1.06 : 1.02,
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      className="w-full h-full object-cover object-center"
                    />

                    {/* Subtle top & bottom gradient for pill contrast */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/30 pointer-events-none" />

                    {/* Top Left Rounded Pill: ONLY Service Name, Nothing Else */}
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-10 pointer-events-none">
                      <div className="bg-white/95 backdrop-blur-md px-3 sm:px-3.5 py-1.5 rounded-full border border-slate-200 shadow-sm">
                        <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-wider text-[#0F172A] font-['Outfit',sans-serif] whitespace-nowrap">
                          {service.name}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quick Service Chips: Directly Select Any of the 18 Services */}
        <div className="mt-4 sm:mt-6 overflow-x-auto no-scrollbar py-2 -mx-3 px-3 sm:mx-0 sm:px-0">
          <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 min-w-max mx-auto">
            {CLINIC_SERVICES.map((srv, idx) => {
              const isActive = idx === activeIndex;
              return (
                <motion.button
                  key={srv.id}
                  onClick={() => handleSelectCard(idx)}
                  whileHover={{ scale: 1.06, y: -1 }}
                  whileTap={{ scale: 0.94 }}
                  className={`text-[11px] sm:text-xs font-black px-3.5 py-1.5 rounded-full transition-all cursor-pointer font-['Outfit',sans-serif] ${
                    isActive
                      ? 'gold-cta-btn animate-gold-shimmer text-[#0B1528] shadow-md'
                      : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 shadow-xs'
                  }`}
                >
                  {srv.name}
                </motion.button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
