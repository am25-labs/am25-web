import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";
import GridContainer from "@/components/grids/grid-container";
import ScrollReveal from "@/components/scroll-reveal";
import { BannerPoweredBy } from "@/components/powered-by";
import { Separator } from "@/components/ui/separator";
import { getCopy, withLocale, type Locale } from "@/lib/i18n";

interface WorkBackLinkProps {
  locale: Locale;
  destination?: "works" | "notes";
}

export default function WorkBackLink({
  locale,
  destination = "works",
}: WorkBackLinkProps) {
  const copy = getCopy(locale);
  const isNotesDestination = destination === "notes";

  return (
    <GridContainer>
      <ScrollReveal className="col-span-full">
        <div className="flex flex-col items-center py-16">
          <Separator />
          <Link
            href={withLocale(locale, isNotesDestination ? "/notes" : "/work")}
            className="mt-8 flex items-center gap-2 text-center font-bold uppercase hover:underline"
          >
            <ChevronLeftIcon size={21} />
            {isNotesDestination ? copy.backToNotes : copy.backToWorks}
          </Link>
        </div>

        <div className="mx-auto max-w-2xl">
          <BannerPoweredBy
            logoSrc="/plank-logo-w.svg"
            logoAlt="Plank CMS"
            label={copy.poweredByPlank}
            link="https://plank-cms.com"
            mode="dark"
          />
        </div>
      </ScrollReveal>
    </GridContainer>
  );
}
