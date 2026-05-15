import ContentRenderer from "@/components/ContentRenderer";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { RefreshCwIcon } from "lucide-react";
import GridContainer from "@/components/grids/GridContainer";
import GridTwo from "@/components/grids/GridTwo";
import GridFour from "@/components/grids/GridFour";
import { getTerms } from "@/lib/plank/fetch";
import { formatDate } from "@/lib/utils";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Terms & Conditions";

export async function generateMetadata(): Promise<Metadata> {
  return {
    ...baseMetadata,
    title: `${pageTitle} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} - AM25`,
      url: `${baseUrl}/terms`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} - AM25`,
    },
  };
}

export default async function TermsPage() {
  const terms = await getTerms();
  const { date, content } = terms;
  const formattedDate = date ? formatDate(date) : null;

  return (
    <GridContainer className="mb-16">
      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl md:text-4xl font-bold uppercase">
            {pageTitle}
          </h1>
          {formattedDate && (
            <span
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
              title="Updated At"
            >
              <RefreshCwIcon size={16} />
              {formattedDate}
            </span>
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
