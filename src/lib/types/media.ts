export interface MediaImage {
  id?: number | string | null;
  url: string;
  alternativeText?: string | null;
}

export interface MediaImageWithCaption extends MediaImage {
  caption?: string | null;
}
