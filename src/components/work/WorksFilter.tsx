"use client";

import WorksIndex from "./WorksIndex";
import type { Work, Discipline } from "@/types/domain";
import ContentFilter from "@/components/ContentFilter";

interface WorksFilterProps {
  works: Work[];
}

export default function WorksFilter({ works }: WorksFilterProps) {
  const disciplines: Discipline[] = Array.from(
    new Map(
      works
        .flatMap((w) => (Array.isArray(w.disciplines) ? w.disciplines : []))
        .map((d) => [d.slug, d]),
    ).values(),
  );

  return (
    <ContentFilter
      title="Work"
      options={disciplines.map((discipline) => ({
        id: discipline.id,
        label: discipline.title,
        value: discipline.title,
      }))}
      items={works}
      matches={(work, active) =>
        active === null ||
        work.disciplines.some((discipline) => discipline.title === active)
      }
    >
      {(filteredWorks) => <WorksIndex works={filteredWorks} />}
    </ContentFilter>
  );
}
