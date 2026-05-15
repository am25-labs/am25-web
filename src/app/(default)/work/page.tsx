import WorksFilter from "@/components/work/WorksFilter";
import { getWorks } from "@/lib/strapi/fetchCollection";

export default async function WorksPage() {
  const works = await getWorks();

  return <>{works.data.length > 0 && <WorksFilter works={works.data} />}</>;
}
