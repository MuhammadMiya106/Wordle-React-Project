import React from "react";

function Modal({
  gameStatus,
  solutionWord,
  onRestart
}) {

  if (gameStatus === "IN_PROGRESS") {
    return null;
  }

  const won = gameStatus === "WON";

  return (

    <div className="modal-overlay">

      <div className="modal">

        <h2>
          {won ? "Congratulations!" : "Game Over!"}
        </h2>

        <p>
          {won
            ? "You guessed the correct word!"
            : "You have used all six attempts."}
        </p>

        <h3>
          The correct word was: {solutionWord}
        </h3>

        <button onClick={onRestart}>
          Play Again
        </button>

      </div>

    </div>

  );

}

export default Modal;