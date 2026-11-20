"use client";

import { useId, useState } from "react";
import { noWidow } from "@/lib/text";

/**
 * Bio paragraphs. On phones only the first shows, with a "Read more" toggle
 * for the rest; from 640px up everything is always shown. The full text is
 * always in the HTML (just visually collapsed), so search engines and AI
 * crawlers read all of it.
 */
export function BioText({ paragraphs }: { paragraphs: string[] }) {
  const [open, setOpen] = useState(false);
  const moreId = useId();
  const [first, ...rest] = paragraphs;

  return (
    <div className="mt-4 text-stone-600 leading-relaxed text-sm sm:text-base">
      <p>{noWidow(first)}</p>
      {rest.length > 0 && (
        <>
          <div id={moreId} className={`${open ? "block" : "hidden"} sm:block`}>
            {rest.map((para) => (
              <p key={para.slice(0, 24)} className="mt-3">
                {noWidow(para)}
              </p>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={moreId}
            className="mt-2 -mx-1 inline-flex min-h-11 items-center gap-1 rounded-md px-1 text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 sm:hidden"
          >
            {open ? "Read less" : "Read more"}
          </button>
        </>
      )}
    </div>
  );
}
