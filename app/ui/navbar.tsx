"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Store", href: "./products" },
    { name: "Account", href: "./profile" },
  ];
 


  return (
    <nav className="border-b border-black/10 dark:border-white/20 ">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between p-3 ">

        <Link href="/" className="relative h-11 w-[200px]">
          <Image
            src="/logo.png"
            alt="Handcrafted Haven logo"
            fill
            className="object-contain"
            priority
          />
        </Link>

        <div className="hidden items-center gap-6 text-sm sm:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                className={clsx(
                  "hover:underline font-medium",
                  isActive
                    ? "text-orange-500"
                    : "text-zinc-700 dark:text-zinc-300"
                )}
              >
                {link.name}
              </Link>
            );
          })}

          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-full border border-black/20 px-4 py-1.5 text-sm text-zinc-800 hover:bg-zinc-100 dark:border-white/30 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-orange-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-orange-600"
            >
              Register
            </Link>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 sm:hidden p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition"
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-zinc-900 transition-transform dark:bg-zinc-100 ${isOpen ? "translate-y-2 rotate-45" : ""
              }`}
          />
          <span
            className={`h-0.5 w-6 bg-zinc-900 dark:bg-zinc-100 ${isOpen ? "opacity-0" : ""
              }`}
          />
          <span
            className={`h-0.5 w-6 bg-zinc-900 transition-transform dark:bg-zinc-100 ${isOpen ? "-translate-y-2 -rotate-45" : ""
              }`}
          />
        </button>
      </div>

      {/* mobile links */}
      {isOpen && (
        <div className="border-t border-black/10 dark:border-white/20 sm:hidden">
          <div className="flex flex-col gap-4 p-4">
            {navLinks.map((link) => (

              <Link
                key={link.name}
                href={link.href}
                data-active={pathname === link.href}
                className="
    text-sm hover:underline font-medium
    text-zinc-700 dark:text-zinc-300
    data-[active=true]:text-orange-500
  "
              >
                {link.name}
              </Link>
            ))}

            <hr className="border-black/10 dark:border-white/20" />

            <Link
              href="/auth/login"
              className="rounded-full border border-black/20 px-4 py-1.5 text-center text-zinc-800 hover:bg-zinc-100 dark:border-white/30 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="rounded-md bg-orange-500 px-4 py-2 text-center text-sm font-medium text-white"
            >
              Register
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
