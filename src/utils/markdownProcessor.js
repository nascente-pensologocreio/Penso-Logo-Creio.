/**
 * ================================================================
 *  PLC Markdown Processor — v5.0 (LTS)
 * ================================================================
 * Núcleo responsável por:
 * - Parsing universal de front-matter (todos os conteúdos)
 * - Conversão simplificada de markdown → HTML
 * - Padronização da leitura para loaders e templates
 *
 * Este módulo substitui:
 * - parseFrontmatter.js
 * - Parsers duplicados em HomeView
 * - Parsers internos de loaders
 * ================================================================
 */

// ---------------------------------------------------------------
// PARSER UNIVERSAL DE FRONT-MATTER
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

  // Quebra o bloco linha por linha
  fmBlock.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;

    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();

    // Remove aspas simples ou duplas
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
// CONVERSOR DE MARKDOWN → HTML (SIMPLIFICADO)
// ---------------------------------------------------------------
export function markdownToHtml(md) {
  if (!md) return "";

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

  return html;
}
