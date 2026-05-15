import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Contact";

export function generateMetadata(): Metadata {
  return {
    ...baseMetadata,
    title: `${pageTitle} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} - AM25`,
      url: `${baseUrl}/contact`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} - AM25`,
    },
  };
}

export default function ContactPage() {
  return (
    <main className="mx-auto w-full max-w-8xl px-4 py-8">
      <h1 className="text-3xl font-bold uppercase md:text-4xl">{pageTitle}</h1>
    </main>
  );
}
