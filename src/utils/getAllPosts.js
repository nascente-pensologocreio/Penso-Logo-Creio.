// src/utils/getAllPosts.js
// Lista tudo: home, tags e Bíblia

const globTodos = import.meta.glob(
  "@content/**/*.md?raw",
  { eager: true }
);

function parseFrontMatter(raw) {
  if (!raw || typeof raw !== "string") return { data: {}, content: "" };

  const txt = raw.trim();
  if (!txt.startsWith("---")) return { data: {}, content: raw };

  const end = txt.indexOf("\n---", 3);
  const fm = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trim();

  const data = {};

  fm.split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;

    const key = line.slice(0, i).trim();
    const val = line.slice(i + 1).trim().replace(/^"|"$/g, "");
    data[key] = val;
  });

  return { data, content: body };
}

export function getAllPosts() {
  const todos = [];

  for (const [path, raw] of Object.entries(globTodos)) {
    const { data, content } = parseFrontMatter(raw);

    todos.push({
      ...data,
      content,
      path,
      filename: path.split("/").pop(),
    });
  }

  return todos;
}
