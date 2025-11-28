// src/pages/TemasDaVida.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import CarrosselTags from "@components/CarrosselTags.jsx";
import EditorialSwap from "@components/editorial/EditorialSwap.jsx";
import TemplateLateral from "@components/editorial/TemplateLateral.jsx";
import TemasLoader from "@components/TemasLoader.jsx";

import "@components/editorial/editorial-swap.css";

// LISTA FIXA DE TAGS (20)
const TAGS = [
  "amor",
  "ansiedade",
  "batalha",
  "depressao",
  "desemprego",
  "dividas",
  "doenca-morte",
  "duvida",
  "esperanca",
  "frustracao",
  "futuro",
  "insonia",
  "luto",
  "medo",
  "mudanca",
  "perdao",
  "separacao",
  "solidao",
  "sonho",
  "vicio",
];

export default function TemasDaVida() {
  const { tag } = useParams();
  const navigate = useNavigate();

  const [conteudo, setConteudo] = useState({
    devocional: null,
    oracao: null,
  });

  useEffect(() => {
    if (!tag) return;
    const resultado = TemasLoader(tag);
    setConteudo(resultado);
    window.scrollTo(0, 0);
  }, [tag]);

  const handleSelectTag = (t) => {
    navigate(`/temas-da-vida/${t}`);
  };

  if (!tag) {
    return (
      <main
        style={{
          width: "100%",
          minHeight: "100vh",
          backgroundColor: "#010b0a",
          paddingBottom: "4rem",
        }}
      >
        <CarrosselTags tags={TAGS} onSelectTag={handleSelectTag} />

        <div
          style={{
            textAlign: "center",
            paddingTop: "4rem",
            color: "#D4AF37",
            fontSize: "1.2rem",
            fontFamily: "'Playfair Display', serif",
          }}
        >
          Selecione uma tag acima para começar
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#010b0a",
        paddingBottom: "4rem",
      }}
    >
      <CarrosselTags tags={TAGS} onSelectTag={handleSelectTag} />

      <section
        style={{
          maxWidth: "1280px",
          margin: "0 auto",
          padding: "2rem",
        }}
      >
        <TemplateLateral
          titulo={tag.charAt(0).toUpperCase() + tag.slice(1)}
          subtitulo={`Devoção e oração sobre ${tag}`}
          imagem={`/temas-da-vida/tag-${tag}.jpg`}
        >
          <EditorialSwap
            devocional={conteudo.devocional}
            oracao={conteudo.oracao}
          />
        </TemplateLateral>
      </section>
    </main>
  );
}
