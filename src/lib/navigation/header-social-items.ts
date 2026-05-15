import { siBehance, siGithub, siInstagram } from "simple-icons";
import { siFlaskConical, siLinkedin } from "@/icons/custom";
import type { BrandIconData } from "@/types/domain";

export type HeaderSocialItem = {
  href: string;
  icon: BrandIconData;
  size?: number;
};

export const headerSocialItems: HeaderSocialItem[] = [
  { href: "https://labs.am25.work", icon: siFlaskConical, size: 20 },
  { href: "https://www.instagram.com/am25work", icon: siInstagram, size: 20 },
  { href: "https://www.behance.net/am25work", icon: siBehance, size: 24 },
  { href: "https://github.com/am25-labs", icon: siGithub, size: 20 },
  { href: "https://www.linkedin.com/company/am25", icon: siLinkedin, size: 20 },
];
