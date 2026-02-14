"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const links = [
  { name: "Products", href: "/dashboard/products" },
  { name: "Add product", href: "/dashboard/products/add-product" },
  { name: "Main profile", href: "/dashboard/profile" },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={clsx(
            "rounded-md px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100",
            pathname === link.href && "bg-stone-300 text-emerald-950"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
