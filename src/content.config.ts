import { defineCollection } from "astro:content";
import { z } from "zod";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    icon: z.string(),
    description: z.string(),
    details: z.array(
      z.object({
        label: z.string(),
        value: z.string(),
        href: z.string().optional(),
      })
    ),
    repository: z.object({
      label: z.string(),
      href: z.string(),
    }).optional(),
    deployment: z.string(),
    started: z.string(),
    updated: z.string(),
    version: z.string().optional(),
    documentation: z.object({
      label: z.string(),
      href: z.string(),
    }).optional(),
    cta: z.object({
      label: z.string(),
      dialog: z.object({
        title: z.string(),
        description: z.string(),
        command: z.string(),
        managers: z.array(z.string()),
      }),
    }).optional(),
  }),
});

export const collections = { projects };
