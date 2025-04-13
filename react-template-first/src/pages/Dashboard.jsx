import React from "react";
import { motion } from "framer-motion";
import OverviewCard from "../components/dashboard/OverviewCard";

const Dashboard = () => {
  return (
    <motion.div
      className="dashboard-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Dashboard</h1>
      <div className="overview">
        <OverviewCard title="Total Users" value="1,234" />
        <OverviewCard title="Active Sessions" value="567" />
        <OverviewCard title="Revenue" value="$12,345" />
      </div>
    </motion.div>
  );
};

export default Dashboard;