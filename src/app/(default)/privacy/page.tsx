import ContentRenderer from "@/components/ContentRenderer";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import GridContainer from "@/components/grids/GridContainer";
import GridTwo from "@/components/grids/GridTwo";
import GridFour from "@/components/grids/GridFour";
import { getPrivacy } from "@/lib/plank/fetch";
import { formatDate } from "@/lib/utils";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Privacy";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...baseMetadata,
    title: `${pageTitle} | Alejandro Mártir`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} | Alejandro Mártir`,
      url: `${baseUrl}/privacy`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} | Alejandro Mártir`,
    },
  };
}

export default async function PrivacyPage() {
  const privacy = await getPrivacy();
  const { date, content } = privacy;
  const formattedDate = date ? formatDate(date) : null;

  return (
    <GridContainer>
      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl md:text-4xl font-bold uppercase">
            {pageTitle}
          </h1>
          {formattedDate && (
            <Badge className="uppercase mt-8">Updated: {formattedDate}</Badge>
          )}
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
