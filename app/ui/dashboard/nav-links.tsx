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
            "rounded-md px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-100",
            pathname === link.href && "bg-sky-100 text-blue-700"
          )}
        >
          {link.name}
        </Link>
      ))}
    </>
  );
}
