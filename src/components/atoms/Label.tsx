import React from "react";

interface LabelProps {
  htmlFor?: string | undefined;
  className?: string;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = ({ htmlFor, className = "", children }) => {
  return (
    <label htmlFor={htmlFor} className={`block select-none ${className}`}>
      {children}
    </label>
  );
};

export default Label;
