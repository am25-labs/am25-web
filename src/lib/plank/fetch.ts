import type { Work } from "@/types/index";
import plank from "./client";

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
  return { data: result.data };
}
