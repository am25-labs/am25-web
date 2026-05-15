import GridContainer from "@/components/grids/GridContainer";

interface HeroProps {
  heading: string;
  description: string;
}

export default function Hero({ heading, description }: HeroProps) {
  return (
    <GridContainer className="min-h-dvh mt-4 md:-mt-32 md:items-center">
      <div className="col-span-full space-y-8">
        <div className="mx-auto w-full max-w-8xl">
          <h2 className="whitespace-pre-line text-6xl font-bold uppercase md:text-center md:text-7xl xl:text-9xl">
            {heading}
          </h2>
        </div>

        <div className="mx-auto w-full max-w-4xl">
          <p className="text-xl text-muted-foreground md:text-center md:text-3xl">
            {description}
          </p>
        </div>
      </div>
    </GridContainer>
  );
}
