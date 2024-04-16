import React, { useEffect, useRef } from "react";
import useApiData from "./useApiData";
import * as core from "@coreui/react";
import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import Chart, { Ticks } from "chart.js/auto";
import TImg from "../assets/img/trushscore_img.jpg";
import AuImg from "../assets/img/Authentication.jpg";
import PFImg from "../assets/img/PreFill.jpg";
import VImg from "../assets/img/Verify.jpg";

const newWidget = () => {
  const chartData = useApiData();

  const chartRefT = useRef(null); //trushScore
  const chartRefA = useRef(null); // Authentication
  const chartRefP = useRef(null); // PreFill
  const chartRefV = useRef(null); //Verify

  const chartInstanceT = useRef(null); //trushScore
  const chartInstanceA = useRef(null); // Authentication
  const chartInstanceP = useRef(null); // PreFill
  const chartInstanceV = useRef(null); //Verify

  useEffect(() => {
    const TrushScoreChart = chartRefT.current;
    if (TrushScoreChart) {
      if (!chartInstanceT.current) {
        chartInstanceT.current = new Chart(TrushScoreChart, {
          type: "line",
          data: {
            labels: chartData ? chartData.labels : [],
            datasets: [
              {
                label: "Total Requests",
                data: chartData ? chartData.datasets[0].data : [],
                fill: true,
                borderColor: "rgba(127,255,0, 0.5)",
                backgroundColor: "rgba(127,255,0, 0.5)",
                pointStyle: true,
                tension: 0.6,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                display: false, // Oculta a escala no eixo x
                grid: {
                  display: false, // Oculta as linhas de grade no eixo x
                },
                ticks: {
                  display: false, // Oculta os rótulos no eixo x
                },
              },
              y: {
                display: false, // Oculta a escala no eixo y
                grid: {
                  display: false, // Oculta as linhas de grade no eixo y
                },
                ticks: {
                  display: false, // Oculta os rótulos no eixo y
                },
              },
            },
          },
        });
      } else {
        chartInstanceT.current.data.labels = chartData ? chartData.labels : [];
        chartInstanceT.current.data.datasets[0].data = chartData
          ? chartData.datasets[0].data
          : [];
        chartInstanceT.current.update();
      }
    }

    const AuthcoreChart = chartRefA.current;
    if (AuthcoreChart) {
      if (!chartInstanceA.current) {
        chartInstanceA.current = new Chart(AuthcoreChart, {
          type: "line",
          data: {
            labels: chartData ? chartData.labels : [],
            datasets: [
              {
                label: "Total Requests",
                data: chartData ? chartData.datasets[3].data : [],
                fill: true,
                borderColor: "rgba(176,224,230, 0.5)",
                backgroundColor: "rgba(176,224,230, 0.5)",
                pointStyle: true,
                tension: 0.6,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                display: false, // Oculta a escala no eixo x
                grid: {
                  display: false, // Oculta as linhas de grade no eixo x
                },
                ticks: {
                  display: false, // Oculta os rótulos no eixo x
                },
              },
              y: {
                display: false, // Oculta a escala no eixo y
                grid: {
                  display: false, // Oculta as linhas de grade no eixo y
                },
                ticks: {
                  display: false, // Oculta os rótulos no eixo y
                },
              },
            },
          },
        });
      } else {
        chartInstanceA.current.data.labels = chartData ? chartData.labels : [];
        chartInstanceA.current.data.datasets[0].data = chartData
          ? chartData.datasets[3].data
          : [];
        chartInstanceA.current.update();
      }
    }

    const PreFillcoreChart = chartRefP.current;
    if (PreFillcoreChart) {
      if (!chartInstanceP.current) {
        chartInstanceP.current = new Chart(PreFillcoreChart, {
          type: "line",
          data: {
            labels: chartData ? chartData.labels : [],
            datasets: [
              {
                label: "Total Requests",
                data: chartData ? chartData.datasets[1].data : [],
                fill: true,
                borderColor: "rgba(220,220,220, 0.5)",
                backgroundColor: "rgba(220,220,220, 0.5)",
                pointStyle: true,
                tension: 0.6,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                display: false, // Oculta a escala no eixo x
                grid: {
                  display: false, // Oculta as linhas de grade no eixo x
                },
                ticks: {
                  display: false, // Oculta os rótulos no eixo x
                },
              },
              y: {
                display: false, // Oculta a escala no eixo y
                grid: {
                  display: false, // Oculta as linhas de grade no eixo y
                },
                ticks: {
                  display: false, // Oculta os rótulos no eixo y
                },
              },
            },
          },
        });
      } else {
        chartInstanceP.current.data.labels = chartData ? chartData.labels : [];
        chartInstanceP.current.data.datasets[0].data = chartData
          ? chartData.datasets[1].data
          : [];
        chartInstanceP.current.update();
      }
    }

    const VerfycoreChart = chartRefV.current;
    if (VerfycoreChart) {
      if (!chartInstanceV.current) {
        chartInstanceV.current = new Chart(VerfycoreChart, {
          type: "line",
          data: {
            labels: chartData ? chartData.labels : [],
            datasets: [
              {
                label: "Total Requests",
                data: chartData ? chartData.datasets[2].data : [],
                fill: true,
                borderColor: "rgba(220,220,220, 0.5)",
                backgroundColor: "rgba(220,220,220, 0.5)",
                pointStyle: true,
                tension: 0.6,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                display: false, // Oculta a escala no eixo x
                grid: {
                  display: false, // Oculta as linhas de grade no eixo x
                },
                ticks: {
                  display: false, // Oculta os rótulos no eixo x
                },
              },
              y: {
                display: false, // Oculta a escala no eixo y
                grid: {
                  display: false, // Oculta as linhas de grade no eixo y
                },
                ticks: {
                  display: false, // Oculta os rótulos no eixo y
                },
              },
            },
          },
        });
      } else {
        chartInstanceV.current.data.labels = chartData ? chartData.labels : [];
        chartInstanceV.current.data.datasets[0].data = chartData
          ? chartData.datasets[2].data
          : [];
        chartInstanceV.current.update();
      }
    }
  }, [chartData]);
  console.log(
    "chartData puro:",
    chartData,
    "peiodos:",
    chartData ? chartData.labels[0] : [],
    "Valor unico:",
    chartData ? chartData.datasets[3].data[0] : []
  );
  return (
    <div>
      <div>
        {/* Seu código JSX... */}
        <core.CCallout color="secondary">
        <core.CRow xs={{ cols: 2, gutter: 2 }} md={{ cols: 2 }}>
          <core.CCol xs>
            <core.CCard
              color="info"
              textColor="white"
              className={`border-top- border-top-5`}
              style={{
                backgroundImage: `url(${AuImg})`,
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom 21%",
                width: "100%",
                height: "auto",
              }}
            >
              <core.CContainer>
                <core.CRow>
                  <core.CCol>
                    <h4 className={`text-start`}>
                      {" "}
                      {chartData ? chartData.datasets[3].label : []}
                    </h4>
                  </core.CCol>
                  <core.CCol>
                    <h3 className={`text-end`}>
                      {chartData ? chartData.datasets[3].data[0] : []}{" "}
                      <span className="fs-5 fw-normal">
                        ( {chartData ? chartData.labels[0] : []})
                      </span>
                    </h3>
                  </core.CCol>
                </core.CRow>
              </core.CContainer>
              <canvas
                ref={chartRefA}
                style={{
                  position: "relative",
                  width: "576px",
                  height: "70px",
                  bottom: "-1",
                }}
              ></canvas>
            </core.CCard>
          </core.CCol>

          <core.CCol xs>
            <core.CCard
              color="info"
              textColor="white"
              className={`border-top-success border-top-5`}
              style={{
                backgroundImage: `url(${TImg})`,
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom 20%",
                width: "100%",
                height: "auto",
              }}
            >
              <core.CContainer>
                <core.CRow>
                  <core.CCol>
                    <h4 className={`text-start`}>
                      {" "}
                      {chartData ? chartData.datasets[0].label : []}
                    </h4>
                  </core.CCol>
                  <core.CCol>
                    <h3 className={`text-end`}>
                      {chartData ? chartData.datasets[0].data[0] : []}{" "}
                      <span className="fs-5 fw-normal">
                        ( {chartData ? chartData.labels[0] : []})
                      </span>
                    </h3>
                  </core.CCol>
                </core.CRow>
              </core.CContainer>
              <canvas
                ref={chartRefT}
                style={{
                  position: "relative",
                  width: "576px",
                  height: "70px",
                  bottom: "-1",
                }}
              ></canvas>
            </core.CCard>
          </core.CCol>

          <core.CCol xs>
            <core.CCard
              color="info"
              textColor="white"
              className={`border-top- border-top-5`}
              style={{
                backgroundImage: `url(${PFImg})`,
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom 21%",
                width: "100%",
                height: "auto",
              }}
            >
              <core.CContainer>
                <core.CRow>
                  <core.CCol>
                    <h4 className={`text-start`}>
                      {" "}
                      {chartData ? chartData.datasets[1].label : []}
                    </h4>
                  </core.CCol>
                  <core.CCol>
                    <h3 className={`text-end`}>
                      {chartData ? chartData.datasets[1].data[0] : []}{" "}
                      <span className="fs-5 fw-normal">
                        ( {chartData ? chartData.labels[0] : []})
                      </span>
                    </h3>
                  </core.CCol>
                </core.CRow>
              </core.CContainer>
              <canvas
                ref={chartRefP}
                style={{
                  position: "relative",
                  width: "576px",
                  height: "70px",
                  bottom: "-1",
                }}
              ></canvas>
            </core.CCard>
          </core.CCol>

          <core.CCol xs>
            <core.CCard
              color="info"
              textColor="white"
              className={`border-top- border-top-5`}
              style={{
                backgroundImage: `url(${VImg})`,
                backgroundSize: "100%",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center bottom 10%",
                width: "100%",
                height: "auto",
              }}
            >
              <core.CContainer>
                <core.CRow>
                  <core.CCol>
                    <h4 className={`text-start`}>
                      {" "}
                      {chartData ? chartData.datasets[2].label : []}
                    </h4>
                  </core.CCol>
                  <core.CCol>
                    <h3 className={`text-end`}>
                      {chartData ? chartData.datasets[2].data[0] : []}{" "}
                      <span className="fs-5 fw-normal">
                        ( {chartData ? chartData.labels[0] : []})
                      </span>
                    </h3>
                  </core.CCol>
                </core.CRow>
              </core.CContainer>
              <canvas
                ref={chartRefV}
                style={{
                  position: "relative",
                  width: "576px",
                  height: "70px",
                  bottom: "-1",
                }}
              ></canvas>
            </core.CCard>
          </core.CCol>
        </core.CRow>
        </core.CCallout>
      </div>
    </div>
  );
};

export default newWidget;
