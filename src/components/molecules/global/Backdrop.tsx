import React from "react";

interface BackdropProps {
  isVisible?: boolean;
  onClick?: () => void;
}

const Backdrop: React.FC<BackdropProps> = ({ isVisible, onClick }) => {
  return (
    <div
      style={{ margin: 0 }}
      className={`fixed inset-0 bg-black bg-opacity-60 z-[61] transition-opacity delay-100 duration-300 ease-in-out ${
        isVisible ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
      onClick={onClick}
    ></div>
  );
};

export default Backdrop;
