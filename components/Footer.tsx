// Site-wide footer. The year is set at build time; every deploy refreshes it.
export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-stone-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 text-sm text-stone-500">
        <p>© {year} Robert Mariotti. All rights reserved.</p>
      </div>
    </footer>
  );
}
