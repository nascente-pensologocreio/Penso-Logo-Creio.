// src/utils/loadHomePosts.js
// Carrega os 3 posts oficiais da HOME a partir de /src/content/home/*.md

const globHome = import.meta.glob(
  "/src/content/home/*.md",
  {
    eager: true,
    query: "?raw",
    import: "default",
  }
);

// Parser simples de front-matter
function parseFrontMatter(raw) {
  if (!raw || typeof raw !== "string") {
    return { data: {}, content: "" };
  }

  const txt = raw.trim();
  if (!txt.startsWith("---")) {
    return { data: {}, content: raw };
  }

  const end = txt.indexOf("\n---", 3);
  if (end === -1) {
    return { data: {}, content: raw };
  }

  const fmBlock = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trim();

  const data = {};
  fmBlock.split("\n").forEach((line) => {
    const idx = line.indexOf(":");
    if (idx === -1) return;

    const key = line.slice(0, idx).trim();
    const val = line.slice(idx + 1).trim().replace(/^"|"$/g, "");

    data[key] = val;
  });

  return { data, content: body };
}

export async function getHomePosts() {
  try {
    const posts = Object.entries(globHome).map(([path, raw]) => {
      const { data, content } = parseFrontMatter(raw);

      const filename = path.split("/").pop().toLowerCase();

      const imagem = data.imageUrl || null;

      const tipo = data.tipo || filename.replace(".md", "");

      return {
        ...data,
        imagem,
        tipo,
        conteudo: content,
        filename,
      };
    });

    const ordemFixa = [
      "devocional.md",
      "mensagem-pastoral.md",
      "oracao.md",
    ];

    return posts.sort(
      (a, b) => ordemFixa.indexOf(a.filename) - ordemFixa.indexOf(b.filename)
    );

  } catch (err) {
    console.error("ERRO EM getHomePosts():", err);
    return [];
  }
}
