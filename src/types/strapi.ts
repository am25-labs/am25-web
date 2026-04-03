export interface StrapiImage {
  id?: number;
  url: string;
}

export interface StrapiImageWithCaption extends StrapiImage {
  caption?: string;
}

export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta?: StrapiMeta;
}
