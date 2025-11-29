// src/pages/PostPage.jsx
// Versão universal — motor PLC v5 LTS
// Exibe posts vindos do Firebase usando templates editoriais

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { parseFrontmatter, markdownToHtml } from "../utils/markdownProcessor.js";
import { getFirebaseDB } from "../firebase/config";

// Templates
import PostWrapper from "../components/PostWrapper.jsx";
import DevocionalTemplate from "../templates/DevocionalTemplate.jsx";
import PregacaoTemplate from "../templates/PregacaoTemplate.jsx";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const db = await getFirebaseDB();
        const { doc, getDoc } = await import("firebase/firestore");

        const ref = doc(db, "publicacoes", slug);
        const snap = await getDoc(ref);

        if (!snap.exists()) {
          setPost(null);
          return;
        }

        const data = snap.data();

        // Converte markdown em HTML (motor universal)
        const fullHtml =
          data.texto && typeof data.texto === "string"
            ? markdownToHtml(data.texto)
            : "";

        setPost({
          ...data,
          fullContent: fullHtml,
        });
      } catch (err) {
        console.error("Erro ao carregar postagem:", err);
        setPost(null);
      }
    }

    carregar();
  }, [slug]);

  if (!post) {
    return (
      <section className="min-h-screen flex items-center justify-center text-[#EDEDED]">
        <p className="text-lg italic">Postagem não encontrada.</p>
      </section>
    );
  }

  // Escolhe o template correto
  let Conteudo;

  switch (post.tipo) {
    case "devocional":
      Conteudo = (
        <DevocionalTemplate
          titulo={post.titulo}
          subtitulo={post.subtitulo}
          versiculo={post.versiculo}
          texto={post.fullContent} // AGORA SÍNCRONO COM O MOTOR
          autor={post.autor}
        />
      );
      break;

    case "pregacao":
    case "homilia_informal":
    case "homilia_tecnica":
      Conteudo = (
        <PregacaoTemplate
          titulo={post.titulo}
          referencia={post.referencia}
          introducao={post.introducao}
          pontos={post.pontos}
          conclusao={post.conclusao}
        />
      );
      break;

    default:
      Conteudo = (
        <div className="max-w-3xl mx-auto px-6 py-12 font-serif leading-relaxed">
          <h1
            className="text-3xl font-bold mb-8 text-center"
            style={{
              color: "#D4AF37",
              textShadow: "0 0 12px rgba(212,175,55,0.55)",
            }}
          >
            {post.titulo}
          </h1>

          <article
            className="whitespace-pre-line text-justify"
            dangerouslySetInnerHTML={{ __html: post.fullContent }}
          />
        </div>
      );
  }

  return (
    <PostWrapper
      tipo={post.tipo}
      titulo={post.titulo}
      subtitulo={post.subtitulo}
      versiculo={post.versiculo}
      referencia={post.referencia}
    >
      <div className="w-full flex justify-center">{Conteudo}</div>
    </PostWrapper>
  );
}
