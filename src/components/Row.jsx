import React from "react";
import Tile from "./Tile";

function Row({
  guess,
  currentGuess,
  isCurrent,
  evaluation
}) {

  const letters = isCurrent
    ? currentGuess.split("")
    : (guess || "").split("");

  return (

    <div className="row">

      {Array.from({ length: 5 }).map((_, index) => (

        <Tile
          key={index}
          letter={letters[index] || ""}
          status={
            isCurrent
              ? ""
              : evaluation?.[index] || ""
          }
        />

      ))}

    </div>

  );

}

export default Row;