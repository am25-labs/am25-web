import type { SimpleIcon } from "simple-icons";
import type { CustomIcon } from "@/icons/custom";

export type BrandIconData = SimpleIcon | CustomIcon;

export type { PlankListResponse, PlankParams } from "@plank-cms/client";
export type {
  Author,
  Discipline,
  NoteCategory,
  Work,
  Note,
  Service,
  Home,
  FaqItem,
  About,
  LegalPage,
  PlankPage,
  Navigation,
  NavigationItem,
} from "./content";

export interface WorkCardProps {
  cover?: string | null;
  title: string;
  href: string;
  category: string;
  publishedAt?: string;
}

import type { Author } from "./content";

export interface NoteCardProps {
  title: string;
  href: string;
  category: string;
  publishedAt?: string;
  author?: Author | null;
}

export interface AccordionWrapItem {
  label: string;
  content: string;
}

export interface PageDescriptionProps {
  description: string;
  variant?: "default" | "display";
}

export interface GridProps {
  class?: string;
  gap?: string;
}

export interface BrandIconProps {
  icon: BrandIconData;
  size?: number;
  "aria-label"?: string;
}

export interface LogoTileProps {
  logo: string;
  title: string;
  href?: string;
}

export interface SocNavProps {
  href: string;
  icon: BrandIconData;
  size?: number;
}

export type NavProps = NavigationItem;

export interface RootLayoutProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  variant?: "default" | "yellow" | "light";
}
