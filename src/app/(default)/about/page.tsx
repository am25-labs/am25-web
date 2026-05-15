import HeroAbout from "@/components/about/HeroAbout";
import AboutMeSection from "@/components/about/AboutMe";
import AgenciesSection from "@/components/about/Agencies";
import ClientsSection from "@/components/about/Clients";
import ServicesSection from "@/components/about/Services";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getAbout } from "@/lib/strapi/fetchSingle";

const baseUrl = process.env.BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  const { title } = about.data;

  return {
    ...baseMetadata,
    title: `${title} | Alejandro Mártir`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} | Alejandro Mártir`,
      url: `${baseUrl}/about`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} | Alejandro Mártir`,
    },
  };
}

export default async function AboutPage() {
  const about = await getAbout();
  const {
    title,
    shortDescription,
    featured,
    bio,
    services,
    agencies,
    clients,
  } = about.data;

  return (
    <>
      <HeroAbout title={title} quote={shortDescription} />

      {featured && bio && <AboutMeSection featured={featured} bio={bio} />}

      {services && <ServicesSection services={services} />}

      {agencies && <AgenciesSection agencies={agencies} />}

      {clients && <ClientsSection clients={clients} />}
    </>
  );
}
