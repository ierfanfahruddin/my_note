import React from "react";
import { motion } from "framer-motion";

const OverviewCard = ({ title, value }) => {
  return (
    <motion.div
      className="overview-card"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <h3>{title}</h3>
      <p>{value}</p>
    </motion.div>
  );
};

export default OverviewCard;