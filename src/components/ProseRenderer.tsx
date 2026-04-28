import { PlankRenderer } from "@am25/plank-react-renderer";
import type { NodeComponents, TiptapDoc } from "@am25/plank-react-renderer";
import { ArrowUpRightIcon } from "lucide-react";

const components: NodeComponents = {
  heading: ({ level, children }) => {
    const Tag = `h${level}` as "h1" | "h2" | "h3";
    return (
      <Tag className={level === 2 ? "text-2xl uppercase pt-6" : undefined}>
        {children}
      </Tag>
    );
  },
  bulletList: ({ children }) => (
    <ul className="list-disc pl-10 py-4 space-y-2 marker:text-am-y">
      {children}
    </ul>
  ),
  orderedList: ({ children }) => (
    <ol className="list-decimal pl-10 py-4 space-y-2 marker:text-am-y">
      {children}
    </ol>
  ),
  link: ({ href, target, rel, children }) => (
    <a
      href={href}
      target={target ?? undefined}
      rel={rel ?? undefined}
      className="inline-flex items-center hover:font-bold"
    >
      {children}
      <ArrowUpRightIcon
        size={20}
        className="text-am-y group-data-[variant=yellow]:text-black group-data-[variant=light]:text-black shrink-0"
      />
    </a>
  ),
};

interface Props {
  content: string | TiptapDoc;
}

export function ProseRenderer({ content }: Props) {
  return <PlankRenderer content={content} components={components} />;
}
