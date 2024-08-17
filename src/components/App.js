
import React, { useState, useRef, useEffect } from "react";
import './../styles/App.css';

const App = () => {
  const [time, setTime] = useState(0); // Time in centiseconds
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef(null);

  // Start the timer
  const startTimer = () => {
    setIsRunning(true);
  };

  // Stop the timer
  const stopTimer = () => {
    setIsRunning(false);
  };

  // Reset the timer and laps
  const resetTimer = () => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
  };

  // Add a lap
  const addLap = () => {
    setLaps([...laps, formatTime(time)]);
  };

  // Format time as MM:SS:CS
  const formatTime = (centiseconds) => {
    const minutes = Math.floor(centiseconds / 6000);
    const seconds = Math.floor((centiseconds % 6000) / 100);
    const centiSeconds = centiseconds % 100;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiSeconds).padStart(2, '0')}`;
  };

  // Effect to handle timer intervals
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 1);
      }, 10); // Update every 10ms for centisecond accuracy
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current); // Cleanup on unmount
  }, [isRunning]);

  return (
    <div>
      <div className='timerDisplay'>
        {formatTime(time)}
      </div>  
      <div className='controls'>
        <button onClick={startTimer}>Start</button>
        <button onClick={stopTimer}>Stop</button>
        <button onClick={addLap}>Lap</button>
        <button onClick={resetTimer}>Reset</button>
      </div>  

      <ul className='displayLaps'>
        {laps.map((lap, index) => (
          <li key={index}>{lap}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
