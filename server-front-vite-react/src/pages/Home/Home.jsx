// Home.jsx
import React, { useState, useEffect } from "react";
import { useSession } from "../../hooks/sessionToken";
import "../../../node_modules/@coreui/coreui/";
import { CContainer } from "@coreui/react";
import { CNav, CNavItem, CNavLink } from "@coreui/react";
import { CTabContent, CTabPane } from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBan} from "@coreui/icons";
import { CModal, CModalHeader, CModalTitle, CModalBody, CModalFooter, CButton } from "@coreui/react";
import NavBar from "../../components/navBar";
import useAuthentication from "../../hooks/useAuthentication.jsx";
import { useNavigate } from 'react-router-dom';
import NewTable from '../../components/newTable.jsx'
import NewWidget from '../../components/newWidget'

const Home = () => {
  const [activeKey, setActiveKey] = useState();
  const { visible} = useSession();
  const { getLoggedInUser } = useAuthentication();
  const [usuario, setUsuario] = useState(null);
  
 

  useEffect(() => {
    const fetchAllservices = async () => {
      try {
        const userData = getLoggedInUser();

        if (!usuario) {
          setUsuario(userData);
        }
      } catch (error) {
        console.error("Erro ao buscar os serviços:", error.message);
      }
    };

    fetchAllservices();
  }, [getLoggedInUser, usuario]);

  const renderCnavItems = () => {
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
  const navigate = useNavigate();
  const { logout } = useAuthentication();
  const handleLogout = () => {
    // Chame a função de logout
    logout();
    // Após fazer logout, redirecione para a página de login
    navigate('/');
  };
  
  return (
    <>
      <NavBar />
    {visible && (
      <CModal
      backdrop="static"
      visible={visible}
      onClose={() => setVisible(false)}
      aria-labelledby="StaticBackdropExampleLabel"
      className="d-flex justify-content-center"
    >
      <CModalHeader className="d-flex justify-content-center">
        <CModalTitle className="d-flex justify-content-center" id="StaticBackdropExampleLabel">Sessão Expirada, efetur um novo login</CModalTitle>
      </CModalHeader>
      <CModalBody className="d-flex justify-content-center align-items-center">
      <CIcon
          color="black"
          icon={cilBan}
          
          width={84}
          height={84}
          
        />
      </CModalBody>
      <CModalFooter className="d-flex justify-content-center">
        <CButton onClick={handleLogout} color="primary">Login</CButton>
      </CModalFooter>
    </CModal>
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
            <br />

            <div>
              <CContainer fluid>
                {/* <NiceDash /> */}
              </CContainer>
            </div>
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
                <NewWidget />
                <NewTable />
              </CContainer>
            </div>
          </CTabPane>
        </CTabContent>
      </div>
    </>
  );
};

export default Home;
