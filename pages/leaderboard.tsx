import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import BackButton from "../components/BackButton";
import LeaderboardCard from "../components/LeaderboardCard";

interface LeaderboardProps {
  topTimesInMS: {
    name: string;
    time: number;
    userScore: boolean;
  }[];
  ownTimeInMS: number;
  lastDay: number;
  userInTop5: boolean;
}

const LeaderBoard: NextPage<LeaderboardProps> = ({ topTimesInMS: topTimesInH, ownTimeInMS: ownTimeInH, lastDay, userInTop5 }) => {

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(lastDay));

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft(lastDay));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  })


  useEffect(() => {

  }, [])

  const cards = topTimesInH.map((entry, index) => {
    return <LeaderboardCard key={`leaderboard-card-${index}`} highlight={entry.userScore} name={entry.name} place={index + 1} time={entry.time} />;
  });

  return <div className="p-4 flex flex-col md:m-auto md:max-w-screen-md w-screen min-h-screen overflow-hidden">
    <BackButton to="/" />
    <div className="absolute w-5/6 text-center left-1/2 -translate-x-1/2 top-1/4">Ranglisten-Reset in {timeLeft}</div>
    <div className="flex h-full flex-auto flex-col max-h-full items-center justify-center mt-12 pb-12 space-y-4 px-4 overflow-x-hidden overflow-y-auto">
      {cards.length > 0 ? cards : <div className="text-center">Diese Woche hat noch niemand geschissen. Hol dir den ersten Platz!</div>}
    </div>
  </div>;
};

export default LeaderBoard;

function calculateTimeLeft(lastDay: number) {
  const now = new Date()
  const lastDayDate = new Date(lastDay)
  const timeLeft = lastDayDate.getTime() - now.getTime()
  
  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24))
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60))

  if (days > 0) {
    return `${days} ${days === 1 ? "Tag" : "Tagen"}`
  }

  if (hours > 0) {
    return `${hours} ${hours === 1 ? "Stunde" : "Stunden"}`
  }

  if (minutes > 0) {
    return `${minutes} ${minutes === 1 ? "Minute" : "Minuten"}`
  }

  return "kürze";
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const session = await getSession(ctx);
  if (!session.user) {
    ctx.res.writeHead(302, { Location: "/" });
    ctx.res.end();
    return { props: {} };
  }

  const now = new Date();
  const firstWeekDay = now.getDate() - now.getDay();

  const firstDay = new Date(now.setDate(firstWeekDay));
  firstDay.setHours(26);
  firstDay.setMinutes(0);
  firstDay.setSeconds(0);
  const firstDayString = firstDay.toISOString().replace("T", " ").substring(0, 19);

  const lastDay = new Date(now.setDate(firstWeekDay + 7));
  lastDay.setHours(25);
  lastDay.setMinutes(59);
  lastDay.setSeconds(59);
  const lastDayString = lastDay.toISOString().replace("T", " ").substring(0, 19);

  console.log(firstDayString, lastDayString);

  const db = new PrismaClient();

  const top5: {
    time: number;
    name: string;
    email: string;
  }[] = await db.$queryRawUnsafe(
    `SELECT SUM(poop.timeInMS) as time, user.name, user.email
    FROM poop
    JOIN user ON user.id = poop.userId
    WHERE poop.createdAt BETWEEN '${firstDayString}' AND '${lastDayString}'
    GROUP BY userId
    ORDER BY time DESC
    LIMIT 5`
  );

  const userScore: {
    time: number;
  }[] = await db.$queryRawUnsafe(`SELECT SUM(poop.timeInMS) as time
  FROM poop
  JOIN user
  ON user.id = poop.userId
  WHERE user.email = "${session.user.email}"`);

  return {
    props: {
      topTimesInMS: top5.map(x => ({
        name: x.name,
        time: x.time,
        userScore: x.email.toLowerCase() === session.user.email.toLowerCase()
      })),
      ownTimeInMS: userScore[0].time,
      lastDay: lastDay.getTime(),
      userInTop5: top5.some(x => x.email.toLowerCase() === session.user.email.toLowerCase())
    }
  };
};