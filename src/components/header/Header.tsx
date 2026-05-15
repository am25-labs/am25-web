import MainNav from "./MainNav";

export default async function Header() {
  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <MainNav />
    </header>
  );
}
