import PageShell from "@/components/PageShell";

export default function LightLayout({ children }: { children: React.ReactNode }) {
  return <PageShell variant="light">{children}</PageShell>;
}
