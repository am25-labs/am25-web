import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";

interface ServicesSectionProps {
  services: string;
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <GridContainer className="mt-0">
      <div className="col-span-full">
        <div className="border-t mb-4" />
      </div>

      <GridFour>
        <div className="col-span-full">
          <h2 className="text-muted-foreground text-sm md:text-base font-bold uppercase">
            Experience primarily in
          </h2>
        </div>
      </GridFour>

      <GridFour>
        <div className="col-span-full">
          <p className="text-xl md:text-2xl leading-normal -mt-1">
            {services.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < services.split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </GridFour>
    </GridContainer>
  );
}
