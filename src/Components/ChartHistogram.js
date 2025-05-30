// Até aqui funciona :) 

// -    -   -   -   -     -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -
// -    -   -   -   -     -   Histograma ->  Velocidade do Vento  -   -   -   -   -   -   -   -   -
// -    -   -   -   -     -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -   -

import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HistogramBellCurve from "highcharts/modules/histogram-bellcurve";

// Aplicar o módulo de histograma
if (typeof HistogramBellCurve === "function") {
    HistogramBellCurve(Highcharts);
}

function ChartHistogram({ data }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data) {
            console.log("Recebendo data no Chart:", data);

            const valoresWs100 = data
                .map(row => parseFloat(row["ws100"])) // Extrair os valores de ws100
                .filter(value => !isNaN(value)); // Filtrar apenas valores numéricos

            console.log("Valores de ws100 para o histograma:", valoresWs100);

            //const valoresFiltrados = valoresWs100.filter(value => value >= 9.0 && value <= 9.2);      

            setChartData(valoresWs100); // Atualizar o estado com os dados brutos
        }
    }, [data]);

    const options = {
        title: {
            text: 'Histograma da Velocidade do Vento',
        },

        xAxis: [{
            title: { text: 'Valores de ws100' },
            alignTicks: false
        }, {
            title: { text: 'Histograma' },
            alignTicks: false,
            opposite: true
        }],

        yAxis: [{
            title: { text: 'Frequência' }
        }, {
            title: { text: 'Histograma' },
            opposite: true
        }],

        plotOptions: {
            histogram: {
                binWidth: 0.5,
                color: '#4169e1', // Cor das barras
                borderWidth: 1,   // Largura da borda
                borderColor: '#000', // Cor da borda
                accessibility: {
                    point: {
                        valueDescriptionFormat: '{index}. {point.x:.3f} to {point.x2:.3f}, {point.y}.'
                    }
                }
            }
        },

        series: [
            {
                name: 'Dados Brutos',
                type: 'line',
                data: chartData, // Dados brutos de ws100
                id: 'base',
                color: 'orange',
                marker: {
                    radius: 1.5
                },
                visible: false // Ocultar a série de dados brutos
            },
            {
                name: 'Histograma',
                type: 'histogram',
                xAxis: 1,
                yAxis: 1,
                baseSeries: 'base', // Referência à série de dados brutos
                zIndex: -1
            }
        ]
    };

    return (
        <div>
            {chartData.length > 0 ? (
                <HighchartsReact highcharts={Highcharts} options={options} />
            ) : (
                <p>Carregando gráfico...</p>
            )}
        </div>
    );
}

export default ChartHistogram;

