import { FC } from "react";

interface LeaderboardProps {
  time: number;
  name: string;
  place: number;
}

const LeaderboardCard: FC<LeaderboardProps> = ({ name, place, time }) => {
  return <div className="w-full mx-12 card">
    <div className="card-body">
      {name}
    </div>
  </div>
}

export default LeaderboardCard;