import { time } from "console";
import cuid from "cuid";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useLocalStorage from "../hooks/useLocalStorage";
import LocalStorageKeys from "../model/LocalStorageKeys";
import Poop from "../model/Poop";
import { OnlineContext } from "../pages/_app";
import Rating from "./Rating";

interface SavePoopProps {
  startTime: number;
  endTime: number;
  reset: () => void;
}

const SavePoop: FC<SavePoopProps> = ({ startTime, endTime, reset }) => {

  const [timeEdited, setTimeEdited] = useState(false);
  const [minutes, setMinutes] = useState(Math.floor((endTime - startTime) / 1000 / 60));
  const [seconds, setSeconds] = useState(Math.floor((endTime - startTime) / 1000) % 60);
  const [timeInMS, setTimeInMS] = useState(endTime - startTime);
  const [rating, setRating] = useState(2);
  const [consistency, setConsistency] = useState(50);
  const [goldenPoop, setGoldenPoop] = useState(false);
  const [withPoop, setWithPoop] = useState(true);
  const [storedPoops, setStoredPoops] = useLocalStorage<Poop[]>(LocalStorageKeys.poops, []);
  const [saving, setSaving] = useState(false);
  const online = useContext(OnlineContext);
  const router = useRouter();

  useEffect(() => {
    setTimeInMS(seconds * 1000 + minutes * 1000 * 60);
  }, [minutes, seconds]);

  return (
    <div
      className="flex flex-col items-center justify-center relative p-4 h-screen select-none max-w-md md:m-auto"
    >
      <div className="text-center flex flex-col items-center p-4 h-fit w-5/6 ">
        So lang hat dein Toilettengang gedauert:
        <div className="flex justify-center pt-2">
          <input type="number" className={`text-4xl text-center w-12 bg-base-200 active:border-blue-600 border-base-200 rounded-md`} value={!timeEdited ? minutes.toString().padStart(2, "0") : minutes} onChange={(e) => {
            if (e.target.value.match((/^[0-9]*$/))) {
              setTimeEdited(true);
              if (e.target.value === "") {
                setMinutes(NaN);
                return;
              }
              setMinutes(parseInt(e.target.value));
            }
          }} />
          <span className="text-4xl">:</span>
          <input type="number" className="text-4xl w-12 text-center bg-base-200 active:border-blue-600 border-base-200 rounded-md" value={!timeEdited ? seconds.toString().padStart(2, "0") : seconds} onChange={(e) => {
            if (e.target.value.match((/^[0-9]{0,2}$/))) {
              setTimeEdited(true);
              if (e.target.value === "") {
                setSeconds(NaN);
                return;
              }

              if (e.target.valueAsNumber > 59) {
                setSeconds(59);
                return;
              }
              setSeconds(parseInt(e.target.value));
            }
          }} />
        </div>
      </div>
      <div className="flex flex-col items-center p-4 h-fit space-y-6 w-5/6">
        <h3 className="text-2xl">Bewerte deinen Schiss:</h3>
        <Rating value={rating} setValue={(value) => setRating(value)} />
      </div>
      <div className="flex flex-col items-center p-4 h-fit space-y-6 w-5/6">
        <h3 className="text-2xl">Wie ist die Konsistenz?</h3>
        <div>
          <input
            type="range"
            min={0}
            max={100}
            step={25}
            value={consistency}
            className="range w-60"
            onChange={(e) => setConsistency(e.target.valueAsNumber)} />
          <div className="w-full flex justify-between">
            <span>Flüssig</span>
            <span>Hart</span>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center p-4 h-fit space-y-6 w-5/6">
        <div className="form-control w-full ">
          <label className="cursor-pointer label">
            <span className="label-text">{withPoop ? "Großes Geschäft" : "Nur Pinkeln"}</span>
            <input type="checkbox" className="toggle toggle-secondary" checked={withPoop} onChange={() => setWithPoop(!withPoop)} />
          </label>
        </div>
      </div>
      <div className="flex flex-col items-center p-4 h-fit space-y-6 w-5/6">
        <div className="form-control w-full ">
          <label className="cursor-pointer label">
            <span className="label-text">Goldener Schiss</span>
            <input type="checkbox" className="checkbox checkbox-secondary" checked={goldenPoop} onChange={() => {
              if (!goldenPoop) {
                setWithPoop(true);
              }
              setGoldenPoop(!goldenPoop);
            }} />
          </label>
        </div>
      </div>
      <div id="actions" className="flex justify-around w-full absolute bottom-8">
        <button
          disabled={isNaN(seconds) || isNaN(minutes) || saving}
          onClick={() => {
            const poop: Poop = {
              id: cuid(),
              consistency,
              goldenPoop,
              inDatabase: false,
              rating,
              withPoop,
              timestamp: endTime,
              timeInMS,
            };

            if (online) {
              setSaving(true);
              toast.promise(fetch("/api/savePoop", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify(poop)
              }).then(res => {

                if (res.status !== 200) {
                  throw new Error("Failed to save poop");
                }
                return res.json();
              }).then(_ => {
                poop.inDatabase = true;
                setStoredPoops([...storedPoops, poop]);
                router.push("/");
                reset();
              }), {
                "error": "Speichern fehlgeschlagen",
                "success": "Speichern erfolgreich",
                loading: "Speichern..."
              }).then(() => setSaving(false));
            } else {
              setStoredPoops([...storedPoops, poop]);
              router.push("/");
              toast.success("Speichern erfolgreich");
              reset();
            }
          }} className="btn btn-primary w-4/6">Speichern</button>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SavePoop), { ssr: false });