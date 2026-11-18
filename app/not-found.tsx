import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-16 text-center">
      <h1 className="text-xl font-light text-stone-900">Page not found</h1>
      <p className="mt-2 text-stone-500 text-sm">
        The page you’re looking for doesn’t exist or has moved.
      </p>
      <Link
        href="/"
        className="inline-block mt-6 text-stone-500 hover:text-stone-900 text-sm transition-colors"
      >
        ← Back home
      </Link>
    </div>
  );
}
