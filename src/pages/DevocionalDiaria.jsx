// src/pages/DevocionalDiaria.jsx
import React from "react";
import ConteudoDoDia from "../components/ConteudoDoDia.jsx";
import EditorialLayout from "../layouts/EditorialLayout.jsx";

import "../styles/editorial-grid.css";

export default function DevocionalDiaria() {
  return (
    <EditorialLayout titulo="Devocional Diária">
      
      <div className="editorial-centro">
        <ConteudoDoDia
          tipo="devocional"
          titulo="Devocional do Dia"
        />
      </div>

    </EditorialLayout>
  );
}
