import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { getStyle } from "@coreui/utils";
import apiAccess from "../hooks/apiAcess.jsx";
import useAuthentication from "../hooks/useAuthentication.jsx";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";
import{ CChartLine } from "@coreui/react-chartjs";
import { CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from "@coreui/react";
import CIcon  from "@coreui/icons-react";
import * as icon from '@coreui/icons';
import { cilOptions, cilArrowTop, cilChartPie } from "@coreui/icons";
const WidgetCoreui = () => {
  const { getData } = apiAccess();
  const { getLoggedInUser } = useAuthentication();
  const [servicesFetched, setServicesFetched] = useState(false);
  const [chartData, setChartData] = useState(null);

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

  const processRawData = (rawData) => {
    const labels = [];
    const datasets = [];

    rawData.forEach((item, index) => {
      labels.push(item["Total Requests"].period);

      Object.keys(item).forEach((key) => {
        if (key !== "Total Requests") {
          const existingDatasetIndex = datasets.findIndex((dataset) => dataset.label === key);
          const color = getColor(index); // Obter cor com base no índice

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

    return { labels, datasets };
  };

  // Função para obter cores com base no índice
  const getColor = (index) => {
    const colors = ["#007bff", "#28a745", "#dc3545", "#ffc107", "#17a2b8"]; // Array de cores
    return colors[index % colors.length]; // Selecionar cor com base no índice, repetindo as cores se necessário
  };

  return (
    <div>
      {/* <div clasclass="card" id="reportsChart">
      {chartData && (
        <Line
          data={chartData}
          options={{
            plugins: {
              legend: {
                labels: {
                  color: getStyle("--cui-body-color"),
                },
              },
            },
            scales: {
              x: {
                grid: {
                  color: getStyle("--cui-border-color-translucent"),
                },
                ticks: {
                  color: getStyle("--cui-body-color"),
                },
              },
              y: {
                grid: {
                  color: getStyle("--cui-border-color-translucent"),
                },
                ticks: {
                  color: getStyle("--cui-body-color"),
                },
              },
            },
          }}
        />
      )}
      </div> */}

      <CRow>
  <CCol sm={6}>
    {chartData && (
    <CWidgetStatsA
      className="mb-4"
      color="info"
      // value={
      //   <>
      //     $9.000{' '}
      //     <span className="fs-6 fw-normal">
      //       (40.9% <CIcon icon={cilArrowTop} />)
      //     </span>
      //   </>
      // }
      //title={chartData.datasets[0].label}
      value={
        <>
          
          {chartData.datasets[0].label}{' '}
          <span className="fs-6 fw-normal">
         

           
             {chartData.datasets[0].data[chartData.datasets[0].data.length - 1]} <CIcon icon={icon.cilBadge} size="xxl" style={{'--ci-primary-color': 'light'}} />
          </span>
        </>
      }
      chart={
        <CChartLine
          className="mt-3 mx-3"
          style={{ height: '100px' }}
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: chartData.datasets[0].label,
                backgroundColor: 'transparent',
                borderColor: 'rgba(255,255,255,.55)',
                pointBackgroundColor: '#ffff',
                data: chartData.datasets[0].data,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                min: 0,
                max: 500,
                display: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderWidth: 1,
                tension: 0.4,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
          }}
        />
      }
    />
    )}
  </CCol>
  <CCol sm={6}>
    {chartData && (
    <CWidgetStatsA
      className="mb-4"
      color="warning"
      // value={
      //   <>
      //     $9.000{' '}
      //     <span className="fs-6 fw-normal">
      //       (40.9% <CIcon icon={cilArrowTop} />)
      //     </span>
      //   </>
      // }
      //title={chartData.datasets[0].label}
      value={
        <>
          
          {chartData.datasets[1].label}{' '}
          <span className="fs-6 fw-normal">
         

           
             {chartData.datasets[1].data[chartData.datasets[1].data.length - 1]} <CIcon icon={icon.cilCog} size="xl" style={{'--ci-primary-color': 'gray'}} />
          </span>
        </>
      }
      chart={
        <CChartLine
          className="mt-3 mx-3"
          style={{ height: '100px' }}
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: chartData.datasets[1].label,
                backgroundColor: 'black',
                borderColor: 'rgba(255,255,255,.55)',
                pointBackgroundColor: '#FF8C00',
                data: chartData.datasets[1].data,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                min: 0,
                max: 500,
                display: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderWidth: 1,
                tension: 0.4,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
          }}
        />
      }
    />
    )}
  </CCol>
  <CCol sm={6}>
    {chartData && (
    <CWidgetStatsA
      className="mb-4"
      color="danger"
      // value={
      //   <>
      //     $9.000{' '}
      //     <span className="fs-6 fw-normal">
      //       (40.9% <CIcon icon={cilArrowTop} />)
      //     </span>
      //   </>
      // }
      //title={chartData.datasets[0].label}
      value={
        <>
          
          {chartData.datasets[2].label}{' '}
          <span className="fs-6 fw-normal">
         

           
             {chartData.datasets[2].data[chartData.datasets[2].data.length - 1]} <CIcon icon={icon.cilTask} size="xl" style={{'--ci-primary-color': 'white'}} />
          </span>
        </>
      }
      chart={
        <CChartLine
          className="mt-3 mx-3"
          style={{ height: '100px' }}
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: chartData.datasets[2].label,
                backgroundColor: 'black',
                borderColor: 'rgba(255,255,255,.55)',
                pointBackgroundColor: '#FFff',
                data: chartData.datasets[2].data,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                min: 0,
                max: 500,
                display: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderWidth: 1,
                tension: 0.4,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
          }}
        />
      }
    />
    )}
  </CCol>
  <CCol sm={6}>
    {chartData && (
    <CWidgetStatsA
      className="mb-4"
      color="success"
      // value={
      //   <>
      //     $9.000{' '}
      //     <span className="fs-6 fw-normal">
      //       (40.9% <CIcon icon={cilArrowTop} />)
      //     </span>
      //   </>
      // }
      //title={chartData.datasets[0].label}
      value={
        <>
          
          {chartData.datasets[3].label}{' '}
          <span className="fs-6 fw-normal">
         

           
             {chartData.datasets[3].data[chartData.datasets[3].data.length - 1]} <CIcon icon={icon.cilThumbUp} size="xl" style={{'--ci-primary-color': 'white'}} />
          </span>
        </>
      }
      chart={
        <CChartLine
          className="mt-3 mx-3"
          style={{ height: '100px' }}
          data={{
            labels: chartData.labels,
            datasets: [
              {
                label: chartData.datasets[3].label,
                backgroundColor: 'black',
                borderColor: 'rgba(255,255,255,.55)',
                pointBackgroundColor: 'pink',
                data: chartData.datasets[3].data,
              },
            ],
          }}
          options={{
            plugins: {
              legend: {
                display: false,
              },
            },
            maintainAspectRatio: false,
            scales: {
              x: {
                
                border: {
                  display: false,
                },
                grid: {
                  display: false,
                  drawBorder: false,
                },
                ticks: {
                  display: false,
                },
              },
              y: {
                min: 0,
                max: 500,
                display: false,
                grid: {
                  display: false,
                },
                ticks: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderWidth: 1,
                tension: 0.4,
              },
              point: {
                radius: 4,
                hitRadius: 10,
                hoverRadius: 4,
              },
            },
          }}
        />
      }
    />
    )}
  </CCol>
  </CRow>

    </div>
  );
};

export default WidgetCoreui;
