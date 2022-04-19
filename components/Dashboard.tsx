import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import LocalStorageKeys from "../model/LocalStorageKeys";

const Dashboard: FC = () => {

  const router = useRouter();
  const [startTime] = useLocalStorage<Date>(LocalStorageKeys.startTime, null);

  if (startTime !== null) {
    router.push("/timer");
  }

  return <div className="flex flex-col items-center justify-evenly p-4 h-screen">
    <main onClick={() => {
      router.push("/timer");
    }} className="flex flex-col items-center justify-evenly px-4 select-none bg-base-200 aspect-square active:bg-base-300 rounded-xl flex-auto flex-grow-0">
      <h1 className="text-9xl pb-4">💩</h1>
      <span className="uppercase text-3xl font-bold">Schiss starten</span>
    </main>

    <div className="flex flex-col items-center space-y-8 mt-10">
      <Link href="/logbook">
        <a className="btn btn-primary w-full">Logbuch</a>
      </Link>
      <Link href="/leaderboard">
        <a className="btn btn-primary w-full">Rangliste</a>
      </Link>
      <Link href="/settings">
        <a className="btn btn-primary w-full">Einstellungen</a>
      </Link>
    </div>
  </div>;
};

export default Dashboard;