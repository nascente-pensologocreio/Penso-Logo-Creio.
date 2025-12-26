// src/utils/loadSinglePost.js
// Carregador otimizado com lookup 100% confiável via tag-index.json
// Versão v8 — Performance O(1) garantida

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";
import tagIndex from "@data/tag-index.json";

// GLOB da home (lazy)
const globHome = import.meta.glob("../content/home/*.md", {
  query: "?raw", 
  import: "default",
});

// GLOB da Bíblia (lazy)
const globBiblia = import.meta.glob("../content/biblia/**/*.md", {
  query: "?raw", 
  import: "default",
});

// Criar índice inverso: slug → path (uma única vez)
const slugToPath = {};
for (const [tag, items] of Object.entries(tagIndex)) {
  for (const item of items) {
    if (item.slug) {
      slugToPath[item.slug] = `../content/biblia/${item.path}`;
    }
  }
}

console.log("📚 Índice slug→path criado:", Object.keys(slugToPath).length, "slugs");

// Função auxiliar para resolver imagem
function resolverImagemParaPost(data) {
  if (data.imageUrl) {
    return data.imageUrl.replace(/^\/src\/assets\//, '/assets/');
  }
  
  if (data.imagem) {
    return data.imagem.replace(/^\/src\/assets\//, '/assets/');
  }

  const tipo = (data.tipo || "").toLowerCase();
  const slug = (data.slug || "").toLowerCase();

  if (tipo === "devocional" || slug.includes("devocional")) {
    return "/assets/devocional-home.webp";
  }

  if (tipo === "mensagem-pastoral" || tipo === "pregacao" || slug.includes("mensagem-pastoral")) {
    return "/assets/mensagem-pastoral-home.webp";
  }

  if (tipo === "oracao" || slug.includes("oracao")) {
    return "/assets/oracao-home.webp";
  }

  return null;
}

/**
 * Carrega post por slug com lookup direto 100% confiável
 */
export async function loadSinglePost(slug) {
  console.log("🔍 loadSinglePost chamado com slug:", slug);
  
  try {
    // 1️⃣ PROCURAR NA HOME (rápido, poucos arquivos)
    for (const [path, loader] of Object.entries(globHome)) {
      const raw = await loader();
      const { data, content } = parseFrontmatter(raw);

      if (data.slug === slug) {
        console.log("✅ Encontrado na HOME:", path);
        const imageUrl = resolverImagemParaPost(data);
        
        return {
          ...data,
          imagem: imageUrl,
          imageUrl,
          content,
          fullContent: markdownToHtml(content),
          path,
        };
      }
    }

    // 2️⃣ LOOKUP DIRETO 100% CONFIÁVEL (O(1) - instantâneo!)
    const pathDireto = slugToPath[slug];
    
    if (pathDireto) {
      console.log("🎯 Lookup direto bem-sucedido:", pathDireto);
      
      const loader = globBiblia[pathDireto];
      
      if (loader) {
        const raw = await loader();
        const { data, content } = parseFrontmatter(raw);
        
        const imageUrl = resolverImagemParaPost(data);
        
        return {
          ...data,
          imagem: imageUrl,
          imageUrl,
          content,
          fullContent: markdownToHtml(content),
          path: pathDireto,
        };
      } else {
        console.warn("⚠️ Path encontrado no índice mas loader não existe:", pathDireto);
      }
    }

    // 3️⃣ FALLBACK: Busca lenta (APENAS se não estiver no índice)
    console.warn("⚠️ Slug não encontrado no índice, tentando busca completa...");
    console.warn("⚠️ Isso indica que o arquivo não tem tags ou o índice está desatualizado!");
    
    for (const [path, loader] of Object.entries(globBiblia)) {
      const raw = await loader();
      const { data, content } = parseFrontmatter(raw);

      if (data.slug === slug) {
        console.log("✅ Encontrado via busca completa:", path);
        const imageUrl = resolverImagemParaPost(data);

        return {
          ...data,
          imagem: imageUrl,
          imageUrl,
          content,
          fullContent: markdownToHtml(content),
          path,
        };
      }
    }

    console.error("❌ Slug não encontrado:", slug);
    return null;
    
  } catch (err) {
    console.error("❌ ERRO em loadSinglePost():", err);
    return null;
  }
}