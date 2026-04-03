import type { SimpleIcon } from "simple-icons";

export interface FaqItem {
  value: string;
  trigger: string;
  content: string;
}

export interface ProjectDetail {
  label: string;
  value: string;
  href?: string;
}

export interface ProjectLink {
  label: string;
  href: string;
}

export interface ProjectCtaDialog {
  title: string;
  description: string;
  command: string;
  managers: string[];
}

export interface ProjectCta {
  label: string;
  dialog: ProjectCtaDialog;
}

export interface ProjectContentProps {
  title: string;
  icon: string;
  details: ProjectDetail[];
  repository?: ProjectLink;
  deployment: string;
  started: string;
  updated: string;
  version?: string;
  documentation?: ProjectLink;
  cta?: ProjectCta;
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
