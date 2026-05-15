import type { Metadata } from "next";

const baseUrl = process.env.BASE_URL;

export const baseMetadata: Metadata = {
  title: "AM25 - Design & Web Studio",
  description: "We are an independent creative studio.",
  metadataBase: new URL(`${baseUrl}`),
  openGraph: {
    title: "AM25 - Design & Web Studio",
    description: "We are an independent creative studio.",
    url: baseUrl,
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1920,
        height: 1080,
        alt: "AM25 - Design & Web Studio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AM25 - Design & Web Studio",
    description: "We are an independent creative studio.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.png",
  },
};
