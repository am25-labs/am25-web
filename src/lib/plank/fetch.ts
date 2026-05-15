import plank from "./client";
import type {
  Navigation,
  Work,
  Note,
  Home,
  About,
  LegalPage,
  Footer,
} from "@/types/domain";

// TTL Cache
const cache = new Map<string, { data: unknown; expiresAt: number }>();

function withCache<T>(
  key: string,
  ttlMs: number,
  fetcher: () => Promise<T>,
): Promise<T> {
  const cached = cache.get(key);
  if (cached && Date.now() < cached.expiresAt)
    return Promise.resolve(cached.data as T);
  return fetcher().then((data) => {
    cache.set(key, { data, expiresAt: Date.now() + ttlMs });
    return data;
  });
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;

const TTL_GENERAL = 6 * HOUR;
const TTL_NOTES = 5 * MINUTE;

type LocaleOptions = {
  locale?: string;
};

const PREVIEW_FETCH_OPTIONS = { cache: "no-store" } as const;

// CT: Works
export async function getWorks({ onlyFeatured = false } = {}) {
  const key = `works:${onlyFeatured}`;
  return withCache(key, TTL_GENERAL, () =>
    plank.collection<Work>("works").findMany({
      status: "published",
      sort: "date",
      order: "desc",
      ...(onlyFeatured && { filters: { featured: { eq: true } } }),
    }),
  );
}

export async function getSingleWork(slug: string) {
  return withCache(`work:${slug}`, TTL_GENERAL, async () => {
    const result = await plank.collection<Work>("works").findMany({
      status: "published",
      filters: { slug: { eq: slug } },
    });
    return result.data[0];
  });
}

export async function getPreviewWork(slug: string) {
  return plank.collection<Work>("works").findMany(
    {
      limit: 1,
      status: "all",
      filters: { slug: { eq: slug } },
    },
    PREVIEW_FETCH_OPTIONS,
  );
}

// CT: Notes
export async function getNotes({ locale }: LocaleOptions = {}) {
  return withCache(`notes:${locale ?? "default"}`, TTL_NOTES, () =>
    plank.collection<Note>("notes").findMany({
      status: "published",
      sort: "published_at",
      order: "desc",
      ...(locale && { locale, fallback: "en" }),
    }),
  );
}

export async function getSingleNote(
  slug: string,
  { locale }: LocaleOptions = {},
) {
  return withCache(
    `note:${slug}:${locale ?? "default"}`,
    TTL_NOTES,
    async () => {
      const result = await plank.collection<Note>("notes").findMany({
        status: "published",
        filters: { slug: { eq: slug } },
        ...(locale && { locale, fallback: "en" }),
      });
      return result.data[0];
    },
  );
}

export async function getPreviewNote(
  slug: string,
  { locale }: LocaleOptions = {},
) {
  return plank.collection<Note>("notes").findMany(
    {
      limit: 1,
      status: "all",
      filters: { slug: { eq: slug } },
      ...(locale && { locale, fallback: "en" }),
    },
    PREVIEW_FETCH_OPTIONS,
  );
}

// ST: Navigation
async function getNavigation() {
  return withCache("single:navigation", TTL_GENERAL, () =>
    plank.single<Navigation>("navigation").find(),
  );
}

export async function getMainNav() {
  const navigation = await getNavigation();
  return navigation.main_nav ?? [];
}

export async function getFooterNav() {
  const navigation = await getNavigation();
  return navigation.footer_nav ?? [];
}

// Home
export async function getHome() {
  return await plank.single<Home>("home").find();
}

// About
export async function getAbout(): Promise<About> {
  return await plank.single<About>("about").find();
}

// Legals
export async function getPrivacy() {
  return await plank.single<LegalPage>("privacy").find();
}

export async function getTerms() {
  return await plank.single<LegalPage>("terms").find();
}

export async function getCopyright() {
  return await plank.single<LegalPage>("copyright").find();
}

export async function getFooter() {
  return await plank.single<Footer>("footer").find();
}
