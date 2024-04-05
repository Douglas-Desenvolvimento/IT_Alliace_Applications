import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./components/ProtectedRoute";
// Páginas
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Page404 from "./pages/page404/Page404";
import Page500 from "./pages/page500/Page500";
import Profile from "./pages/profile/Profile";
import Logout from "./pages/logout/Logout";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/register" element={<Register />} />  
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/logout" element={<ProtectedRoute><Logout /></ProtectedRoute>} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/500" element={<Page500 />} />
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<Login />} />
        
        
        
        

      </Routes>
    </Router>
  );
}

export default App;
