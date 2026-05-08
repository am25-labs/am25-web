import type { PlankMedia, PlankMediaGallery } from "@plank-cms/client";

export interface Author {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  job_title: string | null;
  organization: string | null;
  country: string | null;
}

// Items
export interface NavigationItem {
  label: string;
  href: string;
  items?: NavigationItem[];
}

export interface FaqItem {
  label: string;
  description: string;
}

export interface Discipline {
  id: string;
  title: string;
  slug: string;
}

export interface NoteCategory {
  id: string;
  title: string;
  slug: string;
}

export interface Service {
  label: string;
}

// Collection Types
export interface Work {
  id: string;
  title: string;
  slug: string;
  cover: PlankMedia | null;
  description: string | null;
  quote: string | null;
  images_before: PlankMediaGallery | null;
  images_after: PlankMediaGallery | null;
  client: string | null;
  campaign: string | null;
  country: string | null;
  creative: string | null;
  strategy: string | null;
  lead_design: string | null;
  design: string | null;
  copy: string | null;
  illustration: string | null;
  animation: string | null;
  photo: string | null;
  develop: string | null;
  date: string | null;
  featured: boolean;
  case_study: boolean;
  work_team: string | null;
  disciplines: Discipline[];
}

export interface Note {
  id: string;
  title: string;
  slug: string;
  cover: PlankMedia | null;
  content: string;
  category: NoteCategory | null;
  author: Author;
  published_at: string;
}

// Single Types
export interface Home {
  id: string;
  heading: string;
  description: string;
  quote: string;
  services: Service[];
}

export interface About {
  id: string;
  quote: string;
  description: string;
  faq: FaqItem[];
}

export interface LegalPage {
  id: string;
  content: string;
  date?: string;
}

export interface Navigation {
  id: string;
  main_nav?: NavigationItem[];
  footer_nav?: NavigationItem[];
}

export interface Footer {
  id: string;
  claim: string;
}
