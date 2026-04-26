import type { SimpleIcon } from "simple-icons";
import type { CustomIcon } from "@/icons/custom";

export type BrandIconData = SimpleIcon | CustomIcon;

export type { PlankListResponse, PlankParams } from "@am25/plank-client";
export type { Work, WorkAuthor } from "./content";
export type {
  RichTextBlock,
  RichTextTextNode,
  RichTextLinkNode,
  RichTextInlineNode,
  RichTextParagraphBlock,
  RichTextImageBlock,
  RichTextHeadingBlock,
  RichTextQuoteBlock,
  RichTextListBlock,
} from "./richtext";

export interface WorkCardProps {
  cover: string;
  title: string;
  href: string;
  category: string;
}

export interface AccordionWrapItem {
  value: string;
  trigger: string;
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

export interface NavProps {
  label: string;
  href: string;
  icon?: string;
}

export interface RootLayoutProps {
  title?: string;
  variant?: "default" | "yellow" | "light";
}
