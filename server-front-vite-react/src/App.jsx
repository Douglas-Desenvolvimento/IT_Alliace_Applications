import { useState } from "react";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
//paginas

import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Page404 from "./pages/page404/Page404";
import Page500 from "./pages/page500/Page500";
import Profile from "./pages/profile/Profile";
import Logout from "./pages/logout/Logout";
//fim das paginas
function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            {/* //<Route path="/login" element={<Login />} /> */}
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<Page404 />} />
            <Route path="/500" element={<Page500 />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
        
      </div>
    </>
  );
}

export default App;
