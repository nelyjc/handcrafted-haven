export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-16 border-t border-black/10 dark:border-white/20">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-4 p-8 sm:flex-row">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">© {year} Handcrafted Haven</p>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#" className="text-zinc-700 hover:underline dark:text-zinc-300">Future Link</a>
          <a href="#" className="text-zinc-700 hover:underline dark:text-zinc-300">Another Link</a>
        </nav>
      </div>
    </footer>
  );
}
