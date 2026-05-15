import { getFooterLinks } from "@/lib/links/footerNav";
import { ArrowUpRightIcon } from "lucide-react";
import Link from "next/link";

export default async function Footer() {
  const links = getFooterLinks();

  return (
    <>
      <div className="border-t" />

      <footer className="text-muted-foreground max-w-8xl mx-auto w-full px-4 py-8">
        <div className="flex flex-col-reverse md:flex-row gap-4 md:items-center justify-between text-xs uppercase">
          <p>&copy; Alejandro Mártir</p>

          <nav className="flex gap-4">
            {links.map((link) => {
              const { id, label, slug, target } = link;
              const isExternal = target === "_blank";
              return (
                <Link
                  key={id}
                  href={slug}
                  target={target}
                  className="flex items-center hover:underline"
                >
                  {label}
                  {isExternal && (
                    <ArrowUpRightIcon size={16} className="shrink-0" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </footer>
    </>
  );
}
