import{j as t}from"./index-uLl4F_Hm.js";import{r as u}from"./react-vendor-Bx3nAkti.js";import{M as g}from"./markdown-bundle-BMSQkwth.js";import{r as p}from"./mensagem-pastoral-BB9-BSbc.js";function x(r){if(!r.startsWith("---"))return{data:{},content:r};const n=r.indexOf(`
---`);if(n===-1)return{data:{},content:r};const a=r.slice(3,n).trim(),l=r.slice(n+4),d={};return a.split(`
`).forEach(o=>{const i=o.indexOf(":");if(i===-1)return;const m=o.slice(0,i).trim();let e=o.slice(i+1).trim();(e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"))&&(e=e.slice(1,-1)),d[m]=e}),{data:d,content:l}}function v(){const[r,n]=u.useState({titulo:"",data:"",readTime:"",tag:"",imagemHero:null,conteudoFinal:""});u.useEffect(()=>{window.scrollTo({top:0,left:0,behavior:"instant"}),setTimeout(()=>{window.scrollTo({top:0,left:0,behavior:"instant"})},80);const e=new g({html:!0,breaks:!0}),c=x(p),h=e.render(c.content),s=c.data;n({titulo:s.titulo||"Mensagem Pastoral",data:s.data||"",readTime:s.readTime||"",tag:s.tag||"",imagemHero:s.imageUrl||null,conteudoFinal:h})},[]);const{titulo:a,data:l,readTime:d,tag:o,imagemHero:i,conteudoFinal:m}=r;return t.jsxs("main",{style:{minHeight:"100vh",backgroundColor:"#010b0a",color:"#ededed"},children:[t.jsx("style",{children:`
        .post-box {
          background-image: url('/Fundo-PostHome.jpeg');
          background-size: cover;
          padding: 2.5rem;
          border: 1px solid rgba(212,175,55,0.45);
          border-radius: 1rem;
        }
      `}),i&&t.jsx("section",{style:{width:"100%",height:"55vh",overflow:"hidden"},children:t.jsx("img",{src:i,alt:a,style:{width:"100%",height:"100%",objectFit:"cover"}})}),t.jsxs("section",{style:{maxWidth:"1100px",margin:"0 auto",textAlign:"center",padding:"3rem 2rem"},children:[t.jsx("h1",{style:{fontSize:"1.9rem",marginTop:"3rem",marginBottom:"4rem"},children:a}),t.jsxs("p",{children:[l," • ",d]}),o&&t.jsx("span",{style:{border:"1px solid rgba(212,175,55,0.45)",padding:"0.3rem 1rem"},children:o})]}),t.jsx("article",{style:{maxWidth:"1100px",margin:"0 auto",padding:"2rem"},children:t.jsx("div",{className:"post-box",dangerouslySetInnerHTML:{__html:m}})})]})}export{v as default};
//# sourceMappingURL=MensagemPastoral-CvjnaMe6.js.map
