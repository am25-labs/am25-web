import type { SimpleIcon } from "simple-icons";

export type {
  StrapiImage,
  StrapiImageWithCaption,
  StrapiMeta,
  StrapiResponse,
} from "./strapi";
export type { Discipline, Work } from "./content";
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
}

export interface GridProps {
  class?: string;
  gap?: string;
}

export interface BrandIconProps {
  icon: SimpleIcon;
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
  icon: SimpleIcon;
  size?: number;
}

export interface NavProps {
  label: string;
  href: string;
  icon?: string;
}

export interface RootLayoutProps {
  title?: string;
}
