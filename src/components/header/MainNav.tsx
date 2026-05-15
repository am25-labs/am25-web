"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import clsx from "clsx";
import { getLeftNavLinks, getRightNavLinks } from "@/lib/links/mainNav";
import Link from "next/link";
import { ArrowUpRightIcon, MenuIcon, XIcon } from "lucide-react";

export default function MainNav() {
  const pathname = usePathname();
  const linksLf = getLeftNavLinks(pathname);
  const linksRt = getRightNavLinks(pathname);

  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Desktop */}

      <div className="bg-background w-full hidden md:block">
      <div
        className={clsx(
          "max-w-8xl mx-auto p-4",
          "grid grid-cols-12 items-center gap-2",
        )}
      >
        <nav className={clsx("col-span-5 flex gap-5 uppercase")}>
          {linksLf.map((link) => {
            const { id, label, slug, target, isActive } = link;
            const isExternal = target === "_blank";

            return (
              <Link
                key={id}
                href={slug}
                target={target}
                className={clsx(
                  "flex items-center text-lg hover:font-bold",
                  isActive ? "font-bold" : "",
                )}
              >
                {label}
                {isExternal && (
                  <ArrowUpRightIcon size={21} className="text-am-y group-data-[variant=yellow]:text-foreground group-data-[variant=light]:text-foreground shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="col-span-2 flex justify-center">
          <Link href="/">
            <Image
              src="/am-logo-y.svg"
              alt="Alejandro Mártir"
              width={81}
              height={39}
              priority
              className="group-data-[variant=yellow]:hidden group-data-[variant=light]:hidden"
            />
            <Image
              src="/am-logo-k.svg"
              alt="Alejandro Mártir"
              width={81}
              height={39}
              priority
              className="hidden group-data-[variant=yellow]:block group-data-[variant=light]:block"
            />
          </Link>
        </div>

        <nav className="col-span-5 flex justify-end gap-5 uppercase">
          {linksRt.map((link) => {
            const { id, label, slug, target, isActive } = link;
            const isExternal = target === "_blank";

            return (
              <Link
                key={id}
                href={slug}
                target={target}
                className={clsx(
                  "flex items-center text-lg hover:font-bold",
                  isActive ? "font-bold" : "",
                )}
              >
                {label}
                {isExternal && (
                  <ArrowUpRightIcon size={21} className="text-am-y group-data-[variant=yellow]:text-foreground group-data-[variant=light]:text-foreground shrink-0" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      </div>

      {/* Mobile */}
      <div
        className={clsx(
          "md:hidden w-full px-5 py-3.5",
          isOpen
            ? "bg-am-y text-black group-data-[variant=yellow]:bg-black group-data-[variant=yellow]:text-am-y"
            : "bg-background text-foreground",
        )}
      >
        <div className={clsx("flex flex-row items-center justify-between")}>
          <Link href="/" onClick={() => setIsOpen(false)}>
            {isOpen ? (
              <>
                <Image src="/am-logo-k.svg" alt="Alejandro Mártir" width={81} height={39} priority className="group-data-[variant=yellow]:hidden" />
                <Image src="/am-logo-y.svg" alt="Alejandro Mártir" width={81} height={39} priority className="hidden group-data-[variant=yellow]:block" />
              </>
            ) : (
              <>
                <Image
                  src="/am-logo-y.svg"
                  alt="Alejandro Mártir"
                  width={81}
                  height={39}
                  priority
                  className="group-data-[variant=yellow]:hidden group-data-[variant=light]:hidden"
                />
                <Image
                  src="/am-logo-k.svg"
                  alt="Alejandro Mártir"
                  width={81}
                  height={39}
                  priority
                  className="hidden group-data-[variant=yellow]:block group-data-[variant=light]:block"
                />
              </>
            )}
          </Link>

          <button onClick={toggleMenu} aria-label="Toggle navigation">
            {isOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>

        {isOpen && (
          <div
            className={clsx(
              "fixed left-0 right-0 top-[67px] h-full",
              "flex flex-col p-5 gap-3 pt-12",
              "bg-am-y text-black text-2xl uppercase space-y-2 group-data-[variant=yellow]:bg-black group-data-[variant=yellow]:text-am-y",
            )}
          >
            {linksLf.map((link) => {
              const { id, label, slug, isActive } = link;
              const isExternal = link.target === "_blank";

              return (
                <Link
                  key={id}
                  href={slug}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "flex items-center text-left",
                    isActive ? "font-bold" : "",
                  )}
                >
                  {label}
                  {isExternal && (
                    <ArrowUpRightIcon size={28} className="shrink-0" />
                  )}
                </Link>
              );
            })}
            {linksRt.map((link) => {
              const { id, label, slug, isActive } = link;
              const isExternal = link.target === "_blank";

              return (
                <Link
                  key={id}
                  href={slug}
                  onClick={() => setIsOpen(false)}
                  className={clsx(
                    "flex items-center text-left",
                    isActive ? "font-bold" : "",
                  )}
                >
                  {label}
                  {isExternal && (
                    <ArrowUpRightIcon size={28} className="shrink-0" />
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}
