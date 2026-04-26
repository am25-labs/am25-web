export interface WorkAuthor {
  first_name: string;
  last_name: string;
  avatar_url: string;
}

export interface Work {
  id: string;
  title: string;
  slug: string;
  featured: boolean;
  status: string;
  date: string;
  cover: string;
  description?: string;
  quote?: string;
  images_before?: string[];
  images_after?: string[];
  client?: string;
  campaign?: string;
  agency?: string;
  country?: string;
  creative?: string;
  strategy?: string;
  lead_design?: string;
  design?: string;
  copy?: string;
  illustration?: string;
  animation?: string;
  photo?: string;
  developer?: string;
  work_team?: string;
  author?: WorkAuthor;
  created_at: string;
  updated_at: string;
}
