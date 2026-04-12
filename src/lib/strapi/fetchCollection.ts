import type { StrapiResponse, Work } from "@/types/index";
import strapi from "./client";

export async function getWorks({ onlyFeatured = false } = {}): Promise<
  StrapiResponse<Work[]>
> {
  return await strapi.fetch("/api/works", {
    fields: ["title", "slug", "featured"],
    populate: {
      cover: {
        fields: ["url"],
      },
      disciplines: {
        fields: ["name"],
      },
    },
    sort: ["date:desc"],
    filters: {
      am25: { $eq: true },
      ...(onlyFeatured && { featured: { $eq: true } }),
    },
  });
}

export async function getSingleWork(
  slug: string,
): Promise<StrapiResponse<Work[]>> {
  return await strapi.fetch("/api/works", {
    fields: [
      "title",
      "slug",
      "video",
      "description",
      "quote",
      "client",
      "campaign",
      "agency",
      "country",
      "creative",
      "strategy",
      "lead",
      "design",
      "copy",
      "illustration",
      "animation",
      "photo",
      "developer",
      "team",
    ],
    populate: {
      cover: {
        fields: ["url"],
      },
      imagesBefore: {
        fields: ["url"],
      },
      imagesAfter: {
        fields: ["url"],
      },
      disciplines: {
        fields: ["name"],
      },
    },
    filters: {
      am25: { $eq: true },
      slug: { $eq: slug },
    },
  });
}
