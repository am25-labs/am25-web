import { baseMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import GridContainer from "@/components/grids/GridContainer";
import ProjectCard from "@/components/ProjectCard";
import Link from "next/link";
import { getProjects } from "@/lib/strapi/fetchCollection";

const baseUrl = process.env.BASE_URL;

export async function generateMetadata(): Promise<Metadata> {
  const title = "Projects";

  return {
    ...baseMetadata,
    title: `${title} | Alejandro Mártir`,
    openGraph: {
      ...baseMetadata.openGraph,
      title: `${title} | Alejandro Mártir`,
      url: `${baseUrl}/projects`,
    },
    twitter: {
      ...baseMetadata.twitter,
      title: `${title} | Alejandro Mártir`,
    },
  };
}

export default async function ProjectPage() {
  const projects = await getProjects();

  return (
    <GridContainer className="gap-0">
      <div className="col-span-full mb-16 md:mb-32">
        <h1 className="text-6xl md:text-9xl font-bold uppercase">Projects</h1>
      </div>

      {projects.data.map((project, idx) => {
        const { title, description, year, url } = project;

        return (
          <div key={idx} className="col-span-full md:col-span-2">
            <div className="relative">
              <Link href={url} target="_blank" rel="noopener">
                <ProjectCard
                  year={year}
                  title={title}
                  description={description}
                />
              </Link>
            </div>
          </div>
        );
      })}
    </GridContainer>
  );
}
