import React, { useState } from "react";

import Chosen from "./Chosen";
import PokemonList from "./PokemonList";
import Others from "./Others";
import Image from "./Image";

const Page = ({ items }) => {
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  return (
    <div className="p-6">
      <Chosen>
        <h2 className="font-bold text-xl mb-2 text-center">Sang Terpilih</h2>
        <Image
          src={selectedPokemon?.sprites.other.dream_world.front_default}
          className="my-4 mx-auto h-64"
        />
        <p className="font-bold text-xl mb-2 text-center">
          {selectedPokemon?.name || "Pikachu"}
        </p>
      </Chosen>
      <PokemonList>
        {items.slice(0, 8).map((item, index) => {
          return (
            <Others
              key={index}
              items={item}
              selectedPokemon={setSelectedPokemon}
            />
          );
        })}
      </PokemonList>
    </div>
  );
};

export default Page;
