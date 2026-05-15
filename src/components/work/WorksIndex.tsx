import clsx from "clsx";
import Link from "next/link";
import Image from "next/image";
import type { Work } from "@/types/domain";

interface WorksIndexProps {
  works: Work[];
}

export default function WorksIndex({ works }: WorksIndexProps) {
  return (
    <section className="px-4 mb-8">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-4">
        {works.map((work) => {
          const { id, title, slug, cover, disciplines } = work;

          return (
            <Link key={id} href={`/work/${slug}`} className="block group/card">
              <div className="relative w-full aspect-[4/5] overflow-hidden">
                <Image
                  src={cover!.url}
                  alt="Cover"
                  fill
                  className="object-cover group-hover/card:scale-110 transition-transform duration-200"
                />
              </div>

              <div className="space-y-2 mt-2 mb-4">
                <h2 className="text-xl font-bold uppercase group-hover/card:underline">
                  {title}
                </h2>
                <p className="text-muted-foreground text-sm">
                  {Array.isArray(disciplines)
                    ? disciplines.map((d) => d.name).join(", ")
                    : disciplines}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
