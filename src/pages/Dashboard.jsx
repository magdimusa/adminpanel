import React from "react";
import img from "../assets/dashboard-bg.jpg";
import "../scss//dashboard.scss";
import { NavLink } from "react-router-dom";
const Dashboard = () => {
  return (
    <div className="dashboard">
      <img src={img} alt="bgImage" />
      <NavLink to="/categories">
        <button>Get started</button>
      </NavLink>
    </div>
  );
};

export default Dashboard;
