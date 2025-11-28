// src/utils/getTodasOracoes.js
// Carrega as 20 orações de /content/tags/*/oracao.md

const globOracoes = import.meta.glob(
  "@content/tags/*/oracao.md?raw",
  { eager: true }
);

// Parser front-matter seguro
function parseFrontMatter(raw) {
  if (!raw || typeof raw !== "string") return { data: {}, content: "" };

  const txt = raw.trimStart();
  if (!txt.startsWith("---")) return { data: {}, content: raw };

  const end = txt.indexOf("\n---", 3);
  const fm = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trim();

  const data = {};

  fm.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;
    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^"|"$/g, "");
    data[key] = val;
  });

  return { data, content: body };
}

export function getTodasOracoes() {
  const oracoes = [];

  for (const [path, raw] of Object.entries(globOracoes)) {
    const { data, content } = parseFrontMatter(raw);
    const tag = path.split("/").slice(-2)[0];

    oracoes.push({
      ...data,
      tag,
      content,
      path,
    });
  }

  return oracoes;
}
