// src/utils/loadSinglePost.js
// Carregador oficial dos posts da HOME (via .md)

const globHome = import.meta.glob(
  "../content/home/*.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  }
);

// Parser front-matter
function parseFrontMatter(raw) {
  if (!raw || typeof raw !== "string") return { data: {}, content: "" };

  const txt = raw.trimStart();
  if (!txt.startsWith("---")) return { data: {}, content: raw };

  const end = txt.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };

  const fm = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trim();

  const data = {};
  fm.split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;

    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();

    val = val.replace(/^"|"$/g, "");

    data[key] = val;
  });

  return { data, content: body };
}

// Conversor markdown → HTML
function markdownToHtml(md) {
  if (!md) return "";

  let html = md;

  html = html.replace(/^### (.*)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.*)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.*)$/gm, "<h1>$1</h1>");

  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  html = html.replace(/(?:\r?\n){2,}/g, "</p><p>");
  html = "<p>" + html + "</p>";

  return html;
}

// Loader oficial para /artigo/:slug
export async function loadSinglePost(slug) {
  try {
    const encontrados = [];

    for (const [path, raw] of Object.entries(globHome)) {
      const { data, content } = parseFrontMatter(raw);

      if (data.slug) encontrados.push(data.slug);

      if (data.slug === slug) {
        return {
          ...data,
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
