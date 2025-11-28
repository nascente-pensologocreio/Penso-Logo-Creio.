// src/pages/AdminPublish.jsx
// Publica TODOS os conteúdos .md no Firestore
// Compatível com o script preencherFrontMatterBiblia.mjs

import React, { useState } from "react";
import { db } from "../firebase/config";
import { collection, setDoc, doc } from "firebase/firestore";

// ============================
// IMPORTA TODO O CONTEÚDO .MD
// ============================

const globHome = import.meta.glob("../content/home/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

const globBiblia = import.meta.glob("../content/biblia/**/*.md", {
  eager: true,
  query: "?raw",
  import: "default",
});

// ============================
// PARSE FRONT-MATTER ROBUSTO
// ============================

function parseFrontMatter(raw) {
  if (typeof raw !== "string") return { data: {}, content: "" };

  const txt = raw.trimStart();
  if (!txt.startsWith("---")) return { data: {}, content: raw };

  const end = txt.indexOf("\n---", 3);
  if (end === -1) return { data: {}, content: raw };

  const fmBlock = txt.slice(3, end).trim();
  const body = txt.slice(end + 4).trimStart();

  const data = {};

  fmBlock.split("\n").forEach((line) => {
    const i = line.indexOf(":");
    if (i === -1) return;

    const key = line.slice(0, i).trim();
    let value = line.slice(i + 1).trim();

    // Remove aspas externas
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    // Converte arrays
    if (key === "tags") {
      try {
        data[key] = JSON.parse(value);
      } catch {
        data[key] = [];
      }
      return;
    }

    data[key] = value;
  });

  return { data, content: body };
}

// ============================
// MODELO UNIFICADO FIRESTORE
// ============================

function montarDocumento(path, fm, content) {
  const base = {
    slug: fm.slug || "",
    titulo: fm.titulo || "",
    tipo: fm.tipo || "",
    data: fm.data || "",
    readTime: fm.readTime || "",
    imageUrl: fm.imageUrl || "",
    autor: fm.autor || "Capelão Nascente",
    tema_principal: fm.tema_principal || "",
    tags: Array.isArray(fm.tags) ? fm.tags : [],
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

// ============================
// COMPONENTE PRINCIPAL
// ============================

export default function AdminPublish() {
  const [log, setLog] = useState([]);

  function escrever(msg) {
    setLog((l) => [...l, msg]);
  }

  async function enviarTudo() {
    setLog(["▶ Iniciando publicação…"]);

    const todos = { ...globHome, ...globBiblia };

    for (const path in todos) {
      try {
        const raw = todos[path];
        const { data, content } = parseFrontMatter(raw);

        // Checagem essencial
        if (!data.slug || !data.tipo || !data.data) {
          escrever(`⚠ Ignorado (front-matter incompleto): ${path}`);
          continue;
        }

        const docFinal = montarDocumento(path, data, content);

        await setDoc(
          doc(collection(db, "publicacoes"), docFinal.slug),
          docFinal,
          { merge: true }
        );

        escrever(`✔ Publicado: ${docFinal.slug}`);
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
