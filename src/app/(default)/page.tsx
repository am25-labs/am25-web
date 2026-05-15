import Hero from "@/components/home/Hero";
import RecentEntries from "@/components/home/RecentEntries";
import Services from "@/components/home/Services";
import { getHome } from "@/lib/plank/fetch";

export default async function HomePage() {
  const { heading, description, services } = await getHome();

  return (
    <>
      <Hero heading={heading} description={description} />
      <Services services={services} />
      <RecentEntries />
    </>
  );
}
