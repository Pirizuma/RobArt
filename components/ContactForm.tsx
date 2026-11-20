"use client";

import { useState } from "react";
import { LiquidGlassButton } from "@/components/LiquidGlassButton";
import { formspreeFormId } from "@/lib/site";

const fieldClass =
  "w-full rounded-xl border border-stone-200 bg-white px-4 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-400 focus:border-transparent transition";
const labelClass = "block text-sm font-medium text-stone-600 mb-1.5";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;

    if (!formspreeFormId) {
      setStatus("error");
      setError("This form isn’t connected yet.");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${formspreeFormId}`, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(form),
      });
      if (res.ok) {
        form.reset();
        setStatus("sent");
        return;
      }
      const data = await res.json().catch(() => null);
      setError(
        data?.errors?.map((x: { message: string }) => x.message).join(" ") ||
          "Something went wrong — please try again in a moment."
      );
      setStatus("error");
    } catch {
      setError("Couldn’t send — please check your connection and try again.");
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div
        role="status"
        className="rounded-xl bg-white/70 border border-stone-200 px-5 py-6 text-center"
      >
        <p className="text-stone-900 font-medium">
          Thank you — your message has been sent.
        </p>
        <p className="mt-1 text-sm text-stone-600">
          Robert will be in touch soon.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-stone-600 hover:text-stone-900 transition-colors"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="hidden" name="_subject" value="New enquiry from the RobArt Studio website" />
      {/* Honeypot: hidden from people, filled in by bots — Formspree discards those. */}
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div>
        <label htmlFor="name" className={labelClass}>
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="email" className={labelClass}>
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClass}
        />
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          required
          className={`${fieldClass} resize-y`}
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-red-700">
          {error}
        </p>
      )}

      <LiquidGlassButton type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send message"}
      </LiquidGlassButton>
    </form>
  );
}
