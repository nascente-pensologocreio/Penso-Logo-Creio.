/**
 * PLC Front-Matter Schema — v5.0 LTS (FINAL)
 * Núcleo universal para TUDO que o PLC produz:
 * - Home
 * - Bíblia (todos os livros/capítulos)
 * - Temas da Vida
 * - Devocionais
 * - Oração
 * - Estudos Temáticos
 * - Terminologias Chaves
 * - Temas Controversos
 * - Pregação Técnico-Homilética
 * - Biblioteca (Firestore)
 */

export const frontmatterSchema = {
  // IDENTIDADE UNIVERSAL
  slug: "",           // obrigatório — id único
  tipo: "",           // devocional, oracao, estudo, pregacao, terminologia, controverso

  // DADOS EDITORIAIS
  titulo: "",
  subtitulo: "",
  autor: "Capelão Nascente",
  data: "",           // YYYY-MM-DD
  readTime: "",       // ex: "4 min"

  // MÍDIA
  imageUrl: "",       // hero da postagem

  // BÍBLIA (somente quando origem="biblia")
  origem: "",         // home | biblia | tags | firebase
  livro: "",          // gênesis, êxodo...
  capitulo: "",       // 1, 2, 3...

  // TEMAS DA VIDA
  tema_principal: "",
  tags: [],           // array real (in Firestore será array mesmo)

  // CAMPOS OPCIONAIS ÚTEIS
  referencia: "",     // versículo-chave, se houver
};
