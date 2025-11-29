// src/components/TemasLoader.jsx
// Loader determinístico para Temas da Vida
// Versão universal — motor PLC v5 LTS

import { parseFrontmatter, markdownToHtml } from "../utils/markdownProcessor.js";

/* ----------------------------------------------------
   GLOBS — Caminhos reais (sem alias)
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
   Função principal — retorna devocional + oração
---------------------------------------------------- */
export default function TemasLoader(tag) {
  let devocional = null;
  let oracao = null;

  /* ---- DEVOÇÃO ---- */
  for (const [path, raw] of Object.entries(globDevocionais)) {
    if (path.includes(`/${tag}/`)) {
      const { data, content } = parseFrontmatter(raw);
      devocional = {
        ...data,
        content,
        html: markdownToHtml(content),
        path,
      };
    }
  }

  /* ---- ORAÇÃO ---- */
  for (const [path, raw] of Object.entries(globOracoes)) {
    if (path.includes(`/${tag}/`)) {
      const { data, content } = parseFrontmatter(raw);
      oracao = {
        ...data,
        content,
        html: markdownToHtml(content),
        path,
      };
    }
  }

  return { devocional, oracao };
}
