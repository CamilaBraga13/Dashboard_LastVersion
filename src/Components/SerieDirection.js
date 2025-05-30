import React, { useState, useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

function Chart({ data }) {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        if (data) {
            console.log("Recebendo data no Chart:", data);
    
            if (data.length > 0) {
                console.log("Chaves disponíveis:", Object.keys(data[0]));
            }

            const formattedData = data.map(row => [ 
                row["id"],  // x
                parseFloat(row["wdir100"])    // y
            ]).filter(row => row[0] && !isNaN(row[1]));
    
            console.log("Dados series direction:", formattedData);
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
        colors: ['#de6007'],
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
                text: 'Direction',
            },
        },
        series: [{
            name: 'Direction',
            data: chartData,  // Passa os dados formatados (Padrao CSV)
        }],
    };

    return (
        <div className='return'>
            <h2>Série Temporal da Direção do Vento</h2>
            {chartData.length > 0 ? ( // Verifica se o CSV não está vazio (errado)
                <HighchartsReact highcharts={Highcharts} options={options} /> // True
            ) : (
                <p>Carregando gráfico...</p> // False
            )}
        </div>
    );
}

export default Chart;