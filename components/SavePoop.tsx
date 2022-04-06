import dynamic from "next/dynamic";
import { FC, useState } from "react";
import Rating from "./Rating";

interface SavePoopProps {
  startTime: number;
  endTime: number;
}

const SavePoop: FC<SavePoopProps> = ({ startTime, endTime }) => {

  const [rating, setRating] = useState(2);
  const [consistency, setConsistency] = useState(50);
  const [goldenPoop, setGoldenPoop] = useState(false);
  const [withPoop, setWithPoop] = useState(true);

  const timePassedMS = endTime - startTime;
  const minutes = Math.floor(timePassedMS / 1000 / 60);
  const seconds = Math.floor(timePassedMS / 1000 % 60);

  return (
    <div
      className="flex flex-col items-center justify-center relative p-4 h-screen select-none max-w-md md:m-auto"
    >
      <div className="text-center flex flex-col items-center p-4 h-fit w-5/6 ">
        So lang hat dein Toilettengang gedauert:
        <span className="text-4xl font-bold">{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</span>
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
                setWithPoop(true)
              }
              setGoldenPoop(!goldenPoop)
            }} />
          </label>
        </div>
      </div>
      <div id="actions" className="flex justify-around w-full absolute bottom-8">
        <button className="btn btn-primary w-4/6">Speichern</button>
      </div>
    </div>
  );
};

export default dynamic(() => Promise.resolve(SavePoop), { ssr: false });