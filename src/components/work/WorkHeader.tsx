import Image from "next/image";
import type { MediaImage, RichContent } from "@/types/domain";
import ContentRenderer from "@/components/ContentRenderer";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";

interface WorkHeaderProps {
  title: string;
  cover: MediaImage;
  video?: string;
  description?: RichContent | null;
}

export default function WorkHeader({
  title,
  cover,
  video,
  description,
}: WorkHeaderProps) {
  return (
    <GridContainer>
      <div className="col-span-full">
        <div className="aspect-square relative md:aspect-video">
          <Image src={cover.url} fill alt="Cover" className="object-cover" />
        </div>
      </div>

      <GridFour className="mt-4">
        <div className="col-span-full">
          <h1 className="text-3xl md:text-4xl font-bold uppercase">{title}</h1>
        </div>
      </GridFour>

      <GridFour className="mt-4">
        <div className="col-span-full">
          {description && <ContentRenderer content={description} />}
        </div>
      </GridFour>
    </GridContainer>
  );
}
