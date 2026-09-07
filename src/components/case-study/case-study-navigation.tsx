"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface CaseStudyNavigationProps {
  sections: Array<{ id: string; label: string }>;
}

export default function CaseStudyNavigation({
  sections,
}: CaseStudyNavigationProps) {
  const [activeId, setActiveId] = useState<string | null>(
    sections[0]?.id ?? null,
  );

  useEffect(() => {
    const updateActiveSection = () => {
      const activeSection = sections.reduce<string | null>(
        (currentId, section) => {
          const element = document.getElementById(section.id);

          return element && element.getBoundingClientRect().top <= 96
            ? section.id
            : currentId;
        },
        sections[0]?.id ?? null,
      );

      setActiveId(activeSection);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  return (
    <nav
      aria-label="Case study sections"
      className="col-span-full sticky top-24 self-start"
    >
      <ul className="flex flex-col gap-4">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              aria-current={activeId === section.id ? "location" : undefined}
              className={cn(
                "text-sm font-bold uppercase hover:underline",
                activeId === section.id
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
              onClick={() => setActiveId(section.id)}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
