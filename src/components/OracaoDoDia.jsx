// src/components/OracaoDoDia.jsx
import React, { useEffect, useState } from "react";

// Lê todos os arquivos oracao.md dentro de qualquer livro/capítulo
const oracoesGlob = import.meta.glob(
  "../content/biblia/**/oracao.md",
  { query: "?raw", import: "default" }
);

/**
 * Gera índice determinístico baseado na data (para mudar 1 vez por dia)
 */
function seedAleatoriaDoDia(max) {
  const hoje = new Date();
  const chave = `${hoje.getFullYear()}-${hoje.getMonth()}-${hoje.getDate()}`;
  let hash = 0;

  for (let i = 0; i < chave.length; i++) {
    hash = (hash * 31 + chave.charCodeAt(i)) % 2147483647;
  }

  return hash % max;
}

/**
 * Faz um parse mínimo do front-matter YAML:
 * - supõe blocos delimitados por ---
 * - extrai apenas `titulo: "..."` se existir
 * - devolve { data, content }
 */
function parseFrontMatterMinimo(texto) {
  if (!texto.startsWith("---")) {
    return {
      data: {},
      content: texto.trim(),
    };
  }

  // Divide pelo delimitador ---
  const partes = texto.split("---");

  // Exemplo típico:
  // ["", "\nfront-matter...\n", "\nconteúdo...\n"]
  if (partes.length < 3) {
    return {
      data: {},
      content: texto.trim(),
    };
  }

  const blocoYaml = partes[1] || "";
  const resto = partes.slice(2).join("---").trim();

  const data = {};

  // Extrai o campo titulo: "..."
  const matchTitulo = blocoYaml.match(/^\s*titulo:\s*"(.*?)"/m);
  if (matchTitulo) {
    data.titulo = matchTitulo[1];
  }

  // Poderíamos extrair mais campos no futuro, se necessário.

  return {
    data,
    content: resto,
  };
}

export default function OracaoDoDia() {
  const [conteudo, setConteudo] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const entradas = Object.entries(oracoesGlob);

        if (entradas.length === 0) {
          setErro("Nenhuma oração encontrada.");
          return;
        }

        // Índice determinístico
        const indice = seedAleatoriaDoDia(entradas.length);
        const [caminho, importFn] = entradas[indice];

        // Importa corretamente a string RAW do .md
        const texto = await importFn();

        const analisado = parseFrontMatterMinimo(texto);

        setConteudo({
          caminho,
          data: analisado.data,
          titulo: analisado.data.titulo || "Oração",
          corpo: analisado.content || "",
        });
      } catch (e) {
        console.error("Erro ao carregar oração:", e);
        setErro("Erro ao carregar oração.");
      }
    }

    carregar();
  }, []);

  // Estados possíveis
  if (erro) {
    return (
      <div className="text-center text-red-400 italic py-8 text-lg">
        {erro}
      </div>
    );
  }

  if (!conteudo) {
    return (
      <div className="text-center text-gray-400 py-8">
        Carregando oração do dia...
      </div>
    );
  }

  // Exibição final
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-[#e8e8e8] font-serif leading-relaxed">
      {/* TÍTULO */}
      <h2
        className="text-center text-3xl font-bold mb-8"
        style={{
          color: "#D4AF37",
          textShadow: "0 0 12px rgba(212,175,55,0.55)",
        }}
      >
        {conteudo.titulo}
      </h2>

      {/* CORPO */}
      <div
        className="whitespace-pre-line text-lg"
        style={{ textAlign: "justify", opacity: 0.92 }}
      >
        {conteudo.corpo}
      </div>

      {/* REFERÊNCIA DO ARQUIVO */}
      <p className="text-center text-sm italic mt-10 opacity-60">
        Fonte: {conteudo.caminho.replace("../content/", "")}
      </p>
    </div>
  );
}
