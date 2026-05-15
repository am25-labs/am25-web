import type { DesktopObj, Project, StrapiResponse, Work } from "@/types/domain";
import {
  getDesktopObjectsContent,
  getProjectsContent,
  getPreviewWorkBySlug,
  getWorksContent,
} from "@/lib/plank/fetch";

export async function getWorks({
  onlyFeatured = false,
  limit,
}: { onlyFeatured?: boolean; limit?: number } = {}): Promise<
  StrapiResponse<Work[]>
> {
  return {
    data: await getWorksContent({ onlyFeatured, limit }),
  };
}

export async function getSingleWork(
  slug: string,
): Promise<StrapiResponse<Work[]>> {
  const work = await getPreviewWorkBySlug(slug);
  return {
    data: work ? [work] : [],
  };
}

export async function getProjects(): Promise<StrapiResponse<Project[]>> {
  return {
    data: await getProjectsContent(),
  };
}

export async function getDesktopObj(): Promise<StrapiResponse<DesktopObj[]>> {
  return {
    data: await getDesktopObjectsContent(),
  };
}
