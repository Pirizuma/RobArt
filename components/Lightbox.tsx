"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { imagePlaceholders } from "@/lib/imagePlaceholders";

// Shared by the viewer and by preloadViewerImages(): the browser picks the
// same file from the srcset either way, so a preload is actually reused.
export const VIEWER_SIZES = "100vw";

type LightboxProps = {
  images: string[];
  /** Image to open on. */
  currentIndex: number;
  onClose: () => void;
  /** Called whenever the visible image changes. */
  onNavigate?: (index: number) => void;
  /** Used for the dialog label and image alt text. */
  title?: string;
};

/**
 * Full-screen image viewer built on native horizontal scroll-snap — the same
 * approach as iOS Photos / Instagram galleries. The browser handles the swipe
 * (finger-following, momentum, snapping), so it stays smooth on phones; the
 * current image's neighbours load eagerly so the next swipe is never blank.
 * Arrow buttons and ←/→ keys scroll the same track; Esc closes.
 */
export function Lightbox({
  images,
  currentIndex,
  onClose,
  onNavigate,
  title,
}: LightboxProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const [index, setIndex] = useState(currentIndex);
  const count = images.length;

  const goTo = useCallback(
    (i: number, smooth = true) => {
      const track = trackRef.current;
      if (!track) return;
      const target = (i + count) % count; // wrap around at either end
      track.scrollTo({
        left: target * track.clientWidth,
        behavior: smooth ? "smooth" : "instant",
      });
    },
    [count]
  );

  // Open on the requested image (no animation), focus the close button, and
  // hand focus back to whatever opened the viewer when it closes.
  useEffect(() => {
    const opener = document.activeElement as HTMLElement | null;
    goTo(currentIndex, false);
    closeRef.current?.focus();
    return () => opener?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lock page scroll behind the viewer.
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      root.style.overflow = prev;
    };
  }, []);

  // Track which image is in view as the user swipes/scrolls.
  const onScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const i = Math.round(track.scrollLeft / track.clientWidth);
    if (i !== index && i >= 0 && i < count) {
      setIndex(i);
      onNavigate?.(i);
    }
  }, [index, count, onNavigate]);

  // Keep the current image aligned if the window is resized/rotated.
  useEffect(() => {
    const onResize = () => goTo(index, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, goTo]);

  // Keyboard: ←/→ to move, Esc to close, Tab kept inside the dialog.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goTo(index - 1);
      else if (e.key === "ArrowRight") goTo(index + 1);
      else if (e.key === "Tab" && dialogRef.current) {
        // Only buttons actually shown at this screen size.
        const focusables = [
          ...dialogRef.current.querySelectorAll<HTMLElement>("button"),
        ].filter((el) => el.offsetParent !== null);
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, goTo, onClose]);

  const btn =
    "z-10 flex items-center justify-center rounded-full text-white/90 hover:text-white bg-black/30 hover:bg-black/50 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white";

  // Portalled to <body> so it always sits above the sticky header.
  return createPortal(
    <div
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-black animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label={title ? `${title} — images` : "Images"}
    >
      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-contain"
      >
        {images.map((src, i) => (
          <div
            key={src}
            className="relative h-full w-full shrink-0 snap-center snap-always"
            aria-hidden={i !== index}
          >
            <Slide
              src={src}
              alt={title ? `${title} — image ${i + 1} of ${count}` : ""}
              // Current image and its neighbours load straight away;
              // the rest load as they come into view.
              eager={Math.abs(i - index) <= 1}
              high={i === currentIndex}
            />
          </div>
        ))}
      </div>

      <button
        ref={closeRef}
        type="button"
        onClick={onClose}
        className={`${btn} absolute right-3 top-3 h-11 w-11`}
        style={{ marginTop: "env(safe-area-inset-top, 0px)" }}
        aria-label="Close"
      >
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeWidth={2} d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      {count > 1 && (
        <>
          {/* Arrows on larger screens; phones swipe. */}
          <button
            type="button"
            onClick={() => goTo(index - 1)}
            className={`${btn} absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 sm:flex`}
            aria-label="Previous image"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => goTo(index + 1)}
            className={`${btn} absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 sm:flex`}
            aria-label="Next image"
          >
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Bottom bar: counter, with prev/next buttons on phones as an
              alternative to swiping (WCAG 2.5.1). */}
          <div
            className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-3"
            style={{ marginBottom: "env(safe-area-inset-bottom, 0px)" }}
          >
            <button
              type="button"
              onClick={() => goTo(index - 1)}
              className={`${btn} h-11 w-11 sm:hidden`}
              aria-label="Previous image"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <p
              className="rounded-full bg-black/40 px-3 py-1 text-sm text-white/90 tabular-nums"
              aria-live="polite"
            >
              {index + 1} / {count}
            </p>
            <button
              type="button"
              onClick={() => goTo(index + 1)}
              className={`${btn} h-11 w-11 sm:hidden`}
              aria-label="Next image"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>,
    document.body
  );
}

/**
 * One photo in the viewer. Shows a blurred preview instantly (blur-up), then
 * the full photo on top once it arrives; if that takes longer than a moment,
 * a small spinner says it's on its way rather than leaving a frozen frame.
 */
function Slide({
  src,
  alt,
  eager,
  high,
}: {
  src: string;
  alt: string;
  eager: boolean;
  high: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [slow, setSlow] = useState(false);

  useEffect(() => {
    if (loaded) return;
    const t = setTimeout(() => setSlow(true), 400);
    return () => clearTimeout(t);
  }, [loaded]);

  const blur = imagePlaceholders[src];

  return (
    <div className="absolute inset-0 m-auto h-[calc(100%-7rem)] w-[calc(100%-1rem)] sm:w-[calc(100%-8rem)]">
      <Image
        src={src}
        alt={alt}
        fill
        sizes={VIEWER_SIZES}
        className="select-none"
        // objectFit via style (not a class) so Next sizes the blurred
        // preview the same way as the photo — no jump when it sharpens.
        style={{ objectFit: "contain" }}
        placeholder={blur ? "blur" : "empty"}
        blurDataURL={blur}
        draggable={false}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={high ? "high" : "auto"}
        onLoad={() => setLoaded(true)}
      />
      {!loaded && slow && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center" role="status">
          <span className="sr-only">Loading image</span>
          <span
            aria-hidden="true"
            className="h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-white/80 motion-reduce:animate-none"
          />
        </div>
      )}
    </div>
  );
}
