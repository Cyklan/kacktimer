import { FC } from "react";

interface LeaderboardProps {
  time: number;
  name: string;
  place: number;
  highlight?: boolean;
}

const LeaderboardCard: FC<LeaderboardProps> = ({ name, place, time, highlight }) => {
  
  let color = "bg-orange-900";
  switch (place) {
    case 1:
      color = "bg-yellow-400";
      break;
    case 2:
      color = "bg-slate-300";
      break;
    case 3:
      color = "bg-orange-600";
      break;
    default:
      break;
  }
  
  return <div className={`w-full mx-12 card ${highlight ? "shadow-2xl border-2 border-primary-focus " : "shadow-lg"}`}>
    <div className="card-body p-2">
      <div className="flex w-full h-full items-center">
        <div className="avatar placeholder">
          <div className={`${color} bg-oran text-white rounded-full w-10`}>
            <span className="text-xl">{place === -1 ? ":(" : place}</span>
          </div>
        </div>
        <span className="ml-2">{name}: {formatHoursToReadable(time)}</span>
      </div>
    </div>
  </div>;
};

const formatHoursToReadable = (timeInMS: number) => {

  const hours = Math.floor(timeInMS / (1000 * 60 * 60));
  const minutes = Math.floor((timeInMS % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeInMS % (1000 * 60)) / 1000);

  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default LeaderboardCard;