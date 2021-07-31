import React, { useState } from "react";
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

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };
  const resetClick = () => {

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
    </form>
  );
};
