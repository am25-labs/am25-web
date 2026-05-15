import type { FaqItem } from "./index";

// Home
export interface Home {
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
  quote: string;
  description: string;
  faq: FaqItem[];
}

// Legales
export interface LegalPage {
  content: string;
  date?: string;
}
