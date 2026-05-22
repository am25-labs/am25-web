import type { Metadata } from "next";
import { baseMetadata } from "@/lib/metadata";
import PageContainer from "@/components/PageContainer";
import CasesFilter from "@/components/work/CasesFilter";
import { getWorks } from "@/lib/plank/fetch";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Work / Cases";

export function generateMetadata(): Metadata {
  return {
    ...baseMetadata,
    title: `${pageTitle} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} - AM25`,
      url: `${baseUrl}/cases`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} - AM25`,
    },
  };
}

export default async function CasesPage() {
  const { data: works } = await getWorks();

  return (
    <>
      <PageContainer>
        <div className="col-span-full mb-16 px-4">
          <h1 className="text-6xl font-bold uppercase md:text-9xl">
            {pageTitle}
          </h1>
        </div>
      </PageContainer>

      {works.length > 0 ? <CasesFilter works={works} /> : null}
    </>
  );
}
