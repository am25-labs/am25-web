import ContentRenderer from "@/components/ContentRenderer";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import GridContainer from "@/components/grids/GridContainer";
import GridTwo from "@/components/grids/GridTwo";
import GridFour from "@/components/grids/GridFour";
import { getPrivacy } from "@/lib/strapi/fetchSingle";

const baseUrl = process.env.BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const privacy = await getPrivacy();
  const { title } = privacy.data;

  return {
    ...baseMetadata,
    title: `${title} | Alejandro Mártir`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} | Alejandro Mártir`,
      url: `${baseUrl}/privacy`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} | Alejandro Mártir`,
    },
  };
}

export default async function PrivacyPage() {
  const privacy = await getPrivacy();
  const { title, date, content } = privacy.data;
  const formattedDate = date
    ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  return (
    <GridContainer>
      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl md:text-4xl font-bold uppercase">{title}</h1>
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
