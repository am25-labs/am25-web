export default function FullBleed({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2">
      {children}
    </div>
  );
}
