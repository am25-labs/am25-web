export interface Author {
  first_name: string;
  last_name: string;
  avatar_url: string | null;
  job_title: string | null;
  organization: string | null;
  country: string | null;
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

// Collections

export interface Work {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  description: string | null;
  quote: string | null;
  images_before: string[] | null;
  images_after: string[] | null;
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
  status: string;
  author: Author;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  title: string;
  slug: string;
  cover: string | null;
  content: string;
  category: NoteCategory | null;
  status: string;
  author: Author;
  published_at: string;
  created_at: string;
  updated_at: string;
}

// Single Types

export interface Service {
  label: string;
  content: string;
}

export interface Home {
  id: string;
  quote: string;
  services: Service[];
  status: string;
  author: Author;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface FaqItem {
  label: string;
  description: string;
}

export interface About {
  id: string;
  quote: string;
  description: string;
  faq: FaqItem[];
  status: string;
  author: Author;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface LegalPage {
  id: string;
  content: string;
  date?: string;
  status: string;
  author: Author;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface PlankPage {
  id: string;
  logo: string | null;
  content: string;
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}

export interface NavigationItem {
  label: string;
  href: string;
  items?: NavigationItem[];
}

export interface Navigation {
  id: string;
  main_nav?: NavigationItem[];
  footer_nav?: NavigationItem[];
  status: string;
  published_at: string;
  created_at: string;
  updated_at: string;
}
