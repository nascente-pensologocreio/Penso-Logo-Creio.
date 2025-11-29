// src/utils/getAllPosts.js
// Lista todos os conteúdos: home, tags e Bíblia
// Versão universal — motor PLC v5 LTS

import { parseFrontmatter, markdownToHtml } from "./markdownProcessor.js";

// GLOB REAL (sem alias @content)
const globTodos = import.meta.glob(
  "../content/**/*.md",
  { eager: true, query: "?raw", import: "default" }
);

export function getAllPosts() {
  const todos = [];

  for (const [path, raw] of Object.entries(globTodos)) {
    const { data, content } = parseFrontmatter(raw);

    todos.push({
      ...data,
      content,
      html: markdownToHtml(content),
      path,
      filename: path.split("/").pop(),
    });
  }

  return todos;
}
