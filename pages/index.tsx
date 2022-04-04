import { NextPage } from "next";
import { useSession } from "next-auth/react";
import Dashboard from "../components/Dashboard";
import Hero from "../components/Hero";

const Home: NextPage = () => {

  const session = useSession();

  if (session.status === "unauthenticated") {
    return <Hero />;
  }

  if (session.status === "loading") {
    return <></>;
  }

  return (
    <Dashboard />
  );
};

export default Home;