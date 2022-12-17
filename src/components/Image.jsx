import React from "react";

const Image = ({ src, className }) => {
  const default_img =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/25.svg";

  return (
    <img src={src ? src : default_img} className={className} alt="image" />
  );
};

export default Image;
