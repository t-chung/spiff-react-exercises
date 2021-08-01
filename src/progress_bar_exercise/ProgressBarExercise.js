import React, { useEffect, useMemo, useState } from "react";
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
  const [time, setTime] = useState({
    startTime: 0,
    duration: 0,
  });
  const [finishingSpeed, setFinishingSpeed] = useState(0);
  // emulating status check to see if request finished
  // if currentTime - startTime exceed duration => request finished
  const isFinish = (currentTime, startTime, duration) => {
    return currentTime - startTime >= duration;
  };
  useEffect(() => {
    let interval = null;
    if (done > 0 && done < 100) {
      const intervalTime = 15000/90; // progress from 0 to 90 in 15 seconds
      if (finishingSpeed > 0) {
        interval = setInterval(() => {
          setDone(done + 1);
        }, finishingSpeed);
      } else if (done < 90) {
        interval = setInterval(() => {
          const {startTime, duration} = time;
          if (isFinish(new Date(), startTime, duration)) {
            // request finished early, progress the remaining percentage in 1 second
            clearInterval(interval);
            const remain = 100 - done;
            const newIntervalTime = 1000/remain;
            setFinishingSpeed(newIntervalTime);
          } else {
            setDone(done + 1);
          }
        }, intervalTime);
      } else {
        // request reached 90% but has not finish, stop progressing
        clearInterval(interval);
      }
    }
    return () => {
      if (interval) clearInterval(interval);
    }
  }, [done, time, finishingSpeed]);

  const startClick = () => {
    if (done <= 0 || done >= 100) {
      // reset
      setFinishingSpeed(0);
      setTime({
        startTime: new Date(),
        // randomize request duration between 14 and 16 seconds
        duration: (Math.random() * (16 - 14) + 14) * 1000,
      })
      setDone(1); // trigger start progress bar
    }
  };
  const finishClick = () => {
    setFinishingSpeed(1); // trigger quickly progress to 100
  };
  const barVisibility = useMemo(() => {
    return done === 100 ? "hidden" : "visible";
  }, [done])
  const startButtonText = useMemo(() => {
    return done > 0 && done < 100 ? "LOADING..." : "START REQUEST";
  }, [done])
  return (
    <div>
      <div className={`progress ${barVisibility}`}>
        <div className={`progressDone`} style={{ width: `${done}%` }} />
      </div>
      <button className="progressBarButton" onClick={startClick}>{startButtonText}</button>
      <button className="progressBarButton finishButton" onClick={finishClick}>
        FINISH REQUEST
      </button>
    </div>
  );
};
