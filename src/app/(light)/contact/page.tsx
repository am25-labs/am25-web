import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import GridContainer from "@/components/grids/GridContainer";
import GridTwo from "@/components/grids/GridTwo";
import { ArrowUpRightIcon } from "lucide-react";
import GridFour from "@/components/grids/GridFour";
import ContactForm from "@/components/ContactForm";
import { getGlobals } from "@/lib/strapi/fetchSingle";

const baseUrl = process.env.BASE_URL;

export function generateMetadata(): Metadata {
  return {
    ...baseMetadata,
    title: "Contacto | Alejandro Mártir",
    openGraph: {
      ...baseMetadata.openGraph,
      title: "Contacto | Alejandro Mártir",
      url: `${baseUrl}/contact`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: "Contacto | Alejandro Mártir",
    },
  };
}

export default async function ContactPage() {
  const globals = await getGlobals();

  return (
    <GridContainer>
      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl md:text-4xl font-bold uppercase">Contact</h1>

          <div className="flex flex-col space-y-2 mt-6">
            <a
              href={globals.data.whatsapp}
              target="_blank"
              rel="noopener"
              className="flex items-center text-muted-foreground text-lg md:text-xl w-fit hover:underline"
            >
              WhatsApp
              <ArrowUpRightIcon size={24} className="shrink-0" />
            </a>
            <a
              href={`mailto:${globals.data.email}`}
              target="_blank"
              rel="noopener"
              className="flex items-center text-muted-foreground text-lg md:text-xl w-fit hover:underline"
            >
              Email
              <ArrowUpRightIcon size={24} className="shrink-0" />
            </a>
            <a
              href={globals.data.instagram}
              target="_blank"
              rel="noopener"
              className="flex items-center text-muted-foreground text-lg md:text-xl w-fit hover:underline mt-8"
            >
              Instagram
              <ArrowUpRightIcon size={24} className="shrink-0" />
            </a>
          </div>
        </div>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          <ContactForm />
        </div>
      </GridFour>
    </GridContainer>
  );
}
