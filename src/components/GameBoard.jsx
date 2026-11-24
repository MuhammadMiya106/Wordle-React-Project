import React from "react";
import Row from "./Row";

function GameBoard({
  pastGuesses,
  currentGuess,
  evaluations
}) {

  return (

    <div className="game-board">

      {Array.from({ length: 6 }).map((_, index) => {

        const isCurrent =
          index === pastGuesses.length;

        return (

          <Row
            key={index}
            guess={pastGuesses[index]}
            currentGuess={currentGuess}
            isCurrent={isCurrent}
            evaluation={evaluations[index]}
          />

        );

      })}

    </div>

  );

}

export default GameBoard;