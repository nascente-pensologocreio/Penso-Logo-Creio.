import React, { useRef, useEffect, useState } from "react";

export default function CarrosselTags({ tags, onSelectTag }) {
  const faixa = useRef(null);
  const containerRef = useRef(null);
  const [displayTags, setDisplayTags] = useState([]);

  const CARD_WIDTH = 160;
  const STEP = 2 * CARD_WIDTH;

  useEffect(() => {
    setDisplayTags([...tags, ...tags, ...tags]);
  }, [tags]);

  const esquerda = () => {
    if (!faixa.current) return;
    faixa.current.scrollBy({ left: -STEP, behavior: "smooth" });
  };

  const direita = () => {
    if (!faixa.current) return;
    faixa.current.scrollBy({ left: STEP, behavior: "smooth" });
  };

  useEffect(() => {
    const faixaElement = faixa.current;
    if (!faixaElement) return;

    const handleScroll = () => {
      const scrollLeft = faixaElement.scrollLeft;
      const scrollWidth = faixaElement.scrollWidth;
      const clientWidth = faixaElement.clientWidth;

      if (scrollLeft + clientWidth >= scrollWidth - 100) {
        faixaElement.scrollLeft = scrollLeft - tags.length * (CARD_WIDTH + 24);
      } else if (scrollLeft <= 100) {
        faixaElement.scrollLeft = tags.length * (CARD_WIDTH + 24);
      }
    };

    faixaElement.addEventListener("scroll", handleScroll);
    return () => faixaElement.removeEventListener("scroll", handleScroll);
  }, [tags.length]);

  const handleCardHover = (index, isHovering, event) => {
    const cards = faixa.current?.querySelectorAll('[data-card]');
    if (!cards) return;

    cards.forEach((card, i) => {
      const cardElement = card.querySelector('[data-card-inner]');
      
      if (isHovering) {
        if (i === index) {
          card.style.transform = "scale(1.5) translateY(-40px) perspective(1200px) rotateX(5deg)";
          card.style.zIndex = "50";
          cardElement.style.transform = "rotateY(0deg) rotateX(0deg)";
          card.style.filter = "drop-shadow(0 20px 40px rgba(212, 175, 55, 0.6))";
        } else if (i === index - 1 || i === index + 1) {
          const direction = i === index - 1 ? 15 : -15;
          card.style.transform = `scale(0.8) translateY(15px) rotateY(${direction}deg) perspective(1200px)`;
          card.style.opacity = "0.5";
          card.style.zIndex = "30";
          card.style.filter = "drop-shadow(0 10px 20px rgba(0, 0, 0, 0.8))";
        } else {
          card.style.transform = "scale(0.7) translateY(30px) rotateY(30deg) perspective(1200px)";
          card.style.opacity = "0.2";
          card.style.zIndex = "20";
          card.style.filter = "blur(2px) drop-shadow(0 5px 10px rgba(0, 0, 0, 0.9))";
        }
      } else {
        card.style.transform = "scale(1) translateY(0px) rotateY(0deg) perspective(1200px)";
        card.style.opacity = "1";
        card.style.zIndex = "40";
        card.style.filter = "drop-shadow(0 8px 16px rgba(212, 175, 55, 0.3))";
        cardElement.style.transform = "rotateY(0deg) rotateX(0deg)";
      }
    });
  };

  const handleMouseMove = (e, index) => {
    const card = e.currentTarget.querySelector('[data-card-inner]');
    if (!card) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    const rotateX = (y - 0.5) * 15;
    const rotateY = (x - 0.5) * -15;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = (e) => {
    const card = e.currentTarget.querySelector('[data-card-inner]');
    if (card) {
      card.style.transform = "rotateX(0deg) rotateY(0deg)";
    }
  };

  return (
    <div className="relative w-full py-16 flex justify-center">

      <div className="w-[85%] max-w-3xl relative flex items-center justify-center gap-6">

        {/* BOTÃO ESQUERDA */}
        <button
          type="button"
          onClick={esquerda}
          aria-label="Anterior"
          className="flex-shrink-0 w-13 h-13 rounded-full
                     bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700
                     hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600
                     flex items-center justify-center
                     shadow-xl hover:shadow-2xl transition-all duration-300
                     border border-yellow-200/60
                     active:scale-90 hover:scale-110
                     hover:shadow-yellow-600/60"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M15 18L9 12L15 6" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* WRAPPER */}
        <div
          ref={containerRef}
          className="flex-1 overflow-hidden rounded-xl"
          style={{
            perspective: "1200px",
            height: "300px",
            background: "linear-gradient(135deg, rgba(0,0,0,0.3), rgba(212,175,55,0.05))",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.4), 0 0 40px rgba(212,175,55,0.2)",
            border: "1px solid rgba(212,175,55,0.3)",
          }}
        >
          <div
            ref={faixa}
            className="flex gap-6 h-full scroll-smooth overflow-x-auto px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none", alignItems: "center" }}
          >
            {displayTags.map((tag, index) => (
              <div
                key={index}
                data-card
                className="min-w-[160px] max-w-[160px] h-56
                           rounded-xl cursor-pointer flex-shrink-0
                           transition-all duration-500 ease-out hover:z-50"
                onClick={() => typeof onSelectTag === "function" && onSelectTag(tag)}
                onMouseEnter={(e) => handleCardHover(index, true, e)}
                onMouseLeave={(e) => { handleMouseLeave(e); handleCardHover(index, false, e); }}
                onMouseMove={(e) => handleMouseMove(e, index)}
                style={{
                  transformStyle: "preserve-3d",
                  zIndex: 40,
                  filter: "drop-shadow(0 8px 16px rgba(212, 175, 55, 0.3))",
                }}
              >
                <div
                  data-card-inner
                  className="w-full h-full rounded-xl overflow-hidden"
                  style={{
                    transformStyle: "preserve-3d",
                    transition: "transform 0.6s cubic-bezier(0.23, 1, 0.320, 1)",
                    background: "linear-gradient(135deg, rgba(20,20,20,0.8), rgba(40,40,40,0.8))",
                    border: "2px solid rgba(212,175,55,0.4)",
                  }}
                >
                  {/* AQUI ESTÁ O PONTO CHAVE DO Firebase */}
                  <img
                    src={`/temas-da-vida/tag-${tag}.jpg`}
                    alt={tag}
                    className="h-40 w-full object-cover rounded-t-lg"
                  />

                  <div className="p-4 text-center bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-yellow-300 font-serif text-sm font-bold tracking-wide">
                      {tag.charAt(0).toUpperCase() + tag.slice(1)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTÃO DIREITA */}
        <button
          type="button"
          onClick={direita}
          aria-label="Próximo"
          className="flex-shrink-0 w-13 h-13 rounded-full
                     bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-700
                     hover:from-yellow-300 hover:via-yellow-400 hover:to-yellow-600
                     flex items-center justify-center
                     shadow-xl hover:shadow-2xl transition-all duration-300
                     border border-yellow-200/60
                     active:scale-90 hover:scale-110
                     hover:shadow-yellow-600/60"
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M9 6L15 12L9 18" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

      </div>

      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
}
