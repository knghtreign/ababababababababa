import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'motion/react';
import { X, CheckCircle2, User, Phone, ArrowRight, MessageSquare, MapPin, Sparkles, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLINIC_DETAILS } from '../data/clinicData';
import { playSparkle, playPop, playSoftClick } from '../utils/soundEffects';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  defaultTreatment?: string;
}

const EXACT_CLINIC_ADDRESS =
  'Guide Building, Gate No. 2, Shop No. 9, Ground Floor, Near Priyadarshini Park, L.D. Ruparel Marg, Malabar Hill, Mumbai 400006';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onOpen,
  defaultTreatment = 'Consultation & General Checkup',
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (11:00 AM – 1:00 PM)');
  const [selectedService, setSelectedService] = useState(defaultTreatment);
  const [preferredDate, setPreferredDate] = useState('Tomorrow');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 12,
    mass: 0.3,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !phone.trim()) return;

    playSparkle();

    // 1. Subtle, elegant confetti animation
    try {
      confetti({
        particleCount: 55,
        spread: 60,
        origin: { y: 0.55 },
        colors: ['#DFAC38', '#FDE68A', '#415A77', '#778D7A', '#10B981'],
        scalar: 0.85,
        ticks: 180,
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    // 2. Format user booking details into a structured pre-filled WhatsApp message URL
    const message = [
      `*New Appointment Request · Dr. Deepal's Dental Clinic*`,
      ``,
      `• *Patient Name:* ${patientName.trim()}`,
      `• *Contact Number:* ${phone.trim()}`,
      `• *Treatment:* ${selectedService}`,
      `• *Preferred Date:* ${preferredDate}`,
      `• *Preferred Time:* ${preferredTime}`,
      `• *Clinic Address:* ${EXACT_CLINIC_ADDRESS}`,
      ``,
      `Please confirm my appointment slot. Thank you!`,
    ].join('\n');

    const waUrl = `https://wa.me/917977776136?text=${encodeURIComponent(message)}`;
    setWhatsappLink(waUrl);
    setIsSubmitted(true);

    // 3. Immediately trigger redirect to WhatsApp using clinic phone number
    try {
      const waWindow = window.open(waUrl, '_blank');
      // If popup blocker stops new tab, fallback navigation is also available
      if (!waWindow || waWindow.closed || typeof waWindow.closed === 'undefined') {
        // Fallback handled seamlessly via the prominent WhatsApp CTA in success state
      }
    } catch {
      // fallback button accessible in UI
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setPatientName('');
    setPhone('');
    setWhatsappLink('');
    onClose();
  };

  return (
    <>
      {/* 1. The Persistent Floating Booking Pill with Circular Progress Ring */}
      {!isOpen && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', damping: 14, stiffness: 180 }}
          className="fixed bottom-6 right-6 z-40 hidden sm:flex items-center justify-center pointer-events-auto max-w-[calc(100vw-24px)]"
        >
          <div className="relative flex items-center">
            {/* Circular Progress Indicator Wrapper */}
            <div className="relative group">
              <motion.button
                id="persistent-booking-pill"
                onClick={() => {
                  playPop();
                  onOpen();
                }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="gold-cta-btn animate-gold-shimmer relative flex items-center gap-2 sm:gap-3 px-3 py-2 sm:pl-4 sm:pr-3 sm:py-3 rounded-full shadow-md transition-all font-['Outfit',sans-serif] z-10 select-none cursor-pointer"
              >
                {/* Left Live Dot */}
                <div className="relative flex items-center justify-center shrink-0">
                  <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#0D1B2A]" />
                  <span className="absolute w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-[#0D1B2A] animate-ping opacity-60" />
                </div>

                {/* Pill Text - Compact on Mobile */}
                <div className="text-left pr-0.5">
                  <span className="block text-[10px] sm:text-[12px] font-black tracking-wider text-[#0D1B2A] uppercase leading-none">
                    <span className="sm:hidden">TOOTH HURTING? BOOK</span>
                    <span className="hidden sm:inline">TOOTH HURTING? BOOK VISIT</span>
                  </span>
                  <span className="hidden sm:block text-[9px] sm:text-[10px] text-[#0D1B2A]/80 font-bold leading-none mt-1">
                    Malabar Hill · Dr Deepal
                  </span>
                </div>

                {/* Circular Progress Ring Icon Container */}
                <div className="relative w-6 h-6 sm:w-9 sm:h-9 rounded-full flex items-center justify-center bg-[#0D1B2A] shrink-0 border border-[#415A77]">
                  <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 36 36">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-[#415A77]/40"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#D4C4A8"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      style={{
                        pathLength: smoothProgress,
                      }}
                    />
                  </svg>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#D4C4A8] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}

      {/* 2. Expanding Modal from Center with Spring Animation */}
      <AnimatePresence>
        {isOpen && (
          <div id="booking-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                playSoftClick();
                onClose();
              }}
              className="absolute inset-0 bg-[#0D1B2A]/85 backdrop-blur-xl"
            />

            {/* Panel expanding physically from center */}
            <motion.div
              initial={{ scale: 0.2, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.2, opacity: 0, y: 30 }}
              transition={{ type: 'spring', damping: 14, stiffness: 180 }}
              className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-[32px] sm:rounded-[36px] p-5 sm:p-8 shadow-2xl border-2 border-[#293549] z-10 text-[#293549]"
            >
              {/* Header Gradient Arc */}
              <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300" />

              {/* Close Button */}
              <button
                id="close-booking-modal-btn"
                onClick={() => {
                  playSoftClick();
                  onClose();
                }}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 flex items-center justify-center transition-all cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>

              {!isSubmitted ? (
                <div>
                  <div className="mb-5">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0F172A] bg-amber-100 px-3 py-1 rounded-full shadow-xs font-['Outfit',sans-serif] border border-amber-300/60 inline-flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      Guide Bldg · Malabar Hill
                    </span>
                    <h3 className="text-2xl font-extrabold text-[#0F172A] font-['Outfit',sans-serif] mt-2">
                      BOOK YOUR VISIT
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Select your preferred timing for Dr. Deepal's Dental Clinic.
                    </p>
                    {/* Open Hours Indicator */}
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200/70 px-2.5 py-1 rounded-lg">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>Mon–Fri: 11 AM – 7 PM | Sat: 11 AM – 4 PM</span>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Patient Name */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-['Outfit',sans-serif]">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                        <input
                          type="text"
                          required
                          value={patientName}
                          onChange={(e) => setPatientName(e.target.value)}
                          placeholder="e.g. Rohini Mehta"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white text-[#0F172A] placeholder:text-slate-400 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-['Outfit',sans-serif]">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amber-500" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="079777 76136"
                          className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white text-[#0F172A] placeholder:text-slate-400 text-xs sm:text-sm pl-10 pr-4 py-3 rounded-2xl outline-none transition-all font-medium"
                        />
                      </div>
                    </div>

                    {/* Service Selection */}
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1 font-['Outfit',sans-serif]">
                        Treatment Interest
                      </label>
                      <select
                        value={selectedService}
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white text-[#0F172A] text-xs sm:text-sm px-4 py-3 rounded-2xl outline-none transition-all font-medium cursor-pointer"
                      >
                        <option value="Consultation & General Checkup">Consultation & General Checkup</option>
                        <option value="Laser Teeth Whitening">Laser Teeth Whitening</option>
                        <option value="Custom Porcelain Veneers">Custom Porcelain Veneers</option>
                        <option value="Zirconia Dental Implants">Zirconia Dental Implants</option>
                        <option value="Single-Sitting Root Canal">Single-Sitting Root Canal</option>
                        <option value="Ultrasonic Hydro Cleaning">Ultrasonic Hydro Cleaning</option>
                        <option value="Emergency Toothache Relief">Emergency Toothache Relief</option>
                        <option value="Dental Bonding">Dental Bonding</option>
                        <option value="Dentures & Bridges">Dentures & Bridges</option>
                        <option value="Mouth Guards">Mouth Guards</option>
                        <option value="Paediatrics Dental Care">Paediatrics Dental Care</option>
                      </select>
                    </div>

                    {/* Preferred Slot */}
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Date
                        </label>
                        <select
                          value={preferredDate}
                          onChange={(e) => setPreferredDate(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white text-[#0F172A] text-xs px-3 py-2.5 rounded-xl outline-none cursor-pointer"
                        >
                          <option value="Today">Today</option>
                          <option value="Tomorrow">Tomorrow</option>
                          <option value="Saturday (11 AM – 4 PM)">Saturday</option>
                          <option value="Next Weekday (Mon–Fri)">Next Weekday</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Time Slot
                        </label>
                        <select
                          value={preferredTime}
                          onChange={(e) => setPreferredTime(e.target.value)}
                          className="w-full bg-slate-50 border border-slate-200 focus:border-amber-400 focus:bg-white text-[#0F172A] text-xs px-3 py-2.5 rounded-xl outline-none cursor-pointer"
                        >
                          <option value="Morning (11:00 AM – 1:00 PM)">11:00 AM – 1:00 PM</option>
                          <option value="Afternoon (1:00 PM – 4:00 PM)">1:00 PM – 4:00 PM</option>
                          <option value="Evening (4:00 PM – 7:00 PM)">4:00 PM – 7:00 PM</option>
                        </select>
                      </div>
                    </div>

                    {/* Submit Button with WhatsApp indicator */}
                    <motion.button
                      type="submit"
                      id="submit-booking-btn"
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                      className="w-full gold-cta-btn animate-gold-shimmer text-xs sm:text-base py-4 rounded-full shadow-xl transition-all flex items-center justify-center gap-2 mt-2 font-['Outfit',sans-serif] cursor-pointer tracking-wider uppercase font-black"
                    >
                      <MessageSquare className="w-4 h-4 text-[#0B1528]" />
                      <span>Confirm & Book on WhatsApp</span>
                      <span className="text-base font-black">↗</span>
                    </motion.button>
                  </form>
                </div>
              ) : (
                /* LOCALIZED SUCCESS STATE WITH DIRECT WHATSAPP REDIRECT */
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 200 }}
                  className="text-center py-2"
                >
                  {/* Localized Success Badge */}
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-800 text-[11px] font-black uppercase tracking-wider font-['Outfit',sans-serif] border border-emerald-300 mb-3 shadow-2xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>SUCCESS · सफलता</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] font-['Outfit',sans-serif] tracking-tight">
                    Visit Request Received!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1.5 mb-4 leading-relaxed">
                    Thank you <strong className="text-[#0F172A]">{patientName}</strong>! Your request for{' '}
                    <strong className="text-[#C58B1B]">{selectedService}</strong> ({preferredDate}, {preferredTime}) has been recorded.
                  </p>

                  {/* Direct WhatsApp Callout & CTA */}
                  <div className="bg-emerald-50 border border-emerald-200/90 rounded-2xl p-4 text-left mb-4 shadow-2xs">
                    <div className="flex items-start gap-3">
                      <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1 flex-wrap">
                          <span className="text-xs font-black text-emerald-950 font-['Outfit',sans-serif] uppercase tracking-wide">
                            WhatsApp Redirect Ready
                          </span>
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            +91 79777 76136
                          </span>
                        </div>
                        <p className="text-[11px] sm:text-xs text-emerald-800/90 mt-1 leading-relaxed">
                          Your appointment details have been compiled and sent to Dr. Deepal's WhatsApp number (<strong>079777 76136</strong>).
                        </p>
                        {whatsappLink && (
                          <a
                            href={whatsappLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 mt-3 w-full px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black rounded-xl transition-all shadow-sm uppercase tracking-wide font-['Outfit',sans-serif]"
                          >
                            <MessageSquare className="w-4 h-4" />
                            <span>Continue to WhatsApp Chat ↗</span>
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Exact Updated Clinic Location & Timings */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-left text-xs text-slate-600 space-y-1.5 mb-5">
                    <p className="font-bold text-[#0F172A] flex items-center gap-1.5 font-['Outfit',sans-serif]">
                      <MapPin className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                      <span>{CLINIC_DETAILS.name}</span>
                    </p>
                    <p className="text-[11px] sm:text-xs text-slate-700 leading-relaxed font-medium">
                      {EXACT_CLINIC_ADDRESS}
                    </p>
                    <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-amber-600 shrink-0" />
                        <span><strong>Hours:</strong> Mon–Fri 11:00 AM – 7:00 PM | Sat 11:00 AM – 4:00 PM (Sun Closed)</span>
                      </div>
                      <div className="flex justify-between pt-1 text-slate-500">
                        <span>📞 079777 76136</span>
                        <span>Patient: <strong className="text-slate-800">{phone}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* Done & Close Button */}
                  <motion.button
                    onClick={handleReset}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', damping: 12, stiffness: 300 }}
                    className="w-full gold-cta-btn animate-gold-shimmer text-xs py-3.5 rounded-full transition-all cursor-pointer tracking-wider uppercase shadow-lg font-black"
                  >
                    Done & Close
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
