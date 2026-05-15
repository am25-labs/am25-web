import { notFound } from "next/navigation";
import { renderDraftPreview } from "@/lib/plank/draft";

export const metadata = {
  robots: { index: false, follow: false },
};

interface DraftEntryPageProps {
  params: Promise<{ contentType: string; slug: string }>;
}

export default async function DraftEntryPage({
  params,
}: DraftEntryPageProps) {
  const { contentType, slug } = await params;
  const preview = await renderDraftPreview(contentType, slug);

  if (!preview) {
    notFound();
  }

  return preview;
}
