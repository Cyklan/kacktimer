import { FC } from "react";
import Poop from "../model/Poop";
import Rating from "./Rating";

interface PoopLogProps {
  poop: Poop;
}

const PoopLog: FC<PoopLogProps> = ({ poop }) => {

  const minutes = Math.floor(poop.timeInMS / 1000 / 60);
  const seconds = Math.floor(poop.timeInMS / 1000 % 60);

  return <div className="card w-full bg-base-100 shadow-xl flex-shrink-0 mx-4">
    <div className="card-body">
      <h2 className="card-title">{new Date(poop.timestamp).toLocaleString().slice(0, -3)} Uhr</h2>
      <Rating readonly value={poop.rating} setValue={() => {}} />
      <div className="flex justify-between">
        <span>Härte: {poop.consistency}%</span>
        <span>Dauer: {minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</span>
      </div>
      <div className="flex justify-between">
        <span>{poop.withPoop ? "Großes Geschäft" : "Nur Pinkeln"}</span>
      </div>
      {poop.goldenPoop && <span className="text-amber-400">Goldener Schiss</span>}
    </div>
  </div>
}

export default PoopLog