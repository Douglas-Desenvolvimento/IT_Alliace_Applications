import React, { useState, useEffect } from "react";
import { useNavigate  } from "react-router-dom"; // Importação do useHistory
import {
  CNavbar,
  CContainer,
  CNavbarBrand,
  CButton,
  CAvatar,
  COffcanvas,
  COffcanvasHeader,
  COffcanvasTitle,
  CCloseButton,
  COffcanvasBody,
  CNavbarNav,
  CNavItem,
  CNavLink,
  CListGroup,
  CListGroupItem,
  CModal,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
import imgs from "../assets/logo.png";
import avatar from "../assets/avatar.jpg";
import CIcon from "@coreui/icons-react";
import { cilAccountLogout } from "@coreui/icons";
import useAuthentication from "../hooks/useAuthentication.jsx";

const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { getLoggedInUser, logout } = useAuthentication();
  const usuario = getLoggedInUser();
  const navigate = useNavigate(); // Inicialização do useHistory

  useEffect(() => {
    //console.log('NavBar - Usuário logado do useAutenticator:', usuario);
    // console.log('NavBar - Role do usuário logado do useAutenticator:', usuario.role);
  }, [usuario]);

  // Função para lidar com o logout e o redirecionamento
  const handleLogout = () => {
    logout(); // Função de logout
    setModalVisible(false); // Fechar o modal de confirmação
    navigate("/"); // Redirecionamento para a página de login
  };

  return (
    <CNavbar className="bg-body-tertiary">
      <CContainer fluid>
        <img src={imgs} alt="" width="182" height="64" />
        <CNavbarBrand>MANAGEMEN API PANEL</CNavbarBrand>
        <div style={{ display: "flex", alignItems: "center" }}>
          <CAvatar
            size="md"
            src={avatar}
            className="avatar-img"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
            aria-label="Toggle navigation"
            onClick={() => setVisible(!visible)}
          />
          <CButton
            color="link"
            onClick={() => setModalVisible(!modalVisible)}
            style={{ marginLeft: "10px" }} // Espaçamento entre o avatar e o botão
          >
            <CIcon icon={cilAccountLogout} size="xl" title="Logout" />
          </CButton>
        </div>
        <CModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          aria-labelledby="LiveDemoExampleLabel"
        >
          <CModalBody onClose={() => setModalVisible(false)}>
            <p>Deseja Sair?</p>
          </CModalBody>
          <CModalFooter>
            <CButton color="secondary" onClick={() => setModalVisible(false)}>
              Não!
            </CButton>
            {/* Chamar a função handleLogout no clique do botão "Sim" */}
            <CButton color="success" onClick={handleLogout}>
              Sim!
            </CButton>
          </CModalFooter>
        </CModal>

        <COffcanvas
          id="offcanvasNavbar"
          placement="end"
          portal={false}
          visible={visible}
          onHide={() => setVisible(false)}
        >
          <COffcanvasHeader>
            <COffcanvasTitle>MENU</COffcanvasTitle>
            <CCloseButton
              className="text-reset"
              onClick={() => setVisible(false)}
            />
          </COffcanvasHeader>
          <COffcanvasBody>
            <CNavbarNav>
              <CNavItem>
                <CNavLink href="#">Perfil</CNavLink>
                <CAvatar size="md" src={avatar} className="avatar-img" />
                <CListGroup flush>
                  <CListGroupItem>
                    Nome: {usuario ? usuario.username : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    E-mail: {usuario ? usuario.email : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    Telefone: {usuario ? usuario.telefone : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    Empresa: {usuario ? usuario.empresa : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    Site-id: {usuario ? usuario.siteid : "Não disponível"}
                  </CListGroupItem>
                  <CListGroupItem>
                    Perfil de acesso:{" "}
                    {usuario ? usuario.role : "Não disponível"}
                  </CListGroupItem>
                  {/* Adicione outros campos do usuário conforme necessário */}
                </CListGroup>
              </CNavItem>
              <CNavItem></CNavItem>
            </CNavbarNav>
          </COffcanvasBody>
        </COffcanvas>
      </CContainer>
    </CNavbar>
  );
};

export default NavBar;
