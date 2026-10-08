/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CLINIC_IMAGES } from './data/clinicData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ClinicExperienceGuide } from './components/ClinicExperienceGuide';
import { ServicesCarousel } from './components/ServicesCarousel';
import { InteractiveToothStage } from './components/InteractiveToothStage';
import { ClinicShowcaseStack } from './components/ClinicShowcaseStack';
import { SmileResultsMirror } from './components/SmileResultsMirror';
import { DoctorSection } from './components/DoctorSection';
import { PatientReviewsStack } from './components/PatientReviewsStack';
import { LocationSection } from './components/LocationSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { FloatingObjects } from './components/FloatingObjects';
import { BackgroundParticleCanvas } from './components/BackgroundParticleCanvas';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedTreatmentForBooking, setSelectedTreatmentForBooking] = useState<string>('Consultation & General Checkup');

  // Preload essential clinic imagery immediately on initial load
  useEffect(() => {
    Object.values(CLINIC_IMAGES).forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  const handleOpenBooking = (treatmentName?: string) => {
    if (treatmentName) {
      setSelectedTreatmentForBooking(treatmentName);
    }
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
  };

  return (
    <div className="relative min-h-screen bg-[#F4F1DE] text-[#0F172A] selection:bg-[#293549] selection:text-white font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden">
      
      {/* Seamless Ambient Background Gradient Illumination Mesh */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] sm:w-[900px] h-[500px] sm:h-[700px] bg-[#FAF8ED]/90 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-0 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] bg-[#D4C4A8]/20 rounded-full blur-[150px]" />
        <div className="absolute top-2/3 left-0 w-[500px] sm:w-[800px] h-[500px] sm:h-[800px] bg-[#EAE5D4]/70 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[600px] sm:w-[900px] h-[500px] sm:h-[700px] bg-[#D4C4A8]/25 rounded-full blur-[150px]" />
      </div>

      {/* 0. Subtle Lightweight Canvas Particles & Sparkles (requestAnimationFrame) */}
      <BackgroundParticleCanvas />

      {/* 1. Minimal Center-Expanding Navigation Header */}
      <Navbar onOpenBooking={() => handleOpenBooking()} />

      {/* 2. Physical Floating Interactive Dental Objects */}
      <FloatingObjects />

      {/* 3. Main Continuous Cinematic Experience */}
      <main className="relative z-10 space-y-2 sm:space-y-4">
        {/* HERO: Cinematic 3D Tooth & Miniature Workers */}
        <HeroSection onOpenBooking={() => handleOpenBooking()} />

        {/* CLINIC EXPERIENCE GUIDE: Interactive Visual Guide for Real Patients */}
        <ClinicExperienceGuide />

        {/* SERVICES / WHAT WE OFFER: 5-Card Interactive 3D Depth Arc Carousel with 18 Services */}
        <ServicesCarousel onSelectTreatment={(name) => handleOpenBooking(name)} />

        {/* TREATMENTS: Large Interactive 3D Transforming Tooth */}
        <InteractiveToothStage
          onSelectTreatmentForBooking={(name) => handleOpenBooking(name)}
        />

        {/* CLINIC SPACE: Inside Our Clinic */}
        <ClinicShowcaseStack />

        {/* RESULTS: Before & After Smile Slider */}
        <SmileResultsMirror />

        {/* DOCTOR: Dr. Deepal Center-Unfolding Interactive Pill */}
        <DoctorSection onOpenBooking={() => handleOpenBooking()} />

        {/* REVIEWS: 3D Floating Polaroid Stack */}
        <PatientReviewsStack />

        {/* LOCATION: Malabar Hill Mumbai 3D Isometric Map with Zoom */}
        <LocationSection />

        {/* FAQ: Clean Minimal Accordion */}
        <FaqSection />
      </main>

      {/* 5. Minimal Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* 6. Persistent Floating Booking Pill with Circular Scroll Progress & Center-Expanding Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        onOpen={() => handleOpenBooking()}
        defaultTreatment={selectedTreatmentForBooking}
      />
    </div>
  );
}

