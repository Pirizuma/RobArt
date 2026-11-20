import { profile } from "@/lib/profile";
import { siteDescription, siteName, siteUrl } from "@/lib/site";

/**
 * schema.org JSON-LD describing Robert (a Person) and his studio (a
 * ProfessionalService serving all of Australia). Search engines and AI
 * assistants read this to understand who he is, what he makes, where he
 * works and how to get in touch.
 */
export function StructuredData() {
  const address = {
    "@type": "PostalAddress",
    addressLocality: profile.location.city,
    addressRegion: profile.location.region,
    addressCountry: profile.location.country,
  };
  const contact = {
    ...(profile.email && { email: profile.email }),
    ...(profile.phone && { telephone: profile.phone }),
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${siteUrl}/#robert`,
        name: profile.name,
        jobTitle: profile.role,
        description: siteDescription,
        url: siteUrl,
        image: `${siteUrl}/images/site/portrait.jpg`,
        address,
        knowsAbout: profile.specialisms,
        worksFor: { "@id": `${siteUrl}/#studio` },
        ...contact,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#studio`,
        name: siteName,
        description: siteDescription,
        url: siteUrl,
        image: `${siteUrl}/opengraph-image.jpg`,
        founder: { "@id": `${siteUrl}/#robert` },
        address,
        // Australia first keeps the local signal; Worldwide shows he'll
        // take work further afield.
        areaServed: [
          { "@type": "Country", name: "Australia" },
          { "@type": "Place", name: "Worldwide" },
        ],
        knowsAbout: profile.specialisms,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: profile.services.map((name) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name },
          })),
        },
        ...contact,
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
