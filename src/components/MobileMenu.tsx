import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MenuIcon, ArrowUpRightIcon } from "lucide-react";
import type { NavProps, SocNavProps } from "@/types";
import BrandIcon from "@/components/BrandIcon";

interface MobileMenuProps {
  items: NavProps[];
  socItems: SocNavProps[];
}

export default function MobileMenu({ items, socItems }: MobileMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon className="size-6" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" aria-label="Main navigation (mobile)">
        <DropdownMenuGroup>
          {items.map((opt) => {
            const isExternal = opt.href.startsWith("https");
            return (
              <DropdownMenuItem key={opt.href} className="text-base" asChild>
                <a
                  href={opt.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener" : undefined}
                  className=" uppercase hover:underline"
                >
                  <span className="flex items-center">{opt.label}{isExternal && <ArrowUpRightIcon className="size-5 text-am-y shrink-0" />}</span>
                </a>
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup
          className="flex flex-row"
          aria-label="Social media links"
        >
          {socItems.map((opt) => (
            <DropdownMenuItem key={opt.href} asChild>
              <a href={opt.href} target="_blank" rel="noopener">
                <BrandIcon icon={opt.icon} size={opt.size} />
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
