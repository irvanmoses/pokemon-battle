import React from "react";

const PokemonList = ({ children }) => {
  return (
    <div id="pokemon-list" className="grid grid-cols-4 gap-x-4">
      {children}
    </div>
  );
};

export default PokemonList;
