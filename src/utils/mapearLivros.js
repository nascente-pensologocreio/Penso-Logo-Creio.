// src/utils/mapearLivros.js
import livrosSBB from "../data/livrosSBB.js";

// Criar mapa: "romanos" → { nome: "Romanos", testamento: "NT", ... }
const mapaLivros = {};
livrosSBB.forEach((livro) => {
  const id = livro.id.toLowerCase();
  mapaLivros[id] = livro;
  
  const nomeNormalizado = livro.nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
  
  mapaLivros[nomeNormalizado] = livro;
});

/**
 * Retorna informações de um livro bíblico
 * @param {string} livroSlug - Ex: "romanos", "genesis", "1corintios"
 * @returns {object|null} - Dados do livro ou null
 */
export function obterLivro(livroSlug) {
  if (!livroSlug) return null;
  const normalizado = livroSlug.toLowerCase();
  return mapaLivros[normalizado] || null;
}

/**
 * Extrai nome do livro do path
 * @param {string} path - Ex: "romanos/01/devocional-01.md"
 * @returns {string} - Ex: "romanos"
 */
export function extrairLivroDoPath(path) {
  if (!path) return "";
  const partes = path.split("/");
  return partes[0] || "";
}

/**
 * Retorna nome de exibição do livro
 * @param {string} livroSlug - Ex: "romanos"
 * @returns {string} - Ex: "Romanos"
 */
export function nomeExibicaoLivro(livroSlug) {
  const livro = obterLivro(livroSlug);
  return livro ? livro.nome : livroSlug.charAt(0).toUpperCase() + livroSlug.slice(1);
}

/**
 * Retorna testamento do livro (AT ou NT)
 * @param {string} livroSlug - Ex: "romanos"
 * @returns {string} - "AT" ou "NT"
 */
export function testamentoDoLivro(livroSlug) {
  const livro = obterLivro(livroSlug);
  return livro ? livro.testamento : "NT";
}