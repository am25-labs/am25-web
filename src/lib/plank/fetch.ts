import type { PlankStatus } from "@plank-cms/client";
import plank from "./client";
import type {
  About,
  Copyright,
  DesktopObj,
  Global,
  Home,
  MediaImage,
  MediaImageWithCaption,
  Privacy,
  Project,
  Work,
} from "@/types/domain";

interface PlankSingle<T> {
  status?: string;
  published_at?: string | null;
  created_at?: string;
  updated_at?: string;
  author?: unknown;
  editor?: unknown;
  id: string;
  [key: string]: unknown;
}

interface PlankGlobalsEntry extends PlankSingle<Global> {
  contact?: Array<{
    email?: string | null;
    whatsapp?: string | null;
  }>;
  social?: Array<{
    instagram?: string | null;
    facebook?: string | null;
    github?: string | null;
    linkedin?: string | null;
    youtube?: string | null;
  }>;
  music?: Array<{
    spotify?: string | null;
    apple?: string | null;
    amazon?: string | null;
  }>;
  podcast?: Array<{
    spotify?: string | null;
    apple?: string | null;
    amazon?: string | null;
    youtube?: string | null;
  }>;
}

interface PlankHomeEntry extends PlankSingle<Home> {
  title?: string | null;
  tagline?: string | null;
}

interface PlankAboutEntry extends PlankSingle<About> {
  title?: string | null;
  short_description?: string | null;
  bio?: Work["description"];
  services?: string | null;
  agencies?: string | null;
  clients?: string | null;
  awards?: string | null;
  publications?: string | null;
  featured?: PlankMediaLike | null;
}

interface PlankCommonPage extends PlankSingle<Privacy> {
  title?: string | null;
  date?: string | null;
  content?: Work["description"];
}

interface PlankProjectEntry extends PlankSingle<Project> {
  title: string;
  url: string;
  description: string;
  year?: string | null;
}

interface PlankDesktopEntry extends PlankSingle<DesktopObj> {
  title: string;
  description?: DesktopObj["description"];
  ratio: string;
  image?: PlankMediaLike | null;
}

interface PlankDiscipline {
  name: string;
}

interface PlankWorkEntry extends PlankSingle<Work> {
  title: string;
  slug: string;
  featured?: boolean | null;
  cover?: PlankMediaLike | null;
  disciplines?: PlankDiscipline[] | null;
  video?: string | null;
  description?: Work["description"];
  quote?: string | null;
  client?: string | null;
  campaign?: string | null;
  agency?: string | null;
  country?: string | null;
  creative?: string | null;
  strategy?: string | null;
  lead?: string | null;
  design?: string | null;
  copy?: string | null;
  copywriting?: string | null;
  illustration?: string | null;
  animation?: string | null;
  photo?: string | null;
  photography?: string | null;
  developer?: string | null;
  team?: string | null;
  imagesBefore?: PlankMediaLike[] | null;
  imagesAfter?: PlankMediaLike[] | null;
}

interface PlankMediaLike {
  id: string | null;
  url: string;
  alt: string | null;
  figcaption: string | null;
}

const isDevelopment = process.env.NODE_ENV !== "production";
const revalidateSeconds = 3600;
const publishedCache = isDevelopment
  ? { cache: "no-store" as const }
  : { cache: "force-cache" as const, revalidate: revalidateSeconds };
const draftCache = { cache: "no-store" as const };

function mapMedia(media?: PlankMediaLike | null): MediaImage | undefined {
  if (!media?.url) {
    return undefined;
  }

  return {
    id: media.id,
    url: media.url,
    alternativeText: media.alt,
  };
}

function mapMediaWithCaption(
  media?: PlankMediaLike | null,
): MediaImageWithCaption | undefined {
  if (!media?.url) {
    return undefined;
  }

  return {
    id: media.id,
    url: media.url,
    alternativeText: media.alt,
    caption: media.figcaption,
  };
}

function mapGallery(items?: PlankMediaLike[] | null): MediaImage[] | undefined {
  if (!items?.length) {
    return undefined;
  }

  return items
    .map((item) => mapMedia(item))
    .filter((item): item is MediaImage => Boolean(item));
}

function mapWork(entry: PlankWorkEntry): Work {
  return {
    id: entry.id,
    title: entry.title,
    slug: entry.slug,
    featured: entry.featured ?? false,
    cover: mapMediaWithCaption(entry.cover),
    disciplines: entry.disciplines ?? undefined,
    video: entry.video ?? undefined,
    description: entry.description ?? null,
    quote: entry.quote ?? undefined,
    client: entry.client ?? undefined,
    campaign: entry.campaign ?? undefined,
    agency: entry.agency ?? undefined,
    country: entry.country ?? undefined,
    creative: entry.creative ?? undefined,
    strategy: entry.strategy ?? undefined,
    lead: entry.lead ?? undefined,
    design: entry.design ?? undefined,
    copy: entry.copy ?? undefined,
    copywriting: entry.copywriting ?? undefined,
    illustration: entry.illustration ?? undefined,
    animation: entry.animation ?? undefined,
    photo: entry.photo ?? undefined,
    photography: entry.photography ?? undefined,
    developer: entry.developer ?? undefined,
    team: entry.team ?? undefined,
    imagesBefore: mapGallery(entry.imagesBefore),
    imagesAfter: mapGallery(entry.imagesAfter),
  };
}

async function findWorkBySlug(
  slug: string,
  status: PlankStatus = "published",
): Promise<Work | null> {
  const { data } = await plank.collection<PlankWorkEntry>("works").findMany(
    {
      limit: 1,
      status,
      filters: {
        slug: { eq: slug },
      },
    },
    status === "published" ? publishedCache : draftCache,
  );

  const entry = data[0];

  return entry ? mapWork(entry) : null;
}

export async function getGlobalContent(): Promise<Global> {
  const data = await plank
    .single<PlankGlobalsEntry>("globals")
    .find(undefined, publishedCache);
  const contact = data.contact?.[0];
  const social = data.social?.[0];
  const music = data.music?.[0];
  const podcast = data.podcast?.[0];

  return {
    email: contact?.email ?? undefined,
    whatsapp: contact?.whatsapp ?? undefined,
    instagram: social?.instagram ?? undefined,
    facebook: social?.facebook ?? undefined,
    youTube: social?.youtube ?? undefined,
    gitHub: social?.github ?? undefined,
    linkedIn: social?.linkedin ?? undefined,
    spotify: music?.spotify ?? undefined,
    appleMusic: music?.apple ?? undefined,
    amazonMusic: music?.amazon ?? undefined,
    spotifyPod: podcast?.spotify ?? undefined,
    applePod: podcast?.apple ?? undefined,
    amazonMusicPod: podcast?.amazon ?? undefined,
    youTubePod: podcast?.youtube ?? undefined,
  };
}

export async function getHomeContent(): Promise<Home> {
  const data = await plank
    .single<PlankHomeEntry>("home")
    .find(undefined, publishedCache);

  return {
    tagline: data.tagline ?? undefined,
    quote: data.title ?? undefined,
  };
}

export async function getAboutContent(): Promise<About> {
  const data = await plank
    .single<PlankAboutEntry>("about")
    .find(undefined, publishedCache);

  return {
    title: data.title ?? undefined,
    shortDescription: data.short_description ?? undefined,
    bio: data.bio ?? null,
    services: data.services ?? undefined,
    agencies: data.agencies ?? undefined,
    clients: data.clients ?? undefined,
    awards: data.awards ?? undefined,
    publications: data.publications ?? undefined,
    featured: mapMediaWithCaption(data.featured),
  };
}

export async function getPrivacyContent(): Promise<Privacy> {
  const data = await plank
    .single<PlankCommonPage>("privacy")
    .find(undefined, publishedCache);

  return {
    title: data.title ?? undefined,
    date: data.date ?? undefined,
    content: data.content ?? null,
  };
}

export async function getCopyrightContent(): Promise<Copyright> {
  const data = await plank
    .single<PlankCommonPage>("copyright")
    .find(undefined, publishedCache);

  return {
    title: data.title ?? undefined,
    content: data.content ?? null,
  };
}

export async function getProjectsContent(): Promise<Project[]> {
  const { data } = await plank
    .collection<PlankProjectEntry>("projects")
    .findMany(
      {
        sort: "year",
        order: "asc",
      },
      publishedCache,
    );

  return data.map((entry) => ({
    id: entry.id,
    title: entry.title,
    url: entry.url,
    description: entry.description,
    year: entry.year ?? undefined,
  }));
}

export async function getDesktopObjectsContent(): Promise<DesktopObj[]> {
  const { data } = await plank
    .collection<PlankDesktopEntry>("desktop")
    .findMany(
      {
        sort: "title",
        order: "asc",
      },
      publishedCache,
    );

  return data.map((entry) => ({
    id: entry.id,
    title: entry.title,
    ratio: entry.ratio,
    image: mapMedia(entry.image),
    description: entry.description ?? null,
  }));
}

export async function getWorksContent({
  onlyFeatured = false,
  limit,
}: { onlyFeatured?: boolean; limit?: number } = {}): Promise<Work[]> {
  const { data } = await plank.collection<PlankWorkEntry>("works").findMany(
    {
      limit,
      sort: "published_at",
      order: "desc",
      filters: onlyFeatured ? { featured: { eq: true } } : undefined,
    },
    publishedCache,
  );

  return data.map(mapWork);
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  return findWorkBySlug(slug);
}

export async function getPreviewWorkBySlug(slug: string): Promise<Work | null> {
  return findWorkBySlug(slug, "all");
}
