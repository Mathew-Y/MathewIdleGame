import { useEffect, useState } from "react";

interface UseTimerProps {
  endDate: Date;
  updateTime?: number;
  disabled?: boolean;
}

const formatTime = (ms: number) => {
  const seconds = ms / 1000;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  return `${h.toString().padStart(2, "0")}:${m.toString().padStart(2, "0")}:${s
    .toString()
    .padStart(2, "0")}`;
};

// We want the useTimer hook to accept
export const useTimer = ({ endDate, updateTime = 1000, disabled = false }: UseTimerProps) => {
  // UTC timestamp
  const [timestamp, setTimestamp] = useState(Date.now());

  // At each interval that we set, we must update the current date, and figure out if we
  // have exceeded the end date

  useEffect(() => {
    if (disabled) return;

    const interval = setInterval(() => {
      // Every 1000 MS, we update the timestamp
      setTimestamp(Date.now());
    }, updateTime);

    return () => {
      clearInterval(interval);
    };
  }, [disabled]);

  const deltaTime = endDate ? endDate.getTime() - timestamp : 0;
  return {
    deltaTime,
    remainingTime: deltaTime > 0 ? formatTime(deltaTime) : null,
    exceeded: deltaTime <= 0,
  };
};
