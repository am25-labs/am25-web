import Image from "next/image";
import ContentRenderer from "@/components/ContentRenderer";
import Link from "next/link";
import type { MediaImage, RichContent } from "@/lib/types";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "../grids/GridFour";

interface AboutMeSectionProps {
  featured: MediaImage;
  bio: RichContent;
}

export default function AboutMeSection({ featured, bio }: AboutMeSectionProps) {
  return (
    <GridContainer className="mt-0">
      <GridFour>
        <div className="col-span-full">
          <div className="w-full relative h-96 md:h-[48rem]">
            <Image
              src={featured.url}
              fill
              alt="Featured image"
              className="object-cover"
            />
          </div>
        </div>
      </GridFour>

      <GridFour>
        <div className="col-span-full">
          <ContentRenderer content={bio} />

          <p className="text-xs text-muted-foreground mt-10">
            Want to get to know me better? Take a look at my{" "}
            <Link href="/desktop" className="text-am-y">
              desktop
            </Link>
            .
          </p>
        </div>
      </GridFour>
    </GridContainer>
  );
}
