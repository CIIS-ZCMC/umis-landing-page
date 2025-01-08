import { useEffect, useState } from "react";
import { Typography } from "@mui/material";

const Timer = ({ initialSeconds = 60, setIsOTPExpired = false }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);

      return () => clearInterval(timerId); // Cleanup the interval on component unmount
    } else {
      setIsOTPExpired(true);
    }
  }, [seconds]);

  const formatTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const remainingSeconds = secs % 60;
    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  return (
    <Typography
      fontSize={12}
      fontWeight={600}
      color={seconds > 10 ? "textPrimary" : "error"}
    >
      {seconds > 0 ? ` ${formatTime(seconds)}` : "00:00"}
    </Typography>
  );
};

export default Timer;
