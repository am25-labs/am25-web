export interface Author {
  first_name: string;
  last_name: string;
  avatar_url: string;
}

// --- Collections ---

export interface Work {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  status: string;
  date: string;
  cover: string;
  description?: string;
  quote?: string;
  images_before?: string[];
  images_after?: string[];
  client?: string;
  campaign?: string;
  agency?: string;
  country?: string;
  creative?: string;
  strategy?: string;
  lead_design?: string;
  design?: string;
  copy?: string;
  illustration?: string;
  animation?: string;
  photo?: string;
  developer?: string;
  work_team?: string;
  author: Author;
  created_at: string;
  updated_at: string;
}

export interface Note {
  id: string;
  title: string;
  slug: string;
  cover: string;
  content: string;
  status: string;
  author: Author;
  created_at: string;
  updated_at: string;
}

// --- Single Types ---

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
  created_at: string;
  updated_at: string;
}

export interface LegalPage {
  id: string;
  content: string;
  date?: string;
  status: string;
  author: Author;
  created_at: string;
  updated_at: string;
}
