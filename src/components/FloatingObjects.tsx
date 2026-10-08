import React from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Sparkles, MapPin } from 'lucide-react';
import { playPop, playSparkle } from '../utils/soundEffects';

export const FloatingObjects: React.FC = () => {
  const { scrollY } = useScroll();

  // Gentle parallax shifts
  const y2 = useTransform(scrollY, [0, 2000], [0, -120]);
  const y3 = useTransform(scrollY, [0, 2000], [0, 220]);

  return (
    <div className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      
      {/* 1. Floating Pearl Mini-Tooth (Left Side) */}
      <motion.div
        style={{ y: y2 }}
        animate={{
          rotate: [0, -10, 8, 0],
          scale: [1, 1.05, 0.98, 1]
        }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute top-[62%] left-2 sm:left-8 pointer-events-auto hidden lg:block"
      >
        <div
          onClick={playSparkle}
          title="Gleaming Pearl Tooth"
          className="cursor-pointer w-12 h-12 rounded-2xl bg-white border-2 border-amber-300 shadow-xl flex items-center justify-center backdrop-blur-sm hover:scale-125 transition-transform text-amber-500"
        >
          <svg viewBox="0 0 260 290" className="w-6 h-7 overflow-visible">
            <path
              d="M 130,48 C 114,38 92,34 76,46 C 60,56 48,78 46,110 C 44,142 48,178 52,204 C 54,228 58,252 68,266 C 76,278 88,276 96,260 C 108,236 116,198 130,198 C 144,198 152,236 164,260 C 172,276 184,278 192,266 C 202,252 206,228 208,204 C 212,178 216,142 214,110 C 212,78 200,56 184,46 C 168,34 146,38 130,48 Z"
              fill="#FEF3C7"
              stroke="#D97706"
              strokeWidth="12"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>

      {/* 3. Floating Sparkle Star (Bottom Right) */}
      <motion.div
        style={{ y: y3 }}
        animate={{
          rotate: [0, 180, 360],
          scale: [0.9, 1.1, 0.9]
        }}
        transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
        className="absolute top-[82%] right-6 sm:right-24 pointer-events-auto hidden md:block"
      >
        <div
          onClick={playSparkle}
          className="cursor-pointer w-10 h-10 rounded-full bg-white border border-amber-300 shadow-lg flex items-center justify-center hover:scale-130 transition-transform"
        >
          <Sparkles className="w-5 h-5 text-amber-500" />
        </div>
      </motion.div>

    </div>
  );
};
