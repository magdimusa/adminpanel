import React from "react";
import "./sidebar.scss";
import { NavLink, useLocation } from "react-router-dom";
import { IoHome } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { BsShopWindow } from "react-icons/bs";
import { GiCarKey } from "react-icons/gi";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaCity } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";

const Sidebar = () => {
  const location = useLocation();
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <NavLink to="dashboard">
          <h3 className="sidebar__title">AvtozoomAdmin</h3>
        </NavLink>
      </div>
      <ul className="sidebar__menu">
        <li className="sidebar__item">
          <NavLink to="/dashboard" className="navlink">
            <button
              className={`${location.pathname === "/dashboard" ? "focus" : ""}`}
            >
              <IoHome />
              Dashboard
            </button>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to="/categories" className="navlink">
            <button
              className={`${
                location.pathname === "/categories" ? "focus" : ""
              }`}
            >
              <IoSettingsOutline />
              Settings
            </button>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to="/brands" className="navlink">
            <button
              className={`${location.pathname === "/brands" ? "focus" : ""}`}
            >
              <BsShopWindow />
              Brands
            </button>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to="/models" className="navlink">
            <button
              className={`${location.pathname === "/models" ? "focus" : ""}`}
            >
              <GiCarKey />
              Models
            </button>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to="/locations" className="navlink">
            <button
              className={`${location.pathname === "/locations" ? "focus" : ""}`}
            >
              <FaMapLocationDot />
              Locations
            </button>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to="/cities" className="navlink">
            <button
              className={`${location.pathname === "/cities" ? "focus" : ""}`}
            >
              <FaCity />
              Cities
            </button>
          </NavLink>
        </li>
        <li className="sidebar__item">
          <NavLink to="/cars" className="navlink">
            <button
              className={`${location.pathname === "/cars" ? "focus" : ""}`}
            >
              <IoCarSportSharp />
              Cars
            </button>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
