import React from "react";
import { useState } from "react";
import imgs from "../assets/logo.png";
const NavTest = () => {
  return (
    <div className="container-fluid">
      <ul className="header-nav ms-3" role="navigation">
        <li className="nav-item dropdown">
          <a href="#" className="nav-link py-0" aria-expanded="false">
            <div className="avatar avatar-md">
              {/* <img src={imgs} className="avatar-img"> */}
              <img src={imgs} className="avatar-img" />
            </div>
          </a>
          <ul
            className="dropdown-menu pt-0"
            role="menu"
            aria-hidden="true"
            placement="bottom-end"
          >
            <li>
              <h6 className="dropdown-header bg-light fw-semibold py-2">Account</h6>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default NavTest;
