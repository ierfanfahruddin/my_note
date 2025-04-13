import React from "react";
import { motion } from "framer-motion";

const Input = ({ inputRef, placeholder, onKeyDown }) => {
  return (
    <motion.input
      ref={inputRef}
      type="text"
      placeholder={placeholder}
      onKeyDown={onKeyDown}
      whileFocus={{ borderColor: "#007bff" }}
      transition={{ duration: 0.2 }}
    />
  );
};

export default Input;