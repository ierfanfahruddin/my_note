import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);

  // Jika sudah login, alihkan ke dashboard
  // Jika belum login, render children (misalnya, halaman Login)
  return isAuthenticated ? <Navigate to="/" /> : children;
};

export default PublicRoute;