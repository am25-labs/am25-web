import { notFound } from "next/navigation";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import LocalizedNoteTabs from "@/components/notes/LocalizedNoteTabs";
import { getNotes, getSingleNote } from "@/lib/plank/fetch";
import PageContainer from "@/components/PageContainer";

const baseUrl = process.env.BASE_URL;

interface NotePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data: notes } = await getNotes();
  return notes.map((note) => ({ slug: note.slug }));
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
    title: `${noteForMeta.title} - AM25`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${noteForMeta.title} - AM25`,
      url: `${baseUrl}/notes/${slug}`,
      images: noteForMeta.cover?.url
        ? [noteForMeta.cover.url]
        : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${noteForMeta.title} - AM25`,
      images: noteForMeta.cover?.url
        ? [noteForMeta.cover.url]
        : baseMetadata.twitter?.images,
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

  return (
    <PageContainer>
      <LocalizedNoteTabs enNote={enNote} esNote={esNote} />
    </PageContainer>
  );
}
