import WorkGallery from "@/components/work/WorkGallery";
import WorkHeader from "@/components/work/WorkHeader";
import WorkMeta from "@/components/work/WorkMeta";
import { notFound } from "next/navigation";
import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import { getSingleWork } from "@/lib/strapi/fetchCollection";

const baseUrl = process.env.BASE_URL;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const workResponse = await getSingleWork(slug);
  const work = workResponse.data[0];

  if (!work) {
    return baseMetadata;
  }

  const { title, cover } = work;
  const imageObj = cover
    ? {
        url: `${cover.url}`,
        width: 1200,
        height: 630,
        alt: cover.caption || title,
      }
    : undefined;

  return {
    ...baseMetadata,
    title: `${title} | Alejandro Mártir`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} | Alejandro Mártir`,
      url: `${baseUrl}/work/${slug}`,
      images: imageObj ? [imageObj] : baseMetadata.openGraph?.images,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} | Alejandro Mártir`,
      images: imageObj ? [imageObj] : baseMetadata.twitter?.images,
    },
  };
}

export default async function WorkPage({ params }: PageProps) {
  const { slug } = await params;
  const workResponse = await getSingleWork(slug);
  const work = workResponse.data[0];

  if (!work) {
    notFound();
  }

  const {
    title,
    cover,
    video,
    description,
    quote,
    imagesBefore,
    imagesAfter,
    client,
    campaign,
    agency,
    country,
    creative,
    strategy,
    lead,
    design,
    copywriting,
    illustration,
    animation,
    photography,
    developer,
    team,
    disciplines,
  } = work;

  return (
    <>
      <WorkHeader
        title={title}
        cover={cover!}
        video={video}
        description={description}
      />

      <WorkMeta
        client={client}
        campaign={campaign}
        agency={agency}
        country={country}
        creative={creative}
        strategy={strategy}
        lead={lead}
        design={design}
        copywriting={copywriting}
        illustration={illustration}
        animation={animation}
        photography={photography}
        developer={developer}
        team={team}
        disciplines={disciplines}
      />

      <WorkGallery imagesBefore={imagesBefore} />
      <WorkGallery quote={quote} imagesAfter={imagesAfter} />
    </>
  );
}
