import React from "react";

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

export default DamageModal;
