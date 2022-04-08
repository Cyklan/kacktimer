import { Prisma, PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { prependOnceListener } from "process";
import BackButton from "../components/BackButton";
import LeaderboardCard from "../components/LeaderboardCard";

interface LeaderboardProps {
  topTimesInH: {
    name: string;
    time: number;
  }[];
  ownTimeInH: number;
}

const LeaderBoard: NextPage<LeaderboardProps> = ({ topTimesInH, ownTimeInH }) => {
  
  const cards = topTimesInH.map((entry, index) => {
    return <LeaderboardCard key={`leaderboard-card-${index}`} name={entry.name} place={index + 1} time={entry.time} />;
  });
  
  return <div>
    <BackButton to="/" />
    {cards}
  </div>;
};

export default LeaderBoard;

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

  const topTen: {
    time: number;
    name: string;
  }[] = await db.$queryRawUnsafe(
    `SELECT SUM(poop.timeInMS) / 1000 / 60 / 60 as time, user.name
    FROM poop
    JOIN user ON user.id = poop.userId
    WHERE poop.createdAt BETWEEN '${firstDayString}' AND '${lastDayString}'
    GROUP BY userId
    ORDER BY time DESC
    LIMIT 10`
  );

  console.log(topTen)

  console.log(session.user.email);

  const userScore: {
    time: number;
  }[] = await db.$queryRawUnsafe(`SELECT SUM(poop.timeInMS) / 1000 / 60 / 60 as time
  FROM poop
  JOIN user
  ON user.id = poop.userId
  WHERE user.email = "${session.user.email}"`);

  return {
    props: {
      topTimesInH: topTen,
      ownTimeInH: userScore[0].time,
    }
  };
};