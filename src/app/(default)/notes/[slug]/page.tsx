import { notFound } from "next/navigation";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import LocalizedNoteTabs from "@/components/notes/LocalizedNoteTabs";
import { getSingleNote } from "@/lib/plank/fetch";

const baseUrl = process.env.BASE_URL;

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: NotePageProps): Promise<Metadata> {
  const { slug } = await params;
  const [enNote, esNote] = await Promise.all([
    getSingleNote(slug),
    getSingleNote(slug, { locale: "es" }),
  ]);

  const noteForMeta = enNote ?? esNote;

  if (!noteForMeta) {
    return baseMetadata;
  }

  return {
    ...baseMetadata,
    title: `${noteForMeta.title} | Alejandro Mártir`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${noteForMeta.title} | Alejandro Mártir`,
      url: `${baseUrl}/notes/${slug}`,
      images: noteForMeta.cover?.url ? [noteForMeta.cover.url] : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${noteForMeta.title} | Alejandro Mártir`,
      images: noteForMeta.cover?.url ? [noteForMeta.cover.url] : baseMetadata.twitter?.images,
    },
  };
}

export default async function NotePage({ params }: NotePageProps) {
  const { slug } = await params;
  const [enNote, esNote] = await Promise.all([
    getSingleNote(slug),
    getSingleNote(slug, { locale: "es" }),
  ]);

  if (!enNote && !esNote) {
    notFound();
  }

  return <LocalizedNoteTabs enNote={enNote} esNote={esNote} />;
}
