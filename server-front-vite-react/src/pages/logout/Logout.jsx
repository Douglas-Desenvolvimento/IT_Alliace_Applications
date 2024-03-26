import React from 'react';
import '@coreui/coreui/dist/css/coreui.min.css'
import "../Home/rolesUsers.css"
import {
    CButton,
    CCol,
    CContainer,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
  } from '@coreui/react'
 
const LogoutPage = () => {
  // Função para lidar com o logout
  const handleLogout = () => {
    // Implemente aqui a lógica para efetuar o logout do usuário
    // Por exemplo, limpar o token de autenticação, redirecionar para a página de login, etc.
    console.log('Logout realizado com sucesso!');
  };

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-column align-items-center justify-content-center width-800">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={6}>
            <h1 className="display-3 mb-4">Logout</h1>
            <p className="text-body-secondary mb-4">Deseja sair da sua conta?</p>
            <CButton color="primary" onClick={handleLogout}>Logout</CButton>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default LogoutPage;
