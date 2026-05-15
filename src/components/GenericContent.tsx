import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";
import GridTwo from "@/components/grids/GridTwo";
import { RefreshCwIcon } from "lucide-react";

interface GenericContentProps {
  title: string;
  updated?: string | null;
  quote?: string | null;
  children: React.ReactNode;
}

export default function GenericContent({
  title,
  updated,
  quote,
  children,
}: GenericContentProps) {
  return (
    <GridContainer className="mb-16">
      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">{title}</h1>

          {updated && (
            <span
              className="mt-6 flex items-center gap-2 text-sm text-muted-foreground"
              title="Updated At"
            >
              <RefreshCwIcon size={16} />
              {updated}
            </span>
          )}
        </div>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          {quote && <p className="mb-8 text-2xl">{quote}</p>}
          {children}
        </div>
      </GridFour>
    </GridContainer>
  );
}
