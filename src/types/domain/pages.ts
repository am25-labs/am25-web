import type { FaqItem } from "./index";

// Home
export interface Home {
  id: string;
  heading: string;
  description: string;
  quote: string;
  services: Service[];
}

export interface Service {
  label: string;
}

// About
export interface About {
  id: string;
  quote: string;
  description: string;
  faq: FaqItem[];
}

// Legales
export interface LegalPage {
  id: string;
  content: string;
  date?: string;
}
