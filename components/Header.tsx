import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-block whitespace-nowrap py-2 -my-2 hover:opacity-75 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-md"
        >
          <span className="text-base sm:text-xl font-medium tracking-tight text-[#1a1a1a]">
            robArt Studio
          </span>
          <span className="text-base sm:text-xl font-light tracking-tight text-[#737373] ml-1.5">
            by Robert Mariotti
          </span>
        </Link>
        <nav className="flex items-center text-sm text-stone-500 whitespace-nowrap">
          <Link
            href="/contact"
            className="inline-flex items-center min-h-11 px-2 -mx-2 hover:text-stone-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 rounded-md"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
