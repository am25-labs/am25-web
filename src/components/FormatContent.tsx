import type { RichTextBlock, RichTextInlineNode } from "@/types";

function formatText(children: RichTextInlineNode[]): React.ReactNode[] {
  return children.map((child, index) => {
    if (child.type === "text") {
      let content: React.ReactNode = child.text;
      if (child.bold) content = <b key={index}>{content}</b>;
      if (child.italic) content = <em key={index}>{content}</em>;
      return content;
    }

    if (child.type === "link") {
      const isExternal =
        child.url.startsWith("http://") || child.url.startsWith("https://");
      return (
        <a
          key={index}
          href={child.url}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="underline"
        >
          {child.children.map((c) => c.text).join("")}
        </a>
      );
    }

    return null;
  });
}

interface FormatContentProps {
  blocks: RichTextBlock[];
}

export default function FormatContent({ blocks }: FormatContentProps) {
  return (
    <>
      {blocks.map((block, index) => {
        const key = `block-${index}`;

        if (block.type === "paragraph") {
          return (
            <p key={key} className="mb-4">
              {formatText(block.children)}
            </p>
          );
        }

        if (block.type === "heading") {
          const Tag = `h${block.level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
          return (
            <Tag key={key} className="font-bold uppercase mt-6 mb-3">
              {formatText(block.children)}
            </Tag>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote key={key} className="italic border-l-2 pl-4 my-4">
              {formatText(block.children)}
            </blockquote>
          );
        }

        if (block.type === "list") {
          const Tag = block.format === "ordered" ? "ol" : "ul";
          return (
            <Tag
              key={key}
              className={`ml-6 mb-4 ${block.format === "ordered" ? "list-decimal" : "list-disc"}`}
            >
              {block.children.map((item, i) => (
                <li key={i}>{formatText(item.children)}</li>
              ))}
            </Tag>
          );
        }

        if (block.type === "image") {
          return (
            <figure key={key} className="my-6">
              <img
                src={block.image.url}
                alt={block.image.alternativeText ?? ""}
                className="w-full h-auto"
              />
              {block.image.caption && (
                <figcaption className="text-xs text-center mt-2 text-muted-foreground">
                  {block.image.caption}
                </figcaption>
              )}
            </figure>
          );
        }

        return null;
      })}
    </>
  );
}
