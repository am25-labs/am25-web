import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";

interface ClientsSectionProps {
  clients: string;
}

export default function ClientsSection({ clients }: ClientsSectionProps) {
  return (
    <GridContainer className="mt-0">
      <div className="col-span-full">
        <div className="border-t mb-4" />
      </div>

      <GridFour>
        <div className="col-span-full">
          <h2 className="text-muted-foreground text-sm md:text-base font-bold uppercase">
            Brands I've Worked With
          </h2>
        </div>
      </GridFour>

      <GridFour>
        <div className="col-span-full">
          <p className="text-xl md:text-2xl leading-normal -mt-1">
            {clients.split("\n").map((line, index) => (
              <span key={index}>
                {line}
                {index < clients.split("\n").length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </GridFour>
    </GridContainer>
  );
}
