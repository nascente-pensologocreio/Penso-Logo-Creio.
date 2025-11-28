// scripts/preencherFrontMatterBiblia.mjs
// Atualiza automaticamente o front-matter de TODOS os .md em src/content/biblia

import { promises as fs } from "fs";
import path from "path";

const ROOT = process.cwd();
const BIBLIA_DIR = path.join(ROOT, "src", "content", "biblia");

// Percorre recursivamente a pasta da bíblia
async function walk(dir, out) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(full, out);
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      out.push(full);
    }
  }
}

// Processa um único arquivo .md
async function processFile(filePath) {
  const raw = await fs.readFile(filePath, "utf8");

  if (!raw.startsWith("---")) {
    console.warn("⚠️ Sem front-matter, pulando:", filePath);
    return;
  }

  const end = raw.indexOf("\n---", 3);
  if (end === -1) {
    console.warn("⚠️ Front-matter sem fechamento, pulando:", filePath);
    return;
  }

  const headerRaw = raw.slice(3, end).trim();
  const body = raw.slice(end + 4).replace(/^\s*\n/, "");

  // Parse bem simples "chave: valor"
  const data = {};
  headerRaw.split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;
    const key = line.slice(0, i).trim();
    let val = line.slice(i + 1).trim();
    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  });

  // Inferir livro, capítulo e tipo a partir do path
  const rel = path.relative(BIBLIA_DIR, filePath);
  const parts = rel.split(path.sep); // [livro, capitulo, arquivo.md]
  const livroDir = parts[0] || "";
  const capituloDir = parts[1] || "";
  const fileName = parts[2] || "";
  const baseName = fileName.replace(/\.md$/, ""); // devocional, oracao, etc.

  const livro = data.livro || livroDir;
  const capitulo = data.capitulo || capituloDir;
  const tipo = data.tipo || baseName;

  // Slug: se já existir e não for vazio, mantém; senão gera novo
  const slugAnterior = data.slug;
  const slug =
    slugAnterior && slugAnterior.trim()
      ? slugAnterior.trim()
      : `${livro}-${capitulo}-${tipo}`.toLowerCase();

  const autor =
    data.autor && data.autor.trim()
      ? data.autor.trim()
      : "Capelão Nascente";

  const titulo = data.titulo ?? "";
  const dataCampo = data.data ?? "";
  const temaPrincipal = data.tema_principal ?? "";

  // Se já havia algo em tags, preserva texto cru; senão, []
  const tags = data.tags !== undefined ? data.tags : "[]";

  const headerNovoLines = [
    `livro: "${livro}"`,
    `capitulo: "${capitulo}"`,
    `titulo: "${titulo}"`,
    `slug: "${slug}"`,
    `data: "${dataCampo}"`,
    `autor: "${autor}"`,
    `tipo: "${tipo}"`,
    `tema_principal: "${temaPrincipal}"`,
    `tags: ${tags}`,
  ];

  const novoConteudo =
    `---\n${headerNovoLines.join("\n")}\n---\n\n` + body.trimStart() + "\n";

  await fs.writeFile(filePath, novoConteudo, "utf8");
  console.log("✅ Atualizado:", rel);
}

// Main
async function main() {
  const files = [];
  await walk(BIBLIA_DIR, files);

  console.log("Encontrados", files.length, "arquivos .md em /biblia");
  for (const file of files) {
    await processFile(file);
  }
  console.log("✔️ Finalizado.");
}

main().catch((err) => {
  console.error("❌ Erro geral:", err);
  process.exit(1);
});
