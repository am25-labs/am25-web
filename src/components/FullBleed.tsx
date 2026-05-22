export default function FullBleed({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative left-1/2 w-[100dvw] max-w-[100dvw] -translate-x-1/2">
      {children}
    </div>
  );
}
