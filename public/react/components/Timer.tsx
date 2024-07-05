import React, { useState, useRef, useEffect } from "react";

type Props = {
  setIsTimerActive: (value: boolean) => void
  onTimerComplete: () => void
}

// Total time for the countdown in seconds
const totalTime = 7;

export const Timer: React.FC<Props> = ({ setIsTimerActive, onTimerComplete }) => {
  const Ref = useRef<NodeJS.Timeout | null>(null);
  const [timer, setTimer] = useState("00:00");
  const [loadingPercent, setLoadingPercent] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [timeLeft, setTimeLeft] = useState(totalTime * 1000);

  const getTimeRemaining = (endTime: Date) => {
    const total = Date.parse(endTime.toString()) - Date.parse(new Date().toString());
    console.log(total)
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    return { total, minutes, seconds };
  };

  const startTimer = (endTime: Date) => {
    const { total, minutes, seconds } = getTimeRemaining(endTime);
    if (total >= 0) {
      setTimer(`${minutes > 9 
        ? minutes : "0" + minutes}:${seconds > 9 
        ? seconds : "0" + seconds}`
      );
      setTimeLeft(total);
      const elapsed = totalTime - (total / 1000);
      const percentComplete = (elapsed / totalTime) * 100;
      setLoadingPercent(percentComplete);
    } else {
      clearInterval(Ref.current!);
      setIsTimerActive(false)
      onTimerComplete()
    }
  };

  const clearTimer = (endTime: Date) => {
    setTimer("00:07");
    if (Ref.current) clearInterval(Ref.current);
    const id = setInterval(() => {
      if(isRunning) {
        startTimer(endTime)
      }
    }, 300);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + totalTime);
    return deadline;
  };

  useEffect(() => {
    clearTimer(getDeadTime());
    return () => {
      if (Ref.current) clearInterval(Ref.current);
    };
  }, []);

  const onClickStop = () => {
    if (Ref.current) clearInterval(Ref.current);
    setIsRunning(false)
  }

  const onCliskContinue = () => {
    if(!isRunning) {
      clearTimer(new Date(Date.now() + (timeLeft / 1000) * 1000));
      setIsRunning(true);
    }
  }

  const onClickReset = () => {
    setIsRunning(true)
    clearTimer(getDeadTime());
  };

  return (
    <div className="timer" style={{ textAlign: "center", margin: "auto" }}>
      <div className="timer-container">
        <div className="timer-text">{timer}</div>
        <svg>
          <circle cx="150" cy="150" r="130" />
          <circle
            cx="150"
            cy="150"
            r="130"
            strokeDashoffset={820 - (820 * (loadingPercent / 100))}
            transform="rotate(-90 150 150)"
          />
        </svg>
      </div>
      <div className="timer-buttons">
        <button className="timer-button timer-stop" onClick={onClickStop}>
          Stop
        </button>
        {/*<button className="timer-button timer-continue" onClick={onCliskContinue}>
          Continue | NOT Works
        </button>*/}
      </div>
      <button className="timer-button timer-reset" onClick={onClickReset}>
        Reset
      </button>
    </div>

  );
};