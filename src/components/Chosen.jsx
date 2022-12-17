import React from "react";

const Chosen = ({ children, className, forEnemies }) => {
  return (
    <div
      id="chosen-one"
      className={`max-w-sm text-white rounded-tr-lg rounded-bl-lg border-b-4 border-solid rounded-br-lg overflow-hidden shadow-lg px-4 py-6 clip-path ${
        forEnemies
          ? "bg-gradient-to-b from-orange-400 to-orange-500 border-orange-600"
          : "bg-gradient-to-b from-blue-400 to-blue-500 border-blue-600"
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default Chosen;
