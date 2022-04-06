import { NextPage } from "next";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useRef } from "react";
import BackButton from "../components/BackButton";
import deleteLocalData from "../util/deleteLocalData";

const Settings: NextPage = () => {

  const router = useRouter();
  const deleteModalToggle = useRef<HTMLInputElement>(null);

  return <div className="w-screen h-screen flex flex-col items-center justify-center">
    <BackButton to="/" />
    <div className="h-auto flex flex-col items-center justify-evenly space-y-8">
      <Link href="/setusername">
        <a className="btn btn-primary">Anzeigename ändern</a>
      </Link>
      <label htmlFor="delete-data" className="btn btn-primary">Lokale Daten löschen</label>
      <button onClick={() => {
        signOut({ redirect: false }).then(() => router.push("/"))
      }} className="btn btn-accent w-full">Abmelden</button>
    </div>

    <input ref={deleteModalToggle} type="checkbox" id="delete-data" className="modal-toggle" />
    <div className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Lokale Daten löschen</h3>
        <p className="py-4">Achtung! Wenn du deine lokalen Daten löschst, werden alle Daten, die nicht synchronisiert wurden, verloren.<br />Trotzdem fortfahren?</p>
        <div className="modal-action justify-between">
          <label htmlFor="delete-data" className="btn btn-primary">Abbrechen</label>
          <button className="btn" onClick={() => {
            deleteLocalData();
            deleteModalToggle.current?.click();
          }}>Löschen</button>
        </div>
      </div>
    </div>
  </div>;
};

export default Settings;