import React from "react";
import { capitalize } from "../utils/utils";
import { useNavigate } from "react-router-dom";

import Image from "./Image";

const Others = ({ items, selectedPokemon, enemies }) => {
  const navigate = useNavigate();
  const image = items.sprites.other.dream_world.front_default;
  const token = localStorage.getItem("token");

  const handleClick = () => {
    if (!token) {
      alert("You need to login first!");
      navigate("/login");
    } else {
      selectedPokemon(items);
    }

    if (enemies) {
      localStorage.setItem("enemies", capitalize(items.name));
    } else {
      localStorage.setItem("selected", capitalize(items.name));
    }
  };

  return (
    <button
      onClick={() => handleClick()}
      className="max-w-sm rounded-lg overflow-hidden px-4 py-8 cursor-pointer hover:scale-110 transition-all duration-200"
    >
      <p className="font-bold font-press text-lg mb-2 text-center">
        {capitalize(items.name)}
      </p>
      <Image src={image} className="my-4 mx-auto h-48" />
      {/* <Button onClick={() => handleClick()} type="blue">
        Pilih pokemon
      </Button> */}
    </button>
  );
};

export default Others;
