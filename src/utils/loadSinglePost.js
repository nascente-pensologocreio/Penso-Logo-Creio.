// src/utils/loadSinglePost.js
// Carregador oficial dos posts da HOME (via .md)
// Versão universal — motor v5 LTS

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

// GLOB REAL da home
const globHome = import.meta.glob("../content/home/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// função auxiliar para garantir imageUrl
function resolverImagemParaPost(data) {
  // se o próprio frontmatter já trouxe imageUrl ou imagem, usa
  if (data.imageUrl) return data.imageUrl;
  if (data.imagem) return data.imagem;

  // tenta inferir pelo tipo ou slug
  const tipo = (data.tipo || "").toLowerCase();
  const slug = (data.slug || "").toLowerCase();

  if (tipo === "devocional" || slug.includes("devocional")) {
    return "/Devocional-home.png";
  }

  if (
    tipo === "mensagem-pastoral" ||
    tipo === "pregacao" ||
    slug.includes("mensagem-pastoral")
  ) {
    return "/Mensagem-pastoral-home.png";
  }

  if (tipo === "oracao" || slug.includes("oracao")) {
    return "/Oracao-home.png";
  }

  // fallback: nenhuma imagem conhecida
  return null;
}

// Loader oficial para /artigo/:slug
export async function loadSinglePost(slug) {
  try {
    const encontrados = [];

    for (const [path, raw] of Object.entries(globHome)) {
      const { data, content } = parseFrontmatter(raw);

      if (data.slug) encontrados.push(data.slug);

      if (data.slug === slug) {
        const imageUrl = resolverImagemParaPost(data);

        return {
          ...data,
          imagem: imageUrl,          // compatível com Post.jsx e ArticleCard
          imageUrl,
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
