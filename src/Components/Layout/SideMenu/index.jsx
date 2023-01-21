import React from "react";
import "./SideMenu.css";
import { useNavigate } from "react-router-dom";

const SideMenu = () => {
  const navigate = useNavigate();
  const goToPage = (page) => {
    navigate(page);
  };
  return (
    <div className="sidemenu-con">
      <ul className="sidebar">
        <li className="sidebar-item" onClick={() => goToPage("/dashboard")}>
          Dashboard
        </li>
        <li className="sidebar-item" onClick={() => goToPage("/users")}>
          Users
        </li>
        <li className="sidebar-item">Products</li>
        <li className="sidebar-item">Orders</li>
        <li className="sidebar-item">Delivery</li>
        <li className="sidebar-item">Notifications</li>
        <li className="sidebar-item">Settings</li>
        <li className="sidebar-item">Profile</li>
        <li className="sidebar-item">Logout</li>
      </ul>
    </div>
  );
};

export default SideMenu;
