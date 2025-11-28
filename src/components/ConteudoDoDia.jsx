// src/components/ConteudoDoDia.jsx
import React, { useEffect, useState } from "react";

/* ---------------------------------------------
   Função determinística para index diário
--------------------------------------------- */
function seedDiaria(max) {
  const hoje = new Date();
  const chave = `${hoje.getFullYear()}-${hoje.getMonth()}-${hoje.getDate()}`;
  let hash = 0;

  for (let i = 0; i < chave.length; i++) {
    hash = (hash * 31 + chave.charCodeAt(i)) % 2147483647;
  }

  return hash % max;
}

/* ---------------------------------------------
   Parser de FrontMatter manual (SEM gray-matter)
--------------------------------------------- */
function parseFrontMatter(raw) {
  if (typeof raw !== "string") return { data: {}, content: "" };

  const txt = raw.trimStart();

  if (!txt.startsWith("---")) {
    return { data: {}, content: raw };
  }

  const end = txt.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };

  const fm = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).replace(/^\r?\n/, "");

  const data = {};

  fm.split("\n")
    .map((l) => l.trim())
    .filter((l) => l && !l.startsWith("#"))
    .forEach((line) => {
      const idx = line.indexOf(":");
      if (idx === -1) return;
      const key = line.slice(0, idx).trim();
      const val = line.slice(idx + 1).trim();
      if (key) data[key] = val;
    });

  return { data, content: body };
}

/* ---------------------------------------------
   GLOBS — Caminhos corretos para Vite
--------------------------------------------- */

const GLOB_ORACAO = import.meta.glob(
  "../content/biblia/**/oracao.md",
  { query: "?raw", import: "default" }
);

const GLOB_DEVOCIONAL = import.meta.glob(
  "../content/biblia/**/devocional-01.md",
  { query: "?raw", import: "default" }
);

const GLOB_ESTUDO_TEMATICO = import.meta.glob(
  "../content/biblia/**/estudo-tematico.md",
  { query: "?raw", import: "default" }
);

const GLOB_TERMINOLOGIAS = import.meta.glob(
  "../content/biblia/**/terminologias.md",
  { query: "?raw", import: "default" }
);

const GLOB_TEMAS_CONTROVERSOS = import.meta.glob(
  "../content/biblia/**/temas-controversos.md",
  { query: "?raw", import: "default" }
);

const GLOB_MENSAGEM_PASTORAL = import.meta.glob(
  "../content/biblia/**/mensagem-pastoral.md",
  { query: "?raw", import: "default" }
);

const GLOB_PREGACAO_TECNICA = import.meta.glob(
  "../content/biblia/**/exposicao-homiletica.md",
  { query: "?raw", import: "default" }
);

/* ---------------------------------------------
   MAPA → tipo → glob correspondente
--------------------------------------------- */
const MAPA_ARQUIVOS_POR_TIPO = {
  oracao: GLOB_ORACAO,
  devocional: GLOB_DEVOCIONAL,
  "estudo-tematico": GLOB_ESTUDO_TEMATICO,
  terminologias: GLOB_TERMINOLOGIAS,
  "temas-controversos": GLOB_TEMAS_CONTROVERSOS,
  "mensagem-pastoral": GLOB_MENSAGEM_PASTORAL,
  "pregacao-tecnica": GLOB_PREGACAO_TECNICA,
};

/* ---------------------------------------------
   COMPONENTE
--------------------------------------------- */
export default function ConteudoDoDia({ tipo, titulo }) {
  const [conteudo, setConteudo] = useState(null);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        setErro(null);

        const arquivos = MAPA_ARQUIVOS_POR_TIPO[tipo];
        const caminhos = arquivos ? Object.keys(arquivos) : [];

        console.log(
          `ConteudoDoDia → Tipo "${tipo}" → Encontrados:`,
          caminhos.length,
          caminhos
        );

        if (!arquivos || caminhos.length === 0) {
          setConteudo(null);
          return;
        }

        const index = seedDiaria(caminhos.length);
        const fn = arquivos[caminhos[index]];

        if (typeof fn !== "function") {
          setConteudo(null);
          return;
        }

        const bruto = await fn();
        if (!bruto || typeof bruto !== "string") {
          setConteudo(null);
          return;
        }

        const { data, content } = parseFrontMatter(bruto);

        setConteudo({
          data,
          content,
          caminho: caminhos[index],
        });
      } catch (err) {
        console.error(`Erro ao carregar "${tipo}":`, err);
        setErro(String(err));
        setConteudo(null);
      }
    }

    carregar();
  }, [tipo]);

  /* ---- ERRO ---- */
  if (erro) {
    return (
      <div className="text-center py-12 opacity-70 font-serif">
        <p className="text-xl text-red-400 mb-4 tracking-wide">Erro</p>
        <p className="text-lg text-[#e8e8e8] max-w-xl mx-auto leading-relaxed">
          {erro}
        </p>
      </div>
    );
  }

  /* ---- LOADING ---- */
  if (!conteudo) {
    return (
      <div className="text-center py-12 opacity-70 font-serif">
        <p className="text-lg tracking-wide">Carregando conteúdo…</p>
      </div>
    );
  }

  /* ---- FINAL ---- */
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-[#e8e8e8] font-serif leading-relaxed">
      <h2
        className="text-center text-3xl font-bold mb-8"
        style={{
          color: "#D4AF37",
          textShadow: "0 0 12px rgba(212,175,55,0.55)",
        }}
      >
        {conteudo.data?.titulo || titulo || "Título não definido"}
      </h2>

      <article className="leading-relaxed whitespace-pre-line">
        {conteudo.content || "(conteúdo vazio)"}
      </article>

      <p className="mt-10 text-center text-sm opacity-40 italic">
        Fonte: {conteudo.caminho}
      </p>
    </div>
  );
}
