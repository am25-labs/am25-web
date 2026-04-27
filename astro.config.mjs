import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import rehypeExternalLinks from "rehype-external-links";
import react from "@astrojs/react";
import node from "@astrojs/node";
import { visit } from "unist-util-visit";

const linkIconChildren = [
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
];

const linkIconSvg = {
  type: "element",
  tagName: "svg",
  properties: {
    xmlns: "http://www.w3.org/2000/svg",
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round",
    class: "link-icon inline-block align-middle shrink-0",
  },
  children: linkIconChildren,
};

function rehypeInternalLinks() {
  return (tree) => {
    visit(tree, "element", (node) => {
      if (
        node.tagName === "a" &&
        typeof node.properties?.href === "string" &&
        node.properties.href.startsWith("/")
      ) {
        node.children.push(structuredClone(linkIconSvg));
      }
    });
  };
}

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
          content: linkIconSvg,
        },
      ],
      rehypeInternalLinks,
    ],
  },

  output: "server",
  adapter: node({ mode: "standalone" }),
  integrations: [react()],
});
