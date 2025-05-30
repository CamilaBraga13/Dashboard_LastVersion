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


    console.log("Dados recebidos no Analise:", csvData);

    return (
        <div className="analise-container">
            <h1 className="tituloAnalise">Produção Energética</h1>
            <div className="analise-content">
                <div className="analise-left">
                    <AnaliseGoodSpeed data={csvData} />
                </div>
                <div className="analise-right">
                    <CasasAbastecidas data={csvData} />
                    <ArvoresSalvas data={csvData} />
                    <AguaEconomizada data={csvData} />
                </div>
            </div>
        </div>
    );
}

export default Analise;
