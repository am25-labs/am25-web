"use client";

import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { NoteCardProps } from "@/types/domain";
import { formatDate } from "@/lib/utils";

export default function NoteCard({
  cover,
  title,
  href,
  category,
  publishedAt,
  author,
}: NoteCardProps) {
  const isExternal = href.startsWith("https");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener" : undefined}
      title={title}
      className="group/card"
    >
      <Card className="gap-0 overflow-hidden bg-black p-0 text-white">
        {cover ? (
          <>
            <div className="aspect-[5/4] overflow-hidden">
              <img src={cover} alt={title} className="h-full w-full object-cover" />
            </div>
            <Separator />
          </>
        ) : null}

        <div className="flex h-full flex-col justify-between p-6">
          <div>
            <div className="mb-4 flex items-center justify-between gap-4">
              <span className="text-xs text-muted-foreground">{category}</span>
              {publishedAt ? (
                <span className="text-xs text-muted-foreground">
                  {formatDate(publishedAt)}
                </span>
              ) : null}
            </div>

            <p className="mb-8 text-2xl font-bold uppercase group-hover/card:underline">
              {title}
            </p>
          </div>

          {author ? (
            <div className="flex items-center gap-3">
              {author.avatar_url ? (
                <img
                  src={author.avatar_url}
                  alt={`${author.first_name} ${author.last_name}`}
                  className="size-8 rounded-full object-cover"
                />
              ) : null}

              <div>
                <div className="font-bold">
                  {author.first_name} {author.last_name}
                </div>
                {author.job_title ? (
                  <div className="text-xs text-muted-foreground">
                    {author.job_title} at {author.organization}
                  </div>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </Card>
    </Link>
  );
}
