import { useSession } from "next-auth/react";
import Dashboard from "../components/Dashboard";
import Hero from "../components/Hero";


export default function Home() {

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
}
