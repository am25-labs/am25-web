import GridContainer from "@/components/grids/GridContainer";
import type { Service } from "@/types/domain";

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  return (
    <GridContainer className="pb-16">
      <div className="col-span-full">
        <h2 className="text-4xl font-bold uppercase md:text-center md:text-6xl">
          What we do
        </h2>

        <ul className="mt-8 flex list-none flex-col items-start gap-4 p-0 text-left md:flex-row md:justify-center md:gap-24 md:text-center">
          {services.map((service) => (
            <li
              key={service.label}
              className="text-2xl text-muted-foreground md:text-4xl"
            >
              <p>{service.label}</p>
            </li>
          ))}
        </ul>
      </div>
    </GridContainer>
  );
}
