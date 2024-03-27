// Home.jsx
import React from "react";
import { useState, useEffect } from "react";
import { checkSessionExpiration } from "../../hooks/sessionToken";
//import {useAuthentication } from "../../hooks/useAuthentication";
import "../../../node_modules/@coreui/coreui/";
import { CContainer, CHeader } from "@coreui/react";
import { CRow } from "@coreui/react";
import { CCol } from "@coreui/react";
import "./rolesUsers.css"; // Importa o arquivo CSS de estilos
import NavBar from "../../components/navBar";
import { CNav, CNavItem, CNavLink } from "@coreui/react";
import { CTabContent, CTabPane } from "@coreui/react";
import { CChart } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import { CAlert } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBurn } from "@coreui/icons";

const Home = () => {
  const [activeKey, setActiveKey] = useState(""); // Define a aba ativa com base na role do usuário
  const [showSessionExpiredAlert, setShowSessionExpiredAlert] = useState(false);

  const uu = "tech";

  //função para checar a expiração do token
  useEffect(() => {
    checkSessionExpiration(setShowSessionExpiredAlert);
  }, []);


  
  // Função para renderizar as colunas com base na role do usuário

  const renderCnavItems = () => {
    switch (uu) {
      case "admin":
        return (
          <CNav variant="tabs" role="tablist">
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 1}
                onClick={() => setActiveKey(1)}
                //enabled={uu}
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
                //    enabled={uu}
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
                //  enabled={uu}
              >
                Technical & Support
              </CNavLink>
            </CNavItem>
            <CNavItem>
              <CNavLink
                href="#!"
                active={activeKey === 3}
                onClick={() => setActiveKey(3)}
                //    enabled={uu}
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
                //    enabled={uu}
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
      {/* alerta informando que a sessão expirou */}
      {showSessionExpiredAlert && (
      <CAlert color="danger" className="d-flex align-items-center" >
        <CIcon icon={cilBurn} className="flex-shrink-0 me-2" width={24} height={24} />
        <div>An example danger alert with an icon</div>  
      </CAlert>
      )}

      <NavBar />
      <br></br>

      {renderCnavItems()}
      <div>
        <CNav variant="tabs" role="tablist">
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
            <div className="width-800" > 
              <span >
                Essa é a área do Administrador, com visão gerecial do sistema.
              </span>
              <br></br>
            </div>
            <div >
              <CContainer fluid  >
                
              <CChart
              
                type="line" 
                data={{
                  labels: ["January", "February", "March", "April", "May", "June", "July"],
                  datasets: [
                    {
                      label: "My First dataset",
                      backgroundColor: "rgba(220, 220, 220, 0.2)",
                      borderColor: "rgba(220, 220, 220, 1)",
                      pointBackgroundColor: "rgba(220, 220, 220, 1)",
                      pointBorderColor: "#fff",
                      data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                    },
                    {
                      label: "My Second dataset",
                      backgroundColor: "rgba(151, 187, 205, 0.2)",
                      borderColor: "rgba(151, 187, 205, 1)",
                      pointBackgroundColor: "rgba(151, 187, 205, 1)",
                      pointBorderColor: "#fff",
                      data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                    },
                  ],
                }}
                options={{
                  plugins: {
                    legend: {
                      labels: {
                        color: getStyle('--cui-body-color'),
                      }
                    }
                  },
                  scales: {
                    x: {
                      grid: {
                        color: getStyle('--cui-border-color-translucent'),
                      },
                      ticks: {
                        color: getStyle('--cui-body-color'),
                      },
                    },
                    y: {
                      grid: {
                        color: getStyle('--cui-border-color-translucent'),
                      },
                      ticks: {
                        color: getStyle('--cui-body-color'),
                      },
                    },
                  },
                }}
              />
                <CChart
              
              type="line" 
              data={{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "rgba(220, 220, 220, 0.2)",
                    borderColor: "rgba(220, 220, 220, 1)",
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#fff",
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                  },
                  {
                    label: "My Second dataset",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: getStyle('--cui-body-color'),
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    ticks: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                  y: {
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    ticks: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                },
              }}
            />
                <CContainer>
                  <CRow xs={{ cols: 2, gutter: 2 }} lg={{ cols: 5, gutter: 3 }}>
                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>

                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>

                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>
                  </CRow>
                </CContainer>
              </CContainer>
            </div>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="tech-tab"
            visible={activeKey === 2}
          >
            Área de suporte técnico, com visão técnica.
            <div>
              <CContainer fluid>
                <CContainer>
                  <CRow xs={{ cols: 2, gutter: 2 }} lg={{ cols: 5, gutter: 3 }}>
                    <CCol>
                    <CChart
              
              type="line" 
              data={{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "rgba(220, 220, 220, 0.2)",
                    borderColor: "rgba(220, 220, 220, 1)",
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#fff",
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                  },
                  {
                    label: "My Second dataset",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: getStyle('--cui-body-color'),
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    ticks: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                  y: {
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    ticks: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                },
              }}
            />
                    </CCol>
                    <CCol>
                    <CChart
              
              type="line" 
              data={{
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                  {
                    label: "My First dataset",
                    backgroundColor: "rgba(220, 220, 220, 0.2)",
                    borderColor: "rgba(220, 220, 220, 1)",
                    pointBackgroundColor: "rgba(220, 220, 220, 1)",
                    pointBorderColor: "#fff",
                    data: [40, 20, 12, 39, 10, 40, 39, 80, 40]
                  },
                  {
                    label: "My Second dataset",
                    backgroundColor: "rgba(151, 187, 205, 0.2)",
                    borderColor: "rgba(151, 187, 205, 1)",
                    pointBackgroundColor: "rgba(151, 187, 205, 1)",
                    pointBorderColor: "#fff",
                    data: [50, 12, 28, 29, 7, 25, 12, 70, 60]
                  },
                ],
              }}
              options={{
                plugins: {
                  legend: {
                    labels: {
                      color: getStyle('--cui-body-color'),
                    }
                  }
                },
                scales: {
                  x: {
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    ticks: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                  y: {
                    grid: {
                      color: getStyle('--cui-border-color-translucent'),
                    },
                    ticks: {
                      color: getStyle('--cui-body-color'),
                    },
                  },
                },
              }}
            />
                    </CCol>
                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 tech-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 tech-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 tech-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 user-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 user-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>
                  </CRow>
                </CContainer>
              </CContainer>
            </div>
          </CTabPane>
          <CTabPane
            role="tabpanel"
            aria-labelledby="user-tab"
            visible={activeKey === 3}
          >
            Área do usuário, com visão de usuário.
            <div>
              <CContainer fluid>
                <CContainer>
                  <CRow xs={{ cols: 2, gutter: 2 }} lg={{ cols: 5, gutter: 3 }}>
                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 user-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 tech-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 tech-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 tech-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 user-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 user-col">Row column</div>
                    </CCol>
                    <CCol>
                      <div className="p-3 admin-col">Row column</div>
                    </CCol>
                  </CRow>
                </CContainer>
              </CContainer>
            </div>
          </CTabPane>
        </CTabContent>
      </div>
    </>
  );
};

export default Home;
