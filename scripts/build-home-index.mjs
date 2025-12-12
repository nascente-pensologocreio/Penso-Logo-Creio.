#!/usr/bin/env node
/**
 * PensoLogoCreio - Home Index Generator
 * Gera índice JSON para posts da HOME
 * Reciclado da lógica do build-tag-index.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const HOME_DIR = path.join(__dirname, '../src/content/home');
const OUTPUT_FILE = path.join(__dirname, '../src/data/home-index.json');

// Parser de frontmatter (mesmo do build-tag-index.mjs)
function parseFrontmatter(raw) {
  if (!raw || typeof raw !== 'string') {
    return { data: {}, content: '' };
  }

  const txt = raw.trimStart();
  
  if (!txt.startsWith('---')) {
    return { data: {}, content: raw.trim() };
  }

  const end = txt.indexOf('\n---', 3);
  if (end === -1) {
    return { data: {}, content: raw.trim() };
  }

  const fmBlock = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trim();
  const data = {};

  fmBlock.split('\n').forEach((line) => {
    const idx = line.indexOf(':');
    if (idx === -1) return;

    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();

    if (val.startsWith('[') && val.endsWith(']')) {
      const inner = val.slice(1, -1).trim();
      if (!inner) {
        data[key] = [];
        return;
      }
      const items = inner.split(',').map((item) => {
        let v = item.trim();
        if ((v.startsWith('"') && v.endsWith('"')) || (v.startsWith("'") && v.endsWith("'"))) {
          v = v.slice(1, -1);
        }
        return v;
      });
      data[key] = items;
      return;
    }

    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  });

  return { data, content: body };
}

function indexHome(dir) {
  const homeIndex = {
    devocional: [],
    "mensagem-pastoral": [],
    oracao: []
  };
  
  let filesProcessed = 0;
  let filesIndexed = 0;

  function traverse(currentDir) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(currentDir, entry.name);

      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (entry.name.endsWith('.md')) {
        filesProcessed++;
        
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const { data } = parseFrontmatter(content);

          const slug = data.slug;
          const tipo = (data.tipo || "").toLowerCase();
          
          if (!slug) {
            console.warn(`⚠️  Arquivo sem slug: ${fullPath}`);
            continue;
          }

          if (!homeIndex[tipo]) {
            console.warn(`⚠️  Tipo desconhecido: ${tipo} (${fullPath})`);
            continue;
          }

          const relativePath = path.relative(HOME_DIR, fullPath).replace(/\\/g, '/');

          homeIndex[tipo].push({
            slug: slug,
            path: relativePath,
            data: data.data || null,
            tags: data.tags || []
          });

          filesIndexed++;
        } catch (error) {
          console.warn(`⚠️  Erro ao processar ${fullPath}: ${error.message}`);
        }
      }
    }
  }

  traverse(dir);
  return { homeIndex, filesProcessed, filesIndexed };
}

console.log('🏠 Indexando posts da HOME...\n');

if (!fs.existsSync(HOME_DIR)) {
  console.error(`❌ Diretório não encontrado: ${HOME_DIR}`);
  process.exit(1);
}

const { homeIndex, filesProcessed, filesIndexed } = indexHome(HOME_DIR);

for (const tipo of Object.keys(homeIndex)) {
  homeIndex[tipo].sort((a, b) => {
    const dateA = a.data ? new Date(a.data) : new Date(0);
    const dateB = b.data ? new Date(b.data) : new Date(0);
    return dateB - dateA;
  });
}

const dataDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

fs.writeFileSync(OUTPUT_FILE, JSON.stringify(homeIndex, null, 2), 'utf8');

console.log('✅ Indexação da HOME concluída!\n');
console.log(`📊 Estatísticas:`);
console.log(`   • Arquivos processados: ${filesProcessed}`);
console.log(`   • Arquivos indexados: ${filesIndexed}`);
console.log(`\n📁 Índice salvo em: ${OUTPUT_FILE}`);

console.log(`\n🔖 Preview por tipo:`);
for (const [tipo, items] of Object.entries(homeIndex)) {
  console.log(`   • ${tipo}: ${items.length} arquivo(s)`);
}
