import React from "react";

function Inicio() {
  return (
    <div style={{ maxWidth: 500, margin: "24px auto", padding: 16, background: "#f4f7fb", borderRadius: 8, fontSize: 16 }}>
      <b>Como usar:</b>
      <ul style={{ margin: "12px 0 8px 0" }}>
        <li>Faça upload do seu arquivo CSV.</li>
        <li>Use os filtros para explorar os dados.</li>
        <li>Veja os gráficos gerados automaticamente.</li>
      </ul>
      <div style={{ margin: "12px 0 4px 0", color: "#0742e6", fontWeight: 500 }}>
        Ordem necessária das colunas:
      </div>
      <div style={{ background: "#e3e9f7", padding: 8, borderRadius: 6, fontFamily: "monospace", fontSize: 15 }}>
        "id","Ano","Mês","Dia","Hora","Minutos","Velocidade","Direcao"
      </div>
    </div>
  );
}
export default Inicio;