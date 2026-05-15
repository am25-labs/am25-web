"use client";

import clsx from "clsx";
import { useState } from "react";
import type { Discipline } from "@/lib/types";
import GridContainer from "@/components/grids/GridContainer";
import GridFour from "@/components/grids/GridFour";

interface WorkMetaProps {
  client?: string;
  campaign?: string;
  agency?: string;
  country?: string;
  creative?: string;
  strategy?: string;
  lead?: string;
  design?: string;
  copywriting?: string;
  illustration?: string;
  animation?: string;
  photography?: string;
  developer?: string;
  team?: string;
  disciplines?: Discipline[] | string;
}

export default function WorkMeta({
  client,
  campaign,
  agency,
  country,
  creative,
  strategy,
  lead,
  design,
  copywriting,
  illustration,
  animation,
  photography,
  developer,
  team,
  disciplines,
}: WorkMetaProps) {
  const [expanded, setExpanded] = useState(false);

  const infoItems = [
    { label: "Client", value: client },
    { label: "Campaign", value: campaign },
    { label: "Agency", value: agency },
    { label: "Country", value: country },
    { label: "Creative", value: creative },
    { label: "Strategy", value: strategy },
    { label: "Lead", value: lead },
    { label: "Design", value: design },
    { label: "Copywriting", value: copywriting },
    { label: "Illustration", value: illustration },
    { label: "Animation", value: animation },
    { label: "Photography", value: photography },
    { label: "Developer", value: developer },
    { label: "Team", value: team },
    {
      label: "Disciplines",
      value: Array.isArray(disciplines)
        ? disciplines.map((d) => d.name).join(", ")
        : disciplines,
    },
  ];

  return (
    <GridContainer className="my-0">
      <GridFour />
      <GridFour>
        <div className="col-span-full">
          {!expanded ? (
            <button
              className="mb-4 font-bold cursor-pointer"
              onClick={() => setExpanded(true)}
            >
              More details
            </button>
          ) : (
            <div className="flex flex-col gap-3">
              {infoItems
                .filter(
                  (item) =>
                    item.value !== undefined &&
                    item.value !== null &&
                    item.value !== "",
                )
                .map((item) => (
                  <p key={item.label} className="border-b pb-3">
                    <span className="font-bold uppercase mr-1">
                      {item.label}:
                    </span>
                    {item.value}
                  </p>
                ))}

              <button
                className="my-4 font-bold cursor-pointer self-start"
                onClick={() => setExpanded(false)}
              >
                Less details
              </button>
            </div>
          )}
        </div>
      </GridFour>
    </GridContainer>
  );
}
