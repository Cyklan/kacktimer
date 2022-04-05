import dynamic from "next/dynamic";

interface TimerProps {
  timePassed: number;
}

const Timer: React.FC<TimerProps> = ({ timePassed }) => {
  
  const minutes = Math.floor(timePassed / 60);
  const seconds = timePassed % 60;

  return <>
    <h2 className="text-2xl">Du kackst schon seit</h2>
    <span className="text-4xl font-bold">{minutes.toString().padStart(2, "0")}:{seconds.toString().padStart(2, "0")}</span>
    <h2 className="text-2xl">Minuten</h2>
  </>;
};

export default dynamic(() => Promise.resolve(Timer), {
  ssr: false
});