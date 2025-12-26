import{j as e}from"./index-uLl4F_Hm.js";import{L as v,r as g}from"./react-vendor-Bx3nAkti.js";import j from"./ArvoreDePostagens-CUhKm2My.js";import{r as N}from"./devocional-D65XkcD0.js";import{r as E}from"./mensagem-pastoral-BB9-BSbc.js";import O from"./oracao-B84rJvA7.js";const d=[{title:"VERSÍCULO DO DIA",quote:"Amarás o Senhor, teu Deus, de todo o teu coração, de toda a tua alma e de todo o teu entendimento.",reference:"— Mateus 22:37"},{title:"PENSAMENTO DO DIA",quote:"Se eu te adorar por medo do inferno, queima-me no inferno. Se eu te adorar pelo paraíso, exclua-me do paraíso. Mas se eu te adorar pelo que Tu és, não escondas de mim a Tua face!",reference:"— Rábia (mulher iraquiana - 800 d.C. Epígrafe no seu túmulo)"}],h=({title:t,quote:r,reference:i,delay:n})=>{const l=s=>{const o=s.currentTarget,a=o.getBoundingClientRect();o.style.setProperty("--mouse-x",`${s.clientX-a.left}px`),o.style.setProperty("--mouse-y",`${s.clientY-a.top}px`)};return e.jsxs("div",{className:"reflexao-card",style:{animationDelay:`${n}s`},onMouseMove:l,children:[e.jsx("div",{className:"spotlight-effect"}),e.jsxs("div",{className:"reflexao-card-content",children:[e.jsx("h3",{className:"reflexao-title",children:t}),e.jsx("blockquote",{className:"reflexao-quote",children:e.jsxs("p",{children:["“",r,"”"]})}),e.jsx("p",{className:"reflexao-reference",children:i})]})]})};function w(){return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
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
      `}),e.jsx("section",{className:"reflexao-section",children:e.jsxs("div",{className:"reflexao-grid",children:[e.jsx(h,{title:d[0].title,quote:d[0].quote,reference:d[0].reference,delay:.1}),e.jsx(h,{title:d[1].title,quote:d[1].quote,reference:d[1].reference,delay:.2})]})})]})}const f=({post:t,isMain:r=!1,delay:i=.1})=>{if(!t||typeof t!="object")return null;const n=t.titulo||"(sem título)",l=t.slug||"",s=t.data||"",o=t.readTime||"",a=t.imagem||t.imageUrl||null,c=t.conteudo||t.content||"",b=(m=>m?m.replace(/[#>*_`~\-]/g,"").trim().substring(0,200)+"...":"")(c),y=m=>{const p=m.currentTarget,u=p.getBoundingClientRect();p.style.setProperty("--mouse-x",`${m.clientX-u.left}px`),p.style.setProperty("--mouse-y",`${m.clientY-u.top}px`)};return e.jsxs(e.Fragment,{children:[e.jsx("style",{children:`
        .article-card {
          width: 100%;
          max-width: ${r?"900px":"680px"};
          margin: ${r?"0 auto 3rem":"2.2rem auto"};
          border-radius: 1rem !important;
          backdrop-filter: blur(20px);
          background: rgba(0, 0, 0, 0.28);
          border: 1px solid rgba(212,175,55,0.28);
          animation: slideInUp 0.8s ease-out both;
          overflow: hidden;
          position: relative;
          cursor: pointer;
          transition: all 0.35s ease-out;
        }

        .article-card:hover {
          box-shadow: 0 0 22px rgba(212,175,55,0.35);
          transform: translateY(-3px);
        }

        .article-card img {
          width: 100%;
          display: block;
          object-fit: cover;
        }

        .main-image-top {
          height: 420px;
        }

        .secondary-image-top {
          height: 260px;
        }

        .article-content {
          padding: ${r?"2.2rem":"1.6rem"};
        }

        .article-title-main {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          color: #D4AF37;
          margin-bottom: 1rem;
        }

        .article-title-secondary {
          font-family: 'Playfair Display', serif;
          font-size: 1.35rem;
          color: #D4AF37;
          margin-bottom: 0.8rem;
        }

        .article-meta {
          display: flex;
          gap: 1rem;
          font-size: 0.9rem;
          color: #aaa;
          margin-bottom: 1rem;
        }

        .article-text {
          font-size: 1rem;
          line-height: 1.6;
          color: #e5e5e5;
          text-align: justify;
        }

        .article-text-secondary {
          font-size: 0.9rem;
          line-height: 1.5;
          color: #d0d0d0;
          text-align: justify;
        }

        .article-footer {
          margin-top: 1.4rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(212,175,55,0.25);
          padding-top: 1rem;
        }

        .article-button {
          font-size: 0.85rem;
          padding: 0.55rem 1.4rem;
          border-radius: 0.45rem;
          background: transparent;
          color: #D4AF37;
          border: 1px solid rgba(212,175,55,0.5);
          transition: all 0.3s ease;
        }

        .article-button:hover {
          background: rgba(212,175,55,0.15);
          border-color: rgba(212,175,55,0.9);
          color: #fff;
        }
      `}),e.jsxs("article",{className:"article-card",style:{animationDelay:`${i}s`},onMouseMove:y,children:[a&&e.jsx("img",{src:a,alt:n,className:r?"main-image-top":"secondary-image-top"}),e.jsxs("div",{className:"article-content",children:[e.jsx("h2",{className:r?"article-title-main":"article-title-secondary",children:n}),r&&e.jsxs("div",{className:"article-meta",children:[e.jsx("span",{children:s}),e.jsx("span",{style:{color:"#D4AF37"},children:o})]}),e.jsx("p",{className:r?"article-text":"article-text-secondary",children:b}),e.jsxs("div",{className:"article-footer",children:[e.jsx(v,{to:`/artigo/${l}`,className:"article-button",style:{textDecoration:"none"},children:"Ler Mais"}),e.jsx("span",{style:{fontSize:"0.8rem",color:"#D4AF37"},children:o})]})]})]})]})},D=Object.assign({"/src/content/home/devocional.md":N,"/src/content/home/mensagem-pastoral.md":E,"/src/content/home/oracao.md":O});function A(t){if(!t||typeof t!="string")return{data:{},content:""};const r=t.trim();if(!r.startsWith("---"))return{data:{},content:t};const i=r.indexOf(`
---`,3);if(i===-1)return{data:{},content:t};const n=r.slice(3,i).trim(),l=r.slice(i+4).trim(),s={};return n.split(`
`).forEach(o=>{const a=o.indexOf(":");if(a===-1)return;const c=o.slice(0,a).trim(),x=o.slice(a+1).trim().replace(/^"|"$/g,"");s[c]=x}),{data:s,content:l}}async function I(){try{const t=Object.entries(D).map(([i,n])=>{const{data:l,content:s}=A(n),o=i.split("/").pop().toLowerCase(),a=l.imageUrl||null,c=l.tipo||o.replace(".md","");return{...l,imagem:a,tipo:c,conteudo:s,filename:o}}),r=["devocional.md","mensagem-pastoral.md","oracao.md"];return t.sort((i,n)=>r.indexOf(i.filename)-r.indexOf(n.filename))}catch(t){return console.error("ERRO EM getHomePosts():",t),[]}}function z(){const t="/Mockup da Homepage.png",[r,i]=g.useState([]);g.useEffect(()=>{async function a(){try{const c=await I();console.log("HOME RECEBE:",c),i(c)}catch(c){console.error("ERRO NO LOAD():",c)}}a()},[]);const n=["devocional","mensagem-pastoral","oracao"],l=r.length===3?[...r].sort((a,c)=>n.indexOf(a.tipo)-n.indexOf(c.tipo)):r,s=l[0]||null,o=l.slice(1);return e.jsxs(e.Fragment,{children:[e.jsxs("section",{className:"relative min-h-[80vh] bg-cover bg-center flex flex-col justify-center items-center text-center text-white px-6 overflow-hidden pt-32 md:pt-40",style:{backgroundImage:`url("${t}")`,backgroundAttachment:"fixed"},children:[e.jsx("div",{className:"absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10"}),e.jsxs("div",{className:"relative z-30 flex flex-col items-center w-full",children:[e.jsx("h1",{className:"text-4xl sm:text-6xl lg:text-7xl font-['Playfair_Display'] font-bold mb-3 animate-glow",style:{color:"#fff",textShadow:"0 0 25px rgba(212,175,55,0.8), 0 0 10px rgba(255,255,255,0.4), 0 0 4px #D4AF37"},children:"Bem-vindo ao Penso Logo Creio"}),e.jsx("p",{className:"text-lg sm:text-xl lg:text-2xl font-['Inter'] mt-2 mb-3 animate-glow",style:{color:"#E0E0E0",textShadow:"0 0 8px rgba(212,175,55,0.4), 0 1px 2px rgba(0,0,0,0.3)"},children:"Um espaço para reflexão sobre fé, vida e teologia."})]})]}),e.jsx("div",{className:"my-16",children:e.jsx(w,{})}),e.jsx("main",{className:"relative z-20 container mx-auto px-4 my-24 flex-grow",children:e.jsx("div",{className:"grid grid-cols-1 lg:grid-cols-4 gap-12",children:e.jsx("div",{className:"lg:col-span-3",children:e.jsxs("div",{className:"flex flex-col items-center gap-[6rem] w-full",children:[e.jsx("div",{className:"w-full flex justify-center",children:s&&e.jsx(f,{post:s,isMain:!0,delay:.1})}),o[0]&&e.jsx("div",{className:"w-[65%] self-start",children:e.jsx(f,{post:o[0],isMain:!1,delay:.2})}),o[1]&&e.jsx("div",{className:"w-[65%] self-end",children:e.jsx(f,{post:o[1],isMain:!1,delay:.3})})]})})})}),e.jsx(j,{})]})}export{z as default};
//# sourceMappingURL=Home-C9GmNjLq.js.map
