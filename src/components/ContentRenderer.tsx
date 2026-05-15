import { Children } from "react";
import type { ReactNode } from "react";
import { PlankRenderer } from "@plank-cms/react-renderer";
import type { NodeComponents, TiptapDoc } from "@plank-cms/react-renderer";
import { InfoIcon, MoveUpRightIcon } from "lucide-react";
import VimeoEmbed from "@/components/embeds/VimeoEmbed";
import YouTubeEmbed from "@/components/embeds/YouTubeEmbeds";

const embedPattern = /^\[\[(yt|vm):(https:\/\/.+?)\]\]$/;

function getEmbed(children: ReactNode) {
  const parts = Children.toArray(children);

  if (parts.length !== 1 || typeof parts[0] !== "string") {
    return null;
  }

  const match = parts[0].trim().match(embedPattern);

  if (!match) {
    return null;
  }

  const [, provider, url] = match;

  if (provider === "yt") {
    return <YouTubeEmbed url={url} />;
  }

  if (provider === "vm") {
    return <VimeoEmbed url={url} />;
  }

  return null;
}

const components: NodeComponents = {
  heading: ({ level, children }) => {
    const Tag = `h${level}` as "h1" | "h2" | "h3";
    const className =
      level === 1
        ? "text-4xl! font-bricolage font-black font-stretch-condensed uppercase pt-4 first:pt-0!"
        : level === 2
          ? "text-4xl! font-bricolage font-black font-stretch-condensed uppercase pt-4 first:pt-0!"
          : "text-3xl! font-bricolage font-black font-stretch-condensed uppercase pt-2 first:pt-0!";

    return <Tag className={className}>{children}</Tag>;
  },
  paragraph: ({ children }) => {
    const embed = getEmbed(children);

    if (embed) {
      return <div className="pb-4">{embed}</div>;
    }

    return <p>{children}</p>;
  },
  link: ({ href, target, rel, children }) => (
    <a
      href={href}
      target={target ?? undefined}
      rel={rel ?? undefined}
      className="inline-flex items-center hover:font-bold! transition-all duration-300"
    >
      {children}
      <MoveUpRightIcon size={16} className="shrink-0 mt-0.5" />
    </a>
  ),
  image: ({ src, alt, title, width, height }) => {
    if (!title) {
      return (
        <img
          src={src}
          alt={alt ?? ""}
          width={width ?? undefined}
          height={height ?? undefined}
          className="w-full h-auto"
        />
      );
    }

    return (
      <figure>
        <img
          src={src}
          alt={alt ?? ""}
          title={title ?? undefined}
          width={width ?? undefined}
          height={height ?? undefined}
          className="w-full h-auto"
        />
        <figcaption className="text-xs text-center -mt-2 mb-6">
          <InfoIcon size={14} className="inline-block align-middle mr-1" />
          <span className="align-middle">{title}</span>
        </figcaption>
      </figure>
    );
  },
};

interface ContentRendererProps {
  content: string | TiptapDoc;
}

export default function ContentRenderer({ content }: ContentRendererProps) {
  return <PlankRenderer content={content} components={components} />;
}
