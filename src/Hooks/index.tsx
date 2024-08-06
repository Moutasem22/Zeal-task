import { useState, useEffect } from "react";

export const useCountdown = (seconds: number, onTimeout: () => void) => {
  const [timeLeft, setTimeLeft] = useState(seconds);

  useEffect(() => {
    if (timeLeft === 0) {
      onTimeout();
      return;
    }
    const timerId = setInterval(
      () => setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)),
      1000
    );
    return () => clearInterval(timerId);
  }, [timeLeft, onTimeout]);

  return timeLeft;
};
