import { Card, CardContent, CardFooter } from "@/components/ui/card";

interface ProjectCardProps {
  year?: string;
  title: string;
  description: string;
}

export default function ProjectCard({
  year,
  title,
  description,
}: ProjectCardProps) {
  return (
    <Card className="bg-background hover:bg-card ring-foreground/20 aspect-video md:aspect-5/4 flex justify-between group/card">
      <CardContent>
        <p className="text-lg mb-2">{year}</p>
        <h3 className="text-3xl font-bold uppercase group-hover/card:underline">
          {title}
        </h3>
      </CardContent>

      <CardFooter>
        <p className="">{description}</p>
      </CardFooter>
    </Card>
  );
}
