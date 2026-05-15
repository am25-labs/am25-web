import type { FooterLink } from "@/lib/types";

export const getFooterLinks = (): FooterLink[] =>
  [
    {
      id: "privacy",
      label: "Privacy",
      slug: "/privacy",
    },
    {
      id: "copyright",
      label: "Copyright",
      slug: "/copyright",
    },
  ].map((link) => ({
    ...link,
    target: link.slug.startsWith("http") ? "_blank" : "_self",
  }));
