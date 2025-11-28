// src/pages/Oracoes.jsx
import React from "react";
import ConteudoDoDia from "../components/ConteudoDoDia.jsx";
import EditorialLayout from "../layouts/EditorialLayout.jsx";
import "../styles/editorial-grid.css";

export default function Oracoes() {
  return (
    <EditorialLayout titulo="Oração">
      <ConteudoDoDia tipo="oracao" titulo="Oração" />
    </EditorialLayout>
  );
}
