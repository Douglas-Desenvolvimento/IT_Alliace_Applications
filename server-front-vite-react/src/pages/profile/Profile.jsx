// Login.js
import React, { useState } from "react";
import "../Home/rolesUsers.css"
import avatar from '../../assets/avatar.jpg'
import logo from '../../assets/logo.png'
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser, cilPhone } from "@coreui/icons";
import {
 
  CAvatar,
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import useAuthentication from "../../hooks/useAuthentication";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, error } = useAuthentication();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      console.log("Login bem-sucedido!");

      setUsername("");
      setPassword("");
    } else {
      console.log("Login falhou!");
    }
  };

  return (
    
    
    <div  className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center width-800">
      
    
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            {/* <img src={logo} alt=" logo" /> */}
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                <CAvatar size="md" src={avatar} className="avatar-img" />
                  <CForm onSubmit={handleSubmit}>
                    <h1>Perfil</h1>
                    <p className="text-body-secondary">
                     Seu perfil
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                      <CIcon icon={cilUser} />
                        <i className="cil-user"></i>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Username"
                        autoComplete="username"
                        value={username}
                        onChange={handleUsernameChange}
                        disabled
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-3">
                    <CInputGroupText>@</CInputGroupText>
                    <CFormInput placeholder="Email" autoComplete="email"
                        value={"eu@email.com.br"}
                        onChange={handleUsernameChange} 
                        disabled
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                  <CInputGroupText>
                      <CIcon icon={cilPhone} />
                        <i className="cil-user"></i>
                      </CInputGroupText>
                    <CFormInput placeholder="Telefone" autoComplete="telefone"  
                        value={"2415577500"}
                        onChange={handleUsernameChange} 
                        disabled
                    />
                    
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                      <CInputGroupText>
                      <CIcon icon={cilUser} />
                        <i className="cil-user"></i>
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Empresa"
                        autoComplete="Empresa"
                        value={"empresa"}
                        onChange={handleUsernameChange}
                        disabled
                      />
                    </CInputGroup>
                    {/* <CInputGroup className="mb-4">
                      <CInputGroupText>@
                        <i className="cil-lock-locked"></i>
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={password}
                        onChange={handlePasswordChange}
                      />
                    </CInputGroup> */}
                    <CRow>
                      <CCol xs={6}>
                        <CButton type="submit" color="primary" className="px-4" hidden>
                          Salvar
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Alterar a senha?
                        </CButton>
                      </CCol>
                    </CRow>
                    {error && <p className="text-danger">{error}</p>}
                  </CForm>
                </CCardBody>
              </CCard>
              {/* <CCard
                className="text-white bg-primary py-5"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua.
                    </p>
                    <Link to="/register">
                      <CButton
                        color="primary"
                        className="mt-3"
                        active
                        tabIndex={-1}
                      >
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard> */}
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
