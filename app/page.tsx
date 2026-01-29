import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-[80vh] w-full items-center justify-center px-6">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Text content */}
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-semibold">Handcrafted Haven</h1>
          <p className="mt-4 text-lg text-zinc-600 dark:text-zinc-400">
            Welcome — Team 17 is working hard to build this site!
          </p>
        </div>

        {/* Hero images */}
        <div className="flex justify-center">
          {/* Mobile image */}
          <Image
            src="/hero-mobile.webp"
            width={560}
            height={620}
            className="block md:hidden"
            alt="Screenshot of the dashboard project showing mobile version"
            priority
          />

          {/* Desktop image */}
          <Image
            src="/hero-desktop.webp"
            width={1000}
            height={760}
            className="hidden md:block"
            alt="Screenshots of the dashboard project showing desktop version"
            priority
          />
        </div>
      </div>
    </main>
  );
}
