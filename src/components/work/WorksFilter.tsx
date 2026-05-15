"use client";

import { useState } from "react";
import clsx from "clsx";
import { ChevronDownIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import WorksIndex from "./WorksIndex";
import type { Work, Discipline } from "@/lib/types";
import GridContainer from "../grids/GridContainer";

interface WorksFilterProps {
  works: Work[];
}

export default function WorksFilter({ works }: WorksFilterProps) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const disciplines: Discipline[] = Array.from(
    new Map(
      works
        .flatMap((w) => (Array.isArray(w.disciplines) ? w.disciplines : []))
        .map((d) => [d.name, d]),
    ).values(),
  );

  const filtered =
    active === null
      ? works
      : works.filter(
          (w) =>
            Array.isArray(w.disciplines) &&
            w.disciplines.some((d) => d.name === active),
        );

  const handleSelect = (value: string | null) => {
    setActive(value);
    setOpen(false);
  };

  const activeLabel = active ?? "ALL";

  return (
    <>
      <GridContainer>
        <div className="col-span-full">
          <h1 className="text-3xl md:text-4xl font-bold uppercase">Work</h1>
        </div>
      </GridContainer>

      {/* Mobile */}
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="md:hidden border-b"
      >
        <CollapsibleTrigger className="w-full flex items-center justify-between px-5 py-3">
          <span className="text-sm uppercase font-bold">{activeLabel}</span>
          <ChevronDownIcon className={clsx("size-4", open && "rotate-180")} />
        </CollapsibleTrigger>
        <CollapsibleContent className="border-t">
          <div className="flex flex-col px-5 py-2">
            <button
              onClick={() => handleSelect(null)}
              className={clsx(
                "text-sm py-2 text-left",
                active === null ? "font-bold" : "text-muted-foreground",
              )}
            >
              ALL
            </button>
            {disciplines.map((d) => (
              <button
                key={d.name}
                onClick={() => handleSelect(d.name)}
                className={clsx(
                  "text-sm py-2 text-left",
                  active === d.name ? "font-bold" : "text-muted-foreground",
                )}
              >
                {d.name}
              </button>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Desktop */}
      <GridContainer className="hidden md:block my-0">
        <div className="col-span-full border-t">
          <div className="w-full mx-auto flex flex-wrap items-center gap-6 py-4">
            <button
              onClick={() => setActive(null)}
              className={clsx(
                "text-sm uppercase cursor-pointer",
                active === null
                  ? "font-bold"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              All
            </button>
            {disciplines.map((d) => (
              <button
                key={d.name}
                onClick={() => setActive(d.name)}
                className={clsx(
                  "text-sm cursor-pointer",
                  active === d.name
                    ? "font-bold"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {d.name}
              </button>
            ))}
          </div>
        </div>
      </GridContainer>

      <WorksIndex key={active ?? "all"} works={filtered} />
    </>
  );
}
