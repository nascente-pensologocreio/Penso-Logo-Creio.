// src/utils/getTodasOracoes.js
// Carrega todas as orações em /src/content/tags/*/oracao.md

/* ----------------------------------------------------
   GLOB REAL (sem alias @content e sem ?raw na string)
---------------------------------------------------- */
const globOracoes = import.meta.glob(
  "../content/tags/*/oracao.md",
  { eager: true, query: "?raw", import: "default" }
);

/* ----------------------------------------------------
   Parser front-matter seguro e consistente
---------------------------------------------------- */
function parseFrontMatter(raw) {
  if (!raw || typeof raw !== "string") return { data: {}, content: "" };

  const txt = raw.trimStart();
  if (!txt.startsWith("---")) return { data: {}, content: raw };

  const end = txt.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };

  const fm = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trimStart();

  const data = {};

  fm.split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();

    // remove aspas externas se houver
    val = val.replace(/^"(.*)"$/, "$1");

    data[key] = val;
  });

  return { data, content: body };
}

/* ----------------------------------------------------
   Retorna TODAS as orações de /tags
---------------------------------------------------- */
export function getTodasOracoes() {
  const oracoes = [];

  for (const [path, raw] of Object.entries(globOracoes)) {
    const { data, content } = parseFrontMatter(raw);

    // Exemplo: ".../tags/esperanca/oracao.md" → "esperanca"
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
