import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsExporting from 'highcharts/modules/exporting';

import '../Styles/serieSuavizada.css';

if (typeof HighchartsExporting === "function") {
    HighchartsExporting(Highcharts);
}

function Chart({ data }) {
    const [chartData, setChartData] = useState([]);

    const formattedData = [];
    const expectedInterval = 10 * 60 * 1000; // 10 minutos em ms
    

    useEffect(() => {



        if (data) {
            console.log("Recebendo data no Chart:", data);
    
            if (data.length > 0) {
                console.log("Chaves disponíveis:", Object.keys(data[0]));
            }

            const formattedData = data.map(row => [ 
                row["id"],  // x
                parseFloat(row["ws100"])    // y
            ]).filter(row => row[0] && !isNaN(row[1]));
    
            console.log("Dados formatados para o gráfico:", formattedData);
            setChartData(formattedData);
        }
    }, [data]);
    

    const options = {
        chart: {
            type: 'line',
            zoomType: 'x',
        },
        title: {
            text: " ",
        },
        colors: ['#123de6'],
        xAxis: {
            type: 'datetime', // Define o eixo X como um eixo de tempo
            title: {
                text: 'Data', // Título do eixo X
            },
            dateTimeLabelFormats: {
                //day: '%d/%m/%Y', // Formato para exibir apenas a data
                    hour: '%[HM]',
                    day: '%[eb]',
                    month: '%[bY]',
                    year: '%Y'
            },
        },
        yAxis: {
            title: {
                text: 'Velocidade do Vento (m/s)',
            },
        },
        series: [{
            name: 'Velocidade',
            data: chartData,  // Passa os dados formatados
            gapSize: 2, // Define o tamanho do gap
        }],
    };

    return (
        <div className='return'>
            <h2>Série Temporal da Velocidade do Vento</h2>
            {chartData.length > 0 ? ( // Verifica se o CSV não está vazio (errado)
                <HighchartsReact highcharts={Highcharts} options={options} /> // True
            ) : (
                <p>Carregando gráfico...</p> // False
            )}
        </div>
    );
}

export default Chart;

