// src/components/TemasLoader.jsx
// Parser manual + alias corrigido para Vite (sem gray-matter)

const globDevocionais = import.meta.glob(
  "@content/tags/*/devocional.md?raw",
  { eager: true }
);

const globOracoes = import.meta.glob(
  "@content/tags/*/oracao.md?raw",
  { eager: true }
);

function parseFrontMatter(raw) {
  if (typeof raw !== "string") return { data: {}, content: "" };

  const txt = raw.trimStart();
  if (!txt.startsWith("---")) return { data: {}, content: raw };

  const end = txt.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };

  const fmBlock = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trim();

  const data = {};
  fmBlock.split("\n").forEach((line) => {
    line = line.trim();
    const i = line.indexOf(":");
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    val = val.replace(/^"|"$/g, "");
    data[key] = val;
  });

  return { data, content: body };
}

export default function TemasLoader(tag) {
  let devocional = null;
  let oracao = null;

  for (const [path, raw] of Object.entries(globDevocionais)) {
    if (path.includes(`/${tag}/`)) {
      const { data, content } = parseFrontMatter(raw);
      devocional = { ...data, content };
    }
  }

  for (const [path, raw] of Object.entries(globOracoes)) {
    if (path.includes(`/${tag}/`)) {
      const { data, content } = parseFrontMatter(raw);
      oracao = { ...data, content };
    }
  }

  return { devocional, oracao };
}
