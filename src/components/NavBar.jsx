// src/components/NavBar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Início" },
  { to: "/caminho-das-escrituras", label: "Homilia" },
  { to: "/escadaria-do-conhecimento", label: "Estudos" },
  { to: "/devocional-diaria", label: "Devocional Diária" },
  { to: "/temas-da-vida", label: "Temas da Vida" },
  { to: "/oracoes", label: "Oração" },
  { to: "/contato", label: "Contato" },
  { to: "/calendario", label: "🕰️ Calendário" },
];

// função que normaliza a rota atual para um "menu alvo"
function getActiveRoot(pathname, locationState) {
  if (!pathname || pathname === "/") return "/";

  // posts premium da home: /artigo/:slug
  // Detectar origem pelo location.state
  if (pathname.startsWith("/artigo/")) {
    if (locationState?.from === 'temas-da-vida') {
      return "/temas-da-vida";
    }
    return "/";  // Default: Home
  }

  // posts Firebase: /post/:slug → Biblioteca (não há item, então nenhum ativo)

  // orações bíblicas: /biblia/:livro/:slug → Oração
  if (pathname.startsWith("/biblia/")) {
    return "/oracoes";
  }
  if (pathname.startsWith("/post/")) return null;

  // demais rotas: usa o primeiro segmento como base
  // ex.: /caminho-das-escrituras/lucas/5 → /caminho-das-escrituras
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";

  return `/${parts[0]}`;
}

export default function NavBar() {
  const location = useLocation();
  const path = location.pathname || "/";
  const activeRoot = getActiveRoot(path, location.state);

  return (
    <ul
      className="flex flex-wrap justify-center items-center gap-12 px-6 py-4"
      style={{
        margin: 0,
        padding: "16px 24px",
        listStyle: "none",
        background: "transparent",
      }}
    >
      {links.map(({ to, label }) => {
        const isCalendario = to === "/calendario";

        const active =
          activeRoot === to ||
          // preserva o comportamento anterior para rotas base
          (to !== "/" && path.startsWith(to));

        return (
          <li key={to} style={{ margin: 0, padding: 0 }}>
            <Link
              to={to}
              className={`nav-link ${active ? "active" : ""} ${
                isCalendario ? "calendar-link" : ""
              }`}
              style={{ textDecoration: "none" }}
            >
              <span className="nav-label">{label}</span>
              <span aria-hidden="true" className="nav-accent" />
              <span aria-hidden="true" className="nav-glow" />
            </Link>
          </li>
        );
      })}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&display=swap');

        .nav-link {
          --gold: #D4AF37;
          --gold-light: #E8D5A8;
          display: inline-flex;
          align-items: center;
          position: relative;
          padding: 19px 26px;
          text-decoration: none;
          transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
          cursor: pointer;
          overflow: visible;
          white-space: nowrap;
        }

        .nav-label {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-weight: 600;
          letter-spacing: 1px;
          color: var(--gold);
          text-shadow: 
            0 0 8px rgba(212, 175, 55, 0.3),
            0 0 16px rgba(212, 175, 55, 0.15);
          transition: all 320ms cubic-bezier(0.23, 1, 0.32, 1);
          position: relative;
          z-index: 2;
          background: transparent;
        }

        .nav-accent {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 100%;
          height: 1.5px;
          background: linear-gradient(
            90deg,
            transparent 0%,
            var(--gold) 20%,
            var(--gold) 80%,
            transparent 100%
          );
          opacity: 0;
          transform: scaleX(0.3);
          transition: all 340ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 1;
        }

        .nav-glow {
          position: absolute;
          inset: -8px -10px;
          background: radial-gradient(
            ellipse 100% 50% at 50% 100%,
            rgba(212, 175, 55, 0.2) 0%,
            rgba(212, 175, 55, 0.05) 40%,
            transparent 70%
          );
          opacity: 0;
          border-radius: 50%;
          transition: all 320ms cubic-bezier(0.23, 1, 0.32, 1);
          z-index: 0;
          pointer-events: none;
        }

        .nav-link:hover .nav-label,
        .nav-link.active .nav-label {
          color: #fff;
          text-shadow:
            0 0 6px rgba(255, 255, 255, 0.6),
            0 0 18px var(--gold),
            0 0 32px rgba(212, 175, 55, 0.8),
            0 0 48px rgba(212, 175, 55, 0.4);
          transform: translateY(-2px);
        }

        .nav-link:hover .nav-accent,
        .nav-link.active .nav-accent {
          opacity: 1;
          transform: scaleX(1);
        }

        .nav-link:hover .nav-glow,
        .nav-link.active .nav-glow {
          opacity: 1;
        }

        .nav-link:active .nav-label {
          transform: translateY(0px) scale(0.98);
        }

        .calendar-link {
          border: 1.5px solid rgba(112, 175, 30, 0.5);
          border-radius: 12px;
          padding: 10px 18px;
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.08) 0%,
            rgba(212, 175, 55, 0.02) 100%
          );
          box-shadow: 
            0 0 12px rgba(212, 175, 55, 0.2),
            inset 0 0 12px rgba(212, 175, 55, 0.05);
          transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .calendar-link:hover {
          border-color: rgba(212, 175, 55, 0.8);
          background: linear-gradient(
            135deg,
            rgba(212, 175, 55, 0.15) 0%,
            rgba(212, 175, 55, 0.08) 100%
          );
          box-shadow:
            0 0 20px rgba(212, 175, 55, 0.4),
            0 0 40px rgba(212, 175, 55, 0.2),
            inset 0 0 16px rgba(212, 175, 55, 0.1);
          transform: translateY(-3px);
        }

        .calendar-link.active {
          box-shadow:
            0 0 24px rgba(212, 175, 55, 0.5),
            0 0 48px rgba(212, 175, 55, 0.3),
            inset 0 0 20px rgba(212, 175, 55, 0.15);
        }

        @keyframes navRipple {
          0% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4);
          }
          70% {
            box-shadow: 0 0 0 12px rgba(212, 175, 55, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(212, 175, 55, 0);
          }
        }

        .nav-link:active {
          animation: navRipple 0.6s ease-out;
        }

        @media (max-width: 1024px) {
          .nav-label {
            font-size: 1rem;
            letter-spacing: 0.6px;
          }

          ul {
            gap: 10px !important;
          }
        }

        @media (max-width: 768px) {
          ul {
            gap: 8px !important;
          }

          .nav-label {
            font-size: 0.95rem;
          }

          .calendar-link {
            padding: 8px 8px;
          }
        }
      `}</style>
    </ul>
  );
}