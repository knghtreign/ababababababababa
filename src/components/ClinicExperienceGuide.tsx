import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, ChevronRight, ChevronLeft, Coffee, HeartHandshake, FileCheck2, Eye } from 'lucide-react';
import { CLINIC_IMAGES } from '../data/clinicData';
import { playPop, playChime, playSoftClick } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

interface VisitStep {
  stepNumber: string;
  tabLabel: string;
  headline: string;
  tagline: string;
  shortDesc: string;
  imageSrc: string;
  keyFeature: string;
  pills: string[];
  accentColor: string;
}

const VISIT_STEPS: VisitStep[] = [
  {
    stepNumber: '01',
    tabLabel: 'Welcome',
    headline: 'Welcome & Check-In',
    tagline: 'WELCOME & CHECK-IN',
    shortDesc: "Start with a simple check-in before your appointment. We'll get you settled and ready for your consultation.",
    imageSrc: CLINIC_IMAGES.clinicLounge,
    keyFeature: 'Simple, Prompt Check-In',
    pills: ['Simple Check-In', 'Comfortable Arrival'],
    accentColor: '#D4C4A8',
  },
  {
    stepNumber: '02',
    tabLabel: '1-on-1 Consultation',
    headline: 'Understanding Your Dental Concerns',
    tagline: '1-ON-1 CONSULTATION',
    shortDesc: "Dr. Deepal takes the time to understand your dental concerns, what you're experiencing, and what you want to achieve. She then explains the suitable treatment options and guides you on what is best for you.",
    imageSrc: CLINIC_IMAGES.dentistAction,
    keyFeature: 'Dedicated Patient Discussion',
    pills: ['Unhurried Discussion', 'Personal Guidance'],
    accentColor: '#778D7A',
  },
  {
    stepNumber: '03',
    tabLabel: 'Dental Assessment',
    headline: 'A Closer Look at Your Dental Health',
    tagline: 'DENTAL ASSESSMENT',
    shortDesc: 'Dr. Deepal examines your teeth and overall dental health to understand your needs and decide on the right course of treatment. 2D X-rays may be used when needed.',
    imageSrc: CLINIC_IMAGES.dentalXray,
    keyFeature: 'Accurate Dental Assessment',
    pills: ['Gentle Examination', '2D X-Rays When Needed'],
    accentColor: '#D4C4A8',
  },
  {
    stepNumber: '04',
    tabLabel: 'Treatment',
    headline: 'Your Treatment',
    tagline: 'TREATMENT',
    shortDesc: 'Once the right treatment is decided, Dr. Deepal carries out the treatment and guides you through each step.',
    imageSrc: CLINIC_IMAGES.clinicSuite,
    keyFeature: 'Step-by-Step Gentle Care',
    pills: ['Guided Procedure', 'Gentle Care'],
    accentColor: '#778D7A',
  }
];

// Magnetic 3D Tilt Step Button with dynamic lighting
interface TiltStepButtonProps {
  step: VisitStep;
  idx: number;
  isActive: boolean;
  onSelect: (idx: number) => void;
  getIcon: (idx: number) => React.ReactNode;
}

const TiltStepButton: React.FC<TiltStepButtonProps> = ({
  step,
  idx,
  isActive,
  onSelect,
  getIcon,
}) => {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glowX: 50, glowY: 50, isHovered: false });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Normalized [-0.5, 0.5]
    const normX = (x / rect.width) - 0.5;
    const normY = (y / rect.height) - 0.5;

    // Rotate bounds: max 12 deg tilt
    setTilt({
      x: -normY * 14,
      y: normX * 14,
      glowX: (x / rect.width) * 100,
      glowY: (y / rect.height) * 100,
      isHovered: true,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0, glowX: 50, glowY: 50, isHovered: false });
  };

  return (
    <motion.button
      ref={buttonRef}
      id={`guide-step-${step.stepNumber}`}
      onClick={() => onSelect(idx)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.x,
        rotateY: tilt.y,
        scale: tilt.isHovered ? 1.05 : 1,
        y: tilt.isHovered ? -4 : 0,
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', damping: 15, stiffness: 280 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 800,
      }}
      className={`relative p-3 sm:p-3.5 rounded-2xl text-left transition-all duration-200 font-['Outfit',sans-serif] cursor-pointer select-none border overflow-hidden ${
        isActive
          ? 'gold-cta-btn animate-gold-shimmer shadow-lg text-[#0B1528]'
          : 'bg-[#293549] hover:bg-[#364660] text-white border-2 border-white/40 shadow-sm'
      }`}
    >
      {/* Magnetic dynamic cursor lighting */}
      {tilt.isHovered && !isActive && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, rgba(255, 255, 255, 0.25), transparent 70%)`,
          }}
        />
      )}

      <div className="relative z-10" style={{ transform: 'translateZ(15px)' }}>
        <div className="flex items-center justify-between mb-1">
          <div className={`flex items-center gap-1.5 text-[10px] sm:text-[11px] font-black tracking-wider uppercase ${isActive ? 'text-[#0B1528]' : 'text-[#FDE68A]'}`}>
            {getIcon(idx)}
            <span>STEP {step.stepNumber}</span>
          </div>
          <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-[#0B1528] animate-pulse' : 'bg-white'}`} />
        </div>
        <div className={`text-xs sm:text-sm font-black truncate ${isActive ? 'text-[#0B1528]' : 'text-white'}`}>
          {step.tabLabel}
        </div>
      </div>
    </motion.button>
  );
};

export const ClinicExperienceGuide: React.FC = () => {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);

  const activeStep = VISIT_STEPS[activeStepIdx] || VISIT_STEPS[0];

  const handleSelectStep = (idx: number) => {
    if (idx === activeStepIdx) return;
    playChime();
    setActiveStepIdx(idx);
  };

  const handleNext = () => {
    playChime();
    setActiveStepIdx((prev) => (prev + 1) % VISIT_STEPS.length);
  };

  const handlePrev = () => {
    playSoftClick();
    setActiveStepIdx((prev) => (prev - 1 + VISIT_STEPS.length) % VISIT_STEPS.length);
  };

  const getStepIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Coffee className="w-4 h-4" />;
      case 1:
        return <HeartHandshake className="w-4 h-4" />;
      case 2:
        return <Eye className="w-4 h-4" />;
      case 3:
        return <FileCheck2 className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <section id="about" className="relative py-10 sm:py-16 -mt-2 sm:-mt-4 px-3 sm:px-6 lg:px-8 overflow-hidden z-10">
      
      {/* Background Soft Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-[#D4C4A8]/20 via-[#778D7A]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header with Re-triggering Scroll Animations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center mb-6 sm:mb-8"
        >
          <PopBadge className="mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#293549] bg-amber-100 border border-amber-300 px-3.5 py-1.5 rounded-full shadow-xs font-['Outfit',sans-serif]">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              VISIT EXPERIENCE
            </span>
          </PopBadge>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#293549] font-['Outfit',sans-serif] tracking-tight">
            What Happens When You <span className="text-[#C58B1B] font-black">Visit?</span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto mt-1.5">
            A clear, comfortable 4-step sequence for your visit.
          </p>
        </motion.div>

        {/* Tactile Magnetic 3D Step Selector Grid */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 14, stiffness: 180 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3 mb-6"
        >
          {VISIT_STEPS.map((step, idx) => (
            <TiltStepButton
              key={step.stepNumber}
              step={step}
              idx={idx}
              isActive={idx === activeStepIdx}
              onSelect={handleSelectStep}
              getIcon={getStepIcon}
            />
          ))}
        </motion.div>

        {/* Dynamic Visual Stage with interactive animations */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.stepNumber}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -12 }}
            transition={{ type: 'spring', damping: 16, stiffness: 240 }}
            className="bg-[#293549] rounded-[32px] sm:rounded-[36px] p-5 sm:p-8 shadow-[0_20px_60px_rgba(15,25,40,0.22)] border-2 border-[#293549] ring-1 ring-white/20 grid grid-cols-1 md:grid-cols-12 gap-6 items-center text-white"
          >
            
            {/* Left: Visual Media */}
            <div className="md:col-span-6 relative">
              <div className="relative rounded-[24px] overflow-hidden bg-white aspect-[4/3] shadow-md border-2 border-white/40 group">
                <img
                  src={activeStep.imageSrc}
                  alt={activeStep.headline}
                  referrerPolicy="no-referrer"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Step Pill Overlay */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black tracking-wider text-[#0F172A] font-['Outfit',sans-serif] border border-white shadow-xs">
                  STEP {activeStep.stepNumber} · {activeStep.tagline}
                </div>

                {/* Key feature bar */}
                <div className="absolute bottom-3 inset-x-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl text-[#0F172A] text-xs flex items-center justify-between border border-white shadow-xs">
                  <span className="font-bold text-[#0F172A] text-[11px] font-['Outfit',sans-serif]">{activeStep.keyFeature}</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>
            </div>

            {/* Right: Crisp, Short Copy & Interactive Pills */}
            <div className="md:col-span-6 space-y-4 text-left">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0B1528] bg-gradient-to-r from-[#DFAC38] to-[#FDE68A] border border-amber-300 px-3 py-1 rounded-full inline-block mb-1.5 font-['Outfit',sans-serif]">
                  Step {activeStep.stepNumber}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white font-['Outfit',sans-serif] leading-snug">
                  {activeStep.headline}
                </h3>
              </div>

              {/* Short, punchy summary */}
              <p className="text-xs sm:text-sm text-blue-50 font-medium leading-relaxed">
                {activeStep.shortDesc}
              </p>

              {/* Interactive Takeaway Pills */}
              <div className="flex flex-wrap gap-2 pt-1">
                {activeStep.pills.map((pill, i) => (
                  <motion.span
                    key={i}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                    onClick={() => playPop()}
                    className="inline-flex items-center gap-1.5 bg-white/20 hover:bg-white/30 text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/40 shadow-xs cursor-pointer font-['Outfit',sans-serif] transition-colors"
                  >
                    {pill}
                  </motion.span>
                ))}
              </div>

              {/* Navigation Stepper Controls */}
              <div className="pt-3 flex items-center justify-between border-t border-white/25">
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handlePrev}
                    whileHover={{ scale: 1.1, x: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/40 shadow-xs"
                    title="Previous Step"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    onClick={handleNext}
                    whileHover={{ scale: 1.1, x: 2 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/40 shadow-xs"
                    title="Next Step"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </motion.button>
                </div>

                <span className="text-[11px] font-black text-[#FDE68A] font-['Outfit',sans-serif]">
                  Step {activeStepIdx + 1} of {VISIT_STEPS.length}
                </span>
              </div>

            </div>

          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};


