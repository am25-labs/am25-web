import WorksFilter from "@/components/work/WorksFilter";
import { getWorks } from "@/lib/plank/fetch";

export default async function WorksPage() {
  const works = await getWorks();

  return <>{works.data.length > 0 && <WorksFilter works={works.data} />}</>;
}
