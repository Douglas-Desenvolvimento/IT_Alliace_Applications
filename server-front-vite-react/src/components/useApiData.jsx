import React, { useState, useEffect } from "react";
import useAuthentication from "../hooks/useAuthentication";
import apiAccess from "../hooks/apiAcess.jsx";

const useApiData = () => {
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

        const allServicesData = await getData(
          `api/allservices?siteid=${siteid}`
        );

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

    rawData.forEach((item) => {
      labels.push(item["Total Requests"].period);

      Object.keys(item).forEach((key) => {
        if (key !== "Total Requests") {
          const totalRequests = item[key].total_requests;
          const existingDatasetIndex = datasets.findIndex(
            (dataset) => dataset.label === key
          );

          if (existingDatasetIndex === -1) {
            datasets.push({
              label: key,
              data: [totalRequests],
            });
          } else {
            datasets[existingDatasetIndex].data.push(totalRequests);
          }
        }
      });
    });

    return { labels, datasets };
  };

  return chartData;
};

export default useApiData;
