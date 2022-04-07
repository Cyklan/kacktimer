import { NextPage } from "next";
import { useEffect, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import TimerComponent from "../components/Timer";
import { useRouter } from "next/router";
import SavePoop from "../components/SavePoop";
import dynamic from "next/dynamic";
import LocalStorageKeys from "../model/LocalStorageKeys";

const Timer: NextPage = () => {

  const router = useRouter();
  const [startTime, setStartTime] = useLocalStorage(LocalStorageKeys.startTime, Date.now());
  const [timePassed, setTimePassed] = useState(startTime === null ? 0 : Math.floor((Date.now() - startTime) / 1000)); // in seconds
  const [endTime, setEndTime] = useLocalStorage<number>(LocalStorageKeys.endTime, null);
  const [showResultScreen, setShowResultScreen] = useLocalStorage<boolean>(LocalStorageKeys.showResultScreen, false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimePassed(t => Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [startTime]);

  if (showResultScreen && endTime) {
    return <SavePoop
      startTime={startTime}
      endTime={endTime}
      reset={() => {
        setStartTime(null);
        setEndTime(null);
        setTimePassed(null);
        setShowResultScreen(false);
      }}
    />;
  }

  return <>
    <div
      className="flex flex-col items-center justify-evenly p-4 h-screen relative"
    >
      <main className="text-center flex-1 flex flex-col justify-center">
        <TimerComponent timePassed={timePassed} />
      </main>
      <div id="actions" className="flex justify-around w-full absolute bottom-8">
        <label htmlFor="cancel-modal" className="btn btn-accent">Abbrechen</label>
        <button
          onClick={() => {
            setEndTime(Date.now());
            setShowResultScreen(true);
          }}
          className="btn btn-primary"
        >Speichern</button>
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
            className="btn btn-accent w-full"
            onClick={() => {
              setStartTime(null);
              router.push("/");
            }}
          >
            Wirklich abbrechen
          </button>
          <label htmlFor="cancel-modal" className="!ml-0 mt-4 btn-primary btn w-full">Doch nicht</label>
        </div>
      </div>
    </div>
  </>;
};

export default dynamic(() => Promise.resolve(Timer), { ssr: false });