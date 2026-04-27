import type {
  Work,
  Note,
  Home,
  About,
  LegalPage,
  PlankPage,
} from "@/types/index";
import plank from "./client";

// TTL cache

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

const TTL_WORK = 24 * 60 * 60 * 1000;
const TTL_NOTES = 5 * 60 * 1000;

// Collections

export async function getWorks({ onlyFeatured = false } = {}) {
  const key = `works:${onlyFeatured}`;
  return withCache(key, TTL_WORK, () =>
    plank.collection<Work>("works").findMany({
      status: "published",
      sort: "date",
      order: "desc",
      ...(onlyFeatured && { featured: true }),
    }),
  );
}

export async function getSingleWork(slug: string) {
  return withCache(`work:${slug}`, TTL_WORK, async () => {
    const result = await plank.collection<Work>("works").findMany({
      status: "published",
      slug,
    });
    return result.data[0];
  });
}

export async function getNotes() {
  return withCache("notes", TTL_NOTES, () =>
    plank.collection<Note>("notes").findMany({
      status: "published",
      sort: "created_at",
      order: "desc",
    }),
  );
}

export async function getSingleNote(slug: string) {
  return withCache(`note:${slug}`, TTL_NOTES, async () => {
    const result = await plank.collection<Note>("notes").findMany({
      status: "published",
      slug,
    });
    return result.data[0];
  });
}

// Single Types

export async function getHome() {
  return await plank.single<Home>("home").find();
}

export async function getAbout(): Promise<About> {
  return await plank.single<About>("about").find();
}

export async function getPlank() {
  return await plank.single<PlankPage>("plank").find();
}

export async function getPrivacy() {
  return await plank.single<LegalPage>("privacy").find();
}

export async function getTerms() {
  return await plank.single<LegalPage>("terms").find();
}

export async function getCopyright() {
  return await plank.single<LegalPage>("copyright").find();
}
