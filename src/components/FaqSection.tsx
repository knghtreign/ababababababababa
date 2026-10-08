import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, HelpCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { FAQ_ITEMS } from '../data/clinicData';
import { playSoftClick, playChime } from '../utils/soundEffects';
import { TextHighlight, PopBadge } from './AnimatedText';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggleItem = (id: string) => {
    if (openId === id) {
      playSoftClick();
      setOpenId(null);
    } else {
      playChime();
      setOpenId(id);
    }
  };

  const renderRichAnswer = (id: string) => {
    switch (id) {
      case 'faq-1':
        return (
          <p className="pt-2 text-blue-50 leading-relaxed">
            Yes, we operate as a private dedicated clinic to ensure Dr. Deepal provides{' '}
            <span className="text-[#FDE68A] font-bold">dedicated, unhurried time</span> for each patient. For acute dental emergencies or toothaches,{' '}
            <TextHighlight color="amber" variant="pill">same-day priority walk-in slots</TextHighlight> are always preserved.
          </p>
        );
      case 'faq-2':
        return (
          <p className="pt-2 text-blue-50 leading-relaxed">
            We offer 18 specialized dental services including{' '}
            <span className="text-[#FDE68A] font-bold">Teeth Whitening</span>,{' '}
            <span className="text-[#FDE68A] font-bold">Bonding</span>, Check-ups, Cosmetic Procedures,{' '}
            <span className="text-[#FDE68A] font-bold">Dental Implants</span>, Dentures & Bridges, Emergency Care, Extractions, Fillings & Sealants, Mouth Guards, Oral Surgery,{' '}
            <span className="text-[#FDE68A] font-bold">Paediatrics</span>, Root Canals, Teeth Cleaning, Teeth Reshaping, Veneers & Crowns, and digital X-Rays.
          </p>
        );
      case 'faq-3':
        return (
          <p className="pt-2 text-blue-50 leading-relaxed">
            Our comprehensive consultation includes a thorough dental examination and a personalized treatment plan with{' '}
            <TextHighlight color="amber" variant="pill">100% upfront, transparent pricing</TextHighlight>. There are never any hidden fees or surprise costs.
          </p>
        );
      case 'faq-5':
        return (
          <p className="pt-2 text-blue-50 leading-relaxed">
            We are situated at{' '}
            <TextHighlight color="amber" variant="bracket">Guide Building, Gate No. 2, Shop No. 9, Ground Floor, Near Priyadarshini Park, L.D. Ruparel Marg, Malabar Hill, Mumbai 400006</TextHighlight>
            , with convenient curbside parking access.
          </p>
        );
      case 'faq-6':
        return (
          <p className="pt-2 text-blue-50 leading-relaxed">
            You can instantly reserve your preferred slot via the{' '}
            <TextHighlight color="amber" variant="pill">Book Consultation</TextHighlight> button on this page, or reach our clinic desk directly at{' '}
            <a href="tel:+917977776136" className="font-black text-[#FDE68A] hover:underline">079777 76136</a>.
          </p>
        );
      default:
        return <p className="pt-2 text-blue-50 leading-relaxed">{FAQ_ITEMS.find((f) => f.id === id)?.answer}</p>;
    }
  };

  return (
    <section id="faq" className="relative py-10 sm:py-16 -mt-2 sm:-mt-4 px-3 sm:px-6 lg:px-8 overflow-visible z-10">
      
      {/* Subtle Ambient Background Gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[360px] bg-amber-100/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto rounded-[32px] sm:rounded-[40px] border-2 border-[#293549] bg-white/40 backdrop-blur-xs p-5 sm:p-10 shadow-xs">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ type: 'spring', damping: 14, stiffness: 200 }}
          className="text-center mb-6 sm:mb-10"
        >
          <PopBadge className="mb-2">
            <span className="inline-flex items-center gap-1.5 text-[11px] font-black uppercase tracking-widest text-[#293549] bg-amber-100 px-3.5 py-1.5 rounded-full shadow-xs font-['Outfit',sans-serif] border border-amber-300/60">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              PATIENT INQUIRIES
            </span>
          </PopBadge>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#293549] font-['Outfit',sans-serif] tracking-tight">
            Frequently Asked <span className="text-[#C58B1B] font-black">Questions</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5">
            Clear, honest answers for your visit to Dr Deepals Dental Clinic in Malabar Hill.
          </p>
        </motion.div>

        {/* Accordion Container */}
        <div className="space-y-2.5 sm:space-y-3">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openId === item.id;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.1 }}
                transition={{
                  type: 'spring',
                  damping: 12,
                  stiffness: 180,
                  delay: idx * 0.03
                }}
                className={`rounded-[22px] sm:rounded-[26px] transition-all duration-300 border-2 ${
                  isOpen
                    ? 'bg-[#293549] shadow-[0_15px_35px_rgba(15,25,40,0.22)] border-[#293549]'
                    : 'bg-[#293549]/95 hover:bg-[#293549] border-[#293549] shadow-xs'
                }`}
              >
                {/* Question Trigger */}
                <button
                  id={`faq-trigger-${item.id}`}
                  onClick={() => toggleItem(item.id)}
                  aria-expanded={isOpen}
                  className="w-full text-left py-3.5 sm:py-4 px-4 sm:px-6 flex items-center justify-between gap-3 cursor-pointer select-none"
                >
                  <span className="text-xs sm:text-sm md:text-base font-extrabold font-['Outfit',sans-serif] text-white">
                    {item.question}
                  </span>

                  <div
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen
                        ? 'bg-gradient-to-r from-[#DFAC38] to-[#FDE68A] text-[#0B1528] rotate-180 shadow-xs'
                        : 'bg-white/20 text-white hover:bg-white/30 border border-white/40'
                    }`}
                  >
                    {isOpen ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </div>
                </button>

                {/* Animated Answer Height with Spring Physics */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-content-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{
                        height: { type: 'spring', damping: 12, stiffness: 180 },
                        opacity: { duration: 0.18 }
                      }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-6 pb-4 pt-0 text-xs sm:text-sm font-medium leading-relaxed border-t border-white/20 mt-0.5">
                        {renderRichAnswer(item.id)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
