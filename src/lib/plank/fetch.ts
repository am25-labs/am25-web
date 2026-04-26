import type { Work, Note, Home, About, LegalPage } from "@/types/index";
import plank from "./client";

// --- Collections ---

export async function getWorks({ onlyFeatured = false } = {}) {
  return await plank.collection<Work>("works").findMany({
    status: "published",
    sort: "date",
    order: "desc",
    ...(onlyFeatured && { featured: true }),
  });
}

export async function getSingleWork(slug: string) {
  const result = await plank.collection<Work>("works").findMany({
    status: "published",
    slug,
  });
  return result.data[0];
}

export async function getNotes() {
  return await plank.collection<Note>("notes").findMany({
    status: "published",
    sort: "created_at",
    order: "desc",
  });
}

export async function getSingleNote(slug: string) {
  const result = await plank.collection<Note>("notes").findMany({
    status: "published",
    slug,
  });
  return result.data[0];
}

// --- Single Types ---

export async function getHome() {
  return await plank.single<Home>("home").find();
}

export async function getAbout(): Promise<About> {
  return await plank.single<About>("about").find();
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
