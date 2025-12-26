import React, { useState } from "react";

// Estilos globais e da página
import "../styles/animations.css";
import "../styles/contato.css";

export default function Contato() {
  const [sending, setSending] = useState(false);

  // 🔗 Endpoint Cloud Run
  const ENDPOINT = "https://sendmail-5xwyfzmuuq-uc.a.run.app";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);

    const form = e.target;
    const formData = {
      nome: form.nome?.value || "",
      email: form.email?.value || "",
      mensagem: form.mensagem?.value || "",
    };

    try {
      const resp = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (resp.ok) {
        window.alert("Mensagem enviada com sucesso!");
        form.reset();
      } else {
        let text;
        try {
          const j = await resp.json();
          text = j?.error || j?.message || resp.statusText;
        } catch {
          text = resp.statusText || "Erro desconhecido";
        }
        window.alert("Falha ao enviar: " + text);
      }
    } catch (err) {
      console.error("Erro de rede ao enviar:", err);
      window.alert("Erro de rede ao enviar a mensagem. Tente novamente.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="contato-section">
      
      {/* =======================
          COLUNA ESQUERDA
      ======================== */}
      <div className="contato-texto-coluna">
        
        <h1 className="contato-titulo">Contate-nos</h1>

        <p className="frase-principal"> 
          “Escrever é uma forma de oração. E, quando a oração nasce de um desabafo sincero, 
          a alma respira e o espírito sussurra — inexprimível — aos ouvidos do Deus Eterno. 
          Não há palavra verdadeira que Ele não escute: às vezes responde com o silêncio, 
          outras, com alguém que te lê. Hoje, aqui estou eu, ao teu dispor. 
          Capelão Nascente.”
        </p>

        <div className="contato-info-grupo">
          <div>
            <p className="info-titulo">✉️ E-mail</p>
            <a
              href="mailto:nascente@pensologocreio.com.br"
              className="info-link"
            >
              nascente@pensologocreio.com.br
            </a>
          </div>

          <div>
            <p className="info-titulo">💬 WhatsApp</p>
            <a
              href="https://wa.me/5534991046358"
              target="_blank"
              rel="noopener noreferrer"
              className="info-link"
            >
              (34) 99104-6358
            </a>
            <p className="nota-rodape">
              Somente mensagens — sem chamadas.
            </p>
          </div>
        </div>

        <p className="frase-rodape"> 
          “Toda boa conversa começa com silêncio e termina em luz.”
        </p>
      </div>

      {/* =======================
          COLUNA DIREITA — FORMULÁRIO
      ======================== */}
      <div className="contato-formulario-coluna">
        <div className="contato-formulario-wrapper">
          
          <h2 className="formulario-titulo">Envie sua mensagem</h2>

          <form onSubmit={handleSubmit} className="formulario-contato">
            <input
              type="text"
              name="nome"
              placeholder="Seu nome"
              className="contato-input"
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Seu e-mail"
              className="contato-input"
              required
            />

            <textarea
              name="mensagem"
              rows="5"
              placeholder="Sua mensagem"
              className="contato-input contato-textarea"
              required
            ></textarea>

            {/* 🟡 EFEITO DE BOTÃO RESPIRANDO */}
            <button
              type="submit"
              className="contato-button pulse-gold"
              disabled={sending}
            >
              {sending ? "Enviando..." : "Enviar"}
            </button>

          </form>

        </div>
      </div>
    </section>
  );
}
