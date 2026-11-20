import type { Metadata } from "next";
import Image from "next/image";
import { ContactForm } from "@/components/ContactForm";
import { HeroMeshGradient } from "@/components/HeroMeshGradient";
import { exhibitionMode, openGraphBase } from "@/lib/site";
import { profile } from "@/lib/profile";
import { noWidow } from "@/lib/text";

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

function PhotoTile() {
  return (
    <div className="border border-stone-200 rounded-3xl p-[clamp(1.5rem,3vw,2rem)]">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-stone-100 shadow-sm">
        <Image
          src="/images/refractory-period/refractory-period-13.jpg"
          alt="Robert Mariotti with his sculpture Refractory Period"
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover"
        />
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
      "Robert is currently based in Darwin, Northern\u00a0Territory.\nTaking commissions across Australia and\u00a0overseas.",
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
            {profile.name}
          </h2>
          <p className="mt-1 text-sm text-stone-500">{profile.headline}</p>
          <div className="mt-4 space-y-3 text-stone-600 leading-relaxed text-sm sm:text-base">
            {profile.about.map((para) => (
              <p key={para.slice(0, 24)}>{noWidow(para)}</p>
            ))}
          </div>

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
        <PhotoTile />
        <div className="border border-stone-200 rounded-3xl p-[clamp(2rem,3.5vw,2.5rem)]">
          <p className="text-stone-600 leading-relaxed text-sm sm:text-base">
            Robert has worked with:
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
