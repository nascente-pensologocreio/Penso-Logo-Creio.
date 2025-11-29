import{j as o}from"./index-uLl4F_Hm.js";import{r as u,d as T,e as E}from"./react-vendor-Bx3nAkti.js";import{E as C}from"./EditorialSwap-CNz9k6wO.js";function y({tags:t,onSelectTag:i}){const e=u.useRef(null),c=u.useRef(null),[_,r]=u.useState([]),d=160,m=2*d;u.useEffect(()=>{r([...t,...t,...t])},[t]);const b=()=>{e.current&&e.current.scrollBy({left:-m,behavior:"smooth"})},f=()=>{e.current&&e.current.scrollBy({left:m,behavior:"smooth"})};u.useEffect(()=>{const n=e.current;if(!n)return;const l=()=>{const s=n.scrollLeft,g=n.scrollWidth,p=n.clientWidth;s+p>=g-100?n.scrollLeft=s-t.length*(d+24):s<=100&&(n.scrollLeft=t.length*(d+24))};return n.addEventListener("scroll",l),()=>n.removeEventListener("scroll",l)},[t.length]);const x=(n,l,s)=>{var p;const g=(p=e.current)==null?void 0:p.querySelectorAll("[data-card]");g&&g.forEach((a,v)=>{const h=a.querySelector("[data-card-inner]");if(l)if(v===n)a.style.transform="scale(1.5) translateY(-40px) perspective(1200px) rotateX(5deg)",a.style.zIndex="50",h.style.transform="rotateY(0deg) rotateX(0deg)",a.style.filter="drop-shadow(0 20px 40px rgba(212, 175, 55, 0.6))";else if(v===n-1||v===n+1){const L=v===n-1?15:-15;a.style.transform=`scale(0.8) translateY(15px) rotateY(${L}deg) perspective(1200px)`,a.style.opacity="0.5",a.style.zIndex="30",a.style.filter="drop-shadow(0 10px 20px rgba(0, 0, 0, 0.8))"}else a.style.transform="scale(0.7) translateY(30px) rotateY(30deg) perspective(1200px)",a.style.opacity="0.2",a.style.zIndex="20",a.style.filter="blur(2px) drop-shadow(0 5px 10px rgba(0, 0, 0, 0.9))";else a.style.transform="scale(1) translateY(0px) rotateY(0deg) perspective(1200px)",a.style.opacity="1",a.style.zIndex="40",a.style.filter="drop-shadow(0 8px 16px rgba(212, 175, 55, 0.3))",h.style.transform="rotateY(0deg) rotateX(0deg)"})},k=(n,l)=>{const s=n.currentTarget.querySelector("[data-card-inner]");if(!s)return;const g=n.currentTarget.getBoundingClientRect(),p=(n.clientX-g.left)/g.width,v=((n.clientY-g.top)/g.height-.5)*15,h=(p-.5)*-15;s.style.transform=`rotateX(${v}deg) rotateY(${h}deg)`},S=n=>{const l=n.currentTarget.querySelector("[data-card-inner]");l&&(l.style.transform="rotateX(0deg) rotateY(0deg)")};return o.jsxs("div",{className:"relative w-full py-16 flex justify-center",children:[o.jsxs("div",{className:"w-[85%] max-w-3xl relative flex items-center justify-center gap-6",children:[o.jsx("button",{type:"button",onClick:b,"aria-label":"Anterior",className:`flex-shrink-0 w-13 h-13 rounded-full
                     bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700
                     hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600
                     flex items-center justify-center
                     shadow-xl hover:shadow-2xl transition-all duration-300
                     border border-yellow-200/60
                     active:scale-90 hover:scale-110
                     hover:shadow-yellow-600/60`,children:o.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",children:o.jsx("path",{d:"M15 18L9 12L15 6",stroke:"black",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"})})}),o.jsx("div",{ref:c,className:"flex-1 overflow-hidden rounded-xl",style:{perspective:"1200px",height:"300px",background:"linear-gradient(135deg, rgba(0,0,0,0.3), rgba(212,175,55,0.05))",boxShadow:"inset 0 0 30px rgba(0,0,0,0.4), 0 0 40px rgba(212,175,55,0.2)",border:"1px solid rgba(212,175,55,0.3)"},children:o.jsx("div",{ref:e,className:"flex gap-6 h-full scroll-smooth overflow-x-auto px-4",style:{scrollbarWidth:"none",msOverflowStyle:"none",alignItems:"center"},children:_.map((n,l)=>o.jsx("div",{"data-card":!0,className:`min-w-[160px] max-w-[160px] h-56
                           rounded-xl cursor-pointer flex-shrink-0
                           transition-all duration-500 ease-out hover:z-50`,onClick:()=>typeof i=="function"&&i(n),onMouseEnter:s=>x(l,!0),onMouseLeave:s=>{S(s),x(l,!1)},onMouseMove:s=>k(s),style:{transformStyle:"preserve-3d",zIndex:40,filter:"drop-shadow(0 8px 16px rgba(212, 175, 55, 0.3))"},children:o.jsxs("div",{"data-card-inner":!0,className:"w-full h-full rounded-xl overflow-hidden",style:{transformStyle:"preserve-3d",transition:"transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)",background:"linear-gradient(135deg, rgba(20,20,20,0.8), rgba(40,40,40,0.8))",border:"2px solid rgba(212,175,55,0.4)"},children:[o.jsx("img",{src:`/temas-da-vida/tag-${n}.jpg`,alt:n,className:"h-40 w-full object-cover rounded-t-lg"}),o.jsx("div",{className:"p-4 text-center bg-gradient-to-t from-black/80 to-transparent",children:o.jsx("p",{className:"text-yellow-300 font-serif text-sm font-bold tracking-wide",children:n.charAt(0).toUpperCase()+n.slice(1)})})]})},l))})}),o.jsx("button",{type:"button",onClick:f,"aria-label":"Próximo",className:`flex-shrink-0 w-13 h-13 rounded-full
                     bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700
                     hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600
                     flex items-center justify-center
                     shadow-xl hover:shadow-2xl transition-all duration-300
                     border border-yellow-200/60
                     active:scale-90 hover:scale-110
                     hover:shadow-yellow-600/60`,children:o.jsx("svg",{width:"22",height:"22",viewBox:"0 0 24 24",fill:"none",children:o.jsx("path",{d:"M9 6L15 12L9 18",stroke:"black",strokeWidth:"3",strokeLinecap:"round",strokeLinejoin:"round"})})})]}),o.jsx("style",{children:"div::-webkit-scrollbar { display: none; }"})]})}function Y({titulo:t,subtitulo:i,imagem:e,children:c}){return o.jsxs("div",{style:{display:"grid",gridTemplateColumns:"1fr minmax(280px, 380px)",gap:"2rem",width:"100%",maxWidth:"1280px",margin:"0 auto"},children:[o.jsxs("div",{style:{width:"100%"},children:[o.jsx("h1",{style:{color:"#D4AF37",fontFamily:"'Playfair Display', serif",fontSize:"2rem",marginBottom:"1rem"},children:t}),i&&o.jsx("p",{style:{color:"#bbb",fontSize:"1rem",marginTop:"-0.5rem",marginBottom:"2rem"},children:i}),c]}),o.jsxs("aside",{style:{width:"100%",background:"rgba(0, 0, 0, 0.25)",border:"1px solid rgba(212,175,55,0.2)",borderRadius:"12px",padding:"1.75rem",height:"fit-content"},children:[e&&o.jsx("img",{src:e,alt:t,style:{width:"100%",objectFit:"cover",borderRadius:"8px",marginBottom:"1rem"}}),o.jsx("h3",{style:{color:"#D4AF37",fontFamily:"'Playfair Display', serif",fontSize:"1.25rem",marginBottom:"1rem"},children:"Conteúdos Relacionados"}),o.jsx("p",{style:{color:"#ccc",lineHeight:1.6},children:"Aqui você pode incluir recomendações, notas adicionais, links úteis ou qualquer conteúdo complementar."})]})]})}const B=` 
---
titulo: ""
tipo: "devocional"
---

`,D=` 
---
titulo: ""
tipo: "devocional"
---

`,N=` 
---
titulo: ""
tipo: "devocional"
---

`,z=` 
---
titulo: ""
tipo: "devocional"
---

`,A=` 
---
titulo: ""
tipo: "devocional"
---

`,W=` 
---
titulo: ""
tipo: "devocional"
---

`,$=` 
---
titulo: ""
tipo: "devocional"
---

`,M=` 
---
titulo: ""
tipo: "devocional"
---

`,R=` 
---
titulo: ""
tipo: "devocional"
---

`,q=` 
---
titulo: ""
tipo: "devocional"
---

`,F=` 
---
titulo: ""
tipo: "devocional"
---

`,O=` 
---
titulo: ""
tipo: "devocional"
---

`,I=` 
---
titulo: ""
tipo: "devocional"
---

`,X=` 
---
titulo: ""
tipo: "devocional"
---

`,P=` 
---
titulo: ""
tipo: "devocional"
---

`,H=` 
---
titulo: ""
tipo: "devocional"
---

`,U=` 
---
titulo: ""
tipo: "devocional"
---

`,G=` 
---
titulo: ""
tipo: "devocional"
---

`,V=` 
---
titulo: ""
tipo: "devocional"
---

`,J=` 
---
titulo: ""
tipo: "devocional"
---

`,K=` ---
titulo: ""
tipo: "oracao"
---


`,Q=` ---
titulo: ""
tipo: "oracao"
---


`,Z=` ---
titulo: ""
tipo: "oracao"
---


`,oo=` ---
titulo: ""
tipo: "oracao"
---


`,to=` ---
titulo: ""
tipo: "oracao"
---


`,no=` ---
titulo: ""
tipo: "oracao"
---


`,eo=` ---
titulo: ""
tipo: "oracao"
---


`,ao=` ---
titulo: ""
tipo: "oracao"
---


`,io=` ---
titulo: ""
tipo: "oracao"
---


`,ro=` ---
titulo: ""
tipo: "oracao"
---


`,lo=` ---
titulo: ""
tipo: "oracao"
---


`,so=` ---
titulo: ""
tipo: "oracao"
---


`,co=` ---
titulo: ""
tipo: "oracao"
---


`,_o=` ---
titulo: ""
tipo: "oracao"
---


`,go=` ---
titulo: ""
tipo: "oracao"
---


`,uo=` ---
titulo: ""
tipo: "oracao"
---


`,mo=` ---
titulo: ""
tipo: "oracao"
---


`,po=` ---
titulo: ""
tipo: "oracao"
---


`,vo=` ---
titulo: ""
tipo: "oracao"
---


`,fo=` ---
titulo: ""
tipo: "oracao"
---


`,ho=Object.assign({"../content/tags/amor/devocional.md":B,"../content/tags/ansiedade/devocional.md":D,"../content/tags/batalha/devocional.md":N,"../content/tags/depressao/devocional.md":z,"../content/tags/desemprego/devocional.md":A,"../content/tags/dividas/devocional.md":W,"../content/tags/doenca-morte/devocional.md":$,"../content/tags/duvida/devocional.md":M,"../content/tags/esperanca/devocional.md":R,"../content/tags/frustracao/devocional.md":q,"../content/tags/futuro/devocional.md":F,"../content/tags/insonia/devocional.md":O,"../content/tags/luto/devocional.md":I,"../content/tags/medo/devocional.md":X,"../content/tags/mudanca/devocional.md":P,"../content/tags/perdao/devocional.md":H,"../content/tags/separacao/devocional.md":U,"../content/tags/solidao/devocional.md":G,"../content/tags/sonho/devocional.md":V,"../content/tags/vicio/devocional.md":J}),bo=Object.assign({"../content/tags/amor/oracao.md":K,"../content/tags/ansiedade/oracao.md":Q,"../content/tags/batalha/oracao.md":Z,"../content/tags/depressao/oracao.md":oo,"../content/tags/desemprego/oracao.md":to,"../content/tags/dividas/oracao.md":no,"../content/tags/doenca-morte/oracao.md":eo,"../content/tags/duvida/oracao.md":ao,"../content/tags/esperanca/oracao.md":io,"../content/tags/frustracao/oracao.md":ro,"../content/tags/futuro/oracao.md":lo,"../content/tags/insonia/oracao.md":so,"../content/tags/luto/oracao.md":co,"../content/tags/medo/oracao.md":_o,"../content/tags/mudanca/oracao.md":go,"../content/tags/perdao/oracao.md":uo,"../content/tags/separacao/oracao.md":mo,"../content/tags/solidao/oracao.md":po,"../content/tags/sonho/oracao.md":vo,"../content/tags/vicio/oracao.md":fo});function w(t){if(typeof t!="string")return{data:{},content:""};const i=t.trimStart();if(!i.startsWith("---"))return{data:{},content:t};const e=i.indexOf(`
---`,3);if(e===-1)return{data:{},content:t};const c=i.slice(3,e).trim(),_=i.slice(e+4).trimStart(),r={};return c.split(`
`).forEach(d=>{const m=d.indexOf(":");if(m===-1)return;const b=d.slice(0,m).trim();let f=d.slice(m+1).trim();f=f.replace(/^"(.*)"$/,"$1"),r[b]=f}),{data:r,content:_}}function xo(t){let i=null,e=null;for(const[c,_]of Object.entries(ho))if(c.includes(`/${t}/`)){const{data:r,content:d}=w(_);i={...r,content:d}}for(const[c,_]of Object.entries(bo))if(c.includes(`/${t}/`)){const{data:r,content:d}=w(_);e={...r,content:d}}return{devocional:i,oracao:e}}const j=["amor","ansiedade","batalha","depressao","desemprego","dividas","doenca-morte","duvida","esperanca","frustracao","futuro","insonia","luto","medo","mudanca","perdao","separacao","solidao","sonho","vicio"];function ko(){const{tag:t}=T(),i=E(),[e,c]=u.useState({devocional:null,oracao:null});u.useEffect(()=>{if(!t)return;const r=xo(t);c(r),window.scrollTo(0,0)},[t]);const _=r=>{i(`/temas-da-vida/${r}`)};return t?o.jsxs("main",{style:{width:"100%",minHeight:"100vh",backgroundColor:"#010b0a",paddingBottom:"4rem"},children:[o.jsx(y,{tags:j,onSelectTag:_}),o.jsx("section",{style:{maxWidth:"1280px",margin:"0 auto",padding:"2rem"},children:o.jsx(Y,{titulo:t.charAt(0).toUpperCase()+t.slice(1),subtitulo:`Devoção e oração sobre ${t}`,imagem:`/temas-da-vida/tag-${t}.jpg`,children:o.jsx(C,{devocional:e.devocional,oracao:e.oracao})})})]}):o.jsxs("main",{style:{width:"100%",minHeight:"100vh",backgroundColor:"#010b0a",paddingBottom:"4rem"},children:[o.jsx(y,{tags:j,onSelectTag:_}),o.jsx("div",{style:{textAlign:"center",paddingTop:"4rem",color:"#D4AF37",fontSize:"1.2rem",fontFamily:"'Playfair Display', serif"},children:"Selecione uma tag acima para começar"})]})}export{ko as default};
//# sourceMappingURL=TemasDaVida-CyqCaDRO.js.map
