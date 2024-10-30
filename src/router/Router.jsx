import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/Login";
import Layout from "../components/layout/Layout";
import Dashboard from "../pages/Dashboard";
import Settings from "../pages/Settings";
import Brands from "../pages/Brands";
import Models from "../pages/Models";
import Locations from "../pages/Locations";
import Cities from "../pages/Cities";
import Cars from "../pages/Cars";
const Router = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token?.includes("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ey")) {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, [token]);
  return (
    <>
      <Routes>
        {token?.length > 0 ? (
          <Route path="/" element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Settings />} />
            <Route path="/brands" element={<Brands />} />
            <Route path="/models" element={<Models />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/cities" element={<Cities />} />
            <Route path="/cars" element={<Cars />} />
          </Route>
        ) : (
          <Route path="/" element={<Login />} />
        )}
      </Routes>
    </>
  );
};

export default Router;
