import React from "react";

import Image from "./Image";
import Button from "./Button";

const Others = ({ items, selectedPokemon }) => {
  const image = items.sprites.other.dream_world.front_default;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4">
      <p className="font-bold text-xl mb-2 text-center">{items.name}</p>
      <Image src={image} className="my-4 mx-auto h-32" />
      <Button onClick={() => selectedPokemon(items)}>Pilih pokemon</Button>
    </div>
  );
};

export default Others;
