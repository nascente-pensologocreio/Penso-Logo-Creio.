// src/utils/loadHomePosts.js
// Carrega e normaliza os 3 posts oficiais da HOME a partir de /src/content/home/*.md

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

// GLOB REAL da home
const globHome = import.meta.glob("/src/content/home/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

export async function getHomePosts() {
  try {
    const posts = Object.entries(globHome).map(([path, raw]) => {
      // Usa o motor universal
      const { data, content } = parseFrontmatter(raw);

      const filename = path.split("/").pop().toLowerCase();

      const tipo =
        data.tipo ||
        filename.replace(".md", "").trim();

      const imagem = data.imageUrl || null;

      const html = markdownToHtml(content);

      return {
        ...data,
        tipo,
        imagem,
        conteudo: content,
        conteudoHtml: html,
        filename,
      };
    });

    // Ordem fixa da HOME
    const ordemFixa = [
      "devocional.md",
      "mensagem-pastoral.md",
      "oracao.md",
    ];

    return posts.sort(
      (a, b) => ordemFixa.indexOf(a.filename) - ordemFixa.indexOf(b.filename)
    );
  } catch (err) {
    console.error("ERRO EM getHomePosts():", err);
    return [];
  }
}
