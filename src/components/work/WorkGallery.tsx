import Image from "next/image";
import type { PlankMediaGallery, Work } from "@/types/domain";
import GridContainer from "@/components/grids/GridContainer";

interface WorkGalleryProps {
  images?: PlankMediaGallery | null;
  quote?: Work["quote"];
}

export default function WorkGallery({
  images: rawImages,
  quote,
}: WorkGalleryProps) {
  const images = rawImages ?? [];

  const groups: PlankMediaGallery[] = [];
  for (let i = 0; i < images.length; i += 3) {
    groups.push(images.slice(i, i + 3));
  }

  return (
    <GridContainer className="mb-2">
      {quote && (
        <div className="col-span-full py-16">
          <blockquote className="text-lg md:text-xl text-center italic max-w-4xl mx-auto">
            "{quote}"
          </blockquote>
        </div>
      )}

      {groups.map((group, groupIndex) => {
        const pair = group.slice(1);

        return (
          <div key={groupIndex} className="col-span-full">
            <Image
              src={group[0]!.url}
              alt={group[0]!.alt ?? ""}
              width={group[0]!.width ?? 0}
              height={group[0]!.height ?? 0}
              sizes="100vw"
              className="w-full h-auto object-contain"
            />

            {pair.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {pair.map((image, i) => (
                  <Image
                    key={image.id ?? i}
                    src={image.url}
                    alt={image.alt ?? ""}
                    width={image.width ?? 0}
                    height={image.height ?? 0}
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
  );
}
