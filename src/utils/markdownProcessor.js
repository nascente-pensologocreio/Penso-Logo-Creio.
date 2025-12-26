// src/utils/markdownProcessor.js

/**
 * ================================================================
 *  PLC Markdown Processor — v5.2 (LTS, com cache em memória)
 * ================================================================
 * - Parsing universal de front-matter (com suporte a arrays simples)
 * - Conversão simplificada de markdown → HTML
 * - Cache leve em memória para markdownToHtml
 * ================================================================
 */

// ---------------------------------------------------------------
// PARSER UNIVERSAL DE FRONT-MATTER (com suporte a arrays)
// ---------------------------------------------------------------
export function parseFrontmatter(raw) {
  if (!raw || typeof raw !== "string") {
    return { data: {}, content: "" };
  }

  const txt = raw.trimStart();

  // Sem front-matter
  if (!txt.startsWith("---")) {
    return { data: {}, content: raw.trim() };
  }

  // Procura o fim do bloco front-matter
  const end = txt.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: raw.trim() };
  }

  const fmBlock = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trim();

  const data = {};

  fmBlock.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;

    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();

    // Suporte básico a arrays do tipo: tags: ["a", "b", "c"]
    if (val.startsWith("[") && val.endsWith("]")) {
      const inner = val.slice(1, -1).trim();
      if (!inner) {
        data[key] = [];
        return;
      }
      const items = inner.split(",").map((item) => {
        let v = item.trim();
        if (
          (v.startsWith('"') && v.endsWith('"')) ||
          (v.startsWith("'") && v.endsWith("'"))
        ) {
          v = v.slice(1, -1);
        }
        return v;
      });
      data[key] = items;
      return;
    }

    // Remove aspas simples ou duplas em valores escalares
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }

    data[key] = val;
  });

  return { data, content: body };
}

// ---------------------------------------------------------------
// CONVERSOR DE MARKDOWN → HTML (SIMPLIFICADO) + CACHE
// ---------------------------------------------------------------

// Cache simples em memória para conversões repetidas
const markdownCache = new Map();

export function markdownToHtml(md) {
  if (!md) return "";

  // Se já foi processado, devolve do cache
  const existing = markdownCache.get(md);
  if (existing) return existing;

  let html = md;

  // Headings
  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  // Negrito e itálico
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Parágrafos (duas quebras)
  html = html.replace(/(?:\r?\n){2,}/g, "</p><p>");
  html = "<p>" + html + "</p>";

  // Guarda no cache antes de retornar
  markdownCache.set(md, html);

  return html;
}
