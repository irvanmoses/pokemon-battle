const getPokemon = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await response.json();
  return data;
};

const getPokemonData = async (url) => {
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

export { getPokemon, getPokemonData };
