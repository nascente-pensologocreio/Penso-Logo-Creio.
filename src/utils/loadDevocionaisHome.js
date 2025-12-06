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
  const tipoNormalizadoFiltro = tipo ? normalizarTipo(tipo) : null;
  const cacheKey = tipoNormalizadoFiltro ? `home-${tipoNormalizadoFiltro}` : "home-todos";

  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  // Captura os 3 arquivos principais da Home
  // e também conteúdos históricos em subpastas
  const globHome = import.meta.glob(
    [
      "/src/content/home/devocional.md",
      "/src/content/home/mensagem-pastoral.md",
      "/src/content/home/oracao.md",
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

    // Normaliza tipo (front-matter + nome do arquivo)
    const tipoBruto = (data.tipo || "").toString();
    let tipoNormalizado = normalizarTipo(tipoBruto);

    if (!tipoNormalizado) {
      const filename = (path.split("/").pop() || "").toLowerCase();
      const filenameNormalizado = removerAcentos(filename);

      if (filenameNormalizado.includes("devocional")) {
        tipoNormalizado = "devocional";
      } else if (
        filenameNormalizado.includes("mensagem") ||
        filenameNormalizado.includes("pastoral")
      ) {
        tipoNormalizado = "mensagem-pastoral";
      } else if (filenameNormalizado.includes("oracao")) {
        tipoNormalizado = "oracao";
      }
    }

    // filtro por tipo, se solicitado
    if (tipoNormalizadoFiltro && tipoNormalizado !== tipoNormalizadoFiltro) {
      continue;
    }

    const slug =
      data.slug ||
      filenameToSlug(path, tipoNormalizado || "devocional") ||
      `${Date.now()}-${Math.random().toString(36).slice(2)}`;

    const dataPublicacao = normalizarData(data.data);

    resultados.push({
      ...data,
      tipo: tipoNormalizado || data.tipo || "devocional",
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
    return removerAcentos(filename)
      .toLowerCase()
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

function removerAcentos(texto = "") {
  return texto
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function normalizarTipo(tipo = "") {
  let t = removerAcentos(tipo.toString().toLowerCase().trim());

  if (!t) return "";

  // Normalizações conhecidas
  if (t === "mensagem" || t === "mensagempastoral" || t === "pastoral") {
    return "mensagem-pastoral";
  }

  if (t === "oracao" || t === "oracaododia") {
    return "oracao";
  }

  if (t === "devocional" || t === "devocionaldiario") {
    return "devocional";
  }

  return t;
}
