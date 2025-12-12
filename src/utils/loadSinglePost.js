// src/utils/loadSinglePost.js
// Carregador otimizado com lookup direto por slug
// Versão v6 — Performance O(1)

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

// GLOB da home (lazy)
const globHome = import.meta.glob("../content/home/*.md", {
  query: "?raw", 
  import: "default",
});

// GLOB da Bíblia (lazy) - mantido para fallback
const globBiblia = import.meta.glob("../content/biblia/**/*.md", {
  query: "?raw", 
  import: "default",
});

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
 * Constrói path provável a partir do slug
 * Ex: "romanos-01-oracao" → "../content/biblia/romanos/01/oracao.md"
 */
function construirPathDeSlug(slug) {
  const partes = slug.split('-');
  
  if (partes.length < 3) {
    return null;
  }

  let livro = '';
  let capitulo = '';
  let tipo = '';
  
  // Procurar primeiro número (capítulo)
  let indiceCapitulo = -1;
  for (let i = 0; i < partes.length; i++) {
    if (/^\d+$/.test(partes[i])) {
      indiceCapitulo = i;
      break;
    }
  }
  
  if (indiceCapitulo === -1) {
    return null;
  }
  
  livro = partes.slice(0, indiceCapitulo).join('-');
  capitulo = partes[indiceCapitulo].padStart(2, '0');
  tipo = partes.slice(indiceCapitulo + 1).join('-');
  
  return `../content/biblia/${livro}/${capitulo}/${tipo}.md`;
}

/**
 * Carrega post por slug com lookup direto O(1)
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

    // 2️⃣ LOOKUP DIRETO NA BÍBLIA (O(1) - instantâneo!)
    const pathProvavel = construirPathDeSlug(slug);
    
    if (pathProvavel && globBiblia[pathProvavel]) {
      console.log("🎯 Lookup direto bem-sucedido:", pathProvavel);
      
      const loader = globBiblia[pathProvavel];
      const raw = await loader();
      const { data, content } = parseFrontmatter(raw);
      
      if (data.slug === slug) {
        const imageUrl = resolverImagemParaPost(data);
        
        return {
          ...data,
          imagem: imageUrl,
          imageUrl,
          content,
          fullContent: markdownToHtml(content),
          path: pathProvavel,
        };
      }
    }

    // 3️⃣ FALLBACK: Busca lenta (apenas se lookup direto falhou)
    console.warn("⚠️ Lookup direto falhou, tentando busca completa...");
    
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