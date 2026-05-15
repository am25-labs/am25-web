import React from "react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import { InfoIcon, QuoteIcon, ArrowUpRightIcon } from "lucide-react";
import YouTubeEmbed from "./embeds/YouTubeEmbeds";
import VimeoEmbed from "./embeds/VimeoEmbed";
import type { RichTextBlock, RichTextInlineNode } from "@/types/domain";

const headingClasses: Record<number, string> = {
  1: "text-4xl md:text-5xl font-bold leading-tight uppercase pt-5",
  2: "text-3xl md:text-4xl font-bold leading-tight uppercase pt-5",
  3: "text-2xl md:text-3xl font-bold leading-tight uppercase pt-5",
};

interface ParsedPart {
  type: string;
  url?: string;
  content?: string;
}

function parseTextWithEmbeds(text: string): ParsedPart[] {
  const parts = text.split(/(\[\[.*?\]\])/g);
  return parts
    .filter((part) => part !== "")
    .map((part) => {
      const match = part.match(/^\[\[([\w-]+):(.*?)\]\]$/);
      if (match) {
        const [, prefix, value] = match;
        if (prefix === "yt" || prefix === "vm") {
          return { type: prefix, url: value };
        }
        return { type: prefix, content: value };
      }
      return { type: "text", content: part };
    });
}

function replaceQuotes(text: string): string {
  return text.replace(/"([^"]*?)"/g, "«$1»");
}

function renderFormattedLines(
  text: string,
  bold: boolean | undefined,
  italic: boolean | undefined,
  keyPrefix: string,
): React.ReactNode {
  const cleanedText = replaceQuotes(text);
  const parts = cleanedText.split("\n");

  const elements: React.ReactNode[] = parts.flatMap((part, i) => {
    const output: React.ReactNode[] = [
      <span key={`${keyPrefix}-text-${i}`}>{part}</span>,
    ];
    if (i < parts.length - 1) {
      output.push(<br key={`${keyPrefix}-br-${i}`} />);
    }
    return output;
  });

  let content: React.ReactNode = elements;
  if (bold) content = <b key={`${keyPrefix}-b`}>{content}</b>;
  if (italic) content = <em key={`${keyPrefix}-i`}>{content}</em>;

  return content;
}

function formatText(children: RichTextInlineNode[]): React.ReactNode[] {
  return children
    .flatMap((child, index) => {
      if (child.type === "text") {
        const parsed = parseTextWithEmbeds(child.text);

        return parsed.flatMap((part, i) => {
          if (part.type === "yt") {
            return (
              <div key={`${index}-yt-${i}`} className="my-6">
                <YouTubeEmbed url={part.url!} />
              </div>
            );
          }

          if (part.type === "vm") {
            return (
              <div key={`${index}-vm-${i}`} className="my-6">
                <VimeoEmbed url={part.url!} />
              </div>
            );
          }

          if (part.type === "tx-feat") {
            return (
              <p key={`${index}-tx-feat-${i}`} className="text-2xl mb-8">
                {part.content}
              </p>
            );
          }

          return renderFormattedLines(
            part.content!,
            child.bold,
            child.italic,
            `${index}-${i}`,
          );
        });
      }

      if (child.type === "link") {
        const isExternal =
          child.url.startsWith("http://") || child.url.startsWith("https://");

        if (isExternal) {
          return (
            <a
              key={index}
              href={child.url}
              target="_blank"
              rel="noopener noreferrer"
              className={clsx("inline-flex items-center", "hover:font-bold")}
            >
              {formatText(child.children)}
              <ArrowUpRightIcon
                size={20}
                aria-hidden="true"
                className="text-am-y mt-0.5"
              />
            </a>
          );
        }

        return (
          <Link
            key={index}
            href={child.url}
            className={clsx("inline-flex items-center", "hover:font-bold")}
          >
            {formatText(child.children)}
            <ArrowUpRightIcon
              size={20}
              aria-hidden="true"
              className="text-am-y mt-0.5"
            />
          </Link>
        );
      }

      return null;
    })
    .flat() as React.ReactNode[];
}

interface FormatContentProps {
  blocks: RichTextBlock[];
}

export default function FormatContent({ blocks }: FormatContentProps) {
  return blocks.map((block, index) => {
    const key = `block-${index}`;

    if (block.type === "paragraph") {
      const children = formatText(block.children);

      const grouped: React.ReactNode[] = [];
      let inlineBuffer: React.ReactNode[] = [];

      children.forEach((child, i) => {
        const isBlock =
          React.isValidElement(child) &&
          typeof child.type === "string" &&
          ["div", "iframe", "video", "figure", "p"].includes(child.type);

        if (isBlock) {
          if (inlineBuffer.length > 0) {
            grouped.push(
              <p key={`${key}-p-${i}`} className="mb-4">
                {inlineBuffer}
              </p>,
            );
            inlineBuffer = [];
          }
          grouped.push(
            React.cloneElement(child as React.ReactElement, {
              key: `${key}-block-${i}`,
            }),
          );
        } else {
          inlineBuffer.push(child);
        }
      });

      if (inlineBuffer.length > 0) {
        grouped.push(
          <p key={`${key}-p-end`} className="mb-4">
            {inlineBuffer}
          </p>,
        );
      }

      return <React.Fragment key={key}>{grouped}</React.Fragment>;
    }

    if (block.type === "image") {
      return (
        <figure key={key} className="my-6">
          <Image
            src={block.image.url}
            alt={block.image.alternativeText || ""}
            width={1920}
            height={1080}
            className="w-full h-auto mb-2"
          />
          {block.image.caption && (
            <figcaption
              className={clsx(
                "flex items-start justify-center",
                "text-xs text-center md:px-24",
              )}
            >
              <div className="w-4 h-4">
                <InfoIcon size={14} className="mt-0.5 mr-1" />
              </div>
              {block.image.caption}
            </figcaption>
          )}
        </figure>
      );
    }

    if (block.type === "heading") {
      const HeadingTag = `h${block.level}` as
        | "h1"
        | "h2"
        | "h3"
        | "h4"
        | "h5"
        | "h6";
      return (
        <HeadingTag
          key={key}
          className={clsx(
            headingClasses[block.level] || "text-xl",
            "font-bricolage font-bold font-stretch-condensed mt-8 mb-4",
          )}
        >
          {formatText(block.children)}
        </HeadingTag>
      );
    }

    if (block.type === "quote") {
      return (
        <blockquote
          key={key}
          className="border border-foreground text-xl text-center italic p-4 my-6 md:p-8"
        >
          <QuoteIcon size={32} className="mr-2" />
          {formatText(block.children)}
        </blockquote>
      );
    }

    if (block.type === "list") {
      const ListTag = block.format === "ordered" ? "ol" : "ul";
      return (
        <ListTag
          key={key}
          className={clsx(
            "ml-12 mb-4",
            block.format === "ordered" ? "list-decimal" : "list-disc",
          )}
        >
          {block.children.map((item, itemIndex) => (
            <li key={`li-${itemIndex}`}>{formatText(item.children)}</li>
          ))}
        </ListTag>
      );
    }

    return null;
  });
}
