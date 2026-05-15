import DesktopCollage from "@/components/DesktopCollage";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getDesktopObj } from "@/lib/strapi/fetchCollection";

const baseUrl = process.env.BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Mi escritorio";

  return {
    ...baseMetadata,
    title: `${title} | Alejandro Mártir`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} | Alejandro Mártir`,
      url: `${baseUrl}/desktop`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} | Alejandro Mártir`,
    },
  };
}

export default async function DesktopPage() {
  const objects = await getDesktopObj();

  return (
    <section className="mt-12 md:mt-16 w-full max-w-8xl mx-auto px-4 py-10">
      <DesktopCollage objects={objects.data} />

      <h1 className="text-lg text-center mt-10">Hi, this is my desk</h1>

      <p className="text-xs text-muted-foreground text-center mt-4">
        In this corner of my website you will find a graphic representation
        (more or less faithful) of what is on my desk.
      </p>
    </section>
  );
}
