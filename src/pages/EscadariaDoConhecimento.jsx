// src/pages/EscadariaDoConhecimento.jsx
import React from "react";
import EditorialLayout from "../layouts/EditorialLayout.jsx";
import IndiceBiblico from "../components/IndiceBiblico.jsx";
import useCapituloSelecionado from "../hooks/useCapituloSelecionado.js";
import EditorialSwapTriple from "../components/editorial/EditorialSwapTriple.jsx";

import "../styles/editorial-grid.css";
import "../styles/indice-biblico.css";
import "../components/editorial/editorial-grid-triple.css";

export default function EscadariaDoConhecimento() {
  const {
    livro,
    capitulo,
    selecionarCapitulo,
    limparSelecao
  } = useCapituloSelecionado();

  return (
    <EditorialLayout
      titulo="Escadaria do Conhecimento"
      indice={<IndiceBiblico onSelecionarCapitulo={selecionarCapitulo} />}
    >

      {/* SEM CAPÍTULO SELECIONADO → CONTEÚDO DO DIA */}
      {!capitulo && (
        <EditorialSwapTriple
          principal={{
            tipo: "estudo-tematico",
            titulo: "Estudo Temático Geral"
          }}
          lateral1={{
            tipo: "terminologias",
            titulo: "Terminologias-Chave"
          }}
          lateral2={{
            tipo: "temas-controversos",
            titulo: "Temas Controversos"
          }}
        />
      )}

      {/* COM CAPÍTULO SELECIONADO → CONTEÚDO DO LIVRO */}
      {capitulo && (
        <>
          <EditorialSwapTriple
            principal={{
              tipo: "estudo-tematico",
              titulo: "Estudo Temático Geral"
            }}
            lateral1={{
              tipo: "terminologias",
              titulo: "Terminologias-Chave"
            }}
            lateral2={{
              tipo: "temas-controversos",
              titulo: "Temas Controversos"
            }}
            livro={livro}
            capitulo={capitulo}
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
