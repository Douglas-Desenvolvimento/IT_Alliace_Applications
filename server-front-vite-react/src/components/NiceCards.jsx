import React, { useState, useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";
import apiAccess from "../hooks/apiAcess.jsx";
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons';
import 'boxicons/css/boxicons.min.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import 'remixicon/fonts/remixicon.css';
import 'simple-datatables/dist/style.css';

import CIcon from "@coreui/icons-react";
import * as icon from "@coreui/icons";
import { ApexOptions } from "apexcharts";
import { CRow, CCol, CWidgetStatsA } from "@coreui/react";


const NiceCards = () => {
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

  const processRawData = (rawData) => {
    const labels = [];
    const datasets = [];

    rawData.forEach((item, index) => {
      labels.push(item["Total Requests"].period);

      Object.keys(item).forEach((key) => {
        if (key !== "Total Requests") {
          const existingDatasetIndex = datasets.findIndex(
            (dataset) => dataset.label === key
          );
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

  const getColor = (index) => {
    const colors = ["#007bff", "#28a745", "#dc3545", "#ffc107", "#17a2b8"];
    return colors[index % colors.length];
  };

  return (
    <CRow>

      {/* TrushScore */}
      <CCol className="col-xxl-4 col-md-6">
        <TrushScore data={chartData} />
      </CCol>

      {/* Autentication */}
      <div className="col-xxl-4 col-md-6">
        <Autentication data={chartData} />
      </div>

      {/* PreFill */}
      <div className="col-xxl-4 col-xl-12">
        <PreFill data={chartData} />
      </div>


      {/* Verify */}
      <div className="col-xxl-4 col-xl-12">
        <Verify data={chartData} />
      </div>
    </CRow>


  );
};

const TrushScore = ({ data }) => {
  // Aqui você pode acessar os dados relevantes para este card a partir da propriedade "data" e exibi-los conforme necessário
  if (!data) {
    return <div>Loading...</div>;
  }

  // Extrai os valores relevantes dos dados da API
  const salesToday = data.datasets[0].data[0];
  const increasePercentage = data.datasets[0].data[1];
  const services = data.datasets[0].label;
  const period = data.labels
 // console.log(services,increasePercentage,salesToday, period);

  return (
    
    <div className="card info-card sales-card">
      <div className="filter">
        
        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>{period}</h6>
          </li>
          {data.labels.map((label, index) => (
            <li key={index}><a className="dropdown-item" href="#">{label}</a></li>
          ))}
        </ul>
      </div>
      <div className="card-body">
        <h5 className="card-title" >{services}<span> | {period}</span></h5>
        <div className="d-flex align-items-center">
       
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className="bi bi-cart"></i>
          </div>
          <div className="ps-3">
            {/* Substitui os valores estáticos pelos valores dinâmicos */}
            <h6>{salesToday}</h6>
            <span className="text-success small pt-1 fw-bold">{increasePercentage}%</span> <span className="text-muted small pt-2 ps-1">increase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Autentication = ({ data }) => {
  // Aqui você pode acessar os dados relevantes para este card a partir da propriedade "data" e exibi-los conforme necessário
  return (
    <div className="card info-card sales-card">
      <div className="filter">
        <CIcon icon={icon.cilCog}></CIcon>
        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>Filter</h6>
          </li>
          {data && data.labels.map((label, index) => (
            <li key={index}><a className="dropdown-item" href="#">{label}</a></li>
          ))}
        </ul>
      </div>
      <div className="card-body">
        <h5 className="card-title">Sales <span>| Today</span></h5>
        <div className="d-flex align-items-center">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className="bi bi-cart"></i>
          </div>
          <div className="ps-3">
            <h6>145</h6>
            <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const PreFill = ({ data }) => {
  // Aqui você pode acessar os dados relevantes para este card a partir da propriedade "data" e exibi-los conforme necessário
  return (
    <div className="card info-card sales-card">
      <div className="filter">
        <CIcon icon={icon.cilCog}></CIcon>
        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>Filter</h6>
          </li>
          {data && data.labels.map((label, index) => (
            <li key={index}><a className="dropdown-item" href="#">{label}</a></li>
          ))}
        </ul>
      </div>
      <div className="card-body">
        <h5 className="card-title">Sales <span>| Today</span></h5>
        <div className="d-flex align-items-center">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className="bi bi-cart"></i>
          </div>
          <div className="ps-3">
            <h6>145</h6>
            <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Verify = ({ data }) => {
  // Aqui você pode acessar os dados relevantes para este card a partir da propriedade "data" e exibi-los conforme necessário
  return (
    <div className="card info-card sales-card">
      <div className="filter">
        <CIcon icon={icon.cilCog}></CIcon>
        <a className="icon" href="#" data-bs-toggle="dropdown"><i className="bi bi-three-dots"></i></a>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
          <li className="dropdown-header text-start">
            <h6>Filter</h6>
          </li>
          {data && data.labels.map((label, index) => (
            <li key={index}><a className="dropdown-item" href="#">{label}</a></li>
          ))}
        </ul>
      </div>
      <div className="card-body">
        <h5 className="card-title">Sales <span>| Today</span></h5>
        <div className="d-flex align-items-center">
          <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
            <i className="bi bi-cart"></i>
          </div>
          <div className="ps-3">
            <h6>145</h6>
            <span className="text-success small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">increase</span>
          </div>
        </div>
      </div>
    </div>
  );

  
};


export default NiceCards;
