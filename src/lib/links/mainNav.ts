import type { NavLink } from "@/lib/types";

export const getLeftNavLinks = (pathname: string): NavLink[] =>
  [
    {
      id: "work",
      label: "Work",
      slug: "/work",
      isActive: pathname.startsWith("/work"),
    },
    {
      id: "projects",
      label: "Projects",
      slug: "/projects",
      isActive: pathname === "/projects",
    },
    {
      id: "podcast",
      label: "Alt-Side",
      slug: "/podcast",
      isActive: pathname === "/podcast",
    },
  ].map((link) => ({
    ...link,
    target: link.slug.startsWith("http") ? "_blank" : "_self",
  }));

export const getRightNavLinks = (pathname: string): NavLink[] =>
  [
    {
      id: "about",
      label: "About me",
      slug: "/about",
      isActive: pathname === "/about",
    },
    // {
    //   id: "contact",
    //   label: "Contact",
    //   slug: "/contact",
    //   isActive: pathname === "/contact",
    // },
    {
      id: "am25",
      label: "AM25",
      slug: "https://am25.work",
      isActive: false,
    },
  ].map((link) => ({
    ...link,
    target: link.slug.startsWith("http") ? "_blank" : "_self",
  }));
