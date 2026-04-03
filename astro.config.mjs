import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";
import react from "@astrojs/react";

export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  markdown: {
    rehypePlugins: [
      [
        rehypeExternalLinks,
        {
          target: "_blank",
          rel: ["noopener"],
          protocols: ["http", "https", "mailto"],
          content: {
            type: "element",
            tagName: "svg",
            properties: {
              xmlns: "http://www.w3.org/2000/svg",
              width: "20",
              height: "20",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "#ffff00",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              class: "inline-block align-middle shrink-0",
            },
            children: [
              {
                type: "element",
                tagName: "path",
                properties: { d: "M7 7h10v10" },
                children: [],
              },
              {
                type: "element",
                tagName: "path",
                properties: { d: "M7 17 17 7" },
                children: [],
              },
            ],
          },
        },
      ],
    ],
  },

  integrations: [react()],
});
