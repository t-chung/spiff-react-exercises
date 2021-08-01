import React, { useMemo, useState } from "react";
import Exercise from "../exercise/Exercise";
import "./ParserExercise.css";

const ParserExercise = () => {
  return (
    <div className="parser">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/2"
        title="Parser Exercise"
      />
    </div>
  );
};

export default ParserExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  const [inputString, setInputString] = useState("");
  const [output, setOutput] = useState({});

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
    const letterCount = {};
    // initialize leterCount with all letters of the alphabet
    alphabet.forEach((letter) => {
      letterCount[letter] = 0;
    });
    // traverse the inputString and count each alphabetical letter
    [...inputString].forEach((char) => {
      if (letterCount.hasOwnProperty(char)) {
        letterCount[char] = letterCount[char] + 1;
      }
    });
    setOutput(letterCount);
  };

  const displayOutput = useMemo(() => {
    // create a list from output
    return (
      <div>
        <ul>
          {Object.keys(output).map((char) => {
            return <li key={char}><b>{char}</b> {output[char]}</li>
          })}
        </ul>
      </div>
    )
  }, [output]);
  const resetClick = () => {
    setInputString("");
  };
  return (
    <form onSubmit={handleSubmit}>
      <label>Phrase:</label>
      <div>
        <textarea
          id="parser-input"
          name="parser-input"
          rows="4"
          value={inputString}
          onChange={e => setInputString(e.target.value)}
        />
      </div>
      <button className="parserButton" type="submit">START REQUEST</button>
      <button className="parserButton resetButton" onClick={resetClick}>
        RESET
			</button>
      {displayOutput}
    </form>
  );
};
