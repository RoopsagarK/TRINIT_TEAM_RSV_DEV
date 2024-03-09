import { useState, useEffect } from 'react';

const Timer = ({ initialMinutes, onTimerEnd }) => {
  const [time, setTime] = useState(initialMinutes * 60); // Convert minutes to seconds

  useEffect(() => {
    let timerInterval;

    if (time > 0) {
      // Start the timer
      timerInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      // Timer has reached zero, perform any actions you need
      onTimerEnd && onTimerEnd();
      clearInterval(timerInterval); // Clear the interval to stop the timer
    }

    // Clean up the interval when the component unmounts or when time reaches zero
    return () => clearInterval(timerInterval);
  }, [time, onTimerEnd]);

  // Format the remaining time in minutes and seconds
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return (
    <div>
      <p className='text-xl font-semibold'>Time Left: {formattedTime}</p>
    </div>
  );
};

export default Timer;
