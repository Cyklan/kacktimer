import { NextPage } from "next";
import { signOut } from "next-auth/react";
import Link from "next/link";
import BackButton from "../components/BackButton";

const Settings: NextPage = () => {
  return <div className="w-screen h-screen flex flex-col items-center justify-center">
    <BackButton to="/" />
    <div className="h-auto flex flex-col items-center justify-evenly space-y-8">
      <Link href="/setusername">
        <a className="btn btn-primary">Anzeigename ändern</a>
      </Link>
      <button onClick={() => signOut()} className="btn btn-accent w-full">Abmelden</button>
    </div>
  </div>;
};

export default Settings;