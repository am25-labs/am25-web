import { cn } from "@/lib/utils";
import type { GridProps } from "./types";

export default function GridContainer({
  className,
  gap = "gap-4",
  children,
}: GridProps) {
  return (
    <section
      className={cn(
        "grid grid-cols-2 md:grid-cols-8 px-4 mt-32 mb-8",
        gap,
        className,
      )}
    >
      {children}
    </section>
  );
}
