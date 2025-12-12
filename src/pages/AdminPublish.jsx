// src/pages/AdminPublish.jsx
// Publica TODOS os conteúdos .md no Firestore (modularizado)
// Versão universal — motor PLC v5 LTS

import React, { useState } from "react";
import { carregarFirestore } from "../modules/admin/carregarFirestore.js";

import { parseFrontmatter } from "../utils/markdownProcessor.js"; // motor universal

// =========================================
// IMPORTAÇÃO DOS ARQUIVOS .MD
// =========================================

const globHome = import.meta.glob("../content/home/*.md", {
  eager: true,
  query: "?raw", import: "default",
});

const globBiblia = import.meta.glob("../content/biblia/**/*.md", {
  eager: true,
  query: "?raw", import: "default",
});

// =========================================
// MODELO UNIFICADO PARA FIRESTORE
// =========================================

function montarDocumento(path, fm, content) {
  const base = {
    slug: fm.slug || "",
    titulo: fm.titulo || "",
    subtitulo: fm.subtitulo || "",
    tipo: fm.tipo || "",
    data: fm.data || "",
    readTime: fm.readTime || "",
    imageUrl: fm.imageUrl || "",
    autor: fm.autor || "Capelão Nascente",
    tema_principal: fm.tema_principal || "",
    tags: Array.isArray(fm.tags) ? fm.tags : [],
    referencia: fm.referencia || "",
    texto: content || "",
    origem: "",
    livro: "",
    capitulo: "",
    pathOriginal: path,
  };

  // HOME
  if (path.includes("/home/")) {
    base.origem = "home";
    return base;
  }

  // BÍBLIA
  const partes = path.split("/");
  const livro = partes[partes.length - 3];
  const capitulo = partes[partes.length - 2];

  base.origem = "biblia";
  base.livro = livro;
  base.capitulo = capitulo;

  return base;
}

// =========================================
// COMPONENTE PRINCIPAL
// =========================================

export default function AdminPublish() {
  const [log, setLog] = useState([]);

  function escrever(msg) {
    setLog((l) => [...l, msg]);
  }

  async function enviarTudo() {
    setLog(["▶ Iniciando publicação…"]);

    const todos = {
      ...globHome,
      ...globBiblia,
    };

    const { doc, setDoc, collection, db } = await carregarFirestore();

    for (const path in todos) {
      try {
        const raw = todos[path]; // string com markdown

        const { data, content } = parseFrontmatter(raw);

        // validação mínima
        if (!data.slug || !data.tipo || !data.data || !data.titulo) {
          escrever(`⚠ Ignorado (front-matter incompleto): ${path}`);
          continue;
        }

        const documento = montarDocumento(path, data, content);

        const ref = doc(collection(db, "publicacoes"), documento.slug);

        await setDoc(ref, documento, { merge: true });

        escrever(`✔ Publicado: ${documento.slug}`);
      } catch (err) {
        escrever(`❌ ERRO EM ${path}: ${err}`);
      }
    }

    escrever("🏁 Concluído.");
  }

  return (
    <section className="min-h-screen bg-black text-[#EDEDED] p-12">
      <h1 className="text-4xl mb-8 text-[#D4AF37] font-['Playfair_Display']">
        Painel Administrativo de Publicação
      </h1>

      <button
        onClick={enviarTudo}
        className="px-6 py-3 bg-[#D4AF37]/20 border border-[#D4AF37] rounded-lg text-[#D4AF37] hover:bg-[#D4AF37]/40 transition"
      >
        Publicar TODOS os conteúdos no Firebase
      </button>

      <div className="mt-10 text-sm whitespace-pre-wrap bg-black/30 border border-[#D4AF37]/30 p-6 rounded-lg font-mono">
        {log.map((l, i) => (
          <div key={i}>{l}</div>
        ))}
      </div>
    </section>
  );
}
