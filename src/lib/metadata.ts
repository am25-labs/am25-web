import type { Metadata } from "next"

const baseUrl = process.env.BASE_URL

export const baseMetadata: Metadata = {
  title: "Alejandro Mártir",
  description:
    "Diseñador gráfico, creador digital y músico ocasional. Ideas claras, irreverencia controlada y curiosidad insaciable.",
  metadataBase: new URL(`${baseUrl}`),
  openGraph: {
    title: "Alejandro Mártir",
    description:
      "Diseñador gráfico, creador digital y músico ocasional. Ideas claras, irreverencia controlada y curiosidad insaciable.",
    url: baseUrl,
    type: "website",
    images: [
      {
        url: "/alemartir-default-cover.webp",
        width: 1200,
        height: 630,
        alt: "Alejandro Mártir",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Alejandro Mártir",
    description:
      "Diseñador gráfico, creador digital y músico ocasional. Ideas claras, irreverencia controlada y curiosidad insaciable.",
    images: ["/alemartir-default-cover.webp"],
  },
  icons: {
    icon: "/favicon.png",
  },
}
