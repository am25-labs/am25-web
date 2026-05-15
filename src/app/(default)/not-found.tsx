import { baseMetadata } from "@/lib/metadata";
import { FaSkull } from "react-icons/fa6";
import type { Metadata } from "next";

const baseUrl = process.env.BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Error 404";

  return {
    ...baseMetadata,
    title: `${title} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} - AM25`,
      url: baseUrl,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} - AM25`,
    },
  };
}

export default function NotFound() {
  return (
    <section className="flex min-h-screen">
      <div className="w-full max-w-8xl mx-auto px-5 xl:px-10 mt-10 flex flex-col justify-center">
        <div className="flex flex-col gap-5">
          <p className="flex items-baseline gap-1 text-muted-foreground text-xl font-bold uppercase">
            Oops... Error 404
            <FaSkull size={16} />
          </p>
          <p className="text-5xl md:text-7xl xl:text-8xl font-bold leading-tight uppercase">
            Life is tough, and so is the internet
          </p>
        </div>
      </div>
    </section>
  );
}
