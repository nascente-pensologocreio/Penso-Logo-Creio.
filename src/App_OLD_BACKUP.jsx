// src/App.jsx - VERSÃO ESTÁVEL (SEM ANIMAÇÃO)

import React, { useEffect, useState } from "react";
import NavBar from "./components/NavBar.jsx";
import ReflexaoDiaria from "./components/ReflexaoDiaria.jsx";
import { ArticleCard } from "./components/ArticleCard.jsx";
import ArvoreDePostagens from "./components/ArvoreDePostagens.jsx";
import { mainPost, secondaryPosts } from "./content/index.js";
// Nenhuma importação de useScrollAnimation aqui

function App() {
  const logomarca = "/logo-site-fundo-transparene.png";
  const brasao = "/ass-brasao-cpl-nascente.png";
  const fundoHero = "/Mockup da Homepage.png";

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="min-h-screen font-serif flex flex-col bg-gradient-to-b from-black via-[#0a0a0a] to-black relative">
        {/* Fundo decorativo */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-[#D4AF37]/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-[#2E4632]/10 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* HEADER */}
        <header
          className={`relative z-50 container mx-auto px-4 pt-8 transition-all duration-500 ${
            isScrolled ? "pt-4" : "pt-8"
          }`}
        >
          <div className="flex justify-center items-center mx-auto mb-6">
            <div className="relative group animate-revelacao-dourada">
              <img
                src={logomarca}
                alt="Logomarca Penso Logo Creio"
                className={`logo transition-all duration-700 ${
                  isScrolled ? "h-16" : "h-24"
                }`}
                style={{
                  filter: "drop-shadow(0 0 15px rgba(212, 175, 55, 0.6))",
                }}
              />
              <div
                className="absolute inset-0 border-2 border-[#D4AF37]/20 rounded-full animate-spin-slow"
                style={{ animationDuration: "15s" }}
              ></div>
            </div>
          </div>
        </header>

        {/* HERO */}
        <section
          className="relative min-h-[70vh] bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-6 overflow-hidden"
          style={{
            backgroundImage: `url("${fundoHero}")`,
            backgroundAttachment: "fixed",
          }}
        >
          {/* Sobreposição escura */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10"></div>

          {/* NAVBAR SOBRE O HERO */}
          <div
            className="absolute left-0 w-full z-40 flex justify-center pointer-events-auto"
            style={{
              top: "0",
              transform: "translateY(0)",
              backdropFilter: "blur(3px)",
              background:
                "linear-gradient(to bottom, rgba(0,0,0,0.35), rgba(0,0,0,0))",
              paddingTop: "1.2rem",
            }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: "1200px",
                padding: "0 1rem",
              }}
            >
              <nav className="flex justify-center">
                <div
                  className="nav-wrapper"
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <NavBar />
                </div>
              </nav>
            </div>
          </div>

          {/* Partículas douradas */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full opacity-0 animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  background: "#D4AF37",
                  animation: `float 6s ease-in-out ${i * 1.2}s infinite`,
                }}
              />
            ))}
          </div>

          {/* TÍTULO PRINCIPAL */}
          <div
            className="relative z-30 flex flex-col items-center w-full"
            style={{ transform: "translateY(0)" }}
          >
            <h1
              className="text-4xl sm:text-6xl lg:text-7xl font-['Playfair_Display'] font-bold mb-3 animate-glow"
              style={{
                color: "#fff",
                textShadow:
                  "0 0 25px rgba(212,175,55,0.8), 0 0 10px rgba(255,255,255,0.4), 0 0 4px #D4AF37",
                animation:
                  "fadeGlow 2.5s cubic-bezier(.31,1.42,.74,.89) 0.25s both",
              }}
            >
              Bem-vindo ao Penso Logo Creio
            </h1>
            <p
              className="text-lg sm:text-xl lg:text-2xl font-['Inter'] mt-2 mb-3 animate-glow"
              style={{
                color: "#E0E0E0",
                textShadow:
                  "0 0 8px rgba(212,175,55,0.4), 0 1px 2px rgba(0,0,0,0.3)",
                animation:
                  "fadeGlow 2.5s cubic-bezier(.31,1.42,.74,.89) 0.45s both",
              }}
            >
              Um espaço para reflexão sobre fé, vida e teologia.
            </p>
          </div>

          {/* ESTILOS DA NAVBAR */}
          <style>{`
            @keyframes fadeGlow {
              0% { filter: blur(8px) brightness(0.6); opacity: 0.2;}
              55% { filter: blur(2px) brightness(1); opacity: 1;}
              100% { filter: blur(0) brightness(1.05);}
            }
            .animate-glow { animation: fadeGlow 2.1s ease both; }

            .nav-links {
              display: flex;
              justify-content: center;
              align-items: center;
              flex-wrap: wrap;
              gap: 3.2rem; /* espaçamento entre os links */
              padding: 0.8rem 1.2rem;
              white-space: nowrap;
              overflow: hidden;
              -webkit-overflow-scrolling: touch;
            }

            .nav-links a {
              text-decoration: none;
              color: #d4af37;
              font-weight: 600;
              text-shadow: 0 0 8px rgba(212,175,55,0.25);
              transition: all 0.3s ease;
              letter-spacing: 0.03em;
            }

            .nav-links a:hover {
              color: #fff;
              text-shadow: 0 0 18px #fff, 0 0 12px #d4af37;
            }

            @media (max-width: 1024px) {
              .nav-links {
                gap: 1.6rem;
                font-size: 0.95rem;
                flex-wrap: wrap;
                justify-content: center;
              }
            }
          `}</style>
        </section>

        {/* REFLEXÃO DIÁRIA */}
        <div className="my-16">
          <ReflexaoDiaria />
        </div>

        {/* POSTS */}
        <main className="relative z-20 container mx-auto px-4 my-24 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
            <div className="lg:col-span-3">
              <div className="flex flex-col items-center gap-[6rem] w-full">
                <div className="w-full flex justify-center">
                  {mainPost && (
                    <ArticleCard post={mainPost} isMain={true} delay={0.1} />
                  )}
                </div>
                {secondaryPosts && secondaryPosts[0] && (
                  <div className="w-[65%] self-start">
                    <ArticleCard
                      post={secondaryPosts[0]}
                      isMain={false}
                      delay={0.2}
                    />
                  </div>
                )}
                {secondaryPosts && secondaryPosts[1] && (
                  <div className="w-[65%] self-end">
                    <ArticleCard
                      post={secondaryPosts[1]}
                      isMain={false}
                      delay={0.3}
                    />
                  </div>
                )}
              </div>
            </div>

            <aside
              className="lg:col-span-1 space-y-12"
              style={{ animation: "slideInRight 0.8s ease-out 0.4s both" }}
            ></aside>
          </div>
        </main>

        {/* ÁRVORE DE POSTAGENS */}
        <ArvoreDePostagens />

        {/* FOOTER */}
        <footer className="relative z-20 py-6 md:py-8 border-t border-white/10 backdrop-blur-sm">
          <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-4 md:flex-row md:justify-between md:items-end md:space-y-0">
            <p
              className="font-normal text-base"
              style={{
                color: "#fff",
                textShadow: "0 0 8px #fff, 0 0 4px #d4af37",
              }}
            >
              © 2025 Penso Logo Creio | Por Cpl. Nascente
            </p>
            <img
              src={brasao}
              alt="Brasão Capelania Nascente"
              className="h-12 md:h-16 filter drop-shadow-lg"
              style={{
                filter: "drop-shadow(0 0 10px rgba(212, 175, 55, 0.4))",
              }}
            />
          </div>
        </footer>
      </div>

      {/* ESTILOS GLOBAIS */}
      <style>{`
        @keyframes fadeInDown { from { opacity: 0; transform: translateY(-20px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes float { 0%,100% { opacity: 0; transform: translateY(0);} 50% { opacity: 0.8; transform: translateY(-20px);} }
        @keyframes spin-slow { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }

        @keyframes revelacaoDourada {
          0% {
            opacity: 0;
            transform: scale(0.8) rotateX(20deg);
            filter: blur(10px) brightness(0.4);
          }
          60% {
            opacity: 1;
            transform: scale(1.05) rotateX(0deg);
            filter: blur(3px) brightness(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1) rotateX(0deg);
            filter: blur(0) brightness(1);
          }
        }

        .animate-revelacao-dourada {
          animation: revelacaoDourada 1.6s ease-out both;
        }

        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        html { scroll-behavior: smooth; }
        @supports (backdrop-filter: blur(1px)) {
          .backdrop-blur-xl { backdrop-filter: blur(20px); }
        }
      `}</style>
    </>
  );
}

export default App;