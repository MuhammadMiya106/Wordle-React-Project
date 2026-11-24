import React, { useState, useEffect } from "react";

import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import Modal from "./components/Modal";

import { WORDS } from "./words";

// Evaluate the submitted guess
function evaluateGuess(guess, solution) {

  const result = Array(5).fill("absent");

  const remaining = solution.split("");

  // First pass: correct letters
  for (let i = 0; i < 5; i++) {

    if (guess[i] === solution[i]) {

      result[i] = "correct";
      remaining[i] = null;

    }

  }

  // Second pass: present letters
  for (let i = 0; i < 5; i++) {

    if (result[i] === "correct") {
      continue;
    }

    const foundIndex = remaining.indexOf(guess[i]);

    if (foundIndex !== -1) {

      result[i] = "present";
      remaining[foundIndex] = null;

    }

  }

  return result;

}

function App() {

  const [solutionWord, setSolutionWord] = useState(
    () => WORDS[Math.floor(Math.random() * WORDS.length)]
  );

  const [currentGuess, setCurrentGuess] = useState("");

  const [pastGuesses, setPastGuesses] = useState([]);

  const [evaluations, setEvaluations] = useState([]);

  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");

  const [letterStatuses, setLetterStatuses] = useState({});

  const [message, setMessage] = useState("");

  // Handle keyboard input
  function handleKeyPress(key) {

    if (gameStatus !== "IN_PROGRESS") {
      return;
    }

    if (key === "BACKSPACE") {

      setCurrentGuess(previous => previous.slice(0, -1));

      setMessage("");

      return;
    }

    if (key === "ENTER") {

      submitGuess();

      return;
    }

    if (/^[A-Z]$/.test(key)) {

      setCurrentGuess(previous => {

        if (previous.length >= 5) {
          return previous;
        }

        return previous + key;

      });

      setMessage("");

    }

  }

  // Submit guess
  function submitGuess() {

    if (gameStatus !== "IN_PROGRESS") {
      return;
    }

    if (currentGuess.length !== 5) {

      setMessage("Enter a complete 5-letter word.");

      return;
    }

    const result = evaluateGuess(
      currentGuess,
      solutionWord
    );

    const updatedGuesses = [
      ...pastGuesses,
      currentGuess
    ];

    setPastGuesses(updatedGuesses);

    setEvaluations(previous => [
      ...previous,
      result
    ]);

    // Update virtual keyboard colors
    setLetterStatuses(previous => {

      const updated = { ...previous };

      const priority = {
        absent: 1,
        present: 2,
        correct: 3
      };

      currentGuess.split("").forEach((letter, index) => {

        const newStatus = result[index];

        const oldStatus = updated[letter];

        if (
          !oldStatus ||
          priority[newStatus] > priority[oldStatus]
        ) {

          updated[letter] = newStatus;

        }

      });

      return updated;

    });

    // Winning condition
    if (currentGuess === solutionWord) {

      setGameStatus("WON");

    }

    // Losing condition
    else if (updatedGuesses.length === 6) {

      setGameStatus("LOST");

    }

    setCurrentGuess("");

    setMessage("");

  }

  // Physical keyboard event listener
  useEffect(() => {

    function handlePhysicalKey(event) {

      if (
        event.ctrlKey ||
        event.altKey ||
        event.metaKey
      ) {
        return;
      }

      if (event.key === "Backspace") {

        event.preventDefault();

        handleKeyPress("BACKSPACE");

      }

      else if (event.key === "Enter") {

        event.preventDefault();

        handleKeyPress("ENTER");

      }

      else if (/^[a-zA-Z]$/.test(event.key)) {

        handleKeyPress(event.key.toUpperCase());

      }

    }

    window.addEventListener(
      "keydown",
      handlePhysicalKey
    );

    return () => {

      window.removeEventListener(
        "keydown",
        handlePhysicalKey
      );

    };

  }, [currentGuess, pastGuesses, gameStatus, solutionWord]);

  // Restart game
  function restartGame() {

    let newWord = solutionWord;

    while (newWord === solutionWord) {

      newWord = WORDS[
        Math.floor(Math.random() * WORDS.length)
      ];

    }

    setSolutionWord(newWord);

    setCurrentGuess("");

    setPastGuesses([]);

    setEvaluations([]);

    setLetterStatuses({});

    setGameStatus("IN_PROGRESS");

    setMessage("");

  }

  return (

    <div className="app">

      <header className="header">

        <h1>WORDLE</h1>

        <p>Guess the hidden five-letter word</p>

      </header>

      <main>

        <div className="game-info">

          Attempts: {pastGuesses.length}/6

        </div>

        <GameBoard
          pastGuesses={pastGuesses}
          currentGuess={currentGuess}
          evaluations={evaluations}
        />

        <p className="message" aria-live="polite">
          {message}
        </p>

        <Keyboard
          onKeyPress={handleKeyPress}
          letterStatuses={letterStatuses}
        />

      </main>

      <Modal
        gameStatus={gameStatus}
        solutionWord={solutionWord}
        onRestart={restartGame}
      />

      <footer>

        <p>Wordle React Game | 2026</p>

      </footer>

    </div>

  );

}

export default App;