import PageShell from "@/components/PageShell";

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  return <PageShell variant="default">{children}</PageShell>;
}
