import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import NotesFilter from "@/components/notes/NotesFilter";
import { getNotes } from "@/lib/plank/fetch";

const baseUrl = process.env.BASE_URL;
const pageTitle = "Notes";

export function generateMetadata(): Metadata {
  return {
    ...baseMetadata,
    title: `${pageTitle} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${pageTitle} - AM25`,
      url: `${baseUrl}/notes`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${pageTitle} - AM25`,
    },
  };
}

export default async function NotesPage() {
  const { data: notes } = await getNotes();
  const entries = notes.map((note) => ({
    id: note.id,
    title: note.title,
    slug: note.slug,
    cover: note.cover?.url ?? null,
    categories: note.category ? [note.category] : [],
    publishedAt: note.published_at,
    author: note.author,
  }));

  return (
    <>
      <div className="col-span-full mb-16 px-4">
        <h1 className="text-6xl font-bold uppercase md:text-9xl">
          {pageTitle}
        </h1>
      </div>

      {entries.length > 0 ? (
        <NotesFilter entries={entries} baseHref="/notes" />
      ) : null}
    </>
  );
}
