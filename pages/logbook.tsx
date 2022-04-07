import { NextPage } from "next";
import dynamic from "next/dynamic";
import BackButton from "../components/BackButton";
import PoopLog from "../components/PoopLog";
import useLocalStorage from "../hooks/useLocalStorage";
import LocalStorageKeys from "../model/LocalStorageKeys";
import Poop from "../model/Poop";

const LogBook: NextPage = () => {
  
  const [poops] = useLocalStorage<Poop[]>(LocalStorageKeys.poops, []);
  
  const poopCards = poops.sort((a, b) => b.timestamp - a.timestamp).map(poop => <PoopLog poop={poop} key={`poop-card-${poop.id}`} />);

  return <div className="p-4 md:m-auto md:max-w-screen-md w-screen h-screen overflow-hidden">
    <BackButton to="/" />
    <div className="flex flex-col max-h-full items-center mt-12 pb-12 space-y-4 px-4 overflow-x-hidden overflow-y-auto">
      {poopCards}
    </div>
  </div>
}

export default dynamic(() => Promise.resolve(LogBook), { ssr: false });