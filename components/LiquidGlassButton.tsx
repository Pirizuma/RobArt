"use client";

import Link from "next/link";
import type { ReactNode } from "react";

/**
 * LiquidGlassButton — Apple-style "liquid glass" pill, modelled on the
 * buttons from danield.design.
 *
 * Renders as a Next <Link> when `href` is given, otherwise as a native
 * <button> (e.g. a form submit) — so links and buttons share one style.
 */

type LiquidGlassButtonProps = {
  children: ReactNode;
  className?: string;
  /** If provided, renders as a link to this href. */
  href?: string;
  /** Used only in button mode (no href). */
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  /** Used only in button mode (no href). */
  disabled?: boolean;
};

const wrapperClass =
  "group relative inline-flex items-center overflow-hidden rounded-full bg-white/20 backdrop-blur-md backdrop-saturate-150 transition duration-300 ease-out hover:-translate-y-px hover:scale-[1.05] hover:bg-white/30 active:scale-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2";

const wrapperStyle: React.CSSProperties = {
  border: "1px solid rgba(255,255,255,0.5)",
  boxShadow:
    "rgba(255,255,255,0.55) 0px 1px 0px inset, rgba(255,255,255,0.18) 0px 0px 14px inset, rgba(0,0,0,0.10) 0px 6px 20px",
};

function Inner({ children }: { children: ReactNode }) {
  return (
    <>
      {/* glossy top sheen */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
        style={{
          background:
            "linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(255,255,255,0))",
        }}
      />
      <span className="relative z-10 px-5 py-2.5 text-sm text-stone-900">
        {children}
      </span>
    </>
  );
}

export function LiquidGlassButton({
  children,
  className = "",
  href,
  type = "button",
  onClick,
  disabled = false,
}: LiquidGlassButtonProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={`${wrapperClass} ${className}`}
        style={wrapperStyle}
        onClick={onClick}
      >
        <Inner>{children}</Inner>
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${wrapperClass} disabled:opacity-60 disabled:pointer-events-none ${className}`}
      style={wrapperStyle}
    >
      <Inner>{children}</Inner>
    </button>
  );
}
