// src/components/ConteudoDoDia.jsx
import React, { useEffect, useState } from "react";
import { loadBiblePosts } from "../utils/loadBiblePosts.js";
import PostWrapper from "./PostWrapper.jsx";

/**
 * ConteudoDoDia
 *
 * Props:
 * - tipo: string (ex.: "mensagem-pastoral", "pregacao-tecnica", "estudo-tematico",
 *         "terminologias-chave", "temas-controversos", "devocional", "oracao")
 * - titulo: string opcional para o cabeçalho
 * - livro: string (nome do livro bíblico, ex.: "Romanos")
 * - capitulo: number | string (número do capítulo)
 * - render: função opcional (post) => JSX
 */
export default function ConteudoDoDia({
  tipo,
  titulo,
  livro,
  capitulo,
  render,
}) {
  const [post, setPost] = useState(null);
  const [estado, setEstado] = useState("idle"); // idle | carregando | ok | vazio | erro

  // log simples para garantir que o componente está montando
  console.log("MONTANDO ConteudoDoDia", { tipo, livro, capitulo });

  useEffect(() => {
    if (!livro || !capitulo) {
      setPost(null);
      setEstado("vazio");
      return;
    }

    let cancelado = false;

    async function carregar() {
      try {
        setEstado("carregando");

        const capNum =
          typeof capitulo === "string" ? parseInt(capitulo, 10) : capitulo;

        const posts = await loadBiblePosts(livro, capNum);

        // LOG DE DIAGNÓSTICO
        console.log("DEBUG ConteudoDoDia:", {
          livro,
          capitulo: capNum,
          tipo,
          totalPosts: posts.length,
          tipos: posts.map((p) => p.tipo),
          slugs: posts.map((p) => p.slug),
        });

        if (cancelado) return;

        const encontrado = posts.find(
          (p) =>
            String(p.tipo).toLowerCase() === String(tipo).toLowerCase()
        );

        if (!encontrado) {
          setPost(null);
          setEstado("vazio");
        } else {
          setPost(encontrado);
          setEstado("ok");
        }
      } catch (err) {
        console.error("Erro ao carregar ConteudoDoDia:", err);
        if (!cancelado) {
          setPost(null);
          setEstado("erro");
        }
      }
    }

    carregar();

    return () => {
      cancelado = true;
    };
  }, [livro, capitulo, tipo]);

  // estados de feedback
  if (estado === "carregando") {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-sm text-[#D4AF37]/80">
        Carregando conteúdo...
      </div>
    );
  }

  if (estado === "erro") {
    return (
      <div className="min-h-[200px] flex items-center justify-center text-sm text-red-400/80 border border-red-500/30 rounded-lg px-6 py-4">
        Ocorreu um erro ao carregar este conteúdo.
      </div>
    );
  }

  if (!post || estado === "vazio") {
    return (
      <div className="min-h-[200px] flex flex-col items-center justify-center border border-[#D4AF37]/30 rounded-xl px-6 py-8 text-center text-[#EDEDED]/80">
        <h3 className="font-['Playfair_Display'] text-xl mb-2 text-[#D4AF37]">
          Conteúdo ainda não disponível
        </h3>
        <p className="text-sm opacity-80">
          Este conteúdo ainda não foi preenchido para o capítulo selecionado.
        </p>
      </div>
    );
  }

  // renderização customizada
  if (typeof render === "function") {
    return render(post);
  }

  // renderização padrão com PostWrapper (card em papel claro)
  return (
    <PostWrapper
      tipo={post.tipo}
      titulo={titulo || post.titulo}
      subtitulo={post.subtitulo}
      versiculo={post.versiculo}
      referencia={post.referencia}
    >
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </PostWrapper>
  );
}
