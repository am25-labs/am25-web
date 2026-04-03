import type { BrandIconProps } from "@/types";

export default function BrandIcon({ icon, size = 24, "aria-label": ariaLabel }: BrandIconProps) {
  return (
    <svg
      role="img"
      style={{ width: size, height: size }}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-label={ariaLabel ?? icon.title}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.path} />
    </svg>
  );
}
