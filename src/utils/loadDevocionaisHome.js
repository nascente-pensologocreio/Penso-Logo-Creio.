// src/utils/loadDevocionaisHome.js
// Loader de histórico para devocionais/mensagens/orações da HOME

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

const cache = new Map();

/**
 * Carrega todos os conteúdos históricos da HOME
 * (devocionais, mensagens pastorais e orações).
 *
 * Opções futuras:
 * - filtrar por tipo
 * - limitar quantidade
 */
export async function loadDevocionaisHome(options = {}) {
  const { tipo = null } = options;
  const cacheKey = tipo ? `home-${tipo}` : "home-todos";

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  // Captura tudo em /src/content/home/devocionais-*.md
  // e também os arquivos antigos diretos, para compatibilidade.
  const globHome = import.meta.glob(
    [
      "/src/content/home/*.md",
      "/src/content/home/devocionais/*.md",
      "/src/content/home/mensagens/*.md",
      "/src/content/home/oracoes/*.md",
    ],
    {
      eager: true,
      query: "?raw",
      import: "default",
    }
  );

  const resultados = [];

  for (const [path, raw] of Object.entries(globHome)) {
    if (!raw) continue;

    const { data, content } = parseFrontmatter(raw);

    // Normalização leve de tipo
    let tipoBruto = (data.tipo || "").toLowerCase().trim();

    if (!tipoBruto) {
      // tenta inferir pelo nome do arquivo
      const filename = path.split("/").pop() || "";
      if (filename.includes("devocional")) {
        tipoBruto = "devocional";
      } else if (filename.includes("mensagem")) {
        tipoBruto = "mensagem-pastoral";
      } else if (filename.includes("oracao") || filename.includes("oração")) {
        tipoBruto = "oracao";
      }
    }

    // filtro por tipo, se solicitado
    if (tipo && tipoBruto !== tipo) continue;

    const slug =
      data.slug ||
      filenameToSlug(path, tipoBruto || "devocional") ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const dataPublicacao = normalizarData(data.data);

    resultados.push({
      ...data,
      tipo: tipoBruto || data.tipo || "devocional",
      origem: data.origem || "home",
      slug,
      path,
      data: dataPublicacao,
      dataOriginal: data.data || null,
      html: markdownToHtml(content),
      raw: content,
    });
  }

  // Ordena do mais recente para o mais antigo
  resultados.sort((a, b) => {
    const da = a.data?.getTime?.() || 0;
    const db = b.data?.getTime?.() || 0;
    return db - da;
  });

  cache.set(cacheKey, resultados);
  return resultados;
}

function filenameToSlug(path, fallbackTipo) {
  try {
    const filename = path.split("/").pop().replace(".md", "");
    if (!filename) return `${fallbackTipo}-${Date.now()}`;
    return filename
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");
  } catch {
    return `${fallbackTipo}-${Date.now()}`;
  }
}

function normalizarData(valor) {
  if (!valor) return null;
  if (valor instanceof Date) return valor;
  if (typeof valor === "number") return new Date(valor);
  if (typeof valor === "string") {
    const d = new Date(valor);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return null;
}
