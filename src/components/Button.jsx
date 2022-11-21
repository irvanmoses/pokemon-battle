import React from "react";

const Button = ({ children, onClick }) => {
  return (
    <button
      className="rounded bg-indigo-500 text-white p-4 w-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
