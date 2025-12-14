// src/utils/loadOracoes.js
export async function loadOracoes() {
  const oracoesModules = import.meta.glob('/src/content/biblia/*/*/oracao.md', {
    eager: false,
  });

  const oracoes = [];

  for (const path in oracoesModules) {
    try {
      const module = await oracoesModules[path]();
      const { frontmatter } = module;

      // Validação: só aceita se titulo está preenchido
      if (frontmatter?.titulo && frontmatter.titulo.trim() !== '') {
        // Extrair livro e capítulo do path
        // Ex: /src/content/biblia/romanos/01/oracao.md
        const parts = path.split('/');
        const livro = parts[parts.length - 3];
        const capitulo = parts[parts.length - 2];

        oracoes.push({
          titulo: frontmatter.titulo,
          slug: frontmatter.slug,
          tags: frontmatter.tags || [],
          livro: frontmatter.livro || livro,
          capitulo: frontmatter.capitulo || capitulo,
          caminho: `/biblia/${livro}/${livro}-${capitulo}-oracao`,
          conteudo: module.default || '',
        });
      }
    } catch (err) {
      console.warn(`Erro ao carregar ${path}:`, err);
    }
  }

  return oracoes;
}
