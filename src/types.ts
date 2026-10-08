export type TreatmentType = 'whitening' | 'veneers' | 'implants' | 'rootcanal' | 'cleaning';

export interface TreatmentInfo {
  id: TreatmentType;
  name: string;
  shortDesc: string;
  tagline: string;
  duration: string;
  badge: string;
  benefits: string[];
  imageSrc?: string;
  surgicalHighlight?: string;
}

export interface ReviewItem {
  id: string;
  patientName: string;
  treatment: string;
  rating: number;
  date: string;
  reviewText: string;
  avatarUrl?: string;
  avatarLetter?: string;
  avatarBg?: string;
  stats?: string;
  rotation: number;
  verified: boolean;
  highlightPhrase?: string;
}

export interface DoctorCredential {
  id: string;
  title: string;
  subtitle: string;
  iconName: string;
  position: { x: number; y: number };
}

export interface ClinicHotspot {
  id: string;
  label: string;
  description: string;
  x: number; // percentage
  y: number; // percentage
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ClinicSpacePhoto {
  id: string;
  title: string;
  subtitle: string;
  imageSrc: string;
  tag: string;
}

export interface ClinicService {
  id: string;
  name: string;
  category: string;
  shortDesc: string;
  imageSrc: string;
  tag: string;
  badge: string;
  color: string;
}
