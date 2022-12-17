import React from "react";

const Button = ({ children, onClick, className, type }) => {
  const types = {
    primary: "bg-indigo-500 text-white p-4 hover:bg-indigo-600",
    secondary:
      "text-indigo-600 border border-solid border-indigo-300 p-4 hover:bg-indigo-600 hover:text-white hover:border-transparent",
    orange:
      "px-8 py-4 shadow-md border-b-4 border-solid border-[#FF7644] text-[#fff] font-bold text-lg rounded-xl bg-gradient-to-b from-[#FEA958] to-[#FF944E] active:translate-y-1 active:border-none active:shadow-none active:mt-1",
    blue: "px-8 py-4 shadow-md border-b-4 border-solid border-[#368fec] text-[#fff] font-bold text-lg rounded-xl bg-gradient-to-b from-[#11beff] to-[#46a1ff] active:translate-y-1 active:border-none active:shadow-none active:mt-1",
    red: "px-8 py-4 shadow-md border-b-4 border-solid border-[#e23131] text-[#fff] font-bold text-lg rounded-xl bg-gradient-to-b from-[#ff6666] to-[#ff3f3f] active:translate-y-1 active:border-none active:shadow-none active:mt-1",
    disabled:
      "bg-gray-300 text-gray-500 p-4 filter grayscale hover:bg-gray-300",
  };

  return (
    <button
      className={`w-full rounded-xl transition duration-200 ease-in-out ${
        types[type || "primary"]
      } ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
