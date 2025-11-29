import{j as a}from"./index-uLl4F_Hm.js";import{u as o,L as l,r as c,O as d}from"./react-vendor-Bx3nAkti.js";const p=[{to:"/",label:"Início"},{to:"/caminho-das-escrituras",label:"Homilia"},{to:"/escadaria-do-conhecimento",label:"Estudos"},{to:"/devocional-diaria",label:"Devocional Diária"},{to:"/temas-da-vida",label:"Temas da Vida"},{to:"/oracoes",label:"Oração"},{to:"/contato",label:"Contato"},{to:"/calendario",label:"🕰️ Calendário"}];function x(){const n=o().pathname||"/";return a.jsxs("ul",{className:"flex flex-wrap justify-center items-center gap-12 px-6 py-4",style:{margin:0,padding:"16px 24px",listStyle:"none",background:"transparent"},children:[p.map(({to:e,label:r})=>{const i=n===e||e!=="/"&&n.startsWith(e),s=e==="/calendario";return a.jsx("li",{style:{margin:0,padding:0},children:a.jsxs(l,{to:e,className:`nav-link ${i?"active":""} ${s?"calendar-link":""}`,style:{textDecoration:"none"},children:[a.jsx("span",{className:"nav-label",children:r}),a.jsx("span",{"aria-hidden":"true",className:"nav-accent"}),a.jsx("span",{"aria-hidden":"true",className:"nav-glow"})]})},e)}),a.jsx("style",{children:`
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

        /* Sublinha elegante */
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

        /* Glow aura */
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

        /* Estados hover e active */
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

        /* Link do Calendário - estilo especial */
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

        /* Efeito ripple sutil ao clicar */
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

        /* Responsividade */
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
      `})]})}function b(){return a.jsxs("footer",{className:"relative z-20 py-4 border-t border-[#D4AF37]/20 group overflow-hidden",style:{backgroundImage:'url("/Template Verde espelhado Listas brancas verticais 300 DPI.png")',backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",backdropFilter:"blur(6px)"},children:[a.jsx("div",{className:"absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700",style:{background:"radial-gradient(circle at center, rgba(212,175,55,0.25), transparent 70%)",animation:"moverLuz 6s ease-in-out infinite"}}),a.jsxs("div",{className:"container mx-auto px-3 flex flex-col md:flex-row items-center justify-between text-center md:text-left gap-2 relative z-10",children:[a.jsxs("div",{children:[a.jsx("p",{className:"text-sm font-medium",style:{color:"#E8E8E8",textShadow:"0 0 6px #D4AF37"},children:"© 2025 Capelania Nascente. Todos os direitos reservados."}),a.jsx("p",{className:"text-xs italic",style:{color:"#bebebe"},children:"Desenvolvido com fé e razão — Penso Logo Creio"})]}),a.jsx("div",{children:a.jsx("img",{src:"/ass-brasao-cpl-nascente.png",alt:"Brasão Capelania Nascente",className:"h-12 md:h-14 transition-transform duration-700 ease-in-out group-hover:scale-110",style:{filter:"drop-shadow(0 0 12px rgba(212,175,55,0.6))"}})})]}),a.jsx("style",{children:`
        @keyframes moverLuz {
          0% {
            transform: translate(-20%, -20%) scale(1);
            opacity: 0.4;
          }
          50% {
            transform: translate(20%, 20%) scale(1.35);
            opacity: 0.7;
          }
          100% {
            transform: translate(-20%, -20%) scale(1);
            opacity: 0.4;
          }
        }

        footer:hover img {
          filter: drop-shadow(0 0 18px rgba(212,175,55,0.8));
        }
      `})]})}function g(){const{pathname:t}=o();return c.useEffect(()=>{setTimeout(()=>{window.scrollTo({top:0,behavior:"instant"})},10)},[t]),null}function u(){const t="/Template Verde espelhado Listas brancas verticais 300 DPI.png",n="/logo-site-fundo-transparene.png",r=o().pathname==="/";return a.jsxs("div",{className:"min-h-screen flex flex-col text-white relative bg-[#010b0a] overflow-x-hidden",children:[a.jsx(g,{}),a.jsxs("header",{className:"relative w-full z-40 flex flex-col items-center justify-center pt-8 pb-6",style:{backgroundImage:`url("${t}")`,backgroundRepeat:"no-repeat",backgroundSize:"cover",backgroundPosition:"center",boxShadow:"0 6px 25px rgba(28, 75, 28, 0.7)"},children:[a.jsx("img",{src:n,alt:"Penso Logo Creio",className:"mx-auto drop-shadow-[0_0_35px_rgba(212,175,55,0.7)] animate-fadeIn",style:{objectFit:"contain",maxHeight:"200px",maxWidth:"90%"}}),a.jsx("div",{className:"w-full mt-2",children:a.jsx(x,{})})]}),a.jsx("main",{className:"flex-grow relative z-10",style:{marginTop:r?"40px":"60px",paddingBottom:"120px"},children:a.jsx(d,{})}),a.jsx(b,{})]})}export{u as default};
//# sourceMappingURL=LayoutPrincipal-Cn5q95en.js.map
