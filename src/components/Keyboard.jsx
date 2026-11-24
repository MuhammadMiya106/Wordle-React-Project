import React from "react";

const keyboardRows = [
  ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
  ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
  ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"]
];

function Keyboard({ onKeyPress, letterStatuses }) {

  return (

    <div className="keyboard">

      {keyboardRows.map((row, index) => (

        <div className="keyboard-row" key={index}>

          {row.map((key) => (

            <button
              key={key}
              type="button"
              className={`key ${
                letterStatuses[key] || ""
              } ${key.length > 1 ? "wide-key" : ""}`}
              onClick={() => onKeyPress(key)}
            >

              {key === "BACKSPACE" ? "⌫" : key}

            </button>

          ))}

        </div>

      ))}

    </div>

  );

}

export default Keyboard;