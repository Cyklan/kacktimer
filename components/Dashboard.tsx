import { FC } from "react";

const Dashboard: FC = () => {
  return <div className="flex flex-col items-center p-4 h-screen">
    <main onClick={() => {
      // redirect to timer view
    }} className="flex flex-col items-center justify-evenly px-4 mt-32 select-none bg-base-200 aspect-square active:bg-base-300 rounded-xl flex-auto flex-grow-0">
      <h1 className="text-9xl pb-4">💩</h1>
      <span className="uppercase text-3xl font-bold">Schiss starten</span>
    </main>

    <div className="flex flex-col items-center space-y-8 mt-10 flex-auto">
      <button className="btn btn-primary w-full">Logbuch</button>
      <button className="btn btn-primary w-full">Rangliste</button>
      <button className="btn btn-primary w-full">Einstellungen</button>

    </div>
  </div>;
}

export default Dashboard;