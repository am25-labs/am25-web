import GridContainer from "@/components/grids/GridContainer";

interface HeroHomeProps {
  tagline?: string;
  quote?: string;
}

export default function HeroHome({ tagline, quote }: HeroHomeProps) {
  return (
    <GridContainer className="items-center min-h-screen my-0">
      <div className="col-span-full">
        <div className="w-full flex flex-col flex-1 justify-center gap-5">
          <h1 className="text-6xl md:text-[10rem] 2xl:text-[12rem] font-bold leading-tight uppercase md:text-center">
            {quote}
          </h1>

          <p className="text-muted-foreground text-xl md:text-3xl 2xl:text-4xl md:text-center font-bold uppercase">
            {tagline}
          </p>
        </div>
      </div>
    </GridContainer>
  );
}
