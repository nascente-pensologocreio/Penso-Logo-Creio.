import{j as o,_ as y}from"./index-uLl4F_Hm.js";import{r as u}from"./react-vendor-Bx3nAkti.js";import{M as k}from"./markdown-bundle-BMSQkwth.js";const g=Object.assign({"../../content/home/oracao.md":()=>y(()=>import("./oracao-B84rJvA7.js"),[]).then(t=>t.default)});function j(t){if(!t||!t.startsWith("---"))return{data:{},content:t||""};const a=t.indexOf(`
---`);if(a===-1)return{data:{},content:t};const s=t.slice(3,a).trim(),c=t.slice(a+4),d={};return s.split(`
`).forEach(r=>{const n=r.indexOf(":");if(n===-1)return;const m=r.slice(0,n).trim();let e=r.slice(n+1).trim();(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"))&&(e=e.slice(1,-1)),d[m]=e}),{data:d,content:c}}function T(){const[t,a]=u.useState({titulo:"",data:"",readTime:"",tag:"",imagemHero:null,conteudoFinal:""});u.useEffect(()=>{setTimeout(()=>window.scrollTo(0,0),50);async function e(){const b=new k({html:!0,breaks:!0}),l=Object.keys(g);if(l.length===0){console.error("Nenhum arquivo de oração encontrado na HOME.");return}const h=g[l[0]],x=await h(),p=j(x),i=p.data,f=b.render(p.content);a({titulo:i.titulo||"Oração",data:i.data||"",readTime:i.readTime||"",tag:i.tag||"",imagemHero:i.imageUrl||null,conteudoFinal:f})}e()},[]);const{titulo:s,data:c,readTime:d,tag:r,imagemHero:n,conteudoFinal:m}=t;return o.jsxs("main",{style:{minHeight:"100vh",backgroundColor:"#010b0a",color:"#ededed"},children:[o.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500&display=swap');

        .post-box {
          background-image: url('/Fundo-PostHome.jpeg');
          background-size: cover;
          background-position: center;
          border: 1px solid rgba(212,175,55,0.45);
          border-radius: 1rem;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 18px rgba(212,175,55,0.35),
                      inset 0 0 12px rgba(212,175,55,0.25);
          animation: fadeInUp 1.2s ease;
        }

        .post-box::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.45);
          backdrop-filter: blur(2px);
          z-index: 0;
        }
        .post-box * { position: relative; z-index: 1; }

        .post-box h1,
        .post-box h2,
        .post-box h3,
        .post-box h4,
        .post-box h5,
        .post-box h6 {
          margin-top: 2.5rem;
          margin-bottom: 1.5rem;
        }
      `}),n&&o.jsx("section",{style:{width:"100%",height:"55vh",backgroundColor:"#000",backgroundImage:`url(${n})`,backgroundRepeat:"no-repeat",backgroundPosition:"center",backgroundSize:"contain"},"aria-label":s}),o.jsxs("section",{style:{maxWidth:"1100px",margin:"0 auto",padding:"3rem 2rem 4rem",textAlign:"center"},children:[o.jsx("h1",{style:{fontSize:"1.8rem",marginTop:"4rem",marginBottom:"2.5rem"},children:s}),o.jsxs("p",{style:{marginBottom:"2.2rem"},children:[c," • ",d]}),r&&o.jsx("span",{style:{padding:"0.35rem 1rem",border:"1px solid rgba(212,175,55,0.45)",borderRadius:"9999px",fontSize:"0.7rem"},children:r})]}),o.jsx("article",{style:{maxWidth:"1100px",margin:"0 auto",padding:"2rem"},children:o.jsx("div",{className:"post-box",dangerouslySetInnerHTML:{__html:m}})})]})}export{T as default};
//# sourceMappingURL=Oracao-BzKjxSvC.js.map
