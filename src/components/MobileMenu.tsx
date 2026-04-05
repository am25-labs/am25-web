import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { MenuIcon, XIcon, ArrowUpRightIcon } from "lucide-react";
import type { NavProps, SocNavProps } from "@/types";
import BrandIcon from "@/components/BrandIcon";

interface MobileMenuProps {
  items: NavProps[];
  socItems: SocNavProps[];
}

export default function MobileMenu({ items, socItems }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      <Button size="icon" variant="ghost" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Main navigation (mobile)">
        {open ? <XIcon className="size-6" /> : <MenuIcon className="size-6" />}
      </Button>

      {open && (
        <div className="absolute right-0 top-full mt-1 min-w-48 rounded-2xl border bg-popover p-1 text-popover-foreground ring-1 ring-foreground/5 z-50">
          <ul aria-label="Main navigation (mobile)">
            {items.map((opt) => {
              const isExternal = opt.href.startsWith("https");
              return (
                <li key={opt.href}>
                  <a
                    href={opt.href}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener" : undefined}
                    className="flex items-center gap-2 rounded-xl px-3 py-2 text-base uppercase hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setOpen(false)}
                  >
                    {opt.label}
                    {isExternal && <ArrowUpRightIcon className="size-5 text-am-y shrink-0" />}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="my-1 h-px bg-border/50 -mx-1" />

          <ul className="flex flex-row" aria-label="Social media links">
            {socItems.map((opt) => (
              <li key={opt.href}>
                <a
                  href={opt.href}
                  target="_blank"
                  rel="noopener"
                  className="flex items-center rounded-xl px-3 py-2 hover:bg-accent"
                >
                  <BrandIcon icon={opt.icon} size={opt.size} />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
