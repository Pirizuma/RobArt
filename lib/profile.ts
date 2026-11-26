// Facts about Robert and the studio — one source for the contact page,
// structured data (JSON-LD) and /llms.txt, so search engines and AI
// assistants all read the same, consistent description.
//
// Only put things here that are true and confirmed by Bob.

export const profile = {
  name: "Robert Mariotti",
  studio: "RobArt Studio",
  role: "Sculptor and model maker",
  headline: "Australian-Italian Sculptor & Artist",
  // Bio shown on the contact page and in /llms.txt (one string per paragraph).
  about: [
    "Robert Mariotti is an Australian-Italian contemporary sculptor and artist based in Darwin, Australia. With over 40 years of creative and technical experience, his practice spans sculpture, model making, dioramas and bespoke three-dimensional artworks.",
    "Working across fibreglass, timber, metal, recycled materials and found objects, Robert takes an experimental and material-led approach to creating sculptural works. He combines traditional craftsmanship with unconventional fabrication techniques, often transforming discarded, overlooked or repurposed materials into distinctive artworks.",
    "Robert undertakes independent projects and commissioned work, adapting his approach to the individual concept, scale, materials and requirements of each project. His versatility across materials and mediums allows him to work across a broad range of artistic, creative and practical applications.",
  ],
  // Structured data (schema.org Person).
  jobTitles: ["Sculptor", "Contemporary Artist", "Model Maker"],
  personDescription:
    "Australian-Italian contemporary sculptor and artist based in Darwin, Northern Territory, Australia, with over 40 years of experience in sculpture, model making, dioramas and fibreglass fabrication.",
  knowsAbout: [
    "Contemporary sculpture",
    "Kinetic sculpture",
    "Fibreglass sculpture",
    "Model making",
    "Diorama construction",
    "Wood sculpture",
    "Metal sculpture",
    "Recycled materials",
    "Found object art",
    "Sculptural fabrication",
  ],
  location: { city: "Darwin", region: "Northern Territory", country: "AU" },
  locationLabel: "Darwin, Northern Territory, Australia",
  serviceArea: "across Australia and overseas",
  experience: "over 40 years",
  specialisms: ["Model making", "Dioramas", "Fibreglass sculpture", "Sculpture"],
  services: [
    "Commissioned sculpture",
    "2D & 3D project design",
    "Polyurethane and fibreglass fabrication",
    "Model making",
    "Dioramas",
    "Scenography",
    "Mannequins",
    "Layouts",
    "Trompe-l’œil",
    "Mosaics",
    "Heraldic and architectural elements",
    "Bas-relief",
  ],
  workedWith: ["Nitmiluk Visitor Centre", "Darwin Italian Festival"],
  // Fill these in when confirmed — they're also published in the
  // structured data once set.
  email: "robartstudio@gmail.com",
  phone: "",
};
