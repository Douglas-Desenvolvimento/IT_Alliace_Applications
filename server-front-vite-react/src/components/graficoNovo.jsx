import React from "react";
//import novo from "./novo";
import { CChart } from '@coreui/react-chartjs'
import * as core from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import {getStyle} from '@coreui/utils'
import Chart from "chart.js/auto";


const GraficoNovo = () => {
  const { data, loading } = novo();
  const chartElement = document.getElementById('CtrushScore');


//graffico trushScore


if (chartElement) {
  const existingChart = Chart.getChart(chartElement);
  if (existingChart) {
    existingChart.destroy();
  }
  new Chart(
    chartElement,
    {
      type: 'line',
      data: {
        labels: data ? data.period : [],
        datasets: [
          {
            label:data ? data[0].service : [], 
            data: data[0].total_requests,
          }
        ]
      }
    }
  );
} else {
  console.error('Element with ID "CtrushScore" not found.');
}
  

  if (loading) {
    return <div>Carregando...</div>;
  }
console.log("Recuperado dados da api na pagina Novo Grafico:",data[0].siteid, "valor:", data)
  return (
    <div>
      <h2>Novo Gráfico</h2>
     

    <core.CRow>
        <core.CCol sm={6}>
        <canvas id="CtrushScore"></canvas>
        </core.CCol>
    </core.CRow>
      



    </div>
  );
};

export default GraficoNovo;
