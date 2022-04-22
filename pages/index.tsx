import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import Dashboard from "../components/Dashboard";
import Hero from "../components/Hero";
import { OnlineContext } from "./_app";

const Home: NextPage = () => {

  const session = useSession();
  const online = useContext(OnlineContext);

  if (session.status === "unauthenticated" && (online || typeof window === "undefined")) {
    return <Hero />;
  }

  if (session.status === "loading" && (online || typeof window === "undefined")) {
    return <></>;
  }

  return (
    <Dashboard />
  );
};

export default Home;