import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.div
        className={`sidebar ${isOpen ? "open" : ""}`}
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="sidebar-logo">
          <img src="/assets/images/logo.png" alt="Logo" />
        </div>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/" activeClassName="active">
              <img src="/assets/images/icons/dashboard.png" alt="Dashboard" />
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/users" activeClassName="active">
              <img src="/assets/images/icons/users.png" alt="Users" />
              Users
            </NavLink>
          </li>
          <li>
            <NavLink to="/settings" activeClassName="active">
              <img src="/assets/images/icons/settings.png" alt="Settings" />
              Settings
            </NavLink>
          </li>
        </ul>
      </motion.div>
      <motion.button
        className="sidebar-toggle"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        style={{ display: "none" }}
      >
        ☰
      </motion.button>
    </>
  );
};

export default Sidebar;