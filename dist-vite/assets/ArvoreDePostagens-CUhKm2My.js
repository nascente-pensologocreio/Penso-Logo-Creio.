import{j as t}from"./index-uLl4F_Hm.js";import{r as g}from"./react-vendor-Bx3nAkti.js";async function w(){const p=Object.assign({}),f=await Promise.all(Object.entries(p).map(async([,s])=>{const r=await s();return r.default||r})),x=["janeiro","fevereiro","março","abril","maio","junho","julho","agosto","setembro","outubro","novembro","dezembro"],n={};return f.forEach(s=>{if(!s||!s.data||!s.titulo)return;const r=new Date(s.data);if(Number.isNaN(r.getTime()))return;const o=r.getFullYear(),i=x[r.getMonth()],c=`${r.getDate()} de ${i}`;n[o]||(n[o]={}),n[o][i]||(n[o][i]={}),n[o][i][c]||(n[o][i][c]=[]),n[o][i][c].push(s)}),Object.keys(n).sort((s,r)=>r-s).reduce((s,r)=>{const o=n[r],i=Object.keys(o).sort((b,c)=>x.indexOf(c)-x.indexOf(b));return s[r]=i.reduce((b,c)=>{const e=o[c],l=Object.keys(e).sort((a,d)=>parseInt(d)-parseInt(a)).reduce((a,d)=>(a[d]=e[d].sort((m,j)=>new Date(j.data)-new Date(m.data)),a),{});return b[c]=l,b},{}),s},{})}function D(){const[p,f]=g.useState({}),[x,n]=g.useState(null),[h,s]=g.useState({}),[r,o]=g.useState({});g.useEffect(()=>{(async()=>{const l=await w();f(l)})()},[]);const i=e=>n(x===e?null:e),b=(e,l)=>s(a=>({...a,[e]:a[e]===l?null:l})),c=(e,l,a)=>o(d=>({...d,[`${e}-${l}`]:d[`${e}-${l}`]===a?null:a}));return t.jsxs("section",{className:"relative z-30 container mx-auto px-6 mt-48 mb-48 text-white",style:{fontFamily:"'Playfair Display', serif",letterSpacing:"0.6px"},children:[t.jsx("div",{className:"w-full h-[1px] mb-12",style:{background:"linear-gradient(to right, transparent, rgba(212,175,55,0.8), transparent)",boxShadow:"0 0 15px rgba(212,175,55,0.5)"}}),t.jsx("h2",{className:"text-5xl md:text-6xl text-center font-bold mb-16 animate-fadeIn",style:{color:"#D4AF37",textShadow:"0 0 25px rgba(212,175,55,0.9), 0 0 10px rgba(255,255,255,0.3)"},children:"Calendário de Postagens"}),t.jsx("div",{className:"rounded-3xl border border-[#D4AF37]/50 bg-gradient-to-b from-black/80 via-[#0a0a0a]/90 to-black/80 shadow-2xl backdrop-blur-md p-8",style:{boxShadow:"0 0 25px rgba(212,175,55,0.25), inset 0 0 10px rgba(212,175,55,0.12)"},children:Object.keys(p).length===0?t.jsx("p",{className:"text-center text-gray-400 animate-pulse",children:"Carregando postagens..."}):t.jsx("div",{className:"space-y-8 max-w-5xl mx-auto",children:Object.entries(p).map(([e,l])=>t.jsxs("div",{className:"rounded-xl border border-[#D4AF37]/60 bg-gradient-to-r from-black via-[#101010] to-black overflow-hidden transition-all duration-500",children:[t.jsxs("button",{onClick:()=>i(e),className:"w-full px-6 py-5 flex justify-between items-center categoria-button",children:[t.jsx("span",{className:"capitalize font-bold tracking-wide text-categoria-titulo",style:{fontSize:"1.25rem"},children:e}),t.jsx("span",{className:"text-[#D4AF37] text-2xl transition-transform duration-300",style:{transform:x===e?"rotate(180deg)":"rotate(0)"},children:"▼"})]}),x===e&&t.jsx("div",{className:"px-6 pb-6 space-y-6 animate-fadeIn",children:Object.entries(l).map(([a,d])=>t.jsxs("div",{children:[t.jsxs("button",{onClick:()=>b(e,a),className:"w-full text-left py-3 pl-4 flex justify-between items-center categoria-button",children:[t.jsx("span",{className:"capitalize font-semibold text-categoria-titulo",style:{fontSize:"1.1rem"},children:a}),t.jsx("span",{className:"text-[#D4AF37] text-lg transition-transform duration-300",style:{transform:h[e]===a?"rotate(180deg)":"rotate(0)"},children:"▼"})]}),h[e]===a&&t.jsx("div",{className:"pl-8 pt-2 pb-4",children:Object.entries(d).map(([m,j])=>{const y=`${e}-${a}`;return t.jsxs("div",{className:"mb-4",children:[t.jsxs("button",{onClick:()=>c(e,a,m),className:"w-full text-left py-2 pl-2 flex justify-between items-center categoria-button",children:[t.jsx("span",{className:"font-medium text-categoria-titulo",style:{fontSize:"1rem"},children:m}),t.jsx("span",{className:"text-[#D4AF37] text-base transition-transform duration-300",style:{transform:r[y]===m?"rotate(180deg)":"rotate(0)"},children:"▼"})]}),r[y]===m&&t.jsx("ul",{className:"mt-2 pl-6 border-l-2 border-[#D4AF37]/50 space-y-2",children:j.map(u=>t.jsx("li",{className:"list-disc",children:t.jsxs("a",{href:`#post-${u.id}`,className:"text-lg block hover:translate-x-2 transition-transform duration-300 link-post",children:[t.jsx("span",{className:"font-semibold text-[#D4AF37]",children:u.categoria?`${u.categoria} – `:""}),u.titulo]})},u.id))})]},m)})})]},a))})]},e))})}),t.jsx("div",{className:"w-full h-[120px] mt-12",style:{background:"linear-gradient(to right, transparent, rgba(212,175,55,0.8), transparent)",boxShadow:"0 0 15px rgba(212,175,55,0.45)"}}),t.jsx("style",{children:`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.5s ease-in-out; }

        .categoria-button {
          background-color: rgba(0, 0, 0, 0.85);
          transition: background-color 0.25s ease;
        }
        .categoria-button:hover {
          background-color: rgba(212,175,55,0.08);
        }

        .text-categoria-titulo {
          color: #FFFFFF;
          text-shadow: 0 0 8px rgba(255,255,255,0.8), 0 0 18px rgba(212,175,55,0.45);
          transition: all 0.25s ease;
        }
        .categoria-button:hover .text-categoria-titulo {
          color: #D4AF37;
          text-shadow: 0 0 12px #D4AF37, 0 0 30px rgba(212,175,55,0.8);
        }

        .link-post {
          color: #EDEDED;
          text-shadow: 0 0 6px rgba(255,255,255,0.08), 0 0 3px rgba(212,175,55,0.18);
        }
        .link-post:hover {
          color: #D4AF37;
          text-shadow: 0 0 10px #D4AF37, 0 0 6px rgba(255,255,255,0.2);
        }
      `})]})}export{D as default};
//# sourceMappingURL=ArvoreDePostagens-CUhKm2My.js.map
