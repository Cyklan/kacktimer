import { PrismaClient } from "@prisma/client";
import { GetServerSideProps, NextPage } from "next";
import { getSession } from "next-auth/react";
import { MouseEventHandler, useState } from "react";
import toast from "react-hot-toast";
import BackButton from "../components/BackButton";

interface SetUsernameProps {
  name: string;
}

const SetUsername: NextPage<SetUsernameProps> = ({ name }) => {
  const [username, setUsername] = useState(name);
  const [updating, setUpdating] = useState(false);

  function handleSubmit() {
    if (username.length === 0) {
      return;
    }

    return fetch("/api/changeName", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
      })
    });
  }

  return <div className="w-screen h-screen flex flex-col items-center justify-center">
    <BackButton to="/settings" />
    <div className="h-auto flex flex-col items-center justify-evenly space-y-8">
      <input autoFocus className="input w-full max-w-xs" maxLength={20} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Benutzername" />
      <button disabled={name === username || updating} onClick={() => {
        setUpdating(true)
        toast.promise(handleSubmit(), {
          success: "Benutzername geändert",
          error: "Benutzername konnte nicht geändert werden",
          loading: "Benutzername wird geändert",
        }).then(() => setUpdating(false));
      }} className="btn btn-primary w-full">Speichern</button>
    </div>
  </div>;
};

export default SetUsername;

export const getServerSideProps: GetServerSideProps<SetUsernameProps> = async (ctx) => {
  const session = await getSession({ ctx });

  const db = new PrismaClient();
  const user = await db.user.findFirst({
    where: {
      email: session.user.email!,
    }
  });

  db.$disconnect();

  return {
    props: {
      name: user.name
    }
  };
};