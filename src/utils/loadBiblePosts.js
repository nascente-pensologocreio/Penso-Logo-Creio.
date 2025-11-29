// src/utils/loadBiblePosts.js
// Carrega todas as facetas bíblicas (por capítulo) na ordem canônica do Menu Bar PLC – V5

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

/* ---------------------------------------------------------
   GLOB — captura TUDO que está em /src/content/biblia
--------------------------------------------------------- */
const globBiblia = import.meta.glob(
  "/src/content/biblia/**/*.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  }
);

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
  "oracao"
];

/* ---------------------------------------------------------
   Função Principal
   loadBiblePosts(livro, capitulo)
   → retorna TODAS as facetas daquele capítulo
     já ordenadas conforme o MENU BAR
--------------------------------------------------------- */
export function loadBiblePosts(livro, capitulo) {
  livro = String(livro).toLowerCase().trim();
  capitulo = String(capitulo).padStart(2, "0");

  const resultados = [];

  for (const [path, raw] of Object.entries(globBiblia)) {
    // Ex: /src/content/biblia/romanos/03/devocional.md
    if (!path.includes(`/${livro}/`) || !path.includes(`/${capitulo}/`)) {
      continue;
    }

    const { data, content } = parseFrontmatter(raw);

    const filename = path.split("/").pop().replace(".md", "");

    // Tipo primário vindo do front-matter, com fallback para o nome do arquivo
    const tipo = (data.tipo || filename).toLowerCase();

    resultados.push({
      ...data,
      livro,
      capitulo,
      tipo,
      slug: data.slug || `${livro}-${capitulo}-${tipo}`,
      html: markdownToHtml(content),
      raw: content,
      path
    });
  }

  /* ---------------------------------------------------------
     ORDENADOR — usa a ordem definitiva do MENU BAR
  --------------------------------------------------------- */
  resultados.sort((a, b) => {
    return ORDEM_FACETAS.indexOf(a.tipo) - ORDEM_FACETAS.indexOf(b.tipo);
  });

  return resultados;
}

/* ---------------------------------------------------------
   Função Auxiliar
   listChapters(livro) → retorna capítulos existentes
--------------------------------------------------------- */
export function listChapters(livro) {
  livro = String(livro).toLowerCase().trim();

  const capitulos = new Set();

  for (const path of Object.keys(globBiblia)) {
    if (path.includes(`/${livro}/`)) {
      const partes = path.split("/");
      const cap = partes[partes.length - 2];
      capitulos.add(cap);
    }
  }

  return Array.from(capitulos).sort();
}

/* ---------------------------------------------------------
   Função Auxiliar
   listBooks() → lista todos os livros existentes
--------------------------------------------------------- */
export function listBooks() {
  const livros = new Set();

  for (const path of Object.keys(globBiblia)) {
    const partes = path.split("/");
    const livro = partes[partes.length - 3];
    if (livro) livros.add(livro);
  }

  return Array.from(livros).sort();
}
