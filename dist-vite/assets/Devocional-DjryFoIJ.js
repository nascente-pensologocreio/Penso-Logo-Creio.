import{j as t}from"./index-uLl4F_Hm.js";import{r as p}from"./react-vendor-Bx3nAkti.js";import{M as h}from"./markdown-bundle-BMSQkwth.js";import{r as u}from"./devocional-D65XkcD0.js";function x(o){if(!o.startsWith("---"))return{data:{},content:o};const a=o.indexOf(`
---`);if(a===-1)return{data:{},content:o};const s=o.slice(3,a).trim(),l=o.slice(a+4),m={};return s.split(`
`).forEach(r=>{const i=r.indexOf(":");if(i===-1)return;const d=r.slice(0,i).trim();let e=r.slice(i+1).trim();(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"))&&(e=e.slice(1,-1)),m[d]=e}),{data:m,content:l}}function v(){const[o,a]=p.useState({titulo:"",data:"",readTime:"",tag:"",imagemHero:null,conteudoFinal:""});p.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo({top:0,left:0,behavior:"instant"})},80);const e=new h({html:!0,breaks:!0}),c=x(u),n=c.data,g=e.render(c.content);a({titulo:n.titulo||"Devocional",data:n.data||"",readTime:n.readTime||"",tag:n.tag||"",imagemHero:n.imageUrl||n.imagem||null,conteudoFinal:g})},[]);const{titulo:s,data:l,readTime:m,tag:r,imagemHero:i,conteudoFinal:d}=o;return t.jsxs("main",{style:{minHeight:"100vh",backgroundColor:"#010b0a",color:"#ededed"},children:[t.jsx("style",{children:`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600&family=Inter:wght@400;500&display=swap');

        .post-box {
          background-image: url('/Fundo-PostHome.jpeg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: 1px solid rgba(212,175,55,0.45);
          border-radius: 1rem;
          padding: 2.5rem;
          position: relative;
          overflow: hidden;
          box-shadow: 0 0 18px rgba(212,175,55,0.35), inset 0 0 12px rgba(212,175,55,0.25);
        }

        .post-box h1 { margin-top: 4rem; margin-bottom: 2rem; font-size: 2rem; color: #F5E3A1; }
        .post-box h2 { margin-top: 3rem; margin-bottom: 1.6rem; font-size: 1.65rem; color: #E5D08A; }
        .post-box h3 { margin-top: 2.5rem; margin-bottom: 1.4rem; font-size: 1.45rem; color: #DCC677; }
        .post-box h4 { margin-top: 2rem; margin-bottom: 1.2rem; font-size: 1.25rem; color: #C9B45D; }
        .post-box h5 { margin-top: 1.8rem; margin-bottom: 1rem; font-size: 1.15rem; color: #B89D4A; }
        .post-box h6 { margin-top: 1.6rem; margin-bottom: 0.8rem; font-size: 1rem; color: #A68939; }

        .post-box p { margin: 1.2rem 0; }

      `}),i&&t.jsx("section",{style:{width:"100%",height:"55vh",overflow:"hidden"},children:t.jsx("img",{src:i,alt:s,style:{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(0.85)"}})}),t.jsxs("section",{style:{maxWidth:"1100px",margin:"0 auto",padding:"3rem 2rem 4rem",textAlign:"center"},children:[t.jsx("h1",{style:{fontSize:"1.9rem",marginTop:"3rem",marginBottom:"4rem"},children:s}),t.jsxs("p",{style:{marginBottom:"2rem"},children:[l," • ",m]}),r&&t.jsx("span",{style:{padding:"0.35rem 1rem",border:"1px solid rgba(212,175,55,0.45)",borderRadius:"9999px",fontSize:"0.7rem"},children:r})]}),t.jsx("article",{style:{maxWidth:"1100px",margin:"0 auto",padding:"2rem"},children:t.jsx("div",{className:"post-box",dangerouslySetInnerHTML:{__html:d}})})]})}export{v as default};
//# sourceMappingURL=Devocional-DjryFoIJ.js.map
