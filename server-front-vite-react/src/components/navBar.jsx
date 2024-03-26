import React from "react";
import { useState } from "react";
import { CNavbar } from "@coreui/react";
import "../../node_modules/@coreui/coreui/";
import { CContainer } from "@coreui/react";
import { CNavbarBrand } from "@coreui/react";
import { CNavbarToggler } from "@coreui/react";
import { COffcanvas } from "@coreui/react";
import { COffcanvasHeader } from "@coreui/react";
import { COffcanvasTitle } from "@coreui/react";
import { CCloseButton } from "@coreui/react";
import { COffcanvasBody } from "@coreui/react";
import { CNavbarNav } from "@coreui/react";
import { CNavItem } from "@coreui/react";
import { CNavLink } from "@coreui/react";
import { CDropdown } from "@coreui/react";
import { CDropdownToggle } from "@coreui/react";
import { CDropdownMenu } from "@coreui/react";
import { CDropdownItem } from "@coreui/react";
import { CDropdownDivider } from "@coreui/react";
import { CForm } from "@coreui/react";
import { CFormInput } from "@coreui/react";
import { CButton } from "@coreui/react";
import Home from "../pages/Home/Home";
import imgs from "../assets/logo.png";
import avatar from "../assets/avatar.jpg";
import CIcon from '@coreui/icons-react';
import { cilAccountLogout } from '@coreui/icons';
import { CAvatar } from "@coreui/react";
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from "@coreui/react";
const NavBar = () => {
  const [visible, setVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <CNavbar className="bg-body-tertiary">
      <CContainer fluid>
        <img src={imgs} alt="" width="182" height="64" />
        <CNavbarBrand>MANAGEMEN API PANEL</CNavbarBrand>

        <CButton
          color="link" onClick={() => setModalVisible(!modalVisible)}>
            <CIcon icon={cilAccountLogout} title="Logout" />
          </CButton>
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
            <CButton color="success">Sim!</CButton>
          </CModalFooter>
        </CModal>

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
