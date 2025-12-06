// src/utils/loadSinglePost.js
// Carregador oficial dos posts da HOME (via .md)
// Versão universal — motor v5 LTS

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

// GLOB REAL da home
const globHome = import.meta.glob(
  "../content/home/*.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  }
);

// Loader oficial para /artigo/:slug
export async function loadSinglePost(slug) {
  try {
    const encontrados = [];

    for (const [path, raw] of Object.entries(globHome)) {
      const { data, content } = parseFrontmatter(raw);

      if (data.slug) encontrados.push(data.slug);

      if (data.slug === slug) {
        return {
          ...data,
          content,
          fullContent: markdownToHtml(content),
          path,
        };
      }
    }

    console.warn("Slug não encontrado:", slug, "— Slugs existentes:", encontrados);
    return null;

  } catch (err) {
    console.error("❌ ERRO em loadSinglePost():", err);
    return null;
  }
}
