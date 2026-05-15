import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridSix from "@/components/grids/GridSix";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Our Branding";

const rules = [
  {
    title: "01 The brief wins.",
    description:
      "Business is important. We're not going to lie to ourselves — or to you — by saying otherwise.",
  },
  {
    title: "02 Less, if less works.",
    description:
      "If it looks done without the extra element, it's done. No gradients to fill silence.",
  },
  {
    title: "03 One opinion at a time.",
    description:
      "A direction is a decision. We'd rather commit and iterate than hedge across three variants.",
  },
  {
    title: "04 Build it, then ship it.",
    description:
      "Design and development in the same room. Handoffs, when they happen, are short.",
  },
] as const;

export function generateMetadata(): Metadata {
  return {
    ...baseMetadata,
    title: `${pageTitle} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} - AM25`,
      url: `${baseUrl}/brand`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} - AM25`,
    },
  };
}

export default function BrandPage() {
  return (
    <GridContainer gap="gap-8">
      <GridSix>
        <div className="col-span-full mb-48">
          <p className="text-4xl font-bold uppercase md:text-7xl">
            We are an independent creative studio.
          </p>
        </div>
      </GridSix>

      <GridFour>
        <div className="col-span-full mb-8">
          <h2 className="mb-4 text-2xl font-bold uppercase">Graphic</h2>
          <p className="text-lg">
            Identity, editorial, and digital-first systems built to last beyond
            launch.
          </p>
        </div>
      </GridFour>

      <GridFour>
        <div className="col-span-full mb-16">
          <h2 className="mb-4 text-2xl font-bold uppercase">Web-Dev</h2>
          <p className="text-lg">
            Sites and small products. Built lean, maintained honestly, shipped
            on time.
          </p>
        </div>
      </GridFour>

      <Separator className="col-span-full" />

      <GridSix>
        <div className="col-span-full my-32 md:my-48">
          <h2 className="text-3xl md:text-5xl uppercase">
            <span className="font-bold">Good taste, meeting the brief.</span> No
            need to be louder.
          </h2>
        </div>
      </GridSix>

      <Separator className="col-span-full" />

      <GridSix>
        <div className="col-span-full my-16">
          <h2 className="mb-8 text-lg font-bold uppercase">How we think</h2>

          <p className="mb-8 text-3xl">
            Business is important — we&apos;re not going to lie to ourselves, or
            to you, by saying otherwise. Creativity and its exploration are
            equally important.
          </p>

          <p>Both pay the rent. One of them is why we stayed.</p>
        </div>
      </GridSix>

      <Separator className="col-span-full" />

      <GridSix>
        <div className="col-span-full my-16">
          <p className="text-3xl font-bold uppercase md:text-4xl">
            Two forces.
            <br />
            One decision at a time.
          </p>
        </div>
      </GridSix>

      <GridFour>
        <div className="col-span-full mb-8">
          <h2 className="mb-4 text-2xl font-bold uppercase">
            Client objectives
          </h2>
          <p className="text-lg">
            Measurable. Specific. The reason the project exists at all.
          </p>
        </div>
      </GridFour>

      <GridFour>
        <div className="col-span-full mb-16">
          <h2 className="mb-4 text-2xl font-bold uppercase">Good taste</h2>
          <p className="text-lg">
            The part that keeps the work from being ignored.
          </p>
        </div>
      </GridFour>

      <div className="col-span-full mb-16">
        <h2 className="mb-8 text-lg font-bold uppercase">Four working rules</h2>

        <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
          {rules.map((rule) => (
            <Card
              key={rule.title}
              className="min-h-48 gap-0 rounded-none border-0 bg-am-y py-6 text-sm text-black shadow-none ring-0"
            >
              <div className="flex flex-col gap-4 px-6 py-4">
                <span className="text-xl font-bold uppercase tabular-nums">
                  {rule.title}
                </span>
                <span className="text-lg">{rule.description}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </GridContainer>
  );
}
