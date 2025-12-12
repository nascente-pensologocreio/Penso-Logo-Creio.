// src/utils/loadSinglePost.js
// Carregador otimizado com lookup direto por slug
// Versão v7 — Performance O(1) com fallback para variações de nome

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
 * Constrói paths prováveis a partir do slug
 * Ex: "romanos-01-devocional" → ["../content/biblia/romanos/01/devocional.md", "../content/biblia/romanos/01/devocional-01.md"]
 */
function construirPathDeSlug(slug) {
  const partes = slug.split('-');
  
  if (partes.length < 3) {
    return null;
  }

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
  
  const livro = partes.slice(0, indiceCapitulo).join('-');
  const capitulo = partes[indiceCapitulo].padStart(2, '0');
  const tipo = partes.slice(indiceCapitulo + 1).join('-');
  
  const pathBase = `../content/biblia/${livro}/${capitulo}`;
  
  // Retornar array com as possibilidades
  return [
    `${pathBase}/${tipo}.md`,                          // Ex: devocional-01.md
    `${pathBase}/${tipo.replace(/-\d+$/, '')}.md`     // Ex: devocional.md (sem sufixo)
  ];
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
    const pathsPossiveis = construirPathDeSlug(slug);
    console.log("🔍 Paths construídos:", pathsPossiveis);

    let pathEncontrado = null;
    if (pathsPossiveis) {
      pathEncontrado = pathsPossiveis.find(p => globBiblia[p]);
      console.log("🔍 Path encontrado:", pathEncontrado || "nenhum");
    }

    if (pathEncontrado) {
      console.log("🎯 Lookup direto bem-sucedido:", pathEncontrado);
      
      const loader = globBiblia[pathEncontrado];
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
          path: pathEncontrado,
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