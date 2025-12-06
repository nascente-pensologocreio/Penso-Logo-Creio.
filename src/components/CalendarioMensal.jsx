// src/components/CalendarioMensal.jsx
import React, { useMemo, useState } from "react";

const DIAS_SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

// Paleta
// #051F20 (fundo profundo)
// #0B2B26 / #163832 / #235347 (variações verdes)
// #8EB69B / #DAF1DE (realces)

function formatKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function CalendarioMensal({
  diasComConteudo = [],
  onSelectDia,
  dataInicial,
}) {
  const [referencia, setReferencia] = useState(
    () => dataInicial || new Date()
  );
  const [selecionadoKey, setSelecionadoKey] = useState(null);

  const diasSet = useMemo(
    () => new Set(diasComConteudo),
    [diasComConteudo]
  );

  const ano = referencia.getFullYear();
  const mes = referencia.getMonth();

  const primeiroDiaMes = new Date(ano, mes, 1);
  const ultimoDiaMes = new Date(ano, mes + 1, 0);
  const offsetSemana = primeiroDiaMes.getDay();

  const celulas = [];
  for (let i = 0; i < offsetSemana; i++) {
    celulas.push(null);
  }
  for (let dia = 1; dia <= ultimoDiaMes.getDate(); dia++) {
    const data = new Date(ano, mes, dia);
    const key = formatKey(data);
    celulas.push({
      dia,
      data,
      key,
      temConteudo: diasSet.has(key),
    });
  }

  function mudarMes(delta) {
    const novo = new Date(ano, mes + delta, 1);
    setReferencia(novo);
  }

  function handleClickDia(cel) {
    if (!cel || !cel.temConteudo) return;
    setSelecionadoKey(cel.key);
    if (onSelectDia) onSelectDia(cel.data, cel.key);
  }

  const nomeMes = referencia.toLocaleDateString("pt-BR", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className="inline-block mb-6 rounded-3xl shadow-xl border calendar-appear"
      style={{
        padding: "1.25rem 1.75rem",
        background:
          "linear-gradient(145deg, #051F20 0%, #0B2B26 35%, #163832 100%)",
        borderColor: "#235347",
        minWidth: "320px",
      }}
    >
      {/* Cabeçalho */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          className="flex items-center justify-center rounded-full calendar-nav-btn"
          style={{
            width: "2rem",
            height: "2rem",
            backgroundColor: "#0B2B26",
            color: "#DAF1DE",
            fontSize: "1.15rem",
          }}
          onClick={() => mudarMes(-1)}
        >
          ‹
        </button>

        <h3
          className="text-center font-semibold uppercase tracking-[0.18em]"
          style={{
            fontSize: "0.9rem",
            padding: "0.5rem 1.25rem",
            borderRadius: "999px",
            background:
              "linear-gradient(90deg, rgba(218,241,222,0.18), rgba(142,182,155,0.08))",
            color: "#DAF1DE",
          }}
        >
          {nomeMes}
        </h3>

        <button
          type="button"
          className="flex items-center justify-center rounded-full calendar-nav-btn"
          style={{
            width: "2rem",
            height: "2rem",
            backgroundColor: "#0B2B26",
            color: "#DAF1DE",
            fontSize: "1.15rem",
          }}
          onClick={() => mudarMes(1)}
        >
          ›
        </button>
      </div>

      {/* Cabeçalho dos dias da semana */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {DIAS_SEMANA.map((d) => (
          <div
            key={d}
            className="font-semibold"
            style={{
              fontSize: "0.8rem",
              color: "#8EB69B",
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Grade de dias */}
      <div className="grid grid-cols-7 gap-1 text-center">
        {celulas.map((cel, idx) => {
          if (!cel) {
            return <div key={`vazio-${idx}`} style={{ height: "2.1rem" }} />;
          }

          const isSelecionado = cel.key === selecionadoKey;
          const isComConteudo = cel.temConteudo;

          const baseClasses =
            "mx-auto flex items-center justify-center rounded-full transition-colors duration-150";

          let classes = baseClasses;
          let style = {
            width: "2.1rem",
            height: "2.1rem",
            fontSize: "0.85rem",
          };

          if (!isComConteudo) {
            classes += " cursor-default";
            style = {
              ...style,
              color: "#4b6b63",
              backgroundColor: "transparent",
            };
          } else if (isSelecionado) {
            // Dia selecionado com brilho suave
            classes +=
              " cursor-pointer font-semibold shadow-md animate-pulse-glow";
            style = {
              ...style,
              color: "#051F20",
              background:
                "radial-gradient(circle at 30% 20%, #DAF1DE, #8EB69B)",
            };
          } else {
            classes += " cursor-pointer";
            style = {
              ...style,
              color: "#DAF1DE",
              backgroundColor: "#163832",
              boxShadow: "0 0 0 1px rgba(142,182,155,0.5)",
            };
          }

          return (
            <button
              key={cel.key}
              type="button"
              className={classes}
              style={style}
              onClick={() => handleClickDia(cel)}
            >
              {cel.dia}
            </button>
          );
        })}
      </div>
    </div>
  );
}
