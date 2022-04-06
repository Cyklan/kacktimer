import { NextPage } from "next";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import TimerComponent from "../components/Timer";
import { useRouter } from "next/router";

const Timer: NextPage = () => {

  const router = useRouter()
  const [startTime, setStartTime] = useLocalStorage("startTime", new Date().getTime());
  const [timePassed, setTimePassed] = useState(startTime === null ? 0 : Math.floor((new Date().getTime() - startTime) / 1000)); // in seconds

  

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

  return <>
    <div
      className="flex flex-col items-center justify-evenly p-4 h-screen relative"
    >
      <main className="text-center flex-1 flex flex-col justify-center">
        <TimerComponent timePassed={timePassed} />
      </main>
      <div id="actions" className="flex justify-around w-full absolute bottom-8">
        <label htmlFor="cancel-modal" className="btn btn-accent">Abbrechen</label>
        <button className="btn btn-primary">Speichern</button>
      </div>
    </div>
    <input type="checkbox" id="cancel-modal" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box">
        <div className="font-bold text-lg">Abbrechen</div>
        <div className="py-4">
          Willst du die aktuelle Kack-Session wirklich abbrechen?<br />
          Deine Zeit wird nicht gespeichert.
        </div>
        <div className="modal-action flex-col">
          <button 
            className="btn btn-primary w-full"
            onClick={() => {
              setStartTime(null);
              router.push("/");
            }}
          >
            Wirklich abbrechen
          </button>
          <label htmlFor="cancel-modal" className="!ml-0 mt-4 btn btn-accent w-full">Doch nicht</label>
        </div>
      </div>
    </div>
  </>;
};

export default Timer;