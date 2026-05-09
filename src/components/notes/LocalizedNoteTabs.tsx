"use client";

import { useMemo, useState } from "react";
import { ProseRenderer } from "@/components/ProseRenderer";
import { BannerPoweredBy } from "@/components/PoweredBy";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Note } from "@/types";
import { Separator } from "@/components/ui/separator";
import { ChevronLeftIcon } from "lucide-react";

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
      <section className="col-span-2 mb-8">
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-full">
            <h1 className="text-3xl md:text-4xl font-bold uppercase">
              {activeNote.title}
            </h1>

            <p
              className="flex items-center gap-2 text-muted-foreground mt-4"
              title="Updated At"
            >
              {formatDateInEnglish(activeNote.published_at)}
            </p>

            <div className="flex flex-col mt-8">
              <div className="flex items-center gap-2">
                {activeNote.author.avatar_url && (
                  <img
                    src={activeNote.author.avatar_url}
                    alt={`${activeNote.author.first_name} ${activeNote.author.last_name}`}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                )}
                <div>
                  <p className="font-bold">
                    {activeNote.author.first_name} {activeNote.author.last_name}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {activeNote.author.job_title} at{" "}
                    {activeNote.author.organization}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="col-span-2 md:col-span-4">
        <div className="aspect-square relative mb-4">
          {activeNote.cover && (
            <img
              src={activeNote.cover.url}
              alt={activeNote.cover.alt ?? activeNote.title}
              className="object-cover w-full h-full"
            />
          )}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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

          <div className="col-span-full">
            <ProseRenderer content={activeNote.content} />

            <div className="flex flex-col items-center py-16">
              <Separator />
              <a
                href="/notes"
                className="flex items-center gap-2 text-center font-bold uppercase mt-8 hover:underline"
              >
                <ChevronLeftIcon size={21} />
                Back to all notes
              </a>
            </div>

            <BannerPoweredBy
              logoSrc="/plank-logo-w.svg"
              logoAlt="Plank CMS"
              label="Published via Plank CMS"
              link="https://plank-cms.com"
              mode="dark"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
