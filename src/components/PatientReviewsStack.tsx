import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2, MessageSquareHeart } from 'lucide-react';
import { REVIEWS } from '../data/clinicData';
import { ReviewItem } from '../types';
import { playPop, playSoftClick } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

const GoogleIcon: React.FC = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.34 24 12 24z"/>
    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
  </svg>
);

const ReviewerAvatar: React.FC<{ review: ReviewItem; size?: 'sm' | 'md' | 'lg' }> = ({ review, size = 'md' }) => {
  const sizeClasses =
    size === 'sm'
      ? 'w-10 h-10 text-sm'
      : size === 'lg'
      ? 'w-12 h-12 text-base'
      : 'w-11 h-11 sm:w-12 sm:h-12 text-sm sm:text-base';

  if (review.avatarUrl) {
    return (
      <img
        src={review.avatarUrl}
        alt={review.patientName}
        referrerPolicy="no-referrer"
        className={`${sizeClasses} rounded-full object-cover border-2 border-white/80 shadow-xs shrink-0`}
      />
    );
  }

  return (
    <div
      style={{ backgroundColor: review.avatarBg || '#293549' }}
      className={`${sizeClasses} rounded-full flex items-center justify-center text-white font-extrabold font-['Outfit',sans-serif] border-2 border-white/80 shadow-xs shrink-0 select-none`}
    >
      {review.avatarLetter || review.patientName.charAt(0)}
    </div>
  );
};

export const PatientReviewsStack: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeReview = REVIEWS[activeIndex];

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    playPop();
    setActiveIndex(index);
  };

  const handleNext = () => {
    playSoftClick();
    setActiveIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handlePrev = () => {
    playSoftClick();
    setActiveIndex((prev) => (prev - 1 + REVIEWS.length) % REVIEWS.length);
  };

  return (
    <section id="reviews" className="relative py-10 sm:py-14 -mt-4 sm:-mt-6 px-4 sm:px-8 overflow-hidden z-10">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-[#415A77]/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center mb-8 sm:mb-10"
        >
          <PopBadge className="mb-2.5">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#293549] bg-amber-100 px-3.5 py-1.5 rounded-full shadow-xs font-['Outfit',sans-serif] border border-amber-300/60">
              <MessageSquareHeart className="w-3.5 h-3.5 text-amber-600" />
              100% REAL GOOGLE REVIEWS
            </span>
          </PopBadge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#293549] font-['Outfit',sans-serif] tracking-tight">
            Voices from <TextHighlight color="coral" variant="bracket">Our Patients</TextHighlight>
          </h2>
          <div className="flex flex-wrap items-center justify-center gap-2.5 mt-2.5 text-xs sm:text-sm text-slate-600 font-medium">
            <div className="flex items-center gap-2">
              <GoogleIcon />
              <span>Verified 5.0 Star Reviews on Google Profile</span>
            </div>
            <a
              id="reviews-google-profile-btn"
              href="https://maps.app.goo.gl/h5W6TMUFYsorp8uw9?g_st=ac"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white hover:bg-slate-50 text-[#0F172A] border border-slate-200/90 shadow-2xs text-[11px] font-bold transition-all hover:scale-105 active:scale-95 font-['Outfit',sans-serif] cursor-pointer"
            >
              <span>Open Google Profile ↗</span>
            </a>
          </div>
        </motion.div>

        {/* Orbiting / Surrounding Patient Cards Selector (10 Real Reviews) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.1, type: 'spring', damping: 14, stiffness: 180 }}
          className="flex items-center justify-start sm:justify-center gap-2.5 sm:gap-3 mb-6 sm:mb-8 overflow-x-auto sm:overflow-visible sm:flex-wrap max-w-4xl mx-auto pt-3.5 pb-3 px-3 scrollbar-none"
        >
          {REVIEWS.map((review, idx) => {
            const isSelected = idx === activeIndex;
            return (
              <motion.button
                key={review.id}
                onClick={() => handleSelect(idx)}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: isSelected ? 1.05 : 0.94,
                  opacity: isSelected ? 1 : 0.75,
                }}
                transition={{ type: 'spring', damping: 16, stiffness: 220 }}
                className={`relative cursor-pointer p-1.5 rounded-2xl transition-all select-none flex flex-col items-center shrink-0 ${
                  isSelected
                    ? 'ring-2 ring-[#DFAC38] shadow-md z-20 bg-white'
                    : 'hover:opacity-100 z-10 border border-slate-200/80 bg-white/60'
                }`}
                title={`${review.patientName} - ${review.treatment}`}
              >
                <div className="relative">
                  <ReviewerAvatar review={review} size="md" />
                  {isSelected && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-[#DFAC38] to-[#FDE68A] text-[#0B1528] font-black flex items-center justify-center text-[9px] shadow border border-white">
                      ★
                    </div>
                  )}
                </div>
                <span className={`text-[10px] sm:text-[11px] font-bold mt-1 max-w-[62px] truncate text-center ${
                  isSelected ? 'text-[#293549] font-black' : 'text-slate-600'
                }`}>
                  {review.patientName.split(' ')[0]}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Main Central Editorial Review Stage with 3D Slide & Horizontal Drag */}
        <div className="relative max-w-2xl mx-auto">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={activeReview.id}
              initial={{ opacity: 0, x: 25, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -25, scale: 0.96 }}
              transition={{ type: 'spring', damping: 24, stiffness: 240 }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, { offset, velocity }) => {
                const swipe = offset.x;
                if (swipe < -50) handleNext();
                else if (swipe > 50) handlePrev();
              }}
              className="relative bg-[#293549] rounded-[36px] p-6 sm:p-9 shadow-[0_20px_60px_rgba(15,25,40,0.22)] border-2 border-[#293549] ring-1 ring-white/20 text-left select-none text-white"
            >
              {/* Top Google Header bar */}
              <div className="flex items-center justify-between gap-3 mb-5 pb-3.5 border-b border-white/20">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs">
                    <GoogleIcon />
                  </div>
                  <div>
                    <span className="text-xs font-black text-white font-['Outfit',sans-serif] tracking-wide flex items-center gap-1.5">
                      Google Verified Review
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300 inline" />
                    </span>
                    <span className="text-[11px] text-slate-300 font-medium block">
                      {activeReview.date}
                    </span>
                  </div>
                </div>

                {/* 5 Stars */}
                <div className="flex items-center gap-1 bg-white/15 backdrop-blur-md px-3 py-1 rounded-full border border-white/25">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#DFAC38] text-[#DFAC38]" />
                  ))}
                  <span className="text-xs font-black text-[#FDE68A] ml-1 font-['Outfit',sans-serif]">5.0</span>
                </div>
              </div>

              {/* Review Text */}
              <div className="relative mb-6">
                <Quote className="w-7 h-7 text-amber-300/40 rotate-180 mb-2 inline-block" />
                <p className="text-sm sm:text-base font-medium text-slate-100 font-['Outfit',sans-serif] leading-relaxed tracking-normal">
                  "{activeReview.reviewText}"
                </p>
              </div>

              {/* Patient Meta, Treatment & Stats */}
              <div className="pt-4 border-t border-white/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                
                {/* Patient details */}
                <div className="flex items-center gap-3">
                  <ReviewerAvatar review={activeReview} size="lg" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-extrabold text-sm sm:text-base text-white font-['Outfit',sans-serif]">
                        {activeReview.patientName}
                      </span>
                    </div>
                    {activeReview.stats && (
                      <span className="text-[11px] text-slate-300 font-medium block">
                        {activeReview.stats}
                      </span>
                    )}
                  </div>
                </div>

                {/* Treatment / Service Tag */}
                <div className="self-end sm:self-auto text-right">
                  <span className="inline-block text-[11px] font-bold text-[#FDE68A] bg-white/10 px-3 py-1 rounded-full border border-white/20 font-['Outfit',sans-serif]">
                    {activeReview.treatment}
                  </span>
                </div>

              </div>

            </motion.div>
          </AnimatePresence>

          {/* Sleek Navigation Arrows */}
          <div className="flex items-center justify-center gap-4 mt-6">
            <motion.button
              id="prev-review-btn"
              onClick={handlePrev}
              whileHover={{ scale: 1.1, x: -2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="w-10 h-10 rounded-full bg-[#293549] hover:bg-[#364660] border-2 border-white/40 text-white flex items-center justify-center shadow-xs transition-all cursor-pointer font-bold"
              title="Previous Review"
            >
              <ChevronLeft className="w-4 h-4" />
            </motion.button>

            {/* Quick Indicator dots */}
            <div className="flex items-center gap-1.5">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`transition-all rounded-full cursor-pointer ${
                    i === activeIndex
                      ? 'w-6 h-2 bg-[#C58B1B]'
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Go to review ${i + 1}`}
                />
              ))}
            </div>

            <motion.button
              id="next-review-btn"
              onClick={handleNext}
              whileHover={{ scale: 1.1, x: 2 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: 'spring', damping: 12, stiffness: 300 }}
              className="w-10 h-10 rounded-full bg-[#293549] hover:bg-[#364660] border-2 border-white/40 text-white flex items-center justify-center shadow-xs transition-all cursor-pointer font-bold"
              title="Next Review"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>

        </div>

      </div>
    </section>
  );
};


