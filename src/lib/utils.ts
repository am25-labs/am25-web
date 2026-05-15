import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const CMS_TIME_ZONE = "America/El_Salvador";

type FormatDateOptions = {
  locale?: string;
  timeZone?: string;
};

export function formatDate(
  date: string,
  { locale = "en-US", timeZone = CMS_TIME_ZONE }: FormatDateOptions = {},
): string {
  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone,
  }).format(new Date(date));
}
