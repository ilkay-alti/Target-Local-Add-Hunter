import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface AnimatedInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  inputClassName?: string;
  labelClassName?: string;
}

const AnimatedInput: React.FC<AnimatedInputProps> = ({
  label = "Email Address", // Default label
  placeholder = "Email", // Default placeholder
  type = "text", // Default input type
  value = "", // Input value
  onChange, // Input change handler
  className = "", // Extra classes
  inputClassName = "", // Extra classes for input
  labelClassName = "", // Extra classes for label
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`absolute bottom-full mb-1 ${labelClassName}`}
          >
            <label className="text-gray-900">{label}</label>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.input
        type={type}
        placeholder={isFocused ? "" : placeholder}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`outline-none rounded-md w-full h-12 px-4 border border-gray-400 ${inputClassName}`}
        initial={{ opacity: 1 }}
        animate={{ opacity: isFocused ? 1 : 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );
};

export default AnimatedInput;
