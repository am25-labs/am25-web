import { notFound } from "next/navigation";
import PreviewAutoRefresh from "@/components/PreviewAutoRefresh";
import WorkGallery from "@/components/work/WorkGallery";
import WorkHeader from "@/components/work/WorkHeader";
import WorkMeta from "@/components/work/WorkMeta";
import { getPreviewWorkBySlug } from "./fetch";

export async function renderDraftPreview(
  contentType: string,
  slug: string,
): Promise<React.ReactNode | null> {
  if (contentType !== "works") {
    return null;
  }

  const work = await getPreviewWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  return (
    <>
      <PreviewAutoRefresh contentType={contentType} slug={slug} />

      <WorkHeader
        title={work.title}
        cover={work.cover!}
        video={work.video}
        description={work.description}
      />

      <WorkMeta
        client={work.client}
        campaign={work.campaign}
        agency={work.agency}
        country={work.country}
        creative={work.creative}
        strategy={work.strategy}
        lead={work.lead}
        design={work.design}
        copywriting={work.copywriting}
        illustration={work.illustration}
        animation={work.animation}
        photography={work.photography}
        developer={work.developer}
        team={work.team}
        disciplines={work.disciplines}
      />

      <WorkGallery imagesBefore={work.imagesBefore} />
      <WorkGallery quote={work.quote} imagesAfter={work.imagesAfter} />
    </>
  );
}
