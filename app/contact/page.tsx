import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { HeroMeshGradient } from "@/components/HeroMeshGradient";
import { exhibitionMode, openGraphBase } from "@/lib/site";
import { profile } from "@/lib/profile";

const contactDescription =
  "Get in touch with Robert Mariotti about commissions, enquiries and collaborations. Based in Darwin, NT — taking commissions across Australia and overseas.";

export const metadata: Metadata = {
  title: "Contact",
  description: contactDescription,
  alternates: { canonical: "/contact" },
  openGraph: {
    ...openGraphBase,
    title: "Contact",
    description: contactDescription,
    url: "/contact",
  },
};

function PlaceholderTile({ label }: { label: string }) {
  return (
    <div className="border border-stone-200 rounded-3xl p-[clamp(1.5rem,3vw,2rem)]">
      <div className="aspect-[4/3] rounded-2xl bg-stone-100 flex items-center justify-center">
        <div className="flex flex-col items-center text-stone-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <p className="text-sm mt-2">{label}</p>
        </div>
      </div>
    </div>
  );
}

type DetailItem = { label: string; value: string; href?: string };

const detailItems: DetailItem[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
  },
  // Phone is hidden in exhibition mode; it returns with the full site.
  ...(exhibitionMode ? [] : [{ label: "Phone", value: "[+00 000 000 000]" }]),
  {
    label: "Studio",
    value:
      "Robert is currently based in Darwin, Northern Territory.\nTaking commissions across Australia and overseas.",
  },
];

export default function InformationPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 space-y-6 sm:space-y-8">
      <header className="max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-light tracking-tight text-stone-900">
          Contact
        </h1>
      </header>

      {/* Row 1 — contact details + contact form (leads) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        {/* Details + blurb */}
        <div className="border border-stone-200 rounded-3xl p-[clamp(2rem,3.5vw,2.5rem)]">
          <h2 className="text-xl font-medium text-stone-900 tracking-tight">
            Robert Mariotti
          </h2>
          <p className="mt-3 text-stone-600 leading-relaxed text-sm sm:text-base">
            Robert Mariotti is a Darwin-based sculptor and artist with over 40
            years&rsquo; experience specialising in model making, dioramas and
            fibreglass sculpture. He welcomes enquiries and commissions from
            across Australia and overseas, so if you have a piece in mind, get
            in touch.
          </p>

          <dl className="mt-8 space-y-5">
            {detailItems.map((item) => (
              <div key={item.label}>
                <dt className="text-xs uppercase tracking-wider text-stone-500">
                  {item.label}
                </dt>
                <dd className="mt-1 text-stone-900 whitespace-pre-line">
                  {item.href ? (
                    <a
                      href={item.href}
                      className="underline decoration-stone-300 underline-offset-4 hover:decoration-stone-900 transition-colors"
                    >
                      {item.value}
                    </a>
                  ) : (
                    item.value
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Contact form — over the same warm MeshGradient as the hero */}
        <div className="relative overflow-hidden border border-stone-200 rounded-3xl p-[clamp(2rem,3.5vw,2.5rem)]">
          <div aria-hidden className="absolute inset-0">
            <HeroMeshGradient />
          </div>

          <div className="relative z-10">
            <h2 className="text-xl font-medium text-stone-900 tracking-tight">
              Send a message
            </h2>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 — image placeholder + companies/initiatives worked with */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
        <PlaceholderTile label="Image placeholder" />
        <div className="border border-stone-200 rounded-3xl p-[clamp(2rem,3.5vw,2.5rem)]">
          <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
            I&rsquo;ve worked with
          </p>
          <ul className="mt-4 space-y-2">
            {profile.workedWith.map((name) => (
              <li key={name} className="text-stone-900">
                {name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
