// src/utils/parseFrontmatter.js

/**
 * Parser mínimo de front-matter no formato:
 *
 * ---
 * titulo: "Algum título"
 * slug: "meu-slug"
 * data: "2025-11-21"
 * ---
 * Conteúdo em markdown...
 */
export function parseFrontmatter(raw) {
  if (typeof raw !== "string") {
    return { data: {}, content: "" };
  }

  // front-matter precisa começar com ---
  if (!raw.startsWith("---")) {
    return { data: {}, content: raw.trim() };
  }

  // procura a segunda linha com ---
  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: raw.trim() };
  }

  const header = raw.slice(3, end).trim();      // entre os ---
  const body = raw.slice(end + 4).trim();       // depois da segunda linha ---

  const data = {};

  for (const line of header.split("\n")) {
    const idx = line.indexOf(":");
    if (idx === -1) continue;

    const key = line.slice(0, idx).trim();
    let value = line.slice(idx + 1).trim();

    // remove aspas simples ou duplas em volta do valor
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    data[key] = value;
  }

  return { data, content: body };
}
