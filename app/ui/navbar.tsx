"use client";
import { useState } from "react";
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b border-black/10 dark:border-white/20">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between p-4 sm:p-6">
        
        <a href="#" className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Handcrafted Haven
        </a>

        <div className="hidden items-center gap-6 text-sm sm:flex">
          <a href="./" className="text-zinc-700 hover:underline dark:text-zinc-300">Home</a>
          <a href="./products" className="text-zinc-700 hover:underline dark:text-zinc-300">Store</a>
          <a href="./profile" className="text-zinc-700 hover:underline dark:text-zinc-300">Account</a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 sm:hidden"
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 bg-zinc-900 transition-transform dark:bg-zinc-100 ${isOpen ? 'translate-y-2 rotate-45' : ''}`} />
          <span className={`h-0.5 w-6 bg-zinc-900 dark:bg-zinc-100 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`h-0.5 w-6 bg-zinc-900 transition-transform dark:bg-zinc-100 ${isOpen ? '-translate-y-2 -rotate-45' : ''}`} />
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-black/10 dark:border-white/20 sm:hidden">
          <div className="flex flex-col gap-4 p-4">
            <a href="#" className="text-sm text-zinc-700 hover:underline dark:text-zinc-300">Home</a>
            <a href="#" className="text-sm text-zinc-700 hover:underline dark:text-zinc-300">Store</a>
            <a href="#" className="text-sm text-zinc-700 hover:underline dark:text-zinc-300">Account</a>
          </div>
        </div>
      )}
    </nav>
  );
}