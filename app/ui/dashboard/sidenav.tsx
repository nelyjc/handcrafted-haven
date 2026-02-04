import NavLinks from "./nav-links";

export default function SideNav() {
  return (
    <div className="grid gap-4">
      <div className="font-bold">Handcrafted Haven</div>
      <nav className="grid gap-2">
        <NavLinks />
      </nav>
    </div>
  );
}
