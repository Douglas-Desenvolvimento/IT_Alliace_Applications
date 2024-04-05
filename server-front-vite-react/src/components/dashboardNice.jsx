import React, { useState, useEffect } from "react";
import ApexCharts from 'apexcharts';
import useAuthentication from "../hooks/useAuthentication";
import apiAccess from "../hooks/apiAcess.jsx";

const DashboardNice = () => {
  const [chartData, setChartData] = useState(null);
  const [servicesFetched, setServicesFetched] = useState(false);
  const { getData } = apiAccess();
  const { getLoggedInUser } = useAuthentication();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = getLoggedInUser();
        const siteid = userData && userData.siteid;

        if (!siteid) {
          console.error("Erro: siteid do usuário não encontrado.");
          return;
        }

        console.log("Buscando dados da API...");

        const allServicesData = await getData(`api/allservices?siteid=${siteid}`);

        if (allServicesData && allServicesData[siteid]) {
          console.log("Dados da API obtidos:", allServicesData[siteid]);
          const newData = processRawData(allServicesData[siteid]);
          setChartData(newData);
        } else {
          console.error("Erro: dados de serviços não encontrados.");
        }

        setServicesFetched(true);
      } catch (error) {
        console.error("Erro ao buscar os serviços:", error.message);
      }
    };

    if (!servicesFetched) {
      fetchData();
    }
  }, [getData, getLoggedInUser, servicesFetched]);

  useEffect(() => {
    if (chartData) {
      const options = {
        series: chartData.datasets,
        chart: {
          height: 350,
          type: 'area',
          toolbar: {
            show: false
          },
        },
        markers: {
          size: 4
        },
        colors: ['#4154f1', '#2eca6a', '#ff771d'],
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 0.4,
            stops: [0, 90, 100]
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        xaxis: {
          type: 'datetime',
          categories: chartData.labels
        },
        tooltip: {
          x: {
            format: 'dd/MM/yy HH:mm'
          },
        }
      };

      const chart = new ApexCharts(document.querySelector("#reportsChart"), options);
      chart.render();

      // Cleanup
      return () => {
        chart.destroy();
      };
    }
  }, [chartData]);

  const processRawData = (rawData) => {
    const labels = [];
    const datasets = [];

    rawData.forEach((item, index) => {
      labels.push(item["Total Requests"].period);

      Object.keys(item).forEach((key) => {
        if (key !== "Total Requests") {
          const existingDatasetIndex = datasets.findIndex((dataset) => dataset.label === key);
          const color = getColor(index);

          if (existingDatasetIndex === -1) {
            datasets.push({
              label: key,
              data: [item[key].total_requests],
              fill: false,
              borderColor: color,
              backgroundColor: color,
            });
          } else {
            datasets[existingDatasetIndex].data.push(item[key].total_requests);
          }
        }
      });
    });

    console.log("Dados do gráfico processados:", { labels, datasets });

    return { labels, datasets };
  };

  // Função para obter cores com base no índice
  const getColor = (index) => {
    const colors = ["#007bff", "#28a745", "#dc3545", "#ffc107", "#17a2b8"];
    return colors[index % colors.length];
  };

  return (
    <div className="col-12">
      <div className="card">
        <div className="filter">
          <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
          <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
            <li className="dropdown-header text-start">
              <h6>Filter</h6>
            </li>
            <li><a className="dropdown-item" href="#">Today</a></li>
            <li><a className="dropdown-item" href="#">This Month</a></li>
            <li><a className="dropdown-item" href="#">This Year</a></li>
          </ul>
        </div>
        <div className="card-body">
          <h5 className="card-title">Reports <span>/Today</span></h5>
          <div id="reportsChart"></div>
        </div>
      </div>
    </div>
  );
}

export default DashboardNice;
