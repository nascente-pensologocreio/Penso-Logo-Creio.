// src/pages/CaminhoDasEscrituras.jsx
import React from "react";
import ConteudoDoDia from "../components/ConteudoDoDia.jsx";
import EditorialLayout from "../layouts/EditorialLayout.jsx";
import IndiceBiblico from "../components/IndiceBiblico.jsx";
import useCapituloSelecionado from "../hooks/useCapituloSelecionado.js";

import EditorialSwap from "../components/editorial/EditorialSwap.jsx";

import "../styles/editorial-grid.css";
import "../styles/indice-biblico.css";

export default function CaminhoDasEscrituras() {
  const {
    livro,
    capitulo,
    selecionarCapitulo,
    limparSelecao
  } = useCapituloSelecionado();

  const mensagemPastoral = {
    titulo: "Mensagem Pastoral",
    resumo: "Uma reflexão pastoral profunda.",
    imagem: null,
    component: (
      <ConteudoDoDia
        tipo="mensagem-pastoral"
        titulo="Mensagem Pastoral"
        livro={livro}
        capitulo={capitulo}
      />
    ),
  };

  const pregacaoTecnica = {
    titulo: "Pregação Técnico-Homilética",
    resumo: "Exposição bíblica técnica e precisa.",
    imagem: null,
    component: (
      <ConteudoDoDia
        tipo="pregacao-tecnica"
        titulo="Pregação Técnico-Homilética"
        livro={livro}
        capitulo={capitulo}
      />
    ),
  };

  return (
    <EditorialLayout
      titulo="Caminho das Escrituras"
      indice={<IndiceBiblico onSelecionarCapitulo={selecionarCapitulo} />}
    >

      {/* SE NENHUM CAPÍTULO FOI SELECIONADO */}
      {!capitulo && (
        <EditorialSwap
          principal={mensagemPastoral}
          alternativo={pregacaoTecnica}
        />
      )}

      {/* SE CAPÍTULO FOI SELECIONADO */}
      {capitulo && (
        <>
          <EditorialSwap
            principal={mensagemPastoral}
            alternativo={pregacaoTecnica}
          />

          <button
            onClick={limparSelecao}
            className="mt-12 text-sm text-[#D4AF37] underline opacity-80 hover:opacity-100"
          >
            Voltar para o Conteúdo do Dia
          </button>
        </>
      )}

    </EditorialLayout>
  );
}
