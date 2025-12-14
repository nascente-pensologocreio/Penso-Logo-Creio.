// scripts/build-oracao-index.mjs
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const BIBLIA_PATH = './src/content/biblia';
const OUTPUT_PATH = './src/data/oracao-index.json';

function buscarOracoes(dir) {
  const oracoes = [];
  
  function varrer(currentPath) {
    const items = fs.readdirSync(currentPath);
    
    for (const item of items) {
      const fullPath = path.join(currentPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        varrer(fullPath);
      } else if (item === 'oracao.md') {
        try {
          const conteudo = fs.readFileSync(fullPath, 'utf-8');
          const { data: frontmatter } = matter(conteudo);
          
          // Validação: só aceita se titulo preenchido
          if (frontmatter.titulo && frontmatter.titulo.trim() !== '') {
            // Extrair livro e capítulo do caminho
            const parts = fullPath.split(path.sep);
            const livro = parts[parts.length - 3];
            const capitulo = parts[parts.length - 2];
            
            oracoes.push({
              titulo: frontmatter.titulo,
              slug: frontmatter.slug,
              tags: frontmatter.tags || [],
              livro: frontmatter.livro || livro,
              capitulo: frontmatter.capitulo || capitulo,
              caminho: `/biblia/${livro}/${livro}-${capitulo}-oracao`
            });
          }
        } catch (err) {
          console.warn(`Erro ao processar ${fullPath}:`, err.message);
        }
      }
    }
  }
  
  varrer(dir);
  return oracoes;
}

console.log('📿 Indexando orações...\n');

const oracoes = buscarOracoes(BIBLIA_PATH);

fs.writeFileSync(OUTPUT_PATH, JSON.stringify(oracoes, null, 2));

console.log('✅ Indexação de orações concluída!');
console.log(`📊 Estatísticas:`);
console.log(`  • Orações válidas encontradas: ${oracoes.length}`);
console.log(`\n📖 Orações disponíveis:`);
oracoes.forEach(o => console.log(`  • ${o.livro} ${o.capitulo}: ${o.titulo}`));
