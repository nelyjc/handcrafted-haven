"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { PowerIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import CartButton from "./CartButton";   

interface NavLink {
  name: string;
  href: string;
}

export default function NavLinks() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();

  const navLinks: NavLink[] = [
    { name: "Home", href: "/" },
    { name: "Store", href: "/products" },
    { name: "Account", href: "/profile" },
  ];

  return (
    <>
      {/* Desktop Navigation */}
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

        
        <CartButton />

        {status === "authenticated" ? (
          <button
            onClick={() => signOut()}
            className="flex items-center gap-2 hover:text-orange-600"
          >
            <PowerIcon className="w-6" />
            <span className="hidden md:block">Sign Out</span>
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="rounded-full border border-black/20 px-4 py-1.5 text-sm"
            >
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="rounded-full bg-orange-500 px-4 py-1.5 text-sm text-white"
            >
              Register
            </Link>
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex flex-col gap-1.5 sm:hidden p-2 rounded-md hover:bg-black/5 dark:hover:bg-white/10 transition relative z-50"
        aria-label="Toggle menu"
      >
        <span
          className={`h-0.5 w-6 bg-zinc-900 transition-transform dark:bg-zinc-100 ${
            isOpen ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-zinc-900 dark:bg-zinc-100 ${
            isOpen ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-zinc-900 transition-transform dark:bg-zinc-100 ${
            isOpen ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {/* Backdrop blur */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Menu */}
      <div
        className={clsx(
          "fixed top-[73px] left-0 right-0 bg-white dark:bg-zinc-900 border-t border-black/10 dark:border-white/20 sm:hidden transition-transform duration-300 ease-in-out z-40 shadow-lg",
          isOpen ? "translate-y-0" : "-translate-y-full"
        )}
      >
        <div className="flex flex-col gap-4 p-4 max-h-[calc(100vh-73px)] overflow-y-auto">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              data-active={pathname === link.href}
              className="text-sm hover:underline font-medium text-zinc-700 dark:text-zinc-300 data-[active=true]:text-orange-500"
            >
              {link.name}
            </Link>
          ))}

          
          <CartButton />

          <hr className="border-black/10 dark:border-white/20" />

          {status === "authenticated" ? (
            <button
              onClick={() => {
                setIsOpen(false);
                signOut();
              }}
              className="flex items-center justify-center gap-2 rounded-full border border-black/20 px-4 py-2 text-center text-zinc-800 hover:bg-zinc-100 dark:border-white/30 dark:text-zinc-200 dark:hover:bg-white/10"
            >
              <PowerIcon className="w-5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <>
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-black/20 px-4 py-1.5 text-center text-zinc-800 hover:bg-zinc-100 dark:border-white/30 dark:text-zinc-200 dark:hover:bg-white/10"
              >
                Sign in
              </Link>
              <Link
                href="/auth/register"
                onClick={() => setIsOpen(false)}
                className="rounded-md bg-orange-500 px-4 py-2 text-center text-sm font-medium text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </>
  );
}
