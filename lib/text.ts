// Joins the last two words with a non-breaking space (\u00a0) so a paragraph
// never ends on a single stranded word (a "widow"), in every browser.
export function noWidow(text: string) {
  const i = text.lastIndexOf(" ");
  return i === -1 ? text : `${text.slice(0, i)}\u00a0${text.slice(i + 1)}`;
}
