// src/utils/loadHomePosts.js
// Carrega posts da HOME usando home-index.json para lookup O(1)
// Versão v2 - Otimizado com índice

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";
import homeIndex from "@data/home-index.json";

// GLOB da home (lazy)
const globHome = import.meta.glob("/src/content/home/**/*.md", {
  query: "?raw",
  import: "default",
});

// Criar índice inverso: slug → path (uma única vez)
const slugToPath = {};
for (const [tipo, items] of Object.entries(homeIndex)) {
  for (const item of items) {
    if (item.slug) {
      slugToPath[item.slug] = `/src/content/home/${item.path}`;
    }
  }
}

console.log("🏠 Índice slug→path HOME criado:", Object.keys(slugToPath).length, "slugs");

/**
 * Carrega os 3 posts ativos da HOME (raiz da pasta)
 * Ordem fixa: devocional, mensagem-pastoral, oracao
 */
export async function getHomePosts() {
  try {
    // Slugs dos 3 posts ativos (sempre na raiz)
    const activeSlugs = [
      "cristo-e-a-cana-quebrada-devocional",
      "cristo-e-a-cana-quebrada",
      "cristo-e-a-cana-quebrada-oracao"
    ];

    const posts = [];

    for (const slug of activeSlugs) {
      const path = slugToPath[slug];
      
      if (!path) {
        console.warn(`⚠️ Slug não encontrado no índice: ${slug}`);
        continue;
      }

      const loader = globHome[path];
      
      if (!loader) {
        console.warn(`⚠️ Loader não encontrado: ${path}`);
        continue;
      }

      const raw = await loader();
      const { data, content } = parseFrontmatter(raw);

      const tipo = (data.tipo || "").toLowerCase();

      // Corrigir caminho da imagem
      const imagem = data.imageUrl 
        ? data.imageUrl.replace(/^\/src\/assets\//, '/assets/')
        : null;

      const html = markdownToHtml(content);

      posts.push({
        ...data,
        tipo,
        imagem,
        imageUrl: imagem,
        conteudo: content,
        conteudoHtml: html,
        slug: data.slug
      });
    }

    // Manter ordem fixa: devocional, mensagem-pastoral, oracao
    const ordemFixa = ["devocional", "mensagem-pastoral", "oracao"];
    
    return posts.sort((a, b) => 
      ordemFixa.indexOf(a.tipo) - ordemFixa.indexOf(b.tipo)
    );

  } catch (err) {
    console.error("❌ ERRO em getHomePosts():", err);
    return [];
  }
}

/**
 * Carrega posts da HOME por tipo (para futuras expansões)
 * @param {string} tipo - "devocional", "mensagem-pastoral", "oracao"
 * @param {number} limit - Número máximo de posts (padrão: 10)
 */
export async function getHomePostsByType(tipo, limit = 10) {
  try {
    const normalizedTipo = tipo.toLowerCase();
    const items = homeIndex[normalizedTipo] || [];

    if (items.length === 0) {
      return [];
    }

    const posts = [];

    for (const item of items.slice(0, limit)) {
      const path = `/src/content/home/${item.path}`;
      const loader = globHome[path];
      
      if (!loader) {
        console.warn(`⚠️ Loader não encontrado: ${path}`);
        continue;
      }

      const raw = await loader();
      const { data, content } = parseFrontmatter(raw);

      const imagem = data.imageUrl 
        ? data.imageUrl.replace(/^\/src\/assets\//, '/assets/')
        : null;

      const html = markdownToHtml(content);

      posts.push({
        ...data,
        tipo: normalizedTipo,
        imagem,
        imageUrl: imagem,
        conteudo: content,
        conteudoHtml: html,
        slug: data.slug
      });
    }

    return posts;

  } catch (err) {
    console.error(`❌ ERRO em getHomePostsByType(${tipo}):`, err);
    return [];
  }
}