// ProtectedRoute.jsx

import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import  useAuthentication  from '../hooks/useAuthentication';

export default function ProtectedRoute ({ children }) {
  const { getLoggedInUser } = useAuthentication();
  const loggedInUser = getLoggedInUser();
  console.log('ProtectedRoute - loggedInUser:', loggedInUser);
  // Verifique se o usuário está autenticado
  if (!loggedInUser) {
    // Se não estiver autenticado, redirecione para a página de login
    return <Navigate to="/" />;
  }

  // Se estiver autenticado, renderize o elemento da rota
  return children;
};

//export default ProtectedRoute; // Certifique-se de exportar o componente


