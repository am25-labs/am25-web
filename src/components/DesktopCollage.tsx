"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import ContentRenderer from "@/components/ContentRenderer";
import type { DesktopObj } from "@/types/domain";

const CELL_SPANS: Record<string, string> = {
  "1:1": "col-span-1 row-span-1",
  "2:1": "col-span-2 row-span-1",
  "1:2": "col-span-1 row-span-2",
};

const CELL_ASPECT: Record<string, string> = {
  "1:1": "1 / 1",
  "2:1": "2 / 1",
  "1:2": "1 / 2",
};

interface DesktopCollageProps {
  objects: DesktopObj[];
}

export default function DesktopCollage({ objects }: DesktopCollageProps) {
  const [selected, setSelected] = useState<DesktopObj | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-5 grid-flow-dense">
        {objects.map((obj) => (
          <button
            key={obj.id}
            className={`${CELL_SPANS[obj.ratio]} relative cursor-pointer hover:animate-tilt`}
            style={{ aspectRatio: CELL_ASPECT[obj.ratio] }}
            onClick={() => setSelected(obj)}
          >
            <Image src={obj.image!.url} alt={obj.title} fill unoptimized />
          </button>
        ))}
      </div>

      <Dialog
        open={!!selected}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent>
          <DialogTitle className="sr-only">{selected?.title ?? ""}</DialogTitle>
          {selected && (
            <DialogDescription asChild>
              <div className="-mb-4">
                {selected.description && (
                  <ContentRenderer content={selected.description} />
                )}
              </div>
            </DialogDescription>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
