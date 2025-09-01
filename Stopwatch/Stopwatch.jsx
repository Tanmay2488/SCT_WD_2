import React, { useState, useEffect, useRef } from "react";

function MyStopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [enlapsedTime, setEnlapsedTime] = useState(0);
  const [laps, setLaps] = useState([]); 
  const intervalIdRef = useRef();
  const startIdRef = useRef();

  useEffect(() => {
    if (isRunning) {
      intervalIdRef.current = setInterval(() => {
        setEnlapsedTime(Date.now() - startIdRef.current);
      }, 10);
    }
    return () => {
      clearInterval(intervalIdRef.current);
    };
  }, [isRunning]);

  function start() {
    setIsRunning(true);
    startIdRef.current = Date.now() - enlapsedTime;
  }

  function reset() {
    setEnlapsedTime(0);
    setIsRunning(false);
    setLaps([]);
  }

  function stop() {
    setIsRunning(false);
  }

  function lap() {
    if (isRunning) {
      setLaps([...laps, enlapsedTime]);
    }
  }

  function formatTime(time) {
    let min = Math.floor((time / (1000 * 60)) % 60);
    let sec = Math.floor((time / 1000) % 60);
    let milliSec = Math.floor((time % 1000) / 10);

    min = String(min).padStart(2, "0");
    sec = String(sec).padStart(2, "0");
    milliSec = String(milliSec).padStart(2, "0");

    return `${min}:${sec}:${milliSec}`;
  }

  return (
    <div className="StopWatch">
      <p id="format-time">{formatTime(enlapsedTime)}</p>
      <div className="controls">
        <button className="start-button" onClick={start}>Start</button>
        <button className="stop-button" onClick={stop}>Stop</button>
        <button className="reset-button" onClick={reset}>Reset</button>
        <button className="lap-button" onClick={lap}>Lap</button>
      </div>

      {}
      {laps.length > 0 && (
        <div className="laps">
          <h3>Laps</h3>
          <ul>
            {laps.map((lapTime, index) => {
              const prevLapTime = index > 0 ? laps[index - 1] : 0;
              const interval = lapTime - prevLapTime;

              return (
                <li key={index}>
                  <strong>Lap {index + 1}:</strong>  
                  &nbsp;Total = {formatTime(lapTime)}  
                  &nbsp;| Interval = {formatTime(interval)}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}

export default MyStopWatch;