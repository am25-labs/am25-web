import { notFound } from "next/navigation";
import PreviewAutoRefresh from "@/components/PreviewAutoRefresh";
import ContentRenderer from "@/components/ContentRenderer";
import GridContainer from "@/components/grids/GridContainer";
import GridTwo from "@/components/grids/GridTwo";
import GridFour from "@/components/grids/GridFour";
import WorkGallery from "@/components/work/WorkGallery";
import WorkHeader from "@/components/work/WorkHeader";
import WorkMeta from "@/components/work/WorkMeta";
import type { Note } from "@/types/domain";
import { getPreviewNote, getPreviewWork } from "./fetch";

async function renderWorkDraftPreview(slug: string) {
  const result = await getPreviewWork(slug).catch(() => null);
  const work = result?.data[0] ?? null;

  if (!work) {
    notFound();
  }

  return (
    <>
      <PreviewAutoRefresh contentType="works" slug={slug} />

      <WorkHeader
        title={work.title}
        cover={work.cover}
        description={work.description}
      />

      <WorkMeta
        client={work.client}
        campaign={work.campaign}
        country={work.country}
        creative={work.creative}
        strategy={work.strategy}
        lead_design={work.lead_design}
        design={work.design}
        copy={work.copy}
        illustration={work.illustration}
        animation={work.animation}
        photo={work.photo}
        develop={work.develop}
        work_team={work.work_team}
        disciplines={work.disciplines}
      />

      <WorkGallery images={work.images_before} />
      <WorkGallery quote={work.quote} images={work.images_after} />
    </>
  );
}

function NoteDraftSection({ label, note }: { label: string; note: Note }) {
  return (
    <section className="border-t py-8 first:border-t-0 first:pt-0">
      <p className="mb-4 text-xs font-bold uppercase text-muted-foreground">
        {label}
      </p>

      <GridTwo className="mb-8">
        <div className="col-span-full">
          <h1 className="text-3xl font-bold uppercase md:text-4xl">
            {note.title}
          </h1>
        </div>
      </GridTwo>

      <GridFour>
        <div className="col-span-full">
          <ContentRenderer content={note.content} />
        </div>
      </GridFour>
    </section>
  );
}

async function renderNoteDraftPreview(slug: string) {
  const [enNote, esNote] = await Promise.all([
    getPreviewNote(slug)
      .then((result) => result.data[0] ?? null)
      .catch(() => null),
    getPreviewNote(slug, { locale: "es" })
      .then((result) => result.data[0] ?? null)
      .catch(() => null),
  ]);

  if (!enNote && !esNote) {
    notFound();
  }

  return (
    <>
      <PreviewAutoRefresh contentType="notes" slug={slug} />

      <GridContainer>
        {enNote && <NoteDraftSection label="English draft" note={enNote} />}
        {esNote && <NoteDraftSection label="Spanish draft" note={esNote} />}
      </GridContainer>
    </>
  );
}

export async function renderDraftPreview(
  contentType: string,
  slug: string,
): Promise<React.ReactNode | null> {
  if (contentType === "works") {
    return renderWorkDraftPreview(slug);
  }

  if (contentType === "notes") {
    return renderNoteDraftPreview(slug);
  }

  return null;
}
