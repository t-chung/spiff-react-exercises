import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Exercise from "../exercise/Exercise";
import "./ProgressBarExercise.css";

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution breakPoints={[30, 60, 10, 20]}/>}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

const Solution = ({breakPoints}) => {
  const [done, setDone] = useState(0);
  const [time, setTime] = useState({
    startTime: 0,
    duration: 0,
  });
  const [finishingSpeed, setFinishingSpeed] = useState(0);
  const [breakIndex, setBreakIndex] = useState(0);
  const [sortedBreakPoints] = useState(breakPoints.sort()); // sort breakPoints array just in case

  // emulating status check to see if request finished
  // if currentTime - startTime exceed duration => request finished
  const isFinish = (currentTime, startTime, duration) => {
    return currentTime - startTime >= duration;
  };
  useEffect(() => {
    let interval = null;
    if (done > 0 && done < 100) {
      if (finishingSpeed > 0) {
        interval = setInterval(() => {
          setDone(done + 1);
        }, finishingSpeed);
      } else if (done < 90) {
        let intervalTime = 15000/90; // progress from 0 to 90 in 15 seconds
        const currentBreakPoint = sortedBreakPoints[breakIndex];
        // slow to half speed around break points 
        // ex: if currentBreakPoint = 20, then 18, 19, 20, 21, and 22 will progress slower
        intervalTime = (Math.abs(done - currentBreakPoint) < 3) ? intervalTime * 2 : intervalTime;
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
      // get next break point
      if (done - sortedBreakPoints[breakIndex] >= 3 && breakIndex < sortedBreakPoints.length) {
        setBreakIndex(breakIndex + 1);
      }
    }
  }, [done, time, finishingSpeed, sortedBreakPoints, breakIndex]);

  const startClick = () => {
    if (done <= 0 || done >= 100) {
      // reset
      setFinishingSpeed(0);
      setBreakIndex(0);
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
Solution.propTypes = {
  breakPoints: PropTypes.arrayOf(PropTypes.number),
};

Solution.defaultProps = {
  breakPoints: [],
};
