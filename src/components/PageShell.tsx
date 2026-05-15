import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { TooltipProvider } from "@/components/ui/tooltip";

type Variant = "default" | "yellow" | "light";

interface PageShellProps {
  children: React.ReactNode;
  variant?: Variant;
}

export default function PageShell({
  children,
  variant = "default",
}: PageShellProps) {
  return (
    <TooltipProvider>
      <div
        data-variant={variant}
        className="group min-h-screen flex flex-col bg-background text-foreground"
      >
        <Header />
        <main className="max-w-8xl mx-auto w-full flex-1">{children}</main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}
