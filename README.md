# AM25

## Stack

- [Astro](https://astro.build) — static site framework
- React + Tailwind CSS v4 — UI components and styling
- shadcn/ui + Radix UI — component primitives
- Content Collections — project entries defined in Markdown with Zod schemas

## Project Structure

```
src/
├── content/
│   └── projects/     # Markdown files, one per project
├── components/       # Astro and React components
├── layouts/          # Page layouts
├── pages/            # Routes
├── lib/              # Utilities
├── styles/           # Global styles
└── types/            # Shared TypeScript types
```

## Commands

| Command        | Action                               |
| :------------- | :----------------------------------- |
| `pnpm dev`     | Start dev server at `localhost:4321` |
| `pnpm build`   | Build production site to `./dist/`   |
| `pnpm preview` | Preview production build locally     |

## Adding a Project

Create a new `.md` file in `src/content/projects/` following the schema defined in [src/content.config.ts](src/content.config.ts).
