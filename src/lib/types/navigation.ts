export interface NavLink {
  id: string;
  label: string;
  slug: string;
  isActive: boolean;
  target: "_blank" | "_self";
}

export interface FooterLink {
  id: string;
  label: string;
  slug: string;
  target: "_blank" | "_self";
}

export type PodcastPlatform = "spotify" | "apple" | "amazon" | "youtube";

export interface PodcastLink {
  platform: PodcastPlatform;
  label: string;
  url: string | undefined;
}
