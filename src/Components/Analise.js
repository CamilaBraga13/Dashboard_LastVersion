import React from "react";
import AnaliseGoodSpeed from "./AnaliseGoodSpeed";
import CasasAbastecidas from "./CasasAbastecidas";
import ArvoresSalvas from "./ArvoresSalvas";
import AguaEconomizada from "./AguaEconomizada";

import '../Styles/analise.css';

function Analise() {
    let csvData = [];
    try {
        csvData = JSON.parse(localStorage.getItem("csvData")) || [];
    } catch {
        csvData = [];
    }

    // Estados para os inputs
    const [raioTurbinaInput, setRaioTurbinaInput] = useState(40);
    const [eficienciaInput, setEficienciaInput] = useState(0.4);

    // Estados para os valores usados nos cálculos
    const [raioTurbina, setRaioTurbina] = useState(40);
    const [eficiencia, setEficiencia] = useState(0.4);

    // Função chamada ao clicar no botão
    const atualizarParametros = () => {
        setRaioTurbina(Number(raioTurbinaInput) || 40);
        setEficiencia(Number(eficienciaInput) || 0.4);
    };

    return (
        <div className="analise-container">
            <h1 className="tituloAnalise">Produção Energética</h1>
            <div className="analise-parametros" style={{ marginBottom: 24 }}>
                <h2 style={{ fontSize: "1.1rem", marginBottom: 8 }}>Parâmetros do Sistema:</h2>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                    <div>
                        <label>Raio da turbina (m): </label>
                        <input
                            type="number"
                            value={raioTurbinaInput}
                            min={1}
                            onChange={e => setRaioTurbinaInput(e.target.value)}
                            style={{ width: 80 }}
                        />
                    </div>
                    <div>
                        <label>Eficiência da turbina: </label>
                        <input
                            type="number"
                            step="0.01"
                            value={eficienciaInput}
                            min={0}
                            max={1}
                            onChange={e => setEficienciaInput(e.target.value)}
                            style={{ width: 80 }}
                        />
                    </div>
                    <button
                        style={{ height: 32, marginLeft: 12, background: "#0742e6", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" }}
                        onClick={atualizarParametros}
                    >
                        Atualizar
                    </button>
                </div>
            </div>
            <div className="analise-content">
                <div className="analise-left">
                    <AnaliseGoodSpeed data={csvData} />
                </div>
                <div className="analise-right">
                    <CasasAbastecidas data={csvData} raioTurbina={raioTurbina} eficiencia={eficiencia} />
                    <ArvoresSalvas data={csvData} raioTurbina={raioTurbina} eficiencia={eficiencia} />
                    <AguaEconomizada data={csvData} raioTurbina={raioTurbina} eficiencia={eficiencia} />
                </div>
            </div>
        </div>
    );
}

export default Analise;
