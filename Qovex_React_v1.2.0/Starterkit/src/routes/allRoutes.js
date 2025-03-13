import React from "react"
import { Navigate } from "react-router-dom"

// Dashboard
import Dashboard from "../pages/Dashboard"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

const userRoutes = [
  { path: "/dashboard", component: <Dashboard /> },

  // //profile
  { path: "/profile", component: <UserProfile/> },


  // this route should be at the end of all other routes
  // { path: "/", exact: true, component: () => <Navigate to="/dashboard" /> },
  { path: "/", exact: true, component: <Dashboard /> },
  

  { path: "*", component: () => <Navigate to="/dashboard" /> },
]

const authRoutes = [

  { path: "/logout", component: <Logout/> },
  { path: "/login", component: <Login/> },
  { path: "/forgot-password", component: <ForgetPwd/> },
  { path: "/register", component: <Register/> },

 
]

export { userRoutes, authRoutes }