import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { capitalize, removeChar } from "../utils/utils";
import Tippy from "@tippyjs/react";
import "tippy.js/animations/scale.css";
import "tippy.js/dist/tippy.css";
import "tippy.js/themes/material.css";

import Layout from "../components/Layout";
import Chosen from "../components/Chosen";
import PokemonList from "../components/PokemonList";
import Others from "../components/Others";
import Image from "../components/Image";
import Button from "../components/Button";

const LocationDetails = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [selected, setSelected] = useState(null);
  const [location, setLocation] = useState([]);
  const [abilities, setAbilities] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/location-area/${id}`).then((res) => {
      res.json().then((data) => setLocation(data));
    });
  }, [id]);

  useEffect(() => {
    const pokemonEncounters = location?.pokemon_encounters?.map(
      (item) => item.pokemon
    );

    if (pokemonEncounters) {
      const promises = pokemonEncounters.map((item) => {
        return fetch(item.url).then((res) => res.json());
      });
      Promise.all(promises).then((data) => setPokemonData(data));
    }
  }, [location]);

  useEffect(() => {
    if (selected) {
      const promises = selected?.abilities.map((item) => {
        return fetch(item.ability.url).then((res) => res.json());
      });
      Promise.all(promises).then((data) => setAbilities(data));
    }
  }, [selected]);

  const pokemonAbilities = abilities.map((item) =>
    item.effect_entries.map((items) => {
      for (let i = 0; i < item.effect_entries.length; i++) {
        if (items.language.name === "en") {
          return items.short_effect;
        }
      }
    })
  );

  const pokemonStats = selected?.stats.slice(1, 6).map((item) => {
    return { name: item.stat.name, base: item.base_stat };
  });

  return (
    <Layout className="flex items-start gap-8">
      <Chosen className="flex-1 w-full" forEnemies>
        <h2 className="font-bold text-2xl text-center">Sang Penantang</h2>
        <Image
          src={selected?.sprites.other.home.front_default}
          className=" mx-auto mt-4 h-64"
        />
        <p className="font-bold font-press text-xl mt-4 text-center">
          {capitalize(selected?.name) || "Pikachu"}
        </p>

        {selected && (
          <div>
            {/* Abilities */}
            <div className="mt-8 flex-col justify-between flex items-center px-2">
              <h2>Abilities</h2>
              <div className="flex items-center gap-3">
                {selected?.abilities.map((item, index) => (
                  <Tippy
                    key={index}
                    content={
                      <div className="p-2 rounded-xl">
                        {pokemonAbilities[index]}
                      </div>
                    }
                    animation="scale"
                    theme="material"
                  >
                    <p key={index} className="font-semibold cursor-pointer">
                      {capitalize(removeChar(item.ability.name, "-"))}
                    </p>
                  </Tippy>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="flex flex-col gap-4 px-2 mt-8">
              {pokemonStats.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between w-full"
                >
                  <p>{capitalize(removeChar(item.name, "-"))}</p>
                  <p className="font-semibold">{item.base}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </Chosen>

      <div className="flex-1">
        <PokemonList>
          {pokemonData.map((item, index) => (
            <Others
              key={index}
              items={item}
              selectedPokemon={setSelected}
              enemies
            />
          ))}
        </PokemonList>
      </div>
    </Layout>
  );
};

export default LocationDetails;
