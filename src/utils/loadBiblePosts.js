// src/utils/loadBiblePosts.js
// Carrega todas as facetas bíblicas (por capítulo) na ordem canônica do Menu Bar PLC – V5

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

/* ---------------------------------------------------------
   GLOB — captura TUDO que está em /src/content/biblia
--------------------------------------------------------- */
const globBiblia = import.meta.glob("/src/content/biblia/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

/* ---------------------------------------------------------
   MAPEAMENTO DE IDs (livrosSBB) PARA NOMES DE PASTA
   Necessário porque IndiceBiblico passa IDs como "rm", "1co", etc
   mas os diretórios usam nomes completos como "romanos", "1corintios"
--------------------------------------------------------- */
const ID_PARA_PASTA = {
  // Antigo Testamento
  gn: "genesis",
  ex: "exodo",
  lv: "levitico",
  nm: "numeros",
  dt: "deuteronomio",
  js: "josue",
  jz: "juizes",
  rt: "rute",
  "1sm": "1samuel",
  "2sm": "2samuel",
  "1rs": "1reis",
  "2rs": "2reis",
  "1cr": "1cronicas",
  "2cr": "2cronicas",
  ed: "esdras",
  ne: "neemias",
  et: "ester",
  job: "jo",
  sl: "salmos",
  pv: "proverbios",
  ec: "eclesiastes",
  ct: "cantares",
  is: "isaias",
  jr: "jeremias",
  lm: "lamentacoes",
  ez: "ezequiel",
  dn: "daniel",
  os: "oseias",
  jl: "joel",
  am: "amos",
  ob: "obadias",
  jn: "jonas",
  mq: "miqueias",
  na: "naum",
  hc: "habacuque",
  sf: "sofonias",
  ag: "ageu",
  zc: "zacarias",
  ml: "malaquias",

  // Novo Testamento
  mt: "mateus",
  mc: "marcos",
  lc: "lucas",
  jo: "joao",
  at: "atos",
  rm: "romanos",
  "1co": "1corintios",
  "2co": "2corintios",
  gl: "galatas",
  ef: "efesios",
  fp: "filipenses",
  cl: "colossenses",
  "1ts": "1tessalonicenses",
  "2ts": "2tessalonicenses",
  "1tm": "1timoteo",
  "2tm": "2timoteo",
  tt: "tito",
  fm: "filemom",
  hb: "hebreus",
  tg: "tiago",
  "1pd": "1pedro",
  "2pd": "2pedro",
  "1jo": "1joao",
  "2jo": "2joao",
  "3jo": "3joao",
  jd: "judas",
  ap: "apocalipse",
};

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
   loadBiblePosts(livro, capitulo)
   → retorna TODAS as facetas daquele capítulo
     já ordenadas conforme o MENU BAR
--------------------------------------------------------- */
export function loadBiblePosts(livro, capitulo) {
  let livroNormalizado = String(livro).toLowerCase().trim();

  // Se recebeu um ID (ex: "rm"), converte para nome da pasta (ex: "romanos")
  if (ID_PARA_PASTA[livroNormalizado]) {
    livroNormalizado = ID_PARA_PASTA[livroNormalizado];
  }

  const capituloStr = String(capitulo).padStart(2, "0");

  const resultados = [];

  for (const [path, raw] of Object.entries(globBiblia)) {
    // Ex: /src/content/biblia/romanos/03/devocional.md
    if (
      !path.includes(`/${livroNormalizado}/`) ||
      !path.includes(`/${capituloStr}/`)
    ) {
      continue;
    }

    const { data, content } = parseFrontmatter(raw);

    const filename = path.split("/").pop().replace(".md", "");

    // Tipo primário vindo do front-matter, com fallback para o nome do arquivo
    let tipoBruto = (data.tipo || filename).toLowerCase().trim();

    // Normalização forte dos tipos para bater com o MENU BAR / ConteudoDoDia
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

  /* ---------------------------------------------------------
     ORDENADOR — usa a ordem definitiva do MENU BAR
  --------------------------------------------------------- */
  resultados.sort((a, b) => {
    const ia = ORDEM_FACETAS.indexOf(a.tipo);
    const ib = ORDEM_FACETAS.indexOf(b.tipo);
    const sa = ia === -1 ? ORDEM_FACETAS.length : ia;
    const sb = ib === -1 ? ORDEM_FACETAS.length : ib;
    return sa - sb;
  });

  return resultados;
}

/* ---------------------------------------------------------
   Função Auxiliar
   listChapters(livro) → retorna capítulos existentes
--------------------------------------------------------- */
export function listChapters(livro) {
  let livroNormalizado = String(livro).toLowerCase().trim();

  // Se recebeu um ID (ex: "rm"), converte para nome da pasta (ex: "romanos")
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
