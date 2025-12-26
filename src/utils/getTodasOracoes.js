// src/utils/getTodasOracoes.js
// Carrega todas as orações em /src/content/tags/*/oracao.md
// Versão universal — motor PLC v5 LTS

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

/* ----------------------------------------------------
   GLOB REAL (sem alias, sem remendos)
---------------------------------------------------- */
const globOracoes = import.meta.glob(
  "../content/tags/*/oracao.md",
  { eager: true, query: "?raw", import: "default" }
);

/* ----------------------------------------------------
   Retorna TODAS as orações do diretório /tags
---------------------------------------------------- */
export function getTodasOracoes() {
  const oracoes = [];

  for (const [path, raw] of Object.entries(globOracoes)) {
    const { data, content } = parseFrontmatter(raw);

    // exemplo: ".../tags/esperanca/oracao.md" → "esperanca"
    const tag = path.split("/").slice(-2)[0];

    oracoes.push({
      ...data,
      tag,
      content,
      html: markdownToHtml(content),
      path,
    });
  }

  return oracoes;
}
