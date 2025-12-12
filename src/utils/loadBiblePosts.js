// src/utils/loadBiblePosts.js
// Carrega todas as facetas bíblicas (por capítulo) na ordem canônica do Menu Bar PLC – V5
// Otimizado: glob LAZY, carregando só o livro/capítulo necessários.

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";
import livrosSBB from "../data/livrosSBB.js";

const cache = new Map();

/* ---------------------------------------------------------
   GLOB — LAZY: importa os .md como string somente quando chamado
--------------------------------------------------------- */
const globBiblia = import.meta.glob("/src/content/biblia/**/*.md", {
  query: "?raw", import: "default",
});

/* ---------------------------------------------------------
   MAPEAMENTO DE IDs (livrosSBB) PARA NOMES DE PASTA
--------------------------------------------------------- */
const ID_PARA_PASTA = livrosSBB.reduce((acc, livro) => {
  acc[livro.id] = livro.nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
  return acc;
}, {});

/* ---------------------------------------------------------
   ORDEM CANÔNICA — exatamente conforme o MENU BAR
--------------------------------------------------------- */
export const ORDEM_FACETAS = [
  // HOMILIA
  "pregacao-tecnica",
  "mensagem-pastoral",

  // ESTUDOS
  "estudo-tematico",
  "terminologias-chave",
  "temas-controversos",

  // DEVOCIONAL DIÁRIA
  "devocional",

  // ORAÇÃO
  "oracao",
];

/* ---------------------------------------------------------
   Função Principal
   loadBiblePosts(livro, capitulo) → retorna TODAS as facetas daquele capítulo
   já ordenadas conforme o MENU BAR
--------------------------------------------------------- */
export async function loadBiblePosts(livro, capitulo) {
  const cacheKey = `${livro}-${capitulo}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  let livroNormalizado = String(livro).toLowerCase().trim();

  if (ID_PARA_PASTA[livroNormalizado]) {
    livroNormalizado = ID_PARA_PASTA[livroNormalizado];
  }

  const capituloStr = String(capitulo).padStart(2, "0");

  const resultados = [];

  const entradas = Object.entries(globBiblia).filter(([path]) => {
    return (
      path.includes(`/${livroNormalizado}/`) &&
      path.includes(`/${capituloStr}/`)
    );
  });

  // carrega apenas os arquivos que batem com livro/capítulo pedidos
  for (const [path, loader] of entradas) {
    const raw = await loader();
    const { data, content } = parseFrontmatter(raw);

    const filename = path.split("/").pop().replace(".md", "");

    let tipoBruto = (data.tipo || filename).toLowerCase().trim();

    if (tipoBruto.includes("mensagem") || tipoBruto.includes("pastoral")) {
      tipoBruto = "mensagem-pastoral";
    } else if (
      tipoBruto.includes("exposicao") ||
      tipoBruto.includes("exposição") ||
      tipoBruto.includes("homiletica") ||
      tipoBruto.includes("homilética") ||
      tipoBruto.includes("pregacao") ||
      tipoBruto.includes("pregação")
    ) {
      tipoBruto = "pregacao-tecnica";
    } else if (tipoBruto.includes("estudo")) {
      tipoBruto = "estudo-tematico";
    } else if (
      tipoBruto.includes("terminologia") ||
      tipoBruto.includes("glossario") ||
      tipoBruto.includes("glossário")
    ) {
      tipoBruto = "terminologias-chave";
    } else if (
      tipoBruto.includes("controverso") ||
      tipoBruto.includes("controversas") ||
      tipoBruto.includes("temas-controversos")
    ) {
      tipoBruto = "temas-controversos";
    } else if (tipoBruto.includes("devoc")) {
      tipoBruto = "devocional";
    } else if (tipoBruto.includes("oracao") || tipoBruto.includes("oração")) {
      tipoBruto = "oracao";
    }

    const tipo = tipoBruto;
    if (import.meta.env.DEV && !ORDEM_FACETAS.includes(tipo)) {
      console.warn(`Tipo desconhecido "${tipo}" em ${path}`);
    }

    resultados.push({
      ...data,
      livro: livroNormalizado,
      capitulo: capituloStr,
      tipo,
      slug: data.slug || `${livroNormalizado}-${capituloStr}-${tipo}`,
      html: markdownToHtml(content),
      raw: content,
      path,
    });
  }

  resultados.sort((a, b) => {
    const ia = ORDEM_FACETAS.indexOf(a.tipo);
    const ib = ORDEM_FACETAS.indexOf(b.tipo);
    const sa = ia === -1 ? ORDEM_FACETAS.length : ia;
    const sb = ib === -1 ? ORDEM_FACETAS.length : ib;
    return sa - sb;
  });

  cache.set(cacheKey, resultados);
  return resultados;
}

/* ---------------------------------------------------------
   listChapters(livro) → retorna capítulos existentes
--------------------------------------------------------- */
export async function listChapters(livro) {
  let livroNormalizado = String(livro).toLowerCase().trim();

  if (ID_PARA_PASTA[livroNormalizado]) {
    livroNormalizado = ID_PARA_PASTA[livroNormalizado];
  }

  const capitulos = new Set();

  for (const path of Object.keys(globBiblia)) {
    if (path.includes(`/${livroNormalizado}/`)) {
      const partes = path.split("/");
      const cap = partes[partes.length - 2];
      capitulos.add(cap);
    }
  }

  return Array.from(capitulos).sort();
}

/* ---------------------------------------------------------
   listBooks() → lista todos os livros existentes
--------------------------------------------------------- */
export async function listBooks() {
  const livros = new Set();

  for (const path of Object.keys(globBiblia)) {
    const partes = path.split("/");
    const livro = partes[partes.length - 3];
    if (livro) livros.add(livro);
  }

  return Array.from(livros).sort();
}
