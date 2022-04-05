import { NextPage } from "next";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const Timer: NextPage = () => {

  const [startTime, setStartTime] = useLocalStorage("startTime", new Date().getTime());
  const [timePassed, setTimePassed] = useState(0); // in seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePassed(t => t + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const minutes = Math.floor(timePassed / 60);
  const seconds = timePassed % 60;

  return <div
    className="flex flex-col items-center justify-evenly p-4 h-screen"
  >
    <main>
      {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}
    </main>
  </div>;
};

export default Timer;