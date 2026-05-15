import parse, { domToReact, type DOMNode, type Element } from "html-react-parser"
import clsx from "clsx"
import { MoveUpRightIcon } from "lucide-react"

interface ParserFormatProps {
  children?: string
}

export default function ParserFormat({ children }: ParserFormatProps) {
  if (!children) return null

  return (
    <>
      <div className="space-y-5">
        {parse(children, {
          replace: (domNode) => {
            const node = domNode as Element
            if (!node.name) return

            switch (node.name) {
              case "a":
                return (
                  <a
                    href={node.attribs.href}
                    target={node.attribs.target}
                    rel={node.attribs.rel}
                    className={clsx(
                      "inline-flex items-center",
                      "hover:font-bold transition-all duration-200"
                    )}
                  >
                    {(node.children[0] as { data?: string })?.data}
                    <MoveUpRightIcon size={16} aria-hidden="true" className="text-am-y" />
                  </a>
                )

              case "h1":
                return (
                  <h1 className={clsx("text-4xl md:text-5xl font-bold leading-tight uppercase pt-5")}>
                    {domToReact(node.children as DOMNode[])}
                  </h1>
                )

              case "h2":
                return (
                  <h2 className={clsx("text-3xl md:text-4xl font-bold leading-tight uppercase pt-5")}>
                    {domToReact(node.children as DOMNode[])}
                  </h2>
                )

              case "h3":
                return (
                  <h3 className={clsx("text-2xl md:text-3xl font-bold leading-tight uppercase pt-5")}>
                    {domToReact(node.children as DOMNode[])}
                  </h3>
                )

              case "ul":
                return (
                  <ul className="list-disc ml-12">{domToReact(node.children as DOMNode[])}</ul>
                )

              case "ol":
                return (
                  <ol className="list-decimal ml-12">{domToReact(node.children as DOMNode[])}</ol>
                )

              default:
                return
            }
          },
        })}
      </div>
    </>
  )
}
