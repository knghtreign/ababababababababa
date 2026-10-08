import React from 'react';
import { motion } from 'motion/react';
import { CLINIC_IMAGES } from '../data/clinicData';

const CLINIC_PHOTOS_LIST = [
  CLINIC_IMAGES.clinicSuite,
  CLINIC_IMAGES.dentistAction,
  CLINIC_IMAGES.clinicLounge,
  CLINIC_IMAGES.digitalScanner,
  CLINIC_IMAGES.heroToothWorkers,
];

export const ClinicShowcaseStack: React.FC = () => {
  return (
    <section
      id="clinic-space"
      className="relative py-12 sm:py-20 -mt-2 sm:-mt-4 px-3 sm:px-6 lg:px-8 overflow-hidden z-10"
    >
      {/* Ambient background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#415A77]/10 via-[#778D7A]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto">
        {/* Top Heading Only - Fade Up */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#293549] bg-amber-100 border border-amber-300 px-4 py-1.5 rounded-full shadow-xs font-['Outfit',sans-serif]">
            THE CLINIC · MALABAR HILL
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#293549] font-['Outfit',sans-serif] tracking-tight mt-2 sm:mt-2.5">
            Inside Our <span className="text-[#C58B1B]">Clinic</span>
          </h2>
        </motion.div>

        {/* Clinic Images Gallery with Distinct Fade-Up Animation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
          {/* Featured Panoramic Image - Fade Up */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.15 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 rounded-[24px] sm:rounded-[36px] overflow-hidden border-2 sm:border-3 border-[#293549] shadow-[0_16px_40px_rgba(15,25,40,0.14)] bg-slate-900 aspect-[16/9] sm:aspect-[21/9] will-change-transform"
          >
            <img
              src={CLINIC_PHOTOS_LIST[0]}
              alt="Inside Dr Deepals Dental Clinic - Suite"
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover select-none pointer-events-none"
            />
          </motion.div>

          {/* Balanced Pairs of Clinic Photos - Staggered Fade Up */}
          {CLINIC_PHOTOS_LIST.slice(1).map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.15 }}
              transition={{
                duration: 0.85,
                delay: (idx % 2) * 0.15,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="rounded-[22px] sm:rounded-[32px] overflow-hidden border-2 sm:border-3 border-[#293549] shadow-[0_14px_35px_rgba(15,25,40,0.12)] bg-slate-900 aspect-[4/3] sm:aspect-[16/10] will-change-transform"
            >
              <img
                src={src}
                alt="Inside Dr Deepals Dental Clinic"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
