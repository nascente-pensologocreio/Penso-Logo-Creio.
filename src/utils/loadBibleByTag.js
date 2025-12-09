// src/utils/loadBibleByTag.js
import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

export async function loadBibleByTag(tag) {
  console.log("🔍 loadBibleByTag chamado com tag:", tag);

  if (!tag) {
    console.log("❌ Tag vazia");
    return { devocional: [], oracao: [] };
  }

  try {
    // IMPORTA ARQUIVOS .md COMO STRING RAW
    const modules = import.meta.glob("/src/content/biblia/**/*.md", {
      as: "raw",
    });

    console.log("📁 Arquivos encontrados:", Object.keys(modules).length);
    console.log("📂 Paths:", Object.keys(modules));

    const resultados = { devocional: [], oracao: [] };

    for (const path in modules) {
      try {
        const rawMd = await modules[path](); // string
        const { data, content } = parseFrontmatter(rawMd);

        console.log(`📄 Processando: ${path}`);
        console.log(`   - tipo: ${data?.tipo}`);
        console.log(`   - tags: ${JSON.stringify(data?.tags)}`);

        const tipo = (data?.tipo || "").toLowerCase();
        if (tipo !== "devocional" && tipo !== "oracao") {
          console.log(`   ⏭️ Pulado (tipo: ${tipo})`);
          continue;
        }

        const tags = Array.isArray(data?.tags) ? data.tags : [];
        const temTag = tags.some(
          (t) => String(t).toLowerCase() === String(tag).toLowerCase()
        );

        console.log(`   - tem tag "${tag}"? ${temTag}`);

        if (!temTag) continue;

        const html = markdownToHtml(content);

        const post = {
          slug: data.slug || path.split("/").pop().replace(".md", ""),
          titulo: data.titulo || "Sem título",
          tipo,
          origem: data.origem || "biblia",
          livro: data.livro || "",
          capitulo: data.capitulo || "",
          data: data.data ? new Date(data.data) : null,
          autor: data.autor || "",
          readTime: data.readTime || "",
          imageUrl: data.imageUrl || "",
          tema_principal: data.tema_principal || "",
          tags,
          html,
        };

        if (tipo === "devocional") {
          resultados.devocional.push(post);
          console.log("   ✅ Adicionado a devocional");
        } else {
          resultados.oracao.push(post);
          console.log("   ✅ Adicionado a oracao");
        }
      } catch (err) {
        console.warn(`⚠️ Erro ao processar ${path}:`, err);
      }
    }

    console.log("📊 Resultados finais:");
    console.log("   - Devocionais:", resultados.devocional.length);
    console.log("   - Orações:", resultados.oracao.length);

    const ordenar = (arr) =>
      arr.sort((a, b) => {
        if (a.livro !== b.livro) return a.livro.localeCompare(b.livro);
        return parseInt(a.capitulo || 0) - parseInt(b.capitulo || 0);
      });

    ordenar(resultados.devocional);
    ordenar(resultados.oracao);

    return resultados;
  } catch (err) {
    console.error("❌ Erro ao carregar posts bíblicos por tag:", err);
    return { devocional: [], oracao: [] };
  }
}
