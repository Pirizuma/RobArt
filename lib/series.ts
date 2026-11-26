// Bodies of work that several projects belong to. Wording drawn from
// Robert's own exhibition material (the 2007 DVAA blurb and floor plan).

export type Series = {
  name: string;
  /** Plain-English gloss of the name, if it isn't English. */
  meaning?: string;
  text: string;
};

export const series: Record<string, Series> = {
  "laudatur-temporis-acti": {
    name: "Laudatur Temporis Acti",
    meaning: "Let’s thank the action of time",
    text: "A series of kinetic sculptures in which Robert transforms an iconic symbol of Australian culture, the deck chair, through its encounter with the sea. Each piece blends the many and varied attributes of the sea into the design of the deck chair, and parts of the works are in constant, cyclical mechanical motion, driven by transformers and motors. The deck chair reflects his interpretation of Darwin’s “laid back” lifestyle, while Charles Darwin’s theory of the evolution of species by natural selection is depicted throughout the series.",
  },
};
