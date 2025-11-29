// scripts/preencherFrontMatterBiblia.mjs
// GERADOR UNIVERSAL DE FRONT-MATTER — PLC v5 (LTS)
// Atualiza TODOS os .md em src/content/biblia/** de forma padronizada e segura.

import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const BIBLIA_DIR = path.join(ROOT, "src", "content", "biblia");

// ======================================================
// HELPERS — Inferência de tipo e slug
// ======================================================

function inferirTipo(filename) {
  const n = filename.toLowerCase();

  if (n.includes("devoc")) return "devocional";
  if (n.includes("estudo")) return "estudo-tematico";
  if (n.includes("expo") || n.includes("homil")) return "exposicao-homiletica";
  if (n.includes("mensagem")) return "mensagem-pastoral";
  if (n.includes("oracao") || n.includes("oração")) return "oracao";
  if (n.includes("controvers")) return "temas-controversos";
  if (n.includes("terminolog")) return "terminologias";

  return "generico";
}

function gerarSlug(livro, capitulo, tipo) {
  return `${livro}-${capitulo}-${tipo}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

// ======================================================
// FRONT-MATTER PARSE
// ======================================================

function parseFrontMatter(raw) {
  if (!raw.startsWith("---")) {
    return { data: {}, body: raw };
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, body: raw };
  }

  const headerRaw = raw.slice(3, end).trim();
  const body = raw.slice(end + 4); // preserva conteúdo original

  const data = {};

  headerRaw.split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;

    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();

    // Arrays: [a, b, c]
    if (val.startsWith("[") && val.endsWith("]")) {
      const conteudo = val.slice(1, -1).trim();
      data[key] = conteudo ? conteudo.split(",").map((v) => v.trim()) : [];
      return;
    }

    // Aspas externas
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    data[key] = val;
  });

  return { data, body };
}

// ======================================================
// FRONT-MATTER SERIALIZER — Ordem Oficial PLC v5
// ======================================================

function serializeFrontMatter(data, body) {
  const ordem = [
    "slug",
    "titulo",
    "tipo",
    "origem",
    "livro",
    "capitulo",
    "data",
    "autor",
    "readTime",
    "imageUrl",
    "tema_principal",
    "tags",
  ];

  const linhas = [];

  ordem.forEach((key) => {
    if (data[key] === undefined) return;

    const val = data[key];

    if (Array.isArray(val)) {
      linhas.push(`${key}: [${val.join(", ")}]`);
    } else {
      linhas.push(`${key}: "${String(val).replace(/"/g, '\\"')}"`);
    }
  });

  // chaves extras
  Object.keys(data)
    .filter((k) => !ordem.includes(k))
    .forEach((key) => {
      const v = data[key];
      if (Array.isArray(v)) {
        linhas.push(`${key}: [${v.join(", ")}]`);
      } else {
        linhas.push(`${key}: "${String(v).replace(/"/g, '\\"')}"`);
      }
    });

  return `---\n${linhas.join("\n")}\n---\n\n${body.trimStart()}\n`;
}

// ======================================================
// PROCESSAMENTO DE CADA ARQUIVO
// ======================================================

async function processFile(filePath) {
  const raw = await fs.readFile(filePath, "utf8");

  const { data: fmOrig, body } = parseFrontMatter(raw);

  const rel = path.relative(BIBLIA_DIR, filePath);
  const parts = rel.split(path.sep); // [livro, capitulo, arquivo.md]
  const livro = parts[0];
  const capitulo = parts[1];
  const filename = parts[2];

  const tipoInferido = inferirTipo(filename);

  const hoje = new Date().toISOString().slice(0, 10);

  // Aplicar schema unificado PLC v5
  const fm = {
    ...fmOrig,

    // campos absolutos e obrigatórios
    origem: "biblia",
    livro: fmOrig.livro || livro,
    capitulo: fmOrig.capitulo || capitulo,
    tipo: fmOrig.tipo || tipoInferido,
    slug: fmOrig.slug || gerarSlug(livro, capitulo, tipoInferido),

    // campos padrão
    titulo: fmOrig.titulo || "",
    autor: fmOrig.autor || "Capelão Nascente",
    data: fmOrig.data || hoje,
    readTime: fmOrig.readTime || "7 min de leitura",
    imageUrl: fmOrig.imageUrl || "",
    tema_principal: fmOrig.tema_principal || "",
    tags: Array.isArray(fmOrig.tags) ? fmOrig.tags : [],
  };

  const novo = serializeFrontMatter(fm, body);

  await fs.writeFile(filePath, novo, "utf8");
  console.log("✔ Atualizado:", rel);
}

// ======================================================
// WALK RECURSIVO
// ======================================================

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });

  for (const entry of entries) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await walk(full);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      await processFile(full);
    }
  }
}

// ======================================================
// MAIN
// ======================================================

console.log("▶ Iniciando atualização PLC Front-Matter v5 — Bíblia");
await walk(BIBLIA_DIR);
console.log("🏁 Concluído.");
