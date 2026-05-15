import clsx from "clsx"

interface PageHeaderProps {
  title: string
  secondary?: boolean
}

export default function PageHeader({ title, secondary }: PageHeaderProps) {
  const Tag = secondary ? "h2" : "h1"
  return (
    <div className={clsx("flex min-h-24 md:min-h-24 2xl:min-h-36 mt-12 md:mt-16 border-b")}>
      <div
        className={clsx(
          "w-full max-w-9xl mx-auto px-5 xl:px-10",
          "flex flex-col justify-center",
        )}
      >
        <Tag
          className={clsx(
            "text-3xl md:text-4xl 2xl:text-5xl md:text-center font-bold uppercase mt-5 md:mt-0",
          )}
        >
          {title}
        </Tag>
      </div>
    </div>
  )
}
