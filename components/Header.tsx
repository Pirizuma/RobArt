import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white/80 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
        <Link
          href="/"
          className="inline-block whitespace-nowrap hover:opacity-75 transition-opacity"
        >
          <span className="text-lg sm:text-xl font-medium tracking-tight text-[#1a1a1a]">
            Imago Studio
          </span>
          <span className="text-lg sm:text-xl font-light tracking-tight text-[#737373] ml-1.5">
            by Robert Mariotti
          </span>
        </Link>
        <nav className="flex items-center text-sm text-stone-500 whitespace-nowrap">
          <Link
            href="/contact"
            className="hover:text-stone-900 transition-colors"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
