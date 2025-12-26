// src/data/temasDaVidaMap.js
// Mapa estático de Temas da Vida → lista de posts
// Ajuste aqui manualmente conforme for criando conteúdos.

export const TEMAS_DA_VIDA_MAP = {
  medo: [
    {
      tipo: "devocional",
      livro: "romanos",
      capitulo: 1,
      slug: "cristo-e-a-cana-quebrada-devocional",
      titulo: "A Luz que Nunca se Apaga",
    },
    {
      tipo: "devocional",
      livro: "romanos",
      capitulo: 2,
      slug: "o-espelho-que-nao-mente-devocional",
      titulo: "O Espelho que Não Mente",
    },
    {
      tipo: "oracao",
      livro: "romanos",
      capitulo: 1,
      slug: "cristo-e-a-cana-quebrada-oracao",
      titulo: "Oração em Tempos de Medo",
    },
  ],
  // outras tags (ansiedade, esperança, etc.) podem ser adicionadas depois
};

export function getTemasPorTag(tag) {
  if (!tag) return { devocional: [], oracao: [] };

  const lista = TEMAS_DA_VIDA_MAP[tag] || [];

  const devocional = lista.filter((p) => p.tipo === "devocional");
  const oracao = lista.filter((p) => p.tipo === "oracao");

  return { devocional, oracao };
}
