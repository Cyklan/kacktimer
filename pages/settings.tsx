import { NextPage } from "next";
import { signOut } from "next-auth/react";
import BackButton from "../components/BackButton";

const Settings: NextPage = () => {
  return <div className="w-screen h-screen flex flex-col items-center justify-center">
    <BackButton to="/"/>
    <div className="h-auto flex flex-col items-center justify-evenly space-y-8">
      <button className="btn btn-primary">Anzeigename ändern</button>
      <button onClick={() => signOut()} className="btn btn-accent w-full">Abmelden</button>
    </div>
  </div>;
};

export default Settings;