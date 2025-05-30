import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import "../Styles/analise.css"; // Importe o arquivo CSS para estilização

function AnaliseGoodSpeed({ data }) {
  const [chartOptions, setChartOptions] = useState(null);
  const [totalTime, setTotalTime] = useState(0);

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) {
      setChartOptions(null);
      setTotalTime(0);
      return;
    }

    const filteredData = data.filter((row) => parseFloat(row.ws100) > 4);
    const totalMinutes = filteredData.length * 10;
    const totalHours = totalMinutes / 60;
    const totalDays = Math.floor(totalHours / 24);
    const remainingHours = totalHours % 24;
    const formattedTotalTime = `${totalDays} dias e ${remainingHours.toFixed(2)} horas`;
    setTotalTime(formattedTotalTime);

    const groupedData = filteredData.reduce((acc, row) => {
      const dateValue = new Date(row.id);
      if (isNaN(dateValue.getTime())) return acc;
      const date = dateValue.toISOString().split("T")[0];
      acc[date] = (acc[date] || 0) + 10;
      return acc;
    }, {});

    const chartData = Object.entries(groupedData).map(([date, time]) => ({
      date,
      time: time / 60,
    }));

    setChartOptions({
      chart: { type: "column", zoomType: "x" },
      title: { text: "Tempo por Dia com Velocidade > 4 m/s" },
      xAxis: {
        categories: chartData.map((item) => item.date),
        title: { text: "Data" },
      },
      yAxis: {
        min: 0,
        title: { text: "Horas" },
      },
      series: [
        {
          data: chartData.map((item) => item.time),
          color: "rgba(7, 94, 26, 0.6)",
        },
      ],
    });
  }, [data]);

  return (
    <div className="analisegoodspeed-container">
      <h2>Tempo por Dia com Velocidade &gt; 4 m/s</h2>
      <p>
        <strong>Tempo total com velocidade &gt; 4 m/s:</strong> {totalTime}
      </p>
      {chartOptions ? (
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
      ) : (
        <p>Nenhum dado disponível para velocidades acima de 4 m/s.</p>
      )}
    </div>
  );
}

export default AnaliseGoodSpeed;