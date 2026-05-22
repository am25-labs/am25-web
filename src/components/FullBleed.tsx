export default function FullBleed({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-x-clip">
      <div className="relative left-1/2 w-screen max-w-none -translate-x-1/2">
        {children}
      </div>
    </div>
  );
}
