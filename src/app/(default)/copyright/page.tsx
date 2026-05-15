import ContentRenderer from "@/components/ContentRenderer";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import GridContainer from "@/components/grids/GridContainer";
import GridTwo from "@/components/grids/GridTwo";
import GridFour from "@/components/grids/GridFour";
import { getCopyright } from "@/lib/plank/fetch";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Copyright";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...baseMetadata,
    title: `${pageTitle} | Alejandro Mártir`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} | Alejandro Mártir`,
      url: `${baseUrl}/copyright`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} | Alejandro Mártir`,
    },
  };
}

export default async function CopyrightPage() {
  const copyright = await getCopyright();
  const { content } = copyright;

  return (
    <GridContainer>
      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl md:text-4xl font-bold uppercase">
            {pageTitle}
          </h1>
        </div>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          {content && <ContentRenderer content={content} />}
        </div>
      </GridFour>
    </GridContainer>
  );
}
