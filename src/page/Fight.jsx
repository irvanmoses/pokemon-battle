import cn from "classnames";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Button from "../components/Button";
import Layout from "../components/Layout";

const Fight = () => {
  const [selectedHealth, setSelectedHealth] = useState(100);
  const [enemyHealth, setEnemyHealth] = useState(100);
  const [selectedDamage, setSelectedDamage] = useState(0);
  const [enemyDamage, setEnemyDamage] = useState(0);
  const [char1Image, setChar1Image] = useState("");
  const [char2Image, setChar2Image] = useState("");
  const [visible, setVisible] = useState(false);
  const [winner, setWinner] = useState("");
  const character1 = localStorage.getItem("selected");
  const character2 = localStorage.getItem("enemies");
  const player = localStorage.getItem("username");
  const token = localStorage.getItem("token");
  console.log(winner);

  const handleFight = () => {
    const damage = Math.floor(Math.random() * 10) + 1;
    const random = Math.floor(Math.random() * 2) + 1;

    if (random === 1) {
      setSelectedHealth(selectedHealth - damage);
      setSelectedDamage(damage);
    }
    if (random === 2) {
      setEnemyHealth(enemyHealth - damage);
      setEnemyDamage(damage);
    }
    if (selectedHealth - damage < 0) {
      setSelectedHealth(0);
      alert("You lose");
      setSelectedHealth(100);
      setEnemyHealth(100);
    }
    if (enemyHealth - damage < 0) {
      setEnemyHealth(0);
      alert("You win");
      setSelectedHealth(100);
      setEnemyHealth(100);
    }

    setVisible(true);
    setTimeout(() => {
      setVisible(false);
    }, 1500);

    setTimeout(() => {
      setSelectedDamage(0);
      setEnemyDamage(0);
    }, 1500);
  };

  const handlesFight = () => {
    fetch("https://kobarsept.com/api/fight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        character1: character1,
        character2: character2,
        player: player,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setWinner(data.winner);

        if (data.winner === character1) {
          setSelectedHealth(selectedHealth - 10);
        } else if (data.winner === character2) {
          setEnemyHealth(enemyHealth - 10);
        }

        if (selectedHealth - 10 <= 0) {
          setSelectedHealth(0);
          alert("You lose");
          setSelectedHealth(100);
          setEnemyHealth(100);
        } else if (enemyHealth - 10 <= 0) {
          setEnemyHealth(0);
          alert("You win");
          setSelectedHealth(100);
          setEnemyHealth(100);
        }

        setVisible(true);
        setTimeout(() => {
          setVisible(false);
        }, 1500);
      });
  };

  const handleReset = () => {
    setSelectedHealth(100);
    setEnemyHealth(100);
    setSelectedDamage(0);
    setEnemyDamage(0);
  };

  useEffect(() => {
    fetch(
      `https://pokeapi.co/api/v2/pokemon/${character1?.toLowerCase() || ""}`
    )
      .then((res) => res.json())
      .then((data) => {
        setChar1Image(data?.sprites?.other.home.front_default);
      });

    fetch(
      `https://pokeapi.co/api/v2/pokemon/${character2?.toLowerCase() || ""}`
    )
      .then((res) => res.json())
      .then((data) => {
        setChar2Image(data?.sprites?.other.home.front_default);
      });
  }, [character1, character2]);

  //   useEffect(() => {
  //     const fight = async () => {
  //       const res = await fetch("https://kobarsept.com/api/fight", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           character1: character1,
  //           character2: character2,
  //           player: player,
  //         }),
  //       });
  //       const data = await res.json();
  //       console.log(data);
  //     };

  //     fight();
  //   }, [character1, character2, player, token]);

  const DamageModal = ({ forSelected, forEnemies }) => {
    return (
      <div
        className={cn(
          "absolute top-24 left-0 w-full h-full flex flex-col items-center justify-start",
          visible ? "block" : "hidden"
        )}
      >
        {forSelected && selectedDamage > 0 && (
          <p className="font-press text-4xl text-red-500">-{selectedDamage}</p>
        )}
        {forEnemies && enemyDamage > 0 && (
          <p className="font-press text-4xl text-red-500">-{enemyDamage}</p>
        )}
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex items-center gap-20">
        <div className="flex flex-1 flex-col items-center gap-4 relative">
          <div className="text-center">
            <p className="text-lg font-bold text-blue-500 mb-2">You</p>
            <p className="font-bold font-press text-2xl">{character1}</p>
          </div>
          {char1Image && <img src={char1Image} alt="character1" />}
          <div className="healtbar rounded-full bg-blue-100 w-full">
            <div
              className="health rounded-full bg-blue-400 text-center font-bold text-white py-2"
              style={{ width: `${selectedHealth}%` }}
            >
              {selectedHealth}
            </div>
          </div>
          <DamageModal forSelected />
        </div>
        <div className="btn-group flex flex-col gap-6">
          <Button
            type={character1 && character2 ? "blue" : "disabled"}
            className="w-48 rounded-full"
            onClick={character1 && character2 ? () => handleFight() : null}
          >
            <img
              src="https://www.pngmart.com/files/2/Pokeball-PNG-Photos.png"
              alt="pokeball"
              className="w-100"
            />
            <div className="text-lg uppercase font-bold">Fight</div>
          </Button>
          <Button
            type="orange"
            className="w-48 rounded-full"
            onClick={() => handleReset()}
          >
            Reset
          </Button>
          <Link
            to="/"
            className="text-center font-semibold text-blue-600 hover:underline"
          >
            Back to home
          </Link>
        </div>
        <div className="flex flex-1 flex-col items-center gap-4 relative">
          <div className="text-center">
            <p className="text-lg font-bold text-red-500 mb-2">Enemies</p>
            <p className="font-bold font-press text-2xl">{character2}</p>
          </div>
          {char2Image && <img src={char2Image} alt="character2" />}
          <div className="healtbar rounded-full bg-red-100 w-full">
            <div
              className="health bg-red-400 rounded-full text-center font-bold text-white py-2"
              style={{ width: `${enemyHealth}%` }}
            >
              {enemyHealth}
            </div>
          </div>
          <DamageModal forEnemies />
        </div>
      </div>
    </Layout>
  );
};

export default Fight;
