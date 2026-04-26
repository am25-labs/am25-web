import { PlankRenderer } from "@am25/plank-react-renderer";

interface FormatContentProps {
  content: string;
}

export default function FormatContent({ content }: FormatContentProps) {
  return (
    <PlankRenderer
      content={content}
      components={{
        paragraph: ({ children }) => <p className="mb-4">{children}</p>,
        heading: ({ level, children }) => {
          const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
          return <Tag className="font-bold uppercase mt-6 mb-3">{children}</Tag>;
        },
        blockquote: ({ children }) => (
          <blockquote className="italic border-l-2 pl-4 my-4">
            {children}
          </blockquote>
        ),
        bulletList: ({ children }) => (
          <ul className="ml-6 mb-4 list-disc">{children}</ul>
        ),
        orderedList: ({ children }) => (
          <ol className="ml-6 mb-4 list-decimal">{children}</ol>
        ),
        link: ({ href, target, rel, children }) => (
          <a href={href} target={target} rel={rel} className="underline">
            {children}
          </a>
        ),
      }}
    />
  );
}
