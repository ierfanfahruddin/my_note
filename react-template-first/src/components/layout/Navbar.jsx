import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { AuthContext } from "../../context/AuthContext";
import './Navbar.css'; // Pastikan untuk mengimpor CSS yang sesuai

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Mengatur isAuthenticated ke false
    navigate("/login"); // Mengarahkan ke halaman login
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="navbar-brand">
        <h2>Admin Dashboard</h2>
      </div>
      <div className="navbar-actions">
        <div className="user-profile">
          <span>Welcome, Admin</span>
        </div>
        <motion.button
          className="logout-button"
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Logout
        </motion.button>
      </div>
    </motion.nav>
  );
};

export default Navbar;