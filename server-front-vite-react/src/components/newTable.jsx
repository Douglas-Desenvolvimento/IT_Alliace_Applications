import React, { useEffect, useRef, useState } from "react";
import useApiData from "./useApiData";
import * as core from "@coreui/react";
import Chart from "chart.js/auto";
import '@coreui/coreui/dist/css/coreui.min.css'

const NewTable = () => {
  const chartData = useApiData();
  const [selectedServices, setSelectedServices] = useState([]);

  useEffect(() => {
    if (chartData) {
      setSelectedServices(chartData.datasets.map((dataset) => dataset.label));
    }
  }, [chartData]);

  const chartRefAll = useRef(null);
  const allInstance = useRef(null); // all services

  useEffect(() => {
    const AllcoreChart = chartRefAll.current;
    const labels = chartData ? chartData.labels : [];
    if (AllcoreChart) {
      if (!allInstance.current) {
        allInstance.current = new Chart(AllcoreChart, {
          type: "line",
          data: {
            labels: labels,
            datasets: chartData.datasets.map((dataset, index) => ({
              label: dataset.label,
              data: dataset.data,
              borderColor: getColor(index),
              pointBackgroundColor: getColor(index),
              backgroundColor: getColor(index),
              pointStyle: "rectRot",
              pointRadius: 5,
              pointBorderColor: "rgb(0, 0, 0)",
              hidden: !selectedServices.includes(dataset.label),
            })),
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                labels: {
                  usePointStyle: true,
                },
                onClick: (e, legendItem) => {
                  const service = legendItem.text;
                  setSelectedServices((prevServices) =>
                    prevServices.includes(service)
                      ? prevServices.filter((s) => s !== service)
                      : [...prevServices, service]
                  );
                },
              },
              tooltip: {
                enabled: true,
                mode: "index",
              },
            },
            scales: {
              x: {},
              y: {
                min: 0,
                max: 1000,
              },
            },
            elements: {
              line: {
                borderWidth: 3,
                tension: 0.6,
              },
            },
          },
        });
      } else {
        allInstance.current.data.labels = labels;
        allInstance.current.data.datasets.forEach((dataset, index) => {
          dataset.data = chartData ? chartData.datasets[index].data : [];
          dataset.hidden = !selectedServices.includes(dataset.label);
        });
        allInstance.current.update();
      }
    }
  }, [chartData, selectedServices]);

  const handleServiceCheckboxChange = (service) => {
    setSelectedServices((prevServices) =>
      prevServices.includes(service)
        ? prevServices.filter((s) => s !== service)
        : [...prevServices, service]
    );
  };

  if (!chartData) {
    return null;
  }

  const items = chartData.datasets.map((dataset, datasetIndex) => {
    const item = { service: dataset.label };
    chartData.labels.forEach((label, index) => {
      item[`period_${index}`] = dataset.data[index];
    });
    return item;
  });

  return (
    <div>
      <div>
        {/* Seu código JSX... */}
        <core.CCard color="light" className={`mb-5 border-dark  border-top-5`}>
        <core.CCardHeader as='h2' className={`mb-3 border-light `}>Todos os Serviços</core.CCardHeader>
        <core.CCallout color="secondary">
          {/* Gráfico de linha */}
        
          <core.CCard  className={`mb-3 border-dark  `}>
          <core.CCardHeader as='h3' className={`mb-3 border-light text-start`}>Gráficos</core.CCardHeader>
           <canvas ref={chartRefAll} height="170px" width="490px"></canvas>
          </core.CCard>
        
         
          {/* Tabela geral */}
          
          <core.CCard className={`border-success  `}>
          <core.CCardHeader as='h3' className={`mb-3 border-light text-start`}>Tabela</core.CCardHeader>
            <core.CTable hover responsive="sm">
              <core.CTableHead color="primary">
                <core.CTableRow>
                  <core.CTableHeaderCell scope="col">Serviço</core.CTableHeaderCell>
                  {chartData.labels.map((label, index) => (
                    <core.CTableHeaderCell key={index} scope="col">
                      {label}
                    </core.CTableHeaderCell>
                  ))}
                </core.CTableRow>
              </core.CTableHead>
              <core.CTableBody>
                {items.map((item, index) => (
                  <core.CTableRow key={index}>
                    <core.CTableHeaderCell>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id={`serviceCheckbox_${index}`}
                          checked={selectedServices.includes(item.service)}
                          onChange={() =>
                            handleServiceCheckboxChange(item.service)
                          }
                        />
                        <label
                          className="form-check-label"
                          htmlFor={`serviceCheckbox_${index}`}
                        >
                          <strong>{item.service}</strong>
                        </label>
                      </div>
                    </core.CTableHeaderCell>
                    {Object.keys(item)
                      .filter((key) => key !== "service")
                      .map((key, index) => (
                        <core.CTableHeaderCell className="text-normal" key={index}>{item[key]}</core.CTableHeaderCell>
                      ))}
                  </core.CTableRow>
                ))}
              </core.CTableBody>
            </core.CTable>
            </core.CCard>
           
            </core.CCallout>
       
        </core.CCard>
      </div>
    </div>
  );
};

const getColor = (index) => {
  const colors = ["#28a745",  "#3533CD", "#FFDE59","#0097B2", ];
  return colors[index % colors.length];
};

export default NewTable;
