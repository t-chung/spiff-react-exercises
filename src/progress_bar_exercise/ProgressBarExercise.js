import React, { useState } from "react";
import Exercise from "../exercise/Exercise";
import "./ProgressBarExercise.css";

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = () => {
  const [done, setDone] = useState(0);
  const startClick = () => {
    setDone(30);
  };
  const finishClick = () => {
    setDone(100);
  };
  return (
    <div>
      <div className="progress">
        <div className="progressDone" style={{ width: `${done}%` }} />
        <button className="progressBarButton" onClick={startClick}>START REQUEST</button>
        <button className="progressBarButton finishButton" onClick={finishClick}>
          FINISH REQUEST
        </button>
      </div>
    </div>
  );
};
