import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";

interface AgenciesSectionProps {
  agencies: string;
}

export default function AgenciesSection({ agencies }: AgenciesSectionProps) {
  return (
    <GridContainer className="mt-0">
      <div className="col-span-full">
        <div className="border-t mb-4" />
      </div>

      <GridFour>
        <div className="col-span-full">
          <h2 className="text-muted-foreground text-sm md:text-base font-bold uppercase">
            Agencies I've worked for
          </h2>
        </div>
      </GridFour>

      <GridFour>
        <div className="col-span-full">
          <p className="text-xl md:text-2xl leading-normal -mt-1">
            {agencies.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < agencies.split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>

          <p className="text-xs text-muted-foreground mt-10">
            * Currently working in
          </p>
        </div>
      </GridFour>
    </GridContainer>
  );
}
