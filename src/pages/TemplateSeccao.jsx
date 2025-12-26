import React from "react";

export default function TemplateSeccao({ titulo, versiculo, referencia, conteudo }) {
  return (
    <section
      className="min-h-screen px-6 md:px-16 py-16 text-white relative overflow-hidden"
      style={{
        background: "radial-gradient(circle at top, rgba(0,25,15,0.95) 0%, rgba(0,0,0,0.95) 70%)",
        boxShadow: "inset 0 0 80px rgba(212,175,55,0.15)",
        backdropFilter: "blur(4px)",
      }}
    >
      <div
        className="absolute inset-0 opacity-20 animate-bgGlow pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 40% 30%, rgba(212,175,55,0.3), transparent 70%)",
        }}
      ></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1
          className="text-3xl md:text-4xl font-bold text-center mb-4"
          style={{
            color: "#FFD700",
            textShadow:
              "0 0 8px rgba(255,215,0,0.8), 0 0 18px rgba(255,240,180,0.6)",
            animation: "pulseTitle 4s ease-in-out infinite",
            fontFamily: "'Cinzel', serif",
          }}
        >
          {titulo}
        </h1>

        <p
          className="italic text-center mb-12"
          style={{
            color: "#f5f5f5",
            textShadow: "0 0 6px rgba(255,215,0,0.4)",
            animation: "fadeVerse 8s ease-in-out infinite alternate",
          }}
        >
          “{versiculo}”
          <br />
          <span className="text-sm italic text-gray-300">({referencia})</span>
        </p>

        <article
          className="p-6 md:p-10 rounded-2xl relative group"
          style={{
            background:
              "linear-gradient(145deg, rgba(10,10,10,0.8), rgba(25,25,25,0.9))",
            border: "1px solid rgba(212,175,55,0.25)",
            boxShadow:
              "0 0 25px rgba(212,175,55,0.15), inset 0 0 10px rgba(255,215,0,0.05)",
            transition: "transform 0.5s ease, box-shadow 0.5s ease",
          }}
        >
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"
            style={{
              background:
                "radial-gradient(circle at center, rgba(212,175,55,0.1), transparent 70%)",
              filter: "blur(12px)",
              animation: "shineMove 6s linear infinite",
            }}
          ></div>

          {conteudo}

          <p className="italic text-center mt-10 text-sm text-gray-200">
            “Caminhar com a Palavra é caminhar com Deus.”
          </p>
        </article>
      </div>

      <style>{`
        @keyframes bgGlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animate-bgGlow {
          background-size: 200% 200%;
          animation: bgGlow 18s linear infinite;
        }

        @keyframes pulseTitle {
          0%, 100% {
            text-shadow: 0 0 8px rgba(255,215,0,0.8), 0 0 18px rgba(255,240,180,0.6);
          }
          50% {
            text-shadow: 0 0 16px rgba(255,215,0,1), 0 0 36px rgba(255,255,200,0.8);
          }
        }

        @keyframes fadeVerse {
          from { opacity: 0.8; transform: translateY(0); }
          to { opacity: 1; transform: translateY(-4px); }
        }

        @keyframes verseGlow {
          0%, 100% {
            box-shadow: 0 0 12px rgba(255,215,0,0.3);
          }
          50% {
            box-shadow: 0 0 24px rgba(255,215,0,0.6);
          }
        }

        @keyframes shineMove {
          0% { opacity: 0.15; transform: translateX(-20%) scale(1); }
          50% { opacity: 0.35; transform: translateX(20%) scale(1.05); }
          100% { opacity: 0.15; transform: translateX(-20%) scale(1); }
        }

        article:hover {
          transform: scale(1.015);
          box-shadow:
            0 0 35px rgba(212,175,55,0.25),
            inset 0 0 12px rgba(255,215,0,0.05);
        }
      `}</style>
    </section>
  );
}
