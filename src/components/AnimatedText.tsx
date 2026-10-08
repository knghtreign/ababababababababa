import React from 'react';
import { motion } from 'motion/react';

interface StaggerHeadingProps {
  text: string;
  className?: string;
  delay?: number;
  highlightWords?: string[];
  highlightColor?: string;
}

export const StaggerHeading: React.FC<StaggerHeadingProps> = ({
  text,
  className = '',
  delay = 0,
  highlightWords = [],
  highlightColor = '#DFAC38',
}) => {
  const words = text.split(' ');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (customDelay = delay) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: customDelay,
      },
    }),
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 16,
      scale: 0.95,
      filter: 'blur(2px)',
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 180,
      },
    },
  };

  return (
    <motion.h2
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      className={`flex flex-wrap items-baseline gap-x-[0.26em] gap-y-1 ${className}`}
    >
      {words.map((word, idx) => {
        const cleanWord = word.replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '').toLowerCase();
        const isHighlighted = highlightWords.some(
          (hw) => hw.toLowerCase() === cleanWord || word.toLowerCase().includes(hw.toLowerCase())
        );

        return (
          <motion.span
            key={`${word}-${idx}`}
            variants={wordVariants}
            className={`inline-block ${
              isHighlighted
                ? 'relative text-[#C58B1B] font-black'
                : ''
            }`}
          >
            {word}
          </motion.span>
        );
      })}
    </motion.h2>
  );
};

interface TextHighlightProps {
  children: React.ReactNode;
  color?: 'yellow' | 'coral' | 'blue' | 'peach' | 'mint' | 'dark' | string;
  variant?: 'pill' | 'underline' | 'wavy' | 'bracket';
  className?: string;
}

export const TextHighlight: React.FC<TextHighlightProps> = ({
  children,
  color = 'coral',
  variant = 'underline',
  className = '',
}) => {
  const getColorHex = (c: string) => {
    switch (c) {
      case 'coral':
        return '#DFAC38';
      case 'yellow':
        return '#DFAC38';
      case 'blue':
        return '#2563EB';
      case 'peach':
        return '#DFAC38';
      case 'mint':
        return '#10B981';
      case 'dark':
        return '#0F172A';
      default:
        return c;
    }
  };

  const activeColor = getColorHex(color);

  if (variant === 'pill') {
    return (
      <span className={`relative inline-block px-2 py-0.5 mx-0.5 rounded-lg font-black text-[#0B1528] ${className}`}>
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 12, stiffness: 180, delay: 0.1 }}
          style={{ backgroundColor: activeColor, originX: 0 }}
          className="absolute inset-0 -z-10 rounded-lg shadow-xs"
        />
        {children}
      </span>
    );
  }

  if (variant === 'bracket') {
    return (
      <span className={`relative inline-flex items-center mx-1 font-black ${className}`}>
        <motion.span
          initial={{ opacity: 0, x: -4 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-[#C58B1B] mr-0.5 select-none font-light"
        >
          [
        </motion.span>
        <span>{children}</span>
        <motion.span
          initial={{ opacity: 0, x: 4 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          className="text-[#C58B1B] ml-0.5 select-none font-light"
        >
          ]
        </motion.span>
      </span>
    );
  }

  if (variant === 'wavy') {
    return (
      <span className={`relative inline-block font-extrabold mx-0.5 ${className}`}>
        <span>{children}</span>
        <svg
          className="absolute -bottom-1.5 left-0 w-full h-2 overflow-visible pointer-events-none"
          viewBox="0 0 100 12"
          preserveAspectRatio="none"
        >
          <motion.path
            d="M 0,6 Q 12.5,0 25,6 T 50,6 T 75,6 T 100,6"
            fill="none"
            stroke={activeColor}
            strokeWidth="3.5"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ type: 'spring', damping: 14, stiffness: 120, delay: 0.15 }}
          />
        </svg>
      </span>
    );
  }

  // Default: Animated smooth SVG underline
  return (
    <span className={`relative inline-block font-extrabold mx-0.5 ${className}`}>
      <span>{children}</span>
      <svg
        className="absolute -bottom-1 left-0 w-full h-2 overflow-visible pointer-events-none"
        viewBox="0 0 100 8"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 0,5 C 25,8 75,2 100,5"
          fill="none"
          stroke={activeColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 140, delay: 0.12 }}
        />
      </svg>
    </span>
  );
};

interface PopBadgeProps {
  icon?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const PopBadge: React.FC<PopBadgeProps> = ({
  icon,
  children,
  className = '',
  delay = 0,
}) => {
  return (
    <motion.span
      initial={{ scale: 0.7, opacity: 0, y: 8 }}
      whileInView={{ scale: 1, opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.2 }}
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ type: 'spring', damping: 12, stiffness: 220, delay }}
      className={`inline-flex items-center gap-1.5 select-none ${className}`}
    >
      {icon}
      <span>{children}</span>
    </motion.span>
  );
};

interface UnderlineTagProps {
  text: string;
  color?: 'yellow' | 'blue' | 'mint';
  className?: string;
}

export const UnderlineTag: React.FC<UnderlineTagProps> = ({
  text,
  className = '',
}) => {
  return (
    <span
      className={`font-black text-[#D4C4A8] ${className}`}
    >
      {text}
    </span>
  );
};
