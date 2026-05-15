import GridContainer from "@/components/grids/GridContainer";

interface HeroAboutProps {
  title?: string;
  quote?: string;
}

export default function HeroAbout({ title, quote }: HeroAboutProps) {
  return (
    <GridContainer className="items-center min-h-screen my-0">
      <div className="col-span-full">
        <div className="w-full flex flex-col flex-1 justify-center gap-5">
          <p className="text-6xl md:text-9xl 2xl:text-[10rem] font-bold leading-tight uppercase md:text-center">
            {quote}
          </p>

          <h1 className="text-muted-foreground text-xl md:text-3xl 2xl:text-4xl md:text-center font-bold uppercase">
            {title}
          </h1>
        </div>
      </div>
    </GridContainer>
  );
}
