import React from "react";
import "./layout.scss";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../../pages/Dashboard";
import Sidebar from "../sidebar/Sidebar";
import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";
import Settings from "../../pages/Settings";
import Brands from "../../pages/Brands";
import Models from "../../pages/Models";
const Layout = () => {
  return (
    <>
      <div className="layout">
        <Sidebar />
        <div className="layout-wrapper">
          <Navbar />
          <div className="layout-container">
            <Routes className="routes">
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Settings />} />
              <Route path="/brands" element={<Brands />} />
              <Route path="/models" element={<Models />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;