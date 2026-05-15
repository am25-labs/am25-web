import HeroHome from "@/components/HeroHome";
import { ArrowUpRightIcon } from "lucide-react";
import WorksIndex from "@/components/work/WorksIndex";
import Link from "next/link";
import { getHome } from "@/lib/strapi/fetchSingle";
import { getWorks } from "@/lib/strapi/fetchCollection";

export default async function HomePage() {
  const home = await getHome();
  const { tagline, quote } = home.data;
  const works = await getWorks({ onlyFeatured: true, limit: 3 });

  return (
    <>
      <HeroHome tagline={tagline} quote={quote} />

      <div className="max-w-8xl mx-auto px-4">
        <div className="border-t" />
        <div className="flex items-center justify-center">
          <Link href="/work" className="w-fit">
            <h2 className="flex items-center text-2xl md:text-3xl font-bold uppercase py-8 hover:underline">
              All works
              <ArrowUpRightIcon size={36} className="shrink-0" />
            </h2>
          </Link>
        </div>
      </div>

      {works.data.length > 0 && <WorksIndex works={works.data} />}
    </>
  );
}
