import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/auth";
import NavLinks from "./NavLinks";

export default function Navbar() {
  const handleSignOut = async () => {
    "use server";
    await signOut({ redirectTo: "/" });
  };

  return (
    <nav className="border-b border-black/10 dark:border-white/20 relative z-50 bg-white dark:bg-zinc-900">
      <div className="px-10 flex w-full items-center justify-between p-3">
        <Link href="/" className="relative h-11 w-[200px]">
          <Image
            src="/logo.png"
            alt="Handcrafted Haven logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        <NavLinks/>
      </div>
    </nav>
  );
}