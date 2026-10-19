// Draws curly apostrophes inside words (don't, Let's). The copy in
// src/content stays verbatim from the client's page; this only changes how it
// is set. Anything that is not a plain string is returned untouched.
export const typeset = (text) =>
  typeof text === "string" ? text.replace(/(\w)'(\w)/g, "$1’$2") : text;
