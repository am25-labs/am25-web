import type { TiptapDoc } from "@plank-cms/react-renderer";
import type { MediaImage, MediaImageWithCaption } from "./media";

export type RichContent = string | TiptapDoc;
export interface StrapiResponse<T> {
  data: T;
}

export interface Discipline {
  name: string;
}

export interface Work {
  id?: number | string;
  title: string;
  slug: string;
  featured?: boolean;
  cover?: MediaImageWithCaption;
  disciplines?: Discipline[];
  video?: string;
  description?: RichContent | null;
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
  copywriting?: string;
  illustration?: string;
  animation?: string;
  photo?: string;
  photography?: string;
  developer?: string;
  team?: string;
  imagesBefore?: MediaImage[];
  imagesAfter?: MediaImage[];
}

export interface Project {
  id: number | string;
  title: string;
  url: string;
  description: string;
  year?: string;
}

export interface DesktopObj {
  id: number | string;
  title: string;
  description: RichContent | null;
  ratio: string;
  image?: MediaImage;
}

export interface Global {
  email?: string;
  whatsapp?: string;
  instagram?: string;
  facebook?: string;
  youTube?: string;
  twitch?: string;
  gitHub?: string;
  linkedIn?: string;
  spotify?: string;
  appleMusic?: string;
  amazonMusic?: string;
  spotifyPod?: string;
  applePod?: string;
  amazonMusicPod?: string;
  youTubePod?: string;
  claim?: string;
  cta?: string;
}

export interface Home {
  tagline?: string;
  quote?: string;
}

export interface About {
  title?: string;
  shortDescription?: string;
  bio?: RichContent | null;
  services?: string;
  agencies?: string;
  clients?: string;
  awards?: string;
  publications?: string;
  featured?: MediaImageWithCaption;
}

export interface Privacy {
  title?: string;
  date?: string;
  content?: RichContent | null;
}

export interface Copyright {
  title?: string;
  content?: RichContent | null;
}
