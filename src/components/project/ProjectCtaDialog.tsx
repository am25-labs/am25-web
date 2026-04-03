import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { ProjectCta } from "@/types";

interface Props {
  cta: ProjectCta;
}

export default function ProjectCtaDialog({ cta }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-full w-full mb-4 cursor-pointer" size="lg">
          {cta.label}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{cta.dialog.title}</DialogTitle>
          <DialogDescription>{cta.dialog.description}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          {cta.dialog.managers.map((manager) => (
            <code
              key={manager}
              className="rounded-lg bg-muted px-3 py-2 text-xs"
            >
              {manager} {cta.dialog.command}
            </code>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
