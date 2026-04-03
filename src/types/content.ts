import type { StrapiImage, StrapiImageWithCaption } from "./strapi";
import type { RichTextBlock } from "./richtext";

export interface Discipline {
  name: string;
}

export interface Work {
  id?: number;
  title: string;
  slug: string;
  featured?: boolean;
  cover?: StrapiImageWithCaption;
  disciplines?: Discipline[];
  video?: string;
  description?: RichTextBlock[];
  quote?: string;
  client?: string;
  campaign?: string;
  agency?: string;
  country?: string;
  creative?: string;
  strategy?: string;
  lead?: string;
  design?: string;
  copy?: string;
  illustration?: string;
  animation?: string;
  photo?: string;
  team?: string;
  imagesBefore?: StrapiImage[];
  imagesAfter?: StrapiImage[];
}
