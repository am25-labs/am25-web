import PageShell from "@/components/PageShell";

export default function YellowLayout({ children }: { children: React.ReactNode }) {
  return <PageShell variant="yellow">{children}</PageShell>;
}
