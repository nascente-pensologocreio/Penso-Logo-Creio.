import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

import PostWrapper from "../components/PostWrapper.jsx";
import DevocionalTemplate from "../templates/DevocionalTemplate.jsx";
import PregacaoTemplate from "../templates/PregacaoTemplate.jsx";

export default function PostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const carregar = async () => {
      try {
        const ref = doc(db, "publicacoes", slug);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setPost(snap.data());
        } else {
          setPost(null);
        }
      } catch (err) {
        console.error("Erro ao carregar postagem:", err);
        setPost(null);
      }
    };
    carregar();
  }, [slug]);

  if (!post) {
    return (
      <section className="min-h-screen flex items-center justify-center text-[#EDEDED]">
        <p className="text-lg italic">Postagem não encontrada.</p>
      </section>
    );
  }

  let Conteudo;

  switch (post.tipo) {
    case "devocional":
      Conteudo = (
        <DevocionalTemplate
          titulo={post.titulo}
          subtitulo={post.subtitulo}
          versiculo={post.versiculo}
          texto={post.texto}
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

          <article className="whitespace-pre-line text-justify">
            {post.texto}
          </article>
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
      <div className="w-full flex justify-center">
        {Conteudo}
      </div>
    </PostWrapper>
  );
}
