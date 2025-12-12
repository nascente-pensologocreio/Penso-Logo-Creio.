// src/utils/loadHomePosts.js
// Carrega e normaliza os 3 posts oficiais da HOME a partir de /src/content/home/*.md
// Mantém 100% o uso de front-matter como motor de metadados.

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

// GLOB da home, AGORA LAZY (sem eager)
const globHome = import.meta.glob("/src/content/home/*.md", {
  query: "?raw", import: "default",
});

/**
 * Carrega apenas os arquivos realmente existentes em /src/content/home,
 * preservando front-matter como fonte de:
 * - tipo
 * - slug
 * - imageUrl
 * - demais campos
 */
export async function getHomePosts() {
  try {
    const entries = Object.entries(globHome);

    // Carrega todos os .md da pasta home sob demanda (em paralelo)
    const posts = await Promise.all(
      entries.map(async ([path, loader]) => {
        const raw = await loader(); // string markdown
        const { data, content } = parseFrontmatter(raw);

        const filename = path.split("/").pop().toLowerCase();

        const tipo = (data.tipo ||
          filename.replace(".md", "").trim()
        ).toLowerCase();

        // CORREÇÃO: Remove /src/ do caminho da imagem
        const imagem = data.imageUrl 
          ? data.imageUrl.replace(/^\/src\/assets\//, '/assets/')
          : null;

        const html = markdownToHtml(content);

        return {
          ...data,
          tipo,
          imagem,
          imageUrl: imagem, // Garante que ambos os campos existam
          conteudo: content,
          conteudoHtml: html,
          filename,
        };
      })
    );

    // Ordem fixa da HOME (mantida)
    const ordemFixa = ["devocional.md", "mensagem-pastoral.md", "oracao.md"];

    return posts.sort(
      (a, b) => ordemFixa.indexOf(a.filename) - ordemFixa.indexOf(b.filename)
    );
  } catch (err) {
    console.error("ERRO EM getHomePosts():", err);
    return [];
  }
}