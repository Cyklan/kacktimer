import { NextPage } from "next";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import TimerComponent from "../components/Timer";

const Timer: NextPage = () => {

  const [startTime, setStartTime] = useLocalStorage("startTime", new Date().getTime());
  const [timePassed, setTimePassed] = useState(Math.floor((new Date().getTime() - startTime) / 1000)); // in seconds

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
    className="flex flex-col items-center justify-evenly p-4 h-screen relative"
  >
    <main className="text-center flex-1 flex flex-col justify-center">
      <TimerComponent timePassed={timePassed} />
    </main>
    <div id="actions" className="flex justify-around w-full absolute bottom-8">
      <button className="btn btn-accent">Abbrechen</button>
      <button className="btn btn-primary">Speichern</button>
    </div>
  </div>;
};

export default Timer;