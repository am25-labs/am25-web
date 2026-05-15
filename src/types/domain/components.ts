import type { Author } from "./index";

// Grids
export interface GridProps {
  className?: string;
  gap?: string;
  children?: React.ReactNode;
}

// Footer
export interface Footer {
  claim: string;
}

// Accordions
export interface AccordionWrapItem {
  label: string;
  content: string;
}

export interface FaqItem {
  label: string;
  description: string;
}

// Cards
export interface WorkCardProps {
  cover?: string | null;
  title: string;
  href: string;
  category: string;
  publishedAt?: string;
}

export interface NoteCardProps {
  cover?: string | null;
  title: string;
  href: string;
  category: string;
  publishedAt?: string;
  author?: Author | null;
}

// Tiles
export interface LogoTileProps {
  logo: string;
  title: string;
  href?: string;
}
