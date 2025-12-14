// scripts/build-oracoes-index.mjs
import fs from "fs";
import path from "path";

const BIBLIA_DIR = path.resolve("src/content/biblia");
const OUTPUT_FILE = path.resolve("src/data/oracoes-index.json");

console.log("\n🙏 Indexando orações da Bíblia...\n");

const oracoes = [];

function percorrerDiretorio(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });

  for (const item of items) {
    const fullPath = path.join(dir, item.name);

    if (item.isDirectory()) {
      percorrerDiretorio(fullPath);
    } else if (item.name === "oracao.md") {
      // Extrair livro e capítulo do path
      // Ex: src/content/biblia/romanos/01/oracao.md
      const parts = fullPath.split(path.sep);
      const livro = parts[parts.length - 3];
      const capitulo = parts[parts.length - 2];
      const slug = `${livro}-${capitulo}-oracao`;

      oracoes.push({
        livro,
        capitulo,
        slug,
      });
    }
  }
}

percorrerDiretorio(BIBLIA_DIR);

// Ordenar alfabeticamente por livro e capítulo
oracoes.sort((a, b) => {
  if (a.livro !== b.livro) return a.livro.localeCompare(b.livro);
  return a.capitulo.localeCompare(b.capitulo);
});

// Salvar índice
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(oracoes, null, 2));

console.log("✅ Indexação concluída!\n");
console.log(`📊 Total de orações: ${oracoes.length}`);
console.log(`📁 Índice salvo em: ${OUTPUT_FILE}\n`);
