// src/components/TemasLoader.jsx
// Loader determinístico para Temas da Vida
// Compatível com Vite 5 (sem gray-matter e sem alias inválidos)

/* ----------------------------------------------------
   GLOBS — Caminhos reais (NÃO usar alias @content)
---------------------------------------------------- */
const globDevocionais = import.meta.glob(
  "../content/tags/*/devocional.md",
  { eager: true, query: "?raw", import: "default" }
);

const globOracoes = import.meta.glob(
  "../content/tags/*/oracao.md",
  { eager: true, query: "?raw", import: "default" }
);

/* ----------------------------------------------------
   Parser manual de FrontMatter (limpo e sólido)
---------------------------------------------------- */
function parseFrontMatter(raw) {
  if (typeof raw !== "string") return { data: {}, content: "" };

  const txt = raw.trimStart();
  if (!txt.startsWith("---")) return { data: {}, content: raw };

  const end = txt.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };

  const fmBlock = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trimStart();

  const data = {};

  fmBlock.split("\n").forEach((line) => {
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
   Função principal — retorna devocional + oração
---------------------------------------------------- */
export default function TemasLoader(tag) {
  let devocional = null;
  let oracao = null;

  /* ---- DEVOÇÃO ---- */
  for (const [path, raw] of Object.entries(globDevocionais)) {
    if (path.includes(`/${tag}/`)) {
      const { data, content } = parseFrontMatter(raw);
      devocional = { ...data, content };
    }
  }

  /* ---- ORAÇÃO ---- */
  for (const [path, raw] of Object.entries(globOracoes)) {
    if (path.includes(`/${tag}/`)) {
      const { data, content } = parseFrontMatter(raw);
      oracao = { ...data, content };
    }
  }

  return { devocional, oracao };
}
