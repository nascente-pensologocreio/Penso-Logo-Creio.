#!/usr/bin/env node
/**
 * PensoLogoCreio - Tag Index Generator v2
 * Gera índice JSON de tags → {path, slug} para lookup 100% confiável
 * Roda automaticamente em dev e build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BIBLIA_DIR = path.join(__dirname, '../src/content/biblia');
const OUTPUT_FILE = path.join(__dirname, '../src/data/tag-index.json');

// ============================================
// PARSER DE FRONT-MATTER (replicado de markdownProcessor.js)
// ============================================
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

    // Suporte a arrays: tags: ["a", "b", "c"]
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

    // Remove aspas simples/duplas de strings
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    data[key] = val;
  });

  return { data, content: body };
}

// ============================================
// INDEXADOR RECURSIVO (AGORA INCLUI SLUGS)
// ============================================
function indexTags(dir) {
  const tagIndex = {};
  let filesProcessed = 0;
  let filesWithTags = 0;
  let filesWithoutSlug = 0;

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

          if (data.tags && Array.isArray(data.tags) && data.tags.length > 0) {
            filesWithTags++;
            
            // Caminho relativo para uso no frontend
            const relativePath = path.relative(
              path.join(__dirname, '../src/content/biblia'),
              fullPath
            ).replace(/\\/g, '/');

            // Extrair slug do frontmatter
            const slug = data.slug || null;
            
            if (!slug) {
              filesWithoutSlug++;
              console.warn(`⚠️  Arquivo sem slug: ${relativePath}`);
            }

            for (const tag of data.tags) {
              const normalizedTag = tag.toLowerCase().trim();
              
              if (!tagIndex[normalizedTag]) {
                tagIndex[normalizedTag] = [];
              }
              
              // Armazenar objeto com path E slug
              tagIndex[normalizedTag].push({
                path: relativePath,
                slug: slug
              });
            }
          }
        } catch (error) {
          console.warn(`⚠️  Erro ao processar ${fullPath}: ${error.message}`);
        }
      }
    }
  }

  traverse(dir);
  return { tagIndex, filesProcessed, filesWithTags, filesWithoutSlug };
}

// ============================================
// OTIMIZADOR (remove duplicatas por slug, ordena)
// ============================================
function optimizeIndex(index) {
  const optimized = {};

  for (const [tag, items] of Object.entries(index)) {
    // Remover duplicatas baseando-se no slug
    const uniqueItems = [];
    const seenSlugs = new Set();
    
    for (const item of items) {
      if (item.slug && !seenSlugs.has(item.slug)) {
        seenSlugs.add(item.slug);
        uniqueItems.push(item);
      } else if (!item.slug) {
        // Manter itens sem slug (embora não sejam ideais)
        uniqueItems.push(item);
      }
    }
    
    // Ordenar por path
    optimized[tag] = uniqueItems.sort((a, b) => a.path.localeCompare(b.path));
  }

  return Object.keys(optimized)
    .sort()
    .reduce((acc, key) => {
      acc[key] = optimized[key];
      return acc;
    }, {});
}

// ============================================
// EXECUÇÃO PRINCIPAL
// ============================================
console.log('🔍 Indexando tags da Bíblia...\n');

if (!fs.existsSync(BIBLIA_DIR)) {
  console.error(`❌ Diretório não encontrado: ${BIBLIA_DIR}`);
  process.exit(1);
}

const { tagIndex, filesProcessed, filesWithTags, filesWithoutSlug } = indexTags(BIBLIA_DIR);
const optimizedIndex = optimizeIndex(tagIndex);

// Garantir que o diretório src/data existe
const dataDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

// Salvar JSON
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(optimizedIndex, null, 2), 'utf8');

console.log('✅ Indexação concluída!\n');
console.log(`📊 Estatísticas:`);
console.log(`   • Arquivos processados: ${filesProcessed}`);
console.log(`   • Arquivos com tags: ${filesWithTags}`);
console.log(`   • Arquivos sem slug: ${filesWithoutSlug}`);
console.log(`   • Tags únicas: ${Object.keys(optimizedIndex).length}`);
console.log(`\n📁 Índice salvo em: ${OUTPUT_FILE}`);

// Preview das primeiras 5 tags
if (Object.keys(optimizedIndex).length > 0) {
  console.log(`\n🔖 Preview (5 primeiras tags):`);
  Object.entries(optimizedIndex)
    .slice(0, 5)
    .forEach(([tag, items]) => {
      console.log(`   • ${tag}: ${items.length} arquivo(s)`);
    });
} else {
  console.log(`\n💡 Nenhuma tag encontrada ainda (arquivos estão vazios)`);
  console.log(`   O índice será populado automaticamente quando você adicionar tags.`);
}