import React, { useState } from "react";
import "./navbar.scss";
import { IoPersonOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    toast.warning("You are logged out!");
  };
  return (
    <div className="nav">
      <button className="nav-right">
        <svg
          viewBox="64 64 896 896"
          focusable="false"
          data-icon="menu-fold"
          width="1em"
          height="1em"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM115.4 518.9L271.7 642c5.8 4.6 14.4.5 14.4-6.9V388.9c0-7.4-8.5-11.5-14.4-6.9L115.4 505.1a8.74 8.74 0 000 13.8z"></path>
        </svg>
      </button>
      <div
        className="user-menu"
        onClick={() => setIsDropdownOpen(true)}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button className="user-menu__button">
          <span>
            <IoPersonOutline />
          </span>
          <p>Admin</p>
        </button>
        {isDropdownOpen && (
          <div className="user-menu__dropdown">
            <button className="user-menu__logout" onClick={logOut}>
              LogOut
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
