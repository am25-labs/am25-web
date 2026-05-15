import Image from "next/image";
import type { MediaImage } from "@/lib/types";
import GridContainer from "../grids/GridContainer";
import GridFour from "../grids/GridFour";

interface WorkGalleryProps {
  quote?: string;
  imagesBefore?: MediaImage[];
  imagesAfter?: MediaImage[];
}

export default function WorkGallery({
  quote,
  imagesBefore,
  imagesAfter,
}: WorkGalleryProps) {
  const images = imagesBefore ?? imagesAfter ?? [];

  const groups: MediaImage[][] = [];
  for (let i = 0; i < images.length; i += 3) {
    groups.push(images.slice(i, i + 3));
  }

  return (
    <GridContainer className="mt-0">
      <div className="col-span-full">
        {quote && (
          <div className="py-8 md:py-16">
            <blockquote className="text-lg md:text-xl text-center italic max-w-4xl mx-auto">
              "{quote}"
            </blockquote>
          </div>
        )}
      </div>

      {groups.map((group, groupIndex) => {
        const pair = group.slice(1);

        return (
          <div key={groupIndex} className="col-span-full">
            <Image
              src={group[0].url}
              alt="project-image"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto object-contain"
            />

            {pair.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {pair.map((image, i) => (
                  <Image
                    key={image.id ?? i}
                    src={image.url}
                    alt="project-image"
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-contain"
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </GridContainer>

    // <div className="w-full mb-2">

    //   {groups.map((group, groupIndex) => {
    //     const pair = group.slice(1);

    //     return (
    //       <div key={groupIndex} className="w-full">
    //         <Image
    //           src={group[0].url}
    //           alt=""
    //           width={0}
    //           height={0}
    //           sizes="100vw"
    //           className="w-full h-auto object-contain"
    //         />

    //       </div>
    //     );
    //   })}
    // </div>
  );
}
