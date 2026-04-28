"use client";

import { useMemo, useState } from "react";
import { ProseRenderer } from "@/components/ProseRenderer";
import { BannerPoweredBy } from "@/components/PoweredBy";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Note } from "@/types";

interface LocalizedNoteTabsProps {
  enNote: Note | null;
  esNote: Note | null;
}

type Locale = "en" | "es";

function formatDateInEnglish(date: string): string {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function LocalizedNoteTabs({ enNote, esNote }: LocalizedNoteTabsProps) {
  const initialLocale: Locale = enNote ? "en" : "es";
  const [locale, setLocale] = useState<Locale>(initialLocale);

  const activeNote = useMemo(() => {
    if (locale === "en") return enNote ?? esNote;
    return esNote ?? enNote;
  }, [locale, enNote, esNote]);

  if (!activeNote) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-8 px-4 gap-4 mb-16">
      <section className="col-span-2">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-full">
            <h1 className="text-3xl md:text-4xl font-bold uppercase">
              {activeNote.title}
            </h1>

            <span
              className="flex items-center gap-2 text-muted-foreground mt-4"
              title="Updated At"
            >
              Posted {formatDateInEnglish(activeNote.published_at)}
            </span>

            <div className="flex flex-col mt-8">
              <div className="flex items-center gap-2">
                {activeNote.author.avatar_url && (
                  <img
                    src={activeNote.author.avatar_url}
                    alt={`${activeNote.author.first_name} ${activeNote.author.last_name}`}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                )}
                <span className="font-bold">
                  {activeNote.author.first_name}
                  {activeNote.author.last_name}
                </span>
              </div>
              <span className="text-muted-foreground text-sm ml-8">
                {activeNote.author.job_title}
              </span>
              <span className="text-muted-foreground text-sm ml-8">
                {activeNote.author.organization}
              </span>
            </div>

            <div className="mt-12">
              <Tabs
                value={locale}
                onValueChange={(next) => setLocale(next as Locale)}
              >
                <TabsList>
                  <TabsTrigger value="en" disabled={!enNote}>
                    EN
                  </TabsTrigger>
                  <TabsTrigger value="es" disabled={!esNote}>
                    ES
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      <section className="col-span-2 md:col-span-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-full">
            {activeNote.cover && (
              <div className="aspect-square relative md:aspect-video mb-8">
                <img
                  src={activeNote.cover}
                  alt={activeNote.title}
                  className="object-cover w-full h-full"
                />
              </div>
            )}

            <ProseRenderer content={activeNote.content} />

            <div className="pt-8">
              <a href="/plank">
                <BannerPoweredBy
                  logoSrc="/plank-logo-w.svg"
                  logoAlt="Plank CMS"
                  text="Published via Plank CMS"
                  mode="dark"
                />
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
