import React, { useState, useEffect } from "react";
import { CTable } from "@coreui/react";
import apiAccess from "../hooks/apiAcess.jsx";
import useAuthentication from "../hooks/useAuthentication.jsx";

const Tables = () => {
  const { getData } = apiAccess();
  const { getLoggedInUser } = useAuthentication();
  const [servicesFetched, setServicesFetched] = useState(false);
  const [period, setPeriod] = useState(null);
  const [totalRequests, setTotalRequests] = useState(null);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchAllservices = async () => {
      try {
        const userData = getLoggedInUser();
        const siteid = userData && userData.siteid;

        if (!siteid) {
          console.error("Erro: siteid do usuário não encontrado.");
          return;
        }

        const allservicesData = await getData(`api/allservices?siteid=${siteid}`);

        if (allservicesData && allservicesData[siteid] && allservicesData[siteid][0]) {
          const serviceData = allservicesData[siteid][0];
            console.log("Dados de serviços:", serviceData);
          // Encontrar o período único
          const periods = Object.values(serviceData).map((value) => value.period);
          const uniquePeriod = [...new Set(periods)].join(", ");
          setPeriod(uniquePeriod);
          console.log("Período único:", uniquePeriod);

          // Montando as linhas da tabela para Total Requests
          const rows = Object.entries(serviceData)
            .filter(([key, value]) => key !== "Total Requests")
            .map(([service, value]) => ({
              service,
              period: value.total_requests,
            }));
          setRows(rows);
         // console.log("Linhas da tabela:", rows);

          // Atualizar Total Requests
          const totalRequests = serviceData["Total Requests"].total_requests;
          setTotalRequests(totalRequests);
        } else {
          console.error("Erro: dados de serviços não encontrados.");
        }

        setServicesFetched(true);
      } catch (error) {
        console.error("Erro ao buscar os serviços:", error.message);
      }
    };

    if (!servicesFetched) {
      fetchAllservices();
    }
  }, [getData, getLoggedInUser, servicesFetched]);

  const columns = [
    { key: "service", label: "Service", _props: { scope: "col" } },
    { key: "period", label: period ? period : "Period", _props: { scope: "col" } },
  ];

  return (
    <div>
      <CTable striped columns={columns} items={rows} />
    </div>
  );
};

export default Tables;
