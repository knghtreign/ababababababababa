import { TreatmentInfo, ReviewItem, ClinicHotspot, FaqItem, ClinicSpacePhoto, ClinicService } from '../types';

import heroToothWorkers from '../assets/images/hero_workers_tooth_1788252748342.jpg';
import isometricClinic from '../assets/images/isometric_clinic_1788252767756.jpg';
import drDeepalPortrait from '../assets/images/dr_deepal_portrait_1788253822193.jpg';
import drDeepalPortraitOld from '../assets/images/dr_deepal_portrait_1788252789547.jpg';
import malabarMap from '../assets/images/mumbai_malabar_map_1788252835651.jpg';
import smileResult from '../assets/images/smile_result_1788252853269.jpg';
import clinicSuite from '../assets/images/clinic_suite_interior_1788253761760.jpg';
import dentistAction from '../assets/images/dentist_treatment_action_1788253779087.jpg';
import clinicLounge from '../assets/images/clinic_lounge_reception_1788253794362.jpg';
import digitalScanner from '../assets/images/digital_dental_scanner_1788253808531.jpg';
import titaniumImplant from '../assets/images/titanium_dental_implant_1788260427614.jpg';
import patientPriya from '../assets/images/patient_priya_avatar_1788254358383.jpg';
import patientRahul from '../assets/images/patient_rahul_avatar_1788254378193.jpg';
import patientAnanya from '../assets/images/patient_ananya_avatar_1788254397087.jpg';
import paediatrics from '../assets/images/paediatric_dental_care_1788595045588.jpg';
import veneersCrowns from '../assets/images/dental_veneer_crown_1788595062863.jpg';
import dentalXray from '../assets/images/dental_xray_modern_1788595079091.jpg';
import dentalBonding from '../assets/images/dental_bonding_macro_1788595094151.jpg';
import serviceDentures from '../assets/images/service_dentures.jpg';
import serviceExtractions from '../assets/images/service_extractions.jpg';
import serviceFillings from '../assets/images/service_fillings.jpg';
import serviceMouthguards from '../assets/images/service_mouthguards.jpg';
import serviceRootcanals from '../assets/images/service_rootcanals.jpg';
import serviceCleaning from '../assets/images/service_cleaning.jpg';
import serviceReshaping from '../assets/images/service_reshaping.jpg';

// Professional realistic photography for all 18 clinical dental treatments
import realTeethWhitening from '../assets/images/treatments/real_teeth_whitening.jpg';
import realDentalBonding from '../assets/images/dental_bonding_macro_1788595094151.jpg';
import realCheckups from '../assets/images/treatments/real_checkups.jpg';
import realCosmeticProcedures from '../assets/images/treatments/real_cosmetic_procedures.jpg';
import realDentalImplants from '../assets/images/titanium_dental_implant_1788260427614.jpg';
import realDenturesBridges from '../assets/images/treatments/real_dentures_bridges.jpg';
import realEmergencyCare from '../assets/images/treatments/real_emergency_care.jpg';
import realExtractions from '../assets/images/service_extractions.jpg';
import realFillingsSealants from '../assets/images/treatments/real_fillings_sealants.jpg';
import realMouthGuards from '../assets/images/treatments/real_mouth_guards.jpg';
import realOnlineBooking from '../assets/images/treatments/real_online_booking.jpg';
import realOralSurgery from '../assets/images/dentist_treatment_action_1788253779087.jpg';
import realPaediatrics from '../assets/images/treatments/real_paediatrics.jpg';
import realRootCanals from '../assets/images/service_rootcanals.jpg';
import realTeethCleaning from '../assets/images/service_cleaning.jpg';
import realTeethReshaping from '../assets/images/treatments/real_teeth_reshaping.jpg';
import realVeneersCrowns from '../assets/images/dental_veneer_crown_1788595062863.jpg';
import realXray from '../assets/images/treatments/real_xray.jpg';

// Clinic image asset paths (bundled by Vite for development & production)
export const CLINIC_IMAGES = {
  heroToothWorkers,
  isometricClinic,
  drDeepalPortrait,
  drDeepalPortraitOld,
  malabarMap,
  smileResult,
  clinicSuite,
  dentistAction,
  clinicLounge,
  digitalScanner,
  titaniumImplant,
  patientPriya,
  patientRahul,
  patientAnanya,
  paediatrics,
  veneersCrowns,
  dentalXray,
  dentalBonding,
  serviceDentures,
  serviceExtractions,
  serviceFillings,
  serviceMouthguards,
  serviceRootcanals,
  serviceCleaning,
  serviceReshaping,
  // 18 realistic treatment photographs
  realTeethWhitening,
  realDentalBonding,
  realCheckups,
  realCosmeticProcedures,
  realDentalImplants,
  realDenturesBridges,
  realEmergencyCare,
  realExtractions,
  realFillingsSealants,
  realMouthGuards,
  realOnlineBooking,
  realOralSurgery,
  realPaediatrics,
  realRootCanals,
  realTeethCleaning,
  realTeethReshaping,
  realVeneersCrowns,
  realXray,
};

export const CLINIC_DETAILS = {
  name: "Dr Deepals Dental Clinic",
  doctor: "Dr. Deepal",
  role: "Cosmetic & Restorative Dental Surgeon",
  tagline: "Your smile, looked after.",
  subtext: "Dr Deepals Dental Clinic · Malabar Hill",
  address: "Guide Building, Gate No. 2, Shop No. 9, Ground Floor, Near Priyadarshini Park, L.D. Ruparel Marg, Malabar Hill, Mumbai 400006",
  phone: "079777 76136",
  phoneClean: "+917977776136",
  email: "drdeepaldental@gmail.com",
  rating: "5.0",
  totalReviews: 84,
  neighborhood: "Malabar Hill, South Mumbai",
  landmark: "Guide Building, Gate No. 2 (Near Priyadarshini Park)",
  hours: "Monday – Friday: 11:00 AM – 7:00 PM | Saturday: 11:00 AM – 4:00 PM | Sunday: Closed",
  mapLink: "https://maps.app.goo.gl/h5W6TMUFYsorp8uw9?g_st=ac",
  googleProfile: "https://maps.app.goo.gl/h5W6TMUFYsorp8uw9?g_st=ac",
};

export const TREATMENTS: TreatmentInfo[] = [
  {
    id: 'whitening',
    name: 'WHITENING',
    shortDesc: 'Laser-activated enamel brightening for a radiant, luminous natural shade.',
    tagline: 'Up to 8 shades whiter in 45 minutes.',
    duration: '45 mins',
    badge: 'Gentle Laser System',
    benefits: ['Zero enamel abrasion', 'Immediate visible results', 'Long-lasting glow'],
    imageSrc: realTeethWhitening,
    surgicalHighlight: 'Gentle laser brightening',
  },
  {
    id: 'veneers',
    name: 'VENEERS',
    shortDesc: 'Ultra-thin handcrafted porcelain shells designed for harmonic smile symmetry.',
    tagline: 'Custom sculpted porcelain perfection.',
    duration: '2 appointments',
    badge: 'Micro-Thin Porcelain',
    benefits: ['Custom color-matched', 'Stain-resistant finish', 'Preserves natural tooth'],
    imageSrc: realVeneersCrowns,
    surgicalHighlight: 'Precision aesthetic porcelain',
  },
  {
    id: 'implants',
    name: 'IMPLANTS',
    shortDesc: 'Titanium bio-integrated fixtures crowned with lifelike zirconia teeth.',
    tagline: 'Permanent, rock-solid root replacement.',
    duration: 'Lifelong durability',
    badge: 'Precision 3D Guided',
    benefits: ['Natural chewing strength', 'Bone preservation', 'Indistinguishable from natural'],
    imageSrc: realDentalImplants,
    surgicalHighlight: 'Bio-integrated titanium root',
  },
  {
    id: 'rootcanal',
    name: 'ROOT CANAL',
    shortDesc: 'Microscopic single-visit nerve therapy with painless rotary instruments.',
    tagline: 'Instant pain relief with zero trauma.',
    duration: 'Single sitting',
    badge: '100% Pain-Free Rotary',
    benefits: ['Saves natural tooth', 'Computer-controlled depth', 'Silent comfortable experience'],
    imageSrc: realRootCanals,
    surgicalHighlight: 'Pain-free single-visit therapy',
  },
  {
    id: 'cleaning',
    name: 'CLEANING',
    shortDesc: 'Ultrasonic air-polishing therapy eliminating biofilm and stubborn stains.',
    tagline: 'Deep prophylaxis & fresh gum rejuvenation.',
    duration: '30 mins',
    badge: 'Ultrasonic Hydro-Glow',
    benefits: ['Gentle on sensitivity', 'Polishes tea/coffee stains', 'Promotes gum vitality'],
    imageSrc: realTeethCleaning,
    surgicalHighlight: 'Ultrasonic stain & plaque removal',
  },
];

export const CLINIC_HOTSPOTS: ClinicHotspot[] = [
  {
    id: 'care',
    label: 'Modern care',
    description: 'Digital intraoral diagnostics and gentle dental treatment.',
    x: 48,
    y: 42,
  },
  {
    id: 'comfort',
    label: 'Comfortable visits',
    description: 'Ergonomic memory-foam dental suites designed for comfort.',
    x: 28,
    y: 65,
  },
  {
    id: 'personal',
    label: 'Personal attention',
    description: 'Dr. Deepal personally oversees every minute of your treatment.',
    x: 72,
    y: 50,
  },
  {
    id: 'gentle',
    label: 'Gentle touch',
    description: 'Specialized stress-free protocols for anxious patients.',
    x: 60,
    y: 78,
  }
];



export const REVIEWS: ReviewItem[] = [
  {
    id: 'rev-google-1',
    patientName: "Lymaraina D'souza",
    avatarLetter: "L",
    avatarBg: "#E65100",
    stats: "2 reviews · 3 photos",
    treatment: "Comprehensive Dental Care & Consultation",
    rating: 5,
    date: "9 months ago",
    reviewText: "Very professional and skilled, top to bottom. Cannot recommend her more highly. Dr. Deepal is so thorough and informative, and lets you know every step of the way what’s going on so there are no surprises. Very calming, as well. Her staff was courteous friendly and professional. They really took the time necessary to do everything right – and as a new patient took some really good time to get to know me and my dental needs. Great dental experience! They don’t try to sell you services you don’t need like other dentists in town. I highly recommend Dr Deepals Dental Clinic",
    highlightPhrase: "They don’t try to sell you services you don’t need like other dentists in town.",
    rotation: -2,
    verified: true
  },
  {
    id: 'rev-google-2',
    patientName: "Pooja Shah",
    avatarLetter: "P",
    avatarBg: "#607D8B",
    stats: "9 reviews · 1 photo",
    treatment: "Preventative Check-up & Care",
    rating: 5,
    date: "8 months ago",
    reviewText: "Dr. Deepal is not only highly skilled but also genuinely caring. She took the time to thoroughly explain my treatment options, answer all of my questions, and ensure that I was comfortable throughout the entire process. It’s rare to find a dentist who combines expertise with such a personal touch. I highly recommend to anyone looking for top-notch dental care. I’ll definitely be returning for my next check-up!",
    highlightPhrase: "It’s rare to find a dentist who combines expertise with such a personal touch.",
    rotation: 3,
    verified: true
  },
  {
    id: 'rev-google-3',
    patientName: "Pram",
    avatarLetter: "P",
    avatarBg: "#5E35B1",
    stats: "2 reviews",
    treatment: "Cavity Cleaning & Composite Filling",
    rating: 5,
    date: "2 months ago",
    reviewText: "Dr. Deepali is very knowledgeable and does her job thoroughly. I got my cavity cleaned and filled again as it was not done right the first time somewhere else. I am fully satisfied with her treatment and would highly recommend her for all tooth problems.",
    highlightPhrase: "I am fully satisfied with her treatment and would highly recommend her for all tooth problems.",
    rotation: -3,
    verified: true
  },
  {
    id: 'rev-google-4',
    patientName: "Taran Mundkar",
    avatarLetter: "T",
    avatarBg: "#EF6C00",
    stats: "3 reviews",
    treatment: "Check-up, Cleaning & Dental Crown",
    rating: 5,
    date: "5 months ago",
    reviewText: "I had a great experience with Dr. Deepal. I initially went in for a general check-up and cleaning, and ended up needing a crown as well. She was very professional, explained the procedure clearly, and made sure I was comfortable throughout. The entire process was smooth and well-handled. Highly recommend her for anyone looking for a reliable dentist.",
    highlightPhrase: "The entire process was smooth and well-handled. Highly recommend her for anyone looking for a reliable dentist.",
    rotation: 2,
    verified: true
  },
  {
    id: 'rev-google-5',
    patientName: "Aangi Shah",
    avatarLetter: "A",
    avatarBg: "#0288D1",
    stats: "6 reviews",
    treatment: "Painless Teeth Clean Up",
    rating: 5,
    date: "7 months ago",
    reviewText: "Dr Deepal is one of the most empathetic dentists I have met - extremely skilled, very diligent and intentional and extremely receptive to all the issues. My first painless clean up ever! I don't think I imagine myself going to any other dentist ever again :)",
    highlightPhrase: "My first painless clean up ever! I don't think I imagine myself going to any other dentist ever again :)",
    rotation: -4,
    verified: true
  },
  {
    id: 'rev-google-6',
    patientName: "Sweta Virani",
    avatarLetter: "S",
    avatarBg: "#546E7A",
    stats: "5 reviews · 3 photos",
    treatment: "Comprehensive Dental Care & Family Visit",
    rating: 5,
    date: "a year ago",
    reviewText: "The most amazing place for all your dental problems. The team is extremely thoughtful, gentle and meticulous. Dr. Deepal is highly skilled and knowledgeable.I had a wonderful experience overall and would definitely recommend this place to my friends and family.",
    highlightPhrase: "The team is extremely thoughtful, gentle and meticulous. Dr. Deepal is highly skilled and knowledgeable.",
    rotation: 3,
    verified: true
  },
  {
    id: 'rev-google-7',
    patientName: "Harsh Shah",
    avatarLetter: "H",
    avatarBg: "#E91E63",
    stats: "4 reviews",
    treatment: "Root Canal Treatment",
    rating: 5,
    date: "4 months ago",
    reviewText: "Well, i had a root canal treatment from Dr deepal, and it was really flowless, did not come to know when the treatment ended, very through and perfect in her work...very light and gentle treatment, Generally dental treatment is always scary and I also had gone with the same mindset but it was really so smooth and precise first time ever in my life I can say i enjoyed the dental treatment...",
    highlightPhrase: "First time ever in my life I can say i enjoyed the dental treatment...",
    rotation: -2,
    verified: true
  },
  {
    id: 'rev-google-8',
    patientName: "Preksha Shah",
    avatarLetter: "P",
    avatarBg: "#795548",
    stats: "8 reviews",
    treatment: "Routine Cleaning & Care",
    rating: 5,
    date: "8 months ago",
    reviewText: "I’ve always had a great experience with Dr Deepal she is extremely professional, gentle and made me feel completely comfortable. I’m very happy with my results and it’s my go to place for a quick clean up. Highly recommend you to go here!!",
    highlightPhrase: "Extremely professional, gentle and made me feel completely comfortable.",
    rotation: 4,
    verified: true
  },
  {
    id: 'rev-google-9',
    patientName: "Jagdish Tungaria",
    avatarLetter: "J",
    avatarBg: "#43A047",
    stats: "4 reviews · 2 photos",
    treatment: "Emergency Diagnostic & Painless Relief",
    rating: 5,
    date: "2 years ago",
    reviewText: "Had a very good experience at Dr Deepals Dental Clinic. Dr Deepal’s investigating and diagnostic skills are appreciable. She explains well about the problems, options available for the line of treatment. I was having pain in my teeth and had met Dr. Deepal on the eve of my foreign trip and she ensured that I fly painless. Regular treatment experience subsequently was also very good. Thumps up for the Dr. Deepal and the support team.",
    highlightPhrase: "I was having pain in my teeth on the eve of my foreign trip and she ensured that I fly painless.",
    rotation: -3,
    verified: true
  },
  {
    id: 'rev-google-10',
    patientName: "Mahendra Zaveri",
    avatarLetter: "M",
    avatarBg: "#00897B",
    stats: "5 reviews",
    treatment: "Root Canal & Restorative Care",
    rating: 5,
    date: "Verified Google Review",
    reviewText: "Very gentle on operating and with perfection. Very satisfying, no complaints at all. Dr. Deepal is patient friendly and explains every step with complete clarity. Truly unhurried, comfortable, and pain-free experience.",
    highlightPhrase: "Very gentle on operating and with perfection. Dr. Deepal is patient friendly.",
    rotation: 2,
    verified: true
  }
];

export const DOCTOR_CREDENTIALS = [
  { id: 'c1', title: '21 Years', subtitle: 'Clinical Excellence' },
  { id: 'c2', title: 'MDS Prosthodontics', subtitle: '& Aesthetic Dentistry' },
  { id: 'c3', title: '5.0 ★ Rating', subtitle: '90+ Google Reviews' },
  { id: 'c4', title: 'Malabar Hill', subtitle: 'Private Practice' },
  { id: 'c5', title: '100% Pain-Free', subtitle: 'Gentle Patient Care' },
];

export const CLINIC_PHOTOS: ClinicSpacePhoto[] = [
  {
    id: 'space-1',
    title: 'Private Operatory Suite',
    subtitle: 'Ergonomic dental chair with comfortable, clean surroundings',
    imageSrc: CLINIC_IMAGES.clinicSuite,
    tag: 'THE SUITE'
  },
  {
    id: 'space-2',
    title: 'Dr. Deepal in Procedure',
    subtitle: 'Experienced dental care with gentle patient guidance',
    imageSrc: CLINIC_IMAGES.dentistAction,
    tag: 'CARE IN ACTION'
  },
  {
    id: 'space-3',
    title: 'Comfortable Patient Lounge',
    subtitle: 'A clean, welcoming space designed for relaxed consultations',
    imageSrc: CLINIC_IMAGES.clinicLounge,
    tag: 'THE SPACE'
  },
  {
    id: 'space-4',
    title: 'Modern Treatment Suite',
    subtitle: 'Equipped with modern dental technology for your safety and comfort',
    imageSrc: CLINIC_IMAGES.digitalScanner,
    tag: 'MODERN CLINIC'
  },
  {
    id: 'space-5',
    title: 'Sterilization & Hygiene',
    subtitle: 'Hospital-grade autoclaving and strict biological hygiene protocols',
    imageSrc: CLINIC_IMAGES.heroToothWorkers,
    tag: 'CLEAN PROTOCOLS'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    question: 'Do I need an appointment before visiting?',
    answer: 'Yes, we operate as a private clinic to ensure Dr. Deepal provides dedicated, unhurried time for each patient. For acute dental emergencies or toothaches, same-day priority walk-in slots are always preserved.'
  },
  {
    id: 'faq-2',
    question: 'What treatments do you offer at Malabar Hill?',
    answer: 'We provide 18 specialized dental services: Teeth Whitening, Bonding, Check-ups, Cosmetic Procedures, Dental Implants, Dentures & Bridges, Emergency Care, Extractions, Fillings & Sealants, Mouth Guards, Online Dentist Booking, Oral Surgery, Paediatrics, Root Canals, Teeth Cleaning, Teeth Reshaping, Veneers & Crowns, and digital X-Rays.'
  },
  {
    id: 'faq-3',
    question: 'How much does a consultation cost?',
    answer: 'Our comprehensive consultation includes a detailed dental examination and personalized treatment plan with upfront, transparent pricing. No hidden fees or unexpected charges.'
  },
  {
    id: 'faq-5',
    question: 'Where is the clinic located in Malabar Hill?',
    answer: 'We are situated at Guide Building, Gate No. 2, Shop No. 9, Ground Floor, Near Priyadarshini Park, L.D. Ruparel Marg, Malabar Hill, Mumbai 400006, with easy curbside parking access.'
  },
  {
    id: 'faq-6',
    question: 'How can I book or reschedule my visit?',
    answer: 'You can instantly request your preferred date and time through the floating booking pill on this page, or speak directly with our clinic coordinator at 079777 76136.'
  }
];

export const CLINIC_SERVICES: ClinicService[] = [
  {
    id: 'srv-whitening',
    name: 'Teeth Whitening',
    category: 'AESTHETICS',
    shortDesc: 'Gentle laser-activated whitening brightening enamel up to 8 shades.',
    imageSrc: realTeethWhitening,
    tag: 'WHITENING',
    badge: 'Laser Brightening',
    color: '#D4C4A8',
  },
  {
    id: 'srv-bonding',
    name: 'Bonding',
    category: 'COSMETIC',
    shortDesc: 'Artistic composite resin sculpting fixing chips, gaps, and edges.',
    imageSrc: realDentalBonding,
    tag: 'BONDING',
    badge: 'Micro-Sculpting',
    color: '#778D7A',
  },
  {
    id: 'srv-checkups',
    name: 'Check-ups',
    category: 'PREVENTIVE',
    shortDesc: 'Comprehensive oral wellness examination and consultation.',
    imageSrc: realCheckups,
    tag: 'CHECK-UPS',
    badge: 'Gentle Exam',
    color: '#415A77',
  },
  {
    id: 'srv-cosmetics',
    name: 'Cosmetic Procedures',
    category: 'SMILE DESIGN',
    shortDesc: 'Bespoke smile transformations tailored to natural facial harmony.',
    imageSrc: realCosmeticProcedures,
    tag: 'COSMETICS',
    badge: 'Bespoke Aesthetics',
    color: '#D4C4A8',
  },
  {
    id: 'srv-implants',
    name: 'Dental Implants',
    category: 'RESTORATION',
    shortDesc: 'Computer-guided titanium implants paired with lifelike zirconia crowns.',
    imageSrc: realDentalImplants,
    tag: 'IMPLANTS',
    badge: 'Permanent Root Fix',
    color: '#778D7A',
  },
  {
    id: 'srv-dentures',
    name: 'Dentures & Bridges',
    category: 'PROSTHETICS',
    shortDesc: 'Custom fixed bridges and featherlight flexible modern prosthetics.',
    imageSrc: realDenturesBridges,
    tag: 'BRIDGES',
    badge: 'Natural Alignment',
    color: '#415A77',
  },
  {
    id: 'srv-emergency',
    name: 'Emergency Care',
    category: 'URGENT RELIEF',
    shortDesc: 'Same-day priority intervention for acute toothache or trauma.',
    imageSrc: realEmergencyCare,
    tag: 'EMERGENCY',
    badge: 'Immediate Relief',
    color: '#D4C4A8',
  },
  {
    id: 'srv-extractions',
    name: 'Extractions',
    category: 'SURGICAL',
    shortDesc: 'Atraumatic gentle tooth removal with soothing numbing protocols.',
    imageSrc: realExtractions,
    tag: 'EXTRACTION',
    badge: 'Gentle & Painless',
    color: '#778D7A',
  },
  {
    id: 'srv-fillings',
    name: 'Fillings & Sealants',
    category: 'RESTORATION',
    shortDesc: 'Seamless tooth-colored composite resins and cavity-guard sealants.',
    imageSrc: realFillingsSealants,
    tag: 'FILLINGS',
    badge: 'Invisible Shield',
    color: '#415A77',
  },
  {
    id: 'srv-guards',
    name: 'Mouth Guards',
    category: 'PROTECTION',
    shortDesc: 'Precision-molded guards for nighttime bruxism and athletic sports.',
    imageSrc: realMouthGuards,
    tag: 'GUARDS',
    badge: 'Custom Molded',
    color: '#D4C4A8',
  },
  {
    id: 'srv-booking',
    name: 'Online Dentist Booking',
    category: 'CONVENIENCE',
    shortDesc: 'Instant verified reservation directly into Dr. Deepal’s schedule.',
    imageSrc: realOnlineBooking,
    tag: 'BOOKING',
    badge: 'Instant Confirmation',
    color: '#778D7A',
  },
  {
    id: 'srv-surgery',
    name: 'Oral Surgery',
    category: 'SURGERY',
    shortDesc: 'Sterile surgical suite for wisdom teeth, bone grafting, and contouring.',
    imageSrc: realOralSurgery,
    tag: 'SURGERY',
    badge: 'Hospital-Grade Care',
    color: '#415A77',
  },
  {
    id: 'srv-paediatrics',
    name: 'Paediatrics',
    category: 'CHILD CARE',
    shortDesc: 'Warm, fun, and fear-free dental visits designed specifically for young smiles.',
    imageSrc: realPaediatrics,
    tag: 'KIDS CARE',
    badge: 'Fear-Free Comfort',
    color: '#D4C4A8',
  },
  {
    id: 'srv-rootcanal',
    name: 'Root Canals',
    category: 'ENDODONTICS',
    shortDesc: 'Microscopic single-sitting rotary therapy relieving pain permanently.',
    imageSrc: realRootCanals,
    tag: 'ROOT CANAL',
    badge: 'Single-Sitting',
    color: '#778D7A',
  },
  {
    id: 'srv-cleaning',
    name: 'Teeth Cleaning',
    category: 'HYGIENE',
    shortDesc: 'Ultrasonic hydro-polishing dissolving plaque, tartar, and coffee stains.',
    imageSrc: realTeethCleaning,
    tag: 'CLEANING',
    badge: 'Ultrasonic Glow',
    color: '#415A77',
  },
  {
    id: 'srv-reshaping',
    name: 'Teeth Reshaping',
    category: 'AESTHETICS',
    shortDesc: 'Subtle micro-contouring smoothing jagged edges and uneven enamel.',
    imageSrc: realTeethReshaping,
    tag: 'RESHAPING',
    badge: 'Enamel Sculpting',
    color: '#D4C4A8',
  },
  {
    id: 'srv-veneers',
    name: 'Veneers & Crowns',
    category: 'PROSTHODONTICS',
    shortDesc: 'Handcrafted wafer-thin porcelain veneers and monolithic zirconia crowns.',
    imageSrc: realVeneersCrowns,
    tag: 'VENEERS',
    badge: 'Custom Porcelain',
    color: '#778D7A',
  },
  {
    id: 'srv-xray',
    name: 'X-Ray',
    category: 'DIAGNOSTICS',
    shortDesc: 'Low-radiation 2D digital imaging used when needed for accurate diagnosis.',
    imageSrc: realXray,
    tag: 'DIGITAL X-RAY',
    badge: '2D Digital X-Ray',
    color: '#415A77',
  },
];

