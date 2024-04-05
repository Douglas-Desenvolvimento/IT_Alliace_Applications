// Home.jsx
import React, { useState, useEffect } from "react";
import { useSession } from "../../hooks/sessionToken";
import "../../../node_modules/@coreui/coreui/";
import { CContainer } from "@coreui/react";
import { CNav, CNavItem, CNavLink } from "@coreui/react";
import { CTabContent, CTabPane } from "@coreui/react";
import { CAlert } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBan, cilAccountLogout } from "@coreui/icons";
import NavBar from "../../components/navBar";
import useAuthentication from "../../hooks/useAuthentication.jsx";
import apiAccess from "../../hooks/apiAcess.jsx";
import WidgetCoreui from "../../components/widgetCoreui.jsx";

const Home = () => {
  const [activeKey, setActiveKey] = useState();
  const { showSessionExpiredAlert } = useSession();
  const { getData } = apiAccess();
  const { getLoggedInUser } = useAuthentication();
  const [servicesFetched, setServicesFetched] = useState(false);
  const [usuario, setUsuario] = useState(null);
  const [siteid, setSiteid] = useState(null);

  useEffect(() => {
    const fetchAllservices = async () => {
      try {
        const userData = getLoggedInUser();
        const siteid = userData && userData.siteid;
        setSiteid(siteid);
        console.log("Home - siteid do userdata", siteid);

        if (!siteid) {
          console.error("Erro: siteid do usuário não encontrado.");
          return;
        }

        if (!usuario) {
          setUsuario(userData);
        }

        const allservicesData = await getData(
          `api/allservices?siteid=${siteid}`
        );

        if (
          allservicesData &&
          allservicesData[siteid] &&
          allservicesData[siteid][0] &&
          Object.keys(allservicesData[siteid][0])
        ) {
          const labels = [];
          const datasets = [];

          Object.keys(allservicesData).forEach((siteId) => {
            const serviceData = allservicesData[siteId][0];

            if (serviceData && serviceData["Total Requests"]) {
              const totalRequests =
                serviceData["Total Requests"].total_requests;
              const period = serviceData["Total Requests"].period;

              labels.push(period);
              datasets.push(totalRequests);
            }
          });

          console.log("Labels:", labels);
          console.log("Datasets:", datasets);
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
  }, [getData, getLoggedInUser, servicesFetched, usuario]);

  const renderCnavItems = () => {
    if (!siteid) return null;

    switch (usuario?.role) {
      case "admin":
        return (
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
              >
                Administrator
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Technical & Support
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                User
              </CNavLink>
            </CNavItem>
          </CNav>
        );
      case "tech":
        return (
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 2}
                onClick={() => setActiveKey(2)}
              >
                Technical & Support
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                User
              </CNavLink>
            </CNavItem>
          </CNav>
        );
      case "user":
        return (
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
              >
                User
              </CNavLink>
            </CNavItem>
          </CNav>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <NavBar />

      {showSessionExpiredAlert && (
        <CAlert color="danger" className="d-flex align-items-center">
          <CIcon
            color="black"
            icon={cilBan}
            className="flex-shrink-0 me-2"
            width={24}
            height={24}
          />
          <div>Sessão expirada</div>
        </CAlert>
      )}

      <br />

      {renderCnavItems()}
      <div>
        <CNav style={{ width: "1200px" }} variant="tabs" role="tablist">
          <CNavItem>
            <CNavLink
              href="#!"
              active={activeKey === 1}
              onClick={() => setActiveKey(1)}
              hidden
            >
              Administrator
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#!"
              active={activeKey === 2}
              onClick={() => setActiveKey(2)}
              hidden
            >
              Technical & Support
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink
              href="#!"
              active={activeKey === 3}
              onClick={() => setActiveKey(3)}
              hidden
            >
              User
            </CNavLink>
          </CNavItem>
        </CNav>
        <CTabContent>
          <CTabPane
            role="tabpanel"
            aria-labelledby="admin-tab"
            visible={activeKey === 1}
          >
            Essa é a área do Administrador, com visão gerecial do sistema.
            <div></div>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="tech-tab"
            visible={activeKey === 2}
          >
            Área de suporte técnico, com visão técnica.
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="user-tab"
            visible={activeKey === 3}
          >
            <br />

            <div>
              <CContainer fluid>
                <WidgetCoreui visible={activeKey === 3} />
              </CContainer>
            </div>
          </CTabPane>
        </CTabContent>
      </div>
    </>
  );
};

export default Home;
