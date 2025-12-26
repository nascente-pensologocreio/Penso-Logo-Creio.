import React from 'react';

// Dados das reflexões
const data = [
  {
    title: "VERSÍCULO DO DIA",
    quote: "Amarás o Senhor, teu Deus, de todo o teu coração, de toda a tua alma e de todo o teu entendimento.",
    reference: "— Mateus 22:37"
  },
  {
    title: "PENSAMENTO DO DIA",
    quote: "Se eu te adorar por medo do inferno, queima-me no inferno. Se eu te adorar pelo paraíso, exclua-me do paraíso. Mas se eu te adorar pelo que Tu és, não escondas de mim a Tua face!",
    reference: "— Rábia (mulher iraquiana - 800 d.C. Epígrafe no seu túmulo)"
  }
];

// Componente de Card (AGORA MUITO MAIS LEVE)
const ReflexaoCard = ({ title, quote, reference, delay }) => {
  
  // Função para atualizar as variáveis CSS no card
  const handleMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    // Define as variáveis CSS --mouse-x e --mouse-y no próprio elemento do card
    card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  return (
    <div 
      className="reflexao-card" // O CSS vai ler as variáveis a partir daqui
      style={{ animationDelay: `${delay}s` }}
      onMouseMove={handleMouseMove} // Atualiza as variáveis CSS
    >
        {/* O foco de luz agora é controlado 100% pelo CSS */}
        <div className="spotlight-effect"></div>

        <div className="reflexao-card-content">
            <h3 className="reflexao-title">
              {title}
            </h3>
            
            <blockquote className="reflexao-quote">
              <p>“{quote}”</p>
            </blockquote>

            <p className="reflexao-reference">
              {reference}
            </p>
        </div>
    </div>
  );
};

export default function ReflexaoDiaria() {
  return (
    <>
      <style>{`
        /* ... (Estilos da seção, grid) ... */
        
        /* 1. SEÇÃO PRINCIPAL */
        .reflexao-section {
          position: relative;
          z-index: 30;
          margin: 0 auto; /* container */
          padding: 4rem 1rem; /* py-16 px-4 */
          max-width: 80rem; /* max-w-7xl - ajuste se necessário */
          border-top: 1px solid rgba(212, 175, 55, 0.2) !important;
          border-bottom: 1px solid rgba(212, 175, 55, 0.2) !important;
        }

        .reflexao-grid {
          display: grid !important;
          grid-template-columns: 1fr !important; /* 1 coluna (mobile) */
          gap: 3rem !important; /* 48px */
        }
        
        @media (min-width: 1024px) {
          .reflexao-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }

        /* 2. CARD (COM VARIÁVEIS CSS) */
        .reflexao-card {
          backdrop-filter: blur(20px) !important;
          background: rgba(0, 0, 0, 0.3) !important;
          border: 1px solid rgba(212, 175, 55, 0.3) !important;
          border-radius: 1rem !important;
          padding: 2rem !important;
          overflow: hidden !important;
          position: relative !important;
          transition: all 0.5s ease-out !important;
          animation: slideInUp 0.8s ease-out both;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          
          /* Inicializa as variáveis CSS */
          --mouse-x: 50%;
          --mouse-y: 50%;
        }

        /* 3. EFEITOS HOVER E SPOTLIGHT CORRIGIDO */
        .reflexao-card:hover {
          border-color: rgba(212, 175, 55, 0.7) !important;
          transform: translateY(-8px) !important;
          box-shadow: 0 20px 50px rgba(212, 175, 55, 0.15) !important;
        }
        
        /* Glow geral (continua o mesmo) */
        .reflexao-card::after {
          content: '';
          position: absolute;
          inset: 0;
          opacity: 0;
          transition: opacity 0.5s ease-out;
          pointer-events: none;
          background: radial-gradient(circle at 50% 50%, rgba(212,175,55,0.1), transparent 70%);
        }
        .reflexao-card:hover::after {
          opacity: 1 !important;
        }

        /* CORRIGIDO: EFEITO SPOTLIGHT */
        .spotlight-effect {
            position: absolute;
            /* Lê as variáveis CSS atualizadas pelo React */
            top: var(--mouse-y); 
            left: var(--mouse-x); 
            width: 400px;
            height: 400px;
            background: radial-gradient(circle at center, rgba(212, 175, 55, 0.35) 0%, transparent 70%); 
            border-radius: 50%;
            pointer-events: none;
            
            /* Esta é a regra de CENTRALIZAÇÃO que estava faltando! */
            transform: translate(-50%, -50%); 
            
            opacity: 0; /* Começa invisível */
            transition: opacity 0.3s ease-out; /* Transição suave APENAS da opacidade */
        }
        
        /* Mostra o spotlight QUANDO o mouse estiver sobre o .reflexao-card */
        .reflexao-card:hover .spotlight-effect {
            opacity: 1 !important;
        }
        
        .reflexao-card-content {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          height: 100%;
        }


        /* 4. FONTES (Sem alterações) */
        
        .reflexao-title {
          font-family: 'Inter', sans-serif !important;
          font-size: 1rem !important;
          font-weight: 700 !important;
          letter-spacing: 0.15em !important;
          color: #D4AF37 !important;
          text-transform: uppercase !important;
          margin-bottom: 1rem !important;
        }

        .reflexao-quote {
          flex-grow: 1;
          display: flex;
          align-items: center;
        }

        .reflexao-quote p {
          font-family: 'Mile Heights', serif !important;
          font-size: 1.5rem !important;
          line-height: 1.5 !important;
          color: white !important;
          font-style: italic !important;
          font-weight: 400 !important;
        }
        
        @media (max-width: 768px) {
            .reflexao-quote p {
                font-size: 1.25rem !important;
            }
        }

        .reflexao-reference {
          font-family: 'Inter', sans-serif !important;
          color: #9CA3AF !important;
          font-size: 0.95rem !important;
          margin-top: 1.5rem !important;
          font-weight: 400 !important;
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
      `}</style>

      <section className="reflexao-section">
        <div className="reflexao-grid">
          
          <ReflexaoCard 
            title={data[0].title}
            quote={data[0].quote}
            reference={data[0].reference}
            delay={0.1}
          />
          
          <ReflexaoCard 
            title={data[1].title}
            quote={data[1].quote}
            reference={data[1].reference}
            delay={0.2}
          />
        </div>
      </section>
    </>
  );
}