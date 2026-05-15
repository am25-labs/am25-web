import type { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";
import CasesFilter from "@/components/work/CasesFilter";
import { getWorks } from "@/lib/plank/fetch";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Work / Cases";

export function generateMetadata(): Metadata {
  return {
    ...baseMetadata,
    title: `${pageTitle} | Alejandro Mártir`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} | Alejandro Mártir`,
      url: `${baseUrl}/cases`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} | Alejandro Mártir`,
    },
  };
}

export default async function CasesPage() {
  const { data: works } = await getWorks();

  return (
    <>
      <div className="col-span-full mb-16 px-4">
        <h1 className="text-6xl font-bold uppercase md:text-9xl">{pageTitle}</h1>
      </div>

      {works.length > 0 ? <CasesFilter works={works} /> : null}
    </>
  );
}
